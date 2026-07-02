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

    // 1. Logo fade-in
    tl.fromTo(".logo-link",
      { opacity: 0, y: -15 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );

    // 2. Nav links staggered reveal
    tl.fromTo(".nav-item-animate",
      { opacity: 0, y: -15 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" },
      "-=0.6"
    );

    // 3. Headline reveal
    tl.fromTo(".reveal-text",
      { y: "110%" },
      { y: "0%", duration: 1.2, ease: "power4.out", stagger: 0.15 },
      "-=0.4"
    );

    // 4. Orbit expansion
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

  // ── Scroll translate & scale effects ──
  useEffect(() => {
    const content = contentRef.current;
    const container = containerRef.current;
    if (!content || !container) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = 200;
      const progress = Math.min(scrollY / maxScroll, 1);

      const translateY = -progress * 30;
      content.style.transform = `translateY(${translateY}px)`;
      container.style.setProperty('--orbit-scale', 1 - progress * 0.03);

      const bgOverlay = container.querySelector('.hero-bg-overlay');
      if (bgOverlay) {
        bgOverlay.style.opacity = progress * 0.65;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ── Canvas: precision instrument orbit dial ──
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

    const isTouch = isTouchDevice();
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
        window.dispatchEvent(new CustomEvent('selectDimension', { detail: hoveredNode + 1 }));

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

      if (!isTouch) {
        const targetTiltX = (mouseRef.current.x - 0.5) * 18;
        const targetTiltY = (mouseRef.current.y - 0.5) * 14;
        tiltX += (targetTiltX - tiltX) * 0.04;
        tiltY += (targetTiltY - tiltY) * 0.04;
      }

      const breathe = 1 + Math.sin(t * 0.8) * 0.008;
      const orbitRadius = Math.min(w, h) * 0.34 * breathe;

      const tcx = cx + tiltX;
      const tcy = cy + tiltY;

      // Concentric circles & guidelines
      ctx.beginPath();
      ctx.arc(tcx, tcy, orbitRadius * p * 1.38, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(198, 138, 46, ${0.02 * p})`;
      ctx.lineWidth = 0.5;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(tcx, tcy, orbitRadius * p * 1.22, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(198, 138, 46, ${0.045 * p})`;
      ctx.lineWidth = 0.5;
      ctx.setLineDash([3, 15]);
      ctx.stroke();
      ctx.setLineDash([]); 

      ctx.beginPath();
      ctx.arc(tcx, tcy, orbitRadius * p * 0.72, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(198, 138, 46, ${0.035 * p})`;
      ctx.lineWidth = 0.5;
      ctx.setLineDash([1, 6]);
      ctx.stroke();
      ctx.setLineDash([]); 

      // ── NEW: Counter-rotating inner HUD dial ──
      ctx.beginPath();
      ctx.arc(tcx, tcy, orbitRadius * p * 0.52, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(198, 138, 46, ${0.07 * p})`;
      ctx.lineWidth = 0.55;
      ctx.stroke();

      const innerTicks = 36;
      for (let k = 0; k < innerTicks; k++) {
        const tickAngle = (k / innerTicks) * Math.PI * 2 - baseAngle * 0.8;
        const r1 = orbitRadius * p * 0.52;
        const r2 = orbitRadius * p * (k % 4 === 0 ? 0.49 : 0.505);
        const x1 = tcx + r1 * Math.cos(tickAngle);
        const y1 = tcy + r1 * Math.sin(tickAngle);
        const x2 = tcx + r2 * Math.cos(tickAngle);
        const y2 = tcy + r2 * Math.sin(tickAngle);

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = `rgba(198, 138, 46, ${(k % 4 === 0 ? 0.12 : 0.05) * p})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      // ── NEW: Volumetric Technical status readout in corner ──
      if (p > 0.8) {
        ctx.font = '6px Courier New, monospace';
        ctx.fillStyle = `rgba(198, 138, 46, ${0.28 * p})`;
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
        ctx.fillText(`SYS.STATUS // NINE.AAYAM.V1`, 24, 24);
        ctx.fillText(`COORD.X   // ${tcx.toFixed(1)}px`, 24, 34);
        ctx.fillText(`COORD.Y   // ${tcy.toFixed(1)}px`, 24, 44);
        ctx.fillText(`ROT.DEG   // ${((baseAngle * 180) / Math.PI % 360).toFixed(1)}°`, 24, 54);
        
        const hoveredNodeIndex = hoveredNodeRef.current;
        if (hoveredNodeIndex >= 0) {
          ctx.fillStyle = '#c68a2e';
          ctx.fillText(`LOCK.ON   // DIMENSION_0${hoveredNodeIndex + 1}`, 24, 64);
        } else {
          ctx.fillText(`LOCK.ON   // SCANNING`, 24, 64);
        }
      }

      // Dial ticks
      const totalTicks = 90;
      for (let j = 0; j < totalTicks; j++) {
        const tickAngle = (j / totalTicks) * Math.PI * 2 + baseAngle * 0.1;
        const outerR = orbitRadius * p * 1.05;
        const innerR = orbitRadius * p * (j % 10 === 0 ? 1.018 : j % 5 === 0 ? 1.028 : 1.036);
        const x1 = tcx + outerR * Math.cos(tickAngle);
        const y1 = tcy + outerR * Math.sin(tickAngle);
        const x2 = tcx + innerR * Math.cos(tickAngle);
        const y2 = tcy + innerR * Math.sin(tickAngle);

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = `rgba(198, 138, 46, ${(j % 5 === 0 ? 0.08 : 0.03) * p})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();

        // Monospace index labels
        if (j % 15 === 0 && p > 0.7) {
          const textR = orbitRadius * p * 1.11;
          const tx = tcx + textR * Math.cos(tickAngle);
          const ty = tcy + textR * Math.sin(tickAngle);
          ctx.font = '5px Courier New, monospace';
          ctx.fillStyle = `rgba(198, 138, 46, ${0.18 * p})`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(`${j * 4}°`, tx, ty);
        }
      }

      // Orbit ring
      ctx.beginPath();
      ctx.arc(tcx, tcy, orbitRadius * p, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(198, 138, 46, ${0.22 * p})`;
      ctx.lineWidth = 0.8;
      ctx.stroke();

      // Core 9D button
      const coreRadius = 12 * p;
      ctx.beginPath();
      ctx.arc(tcx, tcy, coreRadius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(198, 138, 46, ${0.9 * p})`;
      ctx.fill();

      if (p > 0.5) {
        ctx.font = `700 ${14 * p}px Inter, sans-serif`;
        ctx.fillStyle = `rgba(5, 5, 21, ${p})`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('9D', tcx, tcy + 0.5);
        ctx.textAlign = 'start';
        ctx.textBaseline = 'alphabetic';
      }

      // Nodes
      const hoveredNode = hoveredNodeRef.current;
      for (let i = 0; i < 9; i++) {
        const angle = baseAngle + (i / 9) * Math.PI * 2;
        const nx = tcx + orbitRadius * p * Math.cos(angle);
        const ny = tcy + orbitRadius * p * Math.sin(angle);
        const isHovered = i === hoveredNode;

        ctx.beginPath();
        ctx.moveTo(tcx, tcy);
        ctx.lineTo(nx, ny);
        ctx.strokeStyle = `rgba(198, 138, 46, ${(isHovered ? 0.18 : 0.07) * p})`;
        ctx.lineWidth = isHovered ? 0.8 : 0.5;
        ctx.stroke();

        // ── NEW: Data flow particles along connector lines ──
        const flowProgress = (t * 0.5 + i * 0.11) % 1.0;
        const px = tcx + (nx - tcx) * flowProgress;
        const py = tcy + (ny - tcy) * flowProgress;
        ctx.beginPath();
        ctx.arc(px, py, 1.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(198, 138, 46, ${(isHovered ? 0.9 : 0.4) * p})`;
        ctx.fill();

        const nodeRadius = isHovered ? 6 : 3;
        if (isHovered) {
          ctx.beginPath();
          ctx.arc(nx, ny, 10, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(198, 138, 46, ${0.08 * p})`;
          ctx.fill();

          // ── NEW: Viewfinder Target brackets surrounding hovered node ──
          if (p > 0.8) {
            const bracketSize = 8;
            const bracketGap = 2.5;
            ctx.strokeStyle = 'rgba(198, 138, 46, 0.7)';
            ctx.lineWidth = 0.75;

            // Top-Left bracket
            ctx.beginPath();
            ctx.moveTo(nx - bracketSize, ny - bracketSize + bracketGap);
            ctx.lineTo(nx - bracketSize, ny - bracketSize);
            ctx.lineTo(nx - bracketSize + bracketGap, ny - bracketSize);
            ctx.stroke();

            // Top-Right bracket
            ctx.beginPath();
            ctx.moveTo(nx + bracketSize, ny - bracketSize + bracketGap);
            ctx.lineTo(nx + bracketSize, ny - bracketSize);
            ctx.lineTo(nx + bracketSize - bracketGap, ny - bracketSize);
            ctx.stroke();

            // Bottom-Left bracket
            ctx.beginPath();
            ctx.moveTo(nx - bracketSize, ny + bracketSize - bracketGap);
            ctx.lineTo(nx - bracketSize, ny + bracketSize);
            ctx.lineTo(nx - bracketSize + bracketGap, ny + bracketSize);
            ctx.stroke();

            // Bottom-Right bracket
            ctx.beginPath();
            ctx.moveTo(nx + bracketSize, ny + bracketSize - bracketGap);
            ctx.lineTo(nx + bracketSize, ny + bracketSize);
            ctx.lineTo(nx + bracketSize - bracketGap, ny + bracketSize);
            ctx.stroke();
          }

          // ── NEW: Concentric Radar ripples expanding from node ──
          const rippleCount = 2;
          for (let rIdx = 0; rIdx < rippleCount; rIdx++) {
            const rippleProgress = ((t * 1.4 + rIdx / rippleCount) % 1.0);
            const rippleR = 7 + rippleProgress * 18;
            const rippleAlpha = (1 - rippleProgress) * 0.4 * p;
            ctx.beginPath();
            ctx.arc(nx, ny, rippleR, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(198, 138, 46, ${rippleAlpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }

        ctx.beginPath();
        ctx.arc(nx, ny, nodeRadius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(198, 138, 46, ${(isHovered ? 1 : 0.85) * p})`;
        ctx.fill();

        // Point leader lines on hover
        if (isHovered && p > 0.8) {
          const isRight = nx > tcx;
          const lineLength = 50;
          const dx = isRight ? lineLength : -lineLength;
          const dy = ny > tcy ? 30 : -30;

          ctx.beginPath();
          ctx.moveTo(nx, ny);
          ctx.lineTo(nx + dx * 0.4, ny + dy * 0.4);
          ctx.lineTo(nx + dx, ny + dy);
          ctx.strokeStyle = 'rgba(198, 138, 46, 0.4)';
          ctx.lineWidth = 0.8;
          ctx.stroke();

          ctx.textAlign = isRight ? 'left' : 'right';
          ctx.textBaseline = 'middle';

          ctx.font = '700 10px Inter, sans-serif';
          ctx.fillStyle = '#c68a2e';
          ctx.fillText(`0${i + 1}`, nx + dx + (isRight ? 8 : -8), ny + dy - 7);

          ctx.font = '500 13px Inter, sans-serif';
          ctx.fillStyle = '#ffffff';
          ctx.fillText(serviceNames[i], nx + dx + (isRight ? 8 : -8), ny + dy + 7);

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
      className="hero relative min-h-screen min-h-dvh w-full flex items-center overflow-hidden z-10 pt-16"
      style={{
        background: 'radial-gradient(circle at 55% 50%, rgba(198, 138, 46, 0.015), transparent 55%)'
      }}
    >
      {/* 2. Subtle radial amber light behind Hero (Requirement 2) */}
      <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#c68a2e]/[0.05] rounded-full filter blur-[250px] pointer-events-none z-[1]" />

      {/* Background Dark Overlay for Scroll Interaction */}
      <div className="hero-bg-overlay absolute inset-0 bg-[#050515] pointer-events-none opacity-0 z-[1] transition-opacity duration-150" />

      {/* Grid guides — hidden on phones */}
      <div className="blueprint-grid-line vertical left-5 xs:left-6 md:left-16 hidden sm:block" />
      <div className="blueprint-grid-line horizontal bottom-0" />

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
        {/* 3. Headline breathing layout change */}
        <h1 className="hero-heading leading-[1.05] tracking-tight">
          <div className="reveal-mask">
            <span className="reveal-text block">
              Building Brands
            </span>
          </div>
          <div className="reveal-mask mt-1 sm:mt-2 translate-x-[4px]">
            <span className="reveal-text block">
              Across Nine <span className="text-[#c68a2e] italic tracking-[-0.03em] font-light">Dimensions.</span>
            </span>
          </div>
        </h1>

        {/* Line accent */}
        <div className="hero-accent w-8 xs:w-10 sm:w-14 h-[1.5px] bg-[#c68a2e]/30 mt-8 sm:mt-10 mb-5 sm:mb-6 opacity-0 origin-left" />

        {/* Description */}
        <p className="hero-description font-body text-[11px] xs:text-xs sm:text-sm md:text-[0.95rem] leading-[1.68] text-gray-350 max-w-[280px] xs:max-w-[320px] sm:max-w-[400px] md:max-w-[440px] mb-6 xs:mb-8 sm:mb-10 opacity-0">
          Nine creative disciplines. One creative system built to shape modern brands.
        </p>

        {/* CTA */}
        <div className="hero-cta opacity-0">
          <a
            href="#services"
            className="group inline-flex items-center gap-2 xs:gap-2.5 sm:gap-3 px-4 xs:px-5 sm:px-6 md:px-7 py-2 xs:py-2.5 sm:py-3 border border-white/10 hover:border-[#c68a2e]/60 text-white rounded-full transition-all duration-300 font-body text-[0.65rem] xs:text-[0.7rem] sm:text-[0.75rem] md:text-[0.8rem] font-medium tracking-[0.1em] xs:tracking-[0.12em] sm:tracking-[0.15em] uppercase hover:shadow-[0_0_20px_rgba(198,138,46,0.1)]"
          >
            <span>Explore The System</span>
            <ArrowRight className="w-3.5 h-3.5 xs:w-4 xs:h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </a>
        </div>

      </div>
    </section>
  );
}
