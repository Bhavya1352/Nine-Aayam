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
    title: "Advertising & Campaign Creatives",
    short: "Performance creatives built to capture attention and scale. We optimize layouts specifically for Meta and Google display channels.",
    capabilities: [
      "High-CTR ad layout concepts",
      "Varying campaign display banners",
      "Meta ad concepts & scripting variations",
      "Launch campaign visual asset sets"
    ]
  },
  6: {
    num: "06",
    title: "Video & Motion",
    short: "Stop-scroll animations, dynamic video editing, and modern cinematic storytelling that conveys premium brand speed.",
    capabilities: [
      "Shorts & Reels visual pacing",
      "Cinematic brand video edits",
      "2D/3D motion graphics overlay",
      "Animated logos & kinetic assets"
    ]
  },
  7: {
    num: "07",
    title: "Photography Direction",
    short: "Pre-production planning, storyboarding, and aesthetic direction for product and founder lifestyle shoots.",
    capabilities: [
      "Product shoot conceptualization",
      "Founder & executive portrait styleguides",
      "Storyboards & visual moodboards",
      "Prop, lighting, and scene planning"
    ]
  },
  8: {
    num: "08",
    title: "UI/UX Design",
    short: "Editorial, clean interface design mapped to top-tier conversion pipelines. We build systems in Figma designed for engineering handoff.",
    capabilities: [
      "Figma user interface systems",
      "Interactive digital prototypes",
      "Responsive layout architectures",
      "Design systems & styling libraries"
    ]
  },
  9: {
    num: "09",
    title: "Website & Landing Pages",
    short: "High-performance front-end engineering delivering clean interactions, smooth animations, and fast load speeds.",
    capabilities: [
      "Corporate business websites",
      "High-converting marketing portals",
      "Product landing pages & microsites",
      "Creative interactions & WebGL integrations"
    ]
  }
};

export default function Philosophy() {
  const { setCursor } = useCursor();
  const [activeDim, setActiveDim] = useState(1);
  const dialRef = useRef(null);
  const contentRef = useRef(null);
  const scrollGlowRef = useRef(null);

  const radius = 170; // dial radius
  const nodes = Array.from({ length: 9 }, (_, i) => i + 1);

  const handleNodeClick = (index) => {
    setActiveDim(index);
    
    const targetRotation = -(index - 1) * 40;
    
    gsap.to(dialRef.current, {
      rotation: targetRotation,
      duration: 0.85,
      ease: "power3.out"
    });

    gsap.to(".node-number", {
      rotation: -targetRotation,
      duration: 0.85,
      ease: "power3.out"
    });
  };

  // Listen to dimension selection events from Hero canvas
  useEffect(() => {
    const handleSelectDimension = (e) => {
      const dimensionId = e.detail;
      if (dimensionId >= 1 && dimensionId <= 9) {
        handleNodeClick(dimensionId);
      }
    };
    window.addEventListener('selectDimension', handleSelectDimension);
    return () => window.removeEventListener('selectDimension', handleSelectDimension);
  }, []);

  // Animate content change
  useEffect(() => {
    if (contentRef.current) {
      const q = gsap.utils.selector(contentRef.current);
      gsap.set(q(".anim-fade-up"), { opacity: 0, y: 15 });
      gsap.to(q(".anim-fade-up"), {
        opacity: 1,
        y: 0,
        duration: 0.65,
        stagger: 0.08,
        ease: "power3.out"
      });
    }
  }, [activeDim]);

  // Breathing glow
  useEffect(() => {
    gsap.to(scrollGlowRef.current, {
      opacity: 0.25,
      scale: 1.05,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }, []);

  const activeDetails = dimensionData[activeDim];

  return (
    <section
      id="philosophy"
      className="relative z-10 py-14 xs:py-16 sm:py-20 md:py-28 lg:py-36 px-4 xs:px-5 sm:px-6 md:px-12 lg:px-16 bg-[#040c08] border-t border-white/[0.02] overflow-hidden"
    >
      {/* Blueprint Grid */}
      <div className="blueprint-grid-line vertical left-5 sm:left-6 md:left-16 hidden sm:block" />
      <div className="blueprint-grid-line vertical left-[55%] hidden lg:block" />
      <div className="blueprint-grid-line horizontal bottom-0" />

      <div className="max-w-[1400px] mx-auto relative z-10">
        
        {/* Section Intro */}
        <div className="flex flex-col items-start mb-10 xs:mb-12 sm:mb-16 md:mb-20 lg:mb-28 text-left pl-0 sm:pl-4 md:pl-8 lg:pl-12">
          <span className="fade-in-el font-subheading text-[0.6rem] xs:text-[0.65rem] sm:text-[0.7rem] font-bold tracking-[0.3em] xs:tracking-[0.4em] text-[#10B981] uppercase mb-3 xs:mb-4">
            Interactive Grid
          </span>
          <h2 className="fade-in-el font-heading text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white leading-none">
            The Nine Dimensions
          </h2>
          <div className="fade-in-el w-8 xs:w-10 sm:w-12 h-[2px] bg-[#10B981]/50 mt-3 xs:mt-4 sm:mt-5 md:mt-6 mb-4 xs:mb-5 sm:mb-6 md:mb-8" />
          <p className="fade-in-el font-body text-gray-400 text-xs xs:text-sm sm:text-base leading-relaxed max-w-[620px]">
            Click nodes on the visual instrument or explore their properties to see how we project design assets across our unified creative system.
          </p>
        </div>

        {/* Two-Column Layout */}
        <div className="grid lg:grid-cols-12 gap-6 xs:gap-8 sm:gap-10 md:gap-12 lg:gap-20 xl:gap-24 items-center">
          
          {/* Content Pane — below dial on mobile, left on desktop */}
          <div className="lg:col-span-7 flex flex-col items-start text-left min-h-0 lg:min-h-[460px] pl-0 sm:pl-4 md:pl-8 lg:pl-12 order-2 lg:order-1">
            <div ref={contentRef} className="w-full flex flex-col items-start">
              
              <span className="anim-fade-up font-heading text-[3rem] xs:text-[4rem] sm:text-[5rem] md:text-[7rem] lg:text-[9.5rem] font-black text-[#10B981]/[0.08] leading-none select-none tracking-tighter mb-1 xs:mb-2">
                {activeDetails.num}
              </span>
              
              <span className="anim-fade-up font-subheading text-[10px] xs:text-xs font-bold text-[#10B981] tracking-[0.2em] xs:tracking-[0.25em] uppercase block mb-2 xs:mb-3">
                Dimension System
              </span>
              
              <h3 className="anim-fade-up font-heading text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-white mb-3 xs:mb-4 sm:mb-5 md:mb-6 uppercase tracking-tight">
                {activeDetails.title}
              </h3>
              
              <p className="anim-fade-up font-body text-gray-400 text-xs xs:text-sm sm:text-base md:text-[1.05rem] leading-relaxed max-w-[600px] mb-5 xs:mb-6 sm:mb-7 md:mb-8">
                {activeDetails.short}
              </p>
              
              <div className="anim-fade-up w-full border-t border-white/[0.05] pt-4 xs:pt-5 sm:pt-6 md:pt-8">
                <span className="font-subheading text-[8px] xs:text-[9px] font-bold text-gray-500 uppercase tracking-[0.25em] xs:tracking-[0.3em] block mb-3 xs:mb-4 sm:mb-5">
                  Scope & Focus Area
                </span>
                <ul className="grid grid-cols-1 xs:grid-cols-2 gap-3 xs:gap-4 w-full">
                  {activeDetails.capabilities.map((cap, i) => (
                    <li key={i} className="flex items-start gap-2 xs:gap-3 text-[11px] xs:text-xs text-gray-300 font-body">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] mt-1 xs:mt-1.5 flex-shrink-0" />
                      <span>{cap}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>

          {/* Dial Column */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative min-h-[200px] xs:min-h-[240px] sm:min-h-[300px] md:min-h-[350px] lg:min-h-[420px] order-1 lg:order-2">
            
            {/* Ambient glow */}
            <div 
              ref={scrollGlowRef}
              className="absolute w-[200px] xs:w-[250px] sm:w-[300px] md:w-[350px] h-[200px] xs:h-[250px] sm:h-[300px] md:h-[350px] bg-radial-gradient-glow opacity-15 pointer-events-none z-0" 
            />

            <div className="philosophy-dial-container relative w-[380px] h-[380px] flex items-center justify-center select-none z-10">
              
              {/* Center indicator */}
              <div className="absolute z-20 w-20 xs:w-24 h-20 xs:h-24 bg-[#040c08] border border-white/[0.08] rounded-full flex flex-col items-center justify-center shadow-2xl">
                <span className="font-heading text-base xs:text-lg font-black text-white">9D</span>
                <span className="font-subheading text-[6px] xs:text-[7px] font-bold text-gray-500 tracking-[0.15em] xs:tracking-[0.2em]">AAYAM</span>
              </div>

              {/* SVG rings */}
              <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-0" viewBox="0 0 380 380">
                <circle cx="190" cy="190" r={radius} fill="none" stroke="rgba(16, 185, 129, 0.05)" strokeWidth="1" strokeDasharray="4 6" />
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
                      className="node-position absolute w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 transform -translate-x-1/2 -translate-y-1/2"
                      style={{
                        left: `${x}px`,
                        top: `${y}px`,
                      }}
                      onClick={() => handleNodeClick(num)}
                      onMouseEnter={() => setCursor('view')}
                      onMouseLeave={() => setCursor('')}
                    >
                      <div className={`w-full h-full rounded-full border flex items-center justify-center transition-all duration-300 ${
                        isActive 
                          ? 'bg-[#10B981] border-[#10B981] text-[#040c08] shadow-lg shadow-[#10B981]/20 scale-110' 
                          : 'bg-black/90 border-white/[0.08] hover:border-[#10B981] text-gray-400 hover:text-white backdrop-blur'
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
            <div className="flex flex-wrap gap-1.5 xs:gap-2 justify-center mt-4 xs:mt-6 sm:mt-8 md:mt-10 lg:hidden w-full max-w-[350px] xs:max-w-[400px]">
              {nodes.map((num) => (
                <button
                  key={num}
                  type="button"
                  className={`py-1 xs:py-1.5 px-2.5 xs:px-3 rounded text-[9px] xs:text-[10px] font-bold font-subheading tracking-wider transition-all duration-200 ${
                    activeDim === num 
                      ? 'bg-[#10B981] text-[#040c08]' 
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
