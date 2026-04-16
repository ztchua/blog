import { useState } from 'react';

export function MicroBlog() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const posts = [
    {
      id: 1,
      date: '2026-04-12',
      title: 'The Beauty of Rust\'s Ownership Model',
      content: 'Spent the weekend diving deep into Rust\'s ownership system. The compiler forcing you to think about memory management upfront is brilliant—no more surprise runtime errors. The borrow checker is like having a strict but fair code reviewer.',
      tags: ['rust', 'systems-programming', 'memory-safety'],
      readTime: '3 min read',
      reactions: 42
    },
    {
      id: 2,
      date: '2026-04-10',
      title: 'Optimizing Database Queries: A Case Study',
      content: 'Reduced query time from 2.4s to 180ms by adding a composite index and restructuring our JOIN operations. Key lesson: always check your query execution plans. EXPLAIN is your best friend.',
      tags: ['database', 'optimization', 'postgresql'],
      readTime: '5 min read',
      reactions: 67
    },
    {
      id: 3,
      date: '2026-04-08',
      title: 'TypeScript 5.5: What\'s New',
      content: 'The new decorators implementation is a game-changer. Native support without experimental flags means cleaner metadata handling for dependency injection. Also loving the improved type inference in generic functions.',
      tags: ['typescript', 'javascript', 'web-dev'],
      readTime: '4 min read',
      reactions: 89
    },
    {
      id: 4,
      date: '2026-04-05',
      title: 'Microservices Communication Patterns',
      content: 'Comparing event-driven vs request-response patterns in our microservices architecture. Event sourcing with Kafka is winning for async workflows, but sync REST still makes sense for simple CRUD operations. Context matters.',
      tags: ['microservices', 'architecture', 'kafka'],
      readTime: '6 min read',
      reactions: 54
    },
    {
      id: 5,
      date: '2026-04-02',
      title: 'Why I Love Terminal Multiplexers',
      content: 'tmux has transformed my workflow. Multiple panes, session persistence, and vim keybindings—everything I need without leaving the terminal. Plus, it makes pair programming over SSH seamless.',
      tags: ['productivity', 'terminal', 'tools'],
      readTime: '2 min read',
      reactions: 35
    },
    {
      id: 6,
      date: '2026-03-30',
      title: 'React Server Components in Production',
      content: 'Migrated our dashboard to RSC. Initial bundle size dropped by 40%, but debugging is trickier. Worth it for the performance gains, but be prepared for a learning curve. The mental model shift is real.',
      tags: ['react', 'nextjs', 'performance'],
      readTime: '7 min read',
      reactions: 103
    }
  ];

  const allTags = Array.from(new Set(posts.flatMap(post => post.tags))).sort();

  const filteredPosts = selectedTag
    ? posts.filter(post => post.tags.includes(selectedTag))
    : posts;

  return (
    <div className="min-h-screen px-6 lg:px-16 py-20">
      <div className="max-w-6xl mx-auto w-full">
        <div className="mb-16">
          <span className="text-sm text-primary mb-4 block" style={{ fontFamily: 'var(--font-mono)' }}>
            {'// LATEST THOUGHTS'}
          </span>
          <h2 className="text-5xl lg:text-6xl mb-6" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
            Micro-Blog
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mb-8">
            Quick thoughts, technical discoveries, and lessons learned from building software.
          </p>

          {/* Tag filter */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedTag(null)}
              className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                selectedTag === null
                  ? 'bg-gradient-to-r from-primary via-secondary to-primary text-white shadow-lg'
                  : 'bg-card border-2 border-border hover:border-primary/60 hover:bg-primary/5'
              }`}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8125rem',
                boxShadow: selectedTag === null ? '0 5px 25px var(--glow-primary)' : 'none',
                backgroundSize: selectedTag === null ? '200% 100%' : 'auto',
                animation: selectedTag === null ? 'shimmer 3s ease-in-out infinite' : 'none'
              }}
            >
              All
            </button>
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                  selectedTag === tag
                    ? 'bg-gradient-to-r from-primary via-secondary to-primary text-white shadow-lg'
                    : 'bg-card border-2 border-border hover:border-primary/60 hover:bg-gradient-to-r hover:from-primary/10 hover:to-secondary/10'
                }`}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8125rem',
                  boxShadow: selectedTag === tag ? '0 5px 25px var(--glow-primary)' : 'none',
                  backgroundSize: selectedTag === tag ? '200% 100%' : 'auto',
                  animation: selectedTag === tag ? 'shimmer 3s ease-in-out infinite' : 'none'
                }}
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>

        {/* Blog posts grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {filteredPosts.map((post, index) => (
            <article
              key={post.id}
              className="group p-6 rounded-xl border border-primary/10 bg-card/40 backdrop-blur-sm hover:border-primary/30 transition-all duration-300 cursor-pointer relative overflow-hidden"
              style={{
                animation: `postSlideIn 0.5s ease-out ${index * 0.1}s backwards`,
                boxShadow: '0 4px 24px rgba(0, 0, 0, 0.1)'
              }}
            >
              {/* Hover glow effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
              </div>

              <div className="relative z-10">
                {/* Date and read time */}
                <div className="flex items-center justify-between mb-4 text-xs text-muted-foreground" style={{ fontFamily: 'var(--font-mono)' }}>
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </time>
                  <span>{post.readTime}</span>
                </div>

                {/* Title */}
                <h3 className="text-xl mb-3 group-hover:text-primary transition-colors duration-300" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
                  {post.title}
                </h3>

                {/* Content */}
                <p className="text-muted-foreground leading-relaxed mb-4 line-clamp-3">
                  {post.content}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map(tag => (
                    <span
                      key={tag}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedTag(tag === selectedTag ? null : tag);
                      }}
                      className={`px-2 py-1 rounded text-xs border transition-all duration-300 ${
                        selectedTag === tag
                          ? 'bg-primary/20 text-primary border-primary/40'
                          : 'bg-muted/30 text-muted-foreground border-border/50 hover:border-primary/40 hover:text-primary'
                      }`}
                      style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-border/50">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <span style={{ fontFamily: 'var(--font-mono)' }}>{post.reactions}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span>Read more</span>
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <div className="inline-block p-8 rounded-xl border border-primary/20 bg-gradient-to-br from-primary/5 to-transparent backdrop-blur-sm">
            <h3 className="text-2xl mb-3" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
              Want to read more?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              I publish in-depth technical articles on my blog and contribute to various tech publications.
            </p>
            <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:shadow-lg transition-all duration-300"
                    style={{ fontFamily: 'var(--font-body)', fontWeight: 500 }}>
              Visit My Blog
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes postSlideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -200% center;
          }
          100% {
            background-position: 200% center;
          }
        }
      `}</style>
    </div>
  );
}
