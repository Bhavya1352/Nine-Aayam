import React, { useState, useRef, useEffect } from 'react';
import { useCursor } from '../context/CursorContext';
import { Orbit, Maximize2, TrendingUp, Layers } from 'lucide-react';
import gsap from 'gsap';

const dimensionData = {
  1: {
    num: "01",
    title: "Brand Strategy & Identity",
    short: "Defining who you are, how you speak, and how you look in the digital landscape.",
    capabilities: [
      "Brand positioning & visual identity system",
      "Logo direction & visual guidelines asset",
      "Colors, typography and style rules tokens",
      "Tone of voice and corporate communication direction"
    ]
  },
  2: {
    num: "02",
    title: "Graphic Design & Marketing Collateral",
    short: "Premium marketing collateral that converts prospects into enterprise clients.",
    capabilities: [
      "Posters, flyers, Brochures and physical prints",
      "Corporate Profiles & Business pitch decks",
      "Product Catalogues & interactive sales manuals",
      "Banners, Business Cards and exhibition standees"
    ]
  },
  3: {
    num: "03",
    title: "Content Strategy & Copywriting",
    short: "High-impact language engineered to keep users scrolling and capture intent.",
    capabilities: [
      "Instagram captions & content calendar strategies",
      "Website & high-converting landing page copywriting",
      "Video ad scriptwriting & brand campaign hooks",
      "Slogans, taglines, founder narrative storytelling"
    ]
  },
  4: {
    num: "04",
    title: "Social Media Creative",
    short: "Building an active, premium presence across Instagram and LinkedIn channels.",
    capabilities: [
      "Instagram grid designs and LinkedIn carousels",
      "Reels covers, highlights and visual stories",
      "Festive, testimonial and corporate brand posts",
      "Monthly creative operation systems & templates"
    ]
  },
  5: {
    num: "05",
    title: "Advertising & Campaign Creatives",
    short: "Performance creatives built specifically to win on Meta and Google display channels.",
    capabilities: [
      "Meta ad concepts & Google display banner variations",
      "Campaign hooks, headlines and ad script variations",
      "Launch campaign visual sets & offer promotions",
      "High-CTR ad formats & conversion overlays"
    ]
  },
  6: {
    num: "06",
    title: "Video, Reels & Motion Design",
    short: "Stop-scroll animations, dynamic video editing, and modern cinematic content.",
    capabilities: [
      "Reels & Shorts visual concepts & pacing",
      "Professional cinematic video editing",
      "2D/3D motion graphics overlay transitions",
      "Animated brand logo and vector identity assets"
    ]
  },
  7: {
    num: "07",
    title: "Photography & Production Direction",
    short: "Creative direction and planning for high-end catalog and campaign shoots.",
    capabilities: [
      "Product shoot conceptualization and planning",
      "Founder, corporate executive & office shoot guides",
      "Creative storyboards, moodboards, styling directions",
      "Prop direction and set production logistics"
    ]
  },
  8: {
    num: "08",
    title: "UI/UX Design",
    short: "Futuristic, clean layout schemes mapped with top-tier user conversion pipelines.",
    capabilities: [
      "Website user interface layouts and Figma systems",
      "Wireframes, prototypes and user journey charts",
      "Mobile-first responsive dashboard designs",
      "Design tokens structure and styling libraries"
    ]
  },
  9: {
    num: "09",
    title: "Website & Landing Page Design",
    short: "Seamless front-end engineering delivering high performance, layout speeds and interactions.",
    capabilities: [
      "Corporate business websites & showcase portals",
      "High-converting landing pages & campaign grids",
      "Interactive 3D showcases & product microsites",
      "Website redesigns & front-end WebGL engineering"
    ]
  }
};

export default function Philosophy() {
  const { setCursor } = useCursor();
  const [activeDim, setActiveDim] = useState(1);
  const dialRef = useRef(null);

  const radius = 165;
  const nodes = Array.from({ length: 9 }, (_, i) => i + 1);
  const angleStep = (2 * Math.PI) / 9;

  const handleNodeClick = (index) => {
    setActiveDim(index);
    
    const targetRotation = -(index - 1) * 40;
    
    gsap.to(dialRef.current, {
      rotation: targetRotation,
      duration: 0.65,
      ease: "power3.out"
    });

    gsap.to(".node-number", {
      rotation: -targetRotation,
      duration: 0.65,
      ease: "power3.out"
    });
  };

  const activeDetails = dimensionData[activeDim];

  return (
    <section id="philosophy" className="relative z-10 py-32 px-6 bg-obsidian-deep/50 border-t border-[#10B981]/5">
      <div className="max-w-[1300px] mx-auto relative z-10">
        
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <div className="flex flex-col items-start">
            <span className="font-subheading text-[0.8rem] font-bold tracking-[0.25em] text-[#10B981] uppercase mb-4">
              Our Foundation
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-extrabold leading-tight mb-6">
              The Sanskrit Philosophy of <span className="text-[#10B981]">Aayam</span>
            </h2>
            <p className="font-body text-[1.15rem] leading-relaxed text-gray-300 mb-6">
              Derived from Sanskrit, <strong>Aayam (आयाम)</strong> represents <em>dimension, expansion, extension, depth, and aspect</em>. It is our framework for projecting visible brand realities.
            </p>
            <p className="font-body text-gray-400 leading-relaxed mb-8">
              We do not look at design in flat dimensions. Growth requires expansion across multiple creative axes. By blending strategic depth, interactive UI experiences, and video content, we map out **Nine Creative Dimensions** built to scale businesses.
            </p>
            
            <div className="flex flex-wrap gap-3">
              <span className="flex items-center gap-1.5 py-2 px-4 bg-[#10B981]/5 border border-[#10B981]/10 rounded-lg text-sm text-gray-300 font-semibold font-subheading">
                <Orbit className="w-4 h-4 text-[#10B981]" /> Dimension
              </span>
              <span className="flex items-center gap-1.5 py-2 px-4 bg-[#10B981]/5 border border-[#10B981]/10 rounded-lg text-sm text-gray-300 font-semibold font-subheading">
                <Maximize2 className="w-4 h-4 text-[#10B981]" /> Expansion
              </span>
              <span className="flex items-center gap-1.5 py-2 px-4 bg-[#10B981]/5 border border-[#10B981]/10 rounded-lg text-sm text-gray-300 font-semibold font-subheading">
                <TrendingUp className="w-4 h-4 text-[#10B981]" /> Extension
              </span>
              <span className="flex items-center gap-1.5 py-2 px-4 bg-[#10B981]/5 border border-[#10B981]/10 rounded-lg text-sm text-gray-300 font-semibold font-subheading">
                <Layers className="w-4 h-4 text-[#10B981]" /> Depth
              </span>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center">
            
            <div className="hidden md:flex relative w-[420px] h-[420px] items-center justify-center mb-10 select-none">
              
              <div className="absolute z-10 w-24 h-24 bg-[#040c08] border border-[#10B981]/40 rounded-full flex flex-col items-center justify-center animate-core-glow shadow-lg">
                <span className="font-heading text-xl font-black text-[#10B981]">9D</span>
                <span className="font-subheading text-[8px] font-bold text-gray-400 tracking-wider">SYSTEM</span>
              </div>

              <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-0" viewBox="0 0 400 400">
                <circle cx="200" cy="200" r="165" fill="none" stroke="rgba(16, 185, 129, 0.08)" strokeWidth="1.5" strokeDasharray="5 5" />
                <circle cx="200" cy="200" r="100" fill="none" stroke="rgba(16, 185, 129, 0.03)" strokeWidth="1" />
              </svg>

              <div 
                ref={dialRef}
                className="absolute top-0 left-0 w-full h-full z-10 dial-container"
              >
                {nodes.map((num) => {
                  const isActive = activeDim === num;

                  return (
                    <button
                      key={num}
                      type="button"
                      className={`node-position node-${num} w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isActive 
                        ? 'bg-[#10B981] text-[#040c08] border-2 border-[#10B981] shadow-lg shadow-[#10B981]/30 scale-110' 
                        : 'bg-black/80 text-gray-400 border border-[#10B981]/25 hover:border-[#10B981] hover:text-white backdrop-blur-sm'
                      }`}
                      onClick={() => handleNodeClick(num)}
                      onMouseEnter={() => setCursor('view')}
                      onMouseLeave={() => setCursor('')}
                    >
                      <span className="node-number font-subheading text-[10px] font-extrabold">
                        {num.toString().padStart(2, '0')}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex md:hidden flex-wrap gap-2 justify-center mb-8">
              {nodes.map((num) => (
                <button
                  key={num}
                  type="button"
                  className={`py-1.5 px-3 rounded-lg text-xs font-bold font-subheading transition-all duration-200 ${
                    activeDim === num 
                    ? 'bg-[#10B981] text-[#040c08]' 
                    : 'bg-black/40 border border-[#10B981]/10 text-gray-400'
                  }`}
                  onClick={() => setActiveDim(num)}
                >
                  {num.toString().padStart(2, '0')}
                </button>
              ))}
            </div>

            <div key={activeDim} className="w-full max-w-[500px] bg-black/40 border border-[#10B981]/15 backdrop-blur-md rounded-2xl p-6 shadow-2xl animate-fade-in-slide">
              <span className="font-subheading text-xs font-bold text-[#10B981] tracking-widest uppercase block mb-1">
                Dimension {activeDetails.num}
              </span>
              <h3 className="font-subheading text-xl font-bold text-white mb-2">
                {activeDetails.title}
              </h3>
              <p className="font-body text-xs text-gray-400 leading-relaxed mb-5">
                {activeDetails.short}
              </p>
              
              <div className="border-t border-[#10B981]/10 pt-4">
                <span className="font-subheading text-[9px] font-bold text-gray-400 uppercase tracking-widest block mb-3">
                  Scope & Capabilities
                </span>
                <ul className="flex flex-col gap-2">
                  {activeDetails.capabilities.map((cap, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-gray-300 font-body">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] mt-1.5 flex-shrink-0" />
                      <span>{cap}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
