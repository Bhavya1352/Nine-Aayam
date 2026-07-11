import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';

export default function Hero() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, tx: 0, ty: 0 });

  // ── Entry animations ──
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.4 });

    tl.fromTo(".hero-label",
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }
    );

    tl.fromTo(".reveal-line",
      { y: "110%", opacity: 0 },
      { y: "0%", opacity: 1, duration: 1.3, ease: "power4.out", stagger: 0.08 },
      0.15
    );

    tl.fromTo(".hero-sub",
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" },
      0.7
    );

    tl.fromTo(".hero-cta",
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.12 },
      0.85
    );

    tl.fromTo(".hero-bottom-bar",
      { opacity: 0 },
      { opacity: 1, duration: 1.0, ease: "power2.out" },
      1.2
    );
  }, []);

  // ── Full-screen background constellation canvas ──
  useEffect(() => {
    const canvas = canvasRef.current;
    const section = containerRef.current;
    if (!canvas || !section) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let isVisible = true;
    let w, h;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const setSize = () => {
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    setSize();
    window.addEventListener('resize', setSize);

    const handleMouseMove = (e) => {
      if (!isVisible) return;
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.tx = e.clientX - rect.left;
      mouseRef.current.ty = e.clientY - rect.top;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const nodesCount = 9;
    let baseAngle = 0;
    const rotationSpeed = (2 * Math.PI) / 5000;

    function draw() {
      if (!isVisible) {
        animationFrameId = 0;
        return;
      }

      ctx.clearRect(0, 0, w, h);

      const cx = w * 0.62;
      const cy = h * 0.48;
      const radius = Math.min(w, h) * 0.32;

      baseAngle += rotationSpeed;

      mouseRef.current.x += (mouseRef.current.tx - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.ty - mouseRef.current.y) * 0.05;

      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(201,122,61,0.03)';
      ctx.lineWidth = 1;
      ctx.stroke();

      const nodes = [];
      for (let i = 0; i < nodesCount; i++) {
        const angle = baseAngle + (i / nodesCount) * Math.PI * 2;
        const x = cx + radius * Math.cos(angle);
        const y = cy + radius * Math.sin(angle);
        nodes.push({ x, y });
      }

      ctx.lineWidth = 0.5;
      for (let i = 0; i < nodesCount; i++) {
        const a = nodes[i];
        const b = nodes[(i + 1) % nodesCount];
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = 'rgba(201,122,61,0.04)';
        ctx.stroke();
      }

      nodes.forEach((node) => {
        const dist = Math.hypot(mouseRef.current.x - node.x, mouseRef.current.y - node.y);
        const prox = Math.max(0, 1 - dist / 150);
        const circleSize = 4 + prox * 3;

        ctx.beginPath();
        ctx.arc(node.x, node.y, circleSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201,122,61,${0.15 + prox * 0.2})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(node.x, node.y, circleSize * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = prox > 0.3 ? '#E0A96D' : 'rgba(201,122,61,0.5)';
        ctx.fill();
      });

      ctx.beginPath();
      ctx.arc(cx, cy, 8, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(201,122,61,0.1)';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(cx, cy, 3, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(201,122,61,0.4)';
      ctx.fill();

      const grd = ctx.createRadialGradient(
        mouseRef.current.x, mouseRef.current.y, 0,
        mouseRef.current.x, mouseRef.current.y, 180
      );
      grd.addColorStop(0, 'rgba(201,122,61,0.04)');
      grd.addColorStop(1, 'rgba(201,122,61,0)');
      ctx.beginPath();
      ctx.arc(mouseRef.current.x, mouseRef.current.y, 180, 0, Math.PI * 2);
      ctx.fillStyle = grd;
      ctx.fill();

      animationFrameId = requestAnimationFrame(draw);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          if (!animationFrameId) draw();
        } else if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
          animationFrameId = 0;
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(section);

    draw();

    return () => {
      isVisible = false;
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      window.removeEventListener('resize', setSize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen min-h-dvh w-full flex flex-col justify-center overflow-hidden bg-[#1B1F24]"
    >
      {/* Full-screen constellation as background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full z-0 pointer-events-none"
      />

      {/* Ambient glows */}
      <div className="absolute top-0 right-0 w-[50vw] h-[60vh] bg-[#C97A3D]/[0.012] rounded-full filter blur-[180px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[40vw] h-[40vh] bg-[#252B33]/80 rounded-full filter blur-[120px] pointer-events-none" />

      {/* Content — Centered editorial composition */}
      <div className="relative z-10 px-6 md:px-12 lg:px-20 xl:px-28 py-28 sm:py-32 md:py-36 lg:py-40 flex flex-col items-start max-w-[1100px] w-full">

        {/* Tagline label */}
        <div className="hero-label flex items-center gap-3 mb-10 opacity-0">
          <div className="w-10 h-[1px] bg-[#C97A3D]/60" />
          <span className="font-subheading text-[10px] sm:text-[11px] font-semibold tracking-[0.3em] text-[#C97A3D] uppercase">
            Creative Agency System
          </span>
        </div>

        {/* Main heading — large, editorial, left-aligned */}
        <h1 className="font-heading text-[#F4F1EB] leading-[1.04] tracking-[-0.025em] mb-10 select-none">
          <div className="overflow-hidden">
            <span className="reveal-line block text-[2.6rem] sm:text-[3.6rem] md:text-[4.6rem] lg:text-[5.6rem] xl:text-[6.4rem]">
              Building Brands
            </span>
          </div>
          <div className="overflow-hidden">
            <span className="reveal-line block text-[2.6rem] sm:text-[3.6rem] md:text-[4.6rem] lg:text-[5.6rem] xl:text-[6.4rem]">
              Across Nine
            </span>
          </div>
          <div className="overflow-hidden">
            <span className="reveal-line block text-[2.6rem] sm:text-[3.6rem] md:text-[4.6rem] lg:text-[5.6rem] xl:text-[6.4rem] font-light italic text-[#C97A3D]">
              Dimensions.
            </span>
          </div>
        </h1>

        {/* Sub-text + CTAs in a horizontal bar */}
        <div className="flex flex-col sm:flex-row sm:items-end gap-6 sm:gap-10 lg:gap-16">

          {/* Manifesto */}
          <p className="hero-sub font-body text-[13px] sm:text-sm leading-[1.75] text-[#C4C8CF]/70 max-w-[380px] opacity-0">
            Nine creative disciplines — from identity systems and design to motion, UI/UX, and front-end engineering — unified into one growth architecture.
          </p>

          {/* CTAs */}
          <div className="flex gap-4 select-none shrink-0">
            <a
              href="#philosophy"
              className="hero-cta group inline-flex items-center gap-2 px-5 py-3 bg-[#C97A3D] text-[#1B1F24] rounded transition-all duration-300 font-subheading text-[10px] font-bold tracking-[0.1em] uppercase hover:bg-[#E0A96D] opacity-0"
            >
              <span>Explore</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </a>

            <a
              href="mailto:connect@nayagrowth.com"
              className="hero-cta inline-flex items-center gap-2 px-5 py-3 border border-white/[0.1] hover:border-white/20 text-[#C4C8CF] hover:text-[#F4F1EB] rounded transition-all duration-300 font-subheading text-[10px] font-bold tracking-[0.1em] uppercase opacity-0"
            >
              <span>Start Project</span>
            </a>
          </div>
        </div>

      </div>

      {/* Bottom bar — scroll + metadata */}
      <div className="hero-bottom-bar absolute bottom-0 left-0 right-0 px-6 md:px-12 lg:px-20 py-6 flex items-center justify-between z-10 border-t border-white/[0.04] opacity-0 select-none">
        <div className="flex items-center gap-3">
          <div className="w-[1px] h-5 bg-[#C97A3D]/30" />
          <span className="font-mono text-[8px] text-[#C4C8CF]/30 uppercase tracking-[0.2em]">
            Scroll to explore
          </span>
        </div>
        <span className="font-mono text-[8px] text-[#C4C8CF]/20 uppercase tracking-[0.15em] hidden sm:block">
          Nine Aayam / Naya Growth Pvt Ltd
        </span>
      </div>

    </section>
  );
}
