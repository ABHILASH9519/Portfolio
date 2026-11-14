import React, { useEffect, useState } from 'react';
import { AnimatePresence, animate, motion, useMotionValue, useTransform } from 'motion/react';

const SEEN_KEY = 'portfolio-preloader-seen';

const hasSeenPreloader = () => {
  try {
    return sessionStorage.getItem(SEEN_KEY) === '1';
  } catch {
    return false;
  }
};

/** True when the intro curtain will play for this visit (first visit of the session, motion allowed). */
export const preloaderWillShow = () => {
  if (typeof window === 'undefined') return false;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  return !hasSeenPreloader();
};

/**
 * Short intro: a counter, then the curtain lifts to reveal the page.
 * Shown once per browser session and skipped for reduced-motion visitors.
 */
export const Preloader: React.FC = () => {
  const [visible, setVisible] = useState(preloaderWillShow);

  const progress = useMotionValue(0);
  const label = useTransform(progress, (value) => Math.round(value).toString().padStart(3, '0'));
  const barScale = useTransform(progress, [0, 100], [0, 1]);

  useEffect(() => {
    if (!visible) return;
    document.documentElement.style.overflow = 'hidden';

    const controls = animate(progress, 100, {
      duration: 1.5,
      ease: [0.65, 0, 0.35, 1],
      onComplete: () => {
        try {
          sessionStorage.setItem(SEEN_KEY, '1');
        } catch {
          // storage unavailable: preloader just shows again next visit
        }
        setVisible(false);
      }
    });

    return () => {
      controls.stop();
      document.documentElement.style.overflow = '';
    };
  }, [visible, progress]);

  return (
    <AnimatePresence onExitComplete={() => { document.documentElement.style.overflow = ''; }}>
      {visible && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[300] bg-[#05070b] flex flex-col items-center justify-center text-white"
          exit={{ y: '-100%' }}
          transition={{ duration: 0.95, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="text-[11px] font-mono tracking-[0.4em] text-slate-500 uppercase mb-6">
            Abhilash Sharma
          </div>
          <motion.div className="text-7xl sm:text-9xl font-extrabold tracking-tight font-mono tabular-nums">
            {label}
          </motion.div>
          <div className="mt-8 w-48 h-px bg-white/10 overflow-hidden">
            <motion.div style={{ scaleX: barScale }} className="h-full origin-left bg-gradient-to-r from-amber-400 via-indigo-500 to-sky-400" />
          </div>
          {/* Curved trailing edge for a softer wipe */}
          <div className="absolute -bottom-px left-0 right-0 h-16 translate-y-full bg-[#05070b] rounded-b-[50%]" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
