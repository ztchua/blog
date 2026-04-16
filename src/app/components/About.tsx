export function About() {
  const stats = [
    { label: 'Years of Experience', value: '5+' },
    { label: 'Projects Completed', value: '50+' },
    { label: 'Technical Articles', value: '30+' },
    { label: 'Open Source Contributions', value: '100+' }
  ];

  return (
    <div className="min-h-screen flex items-center px-6 lg:px-16 py-20">
      <div className="max-w-6xl mx-auto w-full">
        <div className="mb-12">
          <span className="text-sm text-primary mb-4 block" style={{ fontFamily: 'var(--font-mono)' }}>
            {'// WHO I AM'}
          </span>
          <h2 className="text-5xl lg:text-6xl mb-6" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
            About Me
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left: Bio */}
          <div className="space-y-6">
            <p className="text-lg text-foreground/90 leading-relaxed">
              I'm a software engineer with a passion for building elegant solutions to complex problems.
              My journey in tech started with curiosity and has evolved into a career focused on creating
              scalable, maintainable systems.
            </p>

            <p className="text-lg text-muted-foreground leading-relaxed">
              Beyond writing code, I believe in the power of knowledge sharing. I regularly write
              technical articles, contribute to open-source projects, and mentor aspiring developers.
              My approach combines technical excellence with clear communication.
            </p>

            <p className="text-lg text-muted-foreground leading-relaxed">
              When I'm not coding, you'll find me exploring new technologies, reading technical papers,
              or experimenting with side projects. I'm particularly interested in distributed systems,
              cloud architecture, and developer tooling.
            </p>

            <div className="pt-6 flex items-center gap-4">
              <div className="flex -space-x-2">
                {['TypeScript', 'React', 'Node.js', 'Go', 'Rust'].map((tech, i) => (
                  <div
                    key={tech}
                    className="w-10 h-10 rounded-full bg-card border-2 border-background flex items-center justify-center text-xs text-primary"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      animation: `fadeIn 0.5s ease-out ${i * 0.1}s backwards`
                    }}
                    title={tech}
                  >
                    {tech[0]}
                  </div>
                ))}
              </div>
              <span className="text-sm text-muted-foreground">and more...</span>
            </div>
          </div>

          {/* Right: Stats grid */}
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="p-6 rounded-xl border-2 border-primary/30 bg-card hover:border-primary hover:shadow-2xl transition-all duration-300 group relative overflow-hidden"
                style={{
                  animation: `slideInUp 0.6s ease-out ${index * 0.1}s backwards`,
                  boxShadow: '0 8px 32px rgba(255, 0, 128, 0.15)'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                     style={{ animation: 'gradientRotate 6s ease infinite' }} />
                <div className="space-y-3 relative z-10">
                  <div
                    className="text-4xl lg:text-5xl bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 700,
                      backgroundSize: '200% auto',
                      animation: 'gradientShift 5s ease infinite'
                    }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground leading-snug font-medium">
                    {stat.label}
                  </div>
                </div>
                <div className="mt-4 h-1 w-0 group-hover:w-full bg-gradient-to-r from-primary via-secondary to-accent transition-all duration-500 rounded-full relative z-10"
                     style={{ boxShadow: '0 0 10px var(--glow-primary)' }} />
              </div>
            ))}
          </div>
        </div>

        {/* Timeline/Journey section */}
        <div className="mt-20 pt-16 border-t border-border">
          <h3 className="text-3xl mb-12" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
            Professional Journey
          </h3>

          <div className="space-y-8 relative pl-8 border-l-2 border-primary/30">
            {[
              {
                year: '2026',
                title: 'Senior Full-Stack Engineer',
                company: 'Tech Innovation Labs',
                description: 'Leading development of cloud-native applications and mentoring junior developers.'
              },
              {
                year: '2024',
                title: 'Full-Stack Developer',
                company: 'StartupXYZ',
                description: 'Built scalable microservices architecture serving 100K+ daily active users.'
              },
              {
                year: '2022',
                title: 'Software Engineer',
                company: 'DevCorp Solutions',
                description: 'Developed and maintained multiple client-facing applications using modern web technologies.'
              },
              {
                year: '2021',
                title: 'Started Tech Journey',
                company: 'Self-taught',
                description: 'Began learning programming and building personal projects.'
              }
            ].map((item, index) => (
              <div
                key={item.year}
                className="relative -ml-11 pl-11"
                style={{ animation: `fadeInLeft 0.6s ease-out ${index * 0.15}s backwards` }}
              >
                {/* Timeline dot */}
                <div className="absolute left-0 -translate-x-1/2 w-6 h-6 rounded-full bg-primary border-4 border-background flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-background" />
                </div>

                <div className="pb-8">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-sm px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20" style={{ fontFamily: 'var(--font-mono)' }}>
                      {item.year}
                    </span>
                  </div>
                  <h4 className="text-xl mb-1" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
                    {item.title}
                  </h4>
                  <p className="text-primary mb-2" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.875rem' }}>
                    {item.company}
                  </p>
                  <p className="text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes gradientShift {
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
