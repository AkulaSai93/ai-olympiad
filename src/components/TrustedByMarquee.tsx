import React from 'react';

const LOGO_STRIP_SRC = '/images/trusted-logos.png';
// Natural aspect ratio of the tightly-cropped logo strip (width / height, no
// edge padding), so the image scales cleanly at any display height.
const LOGO_STRIP_RATIO = 1974 / 104;

export const TrustedByMarquee: React.FC = () => {
  return (
    <section className="relative w-full bg-white py-16 sm:py-20 overflow-hidden">
      <div className="w-full px-6 sm:px-10 lg:px-[120px] flex flex-col items-center gap-8 sm:gap-10">
        {/* Eyebrow: line — label — line */}
        <div className="flex items-center gap-4 w-full max-w-4xl">
          <span className="flex-1 h-px bg-black/15" />
          <p className="font-grotesque font-medium text-[#0a0a0b] text-xs sm:text-sm tracking-wide uppercase whitespace-nowrap">
            Trusted by educators, students and industry leaders
          </p>
          <span className="flex-1 h-px bg-black/15" />
        </div>

        {/* Headline */}
        <p className="font-grotesque text-2xl sm:text-3xl lg:text-4xl text-center text-[#0a0a0b] leading-snug max-w-5xl">
          Backed by India&rsquo;s Most{' '}
          <span className="font-bold text-[#e7000b]">Trusted Institutions</span> and Global{' '}
          <span className="font-bold text-[#e7000b]">Technology Leaders</span>
        </p>
      </div>

      {/* Moving logo stripe */}
      <div
        className="relative mt-10 sm:mt-12 w-full overflow-hidden"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
        }}
      >
        <div className="marquee-track flex items-center w-max">
          {[0, 1].map((copy) => (
            <img
              key={copy}
              src={LOGO_STRIP_SRC}
              alt={
                copy === 0
                  ? 'Ministry of Education, NITI Aayog, Indian Institutes of Technology, NASSCOM, Google, Microsoft, and AWS'
                  : ''
              }
              aria-hidden={copy === 1}
              // Trailing margin (not a flex `gap`) so each copy — including
              // the last — carries identical spacing. That keeps -50% (one
              // full copy-plus-margin) an exact, seamless loop point; a gap
              // only between items would throw that math off by half a gap.
              className="h-[30px] sm:h-[42px] w-auto shrink-0 mr-10 sm:mr-14"
              style={{ aspectRatio: `${LOGO_STRIP_RATIO}` }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
