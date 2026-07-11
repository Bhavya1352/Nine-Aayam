import React, { useState, useEffect, useRef } from 'react';
import { useCursor } from '../context/CursorContext';
import { Plus, Minus } from 'lucide-react';
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
    a: 'Brand identity + guidelines: 10–14 days. Full creative system (multiple dimensions): 3–6 weeks. Accelerated sprint available hai urgent launches ke liye. Timeline Brief Configurator mein select kar sakte ho.',
  },
  {
    q: 'Kya aap ek hi dimension pe kaam karte ho ya full system chahiye?',
    a: 'Dono. Aap sirf ek dimension — jaise sirf web development ya sirf social media creative — ke liye engage kar sakte ho. Ya phir full Nine Aayam system activate kar sakte ho. Scope aapka, execution hamara.',
  },
  {
    q: 'Templates use karte ho ya sab handcrafted hota hai?',
    a: 'Zero templates. Har asset — code se lekar design tak — scratch se banaya jaata hai. Yahi hamara core promise hai: 100% bespoke architecture.',
  },
  {
    q: 'Revision cycles kaise kaam karte hain?',
    a: 'Har project mein structured review rounds included hain. Discovery ke baad ek direction brief approve hota hai, phir design phase mein 2 revision rounds. Scope ke bahar changes separately scoped hote hain.',
  },
  {
    q: 'Kya aap ongoing retainer pe kaam karte ho?',
    a: 'Haan. Monthly creative retainers available hain — social media, motion, aur campaign creatives ke liye. Retainer structure Brief Configurator mein "Market Leader Campaign" scope select karne ke baad discuss hota hai.',
  },
];

export default function FAQ() {
  const { setCursor } = useCursor();
  const sectionRef = useRef(null);
  const [open, setOpen] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.faq-header',
        { opacity: 0, y: 24 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', once: true }
        }
      );
      gsap.fromTo('.faq-item',
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', once: true }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggle = (idx) => setOpen(open === idx ? null : idx);

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="relative z-10 py-16 sm:py-20 px-6 md:px-12 lg:px-16 bg-[#1B1F24] border-t border-white/[0.08]"
    >
      <div className="blueprint-grid-line vertical left-6 md:left-12 lg:left-16 hidden sm:block" />

      <div className="max-w-[1200px] mx-auto relative z-10 pl-0 sm:pl-4 md:pl-8 lg:pl-12">

        <div className="faq-header flex flex-col items-start mb-14 text-left" style={{ opacity: 0 }}>
          <span className="font-subheading text-[8px] sm:text-[9px] tracking-[0.3em] uppercase font-bold text-gray-500 block mb-3 select-none">
            09 // COMMON QUESTIONS
          </span>
          <h3 className="font-heading text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight text-[#F4F1EB] mb-4">
            Frequently Asked
          </h3>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-start">

          {/* FAQ list */}
          <div className="lg:col-span-8 flex flex-col divide-y divide-white/[0.06]">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="faq-item py-5 sm:py-6"
                style={{ opacity: 0 }}
              >
                <button
                  type="button"
                  className="w-full flex items-start justify-between gap-4 text-left group"
                  onClick={() => toggle(idx)}
                  onMouseEnter={() => setCursor('view')}
                  onMouseLeave={() => setCursor('')}
                >
                  <span className="font-heading text-base sm:text-lg md:text-xl font-medium text-[#F4F1EB] leading-snug group-hover:text-[#E0A96D] transition-colors">
                    {faq.q}
                  </span>
                  <span className="shrink-0 mt-0.5 text-[#C97A3D]">
                    {open === idx ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </span>
                </button>

                {open === idx && (
                  <p className="font-body text-sm text-[#C4C8CF] leading-relaxed mt-4 max-w-[640px] animate-fade-in-slide">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Side CTA */}
          <div className="lg:col-span-4 faq-item" style={{ opacity: 0 }}>
            <div className="bg-[#2C333D] border border-white/[0.08] rounded-xl p-6 sm:p-8 flex flex-col gap-5 text-left">
              <span className="font-subheading text-[9px] font-bold text-[#C97A3D] tracking-widest uppercase">
                Still have questions?
              </span>
              <p className="font-body text-sm text-[#C4C8CF] leading-relaxed">
                Drop us a line directly. We respond within 24 hours.
              </p>
              <a
                href="mailto:connect@nayagrowth.com"
                className="inline-flex items-center justify-center py-3 px-5 bg-[#C97A3D] text-[#1B1F24] rounded font-subheading text-[10px] font-bold tracking-[0.15em] uppercase hover:bg-[#E0A96D] transition-colors"
                onMouseEnter={() => setCursor('connect')}
                onMouseLeave={() => setCursor('')}
              >
                Connect With Us
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
