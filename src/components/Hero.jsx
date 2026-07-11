import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';

export default function Hero() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, tx: 0, ty: 0 });

  // ── Entry animations — start after page loader (~2.7s) ──
  useEffect(() => {
    const tl = gsap.timeline({ delay: 2.9 });

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

  }, []);

  // ── Full-screen background constellation canvas — fast orbiting concentric orbs ──
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

    // ── Config ──
    const outerNodesCount = 7;
    const innerNodesCount = 2;
    let baseAngle = 0;
    let innerAngle = Math.PI * 0.3;
    const rotationSpeed = (2 * Math.PI) / 600;      // ~8× faster than before
    const innerRotationSpeed = (2 * Math.PI) / 900;  // counter-rotate inner ring

    // Draw a concentric-ring orb (like the reference image)
    function drawOrb(x, y, size, alpha) {
      // outer ring
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(201,122,61,${alpha * 0.7})`;
      ctx.lineWidth = 1.8;
      ctx.stroke();

      // middle ring
      ctx.beginPath();
      ctx.arc(x, y, size * 0.62, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(201,122,61,${alpha * 0.55})`;
      ctx.lineWidth = 1.4;
      ctx.stroke();

      // inner filled dot
      ctx.beginPath();
      ctx.arc(x, y, size * 0.25, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(224,169,109,${alpha})`;
      ctx.fill();

      // glow halo
      const grd = ctx.createRadialGradient(x, y, 0, x, y, size * 1.6);
      grd.addColorStop(0, `rgba(201,122,61,${alpha * 0.12})`);
      grd.addColorStop(1, 'rgba(201,122,61,0)');
      ctx.beginPath();
      ctx.arc(x, y, size * 1.6, 0, Math.PI * 2);
      ctx.fillStyle = grd;
      ctx.fill();
    }

    let lastTime = 0;

    function draw(timestamp) {
      if (!isVisible) {
        animationFrameId = 0;
        return;
      }

      const dt = lastTime ? (timestamp - lastTime) : 16;
      lastTime = timestamp;

      ctx.clearRect(0, 0, w, h);

      const cx = w < 640 ? w * 0.5 : w * 0.62;
      const cy = h * 0.48;
      const outerRadius = Math.min(w, h) * (w < 640 ? 0.28 : 0.34);
      const innerRadius = outerRadius * 0.45;

      baseAngle += rotationSpeed * (dt / 16);
      innerAngle -= innerRotationSpeed * (dt / 16);

      mouseRef.current.x += (mouseRef.current.tx - mouseRef.current.x) * 0.06;
      mouseRef.current.y += (mouseRef.current.ty - mouseRef.current.y) * 0.06;

      // ── Faint orbit path ──
      ctx.beginPath();
      ctx.arc(cx, cy, outerRadius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(201,122,61,0.06)';
      ctx.lineWidth = 0.8;
      ctx.setLineDash([4, 8]);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.beginPath();
      ctx.arc(cx, cy, innerRadius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(201,122,61,0.04)';
      ctx.lineWidth = 0.6;
      ctx.setLineDash([3, 6]);
      ctx.stroke();
      ctx.setLineDash([]);

      // ── Compute outer nodes ──
      const outerNodes = [];
      for (let i = 0; i < outerNodesCount; i++) {
        const angle = baseAngle + (i / outerNodesCount) * Math.PI * 2;
        const wobble = Math.sin(timestamp * 0.002 + i * 1.3) * 8;
        const x = cx + (outerRadius + wobble) * Math.cos(angle);
        const y = cy + (outerRadius + wobble) * Math.sin(angle);
        outerNodes.push({ x, y });
      }

      // ── Compute inner nodes ──
      const innerNodes = [];
      for (let i = 0; i < innerNodesCount; i++) {
        const angle = innerAngle + (i / innerNodesCount) * Math.PI * 2;
        const wobble = Math.sin(timestamp * 0.003 + i * 2.1) * 5;
        const x = cx + (innerRadius + wobble) * Math.cos(angle);
        const y = cy + (innerRadius + wobble) * Math.sin(angle);
        innerNodes.push({ x, y });
      }

      // ── Connecting lines — outer ring ──
      ctx.lineWidth = 1;
      for (let i = 0; i < outerNodesCount; i++) {
        const a = outerNodes[i];
        const b = outerNodes[(i + 1) % outerNodesCount];
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = 'rgba(201,122,61,0.1)';
        ctx.stroke();
      }

      // ── Connecting lines — inner to outer (web pattern) ──
      ctx.lineWidth = 0.6;
      innerNodes.forEach((inner) => {
        // connect to 2 nearest outer nodes
        const sorted = [...outerNodes].sort(
          (a, b) => Math.hypot(a.x - inner.x, a.y - inner.y) - Math.hypot(b.x - inner.x, b.y - inner.y)
        );
        for (let k = 0; k < 2; k++) {
          ctx.beginPath();
          ctx.moveTo(inner.x, inner.y);
          ctx.lineTo(sorted[k].x, sorted[k].y);
          ctx.strokeStyle = 'rgba(201,122,61,0.06)';
          ctx.stroke();
        }
      });

      // ── Draw outer orbs ──
      outerNodes.forEach((node) => {
        const dist = Math.hypot(mouseRef.current.x - node.x, mouseRef.current.y - node.y);
        const prox = Math.max(0, 1 - dist / 200);
        const orbSize = 14 + prox * 8 + Math.sin(timestamp * 0.003) * 2;
        drawOrb(node.x, node.y, orbSize, 0.35 + prox * 0.45);
      });

      // ── Draw inner orbs (smaller, counter-rotating) ──
      innerNodes.forEach((node) => {
        const dist = Math.hypot(mouseRef.current.x - node.x, mouseRef.current.y - node.y);
        const prox = Math.max(0, 1 - dist / 180);
        const orbSize = 10 + prox * 5 + Math.cos(timestamp * 0.004) * 1.5;
        drawOrb(node.x, node.y, orbSize, 0.25 + prox * 0.35);
      });

      // (no centre hub — total 9 orbs: 7 outer + 2 inner)

      // ── Mouse proximity glow ──
      const mGrd = ctx.createRadialGradient(
        mouseRef.current.x, mouseRef.current.y, 0,
        mouseRef.current.x, mouseRef.current.y, 220
      );
      mGrd.addColorStop(0, 'rgba(201,122,61,0.06)');
      mGrd.addColorStop(1, 'rgba(201,122,61,0)');
      ctx.beginPath();
      ctx.arc(mouseRef.current.x, mouseRef.current.y, 220, 0, Math.PI * 2);
      ctx.fillStyle = mGrd;
      ctx.fill();

      animationFrameId = requestAnimationFrame(draw);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          if (!animationFrameId) animationFrameId = requestAnimationFrame(draw);
        } else if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
          animationFrameId = 0;
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(section);

    animationFrameId = requestAnimationFrame(draw);

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
      <div className="relative z-10 px-6 md:px-12 lg:px-20 xl:px-28 py-24 sm:py-28 md:py-32 lg:py-36 flex flex-col items-start max-w-[1100px] w-full mx-auto">

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
            <span className="reveal-line block text-[2.2rem] xs:text-[2.6rem] sm:text-[3.6rem] md:text-[4.6rem] lg:text-[5.6rem] xl:text-[6.4rem] 2xl:text-[7rem]">
              Building Brands
            </span>
          </div>
          <div className="overflow-hidden">
            <span className="reveal-line block text-[2.2rem] xs:text-[2.6rem] sm:text-[3.6rem] md:text-[4.6rem] lg:text-[5.6rem] xl:text-[6.4rem] 2xl:text-[7rem]">
              Across Nine
            </span>
          </div>
          <div className="overflow-hidden">
            <span className="reveal-line block text-[2.2rem] xs:text-[2.6rem] sm:text-[3.6rem] md:text-[4.6rem] lg:text-[5.6rem] xl:text-[6.4rem] 2xl:text-[7rem] font-light italic text-[#C97A3D]">
              Dimensions.
            </span>
          </div>
        </h1>

        {/* Sub-text + CTAs in a horizontal bar */}
        <div className="flex flex-col sm:flex-row sm:items-end gap-5 sm:gap-8 lg:gap-14">

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



    </section>
  );
}
