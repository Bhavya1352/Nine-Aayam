import React, { useEffect, useRef } from 'react';
import { useCursor } from '../context/CursorContext';
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
  }
];

export default function Testimonials() {
  const { setCursor } = useCursor();
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Header
      gsap.fromTo('.testimonials-header',
        { opacity: 0, y: 24 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true }
        }
      );

      // Quote cards stagger in from bottom
      gsap.fromTo('.testimonial-card',
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 1.0, stagger: 0.18, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 68%', once: true }
        }
      );

      // Gold left border draw
      gsap.fromTo('.testimonial-border',
        { scaleY: 0, transformOrigin: 'top center' },
        {
          scaleY: 1, duration: 1.2, stagger: 0.18, ease: 'power3.inOut',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 68%', once: true }
        }
      );

      // Author line fade
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
      className="relative z-10 py-24 sm:py-32 px-6 md:px-12 lg:px-16 bg-[#1B1F24] border-t border-white/[0.08] overflow-hidden"
    >
      <div className="blueprint-grid-line vertical left-6 md:left-12 lg:left-16 hidden sm:block" />

      {/* Large decorative quote mark */}
      <span className="absolute right-8 top-12 font-heading text-[18rem] leading-none text-white/[0.012] select-none pointer-events-none hidden lg:block">
        "
      </span>

      <div className="max-w-[1200px] mx-auto relative z-10 pl-0 sm:pl-4 md:pl-8 lg:pl-12">

        <div className="testimonials-header flex flex-col items-start mb-16 text-left" style={{ opacity: 0 }}>
          <span className="font-subheading text-[8px] sm:text-[9px] tracking-[0.3em] uppercase font-bold text-gray-400 block mb-3 select-none">
            07 // SYSTEM FEEDBACK
          </span>
          <h3 className="font-heading text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight text-[#F4F1EB] mb-4">
            Partner Testimony
          </h3>
        </div>

        <div className="grid md:grid-cols-2 gap-10 md:gap-12 lg:gap-16 items-start">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="testimonial-card relative pl-6 sm:pl-8 flex flex-col justify-between min-h-[180px]"
              style={{ opacity: 0 }}
              onMouseEnter={() => setCursor('read')}
              onMouseLeave={() => setCursor('')}
            >
              {/* Animated left border */}
              <div
                className="testimonial-border absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#C97A3D]/60 via-[#C97A3D]/20 to-transparent"
                style={{ scaleY: 0 }}
              />

              {/* Small gold quote mark */}
              <span className="font-heading text-4xl text-[#C97A3D]/30 leading-none mb-3 select-none block">
                "
              </span>

              <p className="font-heading text-lg md:text-xl lg:text-2xl italic text-[#F4F1EB] leading-[1.5] mb-8">
                {t.quote}
              </p>

              <div className="testimonial-author flex items-center gap-3" style={{ opacity: 0 }}>
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
          ))}
        </div>

      </div>
    </section>
  );
}
