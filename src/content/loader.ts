/* ═══════════════════════════════════════════
   CONTENT TYPES
   ═══════════════════════════════════════════ */

export interface PulsePost {
  slug: string;
  date: string;
  content: string;
  code?: { language: string; snippet: string };
  tags: string[];
  likes: number;
  replies: number;
}

export interface LabSection {
  id: string;
  title: string;
  content: string;
  code?: { filename: string; language: string; snippet: string };
}

export interface LabHeading {
  id: string;
  title: string;
  level: number;
}

export interface LabArticle {
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  readTime: string;
  series: string;
  sections: LabSection[];
  headings: LabHeading[];
}

/* ═══════════════════════════════════════════
   FRONTMATTER PARSER
   ═══════════════════════════════════════════ */

function parseFrontmatter(raw: string): { meta: Record<string, any>; body: string } {
  const trimmed = raw.trim();
  if (!trimmed.startsWith('---')) return { meta: {}, body: trimmed };

  const endIdx = trimmed.indexOf('\n---', 4);
  if (endIdx === -1) return { meta: {}, body: trimmed };

  const fm = trimmed.slice(4, endIdx);
  const body = trimmed.slice(endIdx + 4).trim();

  const meta: Record<string, any> = {};
  const lines = fm.split('\n');
  let i = 0;

  while (i < lines.length) {
    const kvMatch = lines[i].match(/^(\w+):\s*(.*)/);
    if (!kvMatch) { i++; continue; }

    const key = kvMatch[1];
    const value = kvMatch[2].trim();

    if (value === '' && i + 1 < lines.length) {
      // Check next line for block array
      if (/^\s+- /.test(lines[i + 1])) {
        const arr: string[] = [];
        i++;
        while (i < lines.length && /^\s+- /.test(lines[i])) {
          arr.push(lines[i].replace(/^\s+- /, '').replace(/^["']|["']$/g, ''));
          i++;
        }
        meta[key] = arr;
        continue;
      }
      meta[key] = '';
    } else if (value.startsWith('[')) {
      meta[key] = value
        .replace(/[\[\]"']/g, '')
        .split(',')
        .map((s: string) => s.trim())
        .filter(Boolean);
    } else if (/^\d+$/.test(value)) {
      meta[key] = Number(value);
    } else {
      meta[key] = value.replace(/^["']|["']$/g, '');
    }

    i++;
  }

  return { meta, body };
}

/* ═══════════════════════════════════════════
   CODE-BLOCK EXTRACTION
   ═══════════════════════════════════════════ */

function extractCodeFromBody(
  body: string,
): { text: string; code?: { language: string; snippet: string } } {
  const codeRe = /```(\w+)(?:\n|\s*\n)([\s\S]*?)```/;
  const match = body.match(codeRe);
  const text = body.replace(/```[\s\S]*?```/g, '').replace(/\n{3,}/g, '\n\n').trim();

  if (match) {
    return { text, code: { language: match[1], snippet: match[2].trim() } };
  }
  return { text };
}

/* ═══════════════════════════════════════════
   LAB SECTION PARSER
   ═══════════════════════════════════════════ */

function parseLabSections(body: string): LabSection[] {
  const sections: LabSection[] = [];
  const headingRe = /^## (.+)$/gm;

  type Split = { title: string; id: string; bodyStart: number };
  const splits: Split[] = [];

  let m;
  while ((m = headingRe.exec(body)) !== null) {
    const raw = m[1];
    const idM = raw.match(/^(.+?)\s*\{#(\w+)\}$/);
    const title = (idM ? idM[1] : raw).trim();
    const id = idM ? idM[2] : title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    splits.push({ title, id, bodyStart: m.index + m[0].length });
  }

  for (let i = 0; i < splits.length; i++) {
    const start = splits[i].bodyStart;
    const end = i + 1 < splits.length
      ? body.lastIndexOf('## ', start) === -1
        ? body.length
        : body.indexOf('\n## ', start)
      : body.length;
    const sectionBody = body.slice(start, end === -1 ? body.length : end).trim();

    // Extract first code block
    const codeRe = /```(\w+)(?::([^\n]+))?\n([\s\S]*?)```/;
    const codeMatch = sectionBody.match(codeRe);
    const content = sectionBody
      .replace(/```[\s\S]*?```/g, '')
      .replace(/\n{3,}/g, '\n\n')
      .trim();

    sections.push({
      id: splits[i].id,
      title: splits[i].title,
      content,
      code: codeMatch
        ? {
            language: codeMatch[1],
            filename: codeMatch[2] || `snippet.${codeMatch[1]}`,
            snippet: codeMatch[3].trim(),
          }
        : undefined,
    });
  }

  return sections;
}

/* ═══════════════════════════════════════════
   HEADING EXTRACTOR
   ═══════════════════════════════════════════ */

function extractHeadings(body: string): LabHeading[] {
  const headings: LabHeading[] = [];
  const re = /^(#{2,})\s+(.+)$/gm;
  let m;
  while ((m = re.exec(body)) !== null) {
    const level = m[1].length;
    const raw = m[2];
    const idM = raw.match(/^(.+?)\s*\{#(\w+)\}$/);
    const title = (idM ? idM[1] : raw).trim();
    const id = idM ? idM[2] : title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    headings.push({ id, title, level });
  }
  return headings;
}

/* ═══════════════════════════════════════════
   GLOB IMPORTS
   ═══════════════════════════════════════════ */

const pulseRaw = import.meta.glob('./pulse/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

const labRaw = import.meta.glob('./lab/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

/* ═══════════════════════════════════════════
   PUBLIC LOADERS
   ═══════════════════════════════════════════ */

function slugFromPath(path: string): string {
  return path.split('/').pop()!.replace(/\.md$/, '');
}

export function loadPulsePosts(): PulsePost[] {
  const posts = Object.entries(pulseRaw).map(([path, raw]) => {
    const { meta, body } = parseFrontmatter(raw);
    const { text, code } = extractCodeFromBody(body);
    return {
      slug: slugFromPath(path),
      date: meta.date || '',
      content: text,
      code,
      tags: meta.tags || [],
      likes: meta.likes || 0,
      replies: meta.replies || 0,
    };
  });

  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return posts;
}

export function loadLabArticles(): LabArticle[] {
  const articles = Object.entries(labRaw).map(([path, raw]) => {
    const { meta, body } = parseFrontmatter(raw);
    return {
      slug: slugFromPath(path),
      title: meta.title || '',
      subtitle: meta.subtitle || '',
      date: meta.date || '',
      readTime: meta.readTime || '',
      series: meta.series || '',
      sections: parseLabSections(body),
      headings: extractHeadings(body),
    };
  });

  articles.sort((a, b) => (a.date > b.date ? -1 : 1));
  return articles;
}
