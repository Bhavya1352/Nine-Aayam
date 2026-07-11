import React, { useEffect, useRef } from 'react';
import { useCursor } from '../context/CursorContext';
import { ShieldCheck, Cpu } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Boundaries() {
  const { setCursor } = useCursor();
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Header
      gsap.fromTo('.boundaries-header',
        { opacity: 0, y: 28 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true }
        }
      );

      // Cards slide in from sides
      gsap.fromTo('.boundaries-card-left',
        { opacity: 0, x: -40 },
        {
          opacity: 1, x: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 68%', once: true }
        }
      );
      gsap.fromTo('.boundaries-card-right',
        { opacity: 0, x: 40 },
        {
          opacity: 1, x: 0, duration: 0.9, ease: 'power3.out', delay: 0.1,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 68%', once: true }
        }
      );

      // List items stagger
      gsap.fromTo('.boundary-list-item',
        { opacity: 0, x: -12 },
        {
          opacity: 1, x: 0, duration: 0.5, stagger: 0.07, ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 60%', once: true }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="boundaries"
      className="relative z-10 py-16 sm:py-20 px-6 md:px-12 lg:px-16 bg-[#1B1F24]"
    >
      <div className="blueprint-grid-line vertical left-6 md:left-12 lg:left-16 hidden sm:block" />

      <div className="max-w-[1200px] mx-auto relative z-10 pl-0 sm:pl-4 md:pl-8 lg:pl-12">

        <div className="boundaries-header flex flex-col items-start mb-16 max-w-[700px] text-left" style={{ opacity: 0 }}>
          <span className="font-subheading text-[8px] sm:text-[9px] tracking-[0.3em] uppercase font-bold text-gray-500 block mb-3 select-none">
            04 // SCOPE MATRICES
          </span>
          <h3 className="font-heading text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight text-[#F4F1EB] mb-4">
            System Boundaries
          </h3>
          <p className="font-body text-[#C4C8CF] text-sm sm:text-base leading-relaxed">
            We own what customers see, read, and interact with — not the pipelines behind it. Creative front-ends live here; operational systems live elsewhere.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 md:gap-6 lg:gap-10">

          {/* Creative Orbit (In Scope) */}
          <div
            className="boundaries-card-left card-lift bg-[#2C333D] border border-white/[0.08] p-6 sm:p-8 rounded-xl flex flex-col justify-between hover:border-[#C97A3D]/20 transition-all duration-300 shadow-md text-left"
            style={{ opacity: 0 }}
            onMouseEnter={() => setCursor('view')}
            onMouseLeave={() => setCursor('')}
          >
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-full bg-[#C97A3D]/5 text-[#C97A3D] border border-[#C97A3D]/10">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="font-heading text-lg font-semibold text-[#F4F1EB]">Creative Orbit</span>
                  <span className="font-mono text-[8px] uppercase tracking-wider text-[#C97A3D]/60 mt-0.5">
                    NINE AAYAM // IN-SCOPE
                  </span>
                </div>
              </div>

              <p className="font-body text-xs text-[#C4C8CF] leading-relaxed mb-6">
                Everything in the Services Cabinet — identity, collaterals, copy, social, motion, and front-end builds. If it shapes how your brand looks and feels in public, it belongs here.
              </p>

              <ul className="flex flex-col gap-3.5 border-t border-white/[0.04] pt-6 font-body text-xs text-[#F4F1EB]">
                {[
                  "Brand identity, visual systems, and guidelines",
                  "Marketing collaterals, copy, and campaign creatives",
                  "Social, motion, and photography direction",
                  "UI/UX prototypes and handcrafted web front-ends"
                ].map((item, idx) => (
                  <li key={idx} className="boundary-list-item flex items-start gap-2.5" style={{ opacity: 0 }}>
                    <span className="text-[#C97A3D] font-bold select-none mt-0.5">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Operational Engine (Out of Scope) */}
          <div
            className="boundaries-card-right card-lift bg-[#2C333D]/40 border border-white/[0.08] p-6 sm:p-8 rounded-xl flex flex-col justify-between hover:border-[#C97A3D]/10 transition-all duration-300 shadow-md text-left"
            style={{ opacity: 0 }}
            onMouseEnter={() => setCursor('view')}
            onMouseLeave={() => setCursor('')}
          >
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-full bg-white/[0.02] text-gray-500 border border-white/[0.04]">
                  <Cpu className="w-5 h-5" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="font-heading text-lg font-semibold text-gray-400">Operations Engine</span>
                  <span className="font-mono text-[8px] uppercase tracking-wider text-gray-500 mt-0.5">
                    NAYA GROWTH // OUT-OF-SCOPE
                  </span>
                </div>
              </div>

              <p className="font-body text-xs text-[#C4C8CF] leading-relaxed mb-6">
                Operational integrations, tracking scripts, sales pipelines, and database automations handled by separate growth verticals.
              </p>

              <ul className="flex flex-col gap-3.5 border-t border-white/[0.04] pt-6 font-body text-xs text-[#C4C8CF]">
                {[
                  "CRM configuration, pipelines, and customer database setups",
                  "WhatsApp automated flows and trigger integrations",
                  "Pixel event setups, dashboard trackers, lead funnels",
                  "Backend databases, database scripts, customer portals",
                  "Operational lead delivery, dashboard pipelines",
                  "GrowthOS performance analytics operations"
                ].map((item, idx) => (
                  <li key={idx} className="boundary-list-item flex items-start gap-2.5" style={{ opacity: 0 }}>
                    <span className="text-gray-500 font-bold select-none mt-0.5">✗</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
