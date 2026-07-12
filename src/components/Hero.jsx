import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const mouseRef = useRef({ x: -999, y: -999, tx: -999, ty: -999 });
  const [hoveredNode, setHoveredNode] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // ── Entry animations ──
  useEffect(() => {
    const tl = gsap.timeline({ delay: 2.9 });

    tl.fromTo('.h-eyebrow',
      { opacity: 0, y: 20, x: -15 },
      { opacity: 1, y: 0, x: 0, duration: 1.0, ease: 'power3.out' }
    );
    tl.fromTo('.h-line',
      { y: '120%', skewY: 3 },
      { y: '0%', skewY: 0, duration: 1.6, ease: 'power4.out', stagger: 0.09 },
      0.15
    );
    tl.fromTo('.h-sub',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' },
      0.7
    );
    tl.fromTo('.h-cta',
      { opacity: 0, y: 20, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: 'power3.out', stagger: 0.12 },
      0.85
    );
    tl.fromTo('.h-metrics',
      { opacity: 0, y: 25 },
      { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out' },
      1.0
    );
    tl.fromTo('.h-scroll-hint',
      { opacity: 0 },
      { opacity: 1, duration: 1.2, ease: 'power2.out' },
      1.5
    );
    tl.fromTo('.h-side-label',
      { opacity: 0, x: -15 },
      { opacity: 1, x: 0, duration: 1.0, ease: 'power3.out' },
      1.1
    );
    
    setIsLoaded(true);
  }, []);

  // ── Parallax scroll effect ──
  useEffect(() => {
    if (!isLoaded) return;
    
    const ctx = gsap.context(() => {
      gsap.to(contentRef.current, {
        y: -150,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, [isLoaded]);

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
    // Center + inner ring (4) + outer ring (5)
    const nodeLabels = ['01','02','03','04','05','06','07','08','09'];
    const dimensionNames = ['Strategy', 'Design', 'Content', 'Social', 'Ads', 'Motion', 'Photo', 'UI/UX', 'Web'];
    let t = 0;
    let activeConnections = new Set();

    // Connection map: which nodes connect to which
    const connections = [
      [0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7],[0,8], // center to all
      [1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,1], // outer ring
      [1,4],[2,5],[3,6],[4,7],[5,8],[6,1],[7,2],[8,3], // cross connections
      [1,3],[2,4],[3,5],[4,6],[5,7],[6,8],[7,1],[8,2], // additional complexity
    ];

    function getNodes(time) {
      const cx = w < 768 ? w * 0.5 : w * 0.62;
      const cy = h * 0.5;
      const R1 = Math.min(w, h) * (w < 768 ? 0.20 : 0.24); // inner ring
      const R2 = Math.min(w, h) * (w < 768 ? 0.36 : 0.40); // outer ring

      const nodes = [];

      // Center node (dimension 0 — the core)
      const centerPulse = Math.sin(time * 0.001) * 4;
      nodes.push({
        x: cx + Math.sin(time * 0.0003) * 3 + centerPulse,
        y: cy + Math.cos(time * 0.0004) * 3 + centerPulse,
        size: 20 + centerPulse * 0.3, label: '9D', isCenter: true, idx: -1
      });

      // Inner ring — 4 nodes
      for (let i = 0; i < 4; i++) {
        const a = (i / 4) * Math.PI * 2 + time * 0.0005 + Math.PI / 4;
        const wobble = Math.sin(time * 0.0025 + i * 1.7) * 8;
        const mouseInfluence = Math.max(0, 1 - Math.hypot(mouseRef.current.x - (cx + (R1 + wobble) * Math.cos(a)), mouseRef.current.y - (cy + (R1 + wobble) * Math.sin(a))) / 200) * 15;
        nodes.push({
          x: cx + (R1 + wobble + mouseInfluence) * Math.cos(a),
          y: cy + (R1 + wobble + mouseInfluence) * Math.sin(a),
          size: 14, label: nodeLabels[i], name: dimensionNames[i], idx: i
        });
      }

      // Outer ring — 5 nodes (counter-rotate)
      for (let i = 0; i < 5; i++) {
        const a = (i / 5) * Math.PI * 2 - time * 0.0003 + Math.PI / 5;
        const wobble = Math.sin(time * 0.0018 + i * 2.3) * 10;
        const mouseInfluence = Math.max(0, 1 - Math.hypot(mouseRef.current.x - (cx + (R2 + wobble) * Math.cos(a)), mouseRef.current.y - (cy + (R2 + wobble) * Math.sin(a))) / 200) * 12;
        nodes.push({
          x: cx + (R2 + wobble + mouseInfluence) * Math.cos(a),
          y: cy + (R2 + wobble + mouseInfluence) * Math.sin(a),
          size: 12, label: nodeLabels[i + 4], name: dimensionNames[i + 4], idx: i + 4
        });
      }

      return nodes;
    }

    function drawNode(node, alpha, isHovered) {
      const { x, y, size, label, isCenter, name } = node;
      const s = isHovered ? size * 1.45 : size;
      const pulse = Math.sin(t * 0.003 + node.idx) * 0.1 + 1;

      // Outer glow - layered
      const grd = ctx.createRadialGradient(x, y, 0, x, y, s * 3.2 * pulse);
      grd.addColorStop(0, `rgba(201,122,61,${alpha * (isHovered ? 0.22 : 0.10)})`);
      grd.addColorStop(0.5, `rgba(201,122,61,${alpha * (isHovered ? 0.12 : 0.05)})`);
      grd.addColorStop(1, 'rgba(201,122,61,0)');
      ctx.beginPath();
      ctx.arc(x, y, s * 3.2 * pulse, 0, Math.PI * 2);
      ctx.fillStyle = grd;
      ctx.fill();

      // Outer ring with dash
      ctx.beginPath();
      ctx.arc(x, y, s * 1.1, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(201,122,61,${alpha * (isHovered ? 0.95 : 0.55)})`;
      ctx.lineWidth = isCenter ? 1.8 : 1.4;
      if (!isCenter) {
        ctx.setLineDash([4, 8]);
      }
      ctx.stroke();
      ctx.setLineDash([]);

      // Inner ring
      ctx.beginPath();
      ctx.arc(x, y, s * 0.7, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(201,122,61,${alpha * (isHovered ? 0.7 : 0.35)})`;
      ctx.lineWidth = 1.0;
      ctx.stroke();

      // Core dot with glow
      const coreGrd = ctx.createRadialGradient(x, y, 0, x, y, s * 0.4);
      coreGrd.addColorStop(0, `rgba(224,169,109,${alpha * (isHovered ? 1 : 0.85)})`);
      coreGrd.addColorStop(1, `rgba(201,122,61,${alpha * (isHovered ? 0.6 : 0.4)})`);
      ctx.beginPath();
      ctx.arc(x, y, s * 0.4, 0, Math.PI * 2);
      ctx.fillStyle = coreGrd;
      ctx.fill();

      // Label
      if (!isCenter) {
        ctx.font = `bold ${Math.round(s * 0.5)}px "Space Mono", monospace`;
        ctx.fillStyle = `rgba(201,122,61,${alpha * (isHovered ? 0.95 : 0.55)})`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(label, x, y - s * 0.6);
        
        // Dimension name on hover
        if (isHovered && name) {
          ctx.font = `${Math.round(s * 0.35)}px "Plus Jakarta Sans", sans-serif`;
          ctx.fillStyle = `rgba(244,241,235,${alpha * 0.8})`;
          ctx.fillText(name, x, y + s * 0.8);
        }
      } else {
        ctx.font = `bold ${Math.round(s * 0.55)}px "Plus Jakarta Sans", sans-serif`;
        ctx.fillStyle = `rgba(244,241,235,${alpha * 0.95})`;
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

      // Draw connections with dynamic activation
      connections.forEach(([a, b], connIdx) => {
        const nodeA = a === -1 ? nodes[0] : nodes[a + 1];
        const nodeB = b === -1 ? nodes[0] : nodes[b + 1];

        const distA = Math.hypot(mouseRef.current.x - nodeA.x, mouseRef.current.y - nodeA.y);
        const distB = Math.hypot(mouseRef.current.x - nodeB.x, mouseRef.current.y - nodeB.y);
        const prox = Math.max(0, 1 - Math.min(distA, distB) / 200);
        
        // Activate connections based on mouse proximity
        const isActive = prox > 0.3;
        if (isActive) {
          activeConnections.add(connIdx);
        } else if (activeConnections.size > 5 && Math.random() > 0.98) {
          activeConnections.delete(connIdx);
        }
        const isConnActive = activeConnections.has(connIdx);

        const baseAlpha = isConnActive ? 0.12 : 0.04;
        const grad = ctx.createLinearGradient(nodeA.x, nodeA.y, nodeB.x, nodeB.y);
        grad.addColorStop(0, `rgba(201,122,61,${baseAlpha + prox * 0.15})`);
        grad.addColorStop(0.5, `rgba(201,122,61,${baseAlpha + 0.03 + prox * 0.18})`);
        grad.addColorStop(1, `rgba(201,122,61,${baseAlpha + prox * 0.15})`);

        ctx.beginPath();
        ctx.moveTo(nodeA.x, nodeA.y);
        ctx.lineTo(nodeB.x, nodeB.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = isConnActive ? 1.2 + prox * 0.6 : 0.4 + prox * 0.5;
        if (isConnActive) {
          ctx.setLineDash([2, 4]);
        }
        ctx.stroke();
        ctx.setLineDash([]);
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

      {/* Deep atmospheric layers */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-15%] right-[-10%] w-[60vw] h-[75vh] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(201,122,61,0.035) 0%, transparent 65%)' }} />
        <div className="absolute bottom-[-20%] left-[-15%] w-[55vw] h-[65vh] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(37,43,51,0.9) 0%, transparent 70%)' }} />
        <div className="absolute top-[30%] left-[10%] w-[30vw] h-[40vh] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(201,122,61,0.015) 0%, transparent 60%)' }} />
        {/* Horizontal rule — editorial grid line */}
        <div className="absolute bottom-[20%] left-0 right-0 h-[1px]"
          style={{ background: 'linear-gradient(to right, transparent, rgba(201,122,61,0.08) 25%, rgba(201,122,61,0.08) 75%, transparent)' }} />
      </div>


      {/* Main content — left-anchored editorial */}
      <div ref={contentRef} className="relative z-10 w-full max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20 xl:px-28 pt-16 pb-12 md:pt-20 md:pb-16">


        {/* Headline — large editorial, intentional line breaks */}
        <h1 className="font-heading text-[#F4F1EB] leading-[1.0] tracking-[-0.03em] mb-8 select-none max-w-[900px]">
          <div className="overflow-hidden mb-1">
            <span className="h-line block"
              style={{ fontSize: 'clamp(2.5rem, 7vw, 6.5rem)' }}>
              Building Brands
            </span>
          </div>
          <div className="overflow-hidden mb-1">
            <span className="h-line block"
              style={{ fontSize: 'clamp(2.5rem, 7vw, 6.5rem)' }}>
              That Occupy
            </span>
          </div>
          <div className="overflow-hidden">
            <span className="h-line block font-light italic text-[#C97A3D]"
              style={{ fontSize: 'clamp(2.5rem, 7vw, 6.5rem)' }}>
              Nine Dimensions.
            </span>
          </div>
        </h1>

        {/* Sub-row: descriptor + CTAs */}
        <div className="flex flex-col sm:flex-row sm:items-end gap-8 sm:gap-12 lg:gap-16">

          <div className="h-sub opacity-0 max-w-[380px]">
            <p className="font-body text-[13px] leading-[1.65] text-[#C4C8CF]/70">
              Nine creative disciplines — identity, design, motion, copy, UI/UX, and engineering — unified into one growth architecture.
            </p>
            {/* Dimension count indicator */}
            <div className="flex items-center gap-3 mt-4">
              {[...Array(9)].map((_, i) => (
                <div key={i}
                  className="w-1.5 h-1.5 rounded-full transition-all duration-500"
                  style={{ 
                    background: i < 3 ? '#C97A3D' : 'rgba(201,122,61,0.2)',
                    transform: i < 3 ? 'scale(1.2)' : 'scale(1)'
                  }} />
              ))}
              <span className="font-mono text-[9px] text-[#C97A3D]/60 tracking-widest ml-2">9 / 9</span>
            </div>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <a href="#philosophy"
              className="h-cta group relative overflow-hidden inline-flex items-center gap-3 px-7 py-3 bg-[#C97A3D] text-[#1B1F24] font-subheading text-[11px] font-bold tracking-[0.14em] uppercase opacity-0 transition-all duration-500 hover:bg-[#E0A96D] hover:shadow-lg hover:shadow-[#C97A3D]/20"
              style={{ clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))' }}>
              <span>Explore System</span>
              <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" viewBox="0 0 12 12" fill="none">
                <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>

            <a href="mailto:connect@nayagrowth.com"
              className="h-cta inline-flex items-center gap-2.5 px-7 py-3 border border-white/[0.12] hover:border-[#C97A3D]/50 text-[#C4C8CF] hover:text-[#F4F1EB] font-subheading text-[11px] font-bold tracking-[0.14em] uppercase opacity-0 transition-all duration-500 hover:bg-white/[0.02]">
              Start Project
            </a>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="h-scroll-hint absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-0">
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
