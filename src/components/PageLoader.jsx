import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function PageLoader({ onComplete }) {
  const loaderRef = useRef(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Count up 0 → 100
    const obj = { val: 0 };
    const countTween = gsap.to(obj, {
      val: 100,
      duration: 1.6,
      ease: 'power2.inOut',
      onUpdate() {
        setCount(Math.round(obj.val));
      }
    });

    // Exit animation after count finishes
    const exitTl = gsap.timeline({ delay: 1.8 });
    exitTl
      .to('.loader-bar', { scaleX: 1, duration: 0.5, ease: 'power3.inOut' })
      .to(loaderRef.current, {
        yPercent: -100,
        duration: 0.9,
        ease: 'power4.inOut',
        onComplete
      });

    return () => {
      countTween.kill();
      exitTl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[9999] bg-[#050505] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Ambient glow */}
      <div className="absolute w-[400px] h-[400px] bg-[#C97A3D]/[0.04] rounded-full blur-[120px] pointer-events-none" />

      {/* Logo mark */}
      <div className="relative z-10 flex flex-col items-center gap-6">
        <div className="flex flex-col items-center">
          <span className="font-heading text-[5rem] sm:text-[7rem] font-light text-[#C97A3D] leading-none tracking-[-0.04em]">
            9D
          </span>
          <span className="font-subheading text-[9px] tracking-[0.45em] uppercase text-[#C4C8CF]/60 mt-1">
            Nine Aayam
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-[160px] h-[1px] bg-white/[0.06] relative overflow-hidden mt-4">
          <div
            className="loader-bar absolute inset-y-0 left-0 bg-[#C97A3D]/70 origin-left"
            style={{ transform: 'scaleX(0)' }}
          />
        </div>

        {/* Counter */}
        <span className="font-mono text-[10px] text-[#C4C8CF]/30 tabular-nums">
          {String(count).padStart(3, '0')}
        </span>
      </div>
    </div>
  );
}
