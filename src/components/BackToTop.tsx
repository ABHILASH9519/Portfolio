import React, { useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react';
import { ArrowUp } from 'lucide-react';
import { useLenis } from './SmoothScroll';

/** Floating button that springs in after the first screen and glides back to the top. */
export const BackToTop: React.FC = () => {
  const { scrollY } = useScroll();
  const lenis = useLenis();
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollY, 'change', (y) => {
    const next = y > window.innerHeight * 1.2;
    setVisible((prev) => (prev === next ? prev : next));
  });

  const goTop = () => {
    if (lenis) lenis.scrollTo(0, { duration: 1.6, force: true });
    else window.scrollTo({ top: 0 });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="back-to-top"
          type="button"
          onClick={goTop}
          aria-label="Back to top"
          initial={{ opacity: 0, y: 24, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.8 }}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.92 }}
          transition={{ type: 'spring', stiffness: 380, damping: 26 }}
          className="fixed bottom-6 right-6 z-[90] p-3 rounded-full bg-indigo-600 text-white shadow-lg shadow-indigo-900/40 border border-white/10 hover:bg-indigo-500 transition-colors"
        >
          <ArrowUp className="w-4 h-4" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};
