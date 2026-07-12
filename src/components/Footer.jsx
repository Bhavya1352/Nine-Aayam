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
        { opacity: 0, y: 60, skewY: 3, scale: 0.95 },
        { opacity: 1, y: 0, skewY: 0, scale: 1, duration: 1.3, stagger: 0.1, ease: 'power4.out',
          scrollTrigger: { trigger: footerRef.current, start: 'top 80%', once: true } }
      );
      gsap.fromTo(lineRef.current,
        { scaleX: 0, transformOrigin: 'left center' },
        { scaleX: 1, duration: 1.8, ease: 'power3.inOut',
          scrollTrigger: { trigger: footerRef.current, start: 'top 65%', once: true } }
      );
      gsap.fromTo('.ft-col',
        { opacity: 0, y: 25, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.9, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: footerRef.current, start: 'top 60%', once: true } }
      );
      gsap.fromTo('.ft-meta',
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out', delay: 0.35,
          scrollTrigger: { trigger: footerRef.current, start: 'top 55%', once: true } }
      );
    }, footerRef);
    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef}
      className="relative z-10 bg-[#1B1F24] overflow-hidden">

      {/* Enhanced ambient background layers */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(201,122,61,0.035) 0%, transparent 65%)' }} />
        <div className="absolute top-[20%] left-[-10%] w-[45vw] h-[55vh] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(37,43,51,0.8) 0%, transparent 65%)' }} />
      </div>

      <div className="w-full h-[1px]"
        style={{ background: 'linear-gradient(to right, transparent, rgba(201,122,61,0.25) 25%, rgba(201,122,61,0.25) 75%, transparent)' }} />

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20 pt-24 md:pt-32 pb-12">

        {/* Massive CTA headline with enhanced styling */}
        <div className="mb-20 md:mb-28 overflow-hidden"
          onMouseEnter={() => setCursor('connect')}
          onMouseLeave={() => setCursor('')}>
          <h2 className="font-heading font-light leading-[0.95] tracking-tight text-[#F4F1EB] select-none"
            style={{ fontSize: 'clamp(3.2rem, 9vw, 9.5rem)' }}>
            {["Let's", "Build"].map((w, i) => (
              <span key={i} className="ft-word inline-block mr-[0.22em] opacity-0">{w}</span>
            ))}
            <br />
            {["Your", "Next"].map((w, i) => (
              <span key={i} className="ft-word inline-block mr-[0.22em] opacity-0">{w}</span>
            ))}
            {' '}
            <span className="ft-word italic text-[#C97A3D] inline-block opacity-0">Dimension.</span>
          </h2>
        </div>

        {/* Gold divider with enhanced gradient */}
        <div ref={lineRef} className="w-full h-[1px] mb-20 md:mb-28"
          style={{ background: 'linear-gradient(to right, rgba(201,122,61,0.6), rgba(201,122,61,0.15) 65%, transparent)', scaleX: 0 }} />

        {/* Columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-10 pb-16 md:pb-24 border-b border-white/[0.05]">

          {/* Brand */}
          <div className="ft-col md:col-span-5 opacity-0">
            <span className="font-subheading text-[12px] font-bold tracking-[0.25em] text-[#F4F1EB] uppercase block mb-5">
              NINE AAYAM <span className="text-[#C4C8CF]/40 font-light">/ 9D</span>
            </span>
            <p className="font-body text-sm leading-relaxed text-[#C4C8CF]/55 max-w-[380px] mb-8">
              Nine Aayam is the creative agency vertical of Naya Growth Private Limited. We own the visible, communicative, and sensory front-end representing your identity to the market.
            </p>
            <a href="mailto:connect@nayagrowth.com"
              className="group inline-flex items-center gap-3 font-mono text-[10px] tracking-[0.35em] text-[#C97A3D] uppercase hover:text-[#E0A96D] transition-colors"
              onMouseEnter={() => setCursor('connect')}
              onMouseLeave={() => setCursor('')}>
              <span>Start a Project</span>
              <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" viewBox="0 0 12 12" fill="none">
                <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>

          {/* Nav links */}
          <div className="ft-col md:col-span-4 opacity-0">
            <span className="font-mono text-[9px] tracking-[0.4em] text-[#C4C8CF]/35 uppercase block mb-6">
              System Coordinates
            </span>
            <ul className="grid grid-cols-2 gap-x-5 gap-y-4">
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
                    className="font-body text-sm text-[#C4C8CF]/50 hover:text-[#F4F1EB] transition-colors duration-300"
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
            <span className="font-mono text-[9px] tracking-[0.4em] text-[#C4C8CF]/35 uppercase block mb-6">
              Connect
            </span>
            <ul className="flex flex-col gap-5">
              <li>
                <a href="mailto:connect@nayagrowth.com"
                  className="flex items-center gap-3 font-body text-sm text-[#C4C8CF]/50 hover:text-[#F4F1EB] transition-colors duration-300 group"
                  onMouseEnter={() => setCursor('connect')}
                  onMouseLeave={() => setCursor('')}>
                  <Mail className="w-4 h-4 text-[#C97A3D]/60 group-hover:text-[#C97A3D] transition-colors" />
                  connect@nayagrowth.com
                </a>
              </li>
              <li>
                <a href="https://nayagrowth.com" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 font-body text-sm text-[#C4C8CF]/50 hover:text-[#F4F1EB] transition-colors duration-300 group"
                  onMouseEnter={() => setCursor('connect')}
                  onMouseLeave={() => setCursor('')}>
                  <Globe className="w-4 h-4 text-[#C97A3D]/60 group-hover:text-[#C97A3D] transition-colors" />
                  <span className="flex items-center gap-1">
                    nayagrowth.com
                    <ArrowUpRight className="w-3 h-3 opacity-40" />
                  </span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Meta bar */}
        <div className="ft-meta flex flex-col sm:flex-row items-start sm:items-center justify-between pt-10 gap-4 opacity-0">
          <p className="font-mono text-[9px] text-[#C4C8CF]/30 tracking-widest">
            © 2026 NINE AAYAM — NAYA GROWTH PRIVATE LIMITED
          </p>
          <p className="font-mono text-[9px] text-[#C4C8CF]/25 tracking-widest">
            NINE DIMENSIONS. ONE CREATIVE SYSTEM.
          </p>
        </div>

      </div>
    </footer>
  );
}
