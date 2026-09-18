import React, { useEffect, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const upgradLogo = '/images/upgrad-logo.png';

const NAV_LINKS = ['Home', 'About the Olympiad', 'How It Works'];

interface FloatingNavProps {
  onOpenGetStarted: () => void;
}

export const FloatingNav: React.FC<FloatingNavProps> = ({ onOpenGetStarted }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const scopeRef = useRef<HTMLDivElement>(null);
  const clickCatcherRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const linksWrapperRef = useRef<HTMLDivElement>(null);
  const bottomRowRef = useRef<HTMLDivElement>(null);
  const lineTopRef = useRef<HTMLSpanElement>(null);
  const lineBottomRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  useGSAP(
    () => {
      // Hamburger -> X: the two bars rotate into a cross and meet at center.
      gsap.to(lineTopRef.current, {
        rotate: isMenuOpen ? 45 : 0,
        y: isMenuOpen ? 3 : 0,
        duration: 0.35,
        ease: 'power2.inOut',
      });
      gsap.to(lineBottomRef.current, {
        rotate: isMenuOpen ? -45 : 0,
        y: isMenuOpen ? -3 : 0,
        duration: 0.35,
        ease: 'power2.inOut',
      });

      const wrapper = linksWrapperRef.current;
      const container = containerRef.current;
      const bottomRow = bottomRowRef.current;
      if (!wrapper || !container || !bottomRow) return;

      const MAX_RADIUS = 32;
      // Corner radius is derived from the box's own live height every frame
      // (never a separately-eased value) so it can never outrun the box's
      // actual shape — this is what keeps the morph a clean pill -> rounded
      // rectangle instead of briefly ballooning into a circle/ellipse.
      const applyRadius = () => {
        const totalHeight = wrapper.getBoundingClientRect().height + bottomRow.offsetHeight;
        container.style.borderRadius = `${Math.min(totalHeight / 2, MAX_RADIUS)}px`;
      };

      if (isMenuOpen) {
        gsap.set(clickCatcherRef.current, { visibility: 'visible' });

        // Measure the links' natural size without ever flashing them —
        // flip to fit-content just long enough to read it, then snap back.
        gsap.set(wrapper, { visibility: 'hidden', width: 'fit-content', height: 'auto' });
        const fullWidth = wrapper.getBoundingClientRect().width;
        const fullHeight = wrapper.getBoundingClientRect().height;
        gsap.set(wrapper, { width: 0, height: 0, visibility: 'visible' });

        // The pill itself grows in place into the panel — same shape,
        // same element, no separate popup.
        const tl = gsap.timeline({ onUpdate: applyRadius });
        tl.to(wrapper, { width: fullWidth, height: fullHeight, duration: 0.4, ease: 'power2.out' }, 0).fromTo(
          wrapper,
          { opacity: 0 },
          { opacity: 1, duration: 0.3, ease: 'power2.out' },
          0.1
        );
      } else {
        const tl = gsap.timeline({
          onUpdate: applyRadius,
          onComplete: () => gsap.set(clickCatcherRef.current, { visibility: 'hidden' }),
        });
        tl.to(wrapper, { opacity: 0, duration: 0.15, ease: 'power2.in' }, 0).to(
          wrapper,
          { width: 0, height: 0, duration: 0.35, ease: 'power2.in' },
          0.05
        );
      }
    },
    { dependencies: [isMenuOpen], scope: scopeRef }
  );

  return (
    <div ref={scopeRef} className="fixed bottom-6 sm:bottom-8 lg:bottom-10 left-1/2 -translate-x-1/2 z-30">
      {/* Transparent full-screen catcher so an outside click/tap closes the menu — no dimming, the page stays visible */}
      <div
        ref={clickCatcherRef}
        onClick={() => setIsMenuOpen(false)}
        className="fixed inset-0 z-20"
        style={{ visibility: 'hidden' }}
      />

      {/* The pill itself — grows in place into the expanded panel, never a separate floating card */}
      <div
        ref={containerRef}
        className="relative z-30 w-fit rounded-full bg-[#f5f6f8] shadow-xl overflow-hidden"
      >
        <div ref={linksWrapperRef} className="overflow-hidden" style={{ width: 0, height: 0 }}>
          <nav className="flex flex-col items-center gap-5 sm:gap-6 lg:gap-7 px-9 sm:px-11 lg:px-12 pt-9 sm:pt-11 lg:pt-12 pb-1.5">
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href="#"
                onClick={() => setIsMenuOpen(false)}
                className="font-grotesque font-bold text-2xl sm:text-3xl lg:text-[34px] text-[#0a0a0b] hover:text-[#e7000b] whitespace-nowrap transition-colors"
              >
                {link}
              </a>
            ))}
          </nav>
        </div>

        <div
          ref={bottomRowRef}
          className="flex items-center w-full gap-2.5 sm:gap-3 lg:gap-3.5 pl-4 sm:pl-6 lg:pl-6 pr-2 sm:pr-2.5 py-2 sm:py-2.5 lg:py-2.5"
        >
          <img
            src={upgradLogo}
            alt="upGrad School of Technology"
            className="h-5 sm:h-6 lg:h-[27.855px] w-auto shrink-0"
          />

          <button
            onClick={onOpenGetStarted}
            className="flex-1 bg-[#e7000b] text-white font-grotesque font-semibold text-sm sm:text-base lg:text-lg text-center rounded-full px-4 sm:px-5 lg:px-6 py-2 sm:py-2.5 whitespace-nowrap hover:bg-red-700 transition-colors cursor-pointer"
          >
            Register Free
          </button>

          <button
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            className="relative bg-black rounded-xl size-9 sm:size-10 lg:size-[43.5px] flex items-center justify-center shrink-0 cursor-pointer"
          >
            <span
              ref={lineTopRef}
              className="absolute block h-[2px] w-5 bg-white rounded-full"
              style={{ top: 'calc(50% - 4px)' }}
            />
            <span
              ref={lineBottomRef}
              className="absolute block h-[2px] w-5 bg-white rounded-full"
              style={{ top: 'calc(50% + 4px)' }}
            />
          </button>
        </div>
      </div>
    </div>
  );
};
