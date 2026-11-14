import React, { createContext, useContext, useEffect, useState } from 'react';
import Lenis from 'lenis';

const LenisContext = createContext<Lenis | null>(null);

export const useLenis = () => useContext(LenisContext);

const HEADER_OFFSET = -72;

/**
 * Inertia scrolling (Lenis) + smooth in-page anchor navigation.
 * Native scroll position is preserved, so Motion's useScroll keeps working.
 * Disabled automatically for visitors who prefer reduced motion.
 */
export const SmoothScroll: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const instance = new Lenis({
      lerp: 0.085,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.4,
      smoothWheel: true
    });

    let frameId = requestAnimationFrame(function raf(time) {
      instance.raf(time);
      frameId = requestAnimationFrame(raf);
    });

    setLenis(instance);

    return () => {
      cancelAnimationFrame(frameId);
      instance.destroy();
      setLenis(null);
    };
  }, []);

  // Smooth anchor links (#about, #projects, ...) with a header offset
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented) return;
      const anchor = (event.target as HTMLElement | null)?.closest<HTMLAnchorElement>('a[href^="#"]');
      if (!anchor) return;
      const hash = anchor.getAttribute('href');
      if (!hash || hash === '#') return;
      const target = document.querySelector<HTMLElement>(hash);
      if (!target) return;

      event.preventDefault();
      if (lenis) {
        // force: the mobile menu stops Lenis while open, and a stopped Lenis ignores scrollTo otherwise
        lenis.scrollTo(target, { offset: HEADER_OFFSET, duration: 1.4, force: true });
      } else {
        target.scrollIntoView({ behavior: 'auto', block: 'start' });
      }
      history.replaceState(null, '', hash);
    };

    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [lenis]);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
};
