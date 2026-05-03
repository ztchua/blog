import { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, useScroll, useTransform } from 'motion/react';
import { Copy, Check, Clock, ArrowLeft, ChevronRight } from 'lucide-react';
import { loadLabArticles, type LabArticle, type LabHeading } from '../../../content/loader';

/* ═══════════════════════════════════════════
   SYNTAX HIGHLIGHTING
   ═══════════════════════════════════════════ */

const GO_KEYWORDS = new Set([
  'func', 'package', 'import', 'return', 'if', 'else', 'for', 'range', 'var', 'const',
  'type', 'struct', 'interface', 'map', 'chan', 'go', 'defer', 'select', 'case',
  'default', 'switch', 'break', 'continue', 'nil', 'true', 'false', 'make', 'len',
  'append', 'fmt', 'Println', 'Printf', 'Sprintf', 'Errorf', 'handleError',
]);

const GO_TYPES = new Set([
  'string', 'int', 'int64', 'float64', 'bool', 'error', 'byte', 'rune', 'any',
  'Handler', 'ResponseWriter', 'Request', 'Server', 'HandlerFunc',
]);

function escapeHtml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function parseInlineMarkdown(text: string): string {
  let html = text.replace(/!\[\[.*?\]\]/g, '');
  html = escapeHtml(html);
  html = html.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer" style="color:#00d4ff;text-decoration:underline;text-underline-offset:2px">$1</a>',
  );
  html = html.replace(
    /(^|[\s(])(https?:\/\/[^\s<]+)/gm,
    '$1<a href="$2" target="_blank" rel="noopener noreferrer" style="color:rgba(0,212,255,0.7);text-decoration:underline;text-underline-offset:2px">$2</a>',
  );
  html = html.replace(/\*\*\*(.+?)\*\*\*/g, '<strong style="color:#f0f0f5"><em>$1</em></strong>');
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong style="color:#f0f0f5">$1</strong>');
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
  html = html.replace(
    /`([^`]+)`/g,
    '<code style="font-family:var(--font-mono);background:rgba(255,255,255,0.06);padding:1px 5px;border-radius:4px;font-size:0.9em;color:#f8f8f2">$1</code>',
  );
  return html;
}

function parseHeadingId(raw: string): { title: string; id: string } {
  const m = raw.match(/^(.+?)\s*\{#(\w+)\}$/);
  const title = (m ? m[1] : raw).trim();
  const id = m ? m[2] : title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  return { title, id };
}

function highlightGo(code: string): string {
  const tokens: { text: string; cls: string }[] = [];
  let i = 0;

  while (i < code.length) {
    if (code[i] === '/' && code[i + 1] === '/') {
      let end = code.indexOf('\n', i);
      if (end === -1) end = code.length;
      tokens.push({ text: escapeHtml(code.slice(i, end)), cls: 'tok-comment' });
      i = end;
      continue;
    }

    if (code[i] === '/' && code[i + 1] === '*') {
      const end = code.indexOf('*/', i + 2);
      const closeIdx = end === -1 ? code.length : end + 2;
      tokens.push({ text: escapeHtml(code.slice(i, closeIdx)), cls: 'tok-comment' });
      i = closeIdx;
      continue;
    }

    if (code[i] === '"' || code[i] === '`') {
      const quote = code[i];
      let j = i + 1;
      while (j < code.length && code[j] !== quote) {
        if (code[j] === '\\') j++;
        j++;
      }
      tokens.push({ text: escapeHtml(code.slice(i, j + 1)), cls: 'tok-string' });
      i = j + 1;
      continue;
    }

    if (/[0-9]/.test(code[i]) && (i === 0 || /[\s(,=+\-*/<>[\]{}]/.test(code[i - 1]))) {
      let j = i;
      while (j < code.length && /[0-9.xXa-fA-F_]/.test(code[j])) j++;
      tokens.push({ text: code.slice(i, j), cls: 'tok-number' });
      i = j;
      continue;
    }

    if (/[a-zA-Z_]/.test(code[i])) {
      let j = i;
      while (j < code.length && /[a-zA-Z0-9_]/.test(code[j])) j++;
      const word = code.slice(i, j);
      if (GO_KEYWORDS.has(word)) {
        tokens.push({ text: word, cls: 'tok-keyword' });
      } else if (GO_TYPES.has(word)) {
        tokens.push({ text: word, cls: 'tok-type' });
      } else if (j < code.length && code[j] === '(') {
        tokens.push({ text: word, cls: 'tok-function' });
      } else {
        tokens.push({ text: word, cls: 'tok-plain' });
      }
      i = j;
      continue;
    }

    if (':=&|<>+-*/%!'.includes(code[i])) {
      tokens.push({ text: code[i], cls: 'tok-operator' });
      i++;
      continue;
    }

    tokens.push({ text: escapeHtml(code[i]), cls: 'tok-plain' });
    i++;
  }

  return tokens.map((t) => `<span class="${t.cls}">${t.text}</span>`).join('');
}

/* ═══════════════════════════════════════════
   CODE BLOCK COMPONENT
   ═══════════════════════════════════════════ */

function CodeBlock({ code, filename, language }: { code: string; filename: string; language: string }) {
  const [copied, setCopied] = useState(false);
  const lines = code.split('\n');

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [code]);

  const highlighted = highlightGo(code);

  return (
    <div className="my-6 rounded-xl overflow-hidden" style={{
      background: 'rgba(8, 8, 20, 0.9)',
      border: '1px solid rgba(255, 255, 255, 0.06)',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
    }}>
      {/* Terminal header */}
      <div className="flex items-center justify-between px-4 py-2.5" style={{
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
        background: 'rgba(255, 255, 255, 0.02)',
      }}>
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#ff5f57' }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#febc2e' }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#28c840' }} />
          </div>
          <span className="text-[11px] tracking-wide" style={{
            fontFamily: 'var(--font-mono)',
            color: 'rgba(255, 255, 255, 0.3)',
          }}>
            {filename}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase tracking-wider" style={{
            fontFamily: 'var(--font-mono)',
            color: 'rgba(255, 255, 255, 0.2)',
          }}>
            {language}
          </span>
          <button
            onClick={handleCopy}
            className="relative flex items-center justify-center w-7 h-7 rounded-md transition-all duration-200"
            style={{
              background: copied ? 'rgba(0, 255, 136, 0.1)' : 'rgba(255, 255, 255, 0.05)',
              border: `1px solid ${copied ? 'rgba(0, 255, 136, 0.2)' : 'rgba(255, 255, 255, 0.08)'}`,
            }}
          >
            <motion.div
              initial={false}
              animate={{ scale: copied ? 0 : 1, rotate: copied ? -90 : 0 }}
              transition={{ duration: 0.2 }}
              style={{ position: 'absolute' }}
            >
              <Copy size={12} style={{ color: 'rgba(255,255,255,0.4)' }} />
            </motion.div>
            <motion.div
              initial={false}
              animate={{ scale: copied ? 1 : 0, rotate: copied ? 0 : 90 }}
              transition={{ duration: 0.2, type: 'spring', stiffness: 400, damping: 15 }}
              style={{ position: 'absolute' }}
            >
              <Check size={12} style={{ color: '#00ff88' }} />
            </motion.div>
          </button>
        </div>
      </div>

      {/* Code content */}
      <div className="flex overflow-x-auto">
        <div className="flex-shrink-0 py-4 pl-4 pr-3 select-none" style={{
          borderRight: '1px solid rgba(255, 255, 255, 0.04)',
        }}>
          {lines.map((_, i) => (
            <div
              key={i}
              className="text-[12px] leading-[1.65]"
              style={{
                fontFamily: 'var(--font-mono)',
                color: 'rgba(255, 255, 255, 0.15)',
                minWidth: '2ch',
                textAlign: 'right',
              }}
            >
              {i + 1}
            </div>
          ))}
        </div>

        <pre className="flex-1 py-4 px-4 overflow-x-auto">
          <code
            className="text-[12px] leading-[1.65]"
            style={{ fontFamily: 'var(--font-mono)' }}
            dangerouslySetInnerHTML={{ __html: highlighted }}
          />
        </pre>
      </div>

      {/* Syntax highlighting styles */}
      <style>{`
        .tok-keyword { color: #ff79c6; font-weight: 500; }
        .tok-type { color: #8be9fd; }
        .tok-string { color: #f1fa8c; }
        .tok-comment { color: #6272a4; font-style: italic; }
        .tok-number { color: #bd93f9; }
        .tok-function { color: #50fa7b; }
        .tok-operator { color: #ff79c6; }
        .tok-plain { color: #f8f8f2; }
      `}</style>
    </div>
  );
}

/* ═══════════════════════════════════════════
   TABLE OF CONTENTS
   ═══════════════════════════════════════════ */

interface TocItem {
  id: string;
  label: string;
  level: number;
}

function TableOfContents({ items, activeId, onSelect }: { items: TocItem[]; activeId: string; onSelect: (id: string) => void }) {
  return (
    <nav className="hidden xl:block fixed left-[max(2rem,calc((100vw-48rem)/2-16rem))] top-32 w-56 z-30">
      <div
        className="text-[11px] uppercase tracking-widest mb-4"
        style={{ fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.2)' }}
      >
        On this page
      </div>
      <div className="space-y-0.5">
        {items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={(e) => {
              e.preventDefault();
              onSelect(item.id);
              document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="block py-1.5 px-3 -mx-1 rounded-md transition-all duration-300 relative"
            style={{
              paddingLeft: item.level === 3 ? '24px' : undefined,
              fontFamily: 'var(--font-body)',
              fontSize: item.level === 3 ? '11px' : '12px',
              color: activeId === item.id ? '#00d4ff' : 'rgba(255,255,255,0.3)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(0,212,255,0.06)';
              if (activeId !== item.id) e.currentTarget.style.color = 'rgba(0,212,255,0.7)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              if (activeId !== item.id) e.currentTarget.style.color = 'rgba(255,255,255,0.3)';
            }}
          >
            {activeId === item.id && (
              <motion.div
                layoutId="toc-indicator"
                className="absolute left-0 top-0 bottom-0 w-[2px] rounded-full"
                style={{
                  background: '#00d4ff',
                  boxShadow: '0 0 10px rgba(0,212,255,0.4)',
                }}
                transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              />
            )}
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
}

/* ═══════════════════════════════════════════
   LOAD ARTICLES FROM .md FILES
   ═══════════════════════════════════════════ */

const ARTICLES = loadLabArticles();

/* ═══════════════════════════════════════════
   SECTION CONTENT RENDERER
   ═══════════════════════════════════════════ */

function SectionContent({ content }: { content: string }) {
  const lines = content.split('\n');
  const elements: JSX.Element[] = [];
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i];
    if (line.trim() === '') { i++; continue; }

    // Sub-header: ### text
    if (line.startsWith('### ')) {
      const { title, id } = parseHeadingId(line.slice(4));
      elements.push(
        <h3 key={key++} id={id} className="text-lg sm:text-xl mb-3 mt-8" style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 600,
          letterSpacing: '-0.01em',
          color: 'rgba(255,255,255,0.85)',
          scrollMarginTop: '80px',
        }}>
          <span dangerouslySetInnerHTML={{ __html: parseInlineMarkdown(title) }} />
        </h3>,
      );
      i++;
      continue;
    }

    // Blockquote: > lines
    if (line.startsWith('>')) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i] !== undefined && (lines[i].startsWith('>') || lines[i].trim() === '')) {
        if (lines[i].startsWith('>')) quoteLines.push(lines[i].replace(/^>\s?/, ''));
        i++;
      }
      elements.push(
        <blockquote key={key++} className="mb-5 pl-4 py-1" style={{
          borderLeft: '2px solid rgba(0,212,255,0.2)',
          color: 'rgba(255,255,255,0.45)',
          fontStyle: 'italic',
        }}>
          <span dangerouslySetInnerHTML={{ __html: parseInlineMarkdown(quoteLines.join(' ')) }} />
        </blockquote>,
      );
      continue;
    }

    // List: - or • items (possibly indented)
    if (/^\s*[-•]\s/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\s*[-•]\s/.test(lines[i])) {
        items.push(lines[i].trim().replace(/^[-•]\s/, ''));
        i++;
      }
      elements.push(
        <ul key={key++} className="space-y-2 mb-6">
          {items.map((item, ii) => (
            <li key={ii} className="flex items-start gap-3 text-[14px] leading-[1.75]"
              style={{ color: 'rgba(255,255,255,0.65)' }}>
              <span className="mt-2.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{
                background: '#00d4ff',
                boxShadow: '0 0 8px rgba(0,212,255,0.3)',
              }} />
              <span dangerouslySetInnerHTML={{ __html: parseInlineMarkdown(item) }} />
            </li>
          ))}
        </ul>,
      );
      continue;
    }

    // Paragraph: collect non-special lines
    const paraLines: string[] = [];
    while (i < lines.length && lines[i].trim() !== '' && !lines[i].startsWith('### ') && !lines[i].startsWith('>') && !/^\s*[-•]\s/.test(lines[i])) {
      paraLines.push(lines[i]);
      i++;
    }
    if (paraLines.length > 0) {
      elements.push(
        <p key={key++} className="text-[14px] sm:text-[15px] leading-[1.8] mb-5"
          style={{ color: 'rgba(255,255,255,0.6)' }}>
          <span dangerouslySetInnerHTML={{ __html: parseInlineMarkdown(paraLines.join(' ')) }} />
        </p>,
      );
    }
  }

  return <>{elements}</>;
}

/* ═══════════════════════════════════════════
   ARTICLE INDEX
   ═══════════════════════════════════════════ */

function ArticleIndex({ onSelect }: { onSelect: (slug: string) => void }) {
  if (ARTICLES.length === 0) {
    return (
      <div className="px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto pt-20 text-center">
        <p style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-mono)' }}>
          No articles yet. Add .md files to src/content/lab/.
        </p>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto pt-8">
      <div>
        <div className="mb-8">
          <h1
            className="text-2xl sm:text-3xl mb-2"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              letterSpacing: '-0.02em',
            }}
          >
            Nerd-talk
          </h1>
          <p className="text-[14px]" style={{ color: 'rgba(255,255,255,0.4)' }}>
            Long-form technical deep dives and systems engineering writeups.
          </p>
        </div>

        <div className="space-y-3">
          {ARTICLES.map((article, i) => (
            <motion.button
              key={article.slug}
              onClick={() => onSelect(article.slug)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.03, duration: 0.2 }}
              className="w-full text-left rounded-xl p-5 transition-all duration-300 group"
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.05)',
              }}
              whileHover={{
                background: 'rgba(0,212,255,0.04)',
                borderColor: 'rgba(0,212,255,0.15)',
              }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <span
                      className="text-[11px] px-2 py-0.5 rounded-md"
                      style={{
                        fontFamily: 'var(--font-mono)',
                        color: '#00d4ff',
                        background: 'rgba(0,212,255,0.08)',
                        border: '1px solid rgba(0,212,255,0.12)',
                      }}
                    >
                      {article.series}
                    </span>
                    <span
                      className="text-[11px]"
                      style={{ fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.2)' }}
                    >
                      {article.date}
                    </span>
                  </div>
                  <h2
                    className="text-base sm:text-lg mb-1 leading-tight"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 700,
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {article.title}
                  </h2>
                  <p className="text-[13px] leading-relaxed line-clamp-2" style={{ color: 'rgba(255,255,255,0.4)' }}>
                    {article.subtitle}
                  </p>
                </div>
                <div className="flex items-center gap-2 mt-1 flex-shrink-0">
                  <span className="text-[11px]" style={{ fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.2)' }}>
                    {article.readTime}
                  </span>
                  <ChevronRight
                    size={14}
                    className="transition-transform duration-300 group-hover:translate-x-0.5"
                    style={{ color: 'rgba(255,255,255,0.15)' }}
                  />
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   ARTICLE READER
   ═══════════════════════════════════════════ */

function ArticleReader({ article, onBack }: { article: LabArticle; onBack: () => void }) {
  const [activeHeading, setActiveHeading] = useState('');
  const contentRef = useRef<HTMLDivElement>(null);
  const isManualScrollRef = useRef(false);
  const { scrollYProgress } = useScroll();
  const progress = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  const handleTocSelect = useCallback((id: string) => {
    setActiveHeading(id);
    isManualScrollRef.current = true;
    setTimeout(() => { isManualScrollRef.current = false; }, 1000);
  }, []);

  useEffect(() => {
    setActiveHeading(article.headings[0]?.id || '');
    window.scrollTo({ top: 0 });

    const SCROLL_OFFSET = 100;

    const handleScroll = () => {
      if (isManualScrollRef.current) return;

      let activeId = article.headings[0]?.id || '';
      for (const h of article.headings) {
        const el = document.getElementById(h.id);
        if (el && el.getBoundingClientRect().top <= SCROLL_OFFSET) {
          activeId = h.id;
        }
      }
      setActiveHeading(activeId);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [article]);

  const tocItems: TocItem[] = article.headings.map((h) => ({
    id: h.id,
    label: h.title,
    level: h.level,
  }));

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 h-[2px] z-50"
        style={{
          width: progress,
          background: 'linear-gradient(90deg, #00d4ff, #8b5cf6)',
          boxShadow: '0 0 10px rgba(0,212,255,0.5)',
        }}
      />

      <div ref={contentRef} className="px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto pt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 pt-4"
        >
          <div className="flex items-center gap-2 mb-6" style={{ fontFamily: 'var(--font-mono)' }}>
            <button
              onClick={onBack}
              className="flex items-center gap-1 text-[11px] transition-colors duration-200"
              style={{ color: 'rgba(255,255,255,0.3)' }}
            >
              <ArrowLeft size={12} />
              Back
            </button>
            <ChevronRight size={12} style={{ color: 'rgba(255,255,255,0.15)' }} />
            <span className="text-[11px]" style={{ color: '#00d4ff' }}>
              {article.series}
            </span>
          </div>

          <h1
            className="text-3xl sm:text-4xl lg:text-5xl mb-4 leading-[1.15]"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              letterSpacing: '-0.02em',
            }}
          >
            {article.title}
          </h1>
          <p className="text-base sm:text-lg mb-6" style={{ color: 'rgba(255,255,255,0.45)' }}>
            {article.subtitle}
          </p>

          <div className="flex items-center gap-4" style={{ fontFamily: 'var(--font-mono)' }}>
            <div className="flex items-center gap-2 text-[12px]" style={{ color: 'rgba(255,255,255,0.3)' }}>
              <Clock size={12} />
              {article.readTime}
            </div>
            <span className="text-[12px]" style={{ color: 'rgba(255,255,255,0.2)' }}>
              {article.date}
            </span>
          </div>

          <div
            className="mt-8 h-[1px]"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(0,212,255,0.2), transparent)',
            }}
          />
        </motion.div>

        <article>
          {article.sections.map((section, i) => (
            <motion.section
              key={section.id}
              id={section.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="mb-12"
              style={{ scrollMarginTop: '80px' }}
            >
              <h2
                className="text-xl sm:text-2xl mb-4"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  letterSpacing: '-0.01em',
                }}
              >
                {section.title}
              </h2>

              <SectionContent content={section.content} />

              {section.code && (
                <CodeBlock
                  code={section.code.snippet}
                  filename={section.code.filename}
                  language={section.code.language}
                />
              )}
            </motion.section>
          ))}
        </article>

        <div className="mt-16 pt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              {['go', 'performance', 'networking', 'architecture'].map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] px-2.5 py-1 rounded-lg"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    color: 'rgba(255,255,255,0.35)',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.06)',
                  }}
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {createPortal(<TableOfContents items={tocItems} activeId={activeHeading} onSelect={handleTocSelect} />, document.body)}
    </>
  );
}

/* ═══════════════════════════════════════════
   LAB READER (EXPORT)
   ═══════════════════════════════════════════ */

export function LabReader() {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);

  const selectedArticle = selectedSlug
    ? ARTICLES.find((a) => a.slug === selectedSlug)
    : null;

  if (selectedArticle) {
    return (
      <ArticleReader
        article={selectedArticle}
        onBack={() => setSelectedSlug(null)}
      />
    );
  }

  return <ArticleIndex onSelect={setSelectedSlug} />;
}
