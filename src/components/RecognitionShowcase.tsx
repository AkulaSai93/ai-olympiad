import React, { useState } from 'react';

interface Panel {
  label: string;
  description: string;
  peekBg: string;
  image: string;
  // Left offset (px) for the image while this panel is collapsed (120px
  // wide) — the image itself is always rendered at its full 270px width, so
  // animating this value alongside the panel's width is what "reveals" more
  // of the same fixed photo instead of re-cropping/re-centering it.
  collapsedImageLeft: number;
}

const PANELS: Panel[] = [
  {
    label: 'NATIONAL RANKING',
    description: 'See where you stand among the brightest minds across India.',
    peekBg: '#f2f1f3',
    image: '/images/recognition-1-ranking.png',
    collapsedImageLeft: -75,
  },
  {
    label: 'Official Certificate',
    description:
      'Get a certificate to validate your skills and achievement. A recognition of your potential and hard work.',
    peekBg: '#f0ece9',
    image: '/images/recognition-2-certificate.png',
    collapsedImageLeft: -30,
  },
  {
    label: 'NATIONAL FINAL',
    description: 'Top performers progress to the offline final and compete on a national stage.',
    peekBg: '#e6dfd5',
    image: '/images/recognition-3-final.png',
    collapsedImageLeft: -42,
  },
  {
    label: 'Future Pathways',
    description:
      'Gain visibility, connect with like-minded peers, and unlock new learning opportunities.',
    peekBg: '#d4d5da',
    image: '/images/recognition-4-pathways.png',
    collapsedImageLeft: -120,
  },
];

const EXPANDED_W = 270;
const COLLAPSED_W = 120;
const PANEL_H = 364;

export const RecognitionShowcase: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="relative w-full bg-white py-16 sm:py-20 lg:py-28">
      <div className="w-full px-6 sm:px-10 lg:px-[120px] flex flex-col lg:flex-row gap-12 lg:gap-8 items-center">
        {/* Left: headline + description */}
        <div className="flex flex-col gap-5 w-full lg:max-w-[450px] shrink-0">
          <p className="font-grotesque font-semibold text-3xl sm:text-4xl lg:text-[40px] leading-tight text-[#0a0a0b]">
            Your effort deserves
            <br />
            <span className="text-[#e7000b]">recognition.</span>
          </p>
          <p className="font-grotesque text-base sm:text-lg text-[#0a0a0b]/80 max-w-[447px]">
            AI Genius Olympiad is more than a competition — it&rsquo;s an opportunity to
            showcase your potential and open doors to new possibilities.
          </p>
        </div>

        {/* Right: hover-to-expand panel gallery */}
        <div
          className="flex gap-4 sm:gap-6 items-center overflow-x-auto lg:overflow-visible"
          onMouseLeave={() => setActiveIndex(0)}
        >
          {PANELS.map((panel, i) => {
            const isActive = i === activeIndex;
            return (
              <div
                key={panel.label}
                onMouseEnter={() => setActiveIndex(i)}
                className="relative shrink-0 overflow-hidden transition-[width] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
                style={{
                  width: isActive ? EXPANDED_W : COLLAPSED_W,
                  height: PANEL_H,
                  backgroundColor: panel.peekBg,
                }}
              >
                <img
                  loading="lazy"
                  decoding="async"
                  src={panel.image}
                  alt={panel.label}
                  className="absolute top-1/2 -translate-y-1/2 max-w-none w-[270px] h-[405px] object-cover transition-[left] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
                  style={{ left: isActive ? 0 : panel.collapsedImageLeft }}
                />

                {/* Top-down gradient for text legibility. Plain inline
                    linear-gradient (sRGB) — Tailwind v4's bg-gradient-to-b
                    utility interpolates `in oklab` by default, which washes
                    the midtone out to gray instead of a clean black fade. */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'linear-gradient(to bottom, rgb(0,0,0) 0%, rgba(0,0,0,0) 100%)',
                  }}
                />

                {/* Collapsed: vertical rotated label, anchored near the top
                    (14px), not vertically centered in the panel. Matches
                    Figma exactly: the label WRAPS within a 94px width
                    (no nowrap) rather than staying on one line — forcing it
                    to one line is what was pushing long labels like
                    "Official Certificate" way past the panel and clipping. */}
                <div
                  className="absolute left-3.5 top-3.5 w-11 h-[94px] flex items-center justify-center transition-opacity duration-300"
                  style={{ opacity: isActive ? 0 : 1 }}
                >
                  <span className="-rotate-90 font-grotesque font-semibold text-lg text-white w-[94px]">
                    {panel.label}
                  </span>
                </div>

                {/* Expanded: horizontal title + description */}
                <div
                  className="absolute inset-0 flex flex-col gap-3 items-start p-3.5 transition-opacity duration-300"
                  style={{ opacity: isActive ? 1 : 0 }}
                >
                  <p className="font-grotesque font-semibold text-lg text-white whitespace-nowrap">
                    {panel.label}
                  </p>
                  <p className="font-grotesque text-base text-white leading-snug">
                    {panel.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
