import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticButton from './MagneticButton';

gsap.registerPlugin(ScrollTrigger);

const DIMENSIONS = [
  { num: '01', name: 'Strategy', desc: 'Growth blueprints, market positioning, and architectural planning.' },
  { num: '02', name: 'Identity', desc: 'Bespoke brand marks, modular assets, and system guidelines.' },
  { num: '03', name: 'Design', desc: 'High-fidelity visual expressions, layouts, and art direction.' },
  { num: '04', name: 'Motion', desc: 'Cinematic choreography, 3D rendering, and responsive transitions.' },
  { num: '05', name: 'Engineering', desc: 'Handcrafted frontends, micro-interactions, and robust code architectures.' },
  { num: '06', name: 'AI Integration', desc: 'Cognitive neural layers, generative pipelines, and workflow automations.' },
  { num: '07', name: 'UI/UX Design', desc: 'Immersive human systems, interactive design patterns, and friction-free flows.' },
  { num: '08', name: 'Brand Story', desc: 'Editorial narratives, copy systems, and concept architecture.' },
  { num: '09', name: 'Growth System', desc: 'Conversion optimization layers, analytical pipelines, and scaling frameworks.' }
];

export default function Hero() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const mouseRef = useRef({ x: -999, y: -999, tx: -999, ty: -999 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredDimension, setHoveredDimension] = useState(null);
  const hoveredDimensionRef = useRef(null);

  // Sync state to ref for access in requestAnimationFrame loop
  useEffect(() => {
    hoveredDimensionRef.current = hoveredDimension;
  }, [hoveredDimension]);

  // ── Entry animations ──
  useEffect(() => {
    const tl = gsap.timeline({ delay: 2.9 });

    tl.fromTo('.h-line',
      { y: '105%', opacity: 0 },
      { y: '0%', opacity: 1, duration: 1.6, ease: 'power4.out', stagger: 0.12 }
    );

    tl.fromTo('.h-sub',
      { opacity: 0, y: 30, filter: 'blur(8px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, ease: 'power3.out', stagger: 0.15 },
      '-=1.0'
    );

    tl.fromTo('.h-cta',
      { opacity: 0, y: 25, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 1.0, ease: 'power3.out', stagger: 0.15 },
      '-=0.8'
    );
    
    setIsLoaded(true);
  }, []);

  // ── Enhanced parallax scroll effect with depth ──
  useEffect(() => {
    if (!isLoaded) return;
    
    const ctx = gsap.context(() => {
      // Parallax text content slide-up
      gsap.to(contentRef.current, {
        y: -120,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });
      
      // Subtle scale effect on scroll for depth
      gsap.to(canvasRef.current, {
        scale: 1.08,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true
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
          vx: (Math.random() - 0.5) * 0.14,
          vy: (Math.random() - 0.5) * 0.14,
          size: Math.random() * 1.5 + 0.4,
          alpha: Math.random() * 0.25 + 0.08,
          parallax: Math.random() * 0.03 + 0.012
        });
      }
    };
    resize();
    window.addEventListener('resize', resize);

    // Compute node coordinates based on layout width
    function getNodes(time, scrollPercent) {
      // Constellation centered around the right side on desktop, center on mobile
      const cx = w < 1024 ? w * 0.5 : w * 0.70;
      const cy = h * 0.5;
      
      const R1 = Math.min(w, h) * (w < 768 ? 0.20 : 0.26) * (1 + scrollPercent * 0.15); // inner ring
      const R2 = Math.min(w, h) * (w < 768 ? 0.36 : 0.43) * (1 + scrollPercent * 0.15); // outer ring

      const nodes = [];

      // Center node (the core 9D) - Prominent but not overpowering
      const centerPulse = Math.sin(time * 0.001) * 3;
      nodes.push({
        x: cx + Math.sin(time * 0.0003) * 2 + centerPulse,
        y: cy + Math.cos(time * 0.0004) * 2 + centerPulse,
        size: 28 + centerPulse * 0.2, label: '9D', isCenter: true, idx: -1
      });

      // Inner ring — 4 nodes
      const nodeLabels = ['01','02','03','04','05','06','07','08','09'];
      for (let i = 0; i < 4; i++) {
        const a = (i / 4) * Math.PI * 2 + time * 0.0003 + Math.PI / 4 + scrollPercent * Math.PI * 0.15;
        const wobble = Math.sin(time * 0.0015 + i * 1.7) * 7;
        const baseX = cx + (R1 + wobble) * Math.cos(a);
        const baseY = cy + (R1 + wobble) * Math.sin(a);
        
        // Calculate magnetic pull towards cursor if mouse is within 240px
        const distToMouse = Math.hypot(mouseRef.current.x - baseX, mouseRef.current.y - baseY);
        let pullX = 0;
        let pullY = 0;
        if (mouseRef.current.x > -100 && distToMouse < 240) {
          const force = (1 - distToMouse / 240) * 32;
          const angleToMouse = Math.atan2(mouseRef.current.y - baseY, mouseRef.current.x - baseX);
          pullX = Math.cos(angleToMouse) * force;
          pullY = Math.sin(angleToMouse) * force;
        }

        nodes.push({
          x: baseX + pullX,
          y: baseY + pullY,
          size: 14, label: nodeLabels[i], name: DIMENSIONS[i].name, idx: i
        });
      }

      // Outer ring — 5 nodes
      for (let i = 0; i < 5; i++) {
        const a = (i / 5) * Math.PI * 2 - time * 0.00015 + Math.PI / 5 - scrollPercent * Math.PI * 0.15;
        const wobble = Math.sin(time * 0.0012 + i * 2.3) * 9;
        const baseX = cx + (R2 + wobble) * Math.cos(a);
        const baseY = cy + (R2 + wobble) * Math.sin(a);
        
        const distToMouse = Math.hypot(mouseRef.current.x - baseX, mouseRef.current.y - baseY);
        let pullX = 0;
        let pullY = 0;
        if (mouseRef.current.x > -100 && distToMouse < 240) {
          const force = (1 - distToMouse / 240) * 24;
          const angleToMouse = Math.atan2(mouseRef.current.y - baseY, mouseRef.current.x - baseX);
          pullX = Math.cos(angleToMouse) * force;
          pullY = Math.sin(angleToMouse) * force;
        }

        nodes.push({
          x: baseX + pullX,
          y: baseY + pullY,
          size: 12, label: nodeLabels[i + 4], name: DIMENSIONS[i + 4].name, idx: i + 4
        });
      }

      return nodes;
    }

    const onMove = (e) => {
      const r = canvas.getBoundingClientRect();
      const mx = e.clientX - r.left;
      const my = e.clientY - r.top;
      mouseRef.current.tx = mx;
      mouseRef.current.ty = my;

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

      // Bi-directional hover tracking (Canvas -> List)
      const scrollPercent = Math.min(1, window.scrollY / (window.innerHeight || 800));
      const currentNodes = getNodes(performance.now(), scrollPercent);
      
      let foundHover = -1;
      for (let i = 0; i < currentNodes.length; i++) {
        const node = currentNodes[i];
        if (node.idx !== -1) {
          const dist = Math.hypot(mx - node.x, my - node.y);
          if (dist < 38) {
            foundHover = node.idx;
            break;
          }
        }
      }
      
      if (foundHover !== hoveredDimensionRef.current) {
        setHoveredDimension(foundHover === -1 ? null : foundHover);
      }
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
        speed: 8,
        opacity: 0.9
      });
    };
    window.addEventListener('click', onClick, { passive: true });

    // Connection map
    const connections = [
      [0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7],[0,8], // center to all
      [1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,1], // outer ring
      [1,4],[2,5],[3,6],[4,7],[5,8],[6,1],[7,2],[8,3], // cross connections
      [1,3],[2,4],[3,5],[4,6],[5,7],[6,8],[7,1],[8,2], // additional complexity
    ];

    function drawNode(node, alpha, isNodeActive, scaleVal = 1.0) {
      const { x, y, size, label, isCenter, name } = node;
      const s = size * scaleVal;
      const pulse = Math.sin(t * 0.0018 + node.idx * 1.5) * (isNodeActive ? 0.14 : 0.06) + 1;

      // Outer glow - layered (Center 9D glow reduced by ~15-20% to avoid overpowering)
      if (isCenter) {
        // Center node glow (softened to keep heading as primary focal point)
        const centerGrd = ctx.createRadialGradient(x, y, 0, x, y, s * 3.3 * pulse);
        centerGrd.addColorStop(0, `rgba(255, 235, 190, ${alpha * 0.62})`);
        centerGrd.addColorStop(0.35, `rgba(201, 122, 61, ${alpha * 0.38})`);
        centerGrd.addColorStop(0.7, `rgba(201, 122, 61, ${alpha * 0.12})`);
        centerGrd.addColorStop(1, 'rgba(201, 122, 61, 0)');
        ctx.beginPath();
        ctx.arc(x, y, s * 3.3 * pulse, 0, Math.PI * 2);
        ctx.fillStyle = centerGrd;
        ctx.fill();
      } else {
        const grd = ctx.createRadialGradient(x, y, 0, x, y, s * 4.6 * pulse);
        grd.addColorStop(0, `rgba(201,122,61,${alpha * (isNodeActive ? 0.65 : 0.26)})`);
        grd.addColorStop(0.5, `rgba(201,122,61,${alpha * (isNodeActive ? 0.35 : 0.12)})`);
        grd.addColorStop(1, 'rgba(201,122,61,0)');
        ctx.beginPath();
        ctx.arc(x, y, s * 4.6 * pulse, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();
      }

      // Dotted outer halos around center node
      if (isCenter) {
        ctx.beginPath();
        ctx.arc(x, y, s * 1.45, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(201,122,61,${alpha * 0.55})`;
        ctx.lineWidth = 0.95;
        ctx.setLineDash([4, 6]);
        ctx.stroke();
        ctx.setLineDash([]);
        
        ctx.beginPath();
        ctx.arc(x, y, s * 1.95, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(201,122,61,${alpha * 0.25})`;
        ctx.lineWidth = 0.65;
        ctx.stroke();
      }

      // Outer ring
      ctx.beginPath();
      ctx.arc(x, y, s * 1.15, 0, Math.PI * 2);
      ctx.strokeStyle = isNodeActive 
        ? `rgba(244,241,235,${alpha * 0.98})` 
        : `rgba(201,122,61,${alpha * 0.55})`;
      ctx.lineWidth = isCenter ? 1.95 : 0.95;
      if (!isCenter) {
        ctx.setLineDash([4, 6]);
      }
      ctx.stroke();
      ctx.setLineDash([]);

      // Inner ring
      ctx.beginPath();
      ctx.arc(x, y, s * 0.75, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(201,122,61,${alpha * (isNodeActive ? 0.88 : 0.38)})`;
      ctx.lineWidth = 0.7;
      ctx.stroke();

      // Core dot with intense glow (brightest white core for Center 9D node)
      const coreGrd = ctx.createRadialGradient(x, y, 0, x, y, s * 0.4);
      if (isCenter) {
        coreGrd.addColorStop(0, `rgba(255, 255, 255, ${alpha})`);
        coreGrd.addColorStop(0.4, `rgba(255, 215, 150, ${alpha * 0.95})`);
        coreGrd.addColorStop(1, `rgba(201, 122, 61, ${alpha * 0.7})`);
      } else {
        coreGrd.addColorStop(0, `rgba(255, 255, 255, ${alpha * (isNodeActive ? 1.0 : 0.88)})`);
        coreGrd.addColorStop(0.4, `rgba(224, 169, 109, ${alpha * (isNodeActive ? 0.92 : 0.72)})`);
        coreGrd.addColorStop(1, `rgba(201, 122, 61, ${alpha * 0.35})`);
      }
      ctx.beginPath();
      ctx.arc(x, y, s * 0.4, 0, Math.PI * 2);
      ctx.fillStyle = coreGrd;
      ctx.fill();

      // Label details
      if (!isCenter) {
        ctx.font = `bold ${Math.round(s * 0.48)}px "Space Mono", monospace`;
        ctx.fillStyle = isNodeActive 
          ? `rgba(244,241,235,${alpha * 0.98})`
          : `rgba(201,122,61,${alpha * 0.6})`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(label, x, y - s * 0.05);
        
        // Dimension label name text tag
        if (isNodeActive && name) {
          ctx.font = `bold ${Math.round(s * 0.36)}px "Plus Jakarta Sans", sans-serif`;
          ctx.fillStyle = `rgba(244,241,235,${alpha * 0.98})`;
          ctx.fillText(name, x, y + s * 0.95);
        }
      } else {
        ctx.font = `bold ${Math.round(s * 0.52)}px "Plus Jakarta Sans", sans-serif`;
        ctx.fillStyle = `rgba(244,241,235,${alpha * 0.98})`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('9D', x, y);
      }
    }

    let t = 0;
    let activeConnections = new Set();

    function draw(timestamp) {
      if (!isVisible) { raf = 0; return; }
      t = timestamp;

      ctx.clearRect(0, 0, w, h);

      // Smooth mouse coordinates lerp
      mouseRef.current.x += (mouseRef.current.tx - mouseRef.current.x) * 0.06;
      mouseRef.current.y += (mouseRef.current.ty - mouseRef.current.y) * 0.06;

      // Update and draw floating particles (background depth)
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        const px = p.x + (mouseRef.current.x - w / 2) * p.parallax;
        const py = p.y + (mouseRef.current.y - h / 2) * p.parallax;

        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201,122,61,${p.alpha})`;
        ctx.fill();
      });

      // Connect background particles with very faint lines for depth
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dist = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y);
          if (dist < 80) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(201, 122, 61, ${(1 - dist / 80) * 0.045})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Update ripples
      ripples.forEach(rip => {
        rip.radius += rip.speed;
        rip.opacity -= 0.015;
      });
      ripples = ripples.filter(rip => rip.opacity > 0 && rip.radius < rip.maxRadius);

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
            const force = (1 - waveDist / 80) * rip.opacity * 35;
            const angle = Math.atan2(node.y - rip.y, node.x - rip.x);
            dx += Math.cos(angle) * force;
            dy += Math.sin(angle) * force;
          }
        });
        return { ...node, x: node.x + dx, y: node.y + dy };
      });

      // Draw orbit rings
      const cx = w < 1024 ? w * 0.5 : w * 0.70;
      const cy = h * 0.5;
      const R1 = Math.min(w, h) * (w < 768 ? 0.20 : 0.26) * (1 + scrollPercent * 0.15);
      const R2 = Math.min(w, h) * (w < 768 ? 0.36 : 0.43) * (1 + scrollPercent * 0.15);

      [R1, R2].forEach((r, ri) => {
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(201,122,61,${ri === 0 ? 0.055 : 0.038})`;
        ctx.lineWidth = 0.6;
        ctx.setLineDash([3, 10]);
        ctx.stroke();
        ctx.setLineDash([]);
      });

      // Draw connections (Thinner connection lines for premium look)
      connections.forEach(([a, b], connIdx) => {
        const nodeA = a === -1 ? nodes[0] : nodes[a + 1];
        const nodeB = b === -1 ? nodes[0] : nodes[b + 1];

        const distA = Math.hypot(mouseRef.current.x - nodeA.x, mouseRef.current.y - nodeA.y);
        const distB = Math.hypot(mouseRef.current.x - nodeB.x, mouseRef.current.y - nodeB.y);
        const prox = Math.max(0, 1 - Math.min(distA, distB) / 200);

        const isHoverActive = prox > 0.35;
        if (isHoverActive) {
          activeConnections.add(connIdx);
        } else if (activeConnections.size > 6 && Math.random() > 0.985) {
          activeConnections.delete(connIdx);
        }

        // Highlight line if either of its nodes is currently hovered
        const isListHovered = hoveredDimensionRef.current !== null && 
                             (hoveredDimensionRef.current === a || hoveredDimensionRef.current === b);
        const isConnActive = activeConnections.has(connIdx) || isListHovered;

        const baseAlpha = isConnActive ? 0.38 : 0.15;
        const grad = ctx.createLinearGradient(nodeA.x, nodeA.y, nodeB.x, nodeB.y);
        grad.addColorStop(0, `rgba(201,122,61,${baseAlpha + prox * 0.20})`);
        grad.addColorStop(0.5, `rgba(201,122,61,${baseAlpha + 0.08 + prox * 0.25})`);
        grad.addColorStop(1, `rgba(201,122,61,${baseAlpha + prox * 0.20})`);

        ctx.beginPath();
        ctx.moveTo(nodeA.x, nodeA.y);
        ctx.lineTo(nodeB.x, nodeB.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = isConnActive ? 1.5 + prox * 0.6 : 0.55 + prox * 0.35;
        if (isConnActive) {
          ctx.setLineDash([2, 5]);
        }
        ctx.stroke();
        ctx.setLineDash([]);

        // Animated light pulse traveling down connections
        if (isConnActive) {
          const progress = (timestamp * 0.0018 + connIdx * 0.3) % 1.0;
          const px = nodeA.x + (nodeB.x - nodeA.x) * progress;
          const py = nodeA.y + (nodeB.y - nodeA.y) * progress;
          
          ctx.beginPath();
          ctx.arc(px, py, 2.2, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255, 255, 255, 0.98)';
          ctx.fill();
        }
      });

      // Draw cursor constellation connection links (Signature Interaction)
      if (mouseRef.current.x > -100 && mouseRef.current.y > -100) {
        const sortedNodes = [...nodes]
          .map((n) => ({ node: n, dist: Math.hypot(mouseRef.current.x - n.x, mouseRef.current.y - n.y) }))
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
            ctx.setLineDash([2, 4]);
            ctx.stroke();
            ctx.setLineDash([]);
          }
        }
      }

      // Draw click ripples
      ripples.forEach(rip => {
        ctx.beginPath();
        ctx.arc(rip.x, rip.y, rip.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(201,122,61,${rip.opacity * 0.28})`;
        ctx.lineWidth = 1.0;
        ctx.stroke();
      });

      // Draw nodes (Increased brightness with progressive proximity scaling)
      nodes.forEach((node) => {
        const dist = Math.hypot(mouseRef.current.x - node.x, mouseRef.current.y - node.y);
        const prox = Math.max(0, 1 - dist / 110);
        const isMouseHovered = prox > 0.35;
        const isNodeActive = isMouseHovered || (hoveredDimensionRef.current === node.idx);
        
        // Progressive scaling (1.0 to 1.6 depending on proximity and active status)
        const scaleVal = isNodeActive ? 1.4 : (1.0 + prox * 0.4);
        
        drawNode(node, 0.7 + prox * 0.3, isNodeActive, scaleVal);
      });

      // Mouse position ambient glow
      if (mouseRef.current.x > -100 && mouseRef.current.y > -100) {
        const mg = ctx.createRadialGradient(
          mouseRef.current.x, mouseRef.current.y, 0,
          mouseRef.current.x, mouseRef.current.y, 250
        );
        mg.addColorStop(0, 'rgba(201,122,61,0.07)');
        mg.addColorStop(0.4, 'rgba(201,122,61,0.03)');
        mg.addColorStop(1, 'rgba(201,122,61,0)');
        ctx.beginPath();
        ctx.arc(mouseRef.current.x, mouseRef.current.y, 250, 0, Math.PI * 2);
        ctx.fillStyle = mg;
        ctx.fill();
      }

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

  const activeDim = hoveredDimension !== null ? DIMENSIONS[hoveredDimension] : null;

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen min-h-dvh w-full overflow-hidden bg-[#050505] flex items-center"
    >
      {/* Refined multi-layer gradient background for extreme depth (glows softened to blend perfectly) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        
        {/* Soft radial amber glow right behind network constellation - blended very softly */}
        <div className="absolute left-[70%] top-[50%] -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full pointer-events-none z-0 opacity-35 blur-[200px] animate-pulse"
          style={{
            background: 'radial-gradient(circle, rgba(201,122,61,0.09) 0%, rgba(201,122,61,0.02) 50%, transparent 80%)',
            animationDuration: '6s'
          }} />

        {/* Ambient shifting gold glow top right */}
        <div className="animate-glow-1 absolute top-[-15%] right-[-10%] w-[70vw] h-[80vh] rounded-full blur-[140px]"
          style={{ background: 'radial-gradient(ellipse, rgba(201,122,61,0.05) 0%, rgba(201,122,61,0.01) 50%, transparent 80%)' }} />
        
        {/* Ambient shifting indigo glow bottom left */}
        <div className="animate-glow-2 absolute bottom-[-15%] left-[-15%] w-[65vw] h-[75vh] rounded-full blur-[120px]"
          style={{ background: 'radial-gradient(ellipse, rgba(37,43,51,0.6) 0%, rgba(201,122,61,0.008) 45%, transparent 75%)' }} />

        {/* Double gradient vignette layout centered on constellation */}
        <div className="absolute inset-0 pointer-events-none z-0"
          style={{
            background: 'radial-gradient(circle at 70% 50%, rgba(201,122,61,0.012) 0%, rgba(5,5,5,0.45) 55%, #050505 100%)',
          }} />

        {/* 3D Parallax Perspective Grid */}
        <div className="hero-grid absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: 'linear-gradient(rgba(201, 122, 61, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(201, 122, 61, 0.08) 1px, transparent 1px)',
            backgroundSize: '55px 55px',
            transform: 'perspective(1000px) rotateX(65deg) translateY(-20%) translateZ(-120px)',
            transformOrigin: '50% 0%',
          }} />
      </div>

      {/* Dynamic Constellation Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 pointer-events-none w-full h-full"
      />

      {/* Main content grid (Breathing space increased: gap-16 lg:gap-24) */}
      <div ref={contentRef} className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 xl:px-24 pt-28 pb-16 min-h-[85vh] grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
        
        {/* Left Column: Heading & CTAs */}
        <div className="lg:col-span-7 flex flex-col justify-center items-start text-left z-20">

          {/* Heading with thoda and line-height spacing & glow highlight */}
          <h1 className="font-heading text-[#F4F1EB] leading-[1.08] tracking-[-0.03em] mb-8 select-none">
            <div className="h-line-container mb-3.5">
              <span className="h-line block text-[clamp(2.8rem,6.8vw,6.5rem)] font-light">
                Building Brands
              </span>
            </div>
            <div className="h-line-container mb-3.5">
              <span className="h-line block text-[clamp(2.8rem,6.8vw,6.5rem)] font-light">
                That Occupy
              </span>
            </div>
            <div className="h-line-container">
              <span className="h-line block text-[clamp(2.8rem,6.8vw,6.5rem)] font-light italic bg-gradient-to-r from-[#F4F1EB] via-[#E0A96D] to-[#C97A3D] bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(201,122,61,0.22)]">
                Nine Dimensions.
              </span>
            </div>
          </h1>

          {/* Cleaner body text */}
          <div className="h-sub opacity-0 max-w-[460px] mb-10">
            <p className="font-body text-[13px] sm:text-[14px] leading-[1.65] text-[#C4C8CF]/95 font-light">
              Nine creative disciplines — identity, design, motion, engineering, and AI — unified into one architectural framework. Custom-engineered interfaces constructed for conversion and scale.
            </p>
          </div>

          {/* Magnetic CTAs (Premium slide-fill hover animations) */}
          <div className="flex items-center gap-5 shrink-0">
            <MagneticButton
              href="#philosophy"
              variant="custom"
              className="h-cta group relative overflow-hidden inline-flex items-center gap-3.5 px-8 py-4.5 bg-[#C97A3D] text-[#050505] font-subheading text-[10px] font-bold tracking-[0.2em] uppercase opacity-0 transition-all duration-500 hover:shadow-[0_0_40px_rgba(201,122,61,0.5)] hover:scale-[1.03]"
              magnetStrength={0.22}
            >
              <span className="relative z-10">Explore System</span>
              <span className="relative z-10 flex items-center justify-center overflow-hidden w-4 h-4">
                <svg className="w-4 h-4 transition-transform duration-500 transform group-hover:translate-x-full" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <svg className="w-4 h-4 absolute transition-transform duration-500 transform -translate-x-full group-hover:translate-x-0" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              <span className="absolute inset-0 bg-[#E0A96D] translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] z-0" />
            </MagneticButton>

            <MagneticButton
              href="mailto:connect@nayagrowth.com"
              variant="custom"
              cursorType="connect"
              className="h-cta group relative overflow-hidden inline-flex items-center gap-3.5 px-8 py-4.5 border border-[#C97A3D]/30 hover:border-[#C97A3D]/0 text-[#C4C8CF] hover:text-[#050505] font-subheading text-[10px] font-bold tracking-[0.2em] uppercase opacity-0 transition-all duration-500 hover:shadow-[0_0_30px_rgba(201,122,61,0.22)] hover:scale-[1.03]"
              magnetStrength={0.22}
            >
              <span className="relative z-10">Start Project</span>
              <span className="relative z-10 flex items-center justify-center overflow-hidden w-4 h-4">
                <svg className="w-4 h-4 transition-transform duration-500 transform group-hover:translate-x-full" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <svg className="w-4 h-4 absolute transition-transform duration-500 transform -translate-x-full group-hover:translate-x-0" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              <span className="absolute inset-0 bg-[#C97A3D] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] z-0" />
            </MagneticButton>
          </div>
        </div>

        {/* Right Column: Tech Dashboard Panel (More breathing space, higher contrast description text) */}
        <div className="lg:col-span-5 z-20 relative flex flex-col justify-center">
          <div className="h-sub opacity-0 flex flex-col items-start w-full relative">
            
            {/* Structural vertical guideline (positioned nicely in spacing margin) */}
            <div className="hidden lg:block absolute -left-12 top-0 bottom-0 w-[1px] bg-gradient-to-b from-[#C97A3D]/25 via-[#C97A3D]/5 to-transparent" />
            
            <h2 className="font-heading text-[#F4F1EB] text-[1.8rem] leading-none tracking-tight mb-4">
              THE 9D SYSTEM
            </h2>
            
            <p className="font-body text-[14px] text-[#C4C8CF] leading-relaxed mb-6 font-light">
              Nine creative disciplines. One synchronized growth architecture.
            </p>
            
            {/* Dynamic Active Node Dashboard Specs widget */}
            {activeDim ? (
              <div className="mt-2 pt-6 border-t border-white/[0.05] w-full min-h-[120px] flex flex-col justify-start transition-all duration-300">
                <h3 className="font-heading text-[#F4F1EB] text-[1.5rem] leading-none mb-3">
                  {activeDim.name}
                </h3>
                <p className="font-body text-[13px] text-[#C4C8CF]/95 font-light leading-relaxed">
                  {activeDim.desc}
                </p>
              </div>
            ) : (
              <div className="mt-2 pt-6 border-t border-white/[0.05] w-full min-h-[120px] flex flex-col justify-start transition-all duration-300">
                <h3 className="font-heading text-[#F4F1EB] text-[1.5rem] leading-none mb-3">
                  ACTIVE NETWORK
                </h3>
                <p className="font-body text-[13px] text-[#C4C8CF] font-light leading-relaxed">
                  Nine disciplines. One synchronized growth architecture.
                </p>
              </div>
            )}

            <a
              href="#philosophy"
              className="group inline-flex items-center gap-2.5 text-[#C97A3D] hover:text-[#E0A96D] font-subheading text-[10.5px] font-bold tracking-[0.2em] uppercase transition-colors mt-8"
            >
              <span>Explore the System</span>
              <svg className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-300" viewBox="0 0 12 12" fill="none">
                <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
