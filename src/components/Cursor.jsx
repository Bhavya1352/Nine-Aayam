import React, { useEffect, useRef } from 'react';
import { useCursor } from '../context/CursorContext';
import gsap from 'gsap';

export default function Cursor() {
  const { cursorLabel } = useCursor();
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const hasHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!hasHover) return;

    const dotX = gsap.quickTo(dotRef.current, "x", { duration: 0.1, ease: "power3.out" });
    const dotY = gsap.quickTo(dotRef.current, "y", { duration: 0.1, ease: "power3.out" });
    const ringX = gsap.quickTo(ringRef.current, "x", { duration: 0.45, ease: "power3.out" });
    const ringY = gsap.quickTo(ringRef.current, "y", { duration: 0.45, ease: "power3.out" });

    const onMouseMove = (e) => {
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };

    window.addEventListener('mousemove', onMouseMove);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <div id="custom-cursor" className="hidden md:block">
      <div 
        ref={dotRef} 
        className="cursor-dot fixed top-0 left-0 pointer-events-none" 
      />
      <div 
        ref={ringRef} 
        className="cursor-ring fixed top-0 left-0 pointer-events-none"
      >
        <span className="cursor-label">
          {cursorLabel}
        </span>
      </div>
    </div>
  );
}
