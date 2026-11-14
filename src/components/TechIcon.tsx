import React, { useState } from 'react';
import { motion } from 'motion/react';

interface TechIconProps {
  name: string;
  icon: string;
  onHover?: () => void;
  /** Position in its row, used to stagger the entrance. */
  index?: number;
}

/** Tool tile that floats on hover, and falls back to initials if the icon CDN has no logo for it. */
export const TechIcon: React.FC<TechIconProps> = ({ name, icon, onHover, index = 0 }) => {
  const [failed, setFailed] = useState(false);
  const initials = name.replace(/[^A-Za-z0-9+]/g, '').slice(0, 2);

  return (
    <motion.div
      title={name}
      onMouseEnter={onHover}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: { duration: 0.55, delay: Math.min(index, 18) * 0.03, ease: [0.16, 1, 0.3, 1] }
      }}
      viewport={{ once: true, margin: '0px 0px -5% 0px' }}
      whileHover={{ y: -6, scale: 1.08 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 420, damping: 18 }}
      className="group flex flex-col items-center gap-2 cursor-default"
    >
      <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center p-2.5 transition-[background-color,border-color,box-shadow] duration-200 group-hover:bg-white/10 group-hover:border-indigo-500/40 group-hover:shadow-lg group-hover:shadow-indigo-500/10">
        {failed ? (
          <span className="text-xs font-mono font-bold text-slate-300 uppercase">{initials}</span>
        ) : (
          <img
            src={icon}
            alt={name}
            width={28}
            height={28}
            loading="lazy"
            className="w-7 h-7 object-contain"
            onError={() => setFailed(true)}
          />
        )}
      </div>
      <span className="text-[10px] text-slate-500 group-hover:text-slate-300 transition-colors text-center leading-tight max-w-[64px]">
        {name}
      </span>
    </motion.div>
  );
};
