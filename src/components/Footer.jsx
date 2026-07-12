import React, { useEffect, useRef } from 'react';
import { useCursor } from '../context/CursorContext';
import { Mail, Globe, ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const { setCursor } = useCursor();
  const footerRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.ft-word',
        { opacity: 0, y: 50, skewY: 2 },
        { opacity: 1, y: 0, skewY: 0, duration: 1.1, stagger: 0.08, ease: 'power4.out',
          scrollTrigger: { trigger: footerRef.current, start: 'top 80%', once: true } }
      );
      gsap.fromTo(lineRef.current,
        { scaleX: 0, transformOrigin: 'left center' },
        { scaleX: 1, duration: 1.6, ease: 'power3.inOut',
          scrollTrigger: { trigger: footerRef.current, start: 'top 65%', once: true } }
      );
      gsap.fromTo('.ft-col',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: footerRef.current, start: 'top 60%', once: true } }
      );
      gsap.fromTo('.ft-meta',
        { opacity: 0 },
        { opacity: 1, duration: 0.8, ease: 'power2.out', delay: 0.3,
          scrollTrigger: { trigger: footerRef.current, start: 'top 55%', once: true } }
      );
    }, footerRef);
    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef}
      className="relative z-10 bg-[#1B1F24] overflow-hidden">

      <div className="w-full h-[1px]"
        style={{ background: 'linear-gradient(to right, transparent, rgba(201,122,61,0.2) 30%, rgba(201,122,61,0.2) 70%, transparent)' }} />

      {/* Ambient glow */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(201,122,61,0.025) 0%, transparent 65%)' }} />

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20 pt-20 md:pt-28 pb-10">

        {/* Massive CTA headline */}
        <div className="mb-14 md:mb-20 overflow-hidden"
          onMouseEnter={() => setCursor('connect')}
          onMouseLeave={() => setCursor('')}>
          <h2 className="font-heading font-light leading-[1.0] tracking-tight text-[#F4F1EB] select-none"
            style={{ fontSize: 'clamp(2.8rem, 8vw, 8.5rem)' }}>
            {["Let's", "Build"].map((w, i) => (
              <span key={i} className="ft-word inline-block mr-[0.2em] opacity-0">{w}</span>
            ))}
            <br />
            {["Your", "Next"].map((w, i) => (
              <span key={i} className="ft-word inline-block mr-[0.2em] opacity-0">{w}</span>
            ))}
            {' '}
            <span className="ft-word italic text-[#C97A3D] inline-block opacity-0">Dimension.</span>
          </h2>
        </div>

        {/* Gold divider */}
        <div ref={lineRef} className="w-full h-[1px] mb-14 md:mb-20"
          style={{ background: 'linear-gradient(to right, rgba(201,122,61,0.5), rgba(201,122,61,0.1) 60%, transparent)', scaleX: 0 }} />

        {/* Columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 pb-14 md:pb-20 border-b border-white/[0.05]">

          {/* Brand */}
          <div className="ft-col md:col-span-5 opacity-0">
            <span className="font-subheading text-[11px] font-bold tracking-[0.22em] text-[#F4F1EB] uppercase block mb-4">
              NINE AAYAM <span className="text-[#C4C8CF]/40 font-light">/ 9D</span>
            </span>
            <p className="font-body text-xs leading-relaxed text-[#C4C8CF]/50 max-w-[340px] mb-6">
              Nine Aayam is the creative agency vertical of Naya Growth Private Limited. We own the visible, communicative, and sensory front-end representing your identity to the market.
            </p>
            <a href="mailto:connect@nayagrowth.com"
              className="group inline-flex items-center gap-2.5 font-mono text-[9px] tracking-[0.3em] text-[#C97A3D] uppercase hover:text-[#E0A96D] transition-colors"
              onMouseEnter={() => setCursor('connect')}
              onMouseLeave={() => setCursor('')}>
              <span>Start a Project</span>
              <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" viewBox="0 0 12 12" fill="none">
                <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>

          {/* Nav links */}
          <div className="ft-col md:col-span-4 opacity-0">
            <span className="font-mono text-[8px] tracking-[0.35em] text-[#C4C8CF]/30 uppercase block mb-5">
              System Coordinates
            </span>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-3">
              {[
                { label: 'Philosophy', id: '#philosophy' },
                { label: 'Manifesto', id: '#manifesto' },
                { label: 'Services', id: '#services' },
                { label: 'Process', id: '#process' },
                { label: 'FAQ', id: '#faq' },
                { label: 'Brief Builder', id: '#configurator' },
              ].map((link) => (
                <li key={link.label}>
                  <a href={link.id}
                    className="font-body text-xs text-[#C4C8CF]/45 hover:text-[#F4F1EB] transition-colors"
                    onMouseEnter={() => setCursor('view')}
                    onMouseLeave={() => setCursor('')}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="ft-col md:col-span-3 opacity-0">
            <span className="font-mono text-[8px] tracking-[0.35em] text-[#C4C8CF]/30 uppercase block mb-5">
              Connect
            </span>
            <ul className="flex flex-col gap-4">
              <li>
                <a href="mailto:connect@nayagrowth.com"
                  className="flex items-center gap-2.5 font-body text-xs text-[#C4C8CF]/45 hover:text-[#F4F1EB] transition-colors group"
                  onMouseEnter={() => setCursor('connect')}
                  onMouseLeave={() => setCursor('')}>
                  <Mail className="w-3.5 h-3.5 text-[#C97A3D]/60 group-hover:text-[#C97A3D] transition-colors" />
                  connect@nayagrowth.com
                </a>
              </li>
              <li>
                <a href="https://nayagrowth.com" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2.5 font-body text-xs text-[#C4C8CF]/45 hover:text-[#F4F1EB] transition-colors group"
                  onMouseEnter={() => setCursor('connect')}
                  onMouseLeave={() => setCursor('')}>
                  <Globe className="w-3.5 h-3.5 text-[#C97A3D]/60 group-hover:text-[#C97A3D] transition-colors" />
                  <span className="flex items-center gap-0.5">
                    nayagrowth.com
                    <ArrowUpRight className="w-2.5 h-2.5 opacity-40" />
                  </span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Meta bar */}
        <div className="ft-meta flex flex-col sm:flex-row items-start sm:items-center justify-between pt-8 gap-3 opacity-0">
          <p className="font-mono text-[8px] text-[#C4C8CF]/25 tracking-widest">
            © 2026 NINE AAYAM — NAYA GROWTH PRIVATE LIMITED
          </p>
          <p className="font-mono text-[8px] text-[#C4C8CF]/20 tracking-widest">
            NINE DIMENSIONS. ONE CREATIVE SYSTEM.
          </p>
        </div>

      </div>
    </footer>
  );
}
