import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Story() {
  useEffect(() => {
    gsap.fromTo(".editorial-text",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1.0,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".editorial-trigger",
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    gsap.fromTo(".reveal-card",
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".cards-trigger",
          start: "top 75%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, []);

  return (
    <section id="story" className="relative z-10 bg-[#040c08] overflow-hidden">
      
      {/* Blueprint Grid */}
      <div className="blueprint-grid-line vertical left-5 sm:left-6 md:left-16 hidden sm:block" />
      <div className="blueprint-grid-line vertical left-[55%] hidden lg:block" />
      
      {/* ═══════════════════════════════════════════════════════════
         EDITORIAL SECTION — What is Aayam
         ═══════════════════════════════════════════════════════════ */}
      <div className="editorial-trigger relative py-14 xs:py-18 sm:py-24 md:py-32 lg:py-40 px-4 xs:px-5 sm:px-6 md:px-12 lg:px-24 border-b border-white/[0.02]">
        
        {/* Sanskrit Watermark */}
        <span className="absolute -left-10 bottom-6 font-heading text-[25vw] xs:text-[22vw] sm:text-[18vw] md:text-[15vw] font-bold text-white/[0.008] leading-none pointer-events-none select-none">
          आयाम
        </span>

        {/* Vertical Editorial Label — desktop only */}
        <div className="absolute right-6 md:right-16 top-24 hidden lg:flex items-center gap-4 origin-right rotate-90 translate-x-[40%] translate-y-[200%] select-none pointer-events-none">
          <span className="w-12 h-[1px] bg-white/20" />
          <span className="font-subheading text-[8px] font-bold tracking-[0.4em] text-gray-500 uppercase">
            [ 01 / GEOMETRIC POSTURE ]
          </span>
        </div>

        <div className="max-w-[1200px] mx-auto flex flex-col items-start relative z-10">
          <span className="font-subheading text-[0.6rem] xs:text-[0.65rem] sm:text-[0.7rem] font-bold tracking-[0.3em] xs:tracking-[0.4em] text-[#10B981] uppercase mb-4 xs:mb-6 sm:mb-8">
            01 • Editorial Definition
          </span>

          <h2 className="editorial-text font-heading text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-medium text-white leading-[1.05] tracking-tight max-w-[950px] mb-6 xs:mb-8 sm:mb-10 md:mb-12">
            A Brand is a physical presence in a digital landscape.
          </h2>

          <div className="w-full flex flex-col md:flex-row md:justify-end mt-2 xs:mt-4">
            <div className="editorial-text max-w-full md:max-w-[550px] text-left mr-0 md:mr-16">
              <p className="font-body text-gray-400 text-sm xs:text-base sm:text-lg leading-relaxed mb-4 xs:mb-6">
                Derived from Sanskrit, <strong className="text-white font-medium">Aayam</strong> represents <em>dimension, expansion, extension, depth, and aspect</em>. It defines how a structure scales in space.
              </p>
              <p className="font-body text-gray-500 text-xs xs:text-sm md:text-base leading-relaxed">
                We do not view design as flat pixels. Modern businesses require structural weight, layout tension, and visual gravity to command space in a user's mind and establish market leadership.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════
         OVERLAPPING CARDS — Why Nine Dimensions
         ═══════════════════════════════════════════════════════════ */}
      <div className="cards-trigger relative py-14 xs:py-18 sm:py-24 md:py-32 lg:py-44 px-4 xs:px-5 sm:px-6 md:px-12 lg:px-16 bg-[#08140f]/20">
        
        <div className="blueprint-grid-line horizontal top-0" />
        <div className="blueprint-grid-line horizontal bottom-0" />

        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 xs:gap-10 sm:gap-12 items-start relative z-10">
          
          {/* Left Column */}
          <div className="lg:col-span-5 flex flex-col items-start pl-0 sm:pl-4 md:pl-8 lg:pl-12">
            <span className="font-subheading text-[0.6rem] xs:text-[0.65rem] sm:text-[0.7rem] font-bold tracking-[0.3em] xs:tracking-[0.4em] text-[#10B981] uppercase mb-4 xs:mb-5 sm:mb-6">
              02 • System Rationale
            </span>
            <h3 className="font-heading text-xl xs:text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight text-white mb-3 xs:mb-4 sm:mb-5 md:mb-6 leading-tight">
              Why Nine
              <br />
              Dimensions?
            </h3>
            <p className="font-body text-gray-400 text-xs xs:text-sm sm:text-base leading-relaxed max-w-[360px] mb-5 xs:mb-6 sm:mb-8">
              Growth is non-linear. To build enterprise brand equity, you must project value across nine creative axes in absolute coordination.
            </p>
            
            {/* Visual Accent — laptops+ only */}
            <div className="hidden lg:flex items-center gap-3 border-l border-[#10B981]/25 pl-6 py-2 select-none">
              <span className="font-heading text-4xl font-bold text-white/10 leading-none">09</span>
              <span className="font-subheading text-[8px] font-bold tracking-[0.25em] text-gray-600 uppercase">
                Axis System
              </span>
            </div>
          </div>

          {/* Right Column — Cards */}
          <div className="lg:col-span-7 flex flex-col gap-0 relative w-full pt-2 xs:pt-4 sm:pt-6 md:pt-0">
            
            {/* Background 9D watermark */}
            <span className="absolute -left-10 top-1/2 -translate-y-1/2 font-heading text-[8rem] sm:text-[12rem] md:text-[18rem] lg:text-[24rem] font-bold text-[#10B981]/[0.012] leading-none pointer-events-none select-none hidden sm:block">
              9D
            </span>

            {/* Card 1 */}
            <div className="reveal-card bg-[#040c08] border border-white/[0.04] p-5 xs:p-6 sm:p-8 md:p-10 rounded-lg max-w-full sm:max-w-[460px] relative z-10 shadow-2xl transition-all duration-300 hover:border-[#10B981]/30">
              <span className="font-heading text-[10px] xs:text-xs font-bold text-[#10B981] tracking-widest uppercase block mb-3 xs:mb-4">[ 01 / POSITIONING ]</span>
              <h4 className="font-heading text-lg xs:text-xl font-semibold text-white mb-3 xs:mb-4">Determine Voice</h4>
              <p className="font-body text-[11px] xs:text-xs md:text-sm text-gray-450 leading-relaxed">
                Before the visuals are drawn, strategy sets the coordinates. It shapes how your brand positions itself against competitors and communicates value.
              </p>
            </div>

            {/* Card 2 — overlap right */}
            <div className="reveal-card -mt-2 xs:-mt-4 sm:-mt-8 md:-mt-10 ml-0 sm:ml-auto bg-[#040c08] border border-white/[0.04] p-5 xs:p-6 sm:p-8 md:p-10 rounded-lg max-w-full sm:max-w-[460px] relative z-20 shadow-[0_20px_50px_rgba(0,0,0,0.8)] transition-all duration-300 hover:border-[#10B981]/30">
              <span className="font-heading text-[10px] xs:text-xs font-bold text-[#10B981] tracking-widest uppercase block mb-3 xs:mb-4">[ 02 / AESTHETICS ]</span>
              <h4 className="font-heading text-lg xs:text-xl font-semibold text-white mb-3 xs:mb-4">Dictate Presence</h4>
              <p className="font-body text-[11px] xs:text-xs md:text-sm text-gray-450 leading-relaxed">
                Design is the physical footprint. We sculpt high-contrast editorial branding, premium motion elements, and photography guidelines to command visual trust.
              </p>
            </div>

            {/* Card 3 — overlap left */}
            <div className="reveal-card -mt-2 xs:-mt-4 sm:-mt-8 md:-mt-10 mr-0 sm:mr-auto bg-[#040c08] border border-white/[0.04] p-5 xs:p-6 sm:p-8 md:p-10 rounded-lg max-w-full sm:max-w-[460px] relative z-30 shadow-[0_25px_60px_rgba(0,0,0,0.9)] transition-all duration-300 hover:border-[#10B981]/30">
              <span className="font-heading text-[10px] xs:text-xs font-bold text-[#10B981] tracking-widest uppercase block mb-3 xs:mb-4">[ 03 / CONVERSION ]</span>
              <h4 className="font-heading text-lg xs:text-xl font-semibold text-white mb-3 xs:mb-4">Direct Gaze</h4>
              <p className="font-body text-[11px] xs:text-xs md:text-sm text-gray-450 leading-relaxed">
                High-performance code compiles design into human action. We build pixel-perfect front-ends designed for speed, fluidity, and maximum client intent.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
