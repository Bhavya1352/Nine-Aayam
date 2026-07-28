import React, { useState, useEffect, useRef } from 'react';
import { useCursor } from '../context/CursorContext';
import gsap from 'gsap';

const NAV_LINKS = [
  { label: 'Philosophy', id: 'philosophy' },
  { label: 'Services', id: 'services' },
  { label: 'Work', id: 'work' },
  { label: 'About', id: 'story' },
  { label: 'Process', id: 'process' },
  { label: 'Insights', id: 'faq' },
];

export default function Navbar() {
  const { setCursor } = useCursor();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('');
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

  // Active section via IntersectionObserver
  useEffect(() => {
    const sectionIds = NAV_LINKS.map((l) => l.id);
    const observers = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
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
          ? 'bg-[#050505]/92 border-b border-white/[0.08] backdrop-blur-md py-3.5 shadow-[0_4px_30px_rgba(0,0,0,0.6)]'
          : 'bg-transparent border-b border-transparent py-5 md:py-7'
      }`}
    >
      {/* Scroll progress line */}
      <div className="absolute bottom-0 left-0 h-[1px] bg-[#C97A3D]/60 transition-all duration-100 ease-linear" style={{ width: `${scrollProgress}%` }} />

      <div className="max-w-[1440px] mx-auto flex items-center justify-between">

        {/* Logo */}
        <a
          href="#"
          className="logo-link flex flex-col group"
          onMouseEnter={() => setCursor('connect')}
          onMouseLeave={() => setCursor('')}
        >
          <span className="font-heading text-[20px] font-medium tracking-[0.2em] text-[#F4F1EB] group-hover:text-[#C97A3D] transition-colors uppercase leading-none">
            NINE AAYAM
          </span>
          <span className="font-subheading text-[8px] font-medium tracking-[0.25em] text-[#A69E93] group-hover:text-[#F4F1EB]/80 transition-colors uppercase mt-1">
            NINE DIMENSIONS. ONE CREATIVE SYSTEM.
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-9">
          {NAV_LINKS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.label}
                href={`#${item.id}`}
                className={`nav-link font-subheading text-[10px] font-semibold tracking-[0.22em] relative uppercase transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] after:content-[''] after:absolute after:-bottom-1.5 after:left-0 after:right-0 after:h-[1px] after:bg-[#C97A3D] after:origin-left after:transition-transform after:duration-300 ${
                  isActive
                    ? 'text-[#C97A3D] after:scale-x-100'
                    : 'text-[#C4C8CF]/80 hover:text-[#F4F1EB] after:scale-x-0 hover:after:scale-x-100'
                }`}
                onMouseEnter={() => setCursor('view')}
                onMouseLeave={() => setCursor('')}
              >
                {item.label}
              </a>
            );
          })}

          <a
            href="mailto:connect@nayagrowth.com"
            className="font-subheading text-[10px] font-bold tracking-[0.2em] text-[#F4F1EB] hover:text-[#050505] border border-[#C97A3D]/40 bg-[#0c0c0c]/80 rounded-none px-6 py-3 relative overflow-hidden transition-all duration-300 uppercase flex items-center gap-2 group hover:border-[#C97A3D]"
            onMouseEnter={() => setCursor('connect')}
            onMouseLeave={() => setCursor('')}
          >
            <span className="relative z-10">START A PROJECT</span>
            <svg className="w-3.5 h-3.5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="absolute inset-0 bg-[#C97A3D] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] z-0" />
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
        <div className="lg:hidden fixed top-[60px] left-0 w-full h-[calc(100dvh-60px)] bg-[#050505] border-t border-white/[0.08] z-50 flex flex-col px-6 sm:px-10 py-8 sm:py-10 gap-5 sm:gap-6 animate-fade-in-slide overflow-y-auto">
          {NAV_LINKS.map((item) => (
            <a
              key={item.label}
              href={`#${item.id}`}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`font-subheading text-base font-medium tracking-[0.1em] transition-colors uppercase text-left ${
                activeSection === item.id ? 'text-[#C97A3D]' : 'text-[#C4C8CF] hover:text-[#F4F1EB]'
              }`}
            >
              {item.label}
            </a>
          ))}
          <a
            href="mailto:connect@nayagrowth.com"
            onClick={() => setIsMobileMenuOpen(false)}
            className="font-subheading text-xs font-bold tracking-[0.15em] text-[#C97A3D] border border-[#C97A3D]/30 rounded py-3.5 text-center bg-[#C97A3D]/5 hover:bg-[#C97A3D] hover:text-[#050505] transition-all duration-300 uppercase mt-4"
          >
            Start project
          </a>
        </div>
      )}
    </header>
  );
}
