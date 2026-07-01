import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';

const isTouchDevice = () => 'ontouchstart' in window || navigator.maxTouchPoints > 0;

const serviceNames = [
  "Brand Strategy",
  "Graphic Design",
  "Content & Copy",
  "Social Creative",
  "Ad Campaigns",
  "Video & Motion",
  "Photo Direction",
  "UI/UX Design",
  "Web Development"
];

export default function Hero() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const hoveredNodeRef = useRef(-1);
  const animStateRef = useRef({ progress: 0 });

  // ── Intro Reveal Sequence ──
  useEffect(() => {
    const tl = gsap.timeline();

    // 1. Logo fade-in & slide-down
    tl.fromTo(".logo-link",
      { opacity: 0, y: -15 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );

    // 2. Navigation items staggered fade-in & slide-down
    tl.fromTo(".nav-item-animate",
      { opacity: 0, y: -15 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" },
      "-=0.6"
    );

    // 3. Headline reveal line by line
    tl.fromTo(".reveal-text",
      { y: "110%" },
      { y: "0%", duration: 1.2, ease: "power4.out", stagger: 0.15 },
      "-=0.4"
    );

    // 4. 9D Orbit expansion
    tl.to(animStateRef.current,
      { progress: 1, duration: 1.8, ease: "power3.out" },
      "-=0.4"
    );

    // 5. Description fade-in
    tl.fromTo(".hero-description",
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
      "-=1.2"
    );

    // 6. Accent line fade-in
    tl.fromTo(".hero-accent",
      { opacity: 0, scaleX: 0 },
      { opacity: 1, scaleX: 1, duration: 0.8, ease: "power3.out" },
      "-=1.0"
    );

    // 7. CTA fade-in
    tl.fromTo(".hero-cta",
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
      "-=0.8"
    );
  }, []);

  // ── Scroll-based translate, scale & darken ──
  useEffect(() => {
    const content = contentRef.current;
    const container = containerRef.current;
    if (!content || !container) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = 200; // Scroll 200px
      const progress = Math.min(scrollY / maxScroll, 1);

      // 1. Heading moves up slightly
      const translateY = -progress * 30;
      content.style.transform = `translateY(${translateY}px)`;

      // 2. Orbit scales down 3%
      container.style.setProperty('--orbit-scale', 1 - progress * 0.03);

      // 3. Background darkens slightly (via black overlay)
      const bgOverlay = container.querySelector('.hero-bg-overlay');
      if (bgOverlay) {
        bgOverlay.style.opacity = progress * 0.65;
      }
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

    window.addEventListener('resize', setSize);

    // Touch vs mouse detection
    const isTouch = isTouchDevice();

    // Slow continuous rotation — exactly 60 seconds per revolution (60s * 60fps = 3600 frames)
    let baseAngle = 0;
    const rotationSpeed = (2 * Math.PI) / 3600;

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

    const handleClick = () => {
      const hoveredNode = hoveredNodeRef.current;
      if (hoveredNode >= 0) {
        // Dispatch selectDimension event (1-indexed)
        window.dispatchEvent(new CustomEvent('selectDimension', { detail: hoveredNode + 1 }));

        // Scroll to Philosophy section
        const philosophySec = document.getElementById('philosophy');
        if (philosophySec) {
          philosophySec.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('touchstart', handleTouchStart, { passive: true });
    canvas.addEventListener('touchend', handleTouchEnd, { passive: true });
    canvas.addEventListener('click', handleClick);

    // Smooth mouse influence (lerped)
    let tiltX = 0;
    let tiltY = 0;

    const draw = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);

      const p = animStateRef.current.progress;
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
        ctx.font = `700 ${14 * p}px Outfit, sans-serif`;
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

        // Interactive Signature Hover: Leader line and service title
        if (isHovered && p > 0.8) {
          const isRight = nx > tcx;
          
          // Leader line coordinates
          const lineLength = 50;
          const dx = isRight ? lineLength : -lineLength;
          const dy = ny > tcy ? 30 : -30;

          ctx.beginPath();
          ctx.moveTo(nx, ny);
          ctx.lineTo(nx + dx * 0.4, ny + dy * 0.4);
          ctx.lineTo(nx + dx, ny + dy);
          ctx.strokeStyle = 'rgba(190, 242, 100, 0.4)';
          ctx.lineWidth = 0.8;
          ctx.stroke();

          // Text layout alignment
          ctx.textAlign = isRight ? 'left' : 'right';
          ctx.textBaseline = 'middle';

          // 01 / Number in green
          ctx.font = '700 10px Outfit, sans-serif';
          ctx.fillStyle = '#bef264';
          const labelNum = `0${i + 1}`;
          ctx.fillText(labelNum, nx + dx + (isRight ? 8 : -8), ny + dy - 7);

          // Service Title in white
          ctx.font = '500 13px Inter, sans-serif';
          ctx.fillStyle = '#ffffff';
          ctx.fillText(serviceNames[i], nx + dx + (isRight ? 8 : -8), ny + dy + 7);

          // Reset alignments
          ctx.textAlign = 'start';
          ctx.textBaseline = 'alphabetic';
        }
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
      canvas.removeEventListener('click', handleClick);
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
      {/* Background Dark Overlay for Scroll Interaction */}
      <div className="hero-bg-overlay absolute inset-0 bg-[#040c08] pointer-events-none opacity-0 z-[1] transition-opacity duration-150" />

      {/* Grid guides — hidden on phones */}
      <div className="blueprint-grid-line vertical left-5 xs:left-6 md:left-16 hidden sm:block" />
      <div className="blueprint-grid-line vertical left-[50%] hidden lg:block" />
      <div className="blueprint-grid-line horizontal bottom-0" />

      {/* Corner labels */}
      <div className="absolute top-10 xs:top-12 left-5 xs:left-6 md:left-16 font-body text-[7px] xs:text-[8px] tracking-[0.12em] xs:tracking-[0.15em] text-white/[0.35] select-none z-20 hidden xs:block">
        The Creative Agency of Naya Growth
      </div>
      <div className="absolute top-10 xs:top-12 right-5 xs:right-6 md:right-16 font-body text-[7px] xs:text-[8px] tracking-[0.2em] xs:tracking-[0.25em] text-white/[0.12] uppercase select-none text-right z-20 hidden xs:block">
        Naya Growth Pvt. Ltd.
      </div>

      {/* Nine Core Canvas */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[2]">
        <div className="w-full h-full pointer-events-auto canvas-orbit-wrapper">
          <canvas ref={canvasRef} className="w-full h-full" />
        </div>
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 w-full max-w-[1400px] mx-auto px-4 xs:px-5 sm:px-6 md:px-12 lg:px-16 xl:px-16 py-4 xs:py-5 sm:py-6 md:py-8 lg:py-8"
        style={{ willChange: 'transform, opacity' }}
      >
        <h1 className="hero-heading">
          <div className="reveal-mask">
            <span className="reveal-text block">
              Building <span className="italic font-light">Brands</span>
            </span>
          </div>
          <div className="reveal-mask mt-1 xs:mt-1.5 sm:mt-2">
            <span className="reveal-text block">
              Across Nine <span className="text-[#bef264] italic">Dimensions.</span>
            </span>
          </div>
        </h1>

        {/* Line accent */}
        <div className="hero-accent w-8 xs:w-10 sm:w-14 h-[1.5px] bg-[#bef264]/40 mt-6 xs:mt-8 sm:mt-10 mb-4 xs:mb-5 sm:mb-6 opacity-0 origin-left" />

        {/* Description */}
        <p className="hero-description font-body text-[11px] xs:text-xs sm:text-sm md:text-[0.95rem] leading-relaxed text-gray-400 max-w-[280px] xs:max-w-[320px] sm:max-w-[400px] md:max-w-[440px] mb-6 xs:mb-8 sm:mb-10 opacity-0">
          Nine creative disciplines. One creative system built to shape modern brands.
        </p>

        {/* CTA */}
        <div className="hero-cta opacity-0">
          <a
            href="#services"
            className="group inline-flex items-center gap-2 xs:gap-2.5 sm:gap-3 px-4 xs:px-5 sm:px-6 md:px-7 py-2 xs:py-2.5 sm:py-3 border border-white/15 hover:border-white/70 text-white rounded-full transition-all duration-300 font-body text-[0.65rem] xs:text-[0.7rem] sm:text-[0.75rem] md:text-[0.8rem] font-medium tracking-[0.1em] xs:tracking-[0.12em] sm:tracking-[0.15em] uppercase"
          >
            <span>Explore The System</span>
            <ArrowRight className="w-3.5 h-3.5 xs:w-4 xs:h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </a>
        </div>

      </div>
    </section>
  );
}
