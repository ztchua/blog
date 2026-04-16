import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, MessageCircle, Share2, Code2, Hash, ChevronDown } from 'lucide-react';
import confetti from 'canvas-confetti';
import { loadPulsePosts, type PulsePost } from '../../../content/loader';

const POSTS = loadPulsePosts();

const TAG_COLORS: Record<string, string> = {
  rust: '#ff4d6d',
  go: '#00d4ff',
  systems: '#8b5cf6',
  devops: '#ff006e',
  kubernetes: '#3a86ff',
  aws: '#ffbe0b',
  terraform: '#8b5cf6',
  wasm: '#00ff88',
  performance: '#ff006e',
  postgresql: '#3a86ff',
  architecture: '#8b5cf6',
  monitoring: '#00d4ff',
  gitops: '#ffbe0b',
  'memory-safety': '#00ff88',
  networking: '#00d4ff',
  operators: '#3a86ff',
  platform: '#ff4d6d',
  observability: '#00ff88',
  debugging: '#ffbe0b',
  microservices: '#8b5cf6',
  eks: '#ffbe0b',
  hcl: '#8b5cf6',
};

function PulseCard({ post, index }: { post: PulsePost; index: number }) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);

  const handleLike = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      const newLiked = !liked;
      setLiked(newLiked);
      setLikeCount((prev) => (newLiked ? prev + 1 : prev - 1));

      if (newLiked) {
        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
        const x = (rect.left + rect.width / 2) / window.innerWidth;
        const y = (rect.top + rect.height / 2) / window.innerHeight;

        confetti({
          particleCount: 25,
          spread: 55,
          origin: { x, y },
          colors: ['#ff006e', '#00d4ff', '#8b5cf6', '#00ff88', '#ffbe0b', '#3a86ff'],
          ticks: 40,
          gravity: 0.9,
          scalar: 0.7,
          shapes: ['circle'],
          drift: 0,
        });
      }
    },
    [liked]
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: index * 0.05 }}
      className="break-inside-avoid mb-5 group"
    >
      <div
        className="relative rounded-2xl overflow-hidden transition-all duration-500 cursor-pointer"
        style={{
          background: 'rgba(255, 255, 255, 0.03)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.06)',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255, 255, 255, 0.12)';
          (e.currentTarget as HTMLElement).style.boxShadow = '0 16px 48px rgba(0, 0, 0, 0.3)';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255, 255, 255, 0.06)';
          (e.currentTarget as HTMLElement).style.boxShadow = 'none';
        }}
      >
        {/* Iridescent hover shimmer */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          style={{
            background:
              'linear-gradient(135deg, rgba(255,0,110,0.04) 0%, rgba(0,212,255,0.04) 25%, rgba(139,92,246,0.04) 50%, rgba(0,255,136,0.04) 75%, rgba(255,190,11,0.04) 100%)',
          }}
        />

        <div className="relative z-10 p-5">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <time
              className="text-[11px] tracking-wide"
              style={{ fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.25)' }}
            >
              {new Date(post.date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
              })}
            </time>
            <div
              className="w-1.5 h-1.5 rounded-full"
              style={{
                background: 'rgba(255, 255, 255, 0.15)',
                boxShadow: '0 0 6px rgba(255, 255, 255, 0.1)',
              }}
            />
          </div>

          {/* Content */}
          <p
            className="text-[14px] leading-[1.7] mb-4"
            style={{ color: 'rgba(255, 255, 255, 0.7)' }}
          >
            {post.content}
          </p>

          {/* Code snippet */}
          {post.code && (
            <div
              className="mb-4 rounded-xl overflow-hidden"
              style={{
                background: 'rgba(0, 0, 0, 0.4)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
              }}
            >
              <div
                className="flex items-center gap-2 px-4 py-2"
                style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}
              >
                <Code2 size={12} style={{ color: 'rgba(255,255,255,0.3)' }} />
                <span
                  className="text-[10px] uppercase tracking-wider"
                  style={{ fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.25)' }}
                >
                  {post.code.language}
                </span>
              </div>
              <pre className="p-4 overflow-x-auto">
                <code
                  className="text-[12px] leading-[1.6]"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    color: '#00ff88',
                  }}
                >
                  {post.code.snippet}
                </code>
              </pre>
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-lg"
                style={{
                  fontFamily: 'var(--font-mono)',
                  color: TAG_COLORS[tag] || 'rgba(255,255,255,0.5)',
                  background: `${TAG_COLORS[tag] || '#ffffff'}10`,
                  border: `1px solid ${TAG_COLORS[tag] || '#ffffff'}15`,
                }}
              >
                <Hash size={10} />
                {tag}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div
            className="flex items-center gap-5 pt-3"
            style={{ borderTop: '1px solid rgba(255, 255, 255, 0.04)' }}
          >
            <button
              onClick={handleLike}
              className="flex items-center gap-1.5 transition-all duration-200 group/like"
            >
              <Heart
                size={14}
                className="transition-all duration-200"
                style={{
                  color: liked ? '#ff006e' : 'rgba(255,255,255,0.3)',
                  fill: liked ? '#ff006e' : 'none',
                  filter: liked ? 'drop-shadow(0 0 8px rgba(255,0,110,0.5))' : 'none',
                }}
              />
              <span
                className="text-[11px]"
                style={{
                  fontFamily: 'var(--font-mono)',
                  color: liked ? '#ff006e' : 'rgba(255,255,255,0.3)',
                }}
              >
                {likeCount}
              </span>
            </button>

            <button className="flex items-center gap-1.5">
              <MessageCircle size={14} style={{ color: 'rgba(255,255,255,0.3)' }} />
              <span
                className="text-[11px]"
                style={{ fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.3)' }}
              >
                {post.replies}
              </span>
            </button>

            <button className="flex items-center gap-1.5 ml-auto">
              <Share2 size={14} style={{ color: 'rgba(255,255,255,0.3)' }} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function PulseFeed() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  const allTags = Array.from(new Set(POSTS.flatMap((p) => p.tags))).sort();
  const filteredPosts = selectedTag
    ? POSTS.filter((p) => p.tags.includes(selectedTag))
    : POSTS;
  const visiblePosts = showAll ? filteredPosts : filteredPosts.slice(0, 6);

  return (
    <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="mb-12"
      >
        <div
          className="flex items-center gap-3 mb-4"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          <div
            className="w-2 h-2 rounded-full"
            style={{
              background: '#ff006e',
              boxShadow: '0 0 12px rgba(255,0,110,0.5)',
            }}
          />
          <span className="text-xs tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.3)' }}>
            Live feed
          </span>
        </div>

        <h1
          className="text-4xl sm:text-5xl lg:text-6xl mb-3"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            letterSpacing: '-0.02em',
          }}
        >
          Tweets
        </h1>
        <p className="text-base max-w-xl" style={{ color: 'rgba(255,255,255,0.4)' }}>
          Quick thoughts, technical discoveries, and lessons from the terminal.
        </p>
      </motion.div>

      {/* Tag filter bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="flex flex-wrap gap-2 mb-10"
      >
        <button
          onClick={() => setSelectedTag(null)}
          className="px-3.5 py-1.5 rounded-lg text-[12px] transition-all duration-300"
          style={{
            fontFamily: 'var(--font-mono)',
            background: selectedTag === null ? 'rgba(255,255,255,0.08)' : 'transparent',
            border: `1px solid ${selectedTag === null ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.06)'}`,
            color: selectedTag === null ? '#f0f0f5' : 'rgba(255,255,255,0.35)',
          }}
        >
          All
        </button>
        {allTags.slice(0, 8).map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
            className="px-3.5 py-1.5 rounded-lg text-[12px] transition-all duration-300"
            style={{
              fontFamily: 'var(--font-mono)',
              background:
                selectedTag === tag
                  ? `${TAG_COLORS[tag] || '#ffffff'}15`
                  : 'transparent',
              border: `1px solid ${
                selectedTag === tag
                  ? `${TAG_COLORS[tag] || '#ffffff'}30`
                  : 'rgba(255,255,255,0.06)'
              }`,
              color:
                selectedTag === tag
                  ? TAG_COLORS[tag] || '#fff'
                  : 'rgba(255,255,255,0.35)',
            }}
          >
            #{tag}
          </button>
        ))}
      </motion.div>

      {/* Masonry grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-5">
        {visiblePosts.map((post, i) => (
          <PulseCard key={post.slug} post={post} index={i} />
        ))}
      </div>

      {/* Load more */}
      {filteredPosts.length > 6 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center mt-12"
        >
          <button
            onClick={() => setShowAll(!showAll)}
            className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm transition-all duration-300"
            style={{
              fontFamily: 'var(--font-body)',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              color: 'rgba(255,255,255,0.5)',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.15)';
              (e.currentTarget as HTMLElement).style.color = '#f0f0f5';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)';
              (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.5)';
            }}
          >
            {showAll ? 'Show less' : 'Load more'}
            <ChevronDown
              size={16}
              className={`transition-transform duration-300 ${showAll ? 'rotate-180' : ''}`}
            />
          </button>
        </motion.div>
      )}
    </div>
  );
}
