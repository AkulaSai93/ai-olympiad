import React, { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const numeralFive = '/images/numeral-five.svg';

// Card size and positions are taken directly from the Figma frame (each
// plank rect is a uniform 366.3 x 95.04, before rotation), normalized so the
// left/top-most card sits at (0, 0). Shadow offsets come from the dark
// backing plank's own measured offset from its colored plank in Figma.
const CARD_W = 366;
const CARD_H = 95;

interface Stage {
  label: string;
  description: string;
  bg: string;
  text: string;
  rotate: number;
  top: number;
  left: number;
  shadowX: number;
  shadowY: number;
}

const STAGES: Stage[] = [
  {
    label: 'REGISTER',
    description: 'Create your profile and secure your place in the Olympiad.',
    bg: '#34a853',
    text: '#ffffff',
    rotate: 2.95,
    top: 0,
    left: 107,
    shadowX: -8,
    shadowY: 8,
  },
  {
    label: 'PREPARE',
    description: 'Explore the syllabus, practice questions and mock tests before the challenge.',
    bg: '#fbe4a7',
    text: '#0a0a0b',
    rotate: -9.28,
    top: 93,
    left: 132,
    shadowX: -7,
    shadowY: 9,
  },
  {
    label: 'ROUND 01',
    description: 'Take the first online proctored challenge covering the core areas of the Olympiad.',
    bg: '#4286f5',
    text: '#ffffff',
    rotate: 2.95,
    top: 195,
    left: 0,
    shadowX: -8,
    shadowY: 8,
  },
  {
    label: 'ROUND 02',
    description: 'Advance to a more challenging stage and test how far your skills can take you.',
    bg: '#f5f6f8',
    text: '#0a0a0b',
    rotate: -9.22,
    top: 285,
    left: 112,
    shadowX: -7,
    shadowY: 9,
  },
  {
    label: 'NATIONAL FINAL',
    description:
      'Top performers progress to the offline final and compete at the highest stage of the Olympiad.',
    bg: '#e7000b',
    text: '#ffffff',
    rotate: 2.95,
    top: 408,
    left: 158,
    shadowX: -8,
    shadowY: 8,
  },
];

const CASCADE_W = 530;
// 70px taller than the last card's own bottom edge (503) — that extra space
// is where the pole extends past the last sign before touching the section
// floor, so the pole (not the card) is what reaches the bottom edge.
const CASCADE_H = 580;

interface JourneyTimelineProps {
  onOpenGetStarted: () => void;
  smootherReady: boolean;
}

export const JourneyTimeline: React.FC<JourneyTimelineProps> = ({
  onOpenGetStarted,
  smootherReady,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const poleRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!smootherReady) return;

      const cards = gsap.utils.toArray<HTMLElement>('.stage-card');
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduceMotion || cards.length === 0) return;

      // The pole is fully static — no scale, move, or rotate, ever. Rotation
      // for each card lives in its own inline CSS transform (always applied,
      // so reduced-motion users still see the signpost angles) — GSAP only
      // ever animates opacity/y here so it never fights that transform, and
      // never touches the pole at all.
      gsap.set(cards, { opacity: 0, y: 70 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinRef.current,
          start: 'top top',
          end: () => `+=${window.innerHeight * 2}`,
          scrub: true,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
        },
      });

      // Timeline "time" units are scroll-percent points (0-100): each card
      // slides up from below into its final resting spot in its own slice,
      // one after another — once settled it stays put while the next enters.
      cards.forEach((card, i) => {
        tl.to(
          card,
          { opacity: 1, y: 0, duration: 14, ease: 'power2.out' },
          i * 20
        );
      });
    },
    { scope: sectionRef, dependencies: [smootherReady] }
  );

  return (
    <section ref={sectionRef} className="relative w-full bg-white">
      <div ref={pinRef} className="relative w-full min-h-screen flex items-center overflow-hidden">
        {/* Left: headline, numeral, CTA — in the normal centered container */}
        <div className="w-full px-6 sm:px-10 lg:px-[120px] py-16">
          <div className="flex flex-col gap-10 w-full lg:max-w-[500px]">
            <div className="flex flex-col gap-5">
              <p className="font-grotesque font-semibold text-3xl sm:text-4xl lg:text-[40px] leading-tight text-[#0a0a0b]">
                From your first challenge to the{' '}
                <span className="text-[#e7000b]">national stage.</span>
              </p>
              <p className="font-grotesque text-base sm:text-lg text-[#0a0a0b]/80 max-w-md">
                A journey designed to help you prepare, compete, and progress at every stage.
              </p>
            </div>

            <div className="flex flex-col items-start">
              <img src={numeralFive} alt="" aria-hidden className="h-24 sm:h-28 w-auto -ml-1" />
              <p className="font-grotesque font-medium text-base sm:text-lg text-[#0a0a0b] max-w-[260px]">
                One journey from registration to the national final.
              </p>
            </div>

            <button
              onClick={onOpenGetStarted}
              className="group inline-flex items-center gap-2 w-fit bg-[#e7000b] text-white font-grotesque font-semibold text-sm sm:text-base pl-3.5 pr-3 py-3 hover:bg-red-700 transition-colors cursor-pointer"
            >
              Register Free
              <ArrowUpRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>

        {/* Right: cascading signpost cards — bleeds toward the section's own
            right edge (like Figma), independent of the centered text column */}
        <div className="w-full flex justify-center mt-10 lg:mt-0 lg:absolute lg:w-auto lg:right-[3%] xl:right-[5%] lg:top-auto lg:bottom-0">
          <div className="relative w-[300px] h-[328px] sm:w-[410px] sm:h-[449px] lg:w-[530px] lg:h-[580px]">
            <div
              className="absolute top-0 left-0 origin-top-left scale-[0.566] sm:scale-[0.774] lg:scale-100"
              style={{ width: CASCADE_W, height: CASCADE_H }}
            >
              {/* Runs through the middle of the card cluster (not to its
                  left) — 223px sits inside every card's [left, left+366]
                  span, so the pole passes behind each sign, not beside it. */}
              <div
                ref={poleRef}
                className="absolute w-[26px] bg-[#151615]"
                style={{ left: 223, top: -20, bottom: 0 }}
              />

              {STAGES.map((stage) => (
                <div
                  key={stage.label}
                  className="stage-card absolute"
                  style={{
                    top: stage.top,
                    left: stage.left,
                    width: CARD_W,
                    height: CARD_H,
                    transform: `rotate(${stage.rotate}deg)`,
                  }}
                >
                  {/* Drop-shadow backing plank */}
                  <div
                    className="absolute inset-0 bg-[#151615]"
                    style={{ transform: `translate(${stage.shadowX}px, ${stage.shadowY}px)` }}
                  />
                  {/* Colored sign plank */}
                  <div
                    className="absolute inset-0 flex flex-col justify-center gap-2 px-4"
                    style={{ backgroundColor: stage.bg, color: stage.text }}
                  >
                    <p className="font-grotesque font-semibold text-lg leading-none">
                      {stage.label}
                    </p>
                    <p className="font-grotesque text-sm leading-snug">{stage.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
