import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useCursor } from '../context/CursorContext';

const NINE_DIMENSIONS = [
  { num: '01', title: 'Strategy', category: 'Foundation', desc: 'Strategic positioning, market intelligence, and brand architecture.' },
  { num: '02', title: 'Identity', category: 'Visual', desc: 'Brand systems, visual language, and iconic design elements.' },
  { num: '03', title: 'Design', category: 'Creative', desc: 'Art direction, typography, and visual communication systems.' },
  { num: '04', title: 'Motion', category: 'Dynamic', desc: 'Cinematic animation, micro-interactions, and visual storytelling.' },
  { num: '05', title: 'AI', category: 'Intelligence', desc: 'Artificial intelligence, automation, and smart creative solutions.' },
  { num: '06', title: 'Engineering', category: 'Technical', desc: 'Full-stack development, performance optimization, and scalable systems.' },
  { num: '07', title: 'Experience', category: 'Human', desc: 'User experience, interaction design, and seamless journeys.' },
  { num: '08', title: 'Content', category: 'Narrative', desc: 'Strategic storytelling, copywriting, and content architecture.' },
  { num: '09', title: 'Growth', category: 'Scale', desc: 'Performance marketing, analytics, and sustainable growth systems.' }
];

const NODE_RADIUS_PCT = 37;
const NODE_RADIUS_VB = 175;
const VB = 500;

export default function Hero({ started = false }) {
  const { setCursor } = useCursor();

  const containerRef = useRef(null);
  const wheelRef = useRef(null);
  const parallaxRef = useRef(null);
  const beamRef = useRef(null);
  const beamTipRef = useRef(null);
  const cursorLightRef = useRef(null);
  const coreMagRef = useRef(null);
  const ctaRef = useRef(null);
  const nodeRefs = useRef([]);
  const nodeGlowRefs = useRef([]);
  const intervalRef = useRef(null);

  const [activeNode, setActiveNode] = useState(-1);

  const activeRef = useRef(-1);
  useEffect(() => { activeRef.current = activeNode; }, [activeNode]);

  const mouseRef = useRef({ x: 0, y: 0, active: false });

  // ── Staged assembly: nothing → core → rings → lines → nodes → activate → card ──
  useEffect(() => {
    if (!started) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const prepDraw = (selector) => {
      document.querySelectorAll(selector).forEach((el) => {
        const len = el.getTotalLength();
        el.style.strokeDasharray = `${len}`;
        el.style.strokeDashoffset = `${len}`;
      });
    };

    const restoreRingDashes = () => {
      document.querySelectorAll('.hero-ring-path').forEach((r) => {
        r.style.strokeDasharray = r.dataset.dash || '0';
        r.style.strokeDashoffset = '0';
      });
    };

    if (reduced) {
      gsap.set(['.hero-core-node', '.hero-node', '.hero-conn', '.hero-hint', '.hero-orbit', '.hero-wheel-stage'], { opacity: 1, scale: 1 });
      gsap.set(['.hero-conn', '.hero-ring-path'], { strokeDashoffset: 0, opacity: 1 });
      restoreRingDashes();
      setActiveNode(0);
      return;
    }

    prepDraw('.hero-ring-path');
    prepDraw('.hero-conn');

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.to('.hero-wheel-stage', { opacity: 1, scale: 1, duration: 1.1 }, 0)
      .fromTo('.hero-fade-up', { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 0.9, stagger: 0.09 }, 0.05)
      .fromTo('.hero-core-node', { opacity: 0, scale: 0.35, filter: 'blur(14px)' }, { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1.1 }, 0.5)
      .to('.hero-ring-path', { strokeDashoffset: 0, duration: 1.3, stagger: 0.18, ease: 'power2.inOut' }, 0.9)
      .add(restoreRingDashes)
      .to('.hero-conn', { strokeDashoffset: 0, opacity: 1, duration: 1.0, stagger: 0.06, ease: 'power2.out' }, 1.35)
      .fromTo('.hero-node', { opacity: 0 }, { opacity: 1, duration: 0.5, stagger: 0.05 }, 2.1)
      .fromTo('.hero-node-badge', { scale: 0.3 }, { scale: 1, duration: 0.7, stagger: 0.05, ease: 'back.out(2.5)' }, 2.2)
      .add(() => setActiveNode(0), 2.6)
      .fromTo('.hero-orbit', { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 0.8 }, 2.9)
      .fromTo('.hero-hint', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.7 }, 3.05);

    return () => tl.kill();
  }, [started]);

  // ── Auto rotation between 9 dimensions (starts after assembly) ──
  useEffect(() => {
    if (!started) return;
    const t = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        setActiveNode((prev) => (prev + 1) % 9);
      }, 5000);
    }, 3400);
    return () => {
      clearTimeout(t);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [started]);

  // ── Cursor proximity loop: beam, light, node glow intensity ──
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf;

    const frame = () => {
      const wheel = wheelRef.current;
      const m = mouseRef.current;

      if (wheel) {
        const rect = wheel.getBoundingClientRect();
        const scale = VB / rect.width;
        const inWheel = m.active && m.x >= rect.left && m.x <= rect.right && m.y >= rect.top && m.y <= rect.bottom;

        // Soft light following cursor
        if (cursorLightRef.current) {
          if (m.active && !reduced) {
            cursorLightRef.current.style.left = `${((m.x - rect.left) / rect.width) * 100}%`;
            cursorLightRef.current.style.top = `${((m.y - rect.top) / rect.height) * 100}%`;
            cursorLightRef.current.style.opacity = '1';
          } else {
            cursorLightRef.current.style.opacity = '0';
          }
        }

        // Connection beam reaching toward cursor
        if (beamRef.current && beamTipRef.current) {
          if (inWheel && !reduced) {
            const mx = (m.x - rect.left) * scale;
            const my = (m.y - rect.top) * scale;
            const dx = mx - VB / 2;
            const dy = my - VB / 2;
            const dist = Math.hypot(dx, dy) || 1;
            const cl = Math.min(NODE_RADIUS_VB / dist, 1);
            const tx = VB / 2 + dx * cl;
            const ty = VB / 2 + dy * cl;
            const midX = (VB / 2 + tx) / 2;
            const midY = (VB / 2 + ty) / 2 - 14;
            beamRef.current.setAttribute('d', `M ${VB / 2} ${VB / 2} Q ${midX} ${midY} ${tx} ${ty}`);
            beamRef.current.style.opacity = '1';
            beamTipRef.current.setAttribute('cx', tx);
            beamTipRef.current.setAttribute('cy', ty);
            beamTipRef.current.style.opacity = '1';
          } else {
            beamRef.current.style.opacity = '0';
            beamTipRef.current.style.opacity = '0';
          }
        }

        // Per-node glow intensity based on cursor distance
        for (let i = 0; i < NINE_DIMENSIONS.length; i++) {
          const glow = nodeGlowRefs.current[i];
          if (!glow) continue;
          const angle = (i / 9) * Math.PI * 2 - Math.PI / 2;
          const nx = rect.left + (0.5 + (NODE_RADIUS_PCT / 100) * Math.cos(angle)) * rect.width;
          const ny = rect.top + (0.5 + (NODE_RADIUS_PCT / 100) * Math.sin(angle)) * rect.height;
          const prox = Math.max(0, 1 - Math.hypot(m.x - nx, m.y - ny) / 140);
          glow.style.opacity = String(activeRef.current === i ? 0.9 : 0.12 + prox * 0.5);
        }
      }

      raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, []);

  // ── 3D mouse parallax tilt + parallax layers ──
  const handleMouseMove = (e) => {
    mouseRef.current = { x: e.clientX, y: e.clientY, active: true };
    if (!wheelRef.current) return;

    const rect = wheelRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = (y / rect.height) * -6;
    const rotateY = (x / rect.width) * 6;

    gsap.to(wheelRef.current, {
      rotateX, rotateY,
      duration: 0.5,
      ease: 'power2.out',
      transformPerspective: 1000
    });

    if (parallaxRef.current) {
      gsap.to(parallaxRef.current, {
        x: x * -0.03,
        y: y * -0.03,
        duration: 0.7,
        ease: 'power2.out'
      });
    }
  };

  const handleMouseLeave = () => {
    mouseRef.current.active = false;
    setCursor('');
    if (!wheelRef.current) return;
    gsap.to(wheelRef.current, { rotateX: 0, rotateY: 0, duration: 0.8, ease: 'power2.out' });
    if (parallaxRef.current) gsap.to(parallaxRef.current, { x: 0, y: 0, duration: 0.8, ease: 'power2.out' });
  };

  const handleCoreMagnet = (e) => {
    const el = coreMagRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    gsap.to(el, {
      x: (e.clientX - (r.left + r.width / 2)) * 0.14,
      y: (e.clientY - (r.top + r.height / 2)) * 0.14,
      duration: 0.4,
      ease: 'power2.out'
    });
  };

  const handleCoreMagnetLeave = () => {
    setCursor('');
    gsap.to(coreMagRef.current, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' });
  };

  const handleCtaMagnet = (e) => {
    const el = ctaRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    gsap.to(el, {
      x: (e.clientX - (r.left + r.width / 2)) * 0.18,
      y: (e.clientY - (r.top + r.height / 2)) * 0.18,
      duration: 0.3,
      ease: 'power2.out'
    });
  };

  const handleCtaMagnetLeave = () => {
    setCursor('');
    gsap.to(ctaRef.current, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' });
  };

  const activeDim = activeNode >= 0 ? NINE_DIMENSIONS[activeNode] : null;

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative h-screen w-full bg-[#050505] text-[#F4F1EB] overflow-hidden pt-16 md:pt-20 pb-6 flex flex-col justify-between"
      style={{
        backgroundImage: 'radial-gradient(circle at 75% 35%, rgba(201, 122, 61, 0.07) 0%, rgba(5, 5, 5, 0.98) 75%)',
      }}
    >
      {/* Background Architectural Grid Lines */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-15">
        <div className="blueprint-grid-line vertical left-[15%]" />
        <div className="blueprint-grid-line vertical left-[50%]" />
        <div className="blueprint-grid-line vertical left-[85%]" />
        <div className="blueprint-grid-line horizontal top-[30%]" />
        <div className="blueprint-grid-line horizontal top-[70%]" />
      </div>

      {/* Main Grid Content */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center flex-grow py-4">

        {/* Left Column: Brand Story & Headline */}
        <div className="lg:col-span-6 flex flex-col justify-center items-start text-left z-20">

          {/* Top Brand Pill Tag */}
          <div className="hero-fade-up inline-flex items-center px-3.5 py-1.5 rounded-full border border-[#C97A3D]/30 bg-[#C97A3D]/5 mb-4">
            <span className="font-subheading text-[10px] font-bold tracking-[0.25em] text-[#E0A96D] uppercase">
              NINE AAYAM · CREATIVE SYSTEM
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="hero-fade-up font-heading leading-[1.05] tracking-[-0.02em] mb-4">
            <span className="block text-[clamp(2.5rem,4.8vw,5.2rem)] font-light text-[#F4F1EB]">
              Nine Dimensions.
            </span>
            <span className="flex items-baseline gap-3 flex-wrap text-[clamp(2.5rem,4.8vw,5.2rem)] mt-1">
              <span className="font-heading font-light text-[#E0A96D] text-[clamp(1.7rem,3.3vw,3.6rem)] leading-none -mr-1">
                One Creative
              </span>
              <span className="font-heading font-medium text-[#F4F1EB] relative inline-block">
                System.
                <svg className="absolute -bottom-2 left-0 w-full h-3 text-[#C97A3D]" viewBox="0 0 100 12" preserveAspectRatio="none">
                  <path d="M2 8 C 30 2, 70 2, 98 8" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                </svg>
              </span>
            </span>
          </h1>

          {/* Clear Supporting Paragraph */}
          <p className="hero-fade-up font-body text-[14px] sm:text-[15.5px] leading-[1.75] text-[#D4D8DF] font-light max-w-[520px] mb-6">
            We engineer brands through nine interconnected dimensions of creativity, technology, and experience.
          </p>

          {/* Action CTAs */}
          <div className="hero-fade-up flex items-center gap-5 mb-6 flex-wrap">
            <a
              ref={ctaRef}
              href="#philosophy"
              onMouseMove={handleCtaMagnet}
              onMouseLeave={handleCtaMagnetLeave}
              onMouseEnter={() => setCursor('connect', 'Enter')}
              className="inline-flex items-center gap-3.5 px-8 py-4 bg-[#8C5832] hover:bg-[#A3683C] text-[#F4F1EB] font-subheading text-[10.5px] font-bold tracking-[0.2em] uppercase transition-[background-color,box-shadow,color] duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.6)] hover:shadow-[0_15px_35px_rgba(140,88,50,0.35)] group"
            >
              <span>EXPLORE THE 9 DIMENSIONS</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>

            <a
              href="#services"
              className="inline-flex items-center gap-2 text-[#F4F1EB] hover:text-[#C97A3D] font-subheading text-[10.5px] font-bold tracking-[0.2em] uppercase transition-colors relative py-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:bg-[#C97A3D]/70 hover:after:bg-[#C97A3D]"
            >
              DISCOVER THE SYSTEM
            </a>
          </div>

          {/* Micro hint tying headline to the diagram */}
          <p className="hero-fade-up hidden md:flex items-center font-subheading text-[9.5px] tracking-[0.22em] uppercase text-[#A69E93]/60">
            Hover the system · every node is a live dimension
          </p>

        </div>

        {/* Right Column: Signature 9D System Interactive Wheel / Radial Diagram */}
        <div
          className="lg:col-span-6 relative w-full flex items-center justify-center py-2"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onMouseEnter={() => { mouseRef.current.active = true; }}
        >

          {/* Ghost dimension word — the diagram proves the headline */}
          {activeDim && (
            <div key={`ghost-${activeDim.num}`} className="hero-ghost" aria-hidden="true">
              {activeDim.title}
            </div>
          )}

          <div
            ref={wheelRef}
            className="hero-wheel-anim relative w-full aspect-square max-w-[420px] md:max-w-[460px] flex items-center justify-center p-3 transition-transform duration-300 ease-out"
          >
            {/* Breathing ambient glow */}
            <div className="hero-ambient" />

            {/* Soft cursor-follow light */}
            <div ref={cursorLightRef} className="hero-cursor-light" />

            {/* Floating ambient particles */}
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-[#C97A3D]/20 blur-sm pointer-events-none"
                style={{
                  width: `${4 + Math.random() * 6}px`,
                  height: `${4 + Math.random() * 6}px`,
                  left: `${20 + Math.random() * 60}%`,
                  top: `${20 + Math.random() * 60}%`,
                  animation: `floatParticle ${8 + Math.random() * 4}s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 2}s`
                }}
              />
            ))}

            {/* Rotating orbital seal around the core — discoverability */}
            <div className="hero-orbit" aria-hidden="true">
              <svg className="hero-orbit-svg" viewBox="0 0 200 200">
                <defs>
                  <path id="heroOrbitPath" d="M 100,100 m -88,0 a 88,88 0 1,1 176,0 a 88,88 0 1,1 -176,0" />
                </defs>
                <text className="hero-orbit-text">
                  <textPath href="#heroOrbitPath">EXPLORE ALL 9 DIMENSIONS · ONE CREATIVE SYSTEM · </textPath>
                </text>
              </svg>
            </div>

            {/* Organic rings + connection lines */}
            <svg
              ref={parallaxRef}
              className="absolute inset-0 w-full h-full text-[#C97A3D]/20 pointer-events-none"
              viewBox="0 0 500 500"
            >
              {/* Soft organic outer ring */}
              <circle className="hero-ring-path animate-[spin_60s_linear_infinite]" data-dash="8 12" cx="250" cy="250" r="220" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.6" />
              {/* Middle ring with different dash pattern */}
              <circle className="hero-ring-path animate-[spin_45s_linear_infinite_reverse]" data-dash="4 8" cx="250" cy="250" r="175" stroke="currentColor" strokeWidth="0.4" fill="none" opacity="0.4" />
              {/* Inner subtle ring */}
              <circle className="hero-ring-path" data-dash="" cx="250" cy="250" r="120" stroke="currentColor" strokeWidth="0.3" fill="none" opacity="0.3" />

              {/* Organic connection lines to nodes */}
              {NINE_DIMENSIONS.map((dim, idx) => {
                const angle = (idx / 9) * Math.PI * 2 - Math.PI / 2;
                const x2 = 250 + Math.cos(angle) * NODE_RADIUS_VB;
                const y2 = 250 + Math.sin(angle) * NODE_RADIUS_VB;
                const isActive = activeNode === idx;

                return (
                  <g key={dim.num}>
                    <path
                      className="hero-conn transition-all duration-700 ease-out"
                      d={`M 250 250 Q ${250 + Math.cos(angle) * 50} ${250 + Math.sin(angle) * 50} ${x2} ${y2}`}
                      stroke={isActive ? '#E0A96D' : 'rgba(201,122,61,0.55)'}
                      strokeWidth={isActive ? '1.2' : '0.5'}
                      fill="none"
                      style={{
                        opacity: isActive ? 1 : 0.9,
                        animation: isActive ? 'pulseLine 1.5s ease-in-out infinite' : 'none'
                      }}
                    />
                    {isActive && (
                      <>
                        <circle cx={x2} cy={y2} r="6" fill="#E0A96D" opacity="0.6" className="animate-ping" />
                        {/* Traveling particle along the line */}
                        <circle r="3" fill="#E0A96D" opacity="0.8">
                          <animateMotion
                            dur="2s"
                            repeatCount="indefinite"
                            path={`M 250 250 Q ${250 + Math.cos(angle) * 50} ${250 + Math.sin(angle) * 50} ${x2} ${y2}`}
                          />
                        </circle>
                      </>
                    )}
                    {/* Subtle pulse for inactive lines */}
                    {!isActive && (
                      <circle
                        cx={x2} cy={y2}
                        r="2"
                        fill="rgba(201,122,61,0.3)"
                        className="animate-pulse"
                        style={{ animationDuration: `${2.5 + idx * 0.3}s` }}
                      />
                    )}
                  </g>
                );
              })}
            </svg>

            {/* Cursor connection beam overlay */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-[15]" viewBox="0 0 500 500">
              <path ref={beamRef} className="hero-beam" d="M 250 250 L 250 250" />
              <circle ref={beamTipRef} className="hero-beam-tip" cx="250" cy="250" r="3" />
            </svg>

            {/* Assembly stage: core + nodes */}
            <div className="hero-wheel-stage absolute inset-0 z-20 flex items-center justify-center">
              {/* Central HERO "9" Core Node — organic with glow */}
              <div
                ref={coreMagRef}
                onClick={() => setActiveNode((activeNode + 1) % 9)}
                onMouseMove={handleCoreMagnet}
                onMouseLeave={handleCoreMagnetLeave}
                onMouseEnter={() => setCursor('view', 'Explore')}
                className="hero-core-node relative z-20 w-40 h-40 md:w-48 md:h-48 rounded-full bg-[#0d0b0a] border border-[#C97A3D]/50 flex flex-col items-center justify-center p-4 text-center cursor-pointer group"
              >
                {/* Subtle breathing glow rings */}
                <div className="hero-core-glow absolute inset-0 rounded-full bg-[#C97A3D]/15 blur-xl opacity-60" />
                <div className="hero-core-glow-2 absolute inset-0 rounded-full border border-[#C97A3D]/40" />

                <div className="relative flex flex-col items-center transition-transform duration-500 group-hover:scale-105">
                  <span className="font-heading text-[68px] md:text-[85px] font-medium text-[#E0A96D] leading-none drop-shadow-[0_0_20px_rgba(201,122,61,0.5)] transition-all duration-700 group-hover:drop-shadow-[0_0_30px_rgba(201,122,61,0.8)]">
                    9
                  </span>
                  <span
                    key={activeNode}
                    className="hero-core-label font-subheading text-[8px] md:text-[9px] font-bold tracking-[0.25em] text-[#F4F1EB]/70 uppercase -mt-1"
                  >
                    {activeDim ? activeDim.title : 'System Core'}
                  </span>
                  <span className="font-script text-[15px] md:text-[18px] text-[#E0A96D] font-normal leading-none mt-0.5 opacity-90">
                    Aayam
                  </span>
                </div>
              </div>

              {/* 9 Outer Interactive Dimension Nodes */}
              {NINE_DIMENSIONS.map((dim, idx) => {
                const angle = (idx / 9) * Math.PI * 2 - Math.PI / 2;
                const leftPos = 50 + NODE_RADIUS_PCT * Math.cos(angle);
                const topPos = 50 + NODE_RADIUS_PCT * Math.sin(angle);
                const isActive = activeNode === idx;

                return (
                  <div
                    key={dim.num}
                    ref={(el) => { nodeRefs.current[idx] = el; }}
                    onClick={() => setActiveNode(idx)}
                    onMouseEnter={() => { setActiveNode(idx); setCursor('view', 'Explore'); }}
                    onMouseLeave={() => setCursor('')}
                    className={`hero-node group absolute z-30 cursor-pointer ${
                      isActive ? 'z-40' : ''
                    }`}
                    style={{
                      left: `${leftPos}%`,
                      top: `${topPos}%`,
                      animation: isActive ? 'none' : `heroFloat ${3 + idx * 0.3}s ease-in-out infinite`,
                      animationDelay: `${idx * 0.2}s`,
                      transform: isActive ? 'translate(-50%, -50%)' : undefined,
                      '--float-amp': `${-4 - (idx % 4) * 2}px`
                    }}
                  >
                    {/* Organic glow behind node — intensity follows cursor distance */}
                    <div
                      ref={(el) => { nodeGlowRefs.current[idx] = el; }}
                      className={`absolute inset-0 rounded-full pointer-events-none ${
                        isActive ? 'bg-[#C97A3D]/30 blur-2xl' : 'bg-[#C97A3D]/25 blur-xl'
                      }`}
                      style={{ opacity: 0.12 }}
                    />

                    {/* One-shot radar pulse for the active node */}
                    {isActive && <span className="hero-node-radar" />}

                    {/* Breathing ring for inactive nodes */}
                    {!isActive && (
                      <span
                        className="absolute inset-0 rounded-full border border-[#C97A3D]/10 animate-pulse pointer-events-none"
                        style={{ animationDuration: `${2 + idx * 0.2}s` }}
                      />
                    )}

                    {/* Inner content — hover/active scale & opacity */}
                    <div className={`hero-node-inner ${isActive ? 'hero-node-active' : ''}`}>
                      {/* Node Circle Badge */}
                      <div className={`hero-node-badge relative w-9 h-9 md:w-11 md:h-11 rounded-full flex items-center justify-center font-subheading text-[10px] md:text-[11px] font-bold transition-[background-color,border-color,box-shadow,color] duration-700 border ${
                        isActive
                          ? 'bg-[#C97A3D] text-[#050505] border-[#E0A96D] shadow-[0_0_30px_rgba(201,122,61,0.6)]'
                          : 'bg-[#121212]/80 text-[#F4F1EB] border-white/15 group-hover:border-[#C97A3D]/50 group-hover:shadow-[0_0_15px_rgba(201,122,61,0.3)]'
                      }`}>
                        {dim.num}
                      </div>

                      {/* Node Label Text */}
                      <div className={`hidden sm:flex flex-col px-2.5 py-1 rounded-sm backdrop-blur-md border transition-all duration-500 ${
                        isActive
                          ? 'bg-[#181513]/95 border-[#C97A3D]/50 shadow-lg'
                          : 'bg-[#0a0a0a]/70 border-white/8 opacity-60 group-hover:opacity-100 group-hover:border-[#C97A3D]/30'
                      }`}>
                        <span className={`font-subheading text-[9.5px] font-bold tracking-[0.15em] uppercase whitespace-nowrap ${
                          isActive ? 'text-[#E0A96D]' : 'text-[#F4F1EB]'
                        }`}>
                          {dim.title}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Floating Active Dimension Detail Card */}
            {activeDim && (
              <div
                key={activeDim.num}
                className="absolute bottom-6 sm:bottom-4 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-[380px] bg-[#141211]/90 border border-[#C97A3D]/30 backdrop-blur-md rounded-lg p-5 shadow-[0_20px_40px_rgba(0,0,0,0.6)] animate-fadeIn"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-subheading text-[8px] font-bold tracking-[0.3em] text-[#C97A3D]/80 uppercase">
                    DIMENSION {activeDim.num} / 09
                  </span>
                  <span className="font-mono text-[8px] text-[#A69E93]/70 uppercase tracking-wider">
                    {activeDim.category}
                  </span>
                </div>
                <div className="hero-card-progress mb-3">
                  <span style={{ width: `${((activeNode + 1) / 9) * 100}%` }} />
                </div>
                <h3 className="font-heading text-[18px] font-medium text-[#F4F1EB] leading-none mb-2 tracking-tight">
                  {activeDim.title}
                </h3>
                <p className="font-body text-[11px] text-[#C4C8CF]/80 font-light leading-relaxed">
                  {activeDim.desc}
                </p>
              </div>
            )}

            {/* Micro hint */}
            <div className="hero-hint" aria-hidden="true">
              <span className="hero-hint-dot" />
              Hover to explore the system
            </div>

          </div>
        </div>

      </div>

    </section>
  );
}
