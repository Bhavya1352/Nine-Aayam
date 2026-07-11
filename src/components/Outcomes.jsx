import React, { useEffect, useRef } from 'react';
import { useCursor } from '../context/CursorContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const metrics = [
  { val: "3.4x",  raw: 3.4,  suffix: "x",  label: "AVERAGE CTR MULTIPLIER",   desc: "Achieved across landing pages and vertical reels creatives compared to generic SaaS layouts." },
  { val: "14",    raw: 14,   suffix: " Days", label: "ZERO-TO-LAUNCH SPRINT",  desc: "Average delivery sprint for a bespoke positioning, guidelines, visual kit, and copy blueprint setup." },
  { val: "100%",  raw: 100,  suffix: "%",  label: "BESPOKE ARCHITECTURE",      desc: "Completely handcrafted front-end code bases built without templates or standard cookie-cutter grids." },
  { val: "450k+", raw: 450,  suffix: "k+", label: "DRIVEN IMPRESSIONS",        desc: "Organic authority reach compiled across our active LinkedIn and Instagram custom guidelines." }
];

export default function Outcomes() {
  const { setCursor } = useCursor();
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const numRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Header entrance
      gsap.fromTo(headerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true }
        }
      );

      // Stat items stagger in
      gsap.fromTo('.outcome-stat',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 68%', once: true }
        }
      );

      // Counter roll-up for each number
      numRefs.current.forEach((el, i) => {
        if (!el) return;
        const m = metrics[i];
        const obj = { val: 0 };
        gsap.to(obj, {
          val: m.raw,
          duration: 1.8,
          ease: 'power2.out',
          delay: 0.1 * i,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 65%', once: true },
          onUpdate() {
            const v = m.suffix === 'x' ? obj.val.toFixed(1) : Math.round(obj.val);
            el.textContent = v + m.suffix;
          }
        });
      });

      // Left border line draw on each stat
      gsap.fromTo('.outcome-border',
        { scaleY: 0, transformOrigin: 'top center' },
        {
          scaleY: 1, duration: 1.0, stagger: 0.12, ease: 'power3.inOut',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 68%', once: true }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="outcomes"
      className="relative z-10 py-16 sm:py-20 px-6 md:px-12 lg:px-16 bg-[#1B1F24] border-t border-white/[0.08]"
    >
      <div className="blueprint-grid-line vertical left-6 md:left-12 lg:left-16 hidden sm:block" />

      <div className="max-w-[1200px] mx-auto relative z-10 pl-0 sm:pl-4 md:pl-8 lg:pl-12 text-left">

        <div ref={headerRef} className="flex flex-col items-start mb-16 md:mb-20" style={{ opacity: 0 }}>
          <span className="font-subheading text-[8px] sm:text-[9px] tracking-[0.3em] uppercase font-bold text-gray-500 block mb-3 select-none">
            03 // CLIENT OUTCOMES
          </span>
          <h3 className="font-heading text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight text-[#F4F1EB] mb-4">
            System Performance Metrics
          </h3>
          <p className="font-body text-[#C4C8CF] text-sm sm:text-base leading-relaxed max-w-[500px]">
            When every dimension works in unison, the results compound. We build front-ends that don't just look premium — they deliver measurable brand authority.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-x-6 md:gap-x-10 gap-y-10 md:gap-y-12 items-start">
          {metrics.map((m, idx) => (
            <div
              key={m.label}
              className={`outcome-stat flex flex-col items-start relative pl-6 sm:pl-8 ${idx % 2 !== 0 ? 'sm:mt-8' : ''}`}
              style={{ opacity: 0 }}
              onMouseEnter={() => setCursor('read')}
              onMouseLeave={() => setCursor('')}
            >
              {/* Animated left border */}
              <div className="outcome-border absolute left-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-[#C97A3D]/30 via-white/[0.04] to-transparent" style={{ scaleY: 0 }} />

              <span
                ref={el => numRefs.current[idx] = el}
                className="font-heading text-5xl sm:text-6xl md:text-7xl font-bold text-[#C97A3D] leading-none select-none tabular-nums"
              >
                {m.val}
              </span>

              <span className="font-subheading text-[9px] font-bold text-[#F4F1EB] tracking-widest uppercase mt-4 mb-2 select-none">
                {m.label}
              </span>

              <p className="font-body text-xs sm:text-sm text-[#C4C8CF] leading-relaxed max-w-[380px]">
                {m.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
