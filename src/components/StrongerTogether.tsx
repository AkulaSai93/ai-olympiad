import React from 'react';
import { Plus } from 'lucide-react';

const bgImage = '/images/partnership-bg.png';
const sriSiddharthaLogo = '/images/logo-sri-siddhartha.png';
const ajeenkyaLogo = '/images/logo-ajeenkya-dy-patil-cropped.png';

interface Partner {
  logo: string;
  logoWidth: number;
  logoHeight: number;
  name: string;
}

const PARTNERS: Partner[] = [
  {
    logo: sriSiddharthaLogo,
    logoWidth: 109.2,
    logoHeight: 109.2,
    name: 'Sri Siddhartha Academy of Higher Education',
  },
  {
    logo: ajeenkyaLogo,
    logoWidth: 146.055,
    logoHeight: 109.2,
    name: 'Ajeenkya DY Patil University',
  },
];

export const StrongerTogether: React.FC = () => {
  return (
    <section className="relative w-full h-[729px] overflow-hidden bg-[#151615]">
      <img
        src={bgImage}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 flex flex-col items-center">
        <div className="flex flex-col items-center gap-4 sm:gap-5 text-center max-w-2xl px-6 mt-[80px]">
          <p className="font-grotesque font-semibold text-3xl sm:text-4xl lg:text-[40px] leading-tight text-white">
            Stronger <span className="text-[#e7000b]">Together</span>
          </p>
          <p className="font-grotesque text-base sm:text-lg text-white/80 max-w-[600px]">
            Collaborating with leading institutions to empower the next generation of AI
            innovators.
          </p>
        </div>

        <div className="absolute left-1/2 top-[calc(50%+43.5px)] -translate-x-1/2 flex items-center justify-center size-10 rounded-full bg-white">
          <Plus className="w-5 h-5 text-[#151615]" strokeWidth={2.5} />
        </div>

        <div className="absolute top-[327px] left-1/2 -translate-x-1/2 w-full max-w-[1100px] px-6 flex items-start justify-between sm:justify-center sm:gap-[320px]">
          <div className="flex flex-col items-center gap-4 w-[230px] max-w-[45%] sm:max-w-none">
            <img
              src={PARTNERS[0].logo}
              alt={PARTNERS[0].name}
              className="shrink-0"
              style={{ width: PARTNERS[0].logoWidth, height: PARTNERS[0].logoHeight }}
            />
            <p className="font-grotesque font-bold uppercase tracking-wide text-sm sm:text-base text-white text-center leading-snug">
              {PARTNERS[0].name}
            </p>
          </div>

          <div className="flex flex-col items-center gap-4 w-[230px] max-w-[45%] sm:max-w-none">
            <img
              src={PARTNERS[1].logo}
              alt={PARTNERS[1].name}
              className="shrink-0"
              style={{ width: PARTNERS[1].logoWidth, height: PARTNERS[1].logoHeight }}
            />
            <p className="font-grotesque font-bold uppercase tracking-wide text-sm sm:text-base text-white text-center leading-snug">
              {PARTNERS[1].name}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
