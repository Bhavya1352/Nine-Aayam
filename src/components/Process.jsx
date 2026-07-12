import React, { useEffect, useRef } from 'react';
import { useCursor } from '../context/CursorContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    num: '01', phase: 'Discovery',
    desc: 'Deep-dive into your brand, market position, competitors, and audience. We map the creative gaps before touching a single pixel.',
    tags: ['Brand audit', 'Competitor scan', 'Audience mapping'],
  },
  {
    num: '02', phase: 'Strategy',
    desc: 'We define the creative direction — positioning, tone, visual language, and the dimensional scope that will drive your system.',
    tags: ['Positioning brief', 'Visual direction', 'Scope matrix'],
  },
  {
    num: '03', phase: 'Design',
    desc: 'Execution across selected dimensions. Every asset is handcrafted — no templates, no shortcuts. Iterative reviews built in.',
    tags: ['Asset production', 'Iteration cycles', 'Quality gates'],
  },
  {
    num: '04', phase: 'Deliver',
    desc: 'Structured handoff with guidelines, source files, and a deployment-ready package. You own everything, completely.',
    tags: ['Source files', 'Brand guidelines', 'Handoff kit'],
  },
];

export default function Process() {
  const { setCursor } = useCursor();
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.pr-hdr',
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', once: true } }
      );
      gsap.fromTo('.pr-step',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.85, stagger: 0.14, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', once: true } }
      );
      gsap.fromTo('.pr-line',
        { scaleX: 0, transformOrigin: 'left center' },
        { scaleX: 1, duration: 1.6, ease: 'power3.inOut',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 65%', once: true } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="process"
      className="relative z-10 bg-[#1B1F24] overflow-hidden">

      <div className="w-full h-[1px]"
        style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.05) 30%, rgba(255,255,255,0.05) 70%, transparent)' }} />

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20 py-20 sm:py-28 md:py-36">

        {/* Header */}
        <div className="pr-hdr grid md:grid-cols-12 gap-8 items-end mb-16 md:mb-24 opacity-0">
          <div className="md:col-span-6">
            <span className="font-mono text-[8px] tracking-[0.4em] text-[#C97A3D]/60 uppercase block mb-4">
              07 — How We Work
            </span>
            <h3 className="font-heading font-medium text-[#F4F1EB] tracking-tight leading-none"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.8rem)' }}>
              The Creative<br /><span className="italic text-[#C97A3D]">Process</span>
            </h3>
          </div>
          <p className="md:col-span-6 font-body text-sm text-[#C4C8CF]/55 leading-relaxed">
            Four phases. Zero ambiguity. Every engagement follows the same disciplined architecture — from first brief to final handoff.
          </p>
        </div>

        {/* Timeline connector — desktop only */}
        <div className="hidden lg:block relative mb-0">
          <div className="pr-line absolute top-[28px] left-[28px] right-[28px] h-[1px] bg-gradient-to-r from-[#C97A3D]/30 via-[#C97A3D]/15 to-[#C97A3D]/30" style={{ scaleX: 0 }} />
        </div>

        {/* Steps */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6 items-start">
          {steps.map((step, idx) => (
            <div key={step.num}
              className="pr-step relative flex flex-col opacity-0"
              onMouseEnter={() => setCursor('view')}
              onMouseLeave={() => setCursor('')}>

              {/* Number node */}
              <div className="relative z-10 mb-6">
                <div className="w-14 h-14 border border-[#C97A3D]/25 bg-[#1B1F24] flex items-center justify-center relative"
                  style={{ clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))' }}>
                  <span className="font-mono text-[11px] font-bold text-[#C97A3D]">{step.num}</span>
                </div>
                {/* Vertical connector — mobile */}
                {idx < steps.length - 1 && (
                  <div className="lg:hidden absolute left-7 top-full w-[1px] h-8 bg-gradient-to-b from-[#C97A3D]/20 to-transparent" />
                )}
              </div>

              <span className="font-heading text-xl md:text-2xl font-semibold text-[#F4F1EB] mb-3 tracking-tight">
                {step.phase}
              </span>

              <p className="font-body text-xs text-[#C4C8CF]/60 leading-relaxed mb-5 flex-1">
                {step.desc}
              </p>

              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/[0.05]">
                {step.tags.map((tag) => (
                  <span key={tag} className="font-mono text-[7.5px] border border-white/[0.07] text-[#C4C8CF]/40 px-2 py-0.5 hover:border-[#C97A3D]/30 hover:text-[#C97A3D]/60 transition-colors">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA strip */}
        <div className="mt-16 md:mt-20 pt-10 border-t border-white/[0.05] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <p className="font-body text-sm text-[#C4C8CF]/50 max-w-[400px]">
            Ready to activate your creative system? Configure your brief and we'll respond within 24 hours.
          </p>
          <a href="#configurator"
            className="group inline-flex items-center gap-2.5 font-mono text-[9px] tracking-[0.3em] text-[#C97A3D] uppercase hover:text-[#E0A96D] transition-colors shrink-0">
            <span>Build Your Brief</span>
            <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" viewBox="0 0 12 12" fill="none">
              <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>

      </div>
    </section>
  );
}
