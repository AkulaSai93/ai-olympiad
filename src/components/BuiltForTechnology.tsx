import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const portraitImg = '/images/tech-portrait.png';

interface BuiltForTechnologyProps {
  onOpenGetStarted: () => void;
}

export const BuiltForTechnology: React.FC<BuiltForTechnologyProps> = ({ onOpenGetStarted }) => {
  return (
    <section className="relative w-full bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 py-16 sm:py-20 lg:py-28">
        <div className="relative z-10 flex flex-col gap-6 sm:gap-8 max-w-xl">
          <div className="flex flex-col gap-4 sm:gap-5">
            <p className="font-grotesque font-semibold text-3xl sm:text-4xl lg:text-[40px] leading-tight text-[#0a0a0b] max-w-md">
              Built for the way <span className="text-[#e7000b]">technology</span> is changing.
            </p>
            <p className="font-grotesque text-base sm:text-lg text-[#0a0a0b]/80">
              AI Genius Olympiad goes beyond traditional academic competitions by bringing
              computer science, mathematics, logic, and AI together in one challenge.
            </p>
          </div>

          <button
            onClick={onOpenGetStarted}
            className="group inline-flex items-center gap-2 w-fit bg-[#e7000b] text-white font-grotesque font-semibold text-sm pl-3.5 pr-3 py-3 hover:bg-red-700 transition-colors cursor-pointer"
          >
            Register Free
            <ArrowUpRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>

      <img
        src={portraitImg}
        alt="A student looking upward in thought"
        className="hidden md:block absolute right-[4%] lg:right-[8%] bottom-0 w-[260px] sm:w-[340px] lg:w-[420px] xl:w-[474px] h-auto pointer-events-none select-none"
      />
    </section>
  );
};
