import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'motion/react';

export const KineticCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  // High-performance spring coordinates
  const cursorX = useSpring(0, { stiffness: 600, damping: 40 });
  const cursorY = useSpring(0, { stiffness: 600, damping: 40 });
  const ringX = useSpring(0, { stiffness: 350, damping: 32 });
  const ringY = useSpring(0, { stiffness: 350, damping: 32 });

  useEffect(() => {
    // Check if pointer device supports hover
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const onMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      ringX.set(e.clientX);
      ringY.set(e.clientY);

      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractive = target.closest('button, a, input, textarea, [role="button"], .cursor-pointer');
        setIsHovered(!!isInteractive);
      }
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [cursorX, cursorY, ringX, ringY, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] hidden md:block">
      {/* Outer Spring Ring */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%'
        }}
        className={`w-7 h-7 rounded-full border border-indigo-400/50 backdrop-blur-[1px] transition-all duration-200 flex items-center justify-center ${
          isHovered
            ? 'scale-125 border-amber-400/80 bg-amber-400/10 shadow-[0_0_15px_rgba(251,191,36,0.3)]'
            : isClicking
            ? 'scale-90 border-indigo-300'
            : 'scale-100'
        }`}
      >
        {isHovered && (
          <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping opacity-75" />
        )}
      </motion.div>

      {/* Center Precise Dot */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%'
        }}
        className={`w-1 h-1 rounded-full bg-white transition-all duration-100 ${
          isHovered ? 'scale-0' : isClicking ? 'scale-150 bg-amber-400' : 'scale-100'
        }`}
      />
    </div>
  );
};
