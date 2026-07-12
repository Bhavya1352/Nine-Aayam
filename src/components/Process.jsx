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
    icon: (
      <svg className="w-5 h-5 text-[#C97A3D]/70 group-hover:text-[#C97A3D] transition-colors duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
        <path d="M11 8a3 3 0 0 0-3 3" strokeDasharray="1.5 1.5" />
      </svg>
    )
  },
  {
    num: '02', phase: 'Strategy',
    desc: 'We define the creative direction — positioning, tone, visual language, and the dimensional scope that will drive your system.',
    tags: ['Positioning brief', 'Visual direction', 'Scope matrix'],
    icon: (
      <svg className="w-5 h-5 text-[#C97A3D]/70 group-hover:text-[#C97A3D] transition-colors duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5" />
        <line x1="12" y1="2" x2="12" y2="22" strokeDasharray="2 2" />
        <circle cx="12" cy="12" r="3" fill="#C97A3D" />
      </svg>
    )
  },
  {
    num: '03', phase: 'Design',
    desc: 'Execution across selected dimensions. Every asset is handcrafted — no templates, no shortcuts. Iterative reviews built in.',
    tags: ['Asset production', 'Iteration cycles', 'Quality gates'],
    icon: (
      <svg className="w-5 h-5 text-[#C97A3D]/70 group-hover:text-[#C97A3D] transition-colors duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    )
  },
  {
    num: '04', phase: 'Deliver',
    desc: 'Structured handoff with guidelines, source files, and a deployment-ready package. You own everything, completely.',
    tags: ['Source files', 'Brand guidelines', 'Handoff kit'],
    icon: (
      <svg className="w-5 h-5 text-[#C97A3D]/70 group-hover:text-[#C97A3D] transition-colors duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    )
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
          scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true } }
      );
      gsap.fromTo('.pr-step',
        { opacity: 0, y: 55, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 0.9, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true } }
      );
      gsap.fromTo('.pr-trail-line',
        { strokeDashoffset: 1500 },
        { 
          strokeDashoffset: 0, 
          ease: 'none',
          scrollTrigger: { 
            trigger: sectionRef.current, 
            start: 'top 75%', 
            end: 'bottom 85%', 
            scrub: 1.2 
          } 
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="process"
      className="relative z-10 bg-[#050505] overflow-hidden py-16 sm:py-20 md:py-24">

      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[25%] right-[-5%] w-[50vw] h-[60vh] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(201,122,61,0.02) 0%, transparent 60%)' }} />
        <div className="absolute bottom-[15%] left-[-10%] w-[45vw] h-[55vh] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(37,43,51,0.75) 0%, transparent 65%)' }} />
      </div>


      <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20 py-0">

        {/* Header */}
        <div className="pr-hdr grid md:grid-cols-12 gap-8 items-end mb-14 md:mb-18 opacity-0">
          <div className="md:col-span-6">
            <span className="font-mono text-[9px] tracking-[0.45em] text-[#C97A3D]/70 uppercase block mb-4 font-semibold">
              04 — How We Work
            </span>
            <h3 className="font-heading font-medium text-[#F4F1EB] tracking-tight leading-none"
              style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3.5rem)' }}>
              The Creative <span className="italic text-[#C97A3D]">Process</span>
            </h3>
          </div>
          <p className="md:col-span-6 font-body text-sm text-[#C4C8CF]/80 leading-relaxed">
            Four phases. Zero ambiguity. Every engagement follows the same disciplined architecture — from first brief to final handoff.
          </p>
        </div>

        {/* Curved Path timeline visual */}
        <div className="relative w-full h-[64px] mb-8 hidden lg:block select-none pointer-events-none">
          <svg className="w-full h-[64px]" viewBox="0 0 1200 64" fill="none" preserveAspectRatio="none">
            <defs>
              <filter id="glow-filter" x="-10%" y="-10%" width="120%" height="120%">
                <feGaussianBlur stdDeviation="3.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            {/* Background path trail */}
            <path
              d="M 150,32 C 225,48 375,16 450,32 C 525,48 675,16 750,32 C 825,48 975,16 1050,32"
              stroke="rgba(255,255,255,0.02)"
              strokeWidth="2.5"
            />
            {/* Animated drawing pathway */}
            <path
              className="pr-trail-line"
              d="M 150,32 C 225,48 375,16 450,32 C 525,48 675,16 750,32 C 825,48 975,16 1050,32"
              stroke="#C97A3D"
              strokeWidth="2.5"
              strokeDasharray="1500"
              strokeDashoffset="1500"
            />

            {/* Glowing particle flowing infinitely on path */}
            <circle r="4" fill="#F4F1EB" filter="url(#glow-filter)">
              <animateMotion
                dur="8s"
                repeatCount="indefinite"
                path="M 150,32 C 225,48 375,16 450,32 C 525,48 675,16 750,32 C 825,48 975,16 1050,32"
              />
            </circle>
          </svg>
        </div>

        {/* Steps — Premium Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6 items-stretch">
          {steps.map((step) => (
            <ProcessCard key={step.num} step={step} setCursor={setCursor} />
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

function ProcessCard({ step, setCursor }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    
    const angleX = -(yc - y) / (yc / 6);
    const angleY = (x - xc) / (xc / 6);

    gsap.to(card, {
      rotationX: angleX,
      rotationY: angleY,
      scale: 1.015,
      ease: 'power2.out',
      duration: 0.5,
      transformPerspective: 800,
      overwrite: 'auto'
    });
  };

  const handleMouseLeave = () => {
    setCursor('');
    const card = cardRef.current;
    if (!card) return;
    gsap.to(card, {
      rotationX: 0,
      rotationY: 0,
      scale: 1,
      ease: 'power3.out',
      duration: 0.8,
      overwrite: 'auto'
    });
  };

  return (
    <div
      ref={cardRef}
      className="pr-step group relative flex flex-col p-6 md:p-8 rounded-xl bg-gradient-to-br from-[#121212]/60 to-[#050505]/30 border border-white/[0.02] hover:border-[#C97A3D]/30 shadow-[0_8px_30px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.01)] hover:shadow-[0_25px_55px_rgba(0,0,0,0.5)] transition-[border-color,box-shadow] duration-300 overflow-hidden opacity-0"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setCursor('view')}
      onMouseLeave={handleMouseLeave}
    >
      {/* Card Hover Glow Background */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: 'radial-gradient(circle at 10% 20%, rgba(201,122,61,0.04) 0%, transparent 60%)' }} />

      {/* Header with number */}
      <div className="flex items-center justify-between mb-6">
        {/* Number node with enhanced styling */}
        <div className="relative z-10">
          <div className="w-12 h-12 border border-[#C97A3D]/20 bg-gradient-to-br from-[#121212] to-[#050505] flex items-center justify-center relative group-hover:border-[#C97A3D]/50 transition-colors duration-500 shadow-inner"
            style={{ 
              clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))'
            }}>
            <span className="font-mono text-[11px] font-bold text-[#C97A3D] group-hover:text-[#E0A96D] transition-colors duration-300">{step.num}</span>
          </div>
        </div>
      </div>

      {/* Title & Description */}
      <span className="font-heading text-2xl md:text-2xl font-semibold text-[#F4F1EB] mb-4 tracking-tight group-hover:text-[#E0A96D] transition-colors duration-300">
        {step.phase}
      </span>

      <p className="font-body text-xs text-[#C4C8CF]/80 group-hover:text-[#F4F1EB]/90 leading-relaxed mb-6 flex-1">
        {step.desc}
      </p>

      {/* Bottom Tags */}
      <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/[0.03] mt-auto">
        {step.tags.map((tag) => (
          <span key={tag} className="font-mono text-[7px] bg-[#050505]/40 text-[#C4C8CF]/50 px-2.5 py-1 border border-white/[0.04] hover:border-[#C97A3D]/20 hover:bg-[#C97A3D]/5 hover:text-[#C97A3D] transition-all duration-300">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
