import React, { useState, useEffect, useRef } from 'react';
import { useCursor } from '../context/CursorContext';
import gsap from 'gsap';

export default function Navbar() {
  const { setCursor } = useCursor();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const navRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 1.6 });
    tl.fromTo(navRef.current,
      { opacity: 0, y: -10 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    );
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1025 && isMobileMenuOpen) setIsMobileMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen]);

  return (
    <header
      ref={navRef}
      id="header"
      style={{ opacity: 0 }}
      className={`fixed top-0 left-0 w-full z-[1000] px-6 md:px-12 lg:px-16 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isScrolled
          ? 'bg-[#1B1F24]/90 border-b border-white/[0.08] backdrop-blur-md py-4 shadow-[0_4px_30px_rgba(0,0,0,0.4)]'
          : 'bg-transparent border-b border-transparent py-6 md:py-8'
      }`}
    >
      {/* Scroll progress line */}
      <div className="absolute bottom-0 left-0 h-[1px] bg-[#C97A3D]/60 transition-all duration-100 ease-linear" style={{ width: `${scrollProgress}%` }} />

      <div className="max-w-[1400px] mx-auto flex items-center justify-between">
        
        {/* Logo */}
        <a
          href="#"
          className="logo-link font-subheading text-[11px] font-bold tracking-[0.25em] text-[#F4F1EB] hover:text-[#C97A3D] transition-colors uppercase"
          onMouseEnter={() => setCursor('connect')}
          onMouseLeave={() => setCursor('')}
        >
          NINE AAYAM <span className="text-[#C4C8CF] font-light">/ 9D</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-10">
          {[
            { label: 'Philosophy', id: '#philosophy' },
            { label: 'Services', id: '#services' },
            { label: 'Boundaries', id: '#boundaries' },
            { label: 'Brief Configurator', id: '#configurator' }
          ].map((item) => (
            <a
              key={item.label}
              href={item.id}
              className="nav-link font-subheading text-[10px] font-medium tracking-[0.2em] text-[#C4C8CF] hover:text-[#F4F1EB] transition-colors relative uppercase after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[1px] after:bg-[#C97A3D] after:transition-all after:duration-500 hover:after:w-full hover:-translate-y-0.5"
              onMouseEnter={() => setCursor('view')}
              onMouseLeave={() => setCursor('')}
            >
              {item.label}
            </a>
          ))}

          <a
            href="mailto:connect@nayagrowth.com"
            className="font-subheading text-[10px] font-bold tracking-[0.2em] text-[#C97A3D] border border-[#C97A3D]/30 rounded px-5 py-2 hover:bg-[#C97A3D] hover:text-[#1B1F24] transition-all duration-300 uppercase hover:scale-[1.02] shadow-sm shadow-[#C97A3D]/5"
            onMouseEnter={() => setCursor('connect')}
            onMouseLeave={() => setCursor('')}
          >
            Start project
          </a>
        </nav>

        {/* Mobile/Tablet Menu Button */}
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden text-[#F4F1EB] hover:text-[#C97A3D] transition-all duration-300 p-1 hover:scale-110"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="6" y1="18" x2="18" y2="6" />
            </svg>
          ) : (
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="18" x2="20" y2="18" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed top-[56px] left-0 w-full h-[calc(100dvh-56px)] bg-[#1B1F24] border-t border-white/[0.08] z-50 flex flex-col px-6 sm:px-10 py-8 sm:py-10 gap-5 sm:gap-6 animate-fade-in-slide overflow-y-auto">
          {[
            { label: 'Philosophy', id: '#philosophy' },
            { label: 'Services', id: '#services' },
            { label: 'Boundaries', id: '#boundaries' },
            { label: 'Brief Configurator', id: '#configurator' }
          ].map((item) => (
            <a
              key={item.label}
              href={item.id}
              onClick={() => setIsMobileMenuOpen(false)}
              className="font-subheading text-base font-medium tracking-[0.1em] text-[#C4C8CF] hover:text-[#F4F1EB] transition-colors uppercase text-left"
            >
              {item.label}
            </a>
          ))}
          <a
            href="mailto:connect@nayagrowth.com"
            onClick={() => setIsMobileMenuOpen(false)}
            className="font-subheading text-xs font-bold tracking-[0.15em] text-[#C97A3D] border border-[#C97A3D]/30 rounded py-3.5 text-center bg-[#C97A3D]/5 hover:bg-[#C97A3D] hover:text-[#1B1F24] transition-all duration-300 uppercase mt-4"
          >
            Start project
          </a>
        </div>
      )}
    </header>
  );
}
