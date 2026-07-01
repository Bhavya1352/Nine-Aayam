import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';

const isTouchDevice = () => 'ontouchstart' in window || navigator.maxTouchPoints > 0;

export default function Hero() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const hoveredNodeRef = useRef(-1);

  // ── Intro animations ──
  useEffect(() => {
    gsap.fromTo(".reveal-text",
      { y: "110%" },
      { y: "0%", duration: 1.4, ease: "power4.out", stagger: 0.1, delay: 0.3 }
    );
    gsap.fromTo(".fade-in-el",
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 1.0, ease: "power3.out", stagger: 0.15, delay: 1.0 }
    );
  }, []);

  // ── Scroll-based fade & translate ──
  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = 400;
      const progress = Math.min(scrollY / maxScroll, 1);

      const translateY = -progress * 28;
      const opacity = 1 - progress * 0.7;

      content.style.transform = `translateY(${translateY}px)`;
      content.style.opacity = opacity;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ── Canvas: orbit, mouse tilt, hover nodes ──
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let w, h;
    const dpr = window.devicePixelRatio || 1;

    const setSize = () => {
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    setSize();

    const animState = { progress: 0 };
    gsap.to(animState, { progress: 1, duration: 2.0, ease: "power3.out", delay: 0.3 });

    window.addEventListener('resize', setSize);

    // Touch vs mouse detection
    const isTouch = isTouchDevice();

    // Slow continuous rotation — ~50 seconds per revolution
    let baseAngle = 0;
    const rotationSpeed = (2 * Math.PI) / (50 * 60);

    const findClosestNode = (clientX, clientY) => {
      const rect = canvas.getBoundingClientRect();
      const mx = clientX - rect.left;
      const my = clientY - rect.top;
      const cx = w / 2;
      const cy = h / 2;
      const orbitRadius = Math.min(w, h) * 0.34;

      let closest = -1;
      let closestDist = isTouch ? 40 : 22;
      for (let i = 0; i < 9; i++) {
        const angle = baseAngle + (i / 9) * Math.PI * 2;
        const nx = cx + orbitRadius * Math.cos(angle);
        const ny = cy + orbitRadius * Math.sin(angle);
        const dist = Math.hypot(mx - nx, my - ny);
        if (dist < closestDist) {
          closestDist = dist;
          closest = i;
        }
      }
      return closest;
    };

    const handleMouseMove = (e) => {
      if (isTouch) return;
      mouseRef.current.x = e.clientX / window.innerWidth;
      mouseRef.current.y = e.clientY / window.innerHeight;

      const closest = findClosestNode(e.clientX, e.clientY);
      hoveredNodeRef.current = closest;
      canvas.style.cursor = closest >= 0 ? 'pointer' : 'default';
    };

    const handleTouchStart = (e) => {
      if (e.touches.length === 1) {
        const touch = e.touches[0];
        const closest = findClosestNode(touch.clientX, touch.clientY);
        hoveredNodeRef.current = closest;
      }
    };

    const handleTouchEnd = () => {
      hoveredNodeRef.current = -1;
    };

    window.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('touchstart', handleTouchStart, { passive: true });
    canvas.addEventListener('touchend', handleTouchEnd, { passive: true });

    // Smooth mouse influence (lerped)
    let tiltX = 0;
    let tiltY = 0;

    const draw = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);

      const p = animState.progress;
      const t = Date.now() * 0.001;
      const cx = w / 2;
      const cy = h / 2;

      baseAngle += rotationSpeed;

      // Lerp mouse tilt (desktop only)
      if (!isTouch) {
        const targetTiltX = (mouseRef.current.x - 0.5) * 18;
        const targetTiltY = (mouseRef.current.y - 0.5) * 14;
        tiltX += (targetTiltX - tiltX) * 0.04;
        tiltY += (targetTiltY - tiltY) * 0.04;
      }

      // Breathing scale
      const breathe = 1 + Math.sin(t * 0.8) * 0.008;
      const orbitRadius = Math.min(w, h) * 0.34 * breathe;

      // Apply tilt offset to center
      const tcx = cx + tiltX;
      const tcy = cy + tiltY;

      // ── Orbit ring ──
      ctx.beginPath();
      ctx.arc(tcx, tcy, orbitRadius * p, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(190, 242, 100, ${0.22 * p})`;
      ctx.lineWidth = 0.8;
      ctx.stroke();

      // Subtle halo
      ctx.beginPath();
      ctx.arc(tcx, tcy, orbitRadius * p * 1.01, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(190, 242, 100, ${0.06 * p})`;
      ctx.lineWidth = 2;
      ctx.stroke();

      // ── Central Core with "9D" ──
      const coreRadius = 12 * p;
      ctx.beginPath();
      ctx.arc(tcx, tcy, coreRadius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(190, 242, 100, ${0.9 * p})`;
      ctx.fill();

      if (p > 0.5) {
        ctx.font = `700 ${14 * p}px var(--font-heading)`;
        ctx.fillStyle = `rgba(4, 12, 8, ${p})`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('9D', tcx, tcy + 0.5);
        ctx.textAlign = 'start';
        ctx.textBaseline = 'alphabetic';
      }

      // ── 9 evenly spaced nodes ──
      const hoveredNode = hoveredNodeRef.current;

      for (let i = 0; i < 9; i++) {
        const angle = baseAngle + (i / 9) * Math.PI * 2;
        const nx = tcx + orbitRadius * p * Math.cos(angle);
        const ny = tcy + orbitRadius * p * Math.sin(angle);
        const isHovered = i === hoveredNode;

        // Spoke line
        ctx.beginPath();
        ctx.moveTo(tcx, tcy);
        ctx.lineTo(nx, ny);
        ctx.strokeStyle = `rgba(190, 242, 100, ${(isHovered ? 0.18 : 0.07) * p})`;
        ctx.lineWidth = isHovered ? 0.8 : 0.5;
        ctx.stroke();

        // Node dot
        const nodeRadius = isHovered ? 6 : 3;
        if (isHovered) {
          ctx.beginPath();
          ctx.arc(nx, ny, 10, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(190, 242, 100, ${0.08 * p})`;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(nx, ny, nodeRadius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(190, 242, 100, ${(isHovered ? 1 : 0.85) * p})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', setSize);
      window.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('touchstart', handleTouchStart);
      canvas.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="hero relative min-h-screen min-h-dvh w-full flex items-center overflow-hidden z-10"
      style={{
        background: 'radial-gradient(circle at 55% 50%, rgba(190, 242, 100, 0.015), transparent 55%)'
      }}
    >
      {/* Grid guides — hidden on phones */}
      <div className="blueprint-grid-line vertical left-5 xs:left-6 md:left-16 hidden sm:block" />
      <div className="blueprint-grid-line vertical left-[50%] hidden lg:block" />
      <div className="blueprint-grid-line horizontal bottom-0" />

      {/* Corner labels — hidden on small phones, appear from large phones */}
      <div className="absolute top-10 xs:top-12 left-5 xs:left-6 md:left-16 font-body text-[7px] xs:text-[8px] tracking-[0.12em] xs:tracking-[0.15em] text-white/[0.35] select-none z-20 hidden xs:block">
        The Creative Agency of Naya Growth
      </div>
      <div className="absolute top-10 xs:top-12 right-5 xs:right-6 md:right-16 font-body text-[7px] xs:text-[8px] tracking-[0.2em] xs:tracking-[0.25em] text-white/[0.12] uppercase select-none text-right z-20 hidden xs:block">
        Naya Growth Pvt. Ltd.
      </div>

      {/* Nine Core Canvas — responsive offset via CSS */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <div className="w-full h-full pointer-events-auto canvas-orbit-wrapper">
          <canvas ref={canvasRef} className="w-full h-full" />
        </div>
      </div>

      {/* Content — scroll fade target */}
      <div
        ref={contentRef}
        className="relative z-10 w-full max-w-[1400px] mx-auto px-4 xs:px-5 sm:px-6 md:px-12 lg:px-16 xl:px-16 py-16 xs:py-20 sm:py-22 md:py-24 lg:py-28"
        style={{ willChange: 'transform, opacity' }}
      >
        {/* Heading — fluid typography via clamp, sized to fit viewport */}
        <h1
          className="font-heading font-extrabold uppercase text-white select-none"
          style={{
            fontSize: 'clamp(1.5rem, 4vw, 4.2rem)',
            lineHeight: 0.95,
            letterSpacing: '-0.03em'
          }}
        >
          <div className="reveal-mask"><span className="reveal-text block">Building</span></div>
          <div className="reveal-mask"><span className="reveal-text block">Brands</span></div>
          <div className="reveal-mask mt-1.5 xs:mt-2 sm:mt-3"><span className="reveal-text block">Across</span></div>
          <div className="reveal-mask"><span className="reveal-text block">Nine</span></div>
          <div className="reveal-mask"><span className="reveal-text block text-[#bef264]">Dimensions.</span></div>
        </h1>

        {/* Line accent */}
        <div className="fade-in-el w-8 xs:w-10 sm:w-14 h-[1.5px] bg-[#bef264]/40 mt-4 xs:mt-5 sm:mt-6 md:mt-8 mb-2.5 xs:mb-3 sm:mb-4 md:mb-5 opacity-0" />

        {/* Description */}
        <p className="fade-in-el font-body text-[11px] xs:text-xs sm:text-sm md:text-[0.95rem] leading-relaxed text-gray-400 max-w-[280px] xs:max-w-[320px] sm:max-w-[400px] md:max-w-[440px] mb-4 xs:mb-5 sm:mb-6 md:mb-8 opacity-0">
          Nine creative disciplines. One creative system for ambitious brands.
        </p>

        {/* CTA */}
        <div className="fade-in-el opacity-0">
          <a
            href="#services"
            className="group inline-flex items-center gap-2 xs:gap-2.5 sm:gap-3 px-4 xs:px-5 sm:px-6 md:px-7 py-2 xs:py-2.5 sm:py-3 border border-white/15 hover:border-white/40 text-white rounded-full transition-all duration-300 font-body text-[0.65rem] xs:text-[0.7rem] sm:text-[0.75rem] md:text-[0.8rem] font-medium tracking-[0.1em] xs:tracking-[0.12em] sm:tracking-[0.15em] uppercase"
          >
            <span>Explore The System</span>
            <ArrowRight className="w-3.5 h-3.5 xs:w-4 xs:h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </a>
        </div>

      </div>
    </section>
  );
}
