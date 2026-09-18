import React from 'react';

const quizCardsImg = '/images/value-quiz-cards.png';
const aiTilesImg = '/images/value-ai-tiles.png';
const medalImg = '/images/value-medal.png';
const indiaMapImg = '/images/value-india-map.png';

export const ValueProps: React.FC = () => {
  return (
    <section className="relative w-full bg-white py-16 sm:py-20">
      <div className="w-full px-6 sm:px-10 lg:px-[120px] flex flex-col gap-10 sm:gap-14">
        {/* Headline */}
        <div className="flex flex-col items-center gap-4 sm:gap-5 max-w-3xl mx-auto text-center">
          <p className="font-grotesque font-semibold text-3xl sm:text-4xl lg:text-[40px] leading-tight text-[#0a0a0b] max-w-[760px]">
            A national challenge for curious minds ready to{' '}
            <span className="text-[#e7000b]">think, solve,</span> and{' '}
            <span className="text-[#e7000b]">compete.</span>
          </p>
          <p className="font-grotesque text-base sm:text-lg text-[#0a0a0b]/80 max-w-[666px]">
            Challenge your problem-solving skills, explore AI, and apply what you learn to
            real-world challenges alongside talented students from across India.
          </p>
        </div>

        {/* Bento card grid */}
        <div className="flex flex-col gap-6 sm:gap-7">
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-[1.3fr_1fr] gap-6 sm:gap-7">
            <div className="group relative bg-[#f5f6f8] rounded-[14px] overflow-hidden h-[220px] sm:h-[238px] px-6">
              <div className="absolute left-6 top-1/2 -translate-y-1/2 flex flex-col gap-3">
                <p className="font-grotesque font-bold text-xl sm:text-2xl text-[#0a0a0b] max-w-[166px]">
                  Think Beyond Textbooks
                </p>
                <p className="font-grotesque text-base sm:text-lg text-[#0a0a0b] max-w-[238px]">
                  Apply your concepts to real-world problems and develop a sharper way of
                  thinking.
                </p>
              </div>
              <img
                loading="lazy"
                decoding="async"
                src={quizCardsImg}
                alt="A multiple-choice quiz card"
                className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-[175px] sm:w-[220px] h-auto transition-transform duration-300 ease-out group-hover:scale-110"
              />
            </div>

            <div className="group relative bg-[#f5f6f8] rounded-[14px] overflow-hidden h-[220px] sm:h-[238px] px-5">
              <div className="absolute left-5 top-1/2 -translate-y-1/2 flex flex-col gap-3">
                <p className="font-grotesque font-bold text-xl sm:text-2xl text-[#0a0a0b] max-w-[166px]">
                  Build AI Readiness
                </p>
                <p className="font-grotesque text-base sm:text-lg text-[#0a0a0b] max-w-[198px]">
                  Explore AI, strengthen your foundation, and build future-ready skills.
                </p>
              </div>
              <img
                loading="lazy"
                decoding="async"
                src={aiTilesImg}
                alt="Tiles reading AI, pi, code, and sigma linked in a loop"
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-[162px] sm:w-[195px] h-auto transition-transform duration-300 ease-out group-hover:scale-110"
              />
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.3fr] gap-6 sm:gap-7">
            <div className="group relative bg-[#f5f6f8] rounded-[14px] overflow-hidden h-[220px] sm:h-[238px] px-5">
              <div className="absolute left-5 top-1/2 -translate-y-1/2 flex flex-col gap-3">
                <p className="font-grotesque font-bold text-xl sm:text-2xl text-[#0a0a0b] max-w-[166px]">
                  Earn Recognition
                </p>
                <p className="font-grotesque text-base sm:text-lg text-[#0a0a0b] max-w-[198px]">
                  Get certified, earn national rankings, and open doors to new opportunities.
                </p>
              </div>
              <img
                loading="lazy"
                decoding="async"
                src={medalImg}
                alt="A medal on a red and black ribbon"
                className="absolute right-4 sm:right-8 top-0 h-full w-auto py-0 transition-transform duration-300 ease-out group-hover:scale-110"
              />
            </div>

            <div className="group relative bg-[#151615] rounded-[14px] overflow-hidden h-[220px] sm:h-[238px] px-6">
              <div className="absolute left-6 top-1/2 -translate-y-1/2 flex flex-col gap-3">
                <p className="font-grotesque font-bold text-xl sm:text-2xl text-white max-w-[166px]">
                  Compete Nationally
                </p>
                <p className="font-grotesque text-base sm:text-lg text-white max-w-[238px]">
                  Take your skills beyond the classroom and compete with the brightest minds
                  from across India.
                </p>
              </div>
              <img
                loading="lazy"
                decoding="async"
                src={indiaMapImg}
                alt="A map of India with glowing connection points"
                className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-[195px] sm:w-[240px] h-auto transition-transform duration-300 ease-out group-hover:scale-110"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
