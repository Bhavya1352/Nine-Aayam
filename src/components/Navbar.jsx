import React from 'react';
import { useCursor } from '../context/CursorContext';
import { ArrowUpRight } from 'lucide-react';
import MagneticButton from './MagneticButton';

export default function Navbar() {
  const { setCursor } = useCursor();

  return (
    <header id="header" className="fixed top-0 left-0 w-full p-6 z-[1000] transition-all duration-500">
      <div className="max-w-[1300px] mx-auto flex items-center justify-between px-8 py-3 bg-black/40 border border-[#10B981]/10 rounded-full backdrop-blur-md shadow-2xl">
        <a 
          href="#" 
          className="logo-link"
          onMouseEnter={() => setCursor('connect')}
          onMouseLeave={() => setCursor('')}
        >
          <div className="logo flex items-center font-subheading text-[1.25rem] tracking-widest">
            <span className="font-extrabold text-white">NINE</span>
            <span className="font-light text-[#10B981] ml-1">AAYAM</span>
          </div>
        </a>

        <nav className="hidden md:flex items-center gap-10">
          <a 
            href="#philosophy" 
            className="nav-link font-subheading text-[0.9rem] font-medium text-gray-400 hover:text-white transition-colors relative"
            onMouseEnter={() => setCursor('view')}
            onMouseLeave={() => setCursor('')}
          >
            Philosophy
          </a>
          <a 
            href="#services" 
            className="nav-link font-subheading text-[0.9rem] font-medium text-gray-400 hover:text-white transition-colors relative"
            onMouseEnter={() => setCursor('view')}
            onMouseLeave={() => setCursor('')}
          >
            Services
          </a>
          <a 
            href="#showcase" 
            className="nav-link font-subheading text-[0.9rem] font-medium text-gray-400 hover:text-white transition-colors relative"
            onMouseEnter={() => setCursor('view')}
            onMouseLeave={() => setCursor('')}
          >
            3D Showcase
          </a>
        </nav>

        <div className="nav-actions flex items-center">
          <MagneticButton href="#connect" variant="primary" className="text-[0.85rem] py-2.5 px-6">
            <span>Get in Touch</span>
            <ArrowUpRight className="w-4 h-4" />
          </MagneticButton>
        </div>
      </div>
    </header>
  );
}
