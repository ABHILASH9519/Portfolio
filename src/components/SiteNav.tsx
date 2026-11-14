import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { useLenis } from './SmoothScroll';

export const NAV_ITEMS = [
  { id: 'academics', label: 'Academics' },
  { id: 'about', label: 'Background' },
  { id: 'projects', label: 'Works' },
  { id: 'certifications', label: 'Credentials' },
  { id: 'architecture', label: 'Playground' },
  { id: 'stack', label: 'Stack' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' }
] as const;

/** Returns the id of the section currently crossing the middle of the viewport. */
export const useActiveSection = (): string | null => {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const elements = NAV_ITEMS.map((item) => document.getElementById(item.id)).filter(
      (el): el is HTMLElement => el !== null
    );
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );

    elements.forEach((el) => observer.observe(el));

    // Clear the highlight when scrolled back above the first section
    const onScroll = () => {
      const first = elements[0];
      if (first && first.getBoundingClientRect().top > window.innerHeight * 0.6) setActive(null);
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return active;
};

interface DesktopNavProps {
  active: string | null;
  onHoverItem?: () => void;
}

/** Desktop links with a hover pill and a sliding active underline (shared layout animation). */
export const DesktopNav: React.FC<DesktopNavProps> = ({ active, onHoverItem }) => {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <nav
      className="hidden lg:flex items-center gap-1 text-[13px] font-medium"
      onMouseLeave={() => setHovered(null)}
    >
      {NAV_ITEMS.map((item) => {
        const isActive = active === item.id;
        return (
          <a
            key={item.id}
            href={`#${item.id}`}
            onMouseEnter={() => {
              setHovered(item.id);
              onHoverItem?.();
            }}
            className={`relative px-3 py-2 whitespace-nowrap transition-colors duration-300 ${
              isActive ? 'text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            {hovered === item.id && (
              <motion.span
                layoutId="nav-hover-pill"
                className="absolute inset-0 rounded-lg bg-white/[0.06]"
                transition={{ type: 'spring', stiffness: 420, damping: 34 }}
              />
            )}
            <span className="relative z-10">{item.label}</span>
            {isActive && (
              <motion.span
                layoutId="nav-active-line"
                className="absolute left-3 right-3 -bottom-px h-[2px] rounded-full bg-gradient-to-r from-amber-400 via-indigo-500 to-sky-400"
                transition={{ type: 'spring', stiffness: 380, damping: 32 }}
              />
            )}
          </a>
        );
      })}
    </nav>
  );
};

interface MobileMenuProps {
  active: string | null;
}

/** Hamburger + full-screen overlay with staggered links. Rendered in a portal so it escapes the header's backdrop-filter. */
export const MobileMenu: React.FC<MobileMenuProps> = ({ active }) => {
  const [open, setOpen] = useState(false);
  const lenis = useLenis();
  // Section chosen from the menu; scrolled to only after the page is unlocked again,
  // because lenis.start() resets any scroll animation that is already running.
  const pendingHash = useRef<string | null>(null);

  useEffect(() => {
    if (!open) return;
    lenis?.stop();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      lenis?.start();
      window.removeEventListener('keydown', onKey);

      const hash = pendingHash.current;
      pendingHash.current = null;
      const target = hash ? document.querySelector<HTMLElement>(hash) : null;
      if (!hash || !target) return;
      if (lenis) lenis.scrollTo(target, { offset: -72, duration: 1.4 });
      else target.scrollIntoView({ behavior: 'auto', block: 'start' });
      history.replaceState(null, '', hash);
    };
  }, [open, lenis]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Open navigation menu"
        aria-expanded={open}
        className="lg:hidden p-2 text-slate-300 hover:text-white hover:bg-white/5 rounded-lg border border-white/5 transition-colors"
      >
        <Menu className="w-4 h-4" />
      </button>

      {createPortal(
        <AnimatePresence>
          {open && (
            <motion.div
              key="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Site navigation"
              className="fixed inset-0 z-[120] bg-[#090b10]/97 backdrop-blur-xl flex flex-col px-8 pt-6 pb-10"
              initial={{ clipPath: 'circle(0% at calc(100% - 3rem) 2.5rem)' }}
              animate={{ clipPath: 'circle(150% at calc(100% - 3rem) 2.5rem)' }}
              exit={{ clipPath: 'circle(0% at calc(100% - 3rem) 2.5rem)' }}
              transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-slate-500">Navigate</span>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close navigation menu"
                  className="p-2 text-slate-300 hover:text-white bg-white/5 rounded-lg border border-white/10"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <motion.ul
                className="mt-10 flex-1 flex flex-col justify-center gap-1"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={{ visible: { transition: { staggerChildren: 0.06, delayChildren: 0.25 } }, hidden: {} }}
              >
                {NAV_ITEMS.map((item, index) => (
                  <li key={item.id} className="overflow-hidden">
                    <motion.a
                      href={`#${item.id}`}
                      onClick={(event) => {
                        event.preventDefault();
                        pendingHash.current = `#${item.id}`;
                        setOpen(false);
                      }}
                      className={`flex items-baseline gap-4 py-2 text-4xl sm:text-5xl font-extrabold tracking-tight ${
                        active === item.id ? 'text-indigo-400' : 'text-white'
                      }`}
                      variants={{
                        hidden: { y: '110%', opacity: 0 },
                        visible: { y: '0%', opacity: 1 }
                      }}
                      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <span className="text-xs font-mono font-normal text-slate-500 tabular-nums">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span>{item.label}</span>
                    </motion.a>
                  </li>
                ))}
              </motion.ul>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
};
