import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

interface KineticMarqueeProps {
  items: string[];
  direction?: 'left' | 'right';
}

export const KineticMarquee: React.FC<KineticMarqueeProps> = ({ items, direction = 'left' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  const xTranslation = useTransform(
    scrollYProgress,
    [0, 1],
    direction === 'left' ? ['0%', '-30%'] : ['-30%', '0%']
  );

  return (
    <div
      ref={containerRef}
      className="overflow-hidden py-4 border-y border-white/5 bg-white/[0.01] select-none pointer-events-none relative"
    >
      {/* Edge gradient mask */}
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#090b10] to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#090b10] to-transparent z-10" />

      <motion.div
        style={{ x: xTranslation }}
        className="flex whitespace-nowrap gap-8 text-xs font-mono tracking-widest text-slate-500 uppercase font-medium"
      >
        {Array.from({ length: 4 }).map((_, repeatIdx) => (
          <React.Fragment key={repeatIdx}>
            {items.map((item, idx) => (
              <span key={`${repeatIdx}-${idx}`} className="flex items-center gap-6">
                <span>{item}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500/40 inline-block" />
              </span>
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
};
