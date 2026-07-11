import React, { useEffect, useRef } from 'react';
import { useCursor } from '../context/CursorContext';

export default function Cursor() {
  const { cursorType, cursorLabel } = useCursor();
  
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const cursorTypeRef = useRef(cursorType);

  const mouse = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const scale = useRef(1);
  const opacity = useRef(0);

  useEffect(() => {
    cursorTypeRef.current = cursorType;
  }, [cursorType]);

  useEffect(() => {
    // Hide default cursor on desktop
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouch) return;

    document.documentElement.style.cursor = 'none';
    
    const handleMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      opacity.current = 1;
    };

    const handleMouseLeave = () => {
      opacity.current = 0;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    let animationFrameId;

    const render = () => {
      // Lerp for outer ring
      const ease = 0.15;
      ringPos.current.x += (mouse.current.x - ringPos.current.x) * ease;
      ringPos.current.y += (mouse.current.y - ringPos.current.y) * ease;

      // Update dot style
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouse.current.x}px, ${mouse.current.y}px, 0) translate(-50%, -50%)`;
        dotRef.current.style.opacity = opacity.current;
      }

      // Update ring style
      if (ringRef.current) {
        let targetScale = 1;
        const type = cursorTypeRef.current;
        if (type === 'view') targetScale = 3.0;
        if (type === 'connect') targetScale = 2.4;
        
        scale.current += (targetScale - scale.current) * ease;
        
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%) scale(${scale.current})`;
        ringRef.current.style.opacity = opacity.current;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
      document.documentElement.style.cursor = 'auto';
    };
  }, []);

  // Touch screens should not show the custom cursor
  const isTouch = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);
  if (isTouch) return null;

  return (
    <>
      {/* Tiny solid center dot */}
      <div
        ref={dotRef}
        className="cursor-dot fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-[#C97A3D] pointer-events-none z-[9999] transition-opacity duration-300 ease-out"
        style={{ opacity: 0 }}
      />
      {/* Outer hollow circle */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-7 h-7 rounded-full border border-[#C97A3D]/40 pointer-events-none z-[9998] transition-opacity duration-300 ease-out flex items-center justify-center"
        style={{ opacity: 0 }}
      >
        {cursorType && (
          <span className="font-mono text-[5px] text-[#E0A96D] font-bold uppercase tracking-widest scale-[0.4] select-none">
            {cursorLabel || cursorType}
          </span>
        )}
      </div>
    </>
  );
}
