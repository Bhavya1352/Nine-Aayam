import React, { useEffect, useRef } from 'react';
import { useCursor } from '../context/CursorContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    num: '01',
    phase: 'Discovery',
    desc: 'Deep-dive into your brand, market position, competitors, and audience. We map the creative gaps before touching a single pixel.',
    tags: ['Brand audit', 'Competitor scan', 'Audience mapping'],
  },
  {
    num: '02',
    phase: 'Strategy',
    desc: 'We define the creative direction — positioning, tone, visual language, and the dimensional scope that will drive your system.',
    tags: ['Positioning brief', 'Visual direction', 'Scope matrix'],
  },
  {
    num: '03',
    phase: 'Design',
    desc: 'Execution across selected dimensions. Every asset is handcrafted — no templates, no shortcuts. Iterative reviews built in.',
    tags: ['Asset production', 'Iteration cycles', 'Quality gates'],
  },
  {
    num: '04',
    phase: 'Deliver',
    desc: 'Structured handoff with guidelines, source files, and a deployment-ready package. You own everything, completely.',
    tags: ['Source files', 'Brand guidelines', 'Handoff kit'],
  },
];

export default function Process() {
  const { setCursor } = useCursor();
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.process-header',
        { opacity: 0, y: 24 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', once: true }
        }
      );

      gsap.fromTo('.process-step',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.75, stagger: 0.13, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', once: true }
        }
      );

      gsap.fromTo('.process-connector',
        { scaleX: 0, transformOrigin: 'left center' },
        {
          scaleX: 1, duration: 1.2, stagger: 0.13, ease: 'power3.inOut',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 68%', once: true }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="process"
      className="relative z-10 py-16 sm:py-20 px-6 md:px-12 lg:px-16 bg-[#1B1F24] border-t border-white/[0.08] overflow-hidden"
    >
      <div className="blueprint-grid-line vertical left-6 md:left-12 lg:left-16 hidden sm:block" />

      <div className="max-w-[1200px] mx-auto relative z-10 pl-0 sm:pl-4 md:pl-8 lg:pl-12">

        <div className="process-header flex flex-col items-start mb-14 md:mb-20 text-left" style={{ opacity: 0 }}>
          <span className="font-subheading text-[8px] sm:text-[9px] tracking-[0.3em] uppercase font-bold text-gray-500 block mb-3 select-none">
            07 // HOW WE WORK
          </span>
          <h3 className="font-heading text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight text-[#F4F1EB] mb-4">
            The Creative Process
          </h3>
          <p className="font-body text-[#C4C8CF] text-sm sm:text-base leading-relaxed max-w-[500px]">
            Four phases. Zero ambiguity. Every engagement follows the same disciplined architecture — from first brief to final handoff.
          </p>
        </div>

        {/* Steps grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 items-start">
          {steps.map((step, idx) => (
            <div
              key={step.num}
              className="process-step relative flex flex-col text-left"
              style={{ opacity: 0 }}
              onMouseEnter={() => setCursor('view')}
              onMouseLeave={() => setCursor('')}
            >
              {/* Connector line (hidden on last) */}
              {idx < steps.length - 1 && (
                <div className="process-connector hidden lg:block absolute top-[22px] left-full w-full h-[1px] bg-gradient-to-r from-[#C97A3D]/20 to-transparent z-0" style={{ scaleX: 0 }} />
              )}

              {/* Step number node */}
              <div className="flex items-center gap-3 mb-5 relative z-10">
                <div className="w-11 h-11 rounded-full border border-[#C97A3D]/30 bg-[#C97A3D]/5 flex items-center justify-center shrink-0">
                  <span className="font-mono text-[10px] font-bold text-[#C97A3D]">{step.num}</span>
                </div>
                <div className="h-[1px] flex-1 bg-white/[0.04] lg:hidden" />
              </div>

              <span className="font-heading text-lg sm:text-xl font-semibold text-[#F4F1EB] mb-3 tracking-tight">
                {step.phase}
              </span>

              <p className="font-body text-xs sm:text-sm text-[#C4C8CF] leading-relaxed mb-5">
                {step.desc}
              </p>

              <div className="flex flex-wrap gap-1.5 mt-auto">
                {step.tags.map((tag) => (
                  <span key={tag} className="font-mono text-[7.5px] border border-white/[0.07] text-[#C4C8CF]/60 px-2 py-0.5 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
