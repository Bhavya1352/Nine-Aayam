import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function Hero() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const mouseRef = useRef({ x: -999, y: -999, tx: -999, ty: -999 });
  const [hoveredNode, setHoveredNode] = useState(null);

  // ── Entry animations ──
  useEffect(() => {
    const tl = gsap.timeline({ delay: 2.9 });

    tl.fromTo('.h-eyebrow',
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    );
    tl.fromTo('.h-line',
      { y: '105%' },
      { y: '0%', duration: 1.4, ease: 'power4.out', stagger: 0.07 },
      0.1
    );
    tl.fromTo('.h-sub',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out' },
      0.65
    );
    tl.fromTo('.h-cta',
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.1 },
      0.8
    );
    tl.fromTo('.h-scroll-hint',
      { opacity: 0 },
      { opacity: 1, duration: 1.0, ease: 'power2.out' },
      1.4
    );
    tl.fromTo('.h-side-label',
      { opacity: 0, x: -10 },
      { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' },
      1.0
    );
  }, []);

  // ── Dimensional constellation canvas ──
  useEffect(() => {
    const canvas = canvasRef.current;
    const section = containerRef.current;
    if (!canvas || !section) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf, isVisible = true;
    let w, h;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const onMove = (e) => {
      const r = canvas.getBoundingClientRect();
      mouseRef.current.tx = e.clientX - r.left;
      mouseRef.current.ty = e.clientY - r.top;
    };
    window.addEventListener('mousemove', onMove, { passive: true });

    // 9 dimension nodes arranged in a sacred geometry pattern
    // Center + inner ring (3) + outer ring (5)
    const nodeLabels = ['01','02','03','04','05','06','07','08','09'];
    let t = 0;

    // Connection map: which nodes connect to which
    const connections = [
      [0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7],[0,8], // center to all
      [1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,1], // outer ring
      [1,4],[2,5],[3,6],[4,7],[5,8],[6,1],[7,2],[8,3], // cross connections
    ];

    function getNodes(time) {
      const cx = w < 768 ? w * 0.5 : w * 0.64;
      const cy = h * 0.5;
      const R1 = Math.min(w, h) * (w < 768 ? 0.22 : 0.26); // inner ring
      const R2 = Math.min(w, h) * (w < 768 ? 0.38 : 0.42); // outer ring

      const nodes = [];

      // Center node (dimension 0 — the core)
      nodes.push({
        x: cx + Math.sin(time * 0.0003) * 3,
        y: cy + Math.cos(time * 0.0004) * 3,
        size: 18, label: '9D', isCenter: true, idx: -1
      });

      // Inner ring — 4 nodes
      for (let i = 0; i < 4; i++) {
        const a = (i / 4) * Math.PI * 2 + time * 0.0004 + Math.PI / 4;
        const wobble = Math.sin(time * 0.002 + i * 1.7) * 6;
        nodes.push({
          x: cx + (R1 + wobble) * Math.cos(a),
          y: cy + (R1 + wobble) * Math.sin(a),
          size: 13, label: nodeLabels[i], idx: i
        });
      }

      // Outer ring — 5 nodes (counter-rotate)
      for (let i = 0; i < 5; i++) {
        const a = (i / 5) * Math.PI * 2 - time * 0.00025 + Math.PI / 5;
        const wobble = Math.sin(time * 0.0015 + i * 2.3) * 8;
        nodes.push({
          x: cx + (R2 + wobble) * Math.cos(a),
          y: cy + (R2 + wobble) * Math.sin(a),
          size: 11, label: nodeLabels[i + 4], idx: i + 4
        });
      }

      return nodes;
    }

    function drawNode(node, alpha, isHovered) {
      const { x, y, size, label, isCenter } = node;
      const s = isHovered ? size * 1.35 : size;

      // Outer glow
      const grd = ctx.createRadialGradient(x, y, 0, x, y, s * 2.8);
      grd.addColorStop(0, `rgba(201,122,61,${alpha * (isHovered ? 0.18 : 0.08)})`);
      grd.addColorStop(1, 'rgba(201,122,61,0)');
      ctx.beginPath();
      ctx.arc(x, y, s * 2.8, 0, Math.PI * 2);
      ctx.fillStyle = grd;
      ctx.fill();

      // Outer ring
      ctx.beginPath();
      ctx.arc(x, y, s, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(201,122,61,${alpha * (isHovered ? 0.9 : 0.5)})`;
      ctx.lineWidth = isCenter ? 1.5 : 1.2;
      ctx.stroke();

      // Inner ring
      ctx.beginPath();
      ctx.arc(x, y, s * 0.6, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(201,122,61,${alpha * (isHovered ? 0.6 : 0.3)})`;
      ctx.lineWidth = 0.8;
      ctx.stroke();

      // Core dot
      ctx.beginPath();
      ctx.arc(x, y, s * 0.28, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(224,169,109,${alpha * (isHovered ? 1 : 0.7)})`;
      ctx.fill();

      // Label
      if (!isCenter) {
        ctx.font = `bold ${Math.round(s * 0.55)}px "Space Mono", monospace`;
        ctx.fillStyle = `rgba(201,122,61,${alpha * (isHovered ? 0.9 : 0.5)})`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(label, x, y);
      } else {
        ctx.font = `bold ${Math.round(s * 0.6)}px "Plus Jakarta Sans", sans-serif`;
        ctx.fillStyle = `rgba(244,241,235,${alpha * 0.9})`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('9D', x, y);
      }
    }

    function draw(timestamp) {
      if (!isVisible) { raf = 0; return; }
      t = timestamp;

      ctx.clearRect(0, 0, w, h);

      // Smooth mouse
      mouseRef.current.x += (mouseRef.current.tx - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.ty - mouseRef.current.y) * 0.05;

      const nodes = getNodes(timestamp);

      // Draw orbit paths
      const cx = w < 768 ? w * 0.5 : w * 0.64;
      const cy = h * 0.5;
      const R1 = Math.min(w, h) * (w < 768 ? 0.22 : 0.26);
      const R2 = Math.min(w, h) * (w < 768 ? 0.38 : 0.42);

      [R1, R2].forEach((r, ri) => {
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(201,122,61,${ri === 0 ? 0.04 : 0.03})`;
        ctx.lineWidth = 0.6;
        ctx.setLineDash([3, 9]);
        ctx.stroke();
        ctx.setLineDash([]);
      });

      // Draw connections
      connections.forEach(([a, b]) => {
        const na = nodes[a + 1] || nodes[0]; // +1 because center is index 0
        const nb = nodes[b + 1] || nodes[0];
        const nodeA = a === -1 ? nodes[0] : nodes[a + 1];
        const nodeB = b === -1 ? nodes[0] : nodes[b + 1];

        const distA = Math.hypot(mouseRef.current.x - nodeA.x, mouseRef.current.y - nodeA.y);
        const distB = Math.hypot(mouseRef.current.x - nodeB.x, mouseRef.current.y - nodeB.y);
        const prox = Math.max(0, 1 - Math.min(distA, distB) / 180);

        const grad = ctx.createLinearGradient(nodeA.x, nodeA.y, nodeB.x, nodeB.y);
        grad.addColorStop(0, `rgba(201,122,61,${0.04 + prox * 0.12})`);
        grad.addColorStop(0.5, `rgba(201,122,61,${0.06 + prox * 0.16})`);
        grad.addColorStop(1, `rgba(201,122,61,${0.04 + prox * 0.12})`);

        ctx.beginPath();
        ctx.moveTo(nodeA.x, nodeA.y);
        ctx.lineTo(nodeB.x, nodeB.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 0.5 + prox * 0.8;
        ctx.stroke();
      });

      // Draw nodes
      nodes.forEach((node, i) => {
        const dist = Math.hypot(mouseRef.current.x - node.x, mouseRef.current.y - node.y);
        const prox = Math.max(0, 1 - dist / 120);
        const isHovered = prox > 0.3;
        drawNode(node, 0.6 + prox * 0.4, isHovered);
      });

      // Mouse proximity glow
      const mg = ctx.createRadialGradient(
        mouseRef.current.x, mouseRef.current.y, 0,
        mouseRef.current.x, mouseRef.current.y, 200
      );
      mg.addColorStop(0, 'rgba(201,122,61,0.04)');
      mg.addColorStop(1, 'rgba(201,122,61,0)');
      ctx.beginPath();
      ctx.arc(mouseRef.current.x, mouseRef.current.y, 200, 0, Math.PI * 2);
      ctx.fillStyle = mg;
      ctx.fill();

      raf = requestAnimationFrame(draw);
    }

    const obs = new IntersectionObserver(([e]) => {
      isVisible = e.isIntersecting;
      if (isVisible && !raf) raf = requestAnimationFrame(draw);
      else if (!isVisible && raf) { cancelAnimationFrame(raf); raf = 0; }
    }, { threshold: 0.05 });
    obs.observe(section);
    raf = requestAnimationFrame(draw);

    return () => {
      isVisible = false;
      cancelAnimationFrame(raf);
      obs.disconnect();
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen min-h-dvh w-full overflow-hidden bg-[#1B1F24] flex items-center"
    >
      {/* Canvas — full bleed background */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0 pointer-events-none" />

      {/* Deep atmospheric layers */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[55vw] h-[70vh] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(201,122,61,0.025) 0%, transparent 65%)' }} />
        <div className="absolute bottom-[-15%] left-[-10%] w-[50vw] h-[60vh] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(37,43,51,0.8) 0%, transparent 70%)' }} />
        {/* Horizontal rule — editorial grid line */}
        <div className="absolute bottom-[18%] left-0 right-0 h-[1px]"
          style={{ background: 'linear-gradient(to right, transparent, rgba(201,122,61,0.06) 30%, rgba(201,122,61,0.06) 70%, transparent)' }} />
      </div>

      {/* Side label — vertical typography */}
      <div className="h-side-label absolute left-5 md:left-8 top-1/2 -translate-y-1/2 z-10 hidden lg:flex flex-col items-center gap-4 opacity-0">
        <div className="w-[1px] h-16 bg-gradient-to-b from-transparent to-[#C97A3D]/30" />
        <span className="font-mono text-[8px] tracking-[0.35em] text-[#C97A3D]/40 uppercase"
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
          Nine Dimensions
        </span>
        <div className="w-[1px] h-16 bg-gradient-to-t from-transparent to-[#C97A3D]/30" />
      </div>

      {/* Main content — left-anchored editorial */}
      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20 xl:px-28 pt-28 pb-20 md:pt-32 md:pb-24">

        {/* Eyebrow */}
        <div className="h-eyebrow flex items-center gap-4 mb-10 opacity-0">
          <div className="w-8 h-[1px] bg-[#C97A3D]/50" />
          <span className="font-mono text-[9px] tracking-[0.4em] text-[#C97A3D]/70 uppercase">
            Creative Agency System — Est. 2024
          </span>
        </div>

        {/* Headline — large editorial, intentional line breaks */}
        <h1 className="font-heading text-[#F4F1EB] leading-[1.02] tracking-[-0.02em] mb-12 select-none max-w-[820px]">
          <div className="overflow-hidden mb-1">
            <span className="h-line block"
              style={{ fontSize: 'clamp(2.6rem, 7.5vw, 7.2rem)' }}>
              Building Brands
            </span>
          </div>
          <div className="overflow-hidden mb-1">
            <span className="h-line block"
              style={{ fontSize: 'clamp(2.6rem, 7.5vw, 7.2rem)' }}>
              That Occupy
            </span>
          </div>
          <div className="overflow-hidden">
            <span className="h-line block font-light italic text-[#C97A3D]"
              style={{ fontSize: 'clamp(2.6rem, 7.5vw, 7.2rem)' }}>
              Nine Dimensions.
            </span>
          </div>
        </h1>

        {/* Sub-row: descriptor + CTAs */}
        <div className="flex flex-col sm:flex-row sm:items-end gap-8 sm:gap-14 lg:gap-20">

          <div className="h-sub opacity-0 max-w-[360px]">
            <p className="font-body text-[13px] leading-[1.8] text-[#C4C8CF]/65">
              Nine creative disciplines — identity, design, motion, copy, UI/UX, and engineering — unified into one growth architecture.
            </p>
            {/* Dimension count indicator */}
            <div className="flex items-center gap-3 mt-5">
              {[...Array(9)].map((_, i) => (
                <div key={i}
                  className="w-1 h-1 rounded-full transition-all duration-300"
                  style={{ background: i < 3 ? '#C97A3D' : 'rgba(201,122,61,0.2)' }} />
              ))}
              <span className="font-mono text-[8px] text-[#C97A3D]/50 tracking-widest ml-1">9 / 9</span>
            </div>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <a href="#philosophy"
              className="h-cta group relative overflow-hidden inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#C97A3D] text-[#1B1F24] font-subheading text-[10px] font-bold tracking-[0.12em] uppercase opacity-0 transition-all duration-500 hover:bg-[#E0A96D]"
              style={{ clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))' }}>
              <span>Explore System</span>
              <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" viewBox="0 0 12 12" fill="none">
                <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>

            <a href="mailto:connect@nayagrowth.com"
              className="h-cta inline-flex items-center gap-2 px-6 py-3.5 border border-white/[0.1] hover:border-[#C97A3D]/40 text-[#C4C8CF] hover:text-[#F4F1EB] font-subheading text-[10px] font-bold tracking-[0.12em] uppercase opacity-0 transition-all duration-500">
              Start Project
            </a>
          </div>
        </div>

        {/* Bottom row — metrics strip */}
        <div className="h-sub opacity-0 mt-16 md:mt-20 pt-8 border-t border-white/[0.05] grid grid-cols-3 gap-6 max-w-[560px]">
          {[
            { val: '9', label: 'Dimensions' },
            { val: '14', label: 'Day Sprint' },
            { val: '100%', label: 'Bespoke' },
          ].map((m) => (
            <div key={m.label} className="flex flex-col gap-1">
              <span className="font-heading text-2xl md:text-3xl text-[#C97A3D] leading-none">{m.val}</span>
              <span className="font-mono text-[8px] tracking-[0.25em] text-[#C4C8CF]/40 uppercase">{m.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <div className="h-scroll-hint absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-0">
        <span className="font-mono text-[7px] tracking-[0.4em] text-[#C4C8CF]/30 uppercase">Scroll</span>
        <div className="w-[1px] h-10 overflow-hidden">
          <div className="w-full h-full bg-gradient-to-b from-[#C97A3D]/40 to-transparent"
            style={{ animation: 'scrollPulse 2s ease-in-out infinite' }} />
        </div>
      </div>

      <style>{`
        @keyframes scrollPulse {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
      `}</style>
    </section>
  );
}
