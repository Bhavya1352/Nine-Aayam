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

  // Layout: row 1 = full width (01), row 2 = 5+7 (02,03), row 3 = 4+4+4 (04,05,06 wide), row 4 = 7+5 (07,08), row 5 = full (09)
  return (
    <section ref={sectionRef} id="services" className="relative z-10 bg-[#1B1F24] overflow-hidden">

      {/* Ambient background layers */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[20%] right-[-5%] w-[40vw] h-[50vh] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(201,122,61,0.02) 0%, transparent 60%)' }} />
        <div className="absolute bottom-[10%] left-[-10%] w-[35vw] h-[45vh] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(37,43,51,0.7) 0%, transparent 65%)' }} />
      </div>

      <div className="relative pt-12 pb-16 md:pt-16 md:pb-20 px-6 md:px-12 lg:px-20">
        <div className="max-w-[1200px] mx-auto">

          {/* Header */}
          <div className="story-hdr flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 md:mb-18 opacity-0">
            <div>
              <span className="font-mono text-[9px] tracking-[0.45em] text-[#C97A3D]/70 uppercase block mb-4 font-semibold">
                02 — Service Cabinet
              </span>
              <h3 className="font-heading font-medium text-[#F4F1EB] tracking-tight leading-none"
                style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3.5rem)' }}>
                The Nine Creative <span className="italic text-[#C97A3D]">Dimensions</span>
              </h3>
            </div>
            <p className="font-body text-sm text-[#C4C8CF]/55 leading-relaxed max-w-[380px] md:text-right">
              Every strong brand grows through coordinate alignment. Nine public-facing service menus built to shape modern brands.
            </p>
          </div>

          {/* Handcrafted Dimension List */}
          <div className="space-y-4 md:space-y-6">
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
  const isHighlight = d.highlight;
  
  return (
    <div
      className={`dim-item group relative p-6 md:p-8 transition-all duration-500 cursor-default
        ${isHighlight 
          ? 'bg-gradient-to-r from-[#C97A3D]/[0.08] to-[#C97A3D]/[0.02] border-l-4 border-[#C97A3D]' 
          : 'bg-gradient-to-r from-[#252B33] to-[#1B1F24] border-l-2 border-[#C97A3D]/30'}
      `}
      onMouseEnter={() => setCursor('view')}
      onMouseLeave={() => setCursor('')}
    >
      <div className="relative z-10 flex flex-col md:flex-row gap-6 md:gap-8 items-start">
        {/* Left side - Number & Code */}
        <div className="flex-shrink-0">
          <div className="flex items-baseline gap-3 mb-2">
            <span className="font-heading text-3xl md:text-4xl font-light text-[#C97A3D] leading-none">
              {d.num}
            </span>
            <span className="font-mono text-[10px] text-[#C97A3D]/60 tracking-widest font-semibold">
              {d.code}
            </span>
          </div>
          <div className="w-12 h-[1px] bg-gradient-to-r from-[#C97A3D]/50 to-transparent" />
        </div>

        {/* Right side - Content */}
        <div className="flex-1">
          <h4 className="font-heading font-medium text-[#F4F1EB] leading-tight tracking-tight mb-3"
            style={{ fontSize: 'clamp(1.3rem, 2.2vw, 1.8rem)', whiteSpace: 'pre-line' }}>
            {d.title}
          </h4>
          <p className="font-body text-sm text-[#C4C8CF]/70 leading-relaxed mb-4">
            {d.desc}
          </p>
          
          {d.quote && (
            <blockquote className="font-heading text-base italic text-[#E0A96D]/90 mb-4 pl-4 border-l-2 border-[#C97A3D]/40">
              "{d.quote}"
            </blockquote>
          )}

          <div className="flex flex-wrap gap-2">
            {d.tags.map((t) => (
              <span key={t} className="font-mono text-[8px] text-[#C4C8CF]/50 px-2 py-1 border border-[#C97A3D]/20 hover:bg-[#C97A3D]/10 hover:text-[#C97A3D] transition-all duration-300">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
