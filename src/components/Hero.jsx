import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticButton from './MagneticButton';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const mouseRef = useRef({ x: -999, y: -999, tx: -999, ty: -999 });
  const [isLoaded, setIsLoaded] = useState(false);

  // ── Entry animations ──
  useEffect(() => {
    const tl = gsap.timeline({ delay: 2.9 });

    tl.fromTo('.h-eyebrow',
      { opacity: 0, y: 20, x: -15 },
      { opacity: 1, y: 0, x: 0, duration: 1.0, ease: 'power3.out' }
    );
    tl.fromTo('.h-line',
      { y: '120%', skewY: 5, opacity: 0, filter: 'blur(15px)', scale: 1.12 },
      { y: '0%', skewY: 0, opacity: 1, filter: 'blur(0px)', scale: 1, duration: 1.8, ease: 'power4.out', stagger: 0.12 },
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
    let w = canvas.offsetWidth;
    let h = canvas.offsetHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let ripples = [];
    const particles = [];

    const resize = () => {
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Re-initialize particles on resize to fill screen
      particles.length = 0;
      for (let i = 0; i < 45; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.18,
          vy: (Math.random() - 0.5) * 0.18,
          size: Math.random() * 1.6 + 0.4,
          alpha: Math.random() * 0.35 + 0.1,
          parallax: Math.random() * 0.04 + 0.015
        });
      }
    };
    resize();
    window.addEventListener('resize', resize);

    const onMove = (e) => {
      const r = canvas.getBoundingClientRect();
      mouseRef.current.tx = e.clientX - r.left;
      mouseRef.current.ty = e.clientY - r.top;

      // Parallax rotation & translation for perspective grid
      const percentX = (e.clientX / window.innerWidth - 0.5) * 2;
      const percentY = (e.clientY / window.innerHeight - 0.5) * 2;
      gsap.to('.hero-grid', {
        x: percentX * 25,
        y: percentY * 15,
        rotationY: percentX * 5,
        rotationX: 65 + percentY * 4,
        duration: 1.5,
        ease: 'power2.out',
        overwrite: 'auto'
      });
    };
    window.addEventListener('mousemove', onMove, { passive: true });

    const onClick = (e) => {
      const r = canvas.getBoundingClientRect();
      const rx = e.clientX - r.left;
      const ry = e.clientY - r.top;
      ripples.push({
        x: rx,
        y: ry,
        radius: 0,
        maxRadius: Math.max(w, h) * 0.45,
        speed: 7,
        opacity: 0.95
      });
    };
    window.addEventListener('click', onClick, { passive: true });

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

    function getNodes(time, scrollPercent) {
      const cx = w < 768 ? w * 0.5 : w * 0.62;
      const cy = h * 0.5;
      const R1 = Math.min(w, h) * (w < 768 ? 0.20 : 0.24) * (1 + scrollPercent * 0.35); // inner ring
      const R2 = Math.min(w, h) * (w < 768 ? 0.36 : 0.40) * (1 + scrollPercent * 0.35); // outer ring

      const nodes = [];

      // Center node (dimension 0 — the core)
      const centerPulse = Math.sin(time * 0.001) * 4;
      nodes.push({
        x: cx + Math.sin(time * 0.0003) * 3 + centerPulse,
        y: cy + Math.cos(time * 0.0004) * 3 + centerPulse,
        size: 20 + centerPulse * 0.3, label: '9D', isCenter: true, idx: -1
      });

      // Inner ring — 4 nodes (scroll-rotate morph)
      for (let i = 0; i < 4; i++) {
        const a = (i / 4) * Math.PI * 2 + time * 0.0005 + Math.PI / 4 + scrollPercent * Math.PI * 0.45;
        const wobble = Math.sin(time * 0.0025 + i * 1.7) * 8;
        const baseX = cx + (R1 + wobble) * Math.cos(a);
        const baseY = cy + (R1 + wobble) * Math.sin(a);
        
        // Calculate magnetic pull towards cursor if mouse is within 220px
        const distToMouse = Math.hypot(mouseRef.current.x - baseX, mouseRef.current.y - baseY);
        let pullX = 0;
        let pullY = 0;
        if (mouseRef.current.x > -100 && distToMouse < 220) {
          const force = (1 - distToMouse / 220) * 32;
          const angleToMouse = Math.atan2(mouseRef.current.y - baseY, mouseRef.current.x - baseX);
          pullX = Math.cos(angleToMouse) * force;
          pullY = Math.sin(angleToMouse) * force;
        }

        nodes.push({
          x: baseX + pullX,
          y: baseY + pullY,
          size: 14, label: nodeLabels[i], name: dimensionNames[i], idx: i
        });
      }

      // Outer ring — 5 nodes (counter-rotate + scroll rotation morph)
      for (let i = 0; i < 5; i++) {
        const a = (i / 5) * Math.PI * 2 - time * 0.0003 + Math.PI / 5 - scrollPercent * Math.PI * 0.45;
        const wobble = Math.sin(time * 0.0018 + i * 2.3) * 10;
        const baseX = cx + (R2 + wobble) * Math.cos(a);
        const baseY = cy + (R2 + wobble) * Math.sin(a);
        
        const distToMouse = Math.hypot(mouseRef.current.x - baseX, mouseRef.current.y - baseY);
        let pullX = 0;
        let pullY = 0;
        if (mouseRef.current.x > -100 && distToMouse < 220) {
          const force = (1 - distToMouse / 220) * 24;
          const angleToMouse = Math.atan2(mouseRef.current.y - baseY, mouseRef.current.x - baseX);
          pullX = Math.cos(angleToMouse) * force;
          pullY = Math.sin(angleToMouse) * force;
        }

        nodes.push({
          x: baseX + pullX,
          y: baseY + pullY,
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

      // Update and draw floating particles (background depth)
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        // Apply slight mouse parallax
        const px = p.x + (mouseRef.current.x - w / 2) * p.parallax;
        const py = p.y + (mouseRef.current.y - h / 2) * p.parallax;

        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201,122,61,${p.alpha})`;
        ctx.fill();
      });

      // Update ripples
      ripples.forEach(rip => {
        rip.radius += rip.speed;
        rip.opacity -= 0.015;
      });
      ripples = ripples.filter(rip => rip.opacity > 0 && rip.radius < rip.maxRadius);

      // Get base nodes with scroll-aware evolution
      const scrollPercent = Math.min(1, window.scrollY / (window.innerHeight || 800));
      const baseNodes = getNodes(timestamp, scrollPercent);

      // Apply ripple force displacement to nodes
      const nodes = baseNodes.map(node => {
        let dx = 0;
        let dy = 0;
        ripples.forEach(rip => {
          const dist = Math.hypot(node.x - rip.x, node.y - rip.y);
          const waveDist = Math.abs(dist - rip.radius);
          if (waveDist < 80) {
            const force = (1 - waveDist / 80) * rip.opacity * 40;
            const angle = Math.atan2(node.y - rip.y, node.x - rip.x);
            dx += Math.cos(angle) * force;
            dy += Math.sin(angle) * force;
          }
        });
        return { ...node, x: node.x + dx, y: node.y + dy };
      });

      // Draw orbit paths (scaled by scroll evolution)
      const cx = w < 768 ? w * 0.5 : w * 0.64;
      const cy = h * 0.5;
      const R1 = Math.min(w, h) * (w < 768 ? 0.22 : 0.26) * (1 + scrollPercent * 0.35);
      const R2 = Math.min(w, h) * (w < 768 ? 0.38 : 0.42) * (1 + scrollPercent * 0.35);

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

      // Draw connections from mouse cursor to 3 nearest nodes (Signature Interaction)
      if (mouseRef.current.x > -100 && mouseRef.current.y > -100) {
        const sortedNodes = [...nodes]
          .map((n, idx) => ({ node: n, dist: Math.hypot(mouseRef.current.x - n.x, mouseRef.current.y - n.y), idx }))
          .sort((a, b) => a.dist - b.dist);

        const nearestCount = Math.min(3, sortedNodes.length);
        for (let i = 0; i < nearestCount; i++) {
          const { node, dist } = sortedNodes[i];
          if (dist < 320) {
            const alpha = (1 - dist / 320) * 0.25;
            ctx.beginPath();
            ctx.moveTo(mouseRef.current.x, mouseRef.current.y);
            ctx.lineTo(node.x, node.y);
            ctx.strokeStyle = `rgba(201,122,61,${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.setLineDash([2, 3]);
            ctx.stroke();
            ctx.setLineDash([]);
          }
        }
      }

      // Draw ripples
      ripples.forEach(rip => {
        ctx.beginPath();
        ctx.arc(rip.x, rip.y, rip.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(201,122,61,${rip.opacity * 0.3})`;
        ctx.lineWidth = 1.0;
        ctx.stroke();
      });

      // Draw nodes
      nodes.forEach((node) => {
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
      window.removeEventListener('click', onClick);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen min-h-dvh w-full overflow-hidden bg-[#050505] flex items-center"
    >

      {/* Deep atmospheric layers */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-15%] right-[-10%] w-[60vw] h-[75vh] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(201,122,61,0.035) 0%, transparent 65%)' }} />
        <div className="absolute bottom-[-20%] left-[-15%] w-[55vw] h-[65vh] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(37,43,51,0.9) 0%, transparent 70%)' }} />
        <div className="absolute top-[30%] left-[10%] w-[30vw] h-[40vh] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(201,122,61,0.015) 0%, transparent 60%)' }} />
        {/* Parallax 3D Perspective Grid */}
        <div className="hero-grid absolute inset-0 opacity-[0.09]"
          style={{
            backgroundImage: 'linear-gradient(rgba(201, 122, 61, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(201, 122, 61, 0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
            transform: 'perspective(1000px) rotateX(65deg) translateY(-20%) translateZ(-100px)',
            transformOrigin: '50% 0%',
          }} />
        {/* Horizontal rule — editorial grid line */}
        <div className="absolute bottom-[20%] left-0 right-0 h-[1px]"
          style={{ background: 'linear-gradient(to right, transparent, rgba(201,122,61,0.08) 25%, rgba(201,122,61,0.08) 75%, transparent)' }} />
      </div>

      {/* Dynamic Constellation Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 pointer-events-none w-full h-full"
      />


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
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <MagneticButton
              href="#philosophy"
              variant="custom"
              className="h-cta group relative overflow-hidden inline-flex items-center gap-3 px-7 py-3 bg-[#C97A3D] text-[#050505] font-subheading text-[11px] font-bold tracking-[0.14em] uppercase opacity-0 transition-all duration-500 hover:bg-[#E0A96D] hover:shadow-lg hover:shadow-[#C97A3D]/20"
              magnetStrength={0.2}
            >
              <span>Explore System</span>
              <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" viewBox="0 0 12 12" fill="none">
                <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </MagneticButton>

            <MagneticButton
              href="mailto:connect@nayagrowth.com"
              variant="custom"
              cursorType="connect"
              className="h-cta inline-flex items-center gap-2.5 px-7 py-3 border border-white/[0.12] hover:border-[#C97A3D]/50 text-[#C4C8CF] hover:text-[#F4F1EB] font-subheading text-[11px] font-bold tracking-[0.14em] uppercase opacity-0 transition-all duration-500 hover:bg-white/[0.02]"
              magnetStrength={0.2}
            >
              Start Project
            </MagneticButton>
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
