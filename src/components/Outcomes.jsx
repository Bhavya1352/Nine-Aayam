import React, { useEffect, useRef } from 'react';
import { useCursor } from '../context/CursorContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const metrics = [
  { val: '3.4x', raw: 3.4, suffix: 'x', label: 'Average CTR Multiplier',
    desc: 'Achieved across landing pages and vertical reels creatives compared to generic SaaS layouts.' },
  { val: '14', raw: 14, suffix: ' Days', label: 'Zero-to-Launch Sprint',
    desc: 'Average delivery sprint for a bespoke positioning, guidelines, visual kit, and copy blueprint.' },
  { val: '100%', raw: 100, suffix: '%', label: 'Bespoke Architecture',
    desc: 'Completely handcrafted front-end code bases built without templates or cookie-cutter grids.' },
  { val: '450k+', raw: 450, suffix: 'k+', label: 'Driven Impressions',
    desc: 'Organic authority reach compiled across active LinkedIn and Instagram custom guidelines.' },
];

export default function Outcomes() {
  const { setCursor } = useCursor();
  const sectionRef = useRef(null);
  const numRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {

      gsap.fromTo('.oc-header',
        { opacity: 0, y: 35, x: -15 },
        { opacity: 1, y: 0, x: 0, duration: 1.0, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true } }
      );

      gsap.fromTo('.oc-stat',
        { opacity: 0, y: 50, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 0.9, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 68%', once: true } }
      );

      numRefs.current.forEach((el, i) => {
        if (!el) return;
        const m = metrics[i];
        const obj = { val: 0 };
        gsap.to(obj, {
          val: m.raw, duration: 2.2, ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 65%', once: true },
          onUpdate() {
            const v = m.suffix === 'x' ? obj.val.toFixed(1) : Math.round(obj.val);
            el.textContent = v + m.suffix;
          }
        });
      });

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="outcomes"
      className="relative z-10 bg-[#1B1F24] overflow-hidden"
    >
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[15%] left-[-8%] w-[45vw] h-[55vh] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(201,122,61,0.025) 0%, transparent 60%)' }} />
        <div className="absolute bottom-[20%] right-[-10%] w-[40vw] h-[50vh] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(37,43,51,0.8) 0%, transparent 65%)' }} />
      </div>


      <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20 py-12 sm:py-16 md:py-20">

        {/* Header — asymmetric */}
        <div className="oc-header grid md:grid-cols-12 gap-8 items-end mb-14 md:mb-18 opacity-0">
          <div className="md:col-span-7">
            <span className="font-mono text-[9px] tracking-[0.45em] text-[#C97A3D]/70 uppercase block mb-4 font-semibold">
              03 — Client Outcomes
            </span>
            <h3 className="font-heading font-medium text-[#F4F1EB] tracking-tight leading-none"
              style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3.5rem)' }}>
              System Performance <span className="italic text-[#C97A3D]">Metrics</span>
            </h3>
          </div>
          <p className="md:col-span-5 font-body text-sm text-[#C4C8CF]/55 leading-relaxed">
            When every dimension works in unison, the results compound. We build front-ends that don't just look premium — they deliver measurable brand authority.
          </p>
        </div>

        {/* Stats — alternating offset layout */}
        <div className="grid sm:grid-cols-2 gap-0">
          {metrics.map((m, idx) => (
            <div
              key={m.label}
              className={`oc-stat group relative opacity-0 py-10 md:py-12 px-8 md:px-10
                ${idx % 2 === 0 ? 'border-r border-white/[0.04]' : ''}
                ${idx < 2 ? 'border-b border-white/[0.04]' : ''}
                ${idx === 1 ? 'sm:mt-12' : ''}
                ${idx === 3 ? 'sm:-mt-12' : ''}
              `}
              style={{ 
                background: 'linear-gradient(135deg, rgba(255,255,255,0.01) 0%, transparent 100%)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.02)'
              }}
              onMouseEnter={() => setCursor('read')}
              onMouseLeave={() => setCursor('')}
            >
              {/* Hover fill - layered */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-600 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at 25% 50%, rgba(201,122,61,0.05) 0%, transparent 70%)' }} />
              
              {/* Data visualization bar */}
              <div className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-[#C97A3D] to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-500"
                style={{ width: `${(idx + 1) * 25}%` }} />

              <div className="relative z-10">
                <span
                  ref={el => numRefs.current[idx] = el}
                  className="font-heading font-bold text-[#C97A3D] leading-none block mb-4 tabular-nums select-none"
                  style={{ fontSize: 'clamp(3rem, 6vw, 6rem)' }}
                >
                  {m.val}
                </span>

                <span className="font-mono text-[10px] font-bold text-[#F4F1EB]/75 tracking-[0.28em] uppercase block mb-4">
                  {m.label}
                </span>

                <p className="font-body text-xs text-[#C4C8CF]/55 leading-relaxed max-w-[340px]">
                  {m.desc}
                </p>
              </div>

              {/* Corner accent */}
              <div className="absolute bottom-5 right-5 w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                <div className="absolute bottom-0 right-0 w-full h-[1px] bg-[#C97A3D]/50" />
                <div className="absolute bottom-0 right-0 w-[1px] h-full bg-[#C97A3D]/50" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
