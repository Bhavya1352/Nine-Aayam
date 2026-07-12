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
        { opacity: 0, y: 30, x: -15 },
        { opacity: 1, y: 0, x: 0, duration: 1.0, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true } }
      );
      gsap.fromTo('.tm-featured',
        { opacity: 0, y: 50, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 68%', once: true } }
      );
      gsap.fromTo('.tm-secondary',
        { opacity: 0, y: 30, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 0.9, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 60%', once: true } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Animate quote swap with enhanced transitions
  const quoteRef = useRef(null);
  const handleSwitch = (i) => {
    if (i === active) return;
    gsap.to(quoteRef.current, {
      opacity: 0, y: 15, scale: 0.98, duration: 0.3, ease: 'power2.in',
      onComplete: () => {
        setActive(i);
        gsap.fromTo(quoteRef.current,
          { opacity: 0, y: -15, scale: 0.98 },
          { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'power3.out' }
        );
      }
    });
  };

  return (
    <section ref={sectionRef} id="testimonials"
      className="relative z-10 bg-[#1B1F24] overflow-hidden">

      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[20%] left-[-8%] w-[45vw] h-[55vh] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(201,122,61,0.025) 0%, transparent 60%)' }} />
        <div className="absolute bottom-[25%] right-[-10%] w-[40vw] h-[50vh] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(37,43,51,0.8) 0%, transparent 65%)' }} />
      </div>


      <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20 py-12 sm:py-16 md:py-20">

        {/* Header */}
        <div className="tm-hdr flex items-end justify-between mb-14 md:mb-18 opacity-0">
          <div>
            <span className="font-mono text-[9px] tracking-[0.45em] text-[#C97A3D]/70 uppercase block mb-4 font-semibold">
              10 — System Feedback
            </span>
            <h3 className="font-heading font-medium text-[#F4F1EB] tracking-tight leading-none"
              style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3.5rem)' }}>
              Partner <span className="italic text-[#C97A3D]">Testimony</span>
            </h3>
          </div>
          {/* Large decorative quote mark */}
          <span className="font-heading text-[6rem] md:text-[9rem] text-[#C97A3D]/[0.07] leading-none select-none hidden md:block" aria-hidden>
            "
          </span>
        </div>

        {/* Featured pull-quote — interactive with enhanced styling */}
        <div className="tm-featured opacity-0 mb-16 md:mb-20"
          onMouseEnter={() => setCursor('read')}
          onMouseLeave={() => setCursor('')}>

          <div ref={quoteRef} className="relative pl-8 md:pl-12 border-l-3 border-[#C97A3D]/50"
            style={{ 
              background: 'linear-gradient(135deg, rgba(255,255,255,0.01) 0%, transparent 100%)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.02)'
            }}>
            <p className="font-heading italic text-[#F4F1EB] leading-[1.3] mb-8"
              style={{ fontSize: 'clamp(1.5rem, 3.2vw, 2.8rem)' }}>
              "{testimonials[active].quote}"
            </p>
            <div className="flex items-center gap-4">
              <div className="w-8 h-[1px] bg-gradient-to-r from-[#C97A3D] to-[#C97A3D]/50" />
              <div>
                <span className="font-subheading text-sm font-bold text-[#C97A3D] block tracking-wide">
                  {testimonials[active].author}
                </span>
                <span className="font-mono text-[9px] text-[#C4C8CF]/50 uppercase tracking-wider mt-1 block">
                  {testimonials[active].role}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Secondary testimonials — horizontal list with enhanced styling */}
        <div className="grid sm:grid-cols-3 gap-0">
          {testimonials.filter((_, i) => i !== active).map((t, i) => {
            const realIdx = testimonials.indexOf(t);
            return (
              <button key={realIdx} type="button"
                className="tm-secondary opacity-0 text-left p-8 md:p-10 border-r border-white/[0.04] last:border-r-0 group transition-all duration-500"
                style={{ 
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.005) 0%, transparent 100%)',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.01)'
                }}
                onClick={() => handleSwitch(realIdx)}
                onMouseEnter={() => setCursor('read')}
                onMouseLeave={() => setCursor('')}>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(201,122,61,0.03) 0%, transparent 65%)' }} />
                <div className="relative z-10">
                  <p className="font-heading italic text-sm text-[#C4C8CF]/55 leading-relaxed mb-5 group-hover:text-[#C4C8CF]/85 transition-colors line-clamp-3">
                    "{t.quote}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-[1px] bg-[#C97A3D]/40 group-hover:w-6 group-hover:bg-[#C97A3D] transition-all duration-400" />
                    <span className="font-mono text-[9px] text-[#C97A3D]/50 group-hover:text-[#C97A3D]/80 transition-colors uppercase tracking-wider">
                      {t.author}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
}
