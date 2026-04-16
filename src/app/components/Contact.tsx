import { useState } from 'react';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would send the data to a backend
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactMethods = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      label: 'Email',
      value: 'hello@technova.dev',
      href: 'mailto:hello@technova.dev'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
        </svg>
      ),
      label: 'GitHub',
      value: '@technova',
      href: 'https://github.com'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
      label: 'LinkedIn',
      value: 'in/technova',
      href: 'https://linkedin.com'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ),
      label: 'Twitter',
      value: '@technova_dev',
      href: 'https://twitter.com'
    }
  ];

  return (
    <div className="min-h-screen flex items-center px-6 lg:px-16 py-20">
      <div className="max-w-6xl mx-auto w-full">
        <div className="mb-16">
          <span className="text-sm text-primary mb-4 block" style={{ fontFamily: 'var(--font-mono)' }}>
            {'// GET IN TOUCH'}
          </span>
          <h2 className="text-5xl lg:text-6xl mb-6" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
            Let's Connect
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Whether you have a project in mind, want to collaborate, or just want to say hi—I'd love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: Contact form */}
          <div className="relative">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm mb-2" style={{ fontFamily: 'var(--font-mono)' }}>
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-card border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm mb-2" style={{ fontFamily: 'var(--font-mono)' }}>
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-card border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm mb-2" style={{ fontFamily: 'var(--font-mono)' }}>
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 rounded-lg bg-card border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300 resize-none"
                  placeholder="Tell me about your project or just say hello..."
                />
              </div>

              <button
                type="submit"
                disabled={submitted}
                className={`w-full px-8 py-4 rounded-xl font-medium transition-all duration-300 relative overflow-hidden ${
                  submitted
                    ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white'
                    : 'bg-gradient-to-r from-primary via-secondary to-primary text-white hover:shadow-2xl'
                }`}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontWeight: 600,
                  boxShadow: submitted ? '0 10px 40px rgba(16, 185, 129, 0.4)' : '0 10px 50px var(--glow-primary)',
                  backgroundSize: '200% 100%',
                  animation: submitted ? 'none' : 'shimmer 3s ease-in-out infinite'
                }}
              >
                {submitted ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Message Sent!
                  </span>
                ) : (
                  'Send Message'
                )}
              </button>
            </form>

            {/* Decorative element */}
            <div className="absolute -bottom-12 -right-12 w-48 h-48 border border-primary/10 rounded-full blur-xl opacity-30 pointer-events-none" />
          </div>

          {/* Right: Contact info */}
          <div className="space-y-8">
            <div className="p-8 rounded-xl border border-primary/20 bg-gradient-to-br from-primary/5 to-transparent backdrop-blur-sm">
              <h3 className="text-2xl mb-6" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
                Connect with me
              </h3>

              <div className="space-y-4">
                {contactMethods.map((method, index) => (
                  <a
                    key={method.label}
                    href={method.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all duration-300 group"
                    style={{ animation: `slideInRight 0.5s ease-out ${index * 0.1}s backwards` }}
                  >
                    <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                      {method.icon}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-muted-foreground mb-1" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
                        {method.label}
                      </div>
                      <div className="font-medium">{method.value}</div>
                    </div>
                    <svg className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Availability status */}
            <div className="p-6 rounded-xl border-2 border-green-400/40 bg-gradient-to-br from-green-50 to-emerald-50 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 via-emerald-400/10 to-green-400/10"
                   style={{ animation: 'shimmer 4s ease-in-out infinite', backgroundSize: '200% 100%' }} />
              <div className="flex items-start gap-4 relative z-10">
                <div className="relative flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center"
                       style={{ boxShadow: '0 0 30px rgba(34, 197, 94, 0.5)', animation: 'pulse 2s ease-in-out infinite' }}>
                    <div className="w-6 h-6 rounded-full bg-white" />
                  </div>
                  <div className="absolute top-0 left-0 w-12 h-12 rounded-full bg-green-500 animate-ping opacity-30" />
                </div>
                <div>
                  <h4 className="font-medium mb-1" style={{ fontFamily: 'var(--font-display)' }}>
                    Available for Projects
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Currently accepting new opportunities for freelance and contract work. Let's build something great together.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg border border-border bg-card/30 text-center">
                <div className="text-2xl text-primary mb-1" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
                  24h
                </div>
                <div className="text-xs text-muted-foreground" style={{ fontFamily: 'var(--font-mono)' }}>
                  Response Time
                </div>
              </div>
              <div className="p-4 rounded-lg border border-border bg-card/30 text-center">
                <div className="text-2xl text-primary mb-1" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
                  100%
                </div>
                <div className="text-xs text-muted-foreground" style={{ fontFamily: 'var(--font-mono)' }}>
                  Client Satisfaction
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-20 pt-12 border-t border-border text-center">
          <p className="text-muted-foreground mb-4">
            Built with React, TypeScript, and Tailwind CSS
          </p>
          <p className="text-sm text-muted-foreground" style={{ fontFamily: 'var(--font-mono)' }}>
            © 2026 TechNova. All rights reserved.
          </p>
        </div>
      </div>

      <style>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
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

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.9;
          }
        }
      `}</style>
    </div>
  );
}
