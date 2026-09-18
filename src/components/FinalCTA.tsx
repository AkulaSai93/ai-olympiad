import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface CountdownUnit {
  value: string;
  label: string;
  bg: string;
}

const UNITS: CountdownUnit[] = [
  { value: '90', label: 'Days', bg: '#34a853' },
  { value: '12', label: 'Hours', bg: '#e8a838' },
  { value: '24', label: 'Minutes', bg: '#4286f5' },
];

// Repeated enough times that one copy already overflows the viewport, so the
// marquee-track's translateX(-50%) loop point is never visibly short of text.
const MARQUEE_REPEAT = 6;

interface FinalCTAProps {
  onOpenGetStarted: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onOpenGetStarted }) => {
  return (
    <section className="relative w-full bg-white py-16 sm:py-20 lg:py-28">
      <div className="w-full px-6 sm:px-10 lg:px-[120px] flex flex-col lg:flex-row gap-12 lg:gap-[97px] items-center lg:items-center">
        <div className="flex flex-col gap-8 sm:gap-10 items-start w-full lg:w-[557px] shrink-0">
          <div className="flex flex-col gap-4 sm:gap-5 items-start w-full">
            <p className="font-grotesque font-semibold text-3xl sm:text-4xl lg:text-[40px] leading-tight text-[#0a0a0b]">
              Ready to <span className="text-[#e7000b]">challenge</span> yourself?
            </p>
            <p className="font-grotesque text-base sm:text-lg text-[#0a0a0b]/80">
              Step into the challenge, test your thinking, and see where you stand among students
              across India.
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

        <div className="flex gap-4 sm:gap-[28px] items-center w-full lg:w-auto justify-center">
          {UNITS.map((unit, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center gap-3 w-[90px] sm:w-[140px] lg:w-[190px] h-[146px] sm:h-[230px] lg:h-[308px] shrink-0"
              style={{ backgroundColor: unit.bg }}
            >
              <p className="font-grotesque font-extrabold text-[40px] sm:text-[64px] lg:text-[96px] leading-none text-white">
                {unit.value}
              </p>
              <p className="font-grotesque font-medium text-sm sm:text-lg lg:text-2xl text-white">
                {unit.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div
        className="relative w-full overflow-hidden mt-12 sm:mt-16 lg:mt-[60px]"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
        }}
      >
        <div className="marquee-track flex items-center w-max">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex items-center shrink-0" aria-hidden={copy === 1}>
              {Array.from({ length: MARQUEE_REPEAT }).map((_, i) => (
                <p
                  key={i}
                  className="font-grotesque font-bold text-[#e7000b] text-6xl sm:text-8xl lg:text-[120px] tracking-[-1px] sm:tracking-[-1.6px] lg:tracking-[-2.2857px] leading-none whitespace-nowrap mr-6 sm:mr-10 lg:mr-[70px]"
                >
                  AI Olympiad
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
