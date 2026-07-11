import React, { useEffect, useRef } from 'react';
import { useCursor } from '../context/CursorContext';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    code: 'CS_001',
    client: 'FinReach',
    category: 'Brand Identity + Web',
    headline: 'From generic SaaS to category authority',
    desc: 'Complete identity overhaul — positioning, logo system, brand guidelines, and a handcrafted React front-end. CTR improved 3.4× within 60 days of launch.',
    dims: ['Brand Strategy', 'Graphic Design', 'Web Development'],
    result: '3.4× CTR',
    color: '#C97A3D',
  },
  {
    code: 'CS_002',
    client: 'PeakScale',
    category: 'Social + Motion',
    headline: 'LinkedIn authority built from zero',
    desc: 'Monthly social creative system, motion templates, and editorial carousels. Grew from 0 to 450k+ organic impressions across LinkedIn and Instagram.',
    dims: ['Social Media', 'Motion Design', 'Copywriting'],
    result: '450k+ Impressions',
    color: '#E0A96D',
  },
  {
    code: 'CS_003',
    client: 'Confidential',
    category: 'Campaign Creatives',
    headline: 'Launch campaign for D2C product line',
    desc: 'Full paid campaign creative suite — Meta ad sets, offer grids, and landing page copy. Delivered in a 14-day sprint ahead of festive season.',
    dims: ['Ad Campaigns', 'Copywriting', 'Graphic Design'],
    result: '14-Day Sprint',
    color: '#C97A3D',
  },
];

export default function CaseStudies() {
  const { setCursor } = useCursor();
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.cs-header',
        { opacity: 0, y: 24 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', once: true }
        }
      );

      gsap.fromTo('.cs-card',
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.14, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', once: true }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative z-10 py-16 sm:py-20 px-6 md:px-12 lg:px-16 bg-[#252B33] border-t border-white/[0.08] overflow-hidden"
    >
      <div className="blueprint-grid-line vertical left-6 md:left-12 lg:left-16 hidden sm:block" />

      {/* Ambient glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[400px] bg-[#C97A3D]/[0.015] rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-[1200px] mx-auto relative z-10 pl-0 sm:pl-4 md:pl-8 lg:pl-12">

        <div className="cs-header flex flex-col items-start mb-14 md:mb-20 text-left" style={{ opacity: 0 }}>
          <span className="font-subheading text-[8px] sm:text-[9px] tracking-[0.3em] uppercase font-bold text-gray-500 block mb-3 select-none">
            08 // SELECTED WORK
          </span>
          <h3 className="font-heading text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight text-[#F4F1EB] mb-4">
            Case Studies
          </h3>
          <p className="font-body text-[#C4C8CF] text-sm sm:text-base leading-relaxed max-w-[500px]">
            Real outcomes from real engagements. Each project is a dimensional system — not a one-off deliverable.
          </p>
        </div>

        <div className="flex flex-col gap-6 md:gap-8">
          {projects.map((p, idx) => (
            <div
              key={p.code}
              className="cs-card card-lift group bg-[#2C333D] border border-white/[0.08] rounded-2xl p-6 sm:p-8 md:p-10 hover:border-[#C97A3D]/25 transition-all duration-500 text-left"
              style={{ opacity: 0 }}
              onMouseEnter={() => setCursor('view')}
              onMouseLeave={() => setCursor('')}
            >
              <div className="grid md:grid-cols-12 gap-6 md:gap-8 items-start">

                {/* Left meta */}
                <div className="md:col-span-4 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[8px] text-gray-500 uppercase tracking-wider">{p.code}</span>
                    <span className="font-mono text-[8px] text-[#C97A3D]/60 uppercase tracking-wider">{p.category}</span>
                  </div>
                  <h4 className="font-heading text-xl sm:text-2xl md:text-3xl font-medium text-[#F4F1EB] tracking-tight leading-tight">
                    {p.client}
                  </h4>
                  {/* Result badge */}
                  <div className="inline-flex items-center gap-2 mt-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#C97A3D]" />
                    <span className="font-subheading text-[10px] font-bold text-[#C97A3D] tracking-wider uppercase">
                      {p.result}
                    </span>
                  </div>
                </div>

                {/* Right content */}
                <div className="md:col-span-8 flex flex-col justify-between gap-5">
                  <div>
                    <p className="font-heading text-base sm:text-lg italic text-[#E0A96D] mb-3 leading-snug">
                      "{p.headline}"
                    </p>
                    <p className="font-body text-xs sm:text-sm text-[#C4C8CF] leading-relaxed">
                      {p.desc}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.04] pt-5">
                    <div className="flex flex-wrap gap-1.5">
                      {p.dims.map((d) => (
                        <span key={d} className="font-mono text-[7.5px] border border-white/[0.07] text-[#C4C8CF]/60 px-2 py-0.5 rounded">
                          {d}
                        </span>
                      ))}
                    </div>
                    <span className="font-subheading text-[9px] font-bold text-[#C97A3D]/50 uppercase tracking-wider flex items-center gap-1 group-hover:text-[#C97A3D] transition-colors">
                      View Details <ArrowUpRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
