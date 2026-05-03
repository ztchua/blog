import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MeshGradient } from './components/MeshGradient';
import { Navigation, type SectionId } from './components/Navigation';
import { PulseFeed } from './components/pulse/PulseFeed';
import { LabReader } from './components/lab/LabReader';
import { ResumeCanvas } from './components/canvas/ResumeCanvas';

const sectionColors: Record<SectionId, string> = {
  pulse: '#ff006e',
  lab: '#00d4ff',
  canvas: '#8b5cf6',
};

export default function App() {
  const [activeSection, setActiveSection] = useState<SectionId>('canvas');

  return (
    <div className="min-h-screen relative" style={{ fontFamily: 'var(--font-body)' }}>
      {/* Fluid mesh gradient background */}
      <MeshGradient />

      {/* Noise texture overlay for depth */}
      <div
        className="fixed inset-0 pointer-events-none z-[1]"
        style={{
          opacity: 0.025,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '128px 128px',
        }}
      />

      {/* Top progress line - section color indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] z-50"
        style={{
          background: `linear-gradient(90deg, transparent, ${sectionColors[activeSection]}, transparent)`,
          boxShadow: `0 0 20px ${sectionColors[activeSection]}40`,
        }}
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Navigation */}
      <Navigation activeSection={activeSection} onSectionChange={setActiveSection} />

      {/* Content */}
      <main className="relative z-10 pb-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{
              duration: 0.25,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {activeSection === 'pulse' && <PulseFeed />}
            {activeSection === 'lab' && <LabReader />}
            {activeSection === 'canvas' && <ResumeCanvas />}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
