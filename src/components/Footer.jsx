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

      // Headline words stagger reveal
      gsap.fromTo('.footer-word',
        { opacity: 0, y: 40, skewY: 2 },
        {
          opacity: 1, y: 0, skewY: 0,
          duration: 1.0, stagger: 0.1, ease: 'power4.out',
          scrollTrigger: { trigger: footerRef.current, start: 'top 80%', once: true }
        }
      );

      // Gold divider line draw
      gsap.fromTo(lineRef.current,
        { scaleX: 0, transformOrigin: 'left center' },
        {
          scaleX: 1, duration: 1.4, ease: 'power3.inOut',
          scrollTrigger: { trigger: footerRef.current, start: 'top 65%', once: true }
        }
      );

      // Footer columns stagger up
      gsap.fromTo('.footer-col',
        { opacity: 0, y: 24 },
        {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: footerRef.current, start: 'top 60%', once: true }
        }
      );

      // Footer meta fade
      gsap.fromTo('.footer-meta',
        { opacity: 0 },
        {
          opacity: 1, duration: 0.8, ease: 'power2.out', delay: 0.3,
          scrollTrigger: { trigger: footerRef.current, start: 'top 55%', once: true }
        }
      );

    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative z-10 bg-[#1B1F24] border-t border-white/[0.08] pt-20 sm:pt-24 pb-12 px-6 md:px-12 lg:px-16 overflow-hidden"
    >
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#C97A3D]/[0.015] rounded-full filter blur-[150px] pointer-events-none z-0" />

      <div className="max-w-[1200px] mx-auto relative z-10 pl-0 sm:pl-4 md:pl-8 lg:pl-12 text-left">

        {/* Headline — word split reveal */}
        <div
          className="mb-12 sm:mb-16 md:mb-20 overflow-hidden"
          onMouseEnter={() => setCursor('connect')}
          onMouseLeave={() => setCursor('')}
        >
          <h2 className="font-heading font-light leading-none tracking-tight text-[#F4F1EB] max-w-[850px] text-[2.4rem] sm:text-[3.6rem] md:text-[4.8rem] lg:text-[6rem] xl:text-[6.5rem]">
            {["Let's", "Build"].map((w, i) => (
              <span key={i} className="footer-word inline-block mr-[0.25em]" style={{ opacity: 0 }}>{w}</span>
            ))}
            <br className="hidden sm:block" />
            {["Your", "Next"].map((w, i) => (
              <span key={i} className="footer-word inline-block mr-[0.25em]" style={{ opacity: 0 }}>{w}</span>
            ))}
            {" "}
            <span className="footer-word italic text-[#C97A3D] inline-block" style={{ opacity: 0 }}>Dimension.</span>
          </h2>
        </div>

        {/* Animated gold divider */}
        <div ref={lineRef} className="w-full h-[1px] bg-gradient-to-r from-[#C97A3D]/40 via-[#C97A3D]/10 to-transparent mb-12 md:mb-16" style={{ scaleX: 0 }} />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 lg:gap-12 pb-12 md:pb-16 border-b border-white/[0.08]">

          {/* Company Brief */}
          <div className="footer-col md:col-span-6 flex flex-col items-start" style={{ opacity: 0 }}>
            <span className="font-subheading text-[11px] font-bold tracking-[0.2em] text-[#F4F1EB] mb-4 uppercase">
              NINE AAYAM <span className="text-[#C4C8CF] font-light">/ 9D</span>
            </span>
            <p className="font-body text-xs leading-relaxed text-[#C4C8CF] max-w-[380px] mb-6">
              Nine Aayam is the creative agency vertical of Naya Growth Private Limited. We own the visible, communicative, and sensory front-end representing your identity to the market.
            </p>
          </div>

          {/* Site links */}
          <div className="footer-col md:col-span-3 flex flex-col items-start" style={{ opacity: 0 }}>
            <span className="font-subheading text-[8px] sm:text-[9px] font-bold text-gray-500 uppercase tracking-[0.25em] block mb-4 select-none">
              System Coordinates
            </span>
            <ul className="flex flex-col gap-3 font-body text-xs">
              {[
                { label: 'Philosophy', id: '#philosophy' },
                { label: 'Services Cabinet', id: '#services' },
                { label: 'System Boundaries', id: '#boundaries' },
                { label: 'Brief Configurator', id: '#configurator' }
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.id}
                    onMouseEnter={() => setCursor('view')}
                    onMouseLeave={() => setCursor('')}
                    className="text-[#C4C8CF] hover:text-[#F4F1EB] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-col md:col-span-3 flex flex-col items-start" style={{ opacity: 0 }}>
            <span className="font-subheading text-[8px] sm:text-[9px] font-bold text-gray-500 uppercase tracking-[0.25em] block mb-4 select-none">
              Connect Channels
            </span>
            <ul className="flex flex-col gap-3 font-body text-xs">
              <li>
                <a
                  href="mailto:connect@nayagrowth.com"
                  onMouseEnter={() => setCursor('connect')}
                  onMouseLeave={() => setCursor('')}
                  className="flex items-center gap-2.5 text-[#C4C8CF] hover:text-[#F4F1EB] transition-colors"
                >
                  <Mail className="w-4 h-4 text-[#C97A3D]" />
                  <span>connect@nayagrowth.com</span>
                </a>
              </li>
              <li>
                <a
                  href="https://nayagrowth.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => setCursor('connect')}
                  onMouseLeave={() => setCursor('')}
                  className="flex items-center gap-2.5 text-[#C4C8CF] hover:text-[#F4F1EB] transition-colors"
                >
                  <Globe className="w-4 h-4 text-[#C97A3D]" />
                  <span className="flex items-center">
                    nayagrowth.com
                    <ArrowUpRight className="w-3 h-3 ml-0.5 opacity-60" />
                  </span>
                </a>
              </li>
              <li className="mt-3 pt-3 border-t border-white/[0.08] w-full">
                <span className="font-mono text-[8px] text-gray-500 tracking-wider block">
                  SYS_ID: 9D-NG-2026-ACTIVE
                </span>
              </li>
            </ul>
          </div>

        </div>

        <div className="footer-meta flex flex-col sm:flex-row items-center justify-between pt-8 gap-4 font-mono text-[9px] text-[#C4C8CF] select-none" style={{ opacity: 0 }}>
          <p>© 2026 NINE AAYAM. PARENT ORBIT: NAYA GROWTH PRIVATE LIMITED.</p>
          <div className="flex gap-4">
            <span className="hover:text-[#F4F1EB] transition-colors">CREATIVE SYSTEM</span>
            <span>•</span>
            <span className="hover:text-[#F4F1EB] transition-colors">V1.0.5</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
