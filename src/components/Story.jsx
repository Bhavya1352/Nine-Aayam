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
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', once: true } }
      );

      ScrollTrigger.batch('.dim-item', {
        start: 'top 90%',
        onEnter: (els) => gsap.fromTo(els,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.07, ease: 'power3.out' }
        ),
        once: true
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Layout: row 1 = full width (01), row 2 = 5+7 (02,03), row 3 = 4+4+4 (04,05,06 wide), row 4 = 7+5 (07,08), row 5 = full (09)
  return (
    <section ref={sectionRef} id="services" className="relative z-10 bg-[#1B1F24] overflow-hidden py-2">

      <div className="relative pt-12 pb-20 md:pt-16 md:pb-28 px-6 md:px-12 lg:px-20">
        <div className="max-w-[1200px] mx-auto">

          {/* Header */}
          <div className="story-hdr flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 md:mb-24 opacity-0">
            <div>
              <span className="font-mono text-[8px] tracking-[0.4em] text-[#C97A3D]/60 uppercase block mb-4">
                02 — Service Cabinet
              </span>
              <h3 className="font-heading font-medium text-[#F4F1EB] tracking-tight leading-none"
                style={{ fontSize: 'clamp(2rem, 4vw, 3.8rem)' }}>
                The Nine Creative<br />
                <span className="italic text-[#C97A3D]">Dimensions</span>
              </h3>
            </div>
            <p className="font-body text-sm text-[#C4C8CF]/60 leading-relaxed max-w-[340px] md:text-right">
              Every strong brand grows through coordinate alignment. Nine public-facing service menus built to shape modern brands.
            </p>
          </div>

          {/* Row 1: Full-width hero dimension */}
          <DimCard d={dims[0]} layout="hero" setCursor={setCursor} />

          {/* Row 2: 5/12 + 7/12 */}
          <div className="grid md:grid-cols-12 gap-4 md:gap-5 mt-4 md:mt-5">
            <div className="md:col-span-5"><DimCard d={dims[1]} layout="tall" setCursor={setCursor} /></div>
            <div className="md:col-span-7"><DimCard d={dims[2]} layout="wide" setCursor={setCursor} /></div>
          </div>

          {/* Row 3: 3 equal */}
          <div className="grid md:grid-cols-3 gap-4 md:gap-5 mt-4 md:mt-5">
            <DimCard d={dims[3]} layout="square" setCursor={setCursor} />
            <DimCard d={dims[4]} layout="square" setCursor={setCursor} />
            <DimCard d={dims[5]} layout="square" setCursor={setCursor} />
          </div>

          {/* Row 4: 7/12 + 5/12 */}
          <div className="grid md:grid-cols-12 gap-4 md:gap-5 mt-4 md:mt-5">
            <div className="md:col-span-7"><DimCard d={dims[6]} layout="wide" setCursor={setCursor} /></div>
            <div className="md:col-span-5"><DimCard d={dims[7]} layout="tall" setCursor={setCursor} /></div>
          </div>

          {/* Row 5: Full-width highlight */}
          <div className="mt-4 md:mt-5">
            <DimCard d={dims[8]} layout="hero" setCursor={setCursor} />
          </div>

        </div>
      </div>
    </section>
  );
}

function DimCard({ d, layout, setCursor }) {
  const isHero = layout === 'hero';
  const isTall = layout === 'tall';

  return (
    <div
      className={`dim-item group relative overflow-hidden opacity-0 transition-all duration-500 cursor-default
        ${d.highlight
          ? 'bg-[#C97A3D]/[0.06] border border-[#C97A3D]/25 hover:border-[#C97A3D]/50'
          : 'bg-[#252B33] border border-white/[0.06] hover:border-white/[0.12]'}
        ${isHero ? 'p-8 sm:p-10 md:p-12' : isTall ? 'p-7 sm:p-8' : 'p-7 sm:p-8'}
      `}
      style={{ clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))' }}
      onMouseEnter={() => setCursor('view')}
      onMouseLeave={() => setCursor('')}
    >
      {/* Hover glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 30% 30%, rgba(201,122,61,0.04) 0%, transparent 60%)' }} />

      {isHero ? (
        <div className="grid md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-5">
            <div className="flex items-baseline gap-4 mb-5">
              <span className="font-heading text-[5rem] md:text-[7rem] font-light text-[#C97A3D]/20 leading-none">{d.num}</span>
              <span className="font-mono text-[8px] text-[#C97A3D]/40 tracking-widest">{d.code}</span>
            </div>
            <h4 className="font-heading font-medium text-[#F4F1EB] leading-tight tracking-tight"
              style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2.4rem)', whiteSpace: 'pre-line' }}>
              {d.title}
            </h4>
          </div>
          <div className="md:col-span-7 flex flex-col justify-between h-full gap-6">
            <p className="font-body text-sm text-[#C4C8CF]/70 leading-relaxed">{d.desc}</p>
            {d.quote && (
              <blockquote className="font-heading text-base italic text-[#E0A96D]/80 border-l-2 border-[#C97A3D]/30 pl-4">
                "{d.quote}"
              </blockquote>
            )}
            <div className="flex flex-wrap gap-2 pt-4 border-t border-white/[0.04]">
              {d.tags.map((t) => (
                <span key={t} className="font-mono text-[8px] border border-white/[0.08] text-[#C4C8CF]/50 px-2.5 py-1 hover:border-[#C97A3D]/30 hover:text-[#C97A3D]/70 transition-colors">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col h-full gap-5">
          <div className="flex items-baseline justify-between">
            <span className="font-heading text-3xl font-light text-[#C97A3D]/30 leading-none">{d.num}</span>
            <span className="font-mono text-[7px] text-[#C4C8CF]/25 tracking-widest">{d.code}</span>
          </div>
          <h4 className="font-heading font-medium text-[#F4F1EB] leading-tight tracking-tight"
            style={{ fontSize: 'clamp(1.1rem, 1.8vw, 1.5rem)', whiteSpace: 'pre-line' }}>
            {d.title}
          </h4>
          <p className="font-body text-xs text-[#C4C8CF]/60 leading-relaxed flex-1">{d.desc}</p>
          <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/[0.04]">
            {d.tags.map((t) => (
              <span key={t} className="font-mono text-[7.5px] border border-white/[0.07] text-[#C4C8CF]/40 px-2 py-0.5 hover:border-[#C97A3D]/30 hover:text-[#C97A3D]/60 transition-colors">
                {t}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
