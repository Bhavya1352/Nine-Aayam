import React, { useState, useEffect } from 'react';
import { useCursor } from '../context/CursorContext';

export default function Navbar() {
  const { setCursor } = useCursor();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1025 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  return (
    <header 
      id="header" 
      className={`fixed top-0 left-0 w-full z-[1000] px-4 xs:px-5 sm:px-6 md:px-12 lg:px-16 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#040c08]/85 border-b border-white/[0.04] backdrop-blur-md py-3 xs:py-3.5 sm:py-4 shadow-[0_4px_30px_rgba(0,0,0,0.5)]' 
          : 'bg-transparent border-b border-transparent py-3.5 xs:py-4 sm:py-5 md:py-6'
      }`}
    >
      <div className="max-w-[1400px] mx-auto flex items-center justify-between">
        
        {/* Logo */}
        <a 
          href="#" 
          className="logo-link font-heading text-sm xs:text-base sm:text-lg md:text-xl font-bold tracking-[0.1em] xs:tracking-[0.15em] sm:tracking-[0.2em] text-white hover:opacity-85 transition-opacity"
          onMouseEnter={() => setCursor('connect')}
          onMouseLeave={() => setCursor('')}
        >
          NINE <span className="text-[#bef264] font-light">AAYAM</span>
        </a>

        {/* Desktop Navigation — visible from 1025px (small laptops) */}
        <nav className="hidden lg:flex items-center gap-8 xl:gap-12">
          {['Philosophy', 'Services', 'Showcase'].map((item) => (
            <a 
              key={item}
              href={`#${item.toLowerCase()}`}
              className="nav-link font-subheading text-[0.75rem] xl:text-[0.8rem] font-medium tracking-[0.15em] text-[#f3f4f6]/60 hover:text-white transition-colors duration-300 relative uppercase after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[1px] after:bg-[#bef264] after:transition-all after:duration-300 hover:after:w-full"
              onMouseEnter={() => setCursor('view')}
              onMouseLeave={() => setCursor('')}
            >
              {item}
            </a>
          ))}
          
          <a 
            href="#connect"
            className="font-subheading text-[0.75rem] xl:text-[0.8rem] font-bold tracking-[0.15em] text-[#bef264] border border-[#bef264]/20 rounded-full px-5 xl:px-6 py-2 xl:py-2.5 bg-[#bef264]/5 hover:bg-[#bef264] hover:text-[#040c08] hover:border-[#bef264] transition-all duration-300 uppercase hover:scale-[1.02] shadow-sm shadow-[#bef264]/5"
            onMouseEnter={() => setCursor('connect')}
            onMouseLeave={() => setCursor('')}
          >
            Start a Project
          </a>
        </nav>

        {/* Mobile/Tablet Menu Button — visible below 1025px */}
        <button 
          type="button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden text-white hover:text-[#bef264] transition-colors p-1"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <svg className="w-5 h-5 xs:w-6 xs:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="6" y1="18" x2="18" y2="6" />
            </svg>
          ) : (
            <svg className="w-5 h-5 xs:w-6 xs:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="9" y1="12" x2="20" y2="12" />
              <line x1="4" y1="18" x2="16" y2="18" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile/Tablet Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed top-[48px] xs:top-[52px] sm:top-[60px] md:top-[68px] left-0 w-full h-[calc(100dvh-48px)] xs:h-[calc(100dvh-52px)] sm:h-[calc(100dvh-60px)] md:h-[calc(100dvh-68px)] bg-[#040c08] border-t border-white/[0.05] z-50 flex flex-col px-5 xs:px-6 sm:px-8 md:px-12 py-8 xs:py-10 sm:py-12 gap-5 xs:gap-6 sm:gap-8 animate-fade-in-slide overflow-y-auto">
          {['Philosophy', 'Services', 'Showcase'].map((item) => (
            <a 
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setIsMobileMenuOpen(false)}
              className="font-subheading text-base xs:text-lg sm:text-xl font-medium tracking-[0.08em] xs:tracking-[0.1em] text-[#f3f4f6]/70 hover:text-white transition-colors uppercase"
            >
              {item}
            </a>
          ))}
          <a 
            href="#connect"
            onClick={() => setIsMobileMenuOpen(false)}
            className="font-subheading text-xs xs:text-sm font-bold tracking-[0.1em] text-[#bef264] border border-[#bef264]/20 rounded-full py-2.5 xs:py-3 text-center bg-[#bef264]/5 hover:bg-[#bef264] hover:text-[#040c08] transition-all duration-300 uppercase mt-4"
          >
            Start a Project
          </a>
        </div>
      )}
    </header>
  );
}
