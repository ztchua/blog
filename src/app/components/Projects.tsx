import { useState } from 'react';

export function Projects() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const projects = [
    {
      id: 1,
      title: 'CloudScale',
      description: 'A distributed task queue system built with Go and Redis. Handles 10M+ tasks daily with sub-second latency. Features automatic scaling, priority queues, and comprehensive monitoring.',
      tech: ['Go', 'Redis', 'Docker', 'Prometheus'],
      github: 'https://github.com',
      demo: 'https://demo.com',
      stats: { stars: 234, forks: 45 },
      type: 'Open Source'
    },
    {
      id: 2,
      title: 'DevDash',
      description: 'Real-time analytics dashboard for development teams. Aggregates data from GitHub, Jira, and CI/CD pipelines. Built with React, Node.js, and WebSockets for live updates.',
      tech: ['React', 'Node.js', 'PostgreSQL', 'WebSocket'],
      github: 'https://github.com',
      demo: 'https://demo.com',
      stats: { stars: 567, forks: 89 },
      type: 'SaaS'
    },
    {
      id: 3,
      title: 'API Gateway Pro',
      description: 'High-performance API gateway with rate limiting, authentication, and request transformation. Processes 50K requests/second with minimal overhead.',
      tech: ['Rust', 'Redis', 'Docker', 'Kubernetes'],
      github: 'https://github.com',
      demo: null,
      stats: { stars: 892, forks: 134 },
      type: 'Open Source'
    },
    {
      id: 4,
      title: 'CodeSnap',
      description: 'VS Code extension for creating beautiful code screenshots with custom themes and syntax highlighting. Downloaded 100K+ times.',
      tech: ['TypeScript', 'VS Code API', 'Canvas'],
      github: 'https://github.com',
      demo: 'https://marketplace.visualstudio.com',
      stats: { stars: 1243, forks: 78 },
      type: 'Extension'
    },
    {
      id: 5,
      title: 'MLOps Pipeline',
      description: 'End-to-end machine learning pipeline with automated training, versioning, and deployment. Integrates with popular ML frameworks.',
      tech: ['Python', 'TensorFlow', 'Airflow', 'AWS'],
      github: 'https://github.com',
      demo: null,
      stats: { stars: 445, forks: 67 },
      type: 'Enterprise'
    },
    {
      id: 6,
      title: 'ChatConnect',
      description: 'Real-time chat application with end-to-end encryption. Supports file sharing, video calls, and custom emoji reactions.',
      tech: ['Next.js', 'WebRTC', 'Socket.io', 'MongoDB'],
      github: 'https://github.com',
      demo: 'https://demo.com',
      stats: { stars: 678, forks: 123 },
      type: 'Web App'
    }
  ];

  return (
    <div className="min-h-screen px-6 lg:px-16 py-20">
      <div className="max-w-6xl mx-auto w-full">
        <div className="mb-16">
          <span className="text-sm text-primary mb-4 block" style={{ fontFamily: 'var(--font-mono)' }}>
            {'// PORTFOLIO'}
          </span>
          <h2 className="text-5xl lg:text-6xl mb-6" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
            Featured Projects
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            A selection of projects I've built, contributed to, or maintain. From open-source tools to enterprise solutions.
          </p>
        </div>

        {/* Projects grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="group relative"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              style={{ animation: `projectFadeIn 0.6s ease-out ${index * 0.1}s backwards` }}
            >
              {/* Card */}
              <div className="p-8 rounded-xl border-2 border-primary/20 bg-card backdrop-blur-sm hover:border-primary hover:shadow-2xl transition-all duration-500 h-full flex flex-col relative overflow-hidden group/card"
                   style={{
                     boxShadow: '0 8px 32px rgba(255, 0, 128, 0.15)',
                     transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                   }}>

                {/* Animated gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"
                     style={{ animation: 'gradientRotate 8s ease infinite' }} />
                <div className="absolute -inset-[1px] bg-gradient-to-r from-primary via-secondary to-accent opacity-0 group-hover/card:opacity-20 rounded-xl blur-xl transition-opacity duration-500" />

                {/* Type badge */}
                <div className="relative z-10 mb-4">
                  <span className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 text-primary border-2 border-primary/40 text-xs font-medium"
                        style={{
                          fontFamily: 'var(--font-mono)',
                          boxShadow: '0 0 15px rgba(255, 0, 128, 0.3)'
                        }}>
                    {project.type}
                  </span>
                </div>

                {/* Title */}
                <h3 className="relative z-10 text-2xl mb-3 group-hover:text-primary transition-colors duration-300"
                    style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
                  {project.title}
                </h3>

                {/* Description */}
                <p className="relative z-10 text-muted-foreground leading-relaxed mb-6 flex-grow">
                  {project.description}
                </p>

                {/* Tech stack */}
                <div className="relative z-10 flex flex-wrap gap-2 mb-6">
                  {project.tech.map(tech => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-md bg-muted/30 text-sm border border-border/50 group-hover:border-primary/30 transition-colors duration-300"
                      style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem' }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Stats */}
                <div className="relative z-10 flex items-center gap-6 mb-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span style={{ fontFamily: 'var(--font-mono)' }}>{project.stats.stars}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span style={{ fontFamily: 'var(--font-mono)' }}>{project.stats.forks}</span>
                  </div>
                </div>

                {/* Links */}
                <div className="relative z-10 flex gap-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all duration-300 text-sm"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                    Code
                  </a>
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-primary via-secondary to-primary text-white hover:shadow-2xl transition-all duration-300 text-sm group/btn relative overflow-hidden"
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontWeight: 500,
                        boxShadow: hoveredProject === project.id ? '0 8px 40px var(--glow-primary)' : '0 4px 20px rgba(255, 0, 128, 0.3)',
                        backgroundSize: '200% 100%',
                        animation: 'shimmer 3s ease-in-out infinite'
                      }}
                    >
                      <span className="relative z-10">Live Demo</span>
                      <svg className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* GitHub CTA */}
        <div className="mt-16 text-center">
          <div className="inline-block p-8 rounded-xl border border-primary/20 bg-gradient-to-br from-primary/5 to-transparent backdrop-blur-sm">
            <svg className="w-12 h-12 text-primary mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            <h3 className="text-2xl mb-3" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
              More on GitHub
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Explore my full portfolio of open-source projects, contributions, and experiments.
            </p>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:shadow-lg transition-all duration-300"
              style={{ fontFamily: 'var(--font-body)', fontWeight: 500 }}
            >
              Visit GitHub Profile
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes projectFadeIn {
          from {
            opacity: 0;
            transform: translateY(30px);
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

        @keyframes gradientRotate {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </div>
  );
}
