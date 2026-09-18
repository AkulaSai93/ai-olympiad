import React, { useCallback, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const TOTAL_FRAMES = 240;
const framePath = (index: number) => `/hero-frames/frame_${String(index).padStart(3, '0')}.jpg`;
// Scroll distance devoted to the pinned sequence, as a multiple of the viewport height.
const SCROLL_LENGTH_VH = 4;

interface CinematicHeroProps {
  onOpenGetStarted: () => void;
  // ScrollSmoother (created by the parent) patches how pinned ScrollTriggers
  // measure their scroll distance. It must exist before this component's own
  // ScrollTrigger is created, so creation is gated on this flag rather than
  // relying on React's child-before-parent effect ordering.
  smootherReady: boolean;
}

export const CinematicHero: React.FC<CinematicHeroProps> = ({ onOpenGetStarted, smootherReady }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const vignetteRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const imagesRef = useRef<HTMLImageElement[]>([]);
  const loadedCountRef = useRef(0);
  const currentFrameRef = useRef(0);
  const [isReady, setIsReady] = useState(false);

  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    const img = imagesRef.current[index];
    if (!canvas || !img || !img.complete || img.naturalWidth === 0) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const cssW = canvas.clientWidth;
    const cssH = canvas.clientHeight;
    if (cssW === 0 || cssH === 0) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const targetW = Math.round(cssW * dpr);
    const targetH = Math.round(cssH * dpr);
    if (canvas.width !== targetW || canvas.height !== targetH) {
      canvas.width = targetW;
      canvas.height = targetH;
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = cssW / cssH;
    let drawW: number, drawH: number, offsetX: number, offsetY: number;
    if (imgRatio > canvasRatio) {
      drawH = cssH;
      drawW = drawH * imgRatio;
      offsetX = (cssW - drawW) / 2;
      offsetY = 0;
    } else {
      drawW = cssW;
      drawH = drawW / imgRatio;
      offsetX = 0;
      offsetY = (cssH - drawH) / 2;
    }
    ctx.clearRect(0, 0, cssW, cssH);
    ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
  }, []);

  useGSAP(
    () => {
      let cancelled = false;

      // --- Preload the frame sequence (acts as the "background video") ---
      const images: HTMLImageElement[] = [];
      for (let i = 1; i <= TOTAL_FRAMES; i++) {
        const img = new Image();
        img.decoding = 'async';
        img.src = framePath(i);
        img.onload = () => {
          loadedCountRef.current += 1;
          if (i === 1 && !cancelled) {
            // Defer to the next frame so the canvas has a flushed layout
            // (clientWidth/Height) to measure — onload can fire before the
            // browser's first layout pass, especially for a cached image.
            requestAnimationFrame(() => {
              if (!cancelled) {
                drawFrame(0);
                setIsReady(true);
              }
            });
          }
          if (loadedCountRef.current === TOTAL_FRAMES) {
            ScrollTrigger.refresh();
          }
        };
        images.push(img);
      }
      imagesRef.current = images;

      const handleResize = () => drawFrame(currentFrameRef.current);
      window.addEventListener('resize', handleResize);

      gsap.set(canvasRef.current, { filter: 'blur(0px)' });

      // ScrollSmoother (created by the parent) must exist before this pinned
      // ScrollTrigger is created for pin-spacing to measure scroll distance
      // correctly against the smoothed content — so skip pin setup until the
      // parent signals it's ready (this whole effect re-runs when it flips).
      if (!smootherReady) {
        return () => {
          cancelled = true;
          window.removeEventListener('resize', handleResize);
        };
      }

      const mm = gsap.matchMedia();

      // Two exhaustive, mutually-exclusive conditions so the handler always fires
      // exactly once on load (a single non-guaranteed condition may never match).
      mm.add(
        {
          reduceMotion: '(prefers-reduced-motion: reduce)',
          motionOk: '(prefers-reduced-motion: no-preference)',
        },
        (context) => {
          const conditions = context.conditions as { reduceMotion: boolean } | undefined;
          const reduceMotion = !!conditions?.reduceMotion;

          if (reduceMotion) {
            // Respect reduced-motion: no pin, no scrub, just the static opening frame.
            return;
          }

          const tl = gsap.timeline({
            defaults: { ease: 'none' },
            scrollTrigger: {
              trigger: pinRef.current,
              start: 'top top',
              end: () => `+=${window.innerHeight * SCROLL_LENGTH_VH}`,
              // ScrollSmoother (App.tsx) now owns the page-wide inertia/lag feel;
              // track its already-smoothed scroll tightly here to avoid double-lag.
              scrub: true,
              pin: true,
              pinSpacing: true,
              anticipatePin: 1,
              onUpdate: (self) => {
                const maxLoaded = Math.max(0, loadedCountRef.current - 1);
                const target = Math.round(self.progress * (TOTAL_FRAMES - 1));
                const frame = Math.min(target, maxLoaded);
                if (frame !== currentFrameRef.current) {
                  currentFrameRef.current = frame;
                  drawFrame(frame);
                }
              },
            },
          });

          // Timeline "time" units below are treated as scroll-percent points (0-100),
          // so each position/duration maps 1:1 onto the phases in the scroll spec.

          // 10% -> 25%: first, restrained settle
          tl.to(headlineRef.current, { scale: 0.96, y: -10, duration: 15 }, 10)
            .to(descRef.current, { y: -20, duration: 15 }, 10)
            .to(ctaRef.current, { opacity: 0.7, duration: 15 }, 10)
            .to(contentRef.current, { z: -30, duration: 15 }, 10)
            .to(canvasRef.current, { scale: 1.02, duration: 15 }, 10)

            // 25% -> 50%: recede further, CTA gone, vignette forms
            .to(headlineRef.current, { scale: 0.92, y: -30, duration: 25 }, 25)
            .to(descRef.current, { opacity: 0.4, duration: 25 }, 25)
            .to(ctaRef.current, { opacity: 0, duration: 20 }, 25)
            .to(contentRef.current, { z: -70, duration: 25 }, 25)
            .to(canvasRef.current, { scale: 1.05, duration: 25 }, 25)
            .to(overlayRef.current, { opacity: 0.38, duration: 25 }, 25)
            .to(vignetteRef.current, { opacity: 0.55, duration: 25 }, 25)

            // 50% -> 75%: content sinks away, video becomes dominant
            .to(headlineRef.current, { opacity: 0.2, duration: 25 }, 50)
            .to(descRef.current, { opacity: 0, duration: 15 }, 50)
            .to(contentRef.current, { y: -120, z: -90, duration: 25 }, 50)
            .to(canvasRef.current, { scale: 1.08, filter: 'blur(2px)', duration: 25 }, 50)
            .to(overlayRef.current, { opacity: 0.52, duration: 25 }, 50)
            .to(vignetteRef.current, { opacity: 0.8, duration: 25 }, 50)

            // 75% -> 100%: content gone, video fills the experience, hero unpins
            .to(contentRef.current, { opacity: 0, duration: 15 }, 75)
            .to(canvasRef.current, { scale: 1.1, duration: 25 }, 75)
            .to(overlayRef.current, { opacity: 0.66, duration: 25 }, 75)
            .to(vignetteRef.current, { opacity: 1, duration: 25 }, 75);

          // If the page mounts already scrolled (reload mid-scroll, or the
          // dev-only StrictMode double-effect), sync immediately instead of
          // waiting for the next scroll event to nudge the scrubbed timeline.
          ScrollTrigger.refresh();
        }
      );

      return () => {
        cancelled = true;
        window.removeEventListener('resize', handleResize);
        mm.revert();
      };
    },
    { scope: sectionRef, dependencies: [smootherReady] }
  );

  return (
    <section ref={sectionRef} className="relative w-full text-white">
      <div
        ref={pinRef}
        className="relative w-full h-screen overflow-hidden bg-[#0c0c0e] [perspective:1400px]"
      >
        {/* Poster fallback shown until the first frame decodes */}
        <div
          className={`absolute inset-0 bg-gradient-to-b from-[#3a1405] via-[#1a0a04] to-[#0c0c0e] transition-opacity duration-700 ${
            isReady ? 'opacity-0' : 'opacity-100'
          }`}
        />

        {/* Frame-sequence canvas — the scroll-scrubbed "background video" */}
        <canvas
          ref={canvasRef}
          className={`absolute inset-0 w-full h-full origin-center transition-opacity duration-700 ${
            isReady ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ willChange: 'transform, filter' }}
        />

        {/* Dark overlay */}
        <div
          ref={overlayRef}
          className="absolute inset-0 bg-black pointer-events-none"
          style={{ opacity: 0.2, willChange: 'opacity' }}
        />

        {/* Cinematic vignette */}
        <div
          ref={vignetteRef}
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: 0,
            willChange: 'opacity',
            background:
              'radial-gradient(ellipse 70% 70% at 50% 50%, transparent 45%, rgba(0,0,0,0.9) 100%)',
          }}
        />

        {/* Minimal top nav */}
        <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-end px-6 sm:px-10 py-6">
          <button
            onClick={onOpenGetStarted}
            className="group bg-white text-black hover:bg-neutral-100 pl-5 pr-1.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-3 shadow-xl cursor-pointer"
          >
            <span>Register Free</span>
            <div className="w-7 h-7 rounded-full bg-black flex items-center justify-center transition-transform group-hover:translate-x-0.5">
              <ArrowRight className="w-3.5 h-3.5 stroke-[2.5] text-white" />
            </div>
          </button>
        </div>

        {/* Hero content */}
        <div
          ref={contentRef}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6"
          style={{ willChange: 'transform, opacity' }}
        >
          <h1
            ref={headlineRef}
            className="font-serif-display text-5xl sm:text-7xl md:text-8xl leading-[0.98] tracking-tight max-w-5xl origin-center"
            style={{ willChange: 'transform' }}
          >
            The next generation of <span className="text-red-600">AI thinkers</span> starts here.
          </h1>

          <div ref={descRef} className="mt-6 max-w-2xl" style={{ willChange: 'transform, opacity' }}>
            <p className="text-base sm:text-lg text-white/80 leading-relaxed">
              A free national AI competition for Class 11-12 students to test their
              problem-solving skills, explore AI, and compete on a national stage.
            </p>
          </div>

          <div ref={ctaRef} className="mt-10 flex items-center gap-5" style={{ willChange: 'opacity' }}>
            <button
              onClick={onOpenGetStarted}
              className="bg-red-600 text-white px-7 py-3 rounded-full text-sm font-semibold hover:bg-red-500 transition-colors cursor-pointer"
            >
              Register Free
            </button>
            <button className="border border-white/40 text-white px-7 py-3 rounded-full text-sm font-semibold hover:bg-white/10 hover:border-white/60 transition-colors cursor-pointer">
              Explore the Olympiad
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
