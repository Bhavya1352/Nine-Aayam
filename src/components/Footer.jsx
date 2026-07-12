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
      className="relative z-10 bg-[#050505] overflow-hidden py-12 md:py-20">

      {/* Floating Coordinates Background Details */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden opacity-[0.03] z-0">
        <div className="absolute top-[10%] left-[5%] font-mono text-[9px] text-[#C97A3D] space-y-1 animate-[float_10s_ease-in-out_infinite]">
          <div>SYS.LOC // 28.5383° N, 81.3792° W</div>
          <div>DIM.IDX // 01 - 09</div>
        </div>
        <div className="absolute top-[40%] right-[10%] font-mono text-[9px] text-[#C97A3D] space-y-1 animate-[float_14s_ease-in-out_infinite_2s]">
          <div>SYS.STATUS // ACTIVE</div>
          <div>GROWTHOS_PIPELINE // CONNECTED</div>
        </div>
        <div className="absolute bottom-[25%] left-[25%] font-mono text-[9px] text-[#C97A3D] space-y-1 animate-[float_12s_ease-in-out_infinite_1s]">
          <div>NINE_AAYAM // CREATIVE_SYSTEM</div>
          <div>v0.9.5-BETA</div>
        </div>
      </div>

      {/* Enhanced ambient background layers */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(201,122,61,0.035) 0%, transparent 65%)' }} />
        <div className="absolute top-[20%] left-[-10%] w-[45vw] h-[55vh] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(37,43,51,0.8) 0%, transparent 65%)' }} />
        
        {/* Dynamic Background Visual Anchor - Rotating Sacred Geometry coordinate dial */}
        <div className="absolute right-[-10%] bottom-[-15%] w-[600px] h-[600px] opacity-[0.038] pointer-events-none">
          <svg className="w-full h-full animate-[spin_100s_linear_infinite]" viewBox="0 0 100 100" fill="none" stroke="#C97A3D">
            <circle cx="50" cy="50" r="48" strokeWidth="0.08" strokeDasharray="1 3" />
            <circle cx="50" cy="50" r="38" strokeWidth="0.12" />
            <circle cx="50" cy="50" r="28" strokeWidth="0.06" strokeDasharray="3 6" />
            <circle cx="50" cy="50" r="18" strokeWidth="0.2" />
            {/* Crosshairs */}
            <line x1="50" y1="0" x2="50" y2="100" strokeWidth="0.04" strokeDasharray="2 4" />
            <line x1="0" y1="50" x2="100" y2="50" strokeWidth="0.04" strokeDasharray="2 4" />
          </svg>
        </div>
      </div>

      <div className="w-full h-[1px]"
        style={{ background: 'linear-gradient(to right, transparent, rgba(201,122,61,0.25) 25%, rgba(201,122,61,0.25) 75%, transparent)' }} />

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20 pt-24 md:pt-32 pb-12 relative z-10">

        {/* Massive CTA headline with enhanced styling */}
        <div className="mb-8 md:mb-10 overflow-hidden"
          onMouseEnter={() => setCursor('connect')}
          onMouseLeave={() => setCursor('')}>
          <h2 className="font-heading font-light leading-[0.95] tracking-tight text-[#F4F1EB] select-none"
            style={{ fontSize: 'clamp(3.2rem, 9vw, 9.5rem)' }}>
            {["Let's", "Build"].map((w, i) => (
              <span key={i} className="ft-word inline-block mr-[0.22em] opacity-0 hover:text-[#E0A96D] hover:translate-y-[-5px] hover:scale-[1.03] transition-all duration-500 cursor-default">{w}</span>
            ))}
            <br />
            {["Your", "Next"].map((w, i) => (
              <span key={i} className="ft-word inline-block mr-[0.22em] opacity-0 hover:text-[#E0A96D] hover:translate-y-[-5px] hover:scale-[1.03] transition-all duration-500 cursor-default">{w}</span>
            ))}
            {' '}
            <span className="ft-word italic text-[#C97A3D] inline-block opacity-0 hover:text-[#E0A96D] hover:translate-y-[-5px] hover:scale-[1.03] transition-all duration-500 cursor-default">Dimension.</span>
          </h2>
        </div>

        {/* Supporting Tagline */}
        <div className="mb-14 md:mb-18 max-w-[650px] ft-meta opacity-0">
          <p className="font-body text-xs md:text-sm tracking-[0.06em] leading-relaxed text-[#C4C8CF]/75">
            A structured system for brands seeking unfair attention. <span className="inline-block">Start your transition.</span>
          </p>
        </div>

        {/* Gold divider with laser sweep pulse animation */}
        <div ref={lineRef} className="w-full h-[1px] mb-20 md:mb-28 relative overflow-hidden"
          style={{ background: 'linear-gradient(to right, rgba(201,122,61,0.4), rgba(201,122,61,0.1) 75%, transparent)', scaleX: 0 }}>
          <div className="absolute top-0 h-full w-32 bg-gradient-to-r from-transparent via-[#E0A96D] to-transparent animate-[laser-sweep_4.5s_linear_infinite]" />
        </div>

        <style>{`
          @keyframes laser-sweep {
            0% { left: -150px; }
            100% { left: 100%; }
          }
          @keyframes float {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-12px) rotate(0.8deg); }
          }
        `}</style>

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
