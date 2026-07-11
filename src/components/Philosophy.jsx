import React, { useState, useRef, useEffect } from 'react';
import { useCursor } from '../context/CursorContext';
import gsap from 'gsap';

const dimensionData = {
  1: {
    num: "01",
    title: "Brand Strategy & Identity",
    short: "Defining who you are, how you speak, and how you look in the digital landscape. We craft the strategic DNA that guides all visual outputs.",
    capabilities: [
      "Brand positioning & verbal strategy",
      "Logo systems & visual guidelines",
      "Color theory, type rules & tokens",
      "Tone of voice and editorial guidelines"
    ]
  },
  2: {
    num: "02",
    title: "Graphic Design",
    short: "Premium visual assets engineered to elevate corporate decks, collateral, and marketing assets into industry-leading design statements.",
    capabilities: [
      "Corporate profiles & sales sheets",
      "Business pitch decks & presentations",
      "Product catalogs & investor reports",
      "Exhibition layouts & print collateral"
    ]
  },
  3: {
    num: "03",
    title: "Content & Copywriting",
    short: "High-impact language that moves beyond passive reading. We construct campaigns, brand scripts, and taglines designed to hook and convert.",
    capabilities: [
      "Founder narrative storytelling",
      "High-converting landing page copy",
      "Video scripts & brand hooks",
      "Campaign headlines & slogans"
    ]
  },
  4: {
    num: "04",
    title: "Social Media Creative",
    short: "Building an active, premium presence across Instagram and LinkedIn. We design structured assets to command category authority.",
    capabilities: [
      "LinkedIn editorial carousels",
      "Instagram grid structures & designs",
      "Cohesive reels cover frameworks",
      "Monthly brand operation templates"
    ]
  },
  5: {
    num: "05",
    title: "Ad Campaigns",
    short: "Strategic paid traffic creatives designed to stand out. We balance visual hook-rates with copy angles to secure maximum ROI.",
    capabilities: [
      "High-converting Meta ad structures",
      "Google Display Network layout assets",
      "Festive launch campaign suites",
      "A/B creative testing system assets"
    ]
  },
  6: {
    num: "06",
    title: "Video & Motion Design",
    short: "Motion systems and vertical content pacing built for modern channels. We turn static brand stories into high-tempo, narrative assets.",
    capabilities: [
      "LinkedIn dynamic video templates",
      "Subtle cinematic reel treatments",
      "Subtitles layout & timing direction",
      "Interactive social media animations"
    ]
  },
  7: {
    num: "07",
    title: "Photo Direction",
    short: "Visual coordination that makes brand imagery feel intentional. We set production moodboards, styling rules, and art guidelines.",
    capabilities: [
      "Office team shoot moodboards",
      "Art direction for founder profiles",
      "Staging guidelines & catalog style",
      "Visual moodboards & style coordinates"
    ]
  },
  8: {
    num: "08",
    title: "UI/UX Design",
    short: "High-end product structures built in Figma. We balance responsive interfaces with visual design consistency.",
    capabilities: [
      "Interactive product wireframing",
      "Visual design systems & assets libraries",
      "High-fidelity responsive layouts",
      "Figma workspace styling guidelines"
    ]
  },
  9: {
    num: "09",
    title: "Web Development",
    short: "Premium frontend deployment that behaves fluidly. We engineer high-performance web systems utilizing creative code.",
    capabilities: [
      "Modern React frontend systems",
      "Fluid page transitions & load models",
      "Performance optimization & structures",
      "Custom animation libraries integrations"
    ]
  }
};

export default function Philosophy() {
  const { setCursor } = useCursor();
  const [activeDim, setActiveDim] = useState(1);
  const contentRef = useRef(null);
  const dialRef = useRef(null);
  const scrollGlowRef = useRef(null);

  const radius = 140; // Dial radius
  const nodes = Array.from({ length: 9 }, (_, i) => i + 1);

  // Rotate dial to set active node at the top
  const handleNodeClick = (num) => {
    setActiveDim(num);
  };

  // Listen to selectDimension event from Hero canvas click
  useEffect(() => {
    const handleSelectDimension = (e) => {
      const targetDim = e.detail;
      if (dimensionData[targetDim]) {
        setActiveDim(targetDim);
      }
    };
    window.addEventListener('selectDimension', handleSelectDimension);
    return () => window.removeEventListener('selectDimension', handleSelectDimension);
  }, []);

  // Dial rotation animation with enhanced easing
  useEffect(() => {
    const angle = -(activeDim - 1) * 40; // 360 / 9 = 40 deg
    gsap.to(dialRef.current, {
      rotation: angle,
      duration: 1.0,
      ease: "power2.inOut"
    });

    // Make individual nodes face upright with subtle overshoot
    const nodesEl = dialRef.current?.querySelectorAll('.node-position');
    if (nodesEl) {
      nodesEl.forEach((node) => {
        gsap.to(node, {
          rotation: -angle,
          duration: 1.0,
          ease: "power2.inOut"
        });
      });
    }

    // Stagger fade-up text on active dimension change with refined timing
    if (contentRef.current) {
      const q = gsap.utils.selector(contentRef.current);
      gsap.set(q(".anim-fade-up"), { opacity: 0, y: 18 });
      gsap.to(q(".anim-fade-up"), {
        opacity: 1,
        y: 0,
        duration: 0.75,
        stagger: 0.1,
        ease: "power3.out"
      });
    }
  }, [activeDim]);

  // Breathing glow with dual frequency for more organic feel
  useEffect(() => {
    gsap.to(scrollGlowRef.current, {
      opacity: 0.28,
      scale: 1.06,
      duration: 3.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }, []);

  const activeDetails = dimensionData[activeDim];

  return (
    <section
      id="philosophy"
      className="relative z-10 py-14 xs:py-16 sm:py-20 md:py-28 lg:py-36 px-4 xs:px-5 sm:px-6 md:px-12 lg:px-16 bg-[#050515] border-t border-white/[0.02] overflow-hidden"
    >
      {/* Blueprint Grid */}
      <div className="blueprint-grid-line vertical left-5 sm:left-6 md:left-16 hidden sm:block" />
      <div className="blueprint-grid-line vertical left-[55%] hidden lg:block" />
      <div className="blueprint-grid-line horizontal bottom-0" />

      <div className="max-w-[1400px] mx-auto relative z-10">
        
        {/* Section Intro */}
        <div className="flex flex-col items-start mb-12 sm:mb-16 md:mb-20 lg:mb-28 text-left pl-0 sm:pl-4 md:pl-8 lg:pl-12">
          <span className="fade-in-el font-subheading text-[0.65rem] sm:text-[0.7rem] font-bold tracking-[0.4em] text-[#d49b3f] uppercase mb-3 sm:mb-4">
            Interactive Grid
          </span>
          <h2 className="fade-in-el font-heading text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-white leading-none">
            The Nine Dimensions
          </h2>
          <div className="fade-in-el w-10 sm:w-12 h-[2px] bg-[#d49b3f]/50 mt-4 sm:mt-5 md:mt-6 mb-5 sm:mb-6 md:mb-8" />
          <p className="fade-in-el font-body text-gray-300 text-xs xs:text-sm sm:text-base leading-relaxed max-w-[620px]">
            Click nodes on the visual instrument or explore their properties to see how we project design assets across our unified creative system.
          </p>
        </div>

        {/* Two-Column Layout */}
        <div className="grid lg:grid-cols-12 gap-8 sm:gap-10 md:gap-12 lg:gap-20 xl:gap-24 items-center">
          
          {/* Content Pane ── below dial on mobile, left on desktop */}
          <div className="lg:col-span-7 flex flex-col items-start text-left min-h-0 lg:min-h-[460px] pl-0 sm:pl-4 md:pl-8 lg:pl-12 order-2 lg:order-1">
            <div ref={contentRef} className="w-full flex flex-col items-start">
              
              <span className="anim-fade-up font-heading text-[3rem] sm:text-[5rem] md:text-[7rem] lg:text-[9.5rem] font-black text-[#d49b3f]/[0.08] leading-none select-none tracking-tighter mb-1 sm:mb-2">
                {activeDetails.num}
              </span>
              
              <span className="anim-fade-up font-subheading text-[10px] sm:text-xs font-bold text-[#d49b3f] tracking-[0.25em] uppercase block mb-2 sm:mb-3">
                Dimension System
              </span>
              
              <h3 className="anim-fade-up font-heading text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-white mb-4 sm:mb-5 md:mb-6 tracking-tight">
                {activeDetails.title}
              </h3>
              
              <p className="anim-fade-up font-body text-gray-300 text-sm sm:text-base md:text-[1.05rem] leading-relaxed max-w-[600px] mb-6 sm:mb-7 md:mb-8">
                {activeDetails.short}
              </p>
              
              <div className="anim-fade-up w-full border-t border-white/[0.05] pt-5 sm:pt-6 md:pt-8">
                <span className="font-subheading text-[9px] font-bold text-gray-500 uppercase tracking-[0.3em] block mb-4 sm:mb-5">
                  Scope & Focus Area
                </span>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 w-full">
                  {activeDetails.capabilities.map((cap, i) => (
                    <li key={i} className="flex items-start gap-2 sm:gap-3 text-xs text-gray-200 font-body">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#d49b3f] mt-1.5 flex-shrink-0" />
                      <span>{cap}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>

          {/* Dial Column */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative min-h-[260px] sm:min-h-[320px] md:min-h-[380px] lg:min-h-[420px] order-1 lg:order-2">
            
            {/* Ambient glow */}
            <div 
              ref={scrollGlowRef}
              className="absolute w-[220px] sm:w-[280px] md:w-[340px] h-[220px] sm:h-[280px] md:h-[340px] bg-radial-gradient-glow opacity-15 pointer-events-none z-0" 
            />

            <div className="philosophy-dial-container select-none z-10">
              
              {/* Center indicator */}
              <div className="absolute z-20 w-20 sm:w-24 h-20 sm:h-24 bg-[#050515] border border-white/[0.08] rounded-full flex flex-col items-center justify-center shadow-2xl">
                <span className="font-heading text-base xs:text-lg font-black text-white">9D</span>
                <span className="font-subheading text-[6px] sm:text-[7px] font-bold text-gray-500 tracking-[0.2em]">AAYAM</span>
              </div>

              {/* SVG rings */}
              <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-0" viewBox="0 0 380 380">
                <circle cx="190" cy="190" r={radius} fill="none" stroke="rgba(212, 155, 63, 0.08)" strokeWidth="1" strokeDasharray="4 6" />
                <circle cx="190" cy="190" r={radius - 40} fill="none" stroke="rgba(255, 255, 255, 0.02)" strokeWidth="1" />
              </svg>

              {/* Rotating dial */}
              <div 
                ref={dialRef}
                className="absolute top-0 left-0 w-full h-full z-10 dial-container"
              >
                {nodes.map((num) => {
                  const isActive = activeDim === num;
                  const angle = (num - 1) * 40 * (Math.PI / 180);
                  const x = 190 + radius * Math.sin(angle);
                  const y = 190 - radius * Math.cos(angle);

                  return (
                    <button
                      key={num}
                      type="button"
                      className="node-position absolute w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ease-out transform -translate-x-1/2 -translate-y-1/2"
                      style={{
                        left: `${x}px`,
                        top: `${y}px`,
                      }}
                      onClick={() => handleNodeClick(num)}
                      onMouseEnter={() => setCursor('view')}
                      onMouseLeave={() => setCursor('')}
                    >
                      <div className={`w-full h-full rounded-full border flex items-center justify-center transition-all duration-300 ease-out ${
                        isActive 
                          ? 'bg-[#d49b3f] border-[#d49b3f] text-[#050515] shadow-lg shadow-[#d49b3f]/25 scale-110' 
                          : 'bg-black/90 border-white/[0.08] hover:border-[#d49b3f] text-gray-400 hover:text-white backdrop-blur hover:scale-105'
                      }`}>
                        <span className="node-number font-subheading text-[8px] font-extrabold">
                          {num.toString().padStart(2, '0')}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Mobile tab selector — visible below 1025px */}
            <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center mt-5 sm:mt-8 md:mt-10 lg:hidden w-full max-w-[380px]">
              {nodes.map((num) => (
                <button
                  key={num}
                  type="button"
                  className={`py-1.5 px-3 rounded text-[9px] sm:text-[10px] font-bold font-subheading tracking-wider transition-all duration-200 ${
                    activeDim === num 
                      ? 'bg-[#d49b3f] text-[#050515]' 
                      : 'bg-white/[0.02] border border-white/[0.04] text-gray-400 hover:text-white'
                  }`}
                  onClick={() => handleNodeClick(num)}
                >
                  {num.toString().padStart(2, '0')}
                </button>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
