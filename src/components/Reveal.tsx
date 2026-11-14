import React from 'react';
import { motion } from 'motion/react';

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** Starting vertical offset in px. */
  y?: number;
  /** Starting horizontal offset in px (negative slides in from the left). */
  x?: number;
  /** Adds a soft blur-in. Keep for small elements only: blur is not compositor-only. */
  blur?: boolean;
}

/** Fade + slide into view once, with a fluid expo-out curve. */
export const Reveal: React.FC<RevealProps> = ({
  children,
  className,
  delay = 0,
  y = 32,
  x = 0,
  blur = false
}) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y, x, scale: 0.985, ...(blur ? { filter: 'blur(8px)' } : {}) }}
    whileInView={{ opacity: 1, y: 0, x: 0, scale: 1, ...(blur ? { filter: 'blur(0px)' } : {}) }}
    viewport={{ once: true, margin: '0px 0px -12% 0px' }}
    transition={{ duration: 0.85, delay, ease: EASE_OUT_EXPO }}
  >
    {children}
  </motion.div>
);

interface SplitHeadingProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3';
  className?: string;
  /** Number of trailing words rendered with the accent class. */
  accentWords?: number;
  accentClassName?: string;
  delay?: number;
  /** Reveal on mount instead of on scroll. */
  immediate?: boolean;
}

/** Word-by-word masked rise, the classic editorial heading reveal. */
export const SplitHeading: React.FC<SplitHeadingProps> = ({
  text,
  as = 'h2',
  className,
  accentWords = 0,
  accentClassName = 'text-indigo-400',
  delay = 0,
  immediate = false
}) => {
  const Tag = motion[as];
  const words = text.split(' ');
  const accentStart = accentWords > 0 ? words.length - accentWords : words.length;

  return (
    <Tag
      aria-label={text}
      className={className}
      initial="hidden"
      {...(immediate ? { animate: 'visible' } : { whileInView: 'visible' })}
      viewport={{ once: true, margin: '0px 0px -15% 0px' }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.06, delayChildren: delay } }
      }}
    >
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          aria-hidden="true"
          className="inline-block overflow-hidden align-bottom pb-[0.14em] -mb-[0.14em]"
        >
          <motion.span
            className={`inline-block will-change-transform ${index >= accentStart ? accentClassName : ''}`}
            variants={{
              hidden: { y: '115%', rotate: 3 },
              visible: { y: '0%', rotate: 0 }
            }}
            transition={{ duration: 0.9, ease: EASE_OUT_EXPO }}
          >
            {word}
          </motion.span>
          {index < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </Tag>
  );
};
