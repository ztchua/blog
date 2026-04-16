import { useState } from 'react';

interface SidebarProps {
  activeSection: string;
}

export function Sidebar({ activeSection }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const sections = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'tech', label: 'Tech Stack' },
    { id: 'blog', label: 'Thoughts' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' }
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-6 left-6 z-50 w-12 h-12 rounded-full bg-card border border-primary/30 flex items-center justify-center hover:border-primary transition-all duration-300"
        style={{ backdropFilter: 'blur(10px)' }}
      >
        <div className="w-5 h-4 flex flex-col justify-between">
          <span className={`block h-0.5 bg-primary transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
          <span className={`block h-0.5 bg-primary transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
          <span className={`block h-0.5 bg-primary transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
        </div>
      </button>

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-screen w-72 border-r border-sidebar-border bg-sidebar/95 backdrop-blur-xl z-40 transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="h-full flex flex-col p-8">
          {/* Logo/Name */}
          <div className="mb-12">
            <h1 className="text-3xl mb-2 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent"
                style={{ fontFamily: 'var(--font-display)', fontWeight: 700, animation: 'gradientShift 6s ease infinite', backgroundSize: '200% auto' }}>
              TechNova
            </h1>
            <p className="text-sm text-muted-foreground" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
              {'<dev.insights />'}
            </p>
            <div className="mt-3 h-1 w-16 bg-gradient-to-r from-primary via-secondary to-accent rounded-full"
                 style={{ animation: 'shimmer 2s ease-in-out infinite' }} />
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1">
            {sections.map((section, index) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 group relative overflow-hidden ${
                  activeSection === section.id
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                style={{
                  animationDelay: `${index * 50}ms`,
                  animation: 'slideInLeft 0.5s ease-out forwards'
                }}
              >
                {activeSection === section.id && (
                  <span
                    className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 rounded-lg"
                    style={{
                      boxShadow: '0 0 30px var(--glow-primary), inset 0 0 20px rgba(255, 0, 128, 0.1)',
                      animation: 'shimmer 2s ease-in-out infinite',
                      backgroundSize: '200% 100%'
                    }}
                  />
                )}
                <span className="relative flex items-center gap-3">
                  <span className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    activeSection === section.id
                      ? 'bg-primary scale-100'
                      : 'bg-muted-foreground/30 scale-75 group-hover:scale-100'
                  }`} />
                  <span style={{ fontFamily: 'var(--font-body)' }}>{section.label}</span>
                </span>
              </button>
            ))}
          </nav>

          {/* Footer */}
          <div className="pt-6 border-t border-sidebar-border">
            <div className="flex gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
            <p className="mt-4 text-xs text-muted-foreground" style={{ fontFamily: 'var(--font-mono)' }}>
              © 2026 TechNova
            </p>
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      <style>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
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
      `}</style>
    </>
  );
}
