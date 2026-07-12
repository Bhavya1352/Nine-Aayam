import React, { useEffect, useRef, useState } from 'react';
import { useCursor } from '../context/CursorContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote: 'Nine Aayam rebuilt our entire identity system from scratch. Their dimensional approach gave our team clear brand vectors and visual authority that we never had before.',
    author: 'Aditya Sharma', role: 'VP of Product, FinReach', featured: true,
  },
  {
    quote: 'They own the front-end layout experience completely. Our websites load fast, look spectacular, and fit cleanly with our GrowthOS pipeline operations.',
    author: 'Rohan Verma', role: 'Founder, PeakScale',
  },
  {
    quote: 'The 14-day sprint delivery was unreal. Full brand kit, copy, and a live landing page — all handcrafted. No agency has matched this speed-to-quality ratio.',
    author: 'Priya Nair', role: 'CMO, LaunchBridge',
  },
  {
    quote: 'Our LinkedIn presence went from invisible to 450k+ impressions in three months. The social creative system they built is genuinely category-defining.',
    author: 'Karan Mehta', role: 'Co-Founder, ScaleAxis',
  },
];

export default function Testimonials() {
  const { setCursor } = useCursor();
  const sectionRef = useRef(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.tm-hdr',
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true } }
      );
      gsap.fromTo('.tm-featured',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 68%', once: true } }
      );
      gsap.fromTo('.tm-secondary',
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 60%', once: true } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Animate quote swap
  const quoteRef = useRef(null);
  const handleSwitch = (i) => {
    if (i === active) return;
    gsap.to(quoteRef.current, {
      opacity: 0, y: 10, duration: 0.25, ease: 'power2.in',
      onComplete: () => {
        setActive(i);
        gsap.fromTo(quoteRef.current,
          { opacity: 0, y: -10 },
          { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' }
        );
      }
    });
  };

  return (
    <section ref={sectionRef} id="testimonials"
      className="relative z-10 bg-[#1B1F24] overflow-hidden">

      <div className="w-full h-[1px]"
        style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.05) 30%, rgba(255,255,255,0.05) 70%, transparent)' }} />

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20 py-20 sm:py-28 md:py-36">

        {/* Header */}
        <div className="tm-hdr flex items-end justify-between mb-16 md:mb-20 opacity-0">
          <div>
            <span className="font-mono text-[8px] tracking-[0.4em] text-[#C97A3D]/60 uppercase block mb-4">
              10 — System Feedback
            </span>
            <h3 className="font-heading font-medium text-[#F4F1EB] tracking-tight leading-none"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.8rem)' }}>
              Partner<br /><span className="italic text-[#C97A3D]">Testimony</span>
            </h3>
          </div>
          {/* Large decorative quote mark */}
          <span className="font-heading text-[8rem] md:text-[12rem] text-[#C97A3D]/[0.06] leading-none select-none hidden md:block" aria-hidden>
            "
          </span>
        </div>

        {/* Featured pull-quote — interactive */}
        <div className="tm-featured opacity-0 mb-12 md:mb-16"
          onMouseEnter={() => setCursor('read')}
          onMouseLeave={() => setCursor('')}>

          <div ref={quoteRef} className="relative pl-6 md:pl-10 border-l-2 border-[#C97A3D]/40">
            <p className="font-heading italic text-[#F4F1EB] leading-[1.35] mb-6"
              style={{ fontSize: 'clamp(1.3rem, 2.8vw, 2.4rem)' }}>
              "{testimonials[active].quote}"
            </p>
            <div className="flex items-center gap-3">
              <div className="w-6 h-[1px] bg-[#C97A3D]/40" />
              <div>
                <span className="font-subheading text-xs font-bold text-[#C97A3D] block tracking-wide">
                  {testimonials[active].author}
                </span>
                <span className="font-mono text-[8px] text-[#C4C8CF]/40 uppercase tracking-wider mt-0.5 block">
                  {testimonials[active].role}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Secondary testimonials — horizontal list */}
        <div className="grid sm:grid-cols-3 gap-0 border-t border-white/[0.05]">
          {testimonials.filter((_, i) => i !== active).map((t, i) => {
            const realIdx = testimonials.indexOf(t);
            return (
              <button key={realIdx} type="button"
                className="tm-secondary opacity-0 text-left p-6 md:p-8 border-r border-white/[0.05] last:border-r-0 group hover:bg-white/[0.015] transition-colors duration-300"
                onClick={() => handleSwitch(realIdx)}
                onMouseEnter={() => setCursor('read')}
                onMouseLeave={() => setCursor('')}>
                <p className="font-heading italic text-sm text-[#C4C8CF]/50 leading-relaxed mb-4 group-hover:text-[#C4C8CF]/80 transition-colors line-clamp-3">
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-[1px] bg-[#C97A3D]/30 group-hover:w-5 transition-all duration-300" />
                  <span className="font-mono text-[8px] text-[#C97A3D]/40 group-hover:text-[#C97A3D]/70 transition-colors uppercase tracking-wider">
                    {t.author}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
}
