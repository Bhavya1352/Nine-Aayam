import React, { useEffect, useRef } from 'react';
import { useCursor } from '../context/CursorContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Manifesto() {
  const { setCursor } = useCursor();
  const watermarkRef = useRef(null);
  const containerRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Watermark parallax
      gsap.to(watermarkRef.current, {
        y: -80,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.8
        }
      });

      // Horizontal divider line draw
      gsap.fromTo(lineRef.current,
        { scaleX: 0, transformOrigin: 'left center' },
        {
          scaleX: 1,
          duration: 1.2,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 70%',
            once: true
          }
        }
      );

      // Left column — Sanskrit word drops in
      gsap.fromTo('.manifesto-left',
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 1.0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 72%',
            once: true
          }
        }
      );

      // Right column items stagger up
      gsap.fromTo('.manifesto-reveal-item',
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.14,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 68%',
            once: true
          }
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="manifesto"
      className="relative z-10 py-16 sm:py-20 md:py-24 px-6 md:px-12 lg:px-16 bg-[#1B1F24] overflow-hidden select-none"
    >
      <span
        ref={watermarkRef}
        className="sanskrit-watermark absolute -left-12 bottom-4 font-heading text-[25vw] font-bold text-white/[0.005] leading-none pointer-events-none select-none"
      >
        आयाम
      </span>

      <div className="blueprint-grid-line vertical left-6 md:left-12 lg:left-16 hidden sm:block" />

      <div className="max-w-[1400px] mx-auto relative z-10 pl-0 sm:pl-4 md:pl-8 lg:pl-12">
        <div className="grid md:grid-cols-12 gap-8 md:gap-10 lg:gap-16 items-start">
          
          <div className="manifesto-left md:col-span-4 flex flex-col items-start text-left" style={{ opacity: 0 }}>
            <span className="font-heading text-6xl sm:text-7xl md:text-8xl font-light text-[#C97A3D] leading-none opacity-80">
              आयाम
            </span>
            <span className="font-subheading text-[8px] sm:text-[9px] tracking-[0.3em] uppercase mt-4 font-bold text-gray-500">
              PHILOSOPHICAL ANCHOR
            </span>
          </div>

          <div 
            className="md:col-span-8 flex flex-col items-start text-left"
            onMouseEnter={() => setCursor('read')}
            onMouseLeave={() => setCursor('')}
          >
            <h2 className="manifesto-reveal-item font-heading text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-medium text-[#F4F1EB] leading-[1.12] tracking-tight max-w-[850px] mb-8" style={{ opacity: 0 }}>
              A Brand is not flat pixels. It is a multi-dimensional posture scaling in space.
            </h2>
            
            <div ref={lineRef} className="w-full h-[1px] bg-white/[0.08] mb-0" style={{ scaleX: 0 }} />

            <div className="w-full grid sm:grid-cols-2 gap-6 sm:gap-8 pt-6 sm:pt-8">
              <div className="manifesto-reveal-item" style={{ opacity: 0 }}>
                <p className="font-body text-[#F4F1EB] text-sm leading-[1.68]">
                  Design systems should establish spatial authority, not just arrange components. We shape the visible, tactile, and interactive sensory front-end representing your identity to the market.
                </p>
              </div>
              <div className="manifesto-reveal-item" style={{ opacity: 0 }}>
                <p className="font-body text-[#C4C8CF] text-xs leading-[1.68]">
                  Operations stay behind the curtain. What faces the market — layouts, language, motion, and interfaces — is what we engineer to feel custom, handcrafted, and structurally complete.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
