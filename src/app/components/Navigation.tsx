import { motion } from 'motion/react';
import { Zap, FlaskConical, Boxes } from 'lucide-react';

export type SectionId = 'pulse' | 'lab' | 'canvas';

interface NavigationProps {
  activeSection: SectionId;
  onSectionChange: (section: SectionId) => void;
}

const sections: { id: SectionId; label: string; icon: typeof Zap; color: string; gradient: string; disabled?: boolean }[] = [
  {
    id: 'canvas',
    label: 'Bloke',
    icon: Boxes,
    color: '#8b5cf6',
    gradient: 'linear-gradient(135deg, rgba(139,92,246,0.15), rgba(139,92,246,0.05))',
  },
  {
    id: 'pulse',
    label: 'Tweets',
    icon: Zap,
    color: '#ff006e',
    gradient: 'linear-gradient(135deg, rgba(255,0,110,0.15), rgba(255,0,110,0.05))',
    disabled: true,
  },
  {
    id: 'lab',
    label: 'Nerd-talk',
    icon: FlaskConical,
    color: '#00d4ff',
    gradient: 'linear-gradient(135deg, rgba(0,212,255,0.15), rgba(0,212,255,0.05))',
    disabled: true,
  },
];

export function Navigation({ activeSection, onSectionChange }: NavigationProps) {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
      className="fixed top-5 left-1/2 -translate-x-1/2 z-50"
    >
      <nav
        className="relative flex items-center gap-1 px-2 py-2 rounded-2xl"
        style={{
          background: 'rgba(10, 10, 25, 0.65)',
          backdropFilter: 'blur(24px) saturate(1.2)',
          WebkitBackdropFilter: 'blur(24px) saturate(1.2)',
          border: '1px solid rgba(255, 255, 255, 0.07)',
          boxShadow: '0 8px 40px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.06)',
        }}
      >
        {/* Logo mark */}
        <div className="flex items-center gap-2.5 pl-3 pr-4 mr-1 border-r border-white/[0.06]">
          <div
            className="w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-bold"
            style={{
              background: 'linear-gradient(135deg, #ff006e, #8b5cf6)',
              color: '#fff',
              fontFamily: 'var(--font-display)',
            }}
          >
            Z
          </div>
          <span
            className="text-xs font-semibold tracking-wide hidden md:inline"
            style={{
              fontFamily: 'var(--font-display)',
              background: 'linear-gradient(135deg, #f0f0f5, rgba(255,255,255,0.5))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            ZHENGTAT.COM
          </span>
        </div>

        {/* Section nav items */}
        {sections.map((section) => {
          const Icon = section.icon;
          const isActive = activeSection === section.id;
          const isDisabled = section.disabled;

          return (
            <button
              key={section.id}
              onClick={() => {
                if (isDisabled) return;
                onSectionChange(section.id);
              }}
              className="relative flex items-center gap-2 px-4 py-2.5 rounded-xl transition-colors duration-300"
              style={{
                color: isDisabled
                  ? 'rgba(255, 255, 255, 0.12)'
                  : isActive
                    ? section.color
                    : 'rgba(255, 255, 255, 0.35)',
                cursor: isDisabled ? 'not-allowed' : undefined,
              }}
            >
              {isActive && !isDisabled && (
                <motion.div
                  layoutId="nav-active-bg"
                  className="absolute inset-0 rounded-xl"
                  style={{
                    background: section.gradient,
                    border: `1px solid ${section.color}20`,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 350,
                    damping: 30,
                  }}
                />
              )}

              <Icon
                size={16}
                className="relative z-10 transition-all duration-300"
                style={{
                  opacity: isDisabled ? 0.2 : isActive ? 1 : 0.5,
                  filter: !isDisabled && isActive ? `drop-shadow(0 0 6px ${section.color}60)` : 'none',
                }}
              />
              <span
                className="relative z-10 text-sm font-medium hidden sm:inline"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {section.label}
              </span>
            </button>
          );
        })}
      </nav>
    </motion.header>
  );
}
