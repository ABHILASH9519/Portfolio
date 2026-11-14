import React, { useRef } from 'react';
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity
} from 'motion/react';
import { wrap } from 'motion';

interface KineticMarqueeProps {
  items: string[];
  direction?: 'left' | 'right';
  /** Base speed in % of one copy per second. */
  speed?: number;
}

const COPIES = 4;

/**
 * Endless marquee that drifts on its own and accelerates with scroll velocity,
 * reversing when the visitor scrolls the other way.
 */
export const KineticMarquee: React.FC<KineticMarqueeProps> = ({ items, direction = 'left', speed = 2.2 }) => {
  const reduceMotion = useReducedMotion();
  const baseX = useMotionValue(0);
  const directionFactor = useRef(direction === 'left' ? -1 : 1);

  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 4], { clamp: false });

  // One copy is exactly 100/COPIES % of the track, so wrapping at that width is seamless
  const x = useTransform(baseX, (value) => `${wrap(-100 / COPIES, 0, value)}%`);

  useAnimationFrame((_, delta) => {
    if (reduceMotion) return;
    const baseDirection = direction === 'left' ? -1 : 1;
    const velocity = velocityFactor.get();
    // Scrolling up flips the marquee; scrolling down keeps its natural direction
    if (velocity < 0) directionFactor.current = -baseDirection;
    else if (velocity > 0) directionFactor.current = baseDirection;
    const step = directionFactor.current * speed * (delta / 1000) * (1 + Math.abs(velocity));
    baseX.set(baseX.get() + step);
  });

  return (
    <div
      aria-hidden="true"
      className="overflow-hidden py-4 border-y border-white/5 bg-white/[0.01] select-none pointer-events-none relative"
    >
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#090b10] to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#090b10] to-transparent z-10" />

      <motion.div
        style={{ x }}
        className="flex w-max whitespace-nowrap text-xs font-mono tracking-widest text-slate-500 uppercase font-medium will-change-transform"
      >
        {Array.from({ length: COPIES }).map((_, copyIndex) => (
          <div key={copyIndex} className="flex shrink-0">
            {items.map((item, index) => (
              <span key={`${copyIndex}-${index}`} className="flex items-center gap-6 pr-6">
                <span>{item}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500/40 inline-block" />
              </span>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
};
