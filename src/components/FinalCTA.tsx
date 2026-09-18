import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const stringSvg = '/images/cta-string.svg';
const pinSvg = '/images/cta-pin-1.svg';

const iconAi = '/images/cta-icon-ai.png';
const iconCode = '/images/cta-icon-code.png';
const iconMath = '/images/cta-icon-math.png';
const iconLogic = '/images/cta-icon-logic.png';
const iconCompete = '/images/cta-icon-compete.png';

interface HangingCard {
  icon: string;
  title: string;
  subtitle: string;
  // Center position of the (unrotated) 194x194 card, as a percentage of the
  // dark panel's 1280x563 reference box — derived from Figma's absolute
  // pixel boxes so the "sagging clothesline" layout scales with the panel.
  leftPct: number;
  topPct: number;
  rotate: number;
}

const CARDS: HangingCard[] = [
  { icon: iconCompete, title: 'Compete', subtitle: 'Be among the best', leftPct: 2.85, topPct: 56.42, rotate: 19.16 },
  { icon: iconMath, title: 'Math', subtitle: 'Think deeper', leftPct: 24.71, topPct: 69.36, rotate: 13.01 },
  { icon: iconAi, title: 'AI', subtitle: 'Build the future', leftPct: 50, topPct: 73.89, rotate: 0 },
  { icon: iconCode, title: 'Code', subtitle: 'Solve real problem', leftPct: 73.11, topPct: 69.36, rotate: -13.01 },
  { icon: iconLogic, title: 'Logic', subtitle: 'Sharpen your mind', leftPct: 94.94, topPct: 57.86, rotate: -19.16 },
];

const CARD_SIZE = 194;

interface FinalCTAProps {
  onOpenGetStarted: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onOpenGetStarted }) => {
  return (
    <section className="relative w-full bg-white py-16 sm:py-20 lg:py-28">
      <div className="w-full px-6 sm:px-10 lg:px-[120px]">
        <div className="relative w-full lg:h-[563px] rounded-[28px] bg-[#151615] overflow-hidden px-6 py-16 sm:py-20 lg:p-0">
          {/* Headline + CTA */}
          <div className="relative lg:absolute lg:left-1/2 lg:-translate-x-1/2 lg:top-[50px] flex flex-col gap-8 sm:gap-10 items-center max-w-[557px] mx-auto lg:w-[557px] text-center z-10">
            <div className="flex flex-col gap-4 sm:gap-5 items-center text-center w-full">
              <p className="font-grotesque font-semibold text-3xl sm:text-4xl lg:text-[40px] leading-tight text-white">
                Ready to <span className="text-[#e7000b]">challenge</span> yourself?
              </p>
              <p className="font-grotesque text-base sm:text-lg text-white/80">
                Step into the challenge, test your thinking, and see where you stand among
                students across India.
              </p>
            </div>

            <button
              onClick={onOpenGetStarted}
              className="group inline-flex items-center gap-2 w-fit bg-[#e7000b] text-white font-grotesque font-semibold text-base pl-3.5 pr-3 py-3 hover:bg-red-700 transition-colors cursor-pointer"
            >
              Register Free
              <ArrowUpRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>

          {/* Sagging string + pinned cards — desktop only */}
          <div className="hidden lg:block absolute inset-0">
            <img
              src={stringSvg}
              alt=""
              className="absolute left-0 top-[182px] w-full max-w-none h-auto"
            />

            {CARDS.map((card) => (
              <div
                key={card.title}
                className="absolute"
                style={{
                  left: `${card.leftPct}%`,
                  top: `${card.topPct}%`,
                  width: CARD_SIZE,
                  height: CARD_SIZE,
                  transform: `translate(-50%, -50%) rotate(${card.rotate}deg)`,
                }}
              >
                <img
                  src={pinSvg}
                  alt=""
                  className="absolute left-1/2 -translate-x-1/2 w-8 h-[46px]"
                  style={{ top: -34 }}
                />
                <div className="relative size-full rounded-[24px] bg-white border border-black overflow-hidden flex flex-col items-center justify-center gap-3 pt-3">
                  <img src={card.icon} alt="" className="w-[70px] h-auto object-contain" />
                  <div className="flex flex-col items-center gap-1">
                    <p className="font-grotesque font-semibold text-lg text-[#0a0a0b]">
                      {card.title}
                    </p>
                    <p className="font-grotesque text-sm text-[#0a0a0b] whitespace-nowrap">
                      {card.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Simple icon grid fallback — below lg */}
          <div className="lg:hidden grid grid-cols-2 sm:grid-cols-3 gap-4 mt-12">
            {CARDS.map((card) => (
              <div
                key={card.title}
                className="flex flex-col items-center justify-center gap-3 rounded-[20px] bg-white border border-black py-6"
              >
                <img src={card.icon} alt="" className="w-14 h-auto object-contain" />
                <div className="flex flex-col items-center gap-1">
                  <p className="font-grotesque font-semibold text-base text-[#0a0a0b]">
                    {card.title}
                  </p>
                  <p className="font-grotesque text-xs text-[#0a0a0b] text-center">
                    {card.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
