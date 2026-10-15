import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { soundFx } from '../utils/audio';
import { Orbit, Play, ArrowDown, ChevronDown } from 'lucide-react';
import planetaryHeroImage from '../assets/images/edolus_planetary_hero_1791967604420.jpg';
import cloudAiPlatformImage from '../assets/images/hero_cloud_ai_platform_1791967729104.jpg';
import computeCoreImage from '../assets/images/edolus_compute_core_1791967674635.jpg';
import carCockpitImage from '../assets/images/edolus_car_cockpit_1791967703166.jpg';

interface CinematicStoryEngineProps {
  onInitiateSystem: () => void;
}

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

  // Scale & Opacity transforms for each chapter
  // Chapter 1: Planetary Scale (0% - 28%)
  const ch1Scale = useTransform(smoothProgress, [0, 0.28], [1, 1.25]);
  const ch1Opacity = useTransform(smoothProgress, [0, 0.22, 0.3], [1, 1, 0]);
  const ch1TextY = useTransform(smoothProgress, [0, 0.24], [0, -40]);

  // Chapter 2: Orbital Edge Mesh (26% - 54%)
  const ch2Scale = useTransform(smoothProgress, [0.26, 0.52], [0.96, 1.15]);
  const ch2Opacity = useTransform(smoothProgress, [0.26, 0.33, 0.48, 0.55], [0, 1, 1, 0]);

  // Chapter 3: Massive Compute Fabric (52% - 78%)
  const ch3Scale = useTransform(smoothProgress, [0.52, 0.76], [1.08, 1]);
  const ch3Opacity = useTransform(smoothProgress, [0.52, 0.58, 0.72, 0.78], [0, 1, 1, 0]);

  // Chapter 4: Real-World Execution (75% - 100%)
  const ch4Scale = useTransform(smoothProgress, [0.75, 1.0], [0.97, 1.05]);
  const ch4Opacity = useTransform(smoothProgress, [0.75, 0.82, 1], [0, 1, 1]);

  return (
    <div ref={containerRef} className="relative h-[340vh] bg-black text-white">
      {/* Sticky Fullscreen Stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center select-none">
        {/* Deep vignette scrim overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,#000000e6_100%)] z-20 pointer-events-none" />

        {/* ================= STAGE 1: PLANETARY SCALE ================= */}
        <motion.div
          style={{ opacity: ch1Opacity }}
          className="absolute inset-0 flex flex-col items-center justify-between py-12 px-6 z-10 transition-opacity"
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
          <div className="text-xs font-mono tracking-[0.35em] text-slate-400 uppercase pt-4 flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span>ABHILASH SHARMA · SYSTEMS RUNTIME</span>
          </div>

          {/* Center Brand Statement */}
          <motion.div style={{ y: ch1TextY }} className="text-center max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-amber-400/90 tracking-widest uppercase border border-amber-400/30 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md">
              <Orbit className="w-3.5 h-3.5" />
              <span>Awwwards SOTD Experience · Edolus Architecture</span>
            </div>

            <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight uppercase leading-[1.04] text-white">
              INTELLIGENCE AT PLANETARY SCALE
            </h2>

            <p className="text-xs sm:text-sm font-mono tracking-widest text-slate-300 max-w-2xl mx-auto uppercase">
              Orchestrating the foundations of artificial intelligence from edge cloud nodes to distributed Kubernetes fabrics.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => {
                  soundFx.playSuccess();
                  onInitiateSystem();
                }}
                className="px-6 py-3.5 bg-white text-black font-mono text-xs font-bold tracking-widest uppercase rounded hover:bg-slate-200 transition-all flex items-center gap-2.5 shadow-2xl hover:scale-105 active:scale-95"
              >
                <Play className="w-3.5 h-3.5 fill-black" />
                <span>INITIATE SYSTEM</span>
              </button>

              <div className="text-[11px] font-mono text-slate-400 flex items-center gap-2">
                <span>SCROLL DOWN TO TRAVERSE DIMENSIONS</span>
                <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
              </div>
            </div>
          </motion.div>

          {/* Bottom Footnote */}
          <div className="text-[10px] font-mono text-slate-400 tracking-widest uppercase pb-2">
            EXPERIENCE WITH AUDIO ENABLED · 60/120 FPS ENGINE
          </div>
        </motion.div>

        {/* ================= STAGE 2: ORBITAL EDGE MESH ================= */}
        <motion.div
          style={{ opacity: ch2Opacity }}
          className="absolute inset-0 flex items-center justify-between p-8 md:p-16 z-10 pointer-events-none"
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

          <div className="max-w-md space-y-4 pointer-events-auto">
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
          </div>

          <div className="hidden lg:block bg-black/80 backdrop-blur-md border border-white/10 p-6 rounded-xl font-mono text-xs max-w-sm space-y-3 pointer-events-auto shadow-2xl">
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
          </div>
        </motion.div>

        {/* ================= STAGE 3: MASSIVE COMPUTE FABRIC ================= */}
        <motion.div
          style={{ opacity: ch3Opacity }}
          className="absolute inset-0 flex items-center justify-between p-8 md:p-16 z-10 pointer-events-none"
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

          <div className="max-w-md space-y-4 pointer-events-auto">
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
          </div>

          <div className="hidden lg:block bg-black/80 backdrop-blur-md border border-white/10 p-6 rounded-xl font-mono text-xs max-w-sm space-y-3 pointer-events-auto shadow-2xl">
            <div className="text-indigo-400 font-bold uppercase">REASONING & KNOWLEDGE TOPOLOGY</div>
            <p className="text-[11px] text-slate-300">
              Adaptive decision architecture with predictive evaluation, contextual memory graphs, and self-organizing emergence.
            </p>
            <div className="border-t border-white/10 pt-2 text-[10px] text-slate-400">
              <div>CLUSTER HEALTH: 35/35 NODES</div>
              <div>SLO UPTIME: 99.98%</div>
            </div>
          </div>
        </motion.div>

        {/* ================= STAGE 4: PHYSICAL EXECUTION ================= */}
        <motion.div
          style={{ opacity: ch4Opacity }}
          className="absolute inset-0 flex items-center justify-between p-8 md:p-16 z-10 pointer-events-none"
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

          <div className="max-w-lg space-y-4 pointer-events-auto">
            <div className="text-xs font-mono text-emerald-400 uppercase tracking-widest">
              [ 03 // PHYSICAL REAL-WORLD EXECUTION ]
            </div>
            <h3 className="text-3xl sm:text-5xl font-black uppercase text-white tracking-tight">
              FROM DIGITAL TWIN TO EXECUTION
            </h3>
            <p className="text-xs font-mono text-slate-300 leading-relaxed uppercase">
              AI systems bridge perception, prediction, and autonomous action across mobility, cloud operations, and mission-critical workflows.
            </p>
            <button
              onClick={() => {
                soundFx.playSuccess();
                onInitiateSystem();
              }}
              className="px-6 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs font-bold tracking-widest uppercase rounded transition-all shadow-xl hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              <span>EXPLORE CANDIDATE DOSSIER</span>
              <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
            </button>
          </div>

          <div className="hidden lg:block bg-black/90 border border-emerald-500/30 p-6 rounded-xl font-mono text-xs max-w-sm space-y-2 pointer-events-auto shadow-2xl">
            <div className="text-emerald-400 font-bold">ABHILASH SHARMA</div>
            <div className="text-slate-300">Ready to build your next generation software system.</div>
            <div className="text-[11px] text-slate-400 pt-2 border-t border-white/10">
              Grade 12: 93% · Grade 10: 97% · 45+ Badges
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
