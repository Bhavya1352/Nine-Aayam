import React, { useEffect, useRef } from 'react';
import { useCursor } from '../context/CursorContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const inScope = [
  'Brand identity, visual systems & guidelines',
  'Marketing collaterals, copy & campaign creatives',
  'Social media, motion & photography direction',
  'UI/UX prototypes & handcrafted web front-ends',
];

const outScope = [
  'CRM configuration, pipelines & customer databases',
  'WhatsApp automated flows & trigger integrations',
  'Pixel event setups, dashboard trackers, lead funnels',
  'Backend databases, scripts & customer portals',
  'Operational lead delivery & dashboard pipelines',
  'GrowthOS performance analytics operations',
];

export default function Boundaries() {
  const { setCursor } = useCursor();
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.bd-hdr',
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true } }
      );
      gsap.fromTo('.bd-left',
        { opacity: 0, x: -36 },
        { opacity: 1, x: 0, duration: 1.0, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 68%', once: true } }
      );
      gsap.fromTo('.bd-right',
        { opacity: 0, x: 36 },
        { opacity: 1, x: 0, duration: 1.0, ease: 'power3.out', delay: 0.08,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 68%', once: true } }
      );
      gsap.fromTo('.bd-item',
        { opacity: 0, x: -10 },
        { opacity: 1, x: 0, duration: 0.5, stagger: 0.06, ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 60%', once: true } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="boundaries"
      className="relative z-10 bg-[#1B1F24] overflow-hidden">

      <div className="w-full h-[1px]"
        style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.05) 30%, rgba(255,255,255,0.05) 70%, transparent)' }} />

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20 py-20 sm:py-28 md:py-36">

        {/* Header */}
        <div className="bd-hdr mb-16 md:mb-24 opacity-0">
          <span className="font-mono text-[8px] tracking-[0.4em] text-[#C97A3D]/60 uppercase block mb-4">
            04 — Scope Matrices
          </span>
          <div className="flex flex-col md:flex-row md:items-end gap-6 md:gap-16">
            <h3 className="font-heading font-medium text-[#F4F1EB] tracking-tight leading-none shrink-0"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.8rem)' }}>
              System<br /><span className="italic text-[#C97A3D]">Boundaries</span>
            </h3>
            <p className="font-body text-sm text-[#C4C8CF]/55 leading-relaxed max-w-[440px]">
              We own what customers see, read, and interact with — not the pipelines behind it. Creative front-ends live here; operational systems live elsewhere.
            </p>
          </div>
        </div>

        {/* Split layout */}
        <div className="grid md:grid-cols-2 gap-0">

          {/* In-scope — lit panel */}
          <div className="bd-left opacity-0 relative p-8 md:p-12 border border-[#C97A3D]/15 bg-[#C97A3D]/[0.03]"
            style={{ clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 0 100%)' }}
            onMouseEnter={() => setCursor('view')}
            onMouseLeave={() => setCursor('')}>

            {/* Top label bar */}
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-[#C97A3D]/15">
              <div>
                <span className="font-heading text-lg font-semibold text-[#F4F1EB] block">Creative Orbit</span>
                <span className="font-mono text-[7px] tracking-[0.35em] text-[#C97A3D]/50 uppercase mt-1 block">
                  Nine Aayam — In Scope
                </span>
              </div>
              <div className="w-8 h-8 border border-[#C97A3D]/30 flex items-center justify-center">
                <span className="font-mono text-[9px] text-[#C97A3D] font-bold">✓</span>
              </div>
            </div>

            <p className="font-body text-xs text-[#C4C8CF]/65 leading-relaxed mb-8">
              Everything in the Services Cabinet — identity, collaterals, copy, social, motion, and front-end builds. If it shapes how your brand looks and feels in public, it belongs here.
            </p>

            <ul className="flex flex-col gap-4">
              {inScope.map((item, i) => (
                <li key={i} className="bd-item flex items-start gap-3 opacity-0">
                  <span className="w-4 h-4 border border-[#C97A3D]/40 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-[#C97A3D] text-[8px] font-bold">✓</span>
                  </span>
                  <span className="font-body text-xs text-[#F4F1EB]/80 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Out-of-scope — dim panel */}
          <div className="bd-right opacity-0 relative p-8 md:p-12 border border-white/[0.05] bg-[#1B1F24] md:border-l-0"
            style={{ clipPath: 'polygon(16px 0, 100% 0, 100% calc(100% - 16px), calc(100% - 0px) 100%, 0 100%, 0 16px)' }}
            onMouseEnter={() => setCursor('view')}
            onMouseLeave={() => setCursor('')}>

            <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/[0.05]">
              <div>
                <span className="font-heading text-lg font-semibold text-[#C4C8CF]/50 block">Operations Engine</span>
                <span className="font-mono text-[7px] tracking-[0.35em] text-[#C4C8CF]/25 uppercase mt-1 block">
                  Naya Growth — Out of Scope
                </span>
              </div>
              <div className="w-8 h-8 border border-white/[0.06] flex items-center justify-center">
                <span className="font-mono text-[9px] text-[#C4C8CF]/30 font-bold">✗</span>
              </div>
            </div>

            <p className="font-body text-xs text-[#C4C8CF]/40 leading-relaxed mb-8">
              Operational integrations, tracking scripts, sales pipelines, and database automations handled by separate growth verticals.
            </p>

            <ul className="flex flex-col gap-4">
              {outScope.map((item, i) => (
                <li key={i} className="bd-item flex items-start gap-3 opacity-0">
                  <span className="w-4 h-4 border border-white/[0.06] flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-[#C4C8CF]/25 text-[8px] font-bold">✗</span>
                  </span>
                  <span className="font-body text-xs text-[#C4C8CF]/35 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}
