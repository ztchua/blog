export function TechStack() {
  const techCategories = [
    {
      category: 'Languages',
      items: ['TypeScript', 'JavaScript', 'Python', 'Go', 'Rust', 'SQL']
    },
    {
      category: 'Frontend',
      items: ['React', 'Next.js', 'Vue.js', 'Tailwind CSS', 'Vite', 'Framer Motion']
    },
    {
      category: 'Backend',
      items: ['Node.js', 'Express', 'Fastify', 'PostgreSQL', 'MongoDB', 'Redis']
    },
    {
      category: 'DevOps & Cloud',
      items: ['Docker', 'Kubernetes', 'AWS', 'GCP', 'CI/CD', 'Terraform']
    },
    {
      category: 'Tools',
      items: ['Git', 'VSCode', 'Linux', 'Figma', 'Postman', 'Grafana']
    }
  ];

  return (
    <div className="min-h-screen flex items-center px-6 lg:px-16 py-20">
      <div className="max-w-6xl mx-auto w-full">
        <div className="mb-16">
          <span className="text-sm text-primary mb-4 block" style={{ fontFamily: 'var(--font-mono)' }}>
            {'// TECHNICAL EXPERTISE'}
          </span>
          <h2 className="text-5xl lg:text-6xl mb-6" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
            Tech Stack
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            A comprehensive toolkit for building modern, scalable applications. Always learning, always evolving.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {techCategories.map((category, catIndex) => (
            <div
              key={category.category}
              className="p-6 rounded-xl border-2 border-primary/20 bg-card hover:border-primary hover:shadow-2xl transition-all duration-300 group relative overflow-hidden"
              style={{
                animation: `cardSlideIn 0.6s ease-out ${catIndex * 0.1}s backwards`,
                boxShadow: '0 4px 24px rgba(255, 0, 128, 0.15)'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                   style={{ animation: 'gradientRotate 8s ease infinite' }} />
              <div className="flex items-center gap-3 mb-6 relative z-10">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 border-2 border-primary/30 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 relative"
                     style={{ boxShadow: '0 0 20px rgba(255, 0, 128, 0.2)' }}>
                  <svg className="w-5 h-5 text-primary group-hover:text-secondary transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {catIndex === 0 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />}
                    {catIndex === 1 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />}
                    {catIndex === 2 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />}
                    {catIndex === 3 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />}
                    {catIndex === 4 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />}
                  </svg>
                </div>
                <h3 className="text-xl" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
                  {category.category}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2 relative z-10">
                {category.items.map((item, itemIndex) => (
                  <span
                    key={item}
                    className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-muted/50 to-muted/30 text-sm text-foreground font-medium border-2 border-border/50 hover:border-primary hover:bg-gradient-to-r hover:from-primary/10 hover:to-secondary/10 hover:scale-105 transition-all duration-300 cursor-default"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.8125rem',
                      animation: `tagFadeIn 0.4s ease-out ${(catIndex * 0.1) + (itemIndex * 0.05)}s backwards`,
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Certifications/Learning section */}
        <div className="mt-16 p-8 rounded-xl border-2 border-primary/40 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 relative overflow-hidden group"
             style={{ boxShadow: '0 10px 50px rgba(255, 0, 128, 0.2)' }}>
          {/* Animated background pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-32 h-32 border-4 border-primary rounded-full -translate-x-1/2 -translate-y-1/2"
                 style={{ animation: 'spin 20s linear infinite' }} />
            <div className="absolute bottom-0 right-0 w-40 h-40 border-4 border-secondary rounded-lg translate-x-1/4 translate-y-1/4 rotate-12"
                 style={{ animation: 'spin 15s linear infinite reverse' }} />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5"
               style={{ animation: 'gradientRotate 10s ease infinite', backgroundSize: '200% 100%' }} />

          <div className="relative z-10">
            <h3 className="text-2xl mb-4" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
              Continuous Learning
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl">
              Staying current in an ever-evolving field. Currently exploring advanced topics in distributed
              systems, WebAssembly, and AI/ML integration.
            </p>
            <div className="flex flex-wrap gap-3">
              {['AWS Certified', 'Google Cloud Associate', 'Kubernetes Administrator', 'TypeScript Expert'].map((cert, i) => (
                <div
                  key={cert}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-primary/30"
                  style={{ animation: `slideInRight 0.5s ease-out ${i * 0.1}s backwards` }}
                >
                  <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm" style={{ fontFamily: 'var(--font-mono)' }}>
                    {cert}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes cardSlideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes tagFadeIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
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

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
