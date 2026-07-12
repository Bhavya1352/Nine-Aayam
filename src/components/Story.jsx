import React, { useEffect, useRef } from 'react';
import { useCursor } from '../context/CursorContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const dims = [
  {
    num: '01', code: 'BSD',
    title: 'Brand Strategy\n& Identity',
    desc: 'Defining who you are, how you speak, and how you look. We craft the strategic DNA that guides all visual outputs and brand communication.',
    tags: ['Positioning', 'Logo systems', 'Color theory', 'Brand guidelines'],
    quote: 'A logo is not a brand. It is the visible posture of your strategic intent.',
    wide: true,
  },
  {
    num: '02', code: 'GDC',
    title: 'Graphic Design\n& Collateral',
    desc: 'Premium visual assets engineered to elevate corporate profiles, decks, and investor presentations into category-leading statements.',
    tags: ['Sales decks', 'Profiles', 'Catalogs'],
  },
  {
    num: '03', code: 'CSC',
    title: 'Content Strategy\n& Copywriting',
    desc: 'High-impact language that moves beyond passive reading. Campaign headlines, taglines, scripts, and brand narratives designed to convert.',
    tags: ['Landing copy', 'Founder story', 'Ad scripts'],
  },
  {
    num: '04', code: 'SMC',
    title: 'Social Media\nCreative',
    desc: 'Building active, premium authority across Instagram and LinkedIn. Cohesive layouts and templates that stand out in every feed.',
    tags: ['LinkedIn posts', 'Carousels', 'Grid systems'],
  },
  {
    num: '05', code: 'ACC',
    title: 'Paid Campaign\nCreatives',
    desc: 'Strategic paid traffic creatives designed to hook attention. We balance CTR visual layouts with copywriting hooks for conversion.',
    tags: ['Meta ad sets', 'Google Display', 'Offer grids'],
  },
  {
    num: '06', code: 'VRM',
    title: 'Video, Reels\n& Motion Design',
    desc: 'Cinematic vertical pacing and animated layouts built for modern social feeds. Static ideas turned into fluid motion assets.',
    tags: ['Reel concepts', 'Cinematic cuts', 'Animated loops'],
    wide: true,
  },
  {
    num: '07', code: 'PPD',
    title: 'Photo & Art\nDirection',
    desc: 'Coordination staging that makes photography look intentional. Styling boards, shot list directions, and founder portrait profiles.',
    tags: ['Shoot guidelines', 'Styling rules', 'Shot lists'],
  },
  {
    num: '08', code: 'UXD',
    title: 'UI/UX\nDesign',
    desc: 'High-end product structures built in Figma. Responsive interfaces with visual design consistency and interaction depth.',
    tags: ['Wireframing', 'Design systems', 'Figma'],
  },
  {
    num: '09', code: 'WLD',
    title: 'Website &\nFront-End Builds',
    desc: 'Connecting interactive user journeys in Figma directly to custom-coded, lightweight React front-ends. Handcrafted with zero templates.',
    tags: ['React builds', 'Animations', 'Performance'],
    highlight: true,
  },
];



// Layout sizing helper for Bento Grid
const getSpanClass = (idx) => {
  switch (idx) {
    case 0: return 'md:col-span-8 md:row-span-2'; // Featured core
    case 1: return 'md:col-span-4 md:row-span-1';
    case 2: return 'md:col-span-4 md:row-span-1';
    case 3: return 'md:col-span-6 md:row-span-1';
    case 4: return 'md:col-span-6 md:row-span-1';
    case 5: return 'md:col-span-8 md:row-span-1'; // Wide motion card
    case 6: return 'md:col-span-4 md:row-span-1';
    case 7: return 'md:col-span-5 md:row-span-1';
    case 8: return 'md:col-span-7 md:row-span-1'; // High-end web build
    default: return 'md:col-span-4';
  }
};


export default function Story() {
  const { setCursor } = useCursor();
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.story-hdr',
        { opacity: 0, y: 35, x: -20 },
        { opacity: 1, y: 0, x: 0, duration: 1.0, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true } }
      );

      ScrollTrigger.batch('.dim-item', {
        start: 'top 85%',
        onEnter: (els) => gsap.fromTo(els,
          { opacity: 0, y: 60, scale: 0.98 },
          { opacity: 1, y: 0, scale: 1, duration: 0.9, stagger: 0.08, ease: 'power3.out' }
        ),
        once: true
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="services" className="relative z-10 bg-[#050505] overflow-hidden py-16 sm:py-20 md:py-24">

      {/* Ambient background layers */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[20%] right-[-5%] w-[40vw] h-[50vh] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(201,122,61,0.02) 0%, transparent 60%)' }} />
        <div className="absolute bottom-[10%] left-[-10%] w-[35vw] h-[45vh] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(37,43,51,0.7) 0%, transparent 65%)' }} />
      </div>

      <div className="relative px-6 md:px-12 lg:px-20">
        <div className="max-w-[1200px] mx-auto">

          {/* Header */}
          <div className="story-hdr flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 md:mb-18 opacity-0">
            <div>
              <span className="font-mono text-[9px] tracking-[0.45em] text-[#C97A3D]/70 uppercase block mb-4 font-semibold">
                01 — Service Cabinet
              </span>
              <h3 className="font-heading font-medium text-[#F4F1EB] tracking-tight leading-none"
                style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3.5rem)' }}>
                The Nine Creative <span className="italic text-[#C97A3D]">Dimensions</span>
              </h3>
            </div>
            <p className="font-body text-sm text-[#C4C8CF]/80 leading-relaxed max-w-[380px] md:text-right">
              Every strong brand grows through coordinate alignment. Nine public-facing service menus built to shape modern brands.
            </p>
          </div>

          {/* Handcrafted Dimension Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
            {dims.map((d, idx) => (
              <DimCard key={d.num} d={d} idx={idx} setCursor={setCursor} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

function DimCard({ d, idx, setCursor }) {
  const isFeatured = idx === 0;
  const isHighlight = d.highlight;
  const spanClass = getSpanClass(idx);
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    
    // Smooth 3D tilt coordinates calculation
    const angleX = -(yc - y) / (yc / 6);
    const angleY = (x - xc) / (xc / 6);

    gsap.to(card, {
      rotationX: angleX,
      rotationY: angleY,
      scale: 1.012,
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
      className={`dim-item group relative p-6 md:p-8 rounded-xl transition-all duration-500 cursor-default overflow-hidden ${spanClass}
        ${isFeatured 
          ? 'bg-gradient-to-br from-[#161210] via-[#0b0807] to-[#030303] border border-[#C97A3D]/25 hover:border-[#C97A3D]/50 shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.04)]' 
          : isHighlight
          ? 'bg-gradient-to-br from-[#140f0c] via-[#090706] to-[#030303] border border-[#C97A3D]/20 hover:border-[#C97A3D]/50 shadow-[0_15px_40px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.03)]'
          : 'bg-gradient-to-br from-[#121212] to-[#050505]/50 border border-white/[0.02] hover:border-[#C97A3D]/20 shadow-[0_8px_30px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.01)] hover:shadow-[0_25px_55px_rgba(0,0,0,0.5)]'}
      `}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setCursor(isFeatured ? 'connect' : 'view')}
      onMouseLeave={handleMouseLeave}
    >
      {/* Dynamic Hover Background Flow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{
          background: isFeatured 
            ? 'radial-gradient(circle at 10% 20%, rgba(201,122,61,0.08) 0%, transparent 60%)'
            : 'radial-gradient(circle at 10% 20%, rgba(201,122,61,0.05) 0%, transparent 50%)'
        }} />

      {/* Decorative top-right gold accent line */}
      <div className="absolute top-0 right-0 w-24 h-[1px] bg-gradient-to-l from-[#C97A3D]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute top-0 right-0 w-[1px] h-24 bg-gradient-to-b from-[#C97A3D]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />



      <div className="relative z-10 flex flex-col justify-between h-full min-h-[160px] md:min-h-[180px]">
        {/* Top Header - Number, Code & Accent line */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-baseline gap-3">
              <span className={`font-heading font-light leading-none ${isFeatured ? 'text-4xl md:text-5xl text-[#C97A3D]' : 'text-3xl md:text-4xl text-[#C97A3D]/80 group-hover:text-[#C97A3D]'} transition-colors duration-300`}>
                {d.num}
              </span>
            </div>
            {isFeatured && (
              <span className="font-mono text-[8px] bg-[#C97A3D]/10 text-[#C97A3D] px-2 py-0.5 rounded tracking-widest uppercase font-semibold">
                Featured Core
              </span>
            )}
          </div>
          <div className="w-10 h-[1px] bg-gradient-to-r from-[#C97A3D]/40 to-transparent mb-4 group-hover:w-16 transition-all duration-500" />
        </div>

        {/* Mid Section - Title & Description */}
        <div className="flex-1 mb-5">
          <h4 className={`font-heading font-medium text-[#F4F1EB] leading-tight tracking-tight mb-3 ${isFeatured ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl'}`}
            style={{ whiteSpace: 'pre-line' }}>
            {d.title}
          </h4>
          <p className={`font-body leading-relaxed text-[#C4C8CF]/80 group-hover:text-[#F4F1EB]/90 transition-colors duration-300 ${isFeatured ? 'text-sm max-w-[580px]' : 'text-xs'}`}>
            {d.desc}
          </p>
          
          {d.quote && (
            <blockquote className="font-heading text-sm md:text-base italic text-[#E0A96D] mt-4 mb-4 pl-4 border-l-2 border-[#C97A3D]/40 max-w-[500px]">
              "{d.quote}"
            </blockquote>
          )}
        </div>

        {/* Bottom Tags */}
        <div className="flex flex-wrap gap-1.5 mt-auto">
          {d.tags.map((t) => (
            <span key={t} className="font-mono text-[7px] text-[#C4C8CF]/60 px-2 py-1 rounded bg-[#050505]/30 border border-white/[0.04] hover:border-[#C97A3D]/30 hover:bg-[#C97A3D]/5 hover:text-[#C97A3D] transition-all duration-300">
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
