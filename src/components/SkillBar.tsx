import React from 'react';
import { motion } from 'motion/react';

interface SkillBarProps {
  level: number;
  delay?: number;
}

/** Fill slides in from the left on scroll, using a transform so it stays on the compositor. */
export const SkillBar: React.FC<SkillBarProps> = ({ level, delay = 0 }) => (
  <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
    <div className="h-full rounded-full overflow-hidden" style={{ width: `${level}%` }}>
      <motion.div
        className="h-full w-full rounded-full bg-gradient-to-r from-indigo-500 to-sky-400"
        initial={{ x: '-100%' }}
        whileInView={{ x: '0%' }}
        viewport={{ once: true, margin: '0px 0px -8% 0px' }}
        transition={{ duration: 1.4, delay, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  </div>
);
