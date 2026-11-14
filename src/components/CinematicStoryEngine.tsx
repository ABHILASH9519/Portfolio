import React, { useRef } from 'react';
import { motion, MotionValue, useScroll, useTransform, useSpring } from 'motion/react';
import { soundFx } from '../utils/audio';
import { Orbit, Play, ArrowDown, ChevronDown } from 'lucide-react';
import { Magnetic } from './Magnetic';
import { preloaderWillShow } from './Preloader';
import planetaryHeroImage from '../assets/images/edolus_planetary_hero_1791967604420.jpg';
import cloudAiPlatformImage from '../assets/images/hero_cloud_ai_platform_1791967729104.jpg';
import computeCoreImage from '../assets/images/edolus_compute_core_1791967674635.jpg';
import carCockpitImage from '../assets/images/edolus_car_cockpit_1791967703166.jpg';

interface CinematicStoryEngineProps {
  onInitiateSystem: () => void;
}

// Hero intro waits for the preloader curtain only when it is actually going to play
const INTRO_DELAY = preloaderWillShow() ? 1.9 : 0.15;

const CHAPTERS = [
  { label: 'Scale', range: [0, 0.28] },
  { label: 'Mesh', range: [0.26, 0.54] },
  { label: 'Compute', range: [0.52, 0.78] },
  { label: 'Execute', range: [0.75, 1] }
] as const;

/** Rail dot that brightens and grows while its chapter is on screen. */
const RailDot: React.FC<{ progress: MotionValue<number>; range: readonly [number, number]; label: string }> = ({
  progress,
  range,
  label
}) => {
  const [start, end] = range;
  const mid = (start + end) / 2;
  const scale = useTransform(progress, [start, mid, end], [1, 1.9, 1]);
  const opacity = useTransform(progress, [start - 0.04, mid, end + 0.04], [0.3, 1, 0.3]);

  return (
    <div className="flex items-center justify-end gap-3">
      <motion.span style={{ opacity }} className="text-[10px] font-mono uppercase tracking-[0.25em] text-slate-300">
        {label}
      </motion.span>
      <motion.span style={{ scale, opacity }} className="w-1.5 h-1.5 rounded-full bg-amber-400" />
    </div>
  );
};

export const CinematicStoryEngine: React.FC<CinematicStoryEngineProps> = ({
  onInitiateSystem
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.0001
  });

  // Chapter 1: Planetary Scale (0% - 28%)
  const ch1Scale = useTransform(smoothProgress, [0, 0.28], [1, 1.25]);
  const ch1Opacity = useTransform(smoothProgress, [0, 0.22, 0.3], [1, 1, 0]);
  const ch1TextY = useTransform(smoothProgress, [0, 0.24], [0, -40]);

  // Chapter 2: Orbital Edge Mesh (26% - 54%)
  const ch2Scale = useTransform(smoothProgress, [0.26, 0.52], [0.96, 1.15]);
  const ch2Opacity = useTransform(smoothProgress, [0.26, 0.33, 0.48, 0.55], [0, 1, 1, 0]);
  const ch2TextY = useTransform(smoothProgress, [0.26, 0.4, 0.55], [70, 0, -70]);
  const ch2PanelX = useTransform(smoothProgress, [0.26, 0.4, 0.55], [90, 0, -90]);

  // Chapter 3: Massive Compute Fabric (52% - 78%)
  const ch3Scale = useTransform(smoothProgress, [0.52, 0.76], [1.08, 1]);
  const ch3Opacity = useTransform(smoothProgress, [0.52, 0.58, 0.72, 0.78], [0, 1, 1, 0]);
  const ch3TextY = useTransform(smoothProgress, [0.52, 0.65, 0.78], [70, 0, -70]);
  const ch3PanelX = useTransform(smoothProgress, [0.52, 0.65, 0.78], [90, 0, -90]);

  // Chapter 4: Real-World Execution (75% - 100%)
  const ch4Scale = useTransform(smoothProgress, [0.75, 1.0], [0.97, 1.05]);
  const ch4Opacity = useTransform(smoothProgress, [0.75, 0.82, 1], [0, 1, 1]);
  const ch4TextY = useTransform(smoothProgress, [0.75, 0.88, 1], [70, 0, 0]);
  const ch4PanelX = useTransform(smoothProgress, [0.75, 0.88, 1], [90, 0, 0]);

  // A hidden chapter must not catch clicks meant for the one on screen
  const ch1Events = useTransform(ch1Opacity, (o) => (o > 0.4 ? 'auto' : 'none'));
  const ch2Events = useTransform(ch2Opacity, (o) => (o > 0.4 ? 'auto' : 'none'));
  const ch3Events = useTransform(ch3Opacity, (o) => (o > 0.4 ? 'auto' : 'none'));
  const ch4Events = useTransform(ch4Opacity, (o) => (o > 0.4 ? 'auto' : 'none'));

  // Rail line fill
  const railFill = useTransform(smoothProgress, [0, 1], [0, 1]);

  return (
    <div ref={containerRef} className="relative h-[340vh] bg-black text-white">
      {/* Sticky Fullscreen Stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center select-none">
        {/* Deep vignette scrim overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,#000000e6_100%)] z-20 pointer-events-none" />

        {/* Chapter rail */}
        <div className="hidden md:flex absolute right-6 lg:right-10 top-1/2 -translate-y-1/2 z-30 flex-col items-end gap-5 pointer-events-none">
          <div className="absolute right-[2.5px] top-0 bottom-0 w-px bg-white/10 -z-10">
            <motion.div style={{ scaleY: railFill }} className="h-full w-full origin-top bg-amber-400/70" />
          </div>
          {CHAPTERS.map((chapter) => (
            <RailDot
              key={chapter.label}
              progress={smoothProgress}
              range={chapter.range}
              label={chapter.label}
            />
          ))}
        </div>

        {/* ================= STAGE 1: PLANETARY SCALE ================= */}
        <motion.div
          style={{ opacity: ch1Opacity, pointerEvents: ch1Events }}
          className="absolute inset-0 flex flex-col items-center justify-between py-12 px-6 z-10"
        >
          <motion.div
            style={{ scale: ch1Scale }}
            className="absolute inset-0 -z-10 overflow-hidden will-change-transform"
          >
            <img
              src={planetaryHeroImage}
              alt="Planetary Scale - Intelligence from Edge of Atmosphere"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/40" />
          </motion.div>

          {/* Top Title Kicker */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: INTRO_DELAY, ease: [0.16, 1, 0.3, 1] }}
            className="text-xs font-mono tracking-[0.35em] text-slate-400 uppercase pt-4 flex items-center gap-3"
          >
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span>ABHILASH SHARMA · SYSTEMS RUNTIME</span>
          </motion.div>

          {/* Center Brand Statement */}
          <motion.div style={{ y: ch1TextY }} className="text-center max-w-4xl space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: INTRO_DELAY + 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 text-xs font-mono text-amber-400/90 tracking-widest uppercase border border-amber-400/30 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md"
            >
              <Orbit className="w-3.5 h-3.5 animate-[spin_12s_linear_infinite]" />
              <span>Awwwards SOTD Experience · Edolus Architecture</span>
            </motion.div>

            <h2
              aria-label="INTELLIGENCE AT PLANETARY SCALE"
              className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight uppercase leading-[1.04] text-white"
            >
              {'INTELLIGENCE AT PLANETARY SCALE'.split(' ').map((word, index) => (
                <span
                  key={`${word}-${index}`}
                  aria-hidden="true"
                  className="inline-block overflow-hidden align-bottom pb-[0.12em] -mb-[0.12em] mr-[0.25em] last:mr-0"
                >
                  <motion.span
                    className="inline-block will-change-transform"
                    initial={{ y: '115%', rotate: 4 }}
                    animate={{ y: '0%', rotate: 0 }}
                    transition={{ duration: 1, delay: INTRO_DELAY + 0.15 + index * 0.09, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: INTRO_DELAY + 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-xs sm:text-sm font-mono tracking-widest text-slate-300 max-w-2xl mx-auto uppercase"
            >
              Orchestrating the foundations of artificial intelligence from edge cloud nodes to distributed Kubernetes fabrics.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: INTRO_DELAY + 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Magnetic>
                <button
                  onClick={() => {
                    soundFx.playSuccess();
                    onInitiateSystem();
                  }}
                  className="px-6 py-3.5 bg-white text-black font-mono text-xs font-bold tracking-widest uppercase rounded hover:bg-slate-200 transition-colors flex items-center gap-2.5 shadow-2xl active:scale-95"
                >
                  <Play className="w-3.5 h-3.5 fill-black" />
                  <span>INITIATE SYSTEM</span>
                </button>
              </Magnetic>

              <div className="text-[11px] font-mono text-slate-400 flex items-center gap-2">
                <span>SCROLL DOWN TO TRAVERSE DIMENSIONS</span>
                <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
              </div>
            </motion.div>
          </motion.div>

          {/* Bottom Footnote */}
          <div className="text-[10px] font-mono text-slate-400 tracking-widest uppercase pb-2">
            EXPERIENCE WITH AUDIO ENABLED · 60/120 FPS ENGINE
          </div>
        </motion.div>

        {/* ================= STAGE 2: ORBITAL EDGE MESH ================= */}
        <motion.div
          style={{ opacity: ch2Opacity, pointerEvents: ch2Events }}
          className="absolute inset-0 flex items-center justify-between p-8 md:p-16 z-10"
        >
          <motion.div
            style={{ scale: ch2Scale }}
            className="absolute inset-0 -z-10 overflow-hidden will-change-transform"
          >
            <img
              src={cloudAiPlatformImage}
              alt="Orbital Edge AI Nodes"
              className="w-full h-full object-cover filter brightness-90"
            />
            <div className="absolute inset-0 bg-black/55" />
          </motion.div>

          <motion.div style={{ y: ch2TextY }} className="max-w-md space-y-4">
            <div className="text-xs font-mono text-sky-400 uppercase tracking-widest">
              [ 01 // ORBITAL INTELLIGENCE ]
            </div>
            <h3 className="text-3xl sm:text-5xl font-black uppercase text-white tracking-tight">
              EDGE MESH PROTOCOLS
            </h3>
            <p className="text-xs font-mono text-slate-300 leading-relaxed uppercase">
              Autonomous spatial systems continuously coordinate, synchronize, and relay multimodal inference tokens across multi-region networks in real time.
            </p>
            <div className="font-mono text-xs text-amber-300 pt-2 space-y-1">
              <div>LATENCY: 14ms · SYNCHRONIZED</div>
              <div>GKE & AKS INGRESS: BALANCED</div>
            </div>
          </motion.div>

          <motion.div
            style={{ x: ch2PanelX }}
            className="hidden lg:block bg-black/80 backdrop-blur-md border border-white/10 p-6 rounded-xl font-mono text-xs max-w-sm space-y-3 shadow-2xl"
          >
            <div className="flex items-center justify-between text-slate-400 border-b border-white/10 pb-2">
              <span className="text-white font-bold">PRIMARY_NODE_01</span>
              <span className="text-emerald-400 animate-pulse">● LIVE</span>
            </div>
            <p className="text-[11px] text-slate-300">
              Regional hubs aggregate inference requests, distribute workloads, and maintain resilient connectivity between edge devices and large-scale compute clusters.
            </p>
            <div className="grid grid-cols-2 gap-2 pt-2 text-[10px] text-slate-400">
              <div>THROUGHPUT: 42k t/s</div>
              <div>MODEL: GEMINI 2.5 FLASH</div>
            </div>
          </motion.div>
        </motion.div>

        {/* ================= STAGE 3: MASSIVE COMPUTE FABRIC ================= */}
        <motion.div
          style={{ opacity: ch3Opacity, pointerEvents: ch3Events }}
          className="absolute inset-0 flex items-center justify-between p-8 md:p-16 z-10"
        >
          <motion.div
            style={{ scale: ch3Scale }}
            className="absolute inset-0 -z-10 overflow-hidden will-change-transform"
          >
            <img
              src={computeCoreImage}
              alt="Compute Core NVX Datacenter"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50" />
          </motion.div>

          <motion.div style={{ y: ch3TextY }} className="max-w-md space-y-4">
            <div className="text-xs font-mono text-amber-400 uppercase tracking-widest">
              [ 02 // COMPUTE_CORE ]
            </div>
            <h3 className="text-3xl sm:text-5xl font-black uppercase text-white tracking-tight">
              MASSIVE COMPUTE FABRIC
            </h3>
            <p className="text-xs font-mono text-slate-300 leading-relaxed uppercase">
              Massive computational infrastructure transforming raw GPU tensor processing power into scalable distributed intelligence.
            </p>
            <div className="p-4 bg-black/80 border border-amber-400/30 rounded-lg font-mono text-xs text-amber-200">
              <div className="font-bold text-white mb-1">NVX-72 COMPUTE ARRAY</div>
              <div>MULTI-NODE PARALLELISM: DYNAMIC</div>
              <div>THERMAL EFFICIENCY: OPTIMIZED</div>
            </div>
          </motion.div>

          <motion.div
            style={{ x: ch3PanelX }}
            className="hidden lg:block bg-black/80 backdrop-blur-md border border-white/10 p-6 rounded-xl font-mono text-xs max-w-sm space-y-3 shadow-2xl"
          >
            <div className="text-indigo-400 font-bold uppercase">REASONING & KNOWLEDGE TOPOLOGY</div>
            <p className="text-[11px] text-slate-300">
              Adaptive decision architecture with predictive evaluation, contextual memory graphs, and self-organizing emergence.
            </p>
            <div className="border-t border-white/10 pt-2 text-[10px] text-slate-400">
              <div>CLUSTER HEALTH: 35/35 NODES</div>
              <div>SLO UPTIME: 99.98%</div>
            </div>
          </motion.div>
        </motion.div>

        {/* ================= STAGE 4: PHYSICAL EXECUTION ================= */}
        <motion.div
          style={{ opacity: ch4Opacity, pointerEvents: ch4Events }}
          className="absolute inset-0 flex items-center justify-between p-8 md:p-16 z-10"
        >
          <motion.div
            style={{ scale: ch4Scale }}
            className="absolute inset-0 -z-10 overflow-hidden will-change-transform"
          >
            <img
              src={carCockpitImage}
              alt="Autonomous Deployment Cockpit"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/60" />
          </motion.div>

          <motion.div style={{ y: ch4TextY }} className="max-w-lg space-y-4">
            <div className="text-xs font-mono text-emerald-400 uppercase tracking-widest">
              [ 03 // PHYSICAL REAL-WORLD EXECUTION ]
            </div>
            <h3 className="text-3xl sm:text-5xl font-black uppercase text-white tracking-tight">
              FROM DIGITAL TWIN TO EXECUTION
            </h3>
            <p className="text-xs font-mono text-slate-300 leading-relaxed uppercase">
              AI systems bridge perception, prediction, and autonomous action across mobility, cloud operations, and mission-critical workflows.
            </p>
            <Magnetic>
              <button
                onClick={() => {
                  soundFx.playSuccess();
                  onInitiateSystem();
                }}
                className="px-6 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs font-bold tracking-widest uppercase rounded transition-colors shadow-xl active:scale-95 flex items-center gap-2"
              >
                <span>EXPLORE CANDIDATE DOSSIER</span>
                <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
              </button>
            </Magnetic>
          </motion.div>

          <motion.div
            style={{ x: ch4PanelX }}
            className="hidden lg:block bg-black/90 border border-emerald-500/30 p-6 rounded-xl font-mono text-xs max-w-sm space-y-2 shadow-2xl"
          >
            <div className="text-emerald-400 font-bold">ABHILASH SHARMA</div>
            <div className="text-slate-300">Ready to build your next generation software system.</div>
            <div className="text-[11px] text-slate-400 pt-2 border-t border-white/10">
              Grade 12: 93% · Grade 10: 97% · 45+ Badges
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
