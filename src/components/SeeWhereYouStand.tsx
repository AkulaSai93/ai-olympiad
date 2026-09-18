import React from 'react';
import { UsersRound, Building2, LaptopMinimal } from 'lucide-react';

const mapImage = '/images/india-network-map.png';

interface Stat {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

const STATS: Stat[] = [
  { icon: UsersRound, title: 'Students', description: 'From across India' },
  { icon: Building2, title: 'Schools', description: 'From 28+ states & UTs' },
  { icon: LaptopMinimal, title: 'One Platform', description: 'Equal opportunities for every talent' },
];

export const SeeWhereYouStand: React.FC = () => {
  return (
    <section className="relative w-full bg-white py-16 sm:py-20 lg:py-28">
      <div className="w-full px-6 sm:px-10 lg:px-[120px] flex flex-col items-center gap-12 sm:gap-16">
        {/* Headline */}
        <div className="flex flex-col items-center gap-4 sm:gap-5 text-center max-w-2xl">
          <p className="font-grotesque font-semibold text-3xl sm:text-4xl lg:text-[40px] leading-tight text-[#0a0a0b]">
            See where you <span className="text-[#e7000b]">stand.</span>
          </p>
          <p className="font-grotesque text-base sm:text-lg text-[#0a0a0b]/80 max-w-[745px]">
            Compete with students from across India and track your performance as you progress
            through the Olympiad.
          </p>
        </div>

        {/* Map + stats */}
        <div className="w-full flex flex-col lg:flex-row gap-12 lg:gap-[82px] items-center">
          <img
            src={mapImage}
            alt="Map of India showing glowing connections between competing regions"
            className="w-full max-w-[500px] lg:max-w-[655px] h-auto shrink-0"
          />

          <div className="flex flex-col gap-8 sm:gap-10 items-start w-full lg:w-[426px] shrink-0">
            <div className="flex flex-col gap-5 items-start w-full">
              <div className="flex flex-col gap-3 items-start w-full font-grotesque font-semibold">
                <p className="text-xl text-[#0a0a0b]">ONE COUNTRY.</p>
                <p className="text-2xl sm:text-[28px] leading-tight text-[#e7000b]">
                  THOUSANDS OF POSSIBILITIES.
                </p>
              </div>
              <p className="font-grotesque text-base sm:text-lg text-[#0a0a0b]/80">
                A truly national platform, bringing young problem solvers from every corner of
                the country.
              </p>
            </div>

            <div className="flex flex-col gap-5 items-start">
              {STATS.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.title} className="flex gap-4 items-center">
                    <Icon className="w-7 h-7 text-[#0a0a0b] shrink-0" strokeWidth={1.75} />
                    <div className="flex flex-col gap-1 items-start">
                      <p className="font-grotesque font-medium text-lg text-[#0a0a0b]">
                        {stat.title}
                      </p>
                      <p className="font-grotesque text-sm text-[#0a0a0b]/80 whitespace-nowrap">
                        {stat.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
