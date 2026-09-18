import React, { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { CinematicHero } from './components/CinematicHero';
import { TrustedByMarquee } from './components/TrustedByMarquee';
import { ValueProps } from './components/ValueProps';
import { BuiltForTechnology } from './components/BuiltForTechnology';
import { JourneyTimeline } from './components/JourneyTimeline';
import { RecognitionShowcase } from './components/RecognitionShowcase';
import { SeeWhereYouStand } from './components/SeeWhereYouStand';
import { StrongerTogether } from './components/StrongerTogether';
import { FinalCTA } from './components/FinalCTA';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { GetStartedModal } from './components/GetStartedModal';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, useGSAP);

export default function App() {
  const [isGetStartedOpen, setIsGetStartedOpen] = useState<boolean>(false);
  const [smootherReady, setSmootherReady] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const smoother = ScrollSmoother.create({
        wrapper: '#smooth-wrapper',
        content: '#smooth-content',
        smooth: 1.2,
        effects: false,
      });

      // Signal children (the hero's pinned ScrollTrigger) that ScrollSmoother
      // now exists, since it must be created first for pin-spacing to measure
      // scroll distance correctly against the smoothed content.
      setSmootherReady(true);

      return () => smoother.kill();
    },
    { scope: wrapperRef }
  );

  return (
    <div ref={wrapperRef}>
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <div className="min-h-screen w-full bg-dark-studio text-white relative">
            {/* Pinned cinematic scroll-triggered hero */}
            <CinematicHero
              onOpenGetStarted={() => setIsGetStartedOpen(true)}
              smootherReady={smootherReady}
            />
          </div>

          <TrustedByMarquee />

          <ValueProps />

          <BuiltForTechnology onOpenGetStarted={() => setIsGetStartedOpen(true)} />

          <JourneyTimeline
            onOpenGetStarted={() => setIsGetStartedOpen(true)}
            smootherReady={smootherReady}
          />

          <RecognitionShowcase />

          <SeeWhereYouStand />

          <StrongerTogether />

          <FinalCTA onOpenGetStarted={() => setIsGetStartedOpen(true)} />

          <FAQSection />

          <Footer />

          {/* Other sections land here later */}
        </div>
      </div>

      {/* Outside the smoothed content so fixed positioning stays viewport-relative */}
      <GetStartedModal
        isOpen={isGetStartedOpen}
        onClose={() => setIsGetStartedOpen(false)}
      />
    </div>
  );
}
