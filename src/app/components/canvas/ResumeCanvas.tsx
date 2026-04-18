import { useRef, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import {
  Award,
  MapPin,
  Briefcase,
  GraduationCap,
  ExternalLink,
  ChevronDown,
} from 'lucide-react';

/* ═══════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════ */

const PROFILE = {
  name: 'Chua Zheng Tat',
  handle: '@zhengtat',
  title: 'DevOps Engineer II',
  location: 'Singapore',
  bio: 'DevOps engineer with 4 years of experience in software engineering, focused on building and maintaining reliable CI/CD and infrastructure. Proficient in orchestrating Kubernetes clusters and observability stacks, fluent with Linux system administration and L2/3 tech operations. Passionate about FOSS and learning technologies to make a difference in everyday life.',
  status: 'Open to opportunities',
  links: [
    { label: 'GitHub', href: 'https://github.com/ztcjoe93', icon: 'gh' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/zhengtat', icon: 'li' },
    { label: 'Email', href: 'mailto:zhengtat@gmail.com', icon: 'tw' },
  ],
};

const SKILL_GROUPS = [
  {
    category: 'Languages',
    color: '#00d4ff',
    skills: [
      { label: 'HCL / Terraform', level: 0.92 },
      { label: 'Golang', level: 0.85 },
      { label: 'Python', level: 0.88 },
      { label: 'Bash / Shell', level: 0.9 },
      { label: 'Java', level: 0.8 },
      { label: 'SQL', level: 0.82 },
    ],
  },
  {
    category: 'Infrastructure',
    color: '#ffbe0b',
    skills: [
      { label: 'Kubernetes', level: 0.95 },
      { label: 'Docker', level: 0.92 },
      { label: 'AWS', level: 0.9 },
      { label: 'FluxCD / Helm', level: 0.88 },
      { label: 'Terragrunt', level: 0.88 },
    ],
  },
  {
    category: 'Observability & Security',
    color: '#8b5cf6',
    skills: [
      { label: 'Elasticsearch / ELK', level: 0.88 },
      { label: 'Grafana', level: 0.85 },
      { label: 'SonarQube', level: 0.82 },
      { label: 'Cosign / Connaisseur', level: 0.78 },
      { label: 'Zabbix', level: 0.75 },
    ],
  },
  {
    category: 'CI/CD & GitOps',
    color: '#ff006e',
    skills: [
      { label: 'GitLab CI/CD', level: 0.93 },
      { label: 'GitHub Actions', level: 0.85 },
      { label: 'GitOps / FluxCD', level: 0.9 },
      { label: 'SAST / DAST / SCA', level: 0.85 },
    ],
  },
  {
    category: 'Frameworks & Tools',
    color: '#3a86ff',
    skills: [
      { label: 'Spring Boot', level: 0.78 },
      { label: 'Flutter / Dart', level: 0.72 },
      { label: 'Vim / Tmux', level: 0.88 },
      { label: 'Proxmox', level: 0.75 },
    ],
  },
];

const TIMELINE = [
  {
    year: '2023 — Present',
    title: 'DevOps Engineer (II)',
    company: 'Government Technology Agency',
    highlights: [
      'Designed **centralized CICD templates** and built **robust GitLab CI/CD pipelines** across multiple tracks, allowing the **autonomous configuration** of **parent-child / multi-project pipelines** while streamlining deployment processes',
      'Enforced **security and quality** of existing repositories by employing tools such as **SAST**, **Dependency Scanning**, **DAST**, **Container Scanning** and **SCA via SonarQube**',
      '**Redesigned roles and permissions** for existing GitLab groups and projects by **revamping paradigm** to **functional groups**',
      'Enforced **container integrity** through the designing and use of **Cosign** for **image signing and verification**, and **Connaisseur** for **runtime verification** via **admission webhooks**',
      'Developed and managed **AWS cloud infrastructure** using **IAC**; writing custom **Terragrunt** modules to manage resources via declarative states',
      'Architected and implemented a highly-available intranet-only architecture across multiple **VPCs** using **Transit Gateways** with **ALBs** and **NLBs**, **R53** and **EKS Auto Mode**',
      'Integrated existing AWS account data to be piped to **ELK stack** via ETLs and Elastic\'s **serverless forwarder**, funneling through crafted **bespoke ingestion pipelines** as a **centralized SIEM and observability platform** for multiple tracks to use',
      'Architectured and configured various **dashboards and visualizations on Kibana** with **observability and SIEM alerts** as a **monitoring avenue** on the **ELK stack** to trigger alerts on key metrics, ensuring that **SLIs** and **SLOs** are timely met',
      '**Automated seamless upgrades and deployments to the cluster** via custom **Helm Charts** via **FluxCD**, a **GitOps** tool, ensuring **auditability through declarative manifests** and **fast reconciliation** of Kubernetes resources',
      'Orchestrate and manage workloads on **AWS EKS Fargate** while ensuring **high availability and minimal downtime** through the use of **HPAs**, **Pod Readiness Gates** and **Container Lifecycle Hooks**; and on **AWS EKS Auto Mode** using **Pod Disruption Budgets** and **Topology Spread Constraints**',
      '**Drove cross-functional DevOps excellence** by guiding engineers on CI/CD best practices and infrastructure knowledge, enabling cross-functional workflows and fostering DevOps maturity across tracks through **sharing sessions and documentation**',
      '**Lead, guide and mentor** other DevOps engineers on **designing, troubleshooting and writing quality code**',
      'Developed utility scripts in **Golang** and **Bash** to automate operational tasks ranging from **OIDC user provisioning**, **migration of Elasticsearch objects** to **automated creation of supporting Kubernetes resources**',
    ],
    color: '#ff006e',
    tags: ['Kubernetes', 'AWS', 'CI/CD', 'ELK Stack', 'FluxCD'],
  },
  {
    year: '2021 — 2023',
    title: 'Associate Software Developer (I)',
    company: 'S&P Global',
    highlights: [
      'Contributor in delivery team providing features and enhancements with comprehensive test suites using **Jmockit** and **Mockito** for existing **Spring Boot** application',
      'Single-handedly architectured and implemented a decoupled **serverless** service in **Python** on **AWS** using services such as **Lambda**, **S3** and **SQS** to facilitate forwarding of financial trades',
      'Implemented scripts and automations for internal operations in **Bash**, **Python** and **Golang** for development and daily operational support use cases, reducing **time spent by 75%**',
      'Reconnaissance numerous P1/2 incidents and provided **in-depth troubleshooting**, **solutions** and **root cause analysis under time-critical deadlines** as part of the **support team as a L2/L3**',
      'Developed and enhanced existing **GitLab CI/CD pipelines** to streamline delivery and deployment process, adopting a shift-left culture with SCA tools such as **Mend** and **SonarQube**',
      'Authored **technical designs** and **documentations** for **Day 0 and Day 2 operations** for new and existing services',
      'Participated in **Agile** development cycles, acting as a rotational **Scrum Master** for development sprints',
      'Executed and planned major migration and exercises for clients with high data loads (**over 80 million records**)',
    ],
    color: '#ffbe0b',
    tags: ['Spring Boot', 'Python', 'AWS Lambda', 'GitLab CI/CD'],
  },
  {
    year: '2019 — 2021',
    title: 'BS in Computer Science, Big Data',
    company: 'University of Wollongong',
    highlights: [
      'Grade: Distinction',
    ],
    color: '#8b5cf6',
    tags: ['Computer Science', 'Big Data'],
  },
];

const CERTIFICATIONS = [
  { label: 'AWS Solutions Architect', status: 'Certified', color: '#ffbe0b', detail: 'Associate — Jan 2023' },
  { label: 'Certified ScrumMaster', status: 'Certified', color: '#00ff88', detail: 'Scrum Alliance — Dec 2023' },
  { label: 'BS Computer Science, Big Data', status: 'Distinction', color: '#8b5cf6', detail: 'University of Wollongong — 2021' },
];

const STATS = [
  { value: '4+', label: 'Years Experience' },
  { value: '75%', label: 'Ops Time Reduced' },
  { value: '6+', label: 'Security Tools Integrated' },
];

/* ═══════════════════════════════════════════
   PROFILE PICTURE PLACEHOLDER
   ═══════════════════════════════════════════ */

function Avatar() {
  return (
    <div className="relative">
      {/* Rotating ring */}
      <div
        className="absolute -inset-2 rounded-full"
        style={{
          background:
            'conic-gradient(from 0deg, #ff006e, #00d4ff, #8b5cf6, #00ff88, #ffbe0b, #ff006e)',
          opacity: 0.6,
          animation: 'avatarRingSpin 8s linear infinite',
        }}
      />
      <div
        className="absolute -inset-2 rounded-full"
        style={{
          background:
            'conic-gradient(from 0deg, #ff006e, #00d4ff, #8b5cf6, #00ff88, #ffbe0b, #ff006e)',
          filter: 'blur(12px)',
          opacity: 0.3,
          animation: 'avatarRingSpin 8s linear infinite',
        }}
      />

      {/* Avatar circle — swap the inner content with an <img> for a real photo */}
      <div
        className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #0a0a1a 0%, #151530 100%)',
          border: '3px solid #050510',
        }}
      >
        <img
          src="/profile.png"
          alt={PROFILE.name}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   HIGHLIGHT RENDERER
   ═══════════════════════════════════════════ */

function renderHighlight(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} style={{ color: 'rgba(255,255,255,0.85)', fontWeight: 600 }}>
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part ? <span key={i}>{part}</span> : null;
  });
}

/* ═══════════════════════════════════════════
   SKILL BAR
   ═══════════════════════════════════════════ */

function SkillBar({ label, level, color, inView }: { label: string; level: number; color: string; inView: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex items-center justify-between mb-1.5">
        <span
          className="text-[13px] font-medium transition-colors duration-300"
          style={{
            fontFamily: 'var(--font-body)',
            color: hovered ? '#fff' : 'rgba(255,255,255,0.6)',
          }}
        >
          {label}
        </span>
        <span
          className="text-[10px] tabular-nums"
          style={{ fontFamily: 'var(--font-mono)', color: `${color}80` }}
        >
          {Math.round(level * 100)}%
        </span>
      </div>
      <div
        className="h-1.5 rounded-full overflow-hidden"
        style={{ background: 'rgba(255,255,255,0.04)' }}
      >
        <motion.div
          className="h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, ${color}60, ${color})`,
            boxShadow: hovered ? `0 0 12px ${color}50` : 'none',
            width: '100%',
            transformOrigin: 'left',
          }}
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: level } : { scaleX: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   GLASS CARD HELPER
   ═══════════════════════════════════════════ */

function GlassCard({
  children,
  className = '',
  style = {},
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`rounded-2xl ${className}`}
      style={{
        background: 'rgba(255, 255, 255, 0.025)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.06)',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════
   SKILL GROUP CARD
   ═══════════════════════════════════════════ */

function SkillGroupCard({ group, index }: { group: typeof SKILL_GROUPS[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{ delay: index * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <GlassCard className="p-5">
        <div className="flex items-center gap-2 mb-5">
          <div
            className="w-2 h-2 rounded-full"
            style={{
              background: group.color,
              boxShadow: `0 0 8px ${group.color}50`,
            }}
          />
          <span
            className="text-[12px] font-semibold uppercase tracking-wider"
            style={{
              fontFamily: 'var(--font-mono)',
              color: group.color,
            }}
          >
            {group.category}
          </span>
        </div>
        <div className="space-y-3.5">
          {group.skills.map((skill) => (
            <SkillBar
              key={skill.label}
              label={skill.label}
              level={skill.level}
              color={group.color}
              inView={inView}
            />
          ))}
        </div>
      </GlassCard>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   MAIN RESUME PAGE
   ═══════════════════════════════════════════ */

export function ResumeCanvas() {
  const [expandedTimeline, setExpandedTimeline] = useState<string | null>(null);

  return (
    <div className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto pb-20">
      {/* ─── HERO / PROFILE ─── */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="pt-4 mb-16"
      >
        <GlassCard className="p-8 sm:p-10 relative overflow-hidden">
          {/* Ambient glow behind avatar */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse, rgba(139,92,246,0.12) 0%, rgba(0,212,255,0.06) 40%, transparent 70%)',
            }}
          />

          <div className="relative z-10 flex flex-col items-center text-center">
            {/* Avatar */}
            <div className="mb-6">
              <Avatar />
            </div>

            {/* Name & handle */}
            <h1
              className="text-3xl sm:text-4xl mb-1"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                letterSpacing: '-0.02em',
              }}
            >
              {PROFILE.name}
            </h1>
            <span
              className="text-sm mb-3"
              style={{ fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.3)' }}
            >
              {PROFILE.handle}
            </span>

            {/* Title */}
            <p
              className="text-base sm:text-lg font-medium mb-2"
              style={{
                fontFamily: 'var(--font-display)',
                color: '#8b5cf6',
              }}
            >
              {PROFILE.title}
            </p>

            {/* Location */}
            <div className="flex items-center gap-1.5 mb-4">
              <MapPin size={13} style={{ color: 'rgba(255,255,255,0.3)' }} />
              <span
                className="text-[13px]"
                style={{ color: 'rgba(255,255,255,0.35)' }}
              >
                {PROFILE.location}
              </span>
            </div>

            {/* Status badge */}
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5"
              style={{
                background: 'rgba(0, 255, 136, 0.06)',
                border: '1px solid rgba(0, 255, 136, 0.15)',
              }}
            >
              <div
                className="w-2 h-2 rounded-full"
                style={{
                  background: '#00ff88',
                  boxShadow: '0 0 8px rgba(0,255,136,0.5)',
                }}
              />
              <span
                className="text-[12px] font-medium"
                style={{ fontFamily: 'var(--font-body)', color: '#00ff88' }}
              >
                {PROFILE.status}
              </span>
            </div>

            {/* Bio */}
            <p
              className="text-[14px] leading-[1.75] max-w-lg mb-6"
              style={{ color: 'rgba(255,255,255,0.5)' }}
            >
              {PROFILE.bio}
            </p>

            {/* Links */}
            <div className="flex items-center gap-3">
              {PROFILE.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-[12px] font-medium transition-all duration-300"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: 'rgba(255,255,255,0.5)',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget;
                    el.style.borderColor = 'rgba(139,92,246,0.3)';
                    el.style.color = '#8b5cf6';
                    el.style.background = 'rgba(139,92,246,0.06)';
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget;
                    el.style.borderColor = 'rgba(255,255,255,0.08)';
                    el.style.color = 'rgba(255,255,255,0.5)';
                    el.style.background = 'rgba(255,255,255,0.04)';
                  }}
                >
                  {link.label}
                  <ExternalLink size={11} />
                </a>
              ))}
            </div>
          </div>
        </GlassCard>
      </motion.section>

      {/* ─── STATS ─── */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="grid grid-cols-3 gap-4 mb-16"
      >
        {STATS.map((stat, i) => (
          <GlassCard key={stat.label} className="p-5 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
            >
              <div
                className="text-2xl sm:text-3xl mb-1"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  background: 'linear-gradient(135deg, #f0f0f5, rgba(255,255,255,0.5))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {stat.value}
              </div>
              <div
                className="text-[11px]"
                style={{
                  fontFamily: 'var(--font-mono)',
                  color: 'rgba(255,255,255,0.3)',
                }}
              >
                {stat.label}
              </div>
            </motion.div>
          </GlassCard>
        ))}
      </motion.section>

      {/* ─── SKILLS ─── */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="mb-16"
      >
        <div className="flex items-center gap-3 mb-8" style={{ fontFamily: 'var(--font-mono)' }}>
          <div
            className="w-2 h-2 rounded-full"
            style={{
              background: '#8b5cf6',
              boxShadow: '0 0 12px rgba(139,92,246,0.5)',
            }}
          />
          <span
            className="text-xs tracking-widest uppercase"
            style={{ color: 'rgba(255,255,255,0.3)' }}
          >
            Technical Expertise
          </span>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SKILL_GROUPS.map((group, gi) => (
            <SkillGroupCard key={group.category} group={group} index={gi} />
          ))}
        </div>
      </motion.section>

      {/* ─── CAREER TIMELINE ─── */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="mb-16"
      >
        <div className="flex items-center gap-3 mb-8" style={{ fontFamily: 'var(--font-mono)' }}>
          <div
            className="w-2 h-2 rounded-full"
            style={{
              background: '#ff006e',
              boxShadow: '0 0 12px rgba(255,0,110,0.5)',
            }}
          />
          <span
            className="text-xs tracking-widest uppercase"
            style={{ color: 'rgba(255,255,255,0.3)' }}
          >
            Career Timeline
          </span>
        </div>

        <div className="relative pl-8">
          {/* Vertical line */}
          <div
            className="absolute left-[9px] top-2 bottom-2 w-px"
            style={{
              background:
                'linear-gradient(to bottom, #00ff88, #00d4ff, #8b5cf6, #ffbe0b, #ff006e)',
            }}
          />

          <div className="space-y-6">
            {TIMELINE.map((entry, i) => {
              const isExpanded = expandedTimeline === entry.year;

              return (
                <motion.div
                  key={entry.year}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: i * 0.08,
                    duration: 0.5,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="relative"
                >
                  {/* Timeline dot */}
                  <div
                    className="absolute -left-8 top-3 w-[18px] h-[18px] rounded-full flex items-center justify-center"
                    style={{
                      background: '#050510',
                      border: `2px solid ${entry.color}`,
                      boxShadow: `0 0 10px ${entry.color}40`,
                    }}
                  >
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ background: entry.color }}
                    />
                  </div>

                  {/* Card */}
                  <GlassCard
                    className="p-5 cursor-pointer group"
                    style={{
                      transition:
                        'border-color 0.3s, box-shadow 0.3s',
                    }}
                    // Inline hover via onMouseEnter/Leave to avoid complex Tailwind dynamic
                  >
                    <div
                      onClick={() =>
                        setExpandedTimeline(isExpanded ? null : entry.year)
                      }
                    >
                      {/* Year badge */}
                      <div
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md mb-3"
                        style={{
                          background: `${entry.color}10`,
                          border: `1px solid ${entry.color}20`,
                        }}
                      >
                        <Briefcase size={11} style={{ color: entry.color }} />
                        <span
                          className="text-[11px] font-semibold"
                          style={{
                            fontFamily: 'var(--font-mono)',
                            color: entry.color,
                          }}
                        >
                          {entry.year}
                        </span>
                      </div>

                      {/* Title & company */}
                      <h3
                        className="text-[15px] mb-0.5"
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontWeight: 700,
                          color: '#f0f0f5',
                        }}
                      >
                        {entry.title}
                      </h3>
                      <p
                        className="text-[12px] mb-2"
                        style={{
                          fontFamily: 'var(--font-mono)',
                          color: 'rgba(255,255,255,0.35)',
                        }}
                      >
                        {entry.company}
                      </p>

                      {/* Tags (always visible) */}
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {entry.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] px-2 py-0.5 rounded-md"
                            style={{
                              fontFamily: 'var(--font-mono)',
                              color: 'rgba(255,255,255,0.4)',
                              background: 'rgba(255,255,255,0.04)',
                              border: '1px solid rgba(255,255,255,0.06)',
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Expand indicator */}
                      <div className="flex justify-end mt-2">
                        <motion.div
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        >
                          <ChevronDown
                            size={14}
                            style={{ color: 'rgba(255,255,255,0.2)' }}
                          />
                        </motion.div>
                      </div>
                    </div>

                    {/* Expanded highlights */}
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                            height: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
                            opacity: { duration: 0.25, ease: 'easeOut' },
                          }}
                          style={{ overflow: 'hidden' }}
                        >
                          <div
                            style={{
                              borderTop: '1px solid rgba(255,255,255,0.05)',
                              paddingTop: 12,
                              paddingBottom: 4,
                            }}
                          >
                            <ul className="space-y-1.5">
                              {entry.highlights.map((h, hi) => (
                                <li
                                  key={hi}
                                  className="text-[12px] leading-[1.65] flex gap-2"
                                  style={{ color: 'rgba(255,255,255,0.5)' }}
                                >
                                  <span
                                    className="shrink-0 mt-[7px] w-1 h-1 rounded-full"
                                    style={{ background: entry.color, opacity: 0.6 }}
                                  />
                                  <span>{renderHighlight(h)}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* ─── CERTIFICATIONS ─── */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex items-center gap-3 mb-8" style={{ fontFamily: 'var(--font-mono)' }}>
          <div
            className="w-2 h-2 rounded-full"
            style={{
              background: '#ffbe0b',
              boxShadow: '0 0 12px rgba(255,190,11,0.5)',
            }}
          />
          <span
            className="text-xs tracking-widest uppercase"
            style={{ color: 'rgba(255,255,255,0.3)' }}
          >
            Certifications
          </span>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          {CERTIFICATIONS.map((cert, i) => (
            <motion.div
              key={cert.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
            >
              <GlassCard className="p-5 relative overflow-hidden">
                <div
                  className="absolute top-0 left-0 w-1 h-full"
                  style={{
                    background: cert.color,
                    boxShadow: `0 0 12px ${cert.color}40`,
                  }}
                />
                <div className="flex items-start gap-3 pl-2">
                  <Award size={18} style={{ color: cert.color, flexShrink: 0, marginTop: 2 }} />
                  <div>
                    <span
                      className="text-[13px] font-medium block mb-1"
                      style={{
                        fontFamily: 'var(--font-body)',
                        color: 'rgba(255,255,255,0.8)',
                      }}
                    >
                      {cert.label}
                    </span>
                    <span
                      className="text-[10px] uppercase tracking-wider font-semibold"
                      style={{
                        fontFamily: 'var(--font-mono)',
                        color: cert.color,
                      }}
                    >
                      {cert.status}
                    </span>
                    <span
                      className="text-[11px] block mt-1"
                      style={{ color: 'rgba(255,255,255,0.3)' }}
                    >
                      {cert.detail}
                    </span>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Keyframe for avatar ring */}
      <style>{`
        @keyframes avatarRingSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
