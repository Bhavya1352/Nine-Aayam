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
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true } }
      );

      gsap.fromTo('.oc-stat',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 68%', once: true } }
      );

      numRefs.current.forEach((el, i) => {
        if (!el) return;
        const m = metrics[i];
        const obj = { val: 0 };
        gsap.to(obj, {
          val: m.raw, duration: 2.0, ease: 'power2.out',
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
      {/* Full-bleed top accent */}
      <div className="w-full h-[1px]"
        style={{ background: 'linear-gradient(to right, transparent, rgba(201,122,61,0.15) 30%, rgba(201,122,61,0.15) 70%, transparent)' }} />

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20 py-20 sm:py-28 md:py-36">

        {/* Header — asymmetric */}
        <div className="oc-header grid md:grid-cols-12 gap-8 items-end mb-16 md:mb-24 opacity-0">
          <div className="md:col-span-7">
            <span className="font-mono text-[8px] tracking-[0.4em] text-[#C97A3D]/60 uppercase block mb-4">
              03 — Client Outcomes
            </span>
            <h3 className="font-heading font-medium text-[#F4F1EB] tracking-tight leading-none"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.8rem)' }}>
              System Performance<br />
              <span className="italic text-[#C97A3D]">Metrics</span>
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
              className={`oc-stat group relative opacity-0 py-10 md:py-14 px-8 md:px-12 border-white/[0.05]
                ${idx % 2 === 0 ? 'border-r' : ''}
                ${idx < 2 ? 'border-b' : ''}
                ${idx === 1 ? 'sm:mt-12' : ''}
                ${idx === 3 ? 'sm:-mt-12' : ''}
              `}
              onMouseEnter={() => setCursor('read')}
              onMouseLeave={() => setCursor('')}
            >
              {/* Hover fill */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at 20% 50%, rgba(201,122,61,0.03) 0%, transparent 70%)' }} />

              <span
                ref={el => numRefs.current[idx] = el}
                className="font-heading font-bold text-[#C97A3D] leading-none block mb-4 tabular-nums select-none"
                style={{ fontSize: 'clamp(3.5rem, 7vw, 7rem)' }}
              >
                {m.val}
              </span>

              <span className="font-mono text-[9px] font-bold text-[#F4F1EB]/70 tracking-[0.25em] uppercase block mb-3">
                {m.label}
              </span>

              <p className="font-body text-xs text-[#C4C8CF]/50 leading-relaxed max-w-[320px]">
                {m.desc}
              </p>

              {/* Corner accent */}
              <div className="absolute bottom-4 right-4 w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 right-0 w-full h-[1px] bg-[#C97A3D]/40" />
                <div className="absolute bottom-0 right-0 w-[1px] h-full bg-[#C97A3D]/40" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
