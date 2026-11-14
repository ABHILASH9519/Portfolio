import React, { useEffect, useRef } from 'react';
import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from 'motion/react';

interface AnimatedCounterProps {
  /** Any string with one number in it: "45+", "97%", "99.98%", "$1,200". */
  value: string;
  className?: string;
}

/** Counts up to the number inside `value` when scrolled into view, keeping prefix/suffix and decimals. */
export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ value, className }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' });
  const reduceMotion = useReducedMotion();

  const match = value.match(/^([^\d]*)([\d,]*\.?\d+)(.*)$/);
  const prefix = match?.[1] ?? '';
  const numeric = match?.[2] ?? '0';
  const suffix = match?.[3] ?? '';
  const target = parseFloat(numeric.replace(/,/g, ''));
  const decimals = (numeric.split('.')[1] ?? '').length;

  const progress = useMotionValue(0);
  const text = useTransform(progress, (latest) => `${prefix}${latest.toFixed(decimals)}${suffix}`);

  useEffect(() => {
    if (!match || !inView) return;
    if (reduceMotion) {
      progress.set(target);
      return;
    }
    const controls = animate(progress, target, { duration: 1.8, ease: [0.16, 1, 0.3, 1] });
    return () => controls.stop();
  }, [inView, reduceMotion, target, progress, match]);

  if (!match) return <span className={className}>{value}</span>;

  return (
    <motion.span ref={ref} className={className} aria-label={value}>
      {text}
    </motion.span>
  );
};
