import { useEffect, useState } from 'react';

export function Hero() {
  const [titleIndex, setTitleIndex] = useState(0);
  const titles = [
    'Full-Stack Developer',
    'Systems Architect',
    'Technical Writer',
    'Open Source Contributor'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % titles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center px-6 lg:px-16 py-20 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 right-20 w-32 h-32 border-4 border-primary rounded-full"
           style={{
             animation: 'float 6s ease-in-out infinite, pulse 3s ease-in-out infinite',
             boxShadow: '0 0 40px var(--glow-primary)'
           }} />
      <div className="absolute bottom-40 left-20 w-24 h-24 border-4 border-secondary rounded-lg rotate-12"
           style={{
             animation: 'float 8s ease-in-out infinite 1s, spin 10s linear infinite',
             boxShadow: '0 0 40px var(--glow-secondary)'
           }} />
      <div className="absolute top-1/3 left-10 w-16 h-16 border-4 border-accent rounded-full"
           style={{
             animation: 'float 7s ease-in-out infinite 2s, pulse 2s ease-in-out infinite',
             boxShadow: '0 0 30px var(--glow-accent)'
           }} />
      <div className="absolute bottom-20 right-40 w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-lg rotate-45"
           style={{
             animation: 'float 9s ease-in-out infinite 3s, spin 15s linear infinite reverse',
             boxShadow: '0 0 50px rgba(255, 0, 128, 0.5)'
           }} />

      <div className="max-w-5xl w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text content */}
          <div className="space-y-6" style={{ animation: 'fadeInUp 1s ease-out' }}>
            <div className="inline-block px-4 py-2 rounded-full border-2 border-primary bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 backdrop-blur-sm"
                 style={{ animation: 'borderGlow 3s ease-in-out infinite' }}>
              <span className="text-sm font-medium bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent"
                    style={{ fontFamily: 'var(--font-mono)', animation: 'gradientShift 5s ease infinite' }}>
                {'// Available for collaboration'}
              </span>
            </div>

            <h1
              className="text-6xl lg:text-7xl leading-tight"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}
            >
              Building the{' '}
              <span className="relative inline-block bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent"
                    style={{ animation: 'gradientShift 8s ease infinite' }}>
                future
                <svg className="absolute -bottom-2 left-0 w-full" height="12" viewBox="0 0 200 12" fill="none"
                     style={{ animation: 'dash 3s ease-in-out infinite' }}>
                  <path d="M2 10C50 2 150 2 198 10" stroke="url(#gradient)" strokeWidth="3" strokeLinecap="round"
                        strokeDasharray="10 5" />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#ff0080" />
                      <stop offset="50%" stopColor="#00d9ff" />
                      <stop offset="100%" stopColor="#ffbe0b" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
              <br />
              one commit at a time
            </h1>

            <div className="h-8 flex items-center">
              <span className="text-xl text-muted-foreground" style={{ fontFamily: 'var(--font-body)' }}>
                {titles[titleIndex]}
              </span>
              <span className="ml-2 w-0.5 h-6 bg-primary animate-pulse" />
            </div>

            <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
              Passionate about creating scalable systems, writing clean code, and sharing knowledge
              through technical writing. Currently exploring distributed systems and cloud architecture.
            </p>

            <div className="flex gap-4 pt-4">
              <button
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 bg-gradient-to-r from-primary via-secondary to-primary text-white rounded-xl hover:shadow-2xl transition-all duration-300 group relative overflow-hidden"
                style={{
                  boxShadow: '0 10px 40px var(--glow-primary)',
                  fontFamily: 'var(--font-body)',
                  fontWeight: 500,
                  backgroundSize: '200% 100%',
                  animation: 'gradientSlide 3s ease infinite'
                }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  View Projects
                  <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </button>
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 border-2 border-primary text-foreground rounded-xl hover:bg-gradient-to-r hover:from-primary/10 hover:to-secondary/10 transition-all duration-300 group"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontWeight: 500,
                  boxShadow: '0 0 20px rgba(255, 0, 128, 0.2)'
                }}
              >
                <span className="group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-secondary group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                  Get in Touch
                </span>
              </button>
            </div>
          </div>

          {/* Right: Visual element */}
          <div className="relative hidden lg:block" style={{ animation: 'fadeInRight 1s ease-out 0.3s backwards' }}>
            <div className="relative w-full aspect-square">
              {/* Animated rings with gradient borders */}
              <div className="absolute inset-0 rounded-full border-4"
                   style={{
                     borderImage: 'linear-gradient(45deg, #ff0080, #00d9ff, #ffbe0b, #ff0080) 1',
                     animation: 'spin 20s linear infinite, pulse 4s ease-in-out infinite',
                     boxShadow: '0 0 60px rgba(255, 0, 128, 0.4)'
                   }} />
              <div className="absolute inset-8 rounded-full border-4"
                   style={{
                     borderImage: 'linear-gradient(135deg, #00d9ff, #b620e0, #ff0080, #00d9ff) 1',
                     animation: 'spin 15s linear infinite reverse, pulse 4s ease-in-out infinite 0.5s',
                     boxShadow: '0 0 50px rgba(0, 217, 255, 0.4)'
                   }} />
              <div className="absolute inset-16 rounded-full border-4"
                   style={{
                     borderImage: 'linear-gradient(225deg, #ffbe0b, #00ff88, #b620e0, #ffbe0b) 1',
                     animation: 'spin 10s linear infinite, pulse 4s ease-in-out infinite 1s',
                     boxShadow: '0 0 40px rgba(255, 190, 11, 0.4)'
                   }} />

              {/* Center glows */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-40 h-40 rounded-full bg-gradient-to-br from-primary via-secondary to-accent opacity-30 blur-3xl"
                     style={{ animation: 'glow 3s ease-in-out infinite alternate, spin 8s linear infinite' }} />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-accent via-primary to-secondary opacity-40 blur-2xl"
                     style={{ animation: 'glow 2.5s ease-in-out infinite alternate-reverse, spin 12s linear infinite reverse' }} />
              </div>

              {/* Floating code symbols with gradients */}
              <div className="absolute top-12 right-12 text-4xl font-bold bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent"
                   style={{ fontFamily: 'var(--font-mono)', animation: 'float 5s ease-in-out infinite, wobble 3s ease-in-out infinite' }}>
                {'{ }'}
              </div>
              <div className="absolute bottom-20 left-8 text-3xl font-bold bg-gradient-to-br from-secondary to-accent bg-clip-text text-transparent"
                   style={{ fontFamily: 'var(--font-mono)', animation: 'float 6s ease-in-out infinite 1s, wobble 3.5s ease-in-out infinite' }}>
                {'</>'}
              </div>
              <div className="absolute top-1/2 right-4 text-2xl font-bold bg-gradient-to-br from-accent to-primary bg-clip-text text-transparent"
                   style={{ fontFamily: 'var(--font-mono)', animation: 'float 7s ease-in-out infinite 2s, wobble 4s ease-in-out infinite' }}>
                {'[]'}
              </div>
              <div className="absolute top-1/4 left-1/4 text-3xl font-bold bg-gradient-to-br from-primary via-accent to-secondary bg-clip-text text-transparent"
                   style={{ fontFamily: 'var(--font-mono)', animation: 'float 5.5s ease-in-out infinite 1.5s, wobble 3.2s ease-in-out infinite' }}>
                {'()'}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
             style={{ animation: 'bounce 2s ease-in-out infinite' }}>
          <span className="text-xs text-muted-foreground" style={{ fontFamily: 'var(--font-mono)' }}>
            Scroll
          </span>
          <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-30px) rotate(10deg);
          }
        }

        @keyframes glow {
          from {
            opacity: 0.3;
            transform: scale(1);
          }
          to {
            opacity: 0.7;
            transform: scale(1.3);
          }
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0) translateX(-50%);
          }
          50% {
            transform: translateY(-15px) translateX(-50%);
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

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.8;
          }
        }

        @keyframes borderGlow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(255, 0, 128, 0.5), 0 0 40px rgba(0, 217, 255, 0.3);
          }
          50% {
            box-shadow: 0 0 30px rgba(0, 217, 255, 0.5), 0 0 50px rgba(255, 190, 11, 0.4);
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

        @keyframes gradientSlide {
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

        @keyframes dash {
          0%, 100% {
            stroke-dashoffset: 0;
          }
          50% {
            stroke-dashoffset: 30;
          }
        }

        @keyframes wobble {
          0%, 100% {
            transform: rotate(0deg) scale(1);
          }
          25% {
            transform: rotate(5deg) scale(1.05);
          }
          75% {
            transform: rotate(-5deg) scale(0.95);
          }
        }
      `}</style>
    </div>
  );
}
