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
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', once: true } }
      );
      gsap.fromTo('.fq-item',
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.07, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', once: true } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const toggle = (idx) => {
    const prev = open;
    setOpen(open === idx ? null : idx);
    // Animate answer in
    if (open !== idx && answerRefs.current[idx]) {
      gsap.fromTo(answerRefs.current[idx],
        { opacity: 0, y: -8 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out', delay: 0.05 }
      );
    }
  };

  return (
    <section ref={sectionRef} id="faq"
      className="relative z-10 bg-[#1B1F24] overflow-hidden">

      <div className="w-full h-[1px]"
        style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.05) 30%, rgba(255,255,255,0.05) 70%, transparent)' }} />

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20 py-20 sm:py-28 md:py-36">

        {/* Header */}
        <div className="fq-hdr mb-16 md:mb-20 opacity-0">
          <span className="font-mono text-[8px] tracking-[0.4em] text-[#C97A3D]/60 uppercase block mb-4">
            09 — Common Questions
          </span>
          <h3 className="font-heading font-medium text-[#F4F1EB] tracking-tight leading-none"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.8rem)' }}>
            Frequently<br /><span className="italic text-[#C97A3D]">Asked</span>
          </h3>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">

          {/* Accordion */}
          <div className="lg:col-span-8 divide-y divide-white/[0.05]">
            {faqs.map((faq, idx) => (
              <div key={idx} className="fq-item opacity-0">
                <button type="button"
                  className="w-full flex items-start justify-between gap-6 py-6 text-left group"
                  onClick={() => toggle(idx)}
                  onMouseEnter={() => setCursor('view')}
                  onMouseLeave={() => setCursor('')}>
                  <span className="font-heading text-base sm:text-lg md:text-xl font-medium text-[#F4F1EB] leading-snug group-hover:text-[#E0A96D] transition-colors duration-300">
                    {faq.q}
                  </span>
                  <span className="shrink-0 mt-1 w-5 h-5 border border-[#C97A3D]/30 flex items-center justify-center text-[#C97A3D] transition-all duration-300"
                    style={{ transform: open === idx ? 'rotate(45deg)' : 'rotate(0deg)' }}>
                    <svg viewBox="0 0 10 10" className="w-2.5 h-2.5" fill="none">
                      <path d="M5 1v8M1 5h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </span>
                </button>

                {open === idx && (
                  <div ref={el => answerRefs.current[idx] = el} className="pb-6">
                    <p className="font-body text-sm text-[#C4C8CF]/60 leading-relaxed max-w-[600px]">
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Side CTA — typographic, no card box */}
          <div className="lg:col-span-4 fq-item opacity-0 lg:pt-6">
            <div className="relative pl-6 border-l border-[#C97A3D]/20">
              <span className="font-mono text-[8px] tracking-[0.35em] text-[#C97A3D]/50 uppercase block mb-4">
                Still have questions?
              </span>
              <p className="font-heading text-xl md:text-2xl font-light text-[#F4F1EB] leading-snug mb-6">
                Drop us a line. We respond within 24 hours.
              </p>
              <a href="mailto:connect@nayagrowth.com"
                className="group inline-flex items-center gap-2.5 font-mono text-[9px] tracking-[0.3em] text-[#C97A3D] uppercase hover:text-[#E0A96D] transition-colors"
                onMouseEnter={() => setCursor('connect')}
                onMouseLeave={() => setCursor('')}>
                <span>Connect With Us</span>
                <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" viewBox="0 0 12 12" fill="none">
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
