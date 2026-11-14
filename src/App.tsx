import React, { useEffect, useState, useRef } from 'react';
import {
  Download,
  Mail,
  Copy,
  Check,
  ExternalLink,
  ChevronRight,
  Code2,
  Terminal,
  Cpu,
  Cloud,
  Send,
  Zap,
  Phone,
  MessageCircle,
  FolderOpen,
  Volume2,
  VolumeX,
  GraduationCap,
  Award,
  Github,
  Linkedin,
  Instagram,
  ArrowUpRight,
  Search,
  CheckCircle2,
  QrCode
} from 'lucide-react';
import { AnimatePresence, motion, useMotionTemplate, useScroll, useSpring, useTransform } from 'motion/react';
import confetti from 'canvas-confetti';
import {
  CANDIDATE_PROFILE,
  CERTIFICATIONS,
  PROJECTS,
  EDUCATION_DATA,
  TECHNICAL_SKILLS,
  Project,
  Certification
} from './data/portfolioData';
import { soundFx } from './utils/audio';
import { MotionBackgroundCanvas } from './components/MotionBackgroundCanvas';
import { KineticCursor } from './components/KineticCursor';
import { KineticMarquee } from './components/KineticMarquee';
import { Interactive3DCard } from './components/Interactive3DCard';
import { CinematicStoryEngine } from './components/CinematicStoryEngine';
import { Reveal, SplitHeading } from './components/Reveal';
import { Magnetic } from './components/Magnetic';
import { AnimatedCounter } from './components/AnimatedCounter';
import { SkillBar } from './components/SkillBar';
import { TechIcon } from './components/TechIcon';
import { DesktopNav, MobileMenu, useActiveSection } from './components/SiteNav';
import { useLenis } from './components/SmoothScroll';

export default function App() {
  const dossierRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();
  const activeSection = useActiveSection();

  // Motion scroll progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001
  });

  // Header glass thickens as the page scrolls
  const { scrollY } = useScroll();
  const headerAlpha = useTransform(scrollY, [0, 160], [0.4, 0.9]);
  const headerBg = useMotionTemplate`rgba(9, 11, 16, ${headerAlpha})`;

  // Sound toggle state
  const [audioEnabled, setAudioEnabled] = useState(true);

  // Selected project for modal view
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  // Selected certification for modal view
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
  // Filter for projects
  const [projectFilter, setProjectFilter] = useState<string>('All');
  // Filter for certifications
  const [certFilter, setCertFilter] = useState<string>('all');
  const [certSearchQuery, setCertSearchQuery] = useState<string>('');
  // Resume modal open state
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  // AWS Builder QR modal state
  const [awsQrModalOpen, setAwsQrModalOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  // Modals: lock page scroll while open, close on Escape
  const anyModalOpen = Boolean(selectedProject || selectedCert || resumeModalOpen || awsQrModalOpen);
  useEffect(() => {
    if (!anyModalOpen) return;
    if (lenis) lenis.stop();
    else document.documentElement.style.overflow = 'hidden';

    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setSelectedProject(null);
      setSelectedCert(null);
      setResumeModalOpen(false);
      setAwsQrModalOpen(false);
    };
    window.addEventListener('keydown', onKey);

    return () => {
      if (lenis) lenis.start();
      else document.documentElement.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [anyModalOpen, lenis]);

  // Interactive Playground state
  const [playgroundAgentTask, setPlaygroundAgentTask] = useState('Build an enterprise RAG microservice with semantic caching and Vertex AI');
  const [playgroundCloudProvider, setPlaygroundCloudProvider] = useState<'hybrid' | 'gcp' | 'azure'>('hybrid');
  const [playgroundSimulating, setPlaygroundSimulating] = useState(false);
  const [playgroundOutput, setPlaygroundOutput] = useState<{
    latency: string;
    throughput: string;
    status: string;
    steps: string[];
    costEstimate: string;
  } | null>(null);

  // Contact Form state
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const scrollToDossier = () => {
    soundFx.playPop();
    if (!dossierRef.current) return;
    if (lenis) lenis.scrollTo(dossierRef.current, { offset: -64, duration: 1.6 });
    else dossierRef.current.scrollIntoView({ behavior: 'auto', block: 'start' });
  };

  const scrollToTop = () => {
    if (lenis) lenis.scrollTo(0, { duration: 1.8 });
    else window.scrollTo(0, 0);
  };

  const toggleAudio = () => {
    const next = !audioEnabled;
    setAudioEnabled(next);
    soundFx.setEnabled(next);
    if (next) soundFx.playPop();
  };

  const handleCopyEmail = () => {
    soundFx.playPop();
    navigator.clipboard.writeText(CANDIDATE_PROFILE.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPhone = () => {
    soundFx.playPop();
    navigator.clipboard.writeText(CANDIDATE_PROFILE.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const triggerCelebration = () => {
    soundFx.playSuccess();
    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#6366f1', '#a855f7', '#3b82f6', '#10b981']
      });
    } catch {
      // safe fallback
    }
  };

  const runSimulation = () => {
    soundFx.playPop();
    setPlaygroundSimulating(true);
    setPlaygroundOutput(null);

    setTimeout(() => {
      setPlaygroundSimulating(false);
      soundFx.playSuccess();
      setPlaygroundOutput({
        latency: playgroundCloudProvider === 'gcp' ? '98ms' : playgroundCloudProvider === 'azure' ? '112ms' : '124ms',
        throughput: '4,280 req/sec',
        status: 'Optimal (Zero Failures)',
        costEstimate: playgroundCloudProvider === 'hybrid' ? '$42.50 / 1M requests (FinOps Optimized)' : '$56.00 / 1M requests',
        steps: [
          `[1] Analyzed prompt: "${playgroundAgentTask.slice(0, 42)}..."`,
          `[2] Ingress configured across ${playgroundCloudProvider.toUpperCase()} region pool with Istio mutual TLS.`,
          `[3] Provisioned vector index cache (pgvector + hybrid BM25 search).`,
          `[4] Gemini 2.5 Flash / Azure OpenAI embeddings loaded with 8k token context window.`,
          `[5] Readiness probe returned 200 OK across 4 autoscale replicas.`
        ]
      });
    }, 900);
  };

  const filteredProjects = projectFilter === 'All'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === projectFilter);

  const filteredCertifications = CERTIFICATIONS.filter(c => {
    const matchesCategory = certFilter === 'all' || c.category === certFilter;
    const matchesSearch = c.title.toLowerCase().includes(certSearchQuery.toLowerCase()) ||
      c.issuer.toLowerCase().includes(certSearchQuery.toLowerCase()) ||
      c.skillsGained.some(s => s.toLowerCase().includes(certSearchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#090b10] text-slate-100 font-sans selection:bg-indigo-500 selection:text-white relative">
      {/* Motion Hardware Canvas Particles */}
      <MotionBackgroundCanvas />

      {/* Kinetic Fluid Cursor */}
      <KineticCursor />

      {/* Motion Scroll Progress Indicator Bar (Spring Damped) */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-amber-400 via-indigo-500 to-sky-400 z-[100] origin-left"
      />

      {/* Ambient background blur circles */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div
          animate={{ x: [0, 70, -35, 0], y: [0, 50, -25, 0] }}
          transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[-10%] left-[-10%] w-[45vw] h-[45vw] rounded-full bg-indigo-900/10 blur-[130px]"
        />
        <motion.div
          animate={{ x: [0, -60, 30, 0], y: [0, 70, -35, 0] }}
          transition={{ duration: 32, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[35%] right-[-5%] w-[40vw] h-[40vw] rounded-full bg-blue-900/10 blur-[150px]"
        />
        <motion.div
          animate={{ x: [0, 80, -40, 0], y: [0, -40, 20, 0] }}
          transition={{ duration: 38, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-[-10%] left-[20%] w-[50vw] h-[50vw] rounded-full bg-purple-900/5 blur-[160px]"
        />
      </div>

      {/* TOP BAR: Brand wordmark | Navigation links | Audio and CV CTA */}
      <motion.header style={{ backgroundColor: headerBg }} className="sticky top-0 z-50 w-full backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark */}
          <a
            href="#hero"
            onMouseEnter={() => soundFx.playHover()}
            onClick={(e) => {
              e.preventDefault();
              soundFx.playPop();
              scrollToTop();
            }}
            className="text-lg font-bold tracking-tight text-white hover:text-indigo-400 transition-colors whitespace-nowrap shrink-0 flex items-center gap-2.5 group"
          >
            <span className="w-2.5 h-2.5 rounded-sm bg-indigo-500 group-hover:rotate-45 transition-transform" />
            <span>Abhilash Sharma</span>
          </a>

          {/* Zone 2: Navigation Links */}
          <DesktopNav active={activeSection} onHoverItem={() => soundFx.playHover()} />

          {/* Zone 3: Audio Toggle + Primary Action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={toggleAudio}
              title={audioEnabled ? 'Mute synthesized sound effects' : 'Enable synthesized sound effects'}
              className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg border border-white/5 transition-colors"
            >
              {audioEnabled ? <Volume2 className="w-4 h-4 text-indigo-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
            </button>

            <button
              onClick={() => {
                soundFx.playPop();
                setResumeModalOpen(true);
              }}
              aria-label="Inspect CV"
              className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 active:scale-[0.98] transition-all whitespace-nowrap shrink-0 flex items-center gap-2 shadow-lg shadow-indigo-600/20"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Inspect CV</span>
            </button>

            <MobileMenu active={activeSection} />
          </div>
        </div>
      </motion.header>

      {/* ================= THE EDOLUS AWWWARDS SCROLLING MOTION ENGINE ================= */}
      <CinematicStoryEngine onInitiateSystem={scrollToDossier} />

      {/* MAIN CONTENT AREA */}
      <main ref={dossierRef} className="relative z-10">
        {/* HERO SECTION: Candidate Profile Spotlight with User Portrait */}
        <section id="hero" className="pt-16 pb-20 border-b border-white/5">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              {/* Left Column: Typographic Hierarchy */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '0px 0px -10% 0px' }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-7 flex flex-col justify-center space-y-6"
              >
                <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-indigo-400 uppercase tracking-wider">
                  <span>Google Cloud Certified</span>
                  <span aria-hidden="true" className="text-slate-600">·</span>
                  <span>Azure AI Specialist</span>
                  <span aria-hidden="true" className="text-slate-600">·</span>
                  <span>Full-Stack Cloud Architect</span>
                </div>

                <SplitHeading
                  as="h1"
                  text="Building kinetic AI agent runtimes and high-availability cloud fabrics."
                  accentWords={3}
                  accentClassName="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-sky-400 to-emerald-300"
                  className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.08] [text-wrap:balance]"
                />

                <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-normal">
                  {CANDIDATE_PROFILE.tagline} Verified expertise across Vertex AI, Azure OpenAI, multi-cloud Kubernetes, and React 19 motion interfaces.
                </p>

                {/* Interactive CTAs and Contact quick action */}
                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <a
                    href="#projects"
                    onMouseEnter={() => soundFx.playHover()}
                    onClick={() => soundFx.playPop()}
                    className="px-5 py-3 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-600/25 flex items-center gap-2 active:scale-95"
                  >
                    <span>Inspect Case Studies</span>
                    <ChevronRight className="w-4 h-4" />
                  </a>

                  <a
                    href={CANDIDATE_PROFILE.driveCertificatesUrl}
                    target="_blank"
                    rel="noreferrer"
                    onMouseEnter={() => soundFx.playHover()}
                    onClick={() => soundFx.playPop()}
                    className="px-5 py-3 text-sm font-medium text-slate-200 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors flex items-center gap-2"
                  >
                    <FolderOpen className="w-4 h-4 text-amber-400" />
                    <span>View Drive Certificates (45+)</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                  </a>

                  <a
                    href={CANDIDATE_PROFILE.whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    onMouseEnter={() => soundFx.playHover()}
                    onClick={() => soundFx.playPop()}
                    className="px-4 py-3 text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp Quick Chat</span>
                  </a>

                  <button
                    onClick={() => {
                      soundFx.playPop();
                      setAwsQrModalOpen(true);
                    }}
                    onMouseEnter={() => soundFx.playHover()}
                    className="px-4 py-3 text-sm font-semibold text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 rounded-lg transition-colors flex items-center gap-2 shadow-lg shadow-amber-500/10 active:scale-95"
                  >
                    <QrCode className="w-4 h-4 text-amber-400" />
                    <span>AWS Builder QR</span>
                  </button>
                </div>

                {/* Candidate Trust Indicators */}
                <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-slate-400 border-t border-white/5">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-slate-300 font-medium">Ready for Full-Time Roles</span>
                  </div>
                  <span className="text-slate-600">·</span>
                  <span>Contact: {CANDIDATE_PROFILE.phone}</span>
                  <span className="text-slate-600">·</span>
                  <span>Global Remote & Hybrid Ready</span>
                </div>
              </motion.div>

              {/* Right Column: Visual Container with 3D Tilt */}
              <motion.div
                initial={{ opacity: 0, scale: 0.94, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: '0px 0px -10% 0px' }}
                transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-5 relative"
              >
                {/* Floating tech chips drifting around the portrait */}
                <div className="hidden sm:flex float-slow absolute -left-5 top-32 z-30 items-center gap-2 px-3 py-2 rounded-xl glass-panel border border-indigo-500/30 shadow-xl shadow-indigo-500/10 text-xs font-medium text-slate-100 pointer-events-none">
                  <Cpu className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Vertex AI · Gemini</span>
                </div>
                <div className="hidden sm:flex float-slower absolute -right-4 top-1/2 z-30 items-center gap-2 px-3 py-2 rounded-xl glass-panel border border-sky-500/30 shadow-xl shadow-sky-500/10 text-xs font-medium text-slate-100 pointer-events-none">
                  <Cloud className="w-3.5 h-3.5 text-sky-400" />
                  <span>GKE · AKS · Terraform</span>
                </div>
                <div className="hidden sm:flex float-slow absolute -left-4 bottom-36 z-30 items-center gap-2 px-3 py-2 rounded-xl glass-panel border border-emerald-500/30 shadow-xl shadow-emerald-500/10 text-xs font-medium text-slate-100 pointer-events-none">
                  <Code2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>React 19 · Motion</span>
                </div>

                <Interactive3DCard className="rounded-2xl p-2 glass-panel shadow-2xl">
                  <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-slate-900 group">
                    {/* Floating AWS Builder QR Pill */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        soundFx.playPop();
                        setAwsQrModalOpen(true);
                      }}
                      className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/85 hover:bg-black border border-amber-400/40 text-amber-300 text-xs font-mono backdrop-blur-md transition-all shadow-xl hover:scale-105 active:scale-95 group/qr cursor-pointer"
                      title="Scan to connect on AWS Builder"
                    >
                      <QrCode className="w-3.5 h-3.5 text-amber-400 group-hover/qr:rotate-12 transition-transform" />
                      <span className="font-semibold tracking-wide">AWS Builder QR</span>
                    </button>

                    <img
                      src={CANDIDATE_PROFILE.avatarPhoto}
                      alt="Abhilash Sharma - AI Architect & Cloud Engineer"
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#090b10] via-black/20 to-transparent opacity-90" />

                    {/* Overlay info strip */}
                    <div className="absolute bottom-5 left-5 right-5 space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-lg font-bold text-white tracking-tight">Abhilash Sharma</div>
                          <div className="text-xs text-slate-400">Full-Stack Cloud & AI Architect</div>
                        </div>
                        <button
                          onClick={triggerCelebration}
                          className="text-xs font-mono text-emerald-400 bg-emerald-950/80 border border-emerald-500/30 px-2 py-1 rounded hover:bg-emerald-900 transition-colors"
                        >
                          PRO VERIFIED ✨
                        </button>
                      </div>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300 pt-1">
                        <span>CBSE 12th: 93%</span>
                        <span className="text-slate-600">·</span>
                        <span>CBSE 10th: 97%</span>
                        <span className="text-slate-600">·</span>
                        <span>45+ Cloud Badges</span>
                      </div>
                    </div>
                  </div>
                </Interactive3DCard>
              </motion.div>
            </div>

            {/* Proof Metrics Strip with Tabular Figures */}
            <div className="mt-16 pt-10 border-t border-white/5 grid grid-cols-2 md:grid-cols-4 gap-6">
              {CANDIDATE_PROFILE.stats.map((stat, idx) => (
                <Reveal key={idx} delay={idx * 0.08} className="h-full">
                <div
                  onMouseEnter={() => soundFx.playHover()}
                  className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-indigo-500/30 transition-colors h-full"
                >
                  <div className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight font-mono tabular-nums">
                    <AnimatedCounter value={stat.value} />
                  </div>
                  <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-medium">
                    {stat.label}
                  </div>
                </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* KINETIC MARQUEE SECTION 1 */}
        <KineticMarquee
          items={[
            'Google Cloud Vertex AI',
            'Microsoft Azure OpenAI',
            'Kubernetes (GKE & AKS)',
            'React 19 & Next.js',
            'Full-Stack TypeScript',
            'RAG Hybrid Search',
            'Terraform IaC',
            'Motion Physics Engine'
          ]}
          direction="left"
        />

        {/* SECTION: ACADEMIC EXCELLENCE (Grade 12: 93%, Grade 10: 97%) */}
        <section id="academics" className="py-20 border-b border-white/5 bg-white/[0.01]">
          <div className="max-w-7xl mx-auto px-6">
            <Reveal y={22} className="max-w-3xl mb-12">
              <div className="text-xs font-medium text-indigo-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4" />
                <span>Scholastic Track Record</span>
              </div>
              <SplitHeading text={"Academic foundation of rigor & excellence."} className="text-3xl sm:text-4xl font-bold text-white tracking-tight" />
              <p className="mt-3 text-slate-300 text-sm leading-relaxed">
                Demonstrated high-percentile intellectual consistency across secondary and senior secondary examinations prior to specializing in advanced distributed cloud computing and artificial intelligence.
              </p>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {EDUCATION_DATA.map((edu, idx) => (
                <Reveal key={idx} delay={idx * 0.12} className="h-full">
                <div
                  onMouseEnter={() => soundFx.playHover()}
                  className="glass-panel p-8 rounded-2xl border border-white/5 space-y-4 hover:border-indigo-500/30 transition-all relative overflow-hidden group h-full"
                >
                  <div className="absolute top-0 right-0 p-6">
                    <span className="text-2xl font-black font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-3 py-1 rounded-lg tabular-nums">
                      {edu.score}
                    </span>
                  </div>

                  <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                    <Award className="w-5 h-5" />
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors">
                      {edu.degree}
                    </h3>
                    <div className="text-xs text-slate-400 mt-1">
                      {edu.institution} · {edu.period}
                    </div>
                  </div>

                  <p className="text-sm text-slate-300 leading-relaxed">
                    {edu.details}
                  </p>

                  <div className="pt-4 border-t border-white/5 space-y-2">
                    {edu.highlights.map((h, hIdx) => (
                      <div key={hIdx} className="text-xs text-slate-400 flex items-start gap-2">
                        <span className="text-indigo-400">▹</span>
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION: CANDIDATE BACKGROUND & ARCHITECTURAL PILLARS */}
        <section id="about" className="py-20 border-b border-white/5">
          <div className="max-w-7xl mx-auto px-6">
            <Reveal y={22} className="max-w-3xl mb-12">
              <div className="text-xs font-medium text-indigo-400 uppercase tracking-wider mb-2">
                Engineering Discipline & Philosophy
              </div>
              <SplitHeading text={"Architectural rigor across the entire stack."} className="text-3xl sm:text-4xl font-bold text-white tracking-tight" />
              <p className="mt-4 text-base text-slate-300 leading-relaxed">
                Rather than treating AI as a black box or cloud platforms as an afterthought, I synthesize software design, container orchestration, and model inference into unified, resilient production systems.
              </p>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Reveal delay={0} className="h-full">
              <div className="glass-panel p-8 rounded-2xl space-y-4 hover:border-indigo-500/30 transition-colors h-full">
                <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                  <Cpu className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-white">01. Agentic AI & RAG Engineering</h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Deep experience structuring real-time RAG pipelines with semantic ranking, hybrid search, context caching, and guardrail validation using Gemini 2.5 and Azure OpenAI.
                </p>
                <div className="text-xs text-slate-400 pt-2 border-t border-white/5">
                  Focus: Low-latency inference · Schema enforcement · Hallucination reduction
                </div>
              </div>
              </Reveal>

              <Reveal delay={0.1} className="h-full">
              <div className="glass-panel p-8 rounded-2xl space-y-4 hover:border-blue-500/30 transition-colors h-full">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                  <Cloud className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-white">02. Distributed Cloud & Kubernetes</h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Deploying multi-cloud microservices on GKE and AKS with Terraform IaC, zero-trust IAM baselines, and Prometheus monitoring for guaranteed high availability.
                </p>
                <div className="text-xs text-slate-400 pt-2 border-t border-white/5">
                  Focus: High availability · Multi-cloud failover · FinOps cost optimization
                </div>
              </div>
              </Reveal>

              <Reveal delay={0.2} className="h-full">
              <div className="glass-panel p-8 rounded-2xl space-y-4 hover:border-emerald-500/30 transition-colors h-full">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <Code2 className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-white">03. High-Motion Kinetic Web</h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Crafting accessible, reactive user interfaces with React 19, TypeScript, and modern CSS that adhere to Awwwards standards: zero layout shift and fluid 60/120fps physics.
                </p>
                <div className="text-xs text-slate-400 pt-2 border-t border-white/5">
                  Focus: Web vitals 100/100 · Kinetic cursor · Audio synthesizer feedback
                </div>
              </div>
              </Reveal>
            </div>

          </div>
        </section>

        {/* SECTION: SELECTED WORK / CASE STUDIES */}
        <section id="projects" className="py-20 border-b border-white/5">
          <div className="max-w-7xl mx-auto px-6">
            <Reveal y={22} className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <div className="text-xs font-medium text-indigo-400 uppercase tracking-wider mb-2">
                  Projects · Live from GitHub
                </div>
                <SplitHeading text={"Things I have built."} className="text-3xl sm:text-4xl font-bold text-white tracking-tight" />
                <p className="text-slate-400 text-sm mt-2 max-w-xl">
                  Every project here is a public repository on my GitHub. Open one to see its architecture, stack and a link to the source.
                </p>
              </div>

              {/* Interactive Filter segmented control */}
              <div className="flex items-center gap-1 p-1 bg-white/[0.04] rounded-lg border border-white/10 self-start md:self-auto overflow-x-auto max-w-full">
                {['All', 'Cloud & DevOps', 'AI & Agentic', 'Systems & Backend', 'Full-Stack Web'].map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      soundFx.playPop();
                      setProjectFilter(category);
                    }}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap shrink-0 ${
                      projectFilter === category
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </Reveal>

            {/* Dynamic Grid of Projects */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div key={project.id} layout initial={{ opacity: 0, y: 40, scale: 0.97 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.94 }} viewport={{ once: true, margin: '0px 0px -10% 0px' }} transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }} className="h-full">
                <Interactive3DCard
                  onClick={() => {
                    soundFx.playPop();
                    setSelectedProject(project);
                  }}
                  className="glass-panel glass-panel-hover rounded-2xl overflow-hidden group flex flex-col justify-between h-full"
                >
                  <div>
                    {/* Media Frame */}
                    <div className="relative aspect-video w-full overflow-hidden bg-slate-900 border-b border-white/5">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#090b10] via-transparent to-transparent opacity-80" />
                      <div className="absolute top-4 right-4 bg-[#090b10]/90 backdrop-blur-md border border-white/10 text-xs font-mono text-indigo-300 px-3 py-1 rounded-md">
                        {project.period}
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6 space-y-4">
                      <div className="flex items-center gap-2 text-xs text-indigo-400 font-medium">
                        <span>{project.category}</span>
                        <span aria-hidden="true" className="text-slate-600">·</span>
                        <span>{project.role}</span>
                      </div>

                      <h3 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors">
                        {project.title}
                      </h3>

                      <p className="text-sm text-slate-300 leading-relaxed">
                        {project.tagline}
                      </p>

                      {/* Key Quantitative Proofs */}
                      <div className="grid grid-cols-3 gap-3 py-3 border-y border-white/5">
                        {project.metrics.map((metric, mIdx) => (
                          <div key={mIdx}>
                            <div className="text-base font-bold text-white font-mono tabular-nums">
                              {metric.value}
                            </div>
                            <div className="text-[11px] text-slate-400 truncate">
                              {metric.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="px-6 pb-6 pt-2 flex items-center justify-between text-xs border-t border-white/5 mt-2">
                    <div className="flex flex-wrap gap-2 text-slate-400">
                      {project.techStack.slice(0, 4).map((tech, tIdx) => (
                        <span key={tIdx} className="text-slate-300">{tech}{tIdx < 3 ? ' ·' : ''}</span>
                      ))}
                    </div>
                    <div className="text-indigo-400 font-medium flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                      <span>Inspect Breakdown</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </Interactive3DCard>
                </motion.div>
              ))}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* SECTION: CLOUD & AI CREDENTIALS HUB (Linked with Google Drive Folder) */}
        <section id="certifications" className="py-20 border-b border-white/5">
          <div className="max-w-7xl mx-auto px-6">
            <Reveal y={22} className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
              <div>
                <div className="text-xs font-medium text-indigo-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Award className="w-4 h-4" />
                  <span>Credential Repository</span>
                </div>
                <SplitHeading text={"Google Cloud & Microsoft Azure verified credentials."} className="text-3xl sm:text-4xl font-bold text-white tracking-tight" />
                <p className="text-slate-400 text-sm mt-2 max-w-2xl">
                  Reflecting 45+ earned badges across Generative AI on Vertex AI, Kubernetes operations on GKE, Azure OpenAI RAG architectures, and enterprise security.
                </p>
              </div>

              {/* Direct Drive Folder Action */}
              <div className="flex items-center gap-3">
                <a
                  href={CANDIDATE_PROFILE.driveCertificatesUrl}
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={() => soundFx.playHover()}
                  onClick={() => soundFx.playPop()}
                  className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold flex items-center gap-2 shadow-lg shadow-indigo-600/20 whitespace-nowrap"
                >
                  <FolderOpen className="w-4 h-4 text-amber-300" />
                  <span>Open Certificates Drive Folder</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </Reveal>

            {/* Search & Category Filter */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Filter 45+ certificates by skill, issuer, or keyword..."
                  value={certSearchQuery}
                  onChange={(e) => setCertSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs bg-white/[0.04] border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>

              <div className="flex items-center gap-1 p-1 bg-white/[0.04] rounded-lg border border-white/10 self-start sm:self-auto">
                {[
                  { id: 'all', label: 'All' },
                  { id: 'ai', label: 'AI & GenAI' },
                  { id: 'cloud', label: 'Cloud & K8s' },
                  { id: 'security', label: 'Security' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      soundFx.playPop();
                      setCertFilter(tab.id);
                    }}
                    className={`px-3 py-1 text-xs font-medium rounded transition-all whitespace-nowrap shrink-0 ${
                      certFilter === tab.id
                        ? 'bg-indigo-600 text-white'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Certifications 3-in-a-Row Horizontal Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
              {filteredCertifications.map((cert) => (
                <motion.div key={cert.id} layout initial={{ opacity: 0, y: 28, scale: 0.97 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.94 }} viewport={{ once: true, margin: '0px 0px -8% 0px' }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} className="h-full">
                <div
                  onClick={() => {
                    soundFx.playPop();
                    setSelectedCert(cert);
                  }}
                  onMouseEnter={() => soundFx.playHover()}
                  className="glass-panel glass-panel-hover p-6 rounded-xl flex flex-col justify-between cursor-pointer group h-full"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${cert.issuer === 'Google Cloud' ? 'bg-blue-400' : cert.issuer === 'Microsoft Azure' ? 'bg-sky-400' : 'bg-emerald-400'}`} />
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                          {cert.issuer}
                        </span>
                      </div>
                      <span className="text-xs font-mono text-slate-400">{cert.date}</span>
                    </div>

                    <h4 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors leading-snug">
                      {cert.title}
                    </h4>

                    <div className="text-xs text-slate-400">
                      Level: <span className="text-slate-200">{cert.level}</span>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {cert.skillsGained.slice(0, 3).map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="text-[11px] text-slate-400"
                        >
                          {skill}{sIdx < 2 ? ' ·' : ''}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between text-xs">
                    <span className="font-mono text-slate-500 text-[11px]">{cert.credentialId}</span>
                    <span className="text-indigo-400 font-medium group-hover:underline flex items-center gap-1">
                      <span>View Credential</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
                </motion.div>
              ))}
              </AnimatePresence>
            </div>

            {filteredCertifications.length === 0 && (
              <div className="text-center py-16 text-slate-400 text-sm glass-panel rounded-xl">
                No credentials matched the current filter criteria.
              </div>
            )}
          </div>
        </section>

        {/* KINETIC MARQUEE SECTION 2 */}
        <KineticMarquee
          items={[
            'CBSE Grade 10: 97%',
            'CBSE Grade 12: 93%',
            '45+ Cloud Credentials',
            'Multi-Cloud Distributed Resilience',
            'Google Cloud Skills Boost',
            'Microsoft Learn Verified'
          ]}
          direction="right"
        />

        {/* SECTION: SYSTEM PLAYGROUND */}
        <section id="architecture" className="py-20 border-b border-white/5 bg-black/20">
          <div className="max-w-7xl mx-auto px-6">
            <Reveal y={22} className="max-w-3xl mb-12">
              <div className="text-xs font-medium text-indigo-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Terminal className="w-4 h-4" />
                <span>Interactive Architecture Simulation</span>
              </div>
              <SplitHeading text={"Simulate multi-cloud agent pipelines in real-time."} className="text-3xl sm:text-4xl font-bold text-white tracking-tight" />
              <p className="text-slate-300 text-base mt-2 leading-relaxed">
                Experience how Abhilash designs resilient systems. Select deployment targets, configure agent specifications, and inspect simulated latency and FinOps telemetry.
              </p>
            </Reveal>

            <Reveal y={40} className="grid grid-cols-1 lg:grid-cols-12 gap-8 glass-panel p-8 rounded-2xl border border-white/10">
              {/* Left Configuration Pane */}
              <Reveal x={-36} y={0} className="lg:col-span-5 space-y-6">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                    Target Cloud Topology
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['hybrid', 'gcp', 'azure'] as const).map((cloud) => (
                      <button
                        key={cloud}
                        onClick={() => {
                          soundFx.playPop();
                          setPlaygroundCloudProvider(cloud);
                        }}
                        className={`py-2 px-3 text-xs font-medium rounded-lg border transition-all text-center uppercase ${
                          playgroundCloudProvider === cloud
                            ? 'bg-indigo-600 border-indigo-500 text-white shadow-md'
                            : 'bg-white/[0.03] border-white/10 text-slate-400 hover:text-white'
                        }`}
                      >
                        {cloud === 'hybrid' ? 'Hybrid (GKE+AKS)' : cloud.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                    Agent Workload Specification
                  </label>
                  <textarea
                    rows={3}
                    value={playgroundAgentTask}
                    onChange={(e) => setPlaygroundAgentTask(e.target.value)}
                    className="w-full p-3 text-xs bg-white/[0.04] border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-mono transition-colors"
                  />
                  <div className="flex gap-2 mt-2">
                    {[
                      'Gemini 2.5 Flash streaming agent',
                      'Multi-cloud Kubernetes failover',
                      'Document OCR extraction batch'
                    ].map((preset, pIdx) => (
                      <button
                        key={pIdx}
                        onClick={() => {
                          soundFx.playPop();
                          setPlaygroundAgentTask(preset);
                        }}
                        className="text-[11px] text-slate-400 hover:text-indigo-300 underline"
                      >
                        Sample #{pIdx + 1}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={runSimulation}
                  disabled={playgroundSimulating}
                  className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-semibold text-xs rounded-lg transition-all shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2 active:scale-95"
                >
                  <Zap className="w-4 h-4" />
                  <span>{playgroundSimulating ? 'Running local scenario...' : 'Run illustrative scenario'}</span>
                </button>
              </Reveal>

              {/* Right Output Console Pane */}
              <div className="lg:col-span-7 bg-[#05070b] border border-white/10 rounded-xl p-6 font-mono text-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10 text-slate-400">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
                      <span className="text-white font-medium">LOCAL SCENARIO PREVIEW</span>
                    </div>
                    <span>TOPOLOGY: {playgroundCloudProvider.toUpperCase()}</span>
                  </div>

                  {playgroundSimulating && (
                    <div className="py-12 flex flex-col items-center justify-center space-y-3 text-indigo-400">
                      <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                      <span className="text-slate-400">Synthesizing network topology and cache layers...</span>
                    </div>
                  )}

                  {!playgroundSimulating && !playgroundOutput && (
                    <div className="py-12 text-center text-slate-500">
                      Run a local walkthrough to see an illustrative architecture trace. No cloud resources are provisioned and no live telemetry is collected.
                    </div>
                  )}

                  {!playgroundSimulating && playgroundOutput && (
                    <div className="space-y-4">
                      {/* Illustrative scenario values — not live measurements. */}
                      <div className="space-y-2"><p className="text-[10px] uppercase tracking-[0.16em] text-amber-300">Illustrative output · not live infrastructure telemetry</p><div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white/[0.02] p-3 rounded-lg border border-white/5">
                        <div>
                          <div className="text-slate-400 text-[10px] uppercase">Latency</div>
                          <div className="text-sm font-bold text-emerald-400 tabular-nums">{playgroundOutput.latency}</div>
                        </div>
                        <div>
                          <div className="text-slate-400 text-[10px] uppercase">Throughput</div>
                          <div className="text-sm font-bold text-white tabular-nums">{playgroundOutput.throughput}</div>
                        </div>
                        <div>
                          <div className="text-slate-400 text-[10px] uppercase">Health</div>
                          <div className="text-sm font-bold text-indigo-300 truncate">{playgroundOutput.status}</div>
                        </div>
                        <div>
                          <div className="text-slate-400 text-[10px] uppercase">Economics</div>
                          <div className="text-xs font-bold text-amber-300 truncate">{playgroundOutput.costEstimate.split(' ')[0]}</div>
                        </div>
                      </div></div>

                      {/* Log Output */}
                      <div className="space-y-1.5 pt-2">
                        {playgroundOutput.steps.map((step, sIdx) => (
                          <div key={sIdx} className="text-slate-300">
                            {step}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-4 mt-6 border-t border-white/5 text-[11px] text-slate-500 flex items-center justify-between">
                  <span>Illustrative walkthrough · no cloud resources provisioned</span>
                  <span className="text-amber-300">MODE: LOCAL DEMO</span>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* SECTION: STACK — MATCHES THE GITHUB PROFILE README */}
        <section id="stack" className="py-20 border-b border-white/5">
          <div className="max-w-7xl mx-auto px-6">
            <Reveal y={22} className="max-w-3xl mb-12">
              <div className="text-xs font-medium text-indigo-400 uppercase tracking-wider mb-2">04 — GitHub Tech Stack</div>
              <SplitHeading text="Tools I build with." accentWords={2} className="text-3xl sm:text-4xl font-bold text-white tracking-tight" />
              <p className="mt-3 text-sm text-slate-400">The same technology categories and tools listed on my GitHub profile, organised for a closer look.</p>
            </Reveal>

            <div className="space-y-6">
              {[
                {
                  category: '01 / Programming Languages',
                  tools: [
                    { name: 'C', icon: `${import.meta.env.BASE_URL}icons/c.svg` },
                    { name: 'C++', icon: `${import.meta.env.BASE_URL}icons/cplusplus.svg` },
                    { name: 'Go', icon: `${import.meta.env.BASE_URL}icons/go.svg` },
                    { name: 'Python', icon: `${import.meta.env.BASE_URL}icons/python.svg` },
                    { name: 'Java', icon: `${import.meta.env.BASE_URL}icons/openjdk.svg` },
                    { name: 'Kotlin', icon: `${import.meta.env.BASE_URL}icons/kotlin.svg` },
                    { name: 'Swift', icon: `${import.meta.env.BASE_URL}icons/swift.svg` },
                    { name: 'Dart', icon: `${import.meta.env.BASE_URL}icons/dart.svg` },
                    { name: 'Rust', icon: `${import.meta.env.BASE_URL}icons/rust.svg` },
                    { name: 'TypeScript', icon: `${import.meta.env.BASE_URL}icons/typescript.svg` },
                    { name: 'JavaScript', icon: `${import.meta.env.BASE_URL}icons/javascript.svg` },
                    { name: 'Bash', icon: `${import.meta.env.BASE_URL}icons/gnubash.svg` },
                    { name: 'PowerShell', icon: `${import.meta.env.BASE_URL}icons/powershell.svg` },
                  ],
                },
                {
                  category: '02 / Cloud & DevOps',
                  tools: [
                    { name: 'AWS', icon: `${import.meta.env.BASE_URL}icons/amazonaws.svg` },
                    { name: 'Azure', icon: `${import.meta.env.BASE_URL}icons/microsoftazure.svg` },
                    { name: 'Google Cloud', icon: `${import.meta.env.BASE_URL}icons/googlecloud.svg` },
                    { name: 'Docker', icon: `${import.meta.env.BASE_URL}icons/docker.svg` },
                    { name: 'Kubernetes', icon: `${import.meta.env.BASE_URL}icons/kubernetes.svg` },
                    { name: 'Terraform', icon: `${import.meta.env.BASE_URL}icons/terraform.svg` },
                    { name: 'Jenkins', icon: `${import.meta.env.BASE_URL}icons/jenkins.svg` },
                    { name: 'GitHub Actions', icon: `${import.meta.env.BASE_URL}icons/githubactions.svg` },
                    { name: 'GitLab', icon: `${import.meta.env.BASE_URL}icons/gitlab.svg` },
                    { name: 'Ansible', icon: `${import.meta.env.BASE_URL}icons/ansible.svg` },
                    { name: 'Nginx', icon: `${import.meta.env.BASE_URL}icons/nginx.svg` },
                    { name: 'Cloudflare', icon: `${import.meta.env.BASE_URL}icons/cloudflare.svg` },
                    { name: 'Vercel', icon: `${import.meta.env.BASE_URL}icons/vercel.svg` },
                    { name: 'Netlify', icon: `${import.meta.env.BASE_URL}icons/netlify.svg` },
                    { name: 'Argo CD', icon: `${import.meta.env.BASE_URL}icons/argo.svg` },
                    { name: 'Helm', icon: `${import.meta.env.BASE_URL}icons/helm.svg` },
                    { name: 'Istio', icon: `${import.meta.env.BASE_URL}icons/istio.svg` },
                    { name: 'Vault', icon: `${import.meta.env.BASE_URL}icons/vault.svg` },
                    { name: 'Pulumi', icon: `${import.meta.env.BASE_URL}icons/pulumi.svg` },
                    { name: 'SonarQube', icon: `${import.meta.env.BASE_URL}icons/sonarqube.svg` },
                    { name: 'Trivy', icon: `${import.meta.env.BASE_URL}icons/aquasecurity.svg` },
                  ],
                },
                {
                  category: '03 / AI, ML & Agentic AI',
                  tools: [
                    { name: 'PyTorch', icon: `${import.meta.env.BASE_URL}icons/pytorch.svg` },
                    { name: 'TensorFlow', icon: `${import.meta.env.BASE_URL}icons/tensorflow.svg` },
                    { name: 'FastAPI', icon: `${import.meta.env.BASE_URL}icons/fastapi.svg` },
                    { name: 'Flask', icon: `${import.meta.env.BASE_URL}icons/flask.svg` },
                    { name: 'LangChain', icon: `${import.meta.env.BASE_URL}icons/langchain.svg` },
                    { name: 'LangGraph', icon: `${import.meta.env.BASE_URL}icons/langgraph.svg` },
                    { name: 'Hugging Face', icon: `${import.meta.env.BASE_URL}icons/huggingface.svg` },
                    { name: 'Anthropic Claude', icon: `${import.meta.env.BASE_URL}icons/anthropic.svg` },
                    { name: 'MCP', icon: `${import.meta.env.BASE_URL}icons/modelcontextprotocol.svg` },
                    { name: 'RAG', icon: '' },
                    { name: 'MLflow', icon: `${import.meta.env.BASE_URL}icons/mlflow.svg` },
                    { name: 'Ollama', icon: `${import.meta.env.BASE_URL}icons/ollama.svg` },
                  ],
                },
                {
                  category: '04 / Databases & Messaging',
                  tools: [
                    { name: 'MySQL', icon: `${import.meta.env.BASE_URL}icons/mysql.svg` },
                    { name: 'PostgreSQL', icon: `${import.meta.env.BASE_URL}icons/postgresql.svg` },
                    { name: 'MongoDB', icon: `${import.meta.env.BASE_URL}icons/mongodb.svg` },
                    { name: 'Redis', icon: `${import.meta.env.BASE_URL}icons/redis.svg` },
                    { name: 'Kafka', icon: `${import.meta.env.BASE_URL}icons/apachekafka.svg` },
                    { name: 'SQLite', icon: `${import.meta.env.BASE_URL}icons/sqlite.svg` },
                    { name: 'Supabase', icon: `${import.meta.env.BASE_URL}icons/supabase.svg` },
                    { name: 'Firebase', icon: `${import.meta.env.BASE_URL}icons/firebase.svg` },
                    { name: 'Elasticsearch', icon: `${import.meta.env.BASE_URL}icons/elasticsearch.svg` },
                    { name: 'RabbitMQ', icon: `${import.meta.env.BASE_URL}icons/rabbitmq.svg` },
                  ],
                },
                {
                  category: '05 / Backend & Web Development',
                  tools: [
                    { name: 'Node.js', icon: `${import.meta.env.BASE_URL}icons/nodedotjs.svg` },
                    { name: 'Express', icon: `${import.meta.env.BASE_URL}icons/express.svg` },
                    { name: 'FastAPI', icon: `${import.meta.env.BASE_URL}icons/fastapi.svg` },
                    { name: 'Django', icon: `${import.meta.env.BASE_URL}icons/django.svg` },
                    { name: 'Spring', icon: `${import.meta.env.BASE_URL}icons/spring.svg` },
                    { name: 'GraphQL', icon: `${import.meta.env.BASE_URL}icons/graphql.svg` },
                    { name: 'React', icon: `${import.meta.env.BASE_URL}icons/react.svg` },
                    { name: 'Next.js', icon: `${import.meta.env.BASE_URL}icons/nextdotjs.svg` },
                    { name: 'Angular', icon: `${import.meta.env.BASE_URL}icons/angular.svg` },
                    { name: 'Vue', icon: `${import.meta.env.BASE_URL}icons/vuedotjs.svg` },
                    { name: 'Vite', icon: `${import.meta.env.BASE_URL}icons/vite.svg` },
                    { name: 'Tailwind CSS', icon: `${import.meta.env.BASE_URL}icons/tailwindcss.svg` },
                    { name: 'Bootstrap', icon: `${import.meta.env.BASE_URL}icons/bootstrap.svg` },
                    { name: 'HTML', icon: `${import.meta.env.BASE_URL}icons/html5.svg` },
                    { name: 'CSS', icon: `${import.meta.env.BASE_URL}icons/css3.svg` },
                  ],
                },
                {
                  category: '06 / Version Control, Build & Testing',
                  tools: [
                    { name: 'Git', icon: `${import.meta.env.BASE_URL}icons/git.svg` },
                    { name: 'GitHub', icon: `${import.meta.env.BASE_URL}icons/github.svg` },
                    { name: 'GitLab', icon: `${import.meta.env.BASE_URL}icons/gitlab.svg` },
                    { name: 'Maven', icon: `${import.meta.env.BASE_URL}icons/apachemaven.svg` },
                    { name: 'Gradle', icon: `${import.meta.env.BASE_URL}icons/gradle.svg` },
                    { name: 'npm', icon: `${import.meta.env.BASE_URL}icons/npm.svg` },
                    { name: 'Postman', icon: `${import.meta.env.BASE_URL}icons/postman.svg` },
                    { name: 'Selenium', icon: `${import.meta.env.BASE_URL}icons/selenium.svg` },
                    { name: 'Jest', icon: `${import.meta.env.BASE_URL}icons/jest.svg` },
                    { name: 'Pytest', icon: `${import.meta.env.BASE_URL}icons/pytest.svg` },
                  ],
                },
                {
                  category: '07 / Monitoring, IaC & Automation',
                  tools: [
                    { name: 'Prometheus', icon: `${import.meta.env.BASE_URL}icons/prometheus.svg` },
                    { name: 'Grafana', icon: `${import.meta.env.BASE_URL}icons/grafana.svg` },
                    { name: 'Terraform', icon: `${import.meta.env.BASE_URL}icons/terraform.svg` },
                    { name: 'Ansible', icon: `${import.meta.env.BASE_URL}icons/ansible.svg` },
                    { name: 'Bash', icon: `${import.meta.env.BASE_URL}icons/gnubash.svg` },
                    { name: 'Datadog', icon: `${import.meta.env.BASE_URL}icons/datadog.svg` },
                    { name: 'OpenTelemetry', icon: `${import.meta.env.BASE_URL}icons/opentelemetry.svg` },
                    { name: 'Loki', icon: `${import.meta.env.BASE_URL}icons/grafana.svg` },
                    { name: 'ELK', icon: `${import.meta.env.BASE_URL}icons/elastic.svg` },
                  ],
                },
                {
                  category: '08 / Operating Systems & Virtualization',
                  tools: [
                    { name: 'Linux', icon: `${import.meta.env.BASE_URL}icons/linux.svg` },
                    { name: 'Ubuntu', icon: `${import.meta.env.BASE_URL}icons/ubuntu.svg` },
                    { name: 'Kali Linux', icon: `${import.meta.env.BASE_URL}icons/kalilinux.svg` },
                    { name: 'Arch Linux', icon: `${import.meta.env.BASE_URL}icons/archlinux.svg` },
                    { name: 'Debian', icon: `${import.meta.env.BASE_URL}icons/debian.svg` },
                    { name: 'macOS', icon: `${import.meta.env.BASE_URL}icons/apple.svg` },
                    { name: 'Windows', icon: `${import.meta.env.BASE_URL}icons/windows.svg` },
                    { name: 'VMware', icon: `${import.meta.env.BASE_URL}icons/vmware.svg` },
                  ],
                },
                {
                  category: '09 / Development Tools & Platforms',
                  tools: [
                    { name: 'VS Code', icon: `${import.meta.env.BASE_URL}icons/visualstudiocode.svg` },
                    { name: 'IntelliJ IDEA', icon: `${import.meta.env.BASE_URL}icons/intellijidea.svg` },
                    { name: 'WebStorm', icon: `${import.meta.env.BASE_URL}icons/webstorm.svg` },
                    { name: 'Android Studio', icon: `${import.meta.env.BASE_URL}icons/androidstudio.svg` },
                    { name: 'Flutter', icon: `${import.meta.env.BASE_URL}icons/flutter.svg` },
                    { name: 'Vim', icon: `${import.meta.env.BASE_URL}icons/vim.svg` },
                    { name: 'Neovim', icon: `${import.meta.env.BASE_URL}icons/neovim.svg` },
                    { name: 'Figma', icon: `${import.meta.env.BASE_URL}icons/figma.svg` },
                    { name: 'MATLAB', icon: `${import.meta.env.BASE_URL}icons/mathworks.svg` },
                    { name: 'Photoshop', icon: `${import.meta.env.BASE_URL}icons/adobephotoshop.svg` },
                    { name: 'Postman', icon: `${import.meta.env.BASE_URL}icons/postman.svg` },
                    { name: 'Markdown', icon: `${import.meta.env.BASE_URL}icons/markdown.svg` },
                    { name: 'GoLand', icon: `${import.meta.env.BASE_URL}icons/goland.svg` },
                    { name: 'Anaconda', icon: `${import.meta.env.BASE_URL}icons/anaconda.svg` },
                    { name: 'ngrok', icon: `${import.meta.env.BASE_URL}icons/ngrok.svg` },
                    { name: 'Termius', icon: `${import.meta.env.BASE_URL}icons/termius.svg` },
                  ],
                },
                {
                  category: '10 / Collaboration & Project Management',
                  tools: [
                    { name: 'Atlassian', icon: `${import.meta.env.BASE_URL}icons/atlassian.svg` },
                    { name: 'Jira', icon: `${import.meta.env.BASE_URL}icons/jira.svg` },
                    { name: 'Slack', icon: `${import.meta.env.BASE_URL}icons/slack.svg` },
                  ],
                },
              ].map((row, rIdx) => (
                <Reveal key={rIdx} delay={0.04}>
                <div className="glass-panel p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
                  <div className="text-xs font-mono text-indigo-400 mb-5 uppercase tracking-wider">{row.category}</div>
                  <div className="flex flex-wrap gap-4">
                    {row.tools.map((tool, tIdx) => (
                      <TechIcon
                        key={tIdx}
                        name={tool.name}
                        icon={tool.icon}
                        index={tIdx}
                        onHover={() => soundFx.playHover()}
                      />
                    ))}
                  </div>
                </div>
                </Reveal>
              ))}
            </div>

            <Reveal y={28} className="mt-10 glass-panel p-6 rounded-2xl border border-white/5">
              <div className="text-xs font-mono text-indigo-400 mb-4 uppercase tracking-wider">Focus Areas</div>
              <div className="flex flex-wrap gap-2">
                {['Cloud Engineering', 'DevOps & Platform Engineering', 'Infrastructure as Code', 'Automation', 'Distributed Systems', 'Backend Development', 'Generative AI', 'Agentic AI', 'MLOps', 'Cybersecurity', 'Web3'].map((area, i) => (
                  <span key={i} className="px-3 py-1 text-xs font-medium text-slate-300 bg-white/5 border border-white/10 rounded-full hover:border-indigo-500/40 hover:text-indigo-300 transition-colors">
                    {area}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* SECTION: TECHNICAL SKILLS MATRIX */}
        <section id="skills" className="py-20 border-b border-white/5">
          <div className="max-w-7xl mx-auto px-6">
            <Reveal y={22} className="max-w-3xl mb-12">
              <div className="text-xs font-medium text-indigo-400 uppercase tracking-wider mb-2">
                Technical Stack & Core Competencies
              </div>
              <SplitHeading text={"Comprehensive engineering capabilities."} className="text-3xl sm:text-4xl font-bold text-white tracking-tight" />
              <p className="text-slate-400 text-sm mt-2">
                A transparent breakdown of production competencies with concrete architectural specializations.
              </p>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {TECHNICAL_SKILLS.map((category, idx) => (
                <Reveal key={idx} delay={(idx % 2) * 0.1} className="h-full">
                <div className="glass-panel p-6 rounded-xl border border-white/5 space-y-4 h-full">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                    <span>{category.title}</span>
                  </h3>
                  <div className="space-y-3">
                    {category.skills.map((skill, sIdx) => (
                      <div key={sIdx} className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-medium text-slate-200">{skill.name}</span>
                          <span className="text-slate-400 text-[11px]">{skill.note}</span>
                        </div>
                        <SkillBar level={skill.level} delay={sIdx * 0.08} />
                      </div>
                    ))}
                  </div>
                </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION: MULTI-CHANNEL CONTACT & HIRING PROPOSALS */}
        <section id="contact" className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Left Column: Direct Outreach & Social Matrix */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <div className="text-xs font-medium text-indigo-400 uppercase tracking-wider mb-2">
                    Initiate Direct Connection
                  </div>
                  <SplitHeading text={"Let's build something remarkable."} className="text-3xl sm:text-4xl font-bold text-white tracking-tight" />
                  <p className="text-slate-300 text-sm mt-3 leading-relaxed">
                    Currently evaluating opportunities for Senior Full-Stack Engineer, AI Solutions Architect, and Cloud Infrastructure roles. Reach out on WhatsApp, Email, LinkedIn, GitHub, or Instagram.
                  </p>
                </div>

                {/* Direct Action Hub */}
                <div className="space-y-3 pt-2">
                  {/* Phone & Direct Dial */}
                  <div className="glass-panel p-4 rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                        <Phone className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs text-slate-400">Direct Contact</div>
                        <a href={`tel:${CANDIDATE_PROFILE.phone}`} className="text-sm font-semibold text-white hover:text-indigo-300">
                          {CANDIDATE_PROFILE.phone}
                        </a>
                      </div>
                    </div>
                    <button
                      onClick={handleCopyPhone}
                      className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-white/5 border border-white/10 rounded-lg transition-colors flex items-center gap-1.5"
                    >
                      {copiedPhone ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedPhone ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>

                  {/* WhatsApp Direct */}
                  <div className="glass-panel p-4 rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                        <MessageCircle className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs text-slate-400">WhatsApp Instant</div>
                        <div className="text-sm font-semibold text-white">+91 8329589548</div>
                      </div>
                    </div>
                    <a
                      href={CANDIDATE_PROFILE.whatsappUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 text-xs font-medium text-emerald-300 bg-emerald-950/60 border border-emerald-500/30 rounded-lg hover:bg-emerald-900 transition-colors flex items-center gap-1.5"
                    >
                      <span>Chat</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  {/* Direct Email */}
                  <div className="glass-panel p-4 rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                        <Mail className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs text-slate-400">Official Email</div>
                        <a href={`mailto:${CANDIDATE_PROFILE.email}`} className="text-sm font-semibold text-white hover:text-indigo-300 truncate max-w-[200px] block">
                          {CANDIDATE_PROFILE.email}
                        </a>
                      </div>
                    </div>
                    <button
                      onClick={handleCopyEmail}
                      className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-white/5 border border-white/10 rounded-lg transition-colors flex items-center gap-1.5"
                    >
                      {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedEmail ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>

                  {/* AWS Builder QR Code Showcase Card */}
                  <div className="glass-panel p-5 rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-500/5 via-black/40 to-indigo-950/20 relative overflow-hidden group">
                    <div className="flex items-start gap-4">
                      {/* High-contrast QR Container for phone cameras */}
                      <div
                        onClick={() => {
                          soundFx.playPop();
                          setAwsQrModalOpen(true);
                        }}
                        className="w-24 h-24 p-2 bg-white rounded-xl shadow-lg border-2 border-amber-400/60 shrink-0 cursor-pointer hover:scale-105 transition-transform group/qr relative flex items-center justify-center"
                        title="Click to view full-size QR code"
                      >
                        <img
                          src={CANDIDATE_PROFILE.awsBuilderQrCode}
                          alt="AWS Builder QR Code - Abhilash Sharma"
                          className="w-full h-full object-contain"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-black/10 rounded-xl opacity-0 group-hover/qr:opacity-100 flex items-center justify-center transition-opacity text-black font-mono text-[9px] font-bold">
                          TAP ZOOM
                        </div>
                      </div>

                      {/* Content & Actions */}
                      <div className="space-y-1.5 flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-300">
                            AWS Community Builder
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-white tracking-tight">
                          Connect on AWS Builder Network
                        </h4>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          Scan the QR code with your smartphone camera to connect directly with Abhilash's builder profile (<span className="text-amber-400 font-mono font-medium">@tachyons</span>).
                        </p>
                        <div className="flex flex-wrap items-center gap-2 pt-2">
                          <a
                            href={CANDIDATE_PROFILE.awsBuilderUrl}
                            target="_blank"
                            rel="noreferrer"
                            onMouseEnter={() => soundFx.playHover()}
                            onClick={() => soundFx.playPop()}
                            className="px-3 py-1.5 text-xs font-semibold bg-amber-500 hover:bg-amber-400 text-black rounded-lg transition-colors flex items-center gap-1.5 shadow-md shadow-amber-500/20"
                          >
                            <span>Open Profile</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                          <button
                            onClick={() => {
                              soundFx.playPop();
                              setAwsQrModalOpen(true);
                            }}
                            className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors flex items-center gap-1.5"
                          >
                            <QrCode className="w-3.5 h-3.5 text-amber-400" />
                            <span>Enlarge QR</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social Connect Matrix */}
                <div className="pt-2">
                  <div className="text-xs font-medium uppercase tracking-wider text-slate-400 mb-3">Professional Profiles & Socials</div>
                  <div className="grid grid-cols-2 gap-3">
                    <a
                      href={CANDIDATE_PROFILE.awsBuilderUrl}
                      target="_blank"
                      rel="noreferrer"
                      onMouseEnter={() => soundFx.playHover()}
                      className="p-3 glass-panel rounded-xl flex items-center gap-2.5 text-slate-300 hover:text-white hover:border-amber-400/50 transition-colors bg-amber-500/[0.04]"
                    >
                      <QrCode className="w-4 h-4 text-amber-400" />
                      <div>
                        <div className="text-xs font-bold text-white">AWS Builder</div>
                        <div className="text-[11px] text-amber-300">@tachyons</div>
                      </div>
                    </a>

                    <a
                      href={CANDIDATE_PROFILE.github}
                      target="_blank"
                      rel="noreferrer"
                      onMouseEnter={() => soundFx.playHover()}
                      className="p-3 glass-panel rounded-xl flex items-center gap-2.5 text-slate-300 hover:text-white hover:border-indigo-500/40 transition-colors"
                    >
                      <Github className="w-4 h-4 text-white" />
                      <div>
                        <div className="text-xs font-bold text-white">GitHub</div>
                        <div className="text-[11px] text-slate-400">@ABHILASH9519</div>
                      </div>
                    </a>

                    <a
                      href={CANDIDATE_PROFILE.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      onMouseEnter={() => soundFx.playHover()}
                      className="p-3 glass-panel rounded-xl flex items-center gap-2.5 text-slate-300 hover:text-white hover:border-indigo-500/40 transition-colors"
                    >
                      <Linkedin className="w-4 h-4 text-sky-400" />
                      <div>
                        <div className="text-xs font-bold text-white">LinkedIn</div>
                        <div className="text-[11px] text-slate-400">Abhilash Sharma</div>
                      </div>
                    </a>

                    <a
                      href="https://dev.to/abhilash_sharma_ed042f65e"
                      target="_blank"
                      rel="noreferrer"
                      onMouseEnter={() => soundFx.playHover()}
                      className="p-3 glass-panel rounded-xl flex items-center gap-2.5 text-slate-300 hover:text-white hover:border-indigo-500/40 transition-colors"
                    >
                      <span className="w-4 h-4 rounded-sm bg-white text-black text-[8px] font-black flex items-center justify-center">DEV</span>
                      <div>
                        <div className="text-xs font-bold text-white">DEV.to</div>
                        <div className="text-[11px] text-slate-400">Articles</div>
                      </div>
                    </a>

                    <a
                      href={CANDIDATE_PROFILE.instagram}
                      target="_blank"
                      rel="noreferrer"
                      onMouseEnter={() => soundFx.playHover()}
                      className="p-3 glass-panel rounded-xl flex items-center gap-2.5 text-slate-300 hover:text-white hover:border-indigo-500/40 transition-colors"
                    >
                      <Instagram className="w-4 h-4 text-pink-400" />
                      <div>
                        <div className="text-xs font-bold text-white">Instagram</div>
                        <div className="text-[11px] text-slate-400">@_.tachyons._</div>
                      </div>
                    </a>

                    <a
                      href={CANDIDATE_PROFILE.driveCertificatesUrl}
                      target="_blank"
                      rel="noreferrer"
                      onMouseEnter={() => soundFx.playHover()}
                      className="col-span-2 p-3 glass-panel rounded-xl flex items-center justify-between gap-2.5 text-slate-300 hover:text-white hover:border-amber-500/40 transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <FolderOpen className="w-4 h-4 text-amber-400" />
                        <div>
                          <div className="text-xs font-bold text-white">Drive Folder (45+ Badges)</div>
                          <div className="text-[11px] text-slate-400">Verified Google Cloud & Azure Certificates</div>
                        </div>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                    </a>
                  </div>
                </div>

                <div className="pt-2 text-xs text-slate-400 space-y-1">
                  <div>Typical Response Time: <span className="text-slate-200">Within 12 Hours</span></div>
                  <div>Location: <span className="text-slate-200">{CANDIDATE_PROFILE.location}</span></div>
                </div>
              </div>

              {/* Right Column: Direct Messaging Form */}
              <Reveal x={36} y={0} className="lg:col-span-7 glass-panel p-8 rounded-2xl border border-white/10">
                {contactSubmitted ? (
                  <div className="py-12 text-center space-y-3">
                    <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                      <Check className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-white">Message Dispatched</h3>
                    <p className="text-sm text-slate-300 max-w-md mx-auto">
                      Thank you for reaching out, {contactName || 'Colleague'}. Your message has been routed to Abhilash's inbox.
                    </p>
                    <button
                      onClick={() => {
                        setContactSubmitted(false);
                        setContactName('');
                        setContactEmail('');
                        setContactMessage('');
                      }}
                      className="mt-4 px-4 py-2 text-xs font-semibold text-indigo-400 hover:underline"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      soundFx.playSuccess();
                      setContactSubmitted(true);
                      triggerCelebration();
                    }}
                    className="space-y-4"
                  >
                    <h3 className="text-lg font-bold text-white mb-2">Send Direct Proposal or Note</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-slate-300 mb-1.5">Your Name</label>
                        <input
                          type="text"
                          required
                          value={contactName}
                          onChange={(e) => setContactName(e.target.value)}
                          placeholder="e.g. Sarah Jenkins"
                          className="w-full px-3 py-2 text-xs bg-white/[0.04] border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-300 mb-1.5">Your Email</label>
                        <input
                          type="email"
                          required
                          value={contactEmail}
                          onChange={(e) => setContactEmail(e.target.value)}
                          placeholder="sarah@company.com"
                          className="w-full px-3 py-2 text-xs bg-white/[0.04] border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">Message / Role Scope</label>
                      <textarea
                        rows={4}
                        required
                        value={contactMessage}
                        onChange={(e) => setContactMessage(e.target.value)}
                        placeholder="Tell me about your product requirements, open engineering positions, or architecture consultation..."
                        className="w-full p-3 text-xs bg-white/[0.04] border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-lg transition-all shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2 active:scale-95"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Dispatch Message</span>
                    </button>
                  </form>
                )}
              </Reveal>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-white/5 py-12 bg-[#06080c] text-slate-400 text-xs">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-white">Abhilash Sharma</span>
            <span className="text-slate-600">·</span>
            <span>AI Architect & Full-Stack Cloud Engineer</span>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <button onClick={scrollToTop} className="hover:text-white transition-colors">Back to Top</button>
            <a href="#academics" className="hover:text-white transition-colors">Academics</a>
            <a href="#projects" className="hover:text-white transition-colors">Case Studies</a>
            <a href={CANDIDATE_PROFILE.driveCertificatesUrl} target="_blank" rel="noreferrer" className="hover:text-white transition-colors text-amber-300">Drive Certificates</a>
            <button onClick={() => setResumeModalOpen(true)} className="hover:text-white transition-colors">Curriculum Vitae</button>
          </div>

          <div className="text-slate-500">
            © {new Date().getFullYear()} Abhilash Sharma · {CANDIDATE_PROFILE.phone}
          </div>
        </div>
      </footer>

      {/* MODAL: PROJECT DEEP DIVE */}
      <AnimatePresence>
      {selectedProject && (
        <motion.div
          key="project-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28 }}
          onClick={() => setSelectedProject(null)}
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 28 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ type: 'spring', stiffness: 320, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            data-lenis-prevent
            className="glass-panel max-w-3xl w-full max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 p-6 md:p-8 space-y-6"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-xs font-mono text-indigo-400">{selectedProject.category} · {selectedProject.period}</div>
                <h3 className="text-2xl font-bold text-white mt-1">{selectedProject.title}</h3>
                <div className="text-sm text-slate-400">{selectedProject.role}</div>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="rounded-xl overflow-hidden aspect-video bg-slate-900 border border-white/10">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-300">Executive Summary</h4>
              <p className="text-sm text-slate-300 leading-relaxed">{selectedProject.summary}</p>

              {selectedProject.systemBreakdown && (
                <div className="space-y-4 pt-2">
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                    <div className="text-xs font-bold text-indigo-400 uppercase">Core Architectural Challenge</div>
                    <div className="text-xs text-slate-300">{selectedProject.systemBreakdown.keyChallenges}</div>
                  </div>

                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                    <div className="text-xs font-bold text-emerald-400 uppercase">Implemented Solution</div>
                    <div className="text-xs text-slate-300">{selectedProject.systemBreakdown.solutionArchitecture}</div>
                  </div>

                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                    <div className="text-xs font-bold text-blue-400 uppercase">Quantified Production Impact</div>
                    <div className="text-xs text-slate-300">{selectedProject.systemBreakdown.impact}</div>
                  </div>
                </div>
              )}

              {selectedProject.architectureDiagram && (
                <div className="p-4 rounded-xl bg-black/40 border border-white/5 font-mono text-xs text-indigo-300">
                  <div className="text-slate-500 mb-1 text-[11px] uppercase">Dataflow & Infrastructure Diagram</div>
                  <div>{selectedProject.architectureDiagram}</div>
                </div>
              )}

              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-300 mb-2">Key Engineering Highlights</h4>
                <ul className="space-y-2">
                  {selectedProject.highlights.map((h, idx) => (
                    <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                      <span className="text-indigo-400 mt-0.5">▹</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-300 mb-2">Tech Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.techStack.map((tech, idx) => (
                    <span key={idx} className="px-2.5 py-1 text-xs bg-white/5 border border-white/10 rounded-md text-slate-200">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex justify-end gap-3">
              <a
                href={selectedProject.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 text-xs font-semibold text-white bg-white/10 hover:bg-white/15 border border-white/10 rounded-lg transition-colors"
              >
                View on GitHub
              </a>
              {selectedProject.liveUrl && (
                <a
                  href={selectedProject.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors"
                >
                  Live demo
                </a>
              )}
              <button
                onClick={() => setSelectedProject(null)}
                className="px-4 py-2 text-xs font-medium text-slate-300 hover:text-white"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
      </AnimatePresence>

      {/* MODAL: CERTIFICATION DETAILS */}
      <AnimatePresence>
      {selectedCert && (
        <motion.div
          key="cert-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28 }}
          onClick={() => setSelectedCert(null)}
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 28 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ type: 'spring', stiffness: 320, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            data-lenis-prevent
            className="glass-panel max-w-lg w-full rounded-2xl border border-white/10 p-6 md:p-8 space-y-6"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-indigo-400">{selectedCert.issuer} Credential</div>
                <h3 className="text-xl font-bold text-white mt-1">{selectedCert.title}</h3>
                <div className="text-xs text-slate-400 mt-1">{selectedCert.level} · {selectedCert.date}</div>
              </div>
              <button
                onClick={() => setSelectedCert(null)}
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
              <div className="text-xs text-slate-400">Credential ID:</div>
              <div className="font-mono text-sm font-bold text-white">{selectedCert.credentialId}</div>
              <div className="text-xs text-emerald-400 flex items-center gap-1.5 pt-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>Verified in Candidate Credential Repository</span>
              </div>
            </div>

            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">Evaluated Competencies</div>
              <div className="flex flex-wrap gap-2">
                {selectedCert.skillsGained.map((s, idx) => (
                  <span key={idx} className="px-2.5 py-1 text-xs bg-indigo-950/40 border border-indigo-500/20 text-indigo-200 rounded-md">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex justify-between items-center">
              <a
                href={CANDIDATE_PROFILE.driveCertificatesUrl}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-indigo-400 hover:underline flex items-center gap-1 font-semibold"
              >
                <span>Open Google Drive Folder</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={() => setSelectedCert(null)}
                className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 transition-colors"
              >
                Close View
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
      </AnimatePresence>

      {/* MODAL: RESUME INSPECTOR */}
      <AnimatePresence>
      {resumeModalOpen && (
        <motion.div
          key="resume-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28 }}
          onClick={() => setResumeModalOpen(false)}
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 28 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ type: 'spring', stiffness: 320, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            data-lenis-prevent
            className="glass-panel max-w-4xl w-full max-h-[92vh] overflow-y-auto rounded-2xl border border-white/10 p-6 md:p-8 space-y-6"
          >
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-white/10">
              <div>
                <h3 className="text-2xl font-bold text-white">Abhilash Sharma — Curriculum Vitae</h3>
                <div className="text-xs text-slate-400 mt-1">
                  Full-Stack Cloud Engineer & AI Solutions Architect · {CANDIDATE_PROFILE.email} · {CANDIDATE_PROFILE.phone}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Print / Save PDF</span>
                </button>
                <button
                  onClick={() => setResumeModalOpen(false)}
                  className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Resume Document Structure */}
            <div className="space-y-6 text-sm text-slate-300">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-2">Professional Summary</h4>
                <p className="leading-relaxed text-slate-300">{CANDIDATE_PROFILE.bio}</p>
              </div>

              {/* Academics in CV */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-2">Academic Standing</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {EDUCATION_DATA.map((e, idx) => (
                    <div key={idx} className="p-3 bg-white/[0.02] border border-white/5 rounded-lg flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-white">{e.degree}</div>
                        <div className="text-[11px] text-slate-400">{e.institution}</div>
                      </div>
                      <div className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/20">
                        {e.score}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-3">Core Credentials & Badges (45+)</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {CERTIFICATIONS.slice(0, 6).map((c, idx) => (
                    <div key={idx} className="p-3 bg-white/[0.02] border border-white/5 rounded-lg">
                      <div className="text-xs font-bold text-white">{c.title}</div>
                      <div className="text-[11px] text-slate-400">{c.issuer} · {c.date}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-2 text-right">
                  <a
                    href={CANDIDATE_PROFILE.driveCertificatesUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-indigo-400 hover:underline"
                  >
                    View all 45+ certificates in Google Drive folder →
                  </a>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-2">Technical Proficiencies</h4>
                <div className="text-xs text-slate-300 space-y-1">
                  <div><strong className="text-white">Cloud & Containers:</strong> Google Cloud Platform (GKE, Vertex AI), Microsoft Azure (AKS, Azure OpenAI), Docker, Kubernetes, Terraform</div>
                  <div><strong className="text-white">AI & ML:</strong> Gemini 2.5 SDK, LangChain, Azure AI Search, Hybrid Vector RAG, Prompt Engineering, Azure Document Intelligence</div>
                  <div><strong className="text-white">Languages & Frameworks:</strong> TypeScript, JavaScript (ESNext), React 19, Motion, Node.js, Express, Tailwind CSS, Python, SQL</div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex justify-between items-center text-xs">
              <span className="text-slate-400">Verifiable candidate dossier for recruitment teams</span>
              <button
                onClick={() => setResumeModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white"
              >
                Close Inspector
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
      </AnimatePresence>

      {/* MODAL: AWS BUILDER QR CODE FULLSCREEN SCANNER */}
      <AnimatePresence>
      {awsQrModalOpen && (
        <motion.div
          key="aws-qr-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28 }}
          onClick={() => setAwsQrModalOpen(false)}
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 28 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ type: 'spring', stiffness: 320, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            data-lenis-prevent
            className="glass-panel max-w-md w-full rounded-2xl border border-amber-500/30 p-6 sm:p-8 space-y-6 text-center relative overflow-hidden"
          >
            {/* Ambient top glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-20 bg-amber-500/20 blur-2xl pointer-events-none" />

            <div className="flex items-start justify-between">
              <div className="text-left">
                <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  <span>AWS Community Builder</span>
                </div>
                <h3 className="text-xl font-bold text-white mt-1">Connect with Abhilash</h3>
                <p className="text-xs text-slate-400">Handle: <span className="text-amber-300 font-mono">@tachyons</span></p>
              </div>
              <button
                onClick={() => setAwsQrModalOpen(false)}
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors shrink-0"
              >
                ✕
              </button>
            </div>

            {/* High-Contrast QR Code Card */}
            <div className="mx-auto w-64 h-64 p-4 bg-white rounded-2xl shadow-2xl border-4 border-amber-400/80 flex items-center justify-center relative group">
              <img
                src={CANDIDATE_PROFILE.awsBuilderQrCode}
                alt="AWS Community Builder Profile QR Code - Abhilash Sharma"
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Instructions */}
            <div className="text-xs text-slate-300 space-y-1">
              <p className="font-medium text-white">
                Scan using any smartphone camera or QR code scanner
              </p>
              <p className="text-[11px] text-slate-400">
                Instantly opens Abhilash Sharma's verified AWS Community Builder page
              </p>
            </div>

            {/* Actions */}
            <div className="pt-2 flex flex-col gap-2.5">
              <a
                href={CANDIDATE_PROFILE.awsBuilderUrl}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => soundFx.playHover()}
                onClick={() => soundFx.playSuccess()}
                className="w-full py-3 px-4 bg-amber-500 hover:bg-amber-400 text-black font-semibold text-xs rounded-xl transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 active:scale-95"
              >
                <span>Open AWS Builder Profile</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <a
                href={CANDIDATE_PROFILE.awsBuilderQrCode}
                download="abhilash-sharma-aws-builder-qr.png"
                className="w-full py-2.5 px-4 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white font-medium text-xs rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Save QR Code to Device</span>
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
      </AnimatePresence>
    </div>
  );
}
