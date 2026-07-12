import React, { useEffect, useRef } from 'react';
import { useCursor } from '../context/CursorContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Manifesto() {
  const { setCursor } = useCursor();
  const containerRef = useRef(null);
  const watermarkRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      gsap.to(watermarkRef.current, {
        y: -100,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom', end: 'bottom top',
          scrub: 1.2
        }
      });

      // Eyebrow + line
      gsap.fromTo('.mf-eyebrow',
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: containerRef.current, start: 'top 75%', once: true } }
      );

      // Big quote — word by word
      gsap.fromTo('.mf-word',
        { opacity: 0, y: 30, skewY: 1.5 },
        { opacity: 1, y: 0, skewY: 0, duration: 0.9, stagger: 0.04, ease: 'power3.out',
          scrollTrigger: { trigger: containerRef.current, start: 'top 68%', once: true } }
      );

      // Body columns
      gsap.fromTo('.mf-body',
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: containerRef.current, start: 'top 60%', once: true } }
      );

      // Divider line draw
      gsap.fromTo('.mf-line',
        { scaleX: 0, transformOrigin: 'left center' },
        { scaleX: 1, duration: 1.4, ease: 'power3.inOut',
          scrollTrigger: { trigger: containerRef.current, start: 'top 62%', once: true } }
      );

    }, containerRef);
    return () => ctx.revert();
  }, []);

  const quoteWords = "A Brand is not flat pixels. It is a multi-dimensional posture scaling in space.".split(' ');

  return (
    <section
      ref={containerRef}
      id="manifesto"
      className="relative z-10 overflow-hidden bg-[#050505] py-16 sm:py-20 md:py-24 select-none"
    >
      {/* Watermark */}
      <span
        ref={watermarkRef}
        className="absolute -left-8 bottom-0 font-heading font-bold leading-none pointer-events-none select-none text-white/[0.018]"
        style={{ fontSize: 'clamp(8rem, 22vw, 22rem)' }}
      >
        आयाम
      </span>

      {/* Left accent line */}
      <div className="absolute left-0 top-0 bottom-0 w-[1px]"
        style={{ background: 'linear-gradient(to bottom, transparent, rgba(201,122,61,0.08) 30%, rgba(201,122,61,0.08) 70%, transparent)' }} />

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20 relative z-10">

        {/* Eyebrow row */}
        <div className="mf-eyebrow flex items-center gap-5 mb-10 md:mb-14 opacity-0">
          <span className="font-heading text-[3rem] sm:text-[4rem] font-light text-[#C97A3D]/70 leading-none">आयाम</span>
          <div className="flex flex-col gap-1">
            <span className="font-mono text-[8px] tracking-[0.4em] text-[#C97A3D]/50 uppercase">Philosophical Anchor</span>
            <span className="font-mono text-[8px] tracking-[0.3em] text-[#C4C8CF]/30 uppercase">Dimension / आयाम</span>
          </div>
        </div>

        {/* Big editorial quote */}
        <div
          className="mb-14 md:mb-20"
          onMouseEnter={() => setCursor('read')}
          onMouseLeave={() => setCursor('')}
        >
          <h2 className="font-heading font-medium text-[#F4F1EB] leading-[1.1] tracking-tight max-w-[900px]"
            style={{ fontSize: 'clamp(1.4rem, 3.5vw, 3.8rem)' }}>
            {quoteWords.map((word, i) => (
              <span key={i} className="mf-word inline-block mr-[0.22em] opacity-0"
                style={{ color: word === 'multi-dimensional' ? '#C97A3D' : undefined }}>
                {word}
              </span>
            ))}
          </h2>
        </div>

        {/* Divider */}
        <div className="mf-line w-full h-[1px] bg-white/[0.07] mb-12 md:mb-16" style={{ scaleX: 0 }} />

        {/* Two-column body */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 lg:gap-24">
          <p className="mf-body font-body text-sm leading-[1.85] text-[#F4F1EB]/80 opacity-0">
            Design systems should establish spatial authority, not just arrange components. We shape the visible, tactile, and interactive sensory front-end representing your identity to the market.
          </p>
          <div className="mf-body opacity-0">
            <p className="font-body text-sm leading-[1.85] text-[#C4C8CF]/80 mb-6">
              Operations stay behind the curtain. What faces the market — layouts, language, motion, and interfaces — is what we engineer to feel custom, handcrafted, and structurally complete.
            </p>
            <a href="#philosophy"
              className="inline-flex items-center gap-2 font-mono text-[9px] tracking-[0.3em] text-[#C97A3D]/70 uppercase hover:text-[#C97A3D] transition-colors group">
              <span>Explore the system</span>
              <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" viewBox="0 0 12 12" fill="none">
                <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
