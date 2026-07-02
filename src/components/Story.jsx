import React, { useEffect, useRef } from 'react';
import { useCursor } from '../context/CursorContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const serviceGridData = [
  {
    num: "01",
    tag: "IDENTITY",
    title: "Brand Strategy & Identity",
    desc: "Brand positioning, logo systems, visual identity guidelines, color palettes, typography rules, brand guidelines, tone of voice, and overall brand direction.",
    bullets: ["Positioning", "Logo Guidelines", "Color Tokens", "Tone of Voice"]
  },
  {
    num: "02",
    tag: "COLLATERAL",
    title: "Graphic Design & Marketing Collateral",
    desc: "Posters, sales profiles, corporate brochures, investor decks, pitch presentations, catalog sheets, standees, and digital/print marketing assets.",
    bullets: ["Pitch Decks", "Brochures", "Corporate Decks", "Sales assets"]
  },
  {
    num: "03",
    tag: "COPYWRITING",
    title: "Content Strategy & Copywriting",
    desc: "Captions, content calendars, website copy, landing page hooks, ad copywriting, scripts, taglines, brand storytelling, founder narratives, and campaign messaging.",
    bullets: ["Storytelling", "Video Scripts", "Landing Page Copy", "Ad Headlines"]
  },
  {
    num: "04",
    tag: "SOCIAL",
    title: "Social Media Creative",
    desc: "Instagram posts, LinkedIn carousels, cohesive story grids, monthly layout templates, reels cover styles, festive campaigns, and testimonials.",
    bullets: ["LinkedIn Editorial", "Instagram Grgrids", "Reels Cover Layouts", "Brand Assets"]
  },
  {
    num: "05",
    tag: "CAMPAIGNS",
    title: "Advertising & Campaign Creatives",
    desc: "Meta ad creative hooks, Google display banners, launch campaigns, festive promotions, campaign concepts, hooks, headlines, and variations packs.",
    bullets: ["High-CTR layouts", "Meta Ad Sets", "Google Display", "Festive Packs"]
  },
  {
    num: "06",
    tag: "MOTION",
    title: "Video, Reels & Motion Design",
    desc: "Reels concepts, stop-scroll video editing, motion graphics overlays, logo animation, cinematic subtitles, explainer videos, and social video ad structures.",
    bullets: ["Reels Pacing", "Cinematic Edits", "Motion Graphic Assets", "Logo Motion"]
  },
  {
    num: "07",
    tag: "PRODUCTION",
    title: "Photography & Art Direction",
    desc: "Conceptual shoot planning, founder portrait guidelines, styling boards, office team shoots, staging rules, visual moodboards, and shot lists.",
    bullets: ["Staging Direction", "Shot Lists", "Visual Moodboards", "Shoot Moods"]
  },
  {
    num: "08",
    tag: "INTERFACE",
    title: "UI/UX Design",
    desc: "Editorial wireframes, interface systems in Figma, responsive structures, client journeys, visual hierarchy, mobile layouts, and design libraries.",
    bullets: ["UI Systems", "Figma Libraries", "User Journeys", "Prototypes"]
  },
  {
    num: "09",
    tag: "ENGINEERING",
    title: "Website & Landing Page Design",
    desc: "High-performance marketing portals, portfolios, campaign landing pages, website redesigns, and front-end creative React web builds.",
    bullets: ["React Front-ends", "Landing Pages", "Creative Code", "WebGL Portals"]
  }
];

export default function Story() {
  const { setCursor } = useCursor();

  // Refs for interactive alignments
  const watermarkRef = useRef(null);
  const scopeCardRef = useRef(null);
  const scopeGlowRef = useRef(null);
  const waterContainerRef = useRef(null);

  const handleWatermarkMouseMove = (e) => {
    const watermark = watermarkRef.current;
    const container = waterContainerRef.current;
    if (!watermark || !container) return;

    const rect = container.getBoundingClientRect();
    const mx = e.clientX - rect.left - rect.width / 2;
    const my = e.clientY - rect.top - rect.height / 2;

    gsap.to(watermark, {
      x: -mx * 0.09,
      y: -my * 0.09,
      duration: 0.6,
      ease: "power2.out"
    });
  };

  const handleWatermarkMouseLeave = () => {
    if (watermarkRef.current) {
      gsap.to(watermarkRef.current, { x: 0, y: 0, duration: 0.8, ease: "power2.out" });
    }
  };

  const handleScopeMouseMove = (e) => {
    const card = scopeCardRef.current;
    const glow = scopeGlowRef.current;
    if (!card || !glow) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    gsap.to(glow, {
      x: x,
      y: y,
      duration: 0.35,
      ease: "power3.out"
    });
  };

  const handleScopeMouseEnter = () => {
    if (scopeGlowRef.current) {
      gsap.to(scopeGlowRef.current, { opacity: 0.12, scale: 1, duration: 0.3 });
    }
  };

  const handleScopeMouseLeave = () => {
    if (scopeGlowRef.current) {
      gsap.to(scopeGlowRef.current, { opacity: 0, scale: 0.5, duration: 0.3 });
    }
  };

  useEffect(() => {
    // 1. Editorial heading reveal
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

    // 2. Services grid boxes staggered slide-up
    gsap.fromTo(".service-cabinet-box",
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".services-grid-trigger",
          start: "top 75%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // 3. In/Out matrix cards reveal
    gsap.fromTo(".matrix-card-trigger",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.0,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".matrix-trigger",
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // 4. Horizontal scroll line draw animation
    gsap.fromTo(".scroll-draw-line",
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 1.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".scroll-draw-line",
          start: "top 92%"
        }
      }
    );
  }, []);

  return (
    <section id="story" className="relative z-10 bg-[#050515] overflow-hidden border-b border-white/[0.02] py-8">
      
      {/* 8. Sanskrit Yantra Geometry background guides */}
      <div className="absolute top-[8%] left-[4%] w-[480px] h-[480px] opacity-[0.015] pointer-events-none select-none z-0 hidden lg:block text-[#c68a2e]">
        <svg viewBox="0 0 200 200" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="0.5">
          <circle cx="100" cy="100" r="80" strokeDasharray="1 3" />
          <circle cx="100" cy="100" r="60" />
          <circle cx="100" cy="100" r="40" strokeDasharray="3 3" />
          <polygon points="100,20 40,120 160,120" />
          <polygon points="100,180 40,80 160,80" />
          <line x1="100" y1="0" x2="100" y2="200" strokeDasharray="1 1" />
          <line x1="0" y1="100" x2="200" y2="100" strokeDasharray="1 1" />
          <rect x="15" y="15" width="170" height="170" strokeDasharray="4 8" />
        </svg>
      </div>

      <div className="absolute bottom-[25%] right-[2%] w-[500px] h-[500px] opacity-[0.015] pointer-events-none select-none z-0 hidden lg:block text-[#c68a2e]">
        <svg viewBox="0 0 200 200" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="0.5">
          <circle cx="100" cy="100" r="90" />
          <circle cx="100" cy="100" r="75" strokeDasharray="2 2" />
          <polygon points="100,30 159,134 41,134" />
          <polygon points="100,170 159,66 41,66" />
          <line x1="29.3" y1="29.3" x2="170.7" y2="170.7" strokeDasharray="2 4" />
          <circle cx="100" cy="100" r="30" />
        </svg>
      </div>

      {/* Blueprint Grid Lines */}
      <div className="blueprint-grid-line vertical left-5 sm:left-6 md:left-16 hidden sm:block" />
      <div className="blueprint-grid-line vertical left-[50%] hidden lg:block" />

      {/* ═══════════════════════════════════════════════════════════
         SECTION 1: PHILOSOPHICAL FOUNDATION
         ═══════════════════════════════════════════════════════════ */}
      <div 
        ref={waterContainerRef}
        onMouseMove={handleWatermarkMouseMove}
        onMouseLeave={handleWatermarkMouseLeave}
        className="editorial-trigger relative pt-4 xs:pt-6 sm:pt-8 md:pt-10 lg:pt-12 pb-10 xs:pb-12 sm:pb-16 md:pb-20 lg:pb-24 px-4 xs:px-5 sm:px-6 md:px-12 lg:px-24 border-b border-white/[0.02] select-none"
      >
        
        {/* Parallax Sanskrit Watermark */}
        <span 
          ref={watermarkRef}
          className="sanskrit-watermark absolute -left-10 bottom-6 font-heading text-[25vw] xs:text-[22vw] sm:text-[18vw] md:text-[15vw] font-bold text-white/[0.007] leading-none pointer-events-none select-none will-change-transform"
        >
          आयाम
        </span>



        {/* Left aligned inner box (Rhythm break) */}
        <div className="max-w-[1200px] mr-auto lg:pl-16 flex flex-col items-start relative z-10">
          
          {/* Large Section Number */}
          <div className="flex flex-col items-start mb-8 font-heading text-[#c68a2e]/85">
            <span className="text-6xl md:text-8xl font-light tracking-tight leading-none">01</span>
            <span className="font-subheading text-[8px] sm:text-[9px] tracking-[0.3em] uppercase mt-4 font-semibold text-gray-500">System Foundation</span>
          </div>

          <h2 className="editorial-text font-heading text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-medium text-white leading-[1.08] tracking-tight max-w-[980px] mb-8 xs:mb-10 translate-x-[3px]">
            A Brand is not flat pixels. It is a multi-dimensional posture scaling in space.
          </h2>

          <div className="w-full flex flex-col md:flex-row md:items-stretch mt-4">
            
            {/* Left description text */}
            <div className="editorial-text max-w-full md:max-w-[450px] text-left">
              <p className="font-body text-gray-200 text-sm xs:text-base sm:text-lg leading-[1.68] mb-5">
                Inspired by the Sanskrit word <strong className="text-[#c68a2e] font-medium font-subheading tracking-[-0.03em] italic">Aayam / आयाम</strong>, meaning <em>dimension, expansion, extension, depth, and aspect</em>. It defines how a structure claims visual territory.
              </p>
            </div>
            
            {/* Vertical construction connector line */}
            <div className="hidden md:block w-[1px] bg-gradient-to-b from-[#c68a2e]/30 via-[#c68a2e]/10 to-transparent mx-8 lg:mx-12 self-stretch" />

            {/* Right quote description */}
            <div className="editorial-text max-w-full md:max-w-[480px] text-left">
              <p className="font-body text-gray-300 text-xs xs:text-sm md:text-base leading-[1.68]">
                Nine Aayam is the creative agency vertical of Naya Growth Private Limited. We own the visible, communicative, UI/UX, and experience-driven side of brand growth, aligning nine core dimensions into a single creative system.
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════
         SECTION 2: THE NINE DIMENSIONS CABINET GRID
         ═══════════════════════════════════════════════════════════ */}
      <div id="services" className="services-grid-trigger relative pt-10 xs:pt-12 sm:pt-16 md:pt-20 lg:pt-24 pb-10 xs:pb-12 sm:pb-16 md:pb-20 lg:pb-24 px-4 xs:px-5 sm:px-6 md:px-12 lg:px-16 border-b border-white/[0.02]">
        


        <div className="max-w-[1400px] mx-auto relative z-10">
          
          {/* Header block with editorial layout */}
          <div className="flex flex-col items-start mb-14 sm:mb-20">
            <div className="flex flex-col items-start mb-8 font-heading text-[#c68a2e]/85">
              <span className="text-6xl md:text-8xl font-light tracking-tight leading-none">02</span>
              <span className="font-subheading text-[8px] sm:text-[9px] tracking-[0.3em] uppercase mt-4 font-semibold text-gray-500">Capabilities Cabinet</span>
            </div>
            <h3 className="font-heading text-2xl xs:text-3xl sm:text-4xl font-medium tracking-tight text-white mb-5">
              The Nine Creative Dimensions
            </h3>
            <p className="font-body text-gray-300 text-xs xs:text-sm sm:text-base leading-[1.68] max-w-[500px]">
              Every strong brand grows through coordinate alignment. These are the nine public-facing service menus built to shape modern brands.
            </p>
          </div>

          {/* Grid cabinets with varied heights and tactile depth gradients */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
            {serviceGridData.map((item, idx) => {
              const cardOffsetPadding = idx % 3 === 0 ? "pt-7 pb-6 min-h-[220px]" 
                                      : idx % 3 === 1 ? "pt-5 pb-7 min-h-[235px]" 
                                      : "pt-8 pb-5 min-h-[210px]";

              return (
                <div
                  key={idx}
                  className={`service-cabinet-box bg-gradient-to-b from-[#0d0c24]/90 via-[#0a0a1f]/95 to-[#050515]/98 border border-[#c68a2e]/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.04),inset_0_-1px_12px_rgba(0,0,0,0.8),0_15px_30px_rgba(0,0,0,0.6)] p-6 rounded-lg relative overflow-hidden transition-all duration-[400ms] ease-[cubic-bezier(.22,.61,.36,1)] hover:border-[#c68a2e]/35 group hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(0,0,0,0.7)] cursor-none ${cardOffsetPadding}`}
                  onMouseEnter={() => setCursor('view')}
                  onMouseLeave={() => setCursor('')}
                >
                  {/* corner angle markers */}
                  <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-white/5 group-hover:border-[#c68a2e]/30" />
                  <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-white/5 group-hover:border-[#c68a2e]/30" />
                  <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-white/5 group-hover:border-[#c68a2e]/30" />
                  <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-white/5 group-hover:border-[#c68a2e]/30" />

                  {/* Rotating compass SVG reticle inside box */}
                  <svg className="absolute right-4 bottom-4 w-12 h-12 opacity-[0.02] group-hover:opacity-[0.14] group-hover:scale-105 transition-all duration-[600ms] pointer-events-none" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" stroke="#c68a2e" strokeWidth="0.8" fill="none" strokeDasharray="3 6" className="origin-center animate-[spin_30s_linear_infinite]" />
                    <line x1="10" y1="50" x2="90" y2="50" stroke="#c68a2e" strokeWidth="0.5" />
                    <line x1="50" y1="10" x2="50" y2="90" stroke="#c68a2e" strokeWidth="0.5" />
                  </svg>



                  <div className="flex flex-col justify-between h-full relative z-10">
                    <div>
                      <span className="font-subheading text-[8px] font-bold tracking-[0.25em] text-[#c68a2e] block mb-3">
                        {item.tag}
                      </span>
                      <h4 className="font-heading text-lg sm:text-xl font-medium text-white mb-2 leading-snug group-hover:text-[#c68a2e] group-hover:translate-x-1 transition-all duration-300">
                        {item.title}
                      </h4>
                      <p className="font-body text-xs text-gray-200 leading-[1.6] mb-4">
                        {item.desc}
                      </p>
                    </div>

                    {/* Bullet badges */}
                    <div className="flex flex-wrap gap-1.5 mt-auto">
                      {item.bullets.map((b, i) => (
                        <span key={i} className="font-subheading text-[7px] sm:text-[7.5px] bg-white/[0.01] border border-white/[0.04] text-white/45 px-2 py-0.5 rounded tracking-wide uppercase">
                          {b}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════
         SECTION 3: SCOPE MATRIX (CREATIVE IN VS OPS OUT)
         ═══════════════════════════════════════════════════════════ */}
      {/* Right aligned outer layout (Rhythm Break) */}
      <div className="matrix-trigger relative pt-10 xs:pt-12 sm:pt-16 md:pt-20 lg:pt-24 pb-20 xs:pb-24 sm:pb-32 md:pb-44 lg:pb-52 px-4 xs:px-5 sm:px-6 md:px-12 lg:px-16 bg-[#050515]">
        


        <div className="max-w-[1200px] mx-auto relative z-10">
          
          {/* Header block with editorial layout pushed to right */}
          <div className="flex flex-col items-end text-end ml-auto max-w-[700px] mb-14 sm:mb-20 pr-4 md:pr-12">
            <div className="flex flex-col items-end mb-8 font-heading text-[#c68a2e]/85">
              <span className="text-6xl md:text-8xl font-light tracking-tight leading-none">03</span>
              <span className="font-subheading text-[8px] sm:text-[9px] tracking-[0.3em] uppercase mt-4 font-semibold text-gray-500">Operational Boundaries</span>
            </div>
            <h3 className="font-heading text-2xl xs:text-3xl sm:text-4xl font-medium tracking-tight text-white mb-5">
              Scope Matrix Alignment
            </h3>
            <p className="font-body text-gray-300 text-xs xs:text-sm sm:text-base leading-[1.68] max-w-[600px]">
              We believe in extreme focus. We own the visible experience of brand growth, while backend systems remain independent.
            </p>
          </div>

          {/* Matrix Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 xs:gap-12">
            
            {/* Column A: In-Scope (Nine Aayam Creative System) */}
            <div 
              ref={scopeCardRef}
              onMouseMove={handleScopeMouseMove}
              onMouseEnter={handleScopeMouseEnter}
              onMouseLeave={handleScopeMouseLeave}
              className="matrix-card-trigger bg-gradient-to-b from-[#0d0c24]/90 via-[#0a0a1f]/95 to-[#050515]/98 border border-[#c68a2e]/15 p-6 sm:p-8 rounded-lg relative overflow-hidden group hover:border-[#c68a2e]/30 transition-all duration-500 shadow-[inset_0_1px_1px_rgba(255,255,255,0.04),inset_0_-1px_12px_rgba(0,0,0,0.8),0_15px_30px_rgba(0,0,0,0.5)]"
            >
              {/* Cursor tracking radial light overlay */}
              <div 
                ref={scopeGlowRef}
                className="absolute pointer-events-none w-72 h-72 bg-[#c68a2e] rounded-full filter blur-[100px] opacity-0 -translate-x-1/2 -translate-y-1/2 will-change-transform z-0"
              />

              <div className="absolute top-0 right-0 bg-[#c68a2e]/10 text-[#c68a2e] text-[8px] font-subheading tracking-widest font-bold px-3 py-1.5 uppercase border-b border-l border-[#c68a2e]/15 rounded-bl select-none">
                IN-SYSTEM
              </div>

              <div className="flex items-center gap-2 mb-6 relative z-10">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c68a2e] live-badge-pulse" />
                <h4 className="font-heading text-xl font-medium text-white select-none">Creative Scope</h4>
              </div>

              <p className="font-body text-xs text-gray-200 leading-[1.6] mb-6 relative z-10 select-none">
                The sensory, visible, and interactive assets that establish authority, command customer attention, and shape digital trust.
              </p>

              <ul className="flex flex-col gap-3.5 border-t border-white/[0.04] pt-6 font-body text-xs text-gray-200 relative z-10">
                <li className="flex items-start gap-2">
                  <span className="text-[#c68a2e] font-bold select-none">✓</span>
                  <span>Brand Strategy, Logos, Guidelines, Guidelines Assets</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c68a2e] font-bold select-none">✓</span>
                  <span>Graphic Design, Sales Decks, Company Profiles</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c68a2e] font-bold select-none">✓</span>
                  <span>Copywriting, ad scripts, storytelling copy calendars</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c68a2e] font-bold select-none">✓</span>
                  <span>Instagram, LinkedIn creatives, custom Reels templates</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c68a2e] font-bold select-none">✓</span>
                  <span>UI/UX prototype wireframes, design systems in Figma</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c68a2e] font-bold select-none">✓</span>
                  <span>High-performance front-end creative code, Web builds</span>
                </li>
              </ul>
            </div>

            {/* Column B: Out-of-Scope */}
            <div className="matrix-card-trigger bg-[#050515] border border-white/[0.04] p-6 sm:p-8 rounded-lg relative overflow-hidden group hover:border-white/[0.08] transition-all duration-500 shadow-[0_15px_30px_rgba(0,0,0,0.5)]">
              
              <div className="absolute top-0 right-0 bg-white/[0.01] text-gray-500 text-[8px] font-subheading tracking-widest font-bold px-3 py-1.5 uppercase border-b border-l border-white/[0.03] rounded-bl select-none">
                OUT-SYSTEM
              </div>

              <div className="flex items-center gap-2 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-600" />
                <h4 className="font-heading text-xl font-medium text-gray-500 select-none">Operational Scope</h4>
              </div>

              <p className="font-body text-xs text-gray-300 leading-[1.6] mb-6 select-none">
                Operational integrations, tracking scripts, sales pipelines, and database automations handled by separate growth verticals.
              </p>

              <ul className="flex flex-col gap-3.5 border-t border-white/[0.04] pt-6 font-body text-xs text-gray-400">
                <li className="flex items-start gap-2">
                  <span className="text-gray-600 font-bold select-none">✗</span>
                  <span>CRM setup, pipelines, and customer database setups</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-600 font-bold select-none">✗</span>
                  <span>WhatsApp automated flows and trigger integrations</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-600 font-bold select-none">✗</span>
                  <span>Pixel event setups, dashboard trackers, lead funnels</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-600 font-bold select-none">✗</span>
                  <span>Backend databases, databases scripts, customer portals</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-600 font-bold select-none">✗</span>
                  <span>Operational lead delivery, dashboards pipelines</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-600 font-bold select-none">✗</span>
                  <span>GrowthOS performance analytics operations</span>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
