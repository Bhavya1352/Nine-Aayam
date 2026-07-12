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
        { opacity: 0, y: 30, x: -15 },
        { opacity: 1, y: 0, x: 0, duration: 1.0, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', once: true } }
      );
      gsap.fromTo('.pr-step',
        { opacity: 0, y: 55, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 0.9, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', once: true } }
      );
      gsap.fromTo('.pr-line',
        { scaleX: 0, transformOrigin: 'left center' },
        { scaleX: 1, duration: 1.8, ease: 'power3.inOut',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 65%', once: true } }
      );
      gsap.fromTo('.pr-progress',
        { width: '0%' },
        { width: '100%', duration: 2.0, ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 60%', once: true } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="process"
      className="relative z-10 bg-[#1B1F24] overflow-hidden">

      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[25%] right-[-5%] w-[50vw] h-[60vh] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(201,122,61,0.02) 0%, transparent 60%)' }} />
        <div className="absolute bottom-[15%] left-[-10%] w-[45vw] h-[55vh] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(37,43,51,0.75) 0%, transparent 65%)' }} />
      </div>


      <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20 py-12 sm:py-16 md:py-20">

        {/* Header */}
        <div className="pr-hdr grid md:grid-cols-12 gap-8 items-end mb-14 md:mb-18 opacity-0">
          <div className="md:col-span-6">
            <span className="font-mono text-[9px] tracking-[0.45em] text-[#C97A3D]/70 uppercase block mb-4 font-semibold">
              07 — How We Work
            </span>
            <h3 className="font-heading font-medium text-[#F4F1EB] tracking-tight leading-none"
              style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3.5rem)' }}>
              The Creative <span className="italic text-[#C97A3D]">Process</span>
            </h3>
          </div>
          <p className="md:col-span-6 font-body text-sm text-[#C4C8CF]/55 leading-relaxed">
            Four phases. Zero ambiguity. Every engagement follows the same disciplined architecture — from first brief to final handoff.
          </p>
        </div>

        {/* Timeline connector — desktop only with progress */}
        <div className="hidden lg:block relative mb-0">
          <div className="pr-line absolute top-[32px] left-[32px] right-[32px] h-[2px] bg-gradient-to-r from-[#C97A3D]/40 via-[#C97A3D]/20 to-[#C97A3D]/40" style={{ scaleX: 0 }} />
          <div className="pr-progress absolute top-[32px] left-[32px] h-[2px] bg-gradient-to-r from-[#C97A3D] to-[#E0A96D]" style={{ width: '0%' }} />
        </div>

        {/* Steps */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6 items-start">
          {steps.map((step, idx) => (
            <div key={step.num}
              className="pr-step relative flex flex-col opacity-0"
              onMouseEnter={() => setCursor('view')}
              onMouseLeave={() => setCursor('')}>

              {/* Number node with enhanced styling */}
              <div className="relative z-10 mb-7">
                <div className="w-16 h-16 border border-[#C97A3D]/30 bg-gradient-to-br from-[#252B33] to-[#1B1F24] flex items-center justify-center relative group-hover:border-[#C97A3D]/50 transition-colors duration-500"
                  style={{ 
                    clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)'
                  }}>
                  <span className="font-mono text-[12px] font-bold text-[#C97A3D] group-hover:text-[#E0A96D] transition-colors duration-300">{step.num}</span>
                </div>
                {/* Vertical connector — mobile */}
                {idx < steps.length - 1 && (
                  <div className="lg:hidden absolute left-8 top-full w-[1px] h-10 bg-gradient-to-b from-[#C97A3D]/30 to-transparent" />
                )}
              </div>

              <span className="font-heading text-2xl md:text-3xl font-semibold text-[#F4F1EB] mb-4 tracking-tight group-hover:text-[#E0A96D]/80 transition-colors duration-300">
                {step.phase}
              </span>

              <p className="font-body text-xs text-[#C4C8CF]/65 leading-relaxed mb-6 flex-1">
                {step.desc}
              </p>

              <div className="flex flex-wrap gap-2 pt-5">
                {step.tags.map((tag) => (
                  <span key={tag} className="font-mono text-[8px] bg-white/[0.02] text-[#C4C8CF]/45 px-3 py-1.5 hover:bg-[#C97A3D]/10 hover:text-[#C97A3D]/70 transition-all duration-300">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA strip */}
        <div className="mt-20 md:mt-24 pt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
          <p className="font-body text-sm text-[#C4C8CF]/55 max-w-[420px]">
            Ready to activate your creative system? Configure your brief and we'll respond within 24 hours.
          </p>
          <a href="#configurator"
            className="group inline-flex items-center gap-3 font-mono text-[10px] tracking-[0.35em] text-[#C97A3D] uppercase hover:text-[#E0A96D] transition-colors shrink-0">
            <span>Build Your Brief</span>
            <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" viewBox="0 0 12 12" fill="none">
              <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>

      </div>
    </section>
  );
}
