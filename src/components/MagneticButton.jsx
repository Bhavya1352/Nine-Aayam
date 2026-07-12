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
    primary: "bg-[#C97A3D] text-[#050505] shadow-lg shadow-[#C97A3D]/20 hover:bg-[#E0A96D] hover:shadow-[#C97A3D]/30",
    outline: "bg-transparent text-white border border-[#C97A3D]/25 backdrop-blur hover:bg-[#C97A3D]/10"
  };

  const finalClassName = variant === 'custom' ? className : `${baseStyles} ${variants[variant]} ${className}`;

  return (
    <a
      ref={buttonRef}
      href={href}
      className={finalClassName}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setCursor(cursorType)}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </a>
  );
}
