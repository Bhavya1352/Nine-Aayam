import React, { useState, useRef, useEffect } from 'react';
import { useCursor } from '../context/CursorContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const dimensionData = {
  1: { num: '01', title: 'Brand Strategy & Identity',
    short: 'Defining who you are, how you speak, and how you look. We craft the strategic DNA that guides all visual outputs.',
    capabilities: ['Brand positioning & verbal strategy', 'Logo systems & visual guidelines', 'Color theory, type rules & tokens', 'Tone of voice and editorial guidelines'] },
  2: { num: '02', title: 'Graphic Design',
    short: 'Premium visual assets engineered to elevate corporate decks, collateral, and marketing assets into industry-leading design statements.',
    capabilities: ['Corporate profiles & sales sheets', 'Business pitch decks & presentations', 'Product catalogs & investor reports', 'Exhibition layouts & print collateral'] },
  3: { num: '03', title: 'Content & Copywriting',
    short: 'High-impact language that moves beyond passive reading. We construct campaigns, brand scripts, and taglines designed to hook and convert.',
    capabilities: ['Founder narrative storytelling', 'High-converting landing page copy', 'Video scripts & brand hooks', 'Campaign headlines & slogans'] },
  4: { num: '04', title: 'Social Media Creative',
    short: 'Building an active, premium presence across Instagram and LinkedIn. We design structured assets to command category authority.',
    capabilities: ['LinkedIn editorial carousels', 'Instagram grid structures & designs', 'Cohesive reels cover frameworks', 'Monthly brand operation templates'] },
  5: { num: '05', title: 'Ad Campaigns',
    short: 'Strategic paid traffic creatives designed to stand out. We balance visual hook-rates with copy angles to secure maximum ROI.',
    capabilities: ['High-converting Meta ad structures', 'Google Display Network layout assets', 'Festive launch campaign suites', 'A/B creative testing system assets'] },
  6: { num: '06', title: 'Video & Motion Design',
    short: 'Motion systems and vertical content pacing built for modern channels. We turn static brand stories into high-tempo, narrative assets.',
    capabilities: ['LinkedIn dynamic video templates', 'Subtle cinematic reel treatments', 'Subtitles layout & timing direction', 'Interactive social media animations'] },
  7: { num: '07', title: 'Photo Direction',
    short: 'Visual coordination that makes brand imagery feel intentional. We set production moodboards, styling rules, and art guidelines.',
    capabilities: ['Office team shoot moodboards', 'Art direction for founder profiles', 'Staging guidelines & catalog style', 'Visual moodboards & style coordinates'] },
  8: { num: '08', title: 'UI/UX Design',
    short: 'High-end product structures built in Figma. We balance responsive interfaces with visual design consistency.',
    capabilities: ['Interactive product wireframing', 'Visual design systems & asset libraries', 'High-fidelity responsive layouts', 'Figma workspace styling guidelines'] },
  9: { num: '09', title: 'Web Development',
    short: 'Premium frontend deployment that behaves fluidly. We engineer high-performance web systems utilizing creative code.',
    capabilities: ['Modern React frontend systems', 'Fluid page transitions & load models', 'Performance optimization & structures', 'Custom animation library integrations'] },
};

export default function Philosophy() {
  const { setCursor } = useCursor();
  const [activeDim, setActiveDim] = useState(1);
  const contentRef = useRef(null);
  const dialRef = useRef(null);
  const sectionRef = useRef(null);
  const glowRef = useRef(null);

  const radius = 140;
  const nodes = Array.from({ length: 9 }, (_, i) => i + 1);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.ph-hdr',
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', once: true } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const angle = -(activeDim - 1) * 40;
    gsap.to(dialRef.current, { rotation: angle, duration: 1.0, ease: 'power2.inOut' });
    const nodesEl = dialRef.current?.querySelectorAll('.node-pos');
    if (nodesEl) {
      nodesEl.forEach((n) => gsap.to(n, { rotation: -angle, duration: 1.0, ease: 'power2.inOut' }));
    }
    if (contentRef.current) {
      const q = gsap.utils.selector(contentRef.current);
      gsap.set(q('.afu'), { opacity: 0, y: 16 });
      gsap.to(q('.afu'), { opacity: 1, y: 0, duration: 0.7, stagger: 0.09, ease: 'power3.out' });
    }
  }, [activeDim]);

  useEffect(() => {
    gsap.to(glowRef.current, {
      opacity: 0.3, scale: 1.08, duration: 3.8,
      repeat: -1, yoyo: true, ease: 'sine.inOut'
    });
  }, []);

  useEffect(() => {
    const handler = (e) => { if (dimensionData[e.detail]) setActiveDim(e.detail); };
    window.addEventListener('selectDimension', handler);
    return () => window.removeEventListener('selectDimension', handler);
  }, []);

  const d = dimensionData[activeDim];

  return (
    <section ref={sectionRef} id="philosophy"
      className="relative z-10 bg-[#0F1218] overflow-hidden">

      <div className="w-full h-[1px]"
        style={{ background: 'linear-gradient(to right, transparent, rgba(201,122,61,0.12) 30%, rgba(201,122,61,0.12) 70%, transparent)' }} />

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20 py-20 sm:py-28 md:py-36">

        {/* Header */}
        <div className="ph-hdr mb-14 md:mb-20 opacity-0">
          <span className="font-mono text-[8px] tracking-[0.4em] text-[#C97A3D]/60 uppercase block mb-4">
            01 — Interactive Grid
          </span>
          <div className="flex flex-col md:flex-row md:items-end gap-6 md:gap-16">
            <h2 className="font-heading font-medium text-white tracking-tight leading-none shrink-0"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.8rem)' }}>
              The Nine<br /><span className="italic text-[#C97A3D]">Dimensions</span>
            </h2>
            <p className="font-body text-sm text-white/40 leading-relaxed max-w-[400px]">
              Click nodes on the visual instrument to explore how we project design assets across our unified creative system.
            </p>
          </div>
        </div>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-12 gap-10 md:gap-12 lg:gap-16 items-center">

          {/* Content pane */}
          <div className="lg:col-span-7 flex flex-col items-start order-2 lg:order-1">
            <div ref={contentRef} className="w-full">

              <span className="afu font-heading leading-none select-none tracking-tighter block mb-2 text-[#C97A3D]/[0.07]"
                style={{ fontSize: 'clamp(5rem, 12vw, 11rem)', fontWeight: 900 }}>
                {d.num}
              </span>

              <span className="afu font-mono text-[9px] font-bold text-[#C97A3D]/60 tracking-[0.3em] uppercase block mb-3">
                Dimension System
              </span>

              <h3 className="afu font-heading font-semibold text-white tracking-tight mb-5"
                style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2.4rem)' }}>
                {d.title}
              </h3>

              <p className="afu font-body text-white/50 text-sm leading-relaxed max-w-[520px] mb-8">
                {d.short}
              </p>

              <div className="afu border-t border-white/[0.05] pt-6">
                <span className="font-mono text-[8px] font-bold text-white/25 uppercase tracking-[0.3em] block mb-4">
                  Scope & Focus Area
                </span>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {d.capabilities.map((cap, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-white/60 font-body">
                      <span className="w-1 h-1 rounded-full bg-[#C97A3D] mt-2 shrink-0" />
                      {cap}
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>

          {/* Mobile tab selector */}
          <div className="flex flex-wrap gap-1.5 justify-center lg:hidden w-full max-w-[420px] mx-auto order-1 mb-4">
            {nodes.map((num) => (
              <button key={num} type="button"
                className={`py-1.5 px-3 text-[9px] font-bold font-mono tracking-wider transition-all duration-200
                  ${activeDim === num
                    ? 'bg-[#C97A3D] text-[#0F1218]'
                    : 'bg-white/[0.03] border border-white/[0.06] text-white/40 hover:text-white'}`}
                onClick={() => setActiveDim(num)}>
                {num.toString().padStart(2, '0')}
              </button>
            ))}
          </div>

          {/* Dial — desktop only */}
          <div className="hidden lg:flex lg:col-span-5 flex-col items-center justify-center relative min-h-[380px] order-1 lg:order-2">

            <div ref={glowRef}
              className="absolute w-[320px] h-[320px] rounded-full pointer-events-none opacity-15"
              style={{ background: 'radial-gradient(circle, rgba(201,122,61,0.3) 0%, transparent 70%)' }} />

            <div className="philosophy-dial-container select-none z-10">

              {/* Center hub */}
              <div className="absolute z-20 w-20 h-20 bg-[#0F1218] border border-white/[0.08] flex flex-col items-center justify-center"
                style={{ clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))' }}>
                <span className="font-heading text-base font-black text-white">9D</span>
                <span className="font-mono text-[6px] font-bold text-white/30 tracking-[0.2em]">AAYAM</span>
              </div>

              {/* SVG rings */}
              <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-0" viewBox="0 0 380 380">
                <circle cx="190" cy="190" r={radius} fill="none" stroke="rgba(201,122,61,0.08)" strokeWidth="1" strokeDasharray="4 8" />
                <circle cx="190" cy="190" r={radius - 40} fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
              </svg>

              {/* Rotating dial */}
              <div ref={dialRef} className="absolute top-0 left-0 w-full h-full z-10">
                {nodes.map((num) => {
                  const isActive = activeDim === num;
                  const angle = (num - 1) * 40 * (Math.PI / 180);
                  const xPct = 50 + (radius / 380) * 100 * Math.sin(angle);
                  const yPct = 50 - (radius / 380) * 100 * Math.cos(angle);
                  return (
                    <button key={num} type="button"
                      className="node-pos absolute w-8 h-8 flex items-center justify-center transition-all duration-300 -translate-x-1/2 -translate-y-1/2"
                      style={{ left: `${xPct}%`, top: `${yPct}%` }}
                      onClick={() => setActiveDim(num)}
                      onMouseEnter={() => setCursor('view')}
                      onMouseLeave={() => setCursor('')}>
                      <div className={`w-full h-full flex items-center justify-center transition-all duration-300
                        ${isActive
                          ? 'bg-[#C97A3D] text-[#0F1218] shadow-lg shadow-[#C97A3D]/20 scale-110'
                          : 'bg-[#0F1218] border border-white/[0.08] hover:border-[#C97A3D]/40 text-white/40 hover:text-white hover:scale-105'}`}
                        style={{ clipPath: 'polygon(0 0, calc(100% - 5px) 0, 100% 5px, 100% 100%, 5px 100%, 0 calc(100% - 5px))' }}>
                        <span className="font-mono text-[8px] font-extrabold">
                          {num.toString().padStart(2, '0')}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
