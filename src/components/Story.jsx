import React, { useEffect, useRef } from 'react';
import { useCursor } from '../context/CursorContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Story() {
  const { setCursor } = useCursor();
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Section header
      gsap.fromTo('.story-header',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', once: true }
        }
      );

      // Cards stagger with ScrollTrigger batch for performance
      ScrollTrigger.batch('.asym-card', {
        start: 'top 88%',
        onEnter: (els) => {
          gsap.fromTo(els,
            { opacity: 0, y: 45 },
            { opacity: 1, y: 0, duration: 0.75, stagger: 0.09, ease: 'power3.out' }
          );
        },
        once: true
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="services" className="relative z-10 bg-[#1B1F24] overflow-hidden border-b border-white/[0.02] py-2">

      {/* ═══════════════════════════════════════════════════════════
         SECTION 2: ASYMMETRICAL EDITORIAL CABINET (Redesigned Asymmetric Sizes)
         ═══════════════════════════════════════════════════════════ */}
      <div className="grid-trigger relative pt-16 pb-28 md:pt-20 md:pb-36 px-6 md:px-12 lg:px-16">
        
        <div className="max-w-[1200px] mx-auto relative z-10">
          
          {/* Section Header */}
          <div className="story-header flex flex-col items-start mb-16 md:mb-24 text-left pl-0 sm:pl-4 md:pl-8 lg:pl-12" style={{ opacity: 0 }}>
            <div className="flex flex-col items-start mb-6 font-heading text-[#C97A3D]">
              <span className="text-6xl md:text-7xl font-light tracking-tight leading-none">02</span>
              <span className="font-subheading text-[8px] sm:text-[9px] tracking-[0.3em] uppercase mt-4 font-semibold text-gray-500">Service Cabinet</span>
            </div>
            <h3 className="font-heading text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight text-[#F4F1EB] mb-4">
              The Nine Creative Dimensions
            </h3>
            <p className="font-body text-[#C4C8CF] text-sm sm:text-base leading-relaxed max-w-[500px]">
              Every strong brand grows through coordinate alignment. These are the nine public-facing service menus built to shape modern brands.
            </p>
          </div>

          {/* Asymmetrical layout: Completely custom card sizes (No repeated grids) */}
          <div className="flex flex-col gap-8 items-stretch">
            
            {/* Block 1: Brand Strategy (Full-width custom split layout) */}
            <div 
              className="asym-card card-lift w-full bg-[#2C333D] border border-white/[0.08] p-6 sm:p-8 md:p-10 lg:p-12 rounded-2xl hover:border-[#C97A3D]/30 transition-all duration-500 shadow-md text-left"
              onMouseEnter={() => setCursor('view')}
              onMouseLeave={() => setCursor('')}
            >
              <div className="grid md:grid-cols-12 gap-6 md:gap-8 items-start">
                <div className="md:col-span-5 flex flex-col items-start">
                  <span className="font-heading text-4xl sm:text-5xl font-light text-[#C97A3D] mb-4">01</span>
                  <span className="font-subheading text-[9px] font-bold text-gray-400 tracking-widest uppercase mb-2">Dimension Zero One</span>
                  <h4 className="font-heading text-2xl sm:text-3xl font-medium text-[#F4F1EB] tracking-tight leading-tight">
                    Brand Strategy & Identity
                  </h4>
                </div>

                <div className="md:col-span-7 flex flex-col justify-between h-full">
                  <p className="font-body text-xs sm:text-sm text-[#C4C8CF] leading-relaxed mb-6">
                    Defining who you are, how you speak, and how you look in the digital landscape. We craft the strategic DNA that guides all visual outputs and brand communication.
                  </p>
                  <blockquote className="font-heading text-base sm:text-lg italic text-[#E0A96D] border-l-2 border-[#C97A3D]/40 pl-4 mb-6">
                    "A logo is not a brand. It is the visible posture of your strategic intent."
                  </blockquote>
                  <div className="flex flex-wrap gap-2 border-t border-white/[0.04] pt-4">
                    {["Positioning", "Logo direction", "Color theory", "Brand guidelines"].map((b, i) => (
                      <span key={i} className="font-mono text-[8px] bg-white/[0.02] border border-white/[0.08] text-[#C4C8CF] px-2.5 py-0.5 rounded-full">
                        {b}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Row of asymmetric boxes (Block 2 & 3) */}
            <div className="grid md:grid-cols-12 gap-6 md:gap-8 items-stretch">
              
              {/* Block 2: Graphic Design (Tall, 5 columns) */}
              <div 
                className="asym-card card-lift md:col-span-5 bg-[#2C333D] border border-white/[0.08] p-6 sm:p-8 md:p-10 rounded-2xl hover:border-[#C97A3D]/30 transition-all duration-500 shadow-md text-left flex flex-col justify-between"
                onMouseEnter={() => setCursor('view')}
                onMouseLeave={() => setCursor('')}
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="font-heading text-2xl font-light text-[#C97A3D]">02</span>
                    <span className="font-mono text-[8px] text-gray-500">SYS_GDC // 02</span>
                  </div>
                  <h4 className="font-heading text-xl sm:text-2xl font-semibold text-[#F4F1EB] mb-4">
                    Graphic Design & Marketing Collaterals
                  </h4>
                  <p className="font-body text-xs text-[#C4C8CF] leading-relaxed mb-6">
                    Premium visual assets engineered to elevate corporate profiles, catalog sheets, sales assets, and investor presentations into category-leading statements.
                  </p>
                </div>
                <div className="flex flex-col gap-2 border-t border-white/[0.04] pt-6 font-mono text-[9px] text-[#C4C8CF]">
                  <div>• Sales & pitch decks</div>
                  <div>• Profiles & flyers</div>
                  <div>• Banners & catalog books</div>
                </div>
              </div>

              {/* Block 3: Copywriting (Landscape, 7 columns) */}
              <div 
                className="asym-card card-lift md:col-span-7 bg-[#2C333D] border border-white/[0.08] p-6 sm:p-8 md:p-10 rounded-2xl hover:border-[#C97A3D]/30 transition-all duration-500 shadow-md text-left flex flex-col justify-between"
                onMouseEnter={() => setCursor('view')}
                onMouseLeave={() => setCursor('')}
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="font-heading text-2xl font-light text-[#C97A3D]">03</span>
                    <span className="font-mono text-[8px] text-gray-500">SYS_CSC // 03</span>
                  </div>
                  <h4 className="font-heading text-xl sm:text-2xl font-semibold text-[#F4F1EB] mb-4">
                    Content Strategy & Copywriting
                  </h4>
                  <p className="font-body text-xs text-[#C4C8CF] leading-relaxed mb-6">
                    High-impact language that moves beyond passive reading. We construct campaign headlines, taglines, scripts, and brand narratives designed to convert.
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5 border-t border-white/[0.04] pt-6">
                  {["Landing Page Copy", "Founder story", "Ad script hooks"].map((b, i) => (
                    <span key={i} className="font-mono text-[7.5px] bg-white/[0.01] border border-white/[0.08] text-[#C4C8CF] px-2.5 py-0.5 rounded">
                      {b}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* Row of three asymmetric boxes (Block 4, 5, 6) */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-stretch">
              
              {/* Block 4: Social Media Creative */}
              <div 
                className="asym-card card-lift bg-[#2C333D] border border-white/[0.08] p-8 rounded-2xl hover:border-[#C97A3D]/30 transition-all duration-500 shadow-md text-left flex flex-col justify-between"
              >
                <div>
                  <span className="font-heading text-lg font-light text-[#C97A3D] block mb-4">04 // SOCIAL</span>
                  <h4 className="font-heading text-lg font-semibold text-[#F4F1EB] mb-3">Social Media Creative</h4>
                  <p className="font-body text-xs text-[#C4C8CF] leading-relaxed">
                    Building active, premium authority across Instagram and LinkedIn. We design cohesive layouts and templates that stand out.
                  </p>
                </div>
                <div className="border-t border-white/[0.04] pt-4 mt-6 font-mono text-[7.5px] text-[#C4C8CF]">
                  LinkedIn posts • Carousels • Festive setups
                </div>
              </div>

              {/* Block 5: Paid Ads Creative */}
              <div 
                className="asym-card card-lift bg-[#2C333D] border border-white/[0.08] p-8 rounded-2xl hover:border-[#C97A3D]/30 transition-all duration-500 shadow-md text-left flex flex-col justify-between"
              >
                <div>
                  <span className="font-heading text-lg font-light text-[#C97A3D] block mb-4">05 // CAMPAIGNS</span>
                  <h4 className="font-heading text-lg font-semibold text-[#F4F1EB] mb-3">Paid Campaign Creatives</h4>
                  <p className="font-body text-xs text-[#C4C8CF] leading-relaxed">
                    Strategic paid traffic creatives designed to hook attention. We balance CTR visual layouts with copywriting hooks for conversion.
                  </p>
                </div>
                <div className="border-t border-white/[0.04] pt-4 mt-6 font-mono text-[7.5px] text-[#C4C8CF]">
                  Meta ad sets • Google search • Offer grids
                </div>
              </div>

              {/* Block 6: Photo Direction */}
              <div 
                className="asym-card card-lift bg-[#2C333D] border border-white/[0.08] p-8 rounded-2xl hover:border-[#C97A3D]/30 transition-all duration-500 shadow-md text-left flex flex-col justify-between"
              >
                <div>
                  <span className="font-heading text-lg font-light text-[#C97A3D] block mb-4">07 // PRODUCTION</span>
                  <h4 className="font-heading text-lg font-semibold text-[#F4F1EB] mb-3">Photo & Art Direction</h4>
                  <p className="font-body text-xs text-[#C4C8CF] leading-relaxed">
                    Coordination staging that makes photography look intentional. We build styling boards, shot list directions, and founder portrait profiles.
                  </p>
                </div>
                <div className="border-t border-white/[0.04] pt-4 mt-6 font-mono text-[7.5px] text-[#C4C8CF]">
                  Shoot guidelines • Styling rules • Shot lists
                </div>
              </div>

            </div>

            {/* Block 7: Video, Reels & Motion (Wide 8 Columns equivalent layout) */}
            <div className="grid md:grid-cols-12 gap-6 md:gap-8 items-stretch">
              
              {/* Left Side: Video (Wide, 8 Columns) */}
              <div 
                className="asym-card card-lift md:col-span-8 bg-[#2C333D] border border-white/[0.08] p-8 sm:p-10 rounded-2xl hover:border-[#C97A3D]/30 transition-all duration-500 shadow-md text-left flex flex-col justify-between"
                onMouseEnter={() => setCursor('view')}
                onMouseLeave={() => setCursor('')}
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="font-heading text-2xl font-light text-[#C97A3D]">06</span>
                    <span className="font-mono text-[8px] text-gray-500">SYS_VRM // 06</span>
                  </div>
                  <h4 className="font-heading text-xl sm:text-2xl font-semibold text-[#F4F1EB] mb-4">
                    Video, Reels & Motion Design
                  </h4>
                  <p className="font-body text-xs sm:text-sm text-[#C4C8CF] leading-relaxed">
                    Cinematic vertical pacing and animated layouts built for modern social feeds. We turn static ideas into fluid motion assets, reels concepts, explainer animations, and logo loop guidelines.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 border-t border-white/[0.04] pt-6 mt-6">
                  {["Reel concepts", "Cinematic cuts", "Animated loop assets"].map((item, idx) => (
                    <span key={idx} className="font-mono text-[8px] border border-white/[0.08] text-gray-400 px-2 py-0.5 rounded">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Side: UI/UX & Web (Narrower, 4 Columns) */}
              <div 
                className="asym-card card-lift md:col-span-4 bg-[#2C333D] border border-[#C97A3D]/20 p-8 rounded-2xl hover:border-[#C97A3D] transition-all duration-500 shadow-md text-left flex flex-col justify-between"
                onMouseEnter={() => setCursor('view')}
                onMouseLeave={() => setCursor('')}
              >
                <div>
                  <span className="font-heading text-lg font-light text-[#C97A3D] block mb-4">08-09 // ENGINEERING</span>
                  <h4 className="font-heading text-lg sm:text-xl font-semibold text-[#F4F1EB] mb-3">UI/UX & Web Builds</h4>
                  <p className="font-body text-xs text-[#C4C8CF] leading-relaxed">
                    Connecting interactive user journeys in Figma directly to custom-coded, light-weight React front-ends. Handcrafted with zero templates.
                  </p>
                </div>
                <div className="border-t border-white/[0.04] pt-4 mt-6 font-mono text-[8px] text-[#C97A3D] font-bold">
                  Figma systems • React front-ends
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
