import React, { useState, useEffect, useRef } from 'react';
import { useCursor } from '../context/CursorContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    q: 'Kya aap sirf startups ke liye ho?',
    a: 'Nahi. Hum startups, scale-ups, aur established businesses — sabke saath kaam karte hain. Requirement yeh hai ki aap apni brand ko seriously lete ho aur creative system mein invest karna chahte ho.',
  },
  {
    q: 'Typical project timeline kya hoti hai?',
    a: 'Brand identity + guidelines: 10–14 days. Full creative system (multiple dimensions): 3–6 weeks. Accelerated sprint available hai urgent launches ke liye.',
  },
  {
    q: 'Kya aap ek hi dimension pe kaam karte ho ya full system chahiye?',
    a: 'Dono. Aap sirf ek dimension — jaise sirf web development ya sirf social media creative — ke liye engage kar sakte ho. Ya phir full Nine Aayam system activate kar sakte ho.',
  },
  {
    q: 'Templates use karte ho ya sab handcrafted hota hai?',
    a: 'Zero templates. Har asset — code se lekar design tak — scratch se banaya jaata hai. Yahi hamara core promise hai: 100% bespoke architecture.',
  },
  {
    q: 'Revision cycles kaise kaam karte hain?',
    a: 'Har project mein structured review rounds included hain. Discovery ke baad ek direction brief approve hota hai, phir design phase mein 2 revision rounds.',
  },
  {
    q: 'Kya aap ongoing retainer pe kaam karte ho?',
    a: 'Haan. Monthly creative retainers available hain — social media, motion, aur campaign creatives ke liye.',
  },
];

export default function FAQ() {
  const { setCursor } = useCursor();
  const sectionRef = useRef(null);
  const [open, setOpen] = useState(null);
  const answerRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.fq-hdr',
        { opacity: 0, y: 30, x: -15 },
        { opacity: 1, y: 0, x: 0, duration: 1.0, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', once: true } }
      );
      gsap.fromTo('.fq-item',
        { opacity: 0, y: 25, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.08, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', once: true } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const toggle = (idx) => {
    const prev = open;
    setOpen(open === idx ? null : idx);
    // Animate answer in with enhanced transitions
    if (open !== idx && answerRefs.current[idx]) {
      gsap.fromTo(answerRefs.current[idx],
        { opacity: 0, y: -12, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'power3.out', delay: 0.08 }
      );
    }
  };

  return (
    <section ref={sectionRef} id="faq"
      className="relative z-10 bg-[#1B1F24] overflow-hidden">

      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[15%] right-[-5%] w-[40vw] h-[50vh] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(201,122,61,0.02) 0%, transparent 60%)' }} />
        <div className="absolute bottom-[20%] left-[-10%] w-[35vw] h-[45vh] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(37,43,51,0.75) 0%, transparent 65%)' }} />
      </div>


      <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20 py-12 sm:py-16 md:py-20">

        {/* Header */}
        <div className="fq-hdr mb-14 md:mb-18 opacity-0">
          <span className="font-mono text-[9px] tracking-[0.45em] text-[#C97A3D]/70 uppercase block mb-4 font-semibold">
            09 — Common Questions
          </span>
          <h3 className="font-heading font-medium text-[#F4F1EB] tracking-tight leading-none"
            style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3.5rem)' }}>
            Frequently <span className="italic text-[#C97A3D]">Asked</span>
          </h3>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-24 items-start">

          {/* Accordion */}
          <div className="lg:col-span-8 divide-y divide-white/[0.04]">
            {faqs.map((faq, idx) => (
              <div key={idx} className="fq-item opacity-0">
                <button type="button"
                  className="w-full flex items-start justify-between gap-8 py-8 text-left group transition-colors duration-500"
                  style={{ 
                    background: open === idx ? 'linear-gradient(135deg, rgba(255,255,255,0.01) 0%, transparent 100%)' : 'transparent'
                  }}
                  onClick={() => toggle(idx)}
                  onMouseEnter={() => setCursor('view')}
                  onMouseLeave={() => setCursor('')}>
                  <span className="font-heading text-base sm:text-lg md:text-xl font-medium text-[#F4F1EB] leading-snug group-hover:text-[#E0A96D]/90 transition-colors duration-400">
                    {faq.q}
                  </span>
                  <span className="shrink-0 mt-1 w-6 h-6 border border-[#C97A3D]/35 flex items-center justify-center text-[#C97A3D] transition-all duration-400 group-hover:border-[#C97A3D]/50"
                    style={{ 
                      transform: open === idx ? 'rotate(45deg)' : 'rotate(0deg)',
                      background: open === idx ? 'rgba(201,122,61,0.05)' : 'transparent'
                    }}>
                    <svg viewBox="0 0 10 10" className="w-3 h-3" fill="none">
                      <path d="M5 1v8M1 5h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </span>
                </button>

                {open === idx && (
                  <div ref={el => answerRefs.current[idx] = el} className="pb-8">
                    <p className="font-body text-sm text-[#C4C8CF]/65 leading-relaxed max-w-[620px]">
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Side CTA — typographic, no card box with enhanced styling */}
          <div className="lg:col-span-4 fq-item opacity-0 lg:pt-8">
            <div className="relative pl-8 border-l-2 border-[#C97A3D]/30"
              style={{ 
                background: 'linear-gradient(135deg, rgba(255,255,255,0.005) 0%, transparent 100%)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.01)'
              }}>
              <span className="font-mono text-[9px] tracking-[0.4em] text-[#C97A3D]/60 uppercase block mb-5">
                Still have questions?
              </span>
              <p className="font-heading text-2xl md:text-3xl font-light text-[#F4F1EB] leading-snug mb-8">
                Drop us a line. We respond within 24 hours.
              </p>
              <a href="mailto:connect@nayagrowth.com"
                className="group inline-flex items-center gap-3 font-mono text-[10px] tracking-[0.35em] text-[#C97A3D] uppercase hover:text-[#E0A96D] transition-colors"
                onMouseEnter={() => setCursor('connect')}
                onMouseLeave={() => setCursor('')}>
                <span>Connect With Us</span>
                <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
