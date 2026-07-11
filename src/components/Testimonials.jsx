import React, { useEffect, useRef, useState } from 'react';
import { useCursor } from '../context/CursorContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote: "Nine Aayam rebuilt our entire identity system from scratch. Their dimensional approach gave our team clear brand vectors and visual authority.",
    author: "Aditya Sharma",
    role: "VP of Product, FinReach"
  },
  {
    quote: "They own the front-end layout experience completely. Our websites load fast, look spectacular, and fit cleanly with our GrowthOS pipeline operations.",
    author: "Rohan Verma",
    role: "Founder, PeakScale"
  },
  {
    quote: "The 14-day sprint delivery was unreal. Full brand kit, copy, and a live landing page — all handcrafted. No agency has matched this speed-to-quality ratio.",
    author: "Priya Nair",
    role: "CMO, LaunchBridge"
  },
  {
    quote: "Our LinkedIn presence went from invisible to 450k+ impressions in three months. The social creative system they built is genuinely category-defining.",
    author: "Karan Mehta",
    role: "Co-Founder, ScaleAxis"
  }
];

export default function Testimonials() {
  const { setCursor } = useCursor();
  const sectionRef = useRef(null);
  const [active, setActive] = useState(0);

  const prev = () => setActive((a) => (a - 1 + testimonials.length) % testimonials.length);
  const next = () => setActive((a) => (a + 1) % testimonials.length);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.testimonials-header',
        { opacity: 0, y: 24 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true }
        }
      );

      gsap.fromTo('.testimonial-card',
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 1.0, stagger: 0.18, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 68%', once: true }
        }
      );

      gsap.fromTo('.testimonial-border',
        { scaleY: 0, transformOrigin: 'top center' },
        {
          scaleY: 1, duration: 1.2, stagger: 0.18, ease: 'power3.inOut',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 68%', once: true }
        }
      );

      gsap.fromTo('.testimonial-author',
        { opacity: 0, x: 10 },
        {
          opacity: 1, x: 0, duration: 0.7, stagger: 0.18, ease: 'power2.out', delay: 0.4,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 65%', once: true }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative z-10 py-16 sm:py-20 px-6 md:px-12 lg:px-16 bg-[#1B1F24] border-t border-white/[0.08] overflow-hidden"
    >
      <div className="blueprint-grid-line vertical left-6 md:left-12 lg:left-16 hidden sm:block" />

      <span className="absolute right-8 top-12 font-heading text-[18rem] leading-none text-white/[0.012] select-none pointer-events-none hidden lg:block">
        "
      </span>

      <div className="max-w-[1200px] mx-auto relative z-10 pl-0 sm:pl-4 md:pl-8 lg:pl-12">

        <div className="testimonials-header flex flex-col items-start mb-16 text-left" style={{ opacity: 0 }}>
          <span className="font-subheading text-[8px] sm:text-[9px] tracking-[0.3em] uppercase font-bold text-gray-400 block mb-3 select-none">
            10 // SYSTEM FEEDBACK
          </span>
          <h3 className="font-heading text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight text-[#F4F1EB] mb-4">
            Partner Testimony
          </h3>
        </div>

        {/* Desktop: 2×2 grid */}
        <div className="hidden md:grid md:grid-cols-2 gap-8 md:gap-10 lg:gap-12 items-start">
          {testimonials.map((t, idx) => (
            <TestimonialCard key={idx} t={t} setCursor={setCursor} />
          ))}
        </div>

        {/* Mobile: carousel */}
        <div className="md:hidden">
          <div className="overflow-hidden">
            <TestimonialCard t={testimonials[active]} setCursor={setCursor} forceVisible={true} />
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-8">
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActive(i)}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === active ? 'bg-[#C97A3D] w-4' : 'bg-white/20'}`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={prev}
                className="w-9 h-9 rounded-full border border-white/[0.1] flex items-center justify-center text-[#C4C8CF] hover:border-[#C97A3D]/40 hover:text-[#C97A3D] transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={next}
                className="w-9 h-9 rounded-full border border-white/[0.1] flex items-center justify-center text-[#C4C8CF] hover:border-[#C97A3D]/40 hover:text-[#C97A3D] transition-all"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

function TestimonialCard({ t, setCursor, forceVisible = false }) {
  return (
    <div
      className="testimonial-card relative pl-6 sm:pl-8 flex flex-col justify-between min-h-[180px]"
      style={{ opacity: forceVisible ? 1 : 0 }}
      onMouseEnter={() => setCursor('read')}
      onMouseLeave={() => setCursor('')}
    >
      <div
        className="testimonial-border absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#C97A3D]/60 via-[#C97A3D]/20 to-transparent"
        style={{ scaleY: 0 }}
      />

      <span className="font-heading text-4xl text-[#C97A3D]/30 leading-none mb-3 select-none block">
        "
      </span>

      <p className="font-heading text-lg md:text-xl lg:text-2xl italic text-[#F4F1EB] leading-[1.5] mb-8">
        {t.quote}
      </p>

      <div className="testimonial-author flex items-center gap-3" style={{ opacity: forceVisible ? 1 : 0 }}>
        <div className="w-6 h-[1px] bg-[#C97A3D]/40" />
        <div>
          <span className="font-subheading text-xs font-bold text-[#C97A3D] block tracking-wide">
            {t.author}
          </span>
          <span className="font-mono text-[9px] text-[#C4C8CF] uppercase tracking-wider mt-0.5 block">
            {t.role}
          </span>
        </div>
      </div>
    </div>
  );
}
