import React, { useRef } from 'react';
import { useCursor } from '../context/CursorContext';
import gsap from 'gsap';

export default function MagneticButton({ 
  href = '#', 
  children, 
  variant = 'primary', 
  cursorType = 'connect',
  className = '',
  magnetStrength = 0.25 
}) {
  const { setCursor } = useCursor();
  const buttonRef = useRef(null);

  const handleMouseMove = (e) => {
    const btn = buttonRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const btnX = rect.left + rect.width / 2;
    const btnY = rect.top + rect.height / 2;

    gsap.to(btn, {
      x: (e.clientX - btnX) * magnetStrength,
      y: (e.clientY - btnY) * magnetStrength,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handleMouseLeave = () => {
    setCursor('');
    gsap.to(buttonRef.current, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.3)"
    });
  };

  const baseStyles = "flex items-center justify-center font-subheading font-semibold rounded-full gap-1.5 transition-all duration-300";
  
  const variants = {
    primary: "bg-[#c68a2e] text-[#050515] shadow-lg shadow-[#c68a2e]/20 hover:bg-[#c68a2e]/90 hover:shadow-[#c68a2e]/30",
    outline: "bg-transparent text-white border border-[#c68a2e]/25 backdrop-blur hover:bg-[#c68a2e]/10"
  };

  return (
    <a
      ref={buttonRef}
      href={href}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setCursor(cursorType)}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </a>
  );
}
