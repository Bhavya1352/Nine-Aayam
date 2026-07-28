import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

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

export default function Hero() {
  const containerRef = useRef(null);
  const wheelRef = useRef(null);
  const [activeNode, setActiveNode] = useState(0);

  // ── Entry GSAP animations ──
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 });

    tl.fromTo('.hero-fade-up',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out', stagger: 0.1 }
    );

    tl.fromTo('.hero-wheel-anim',
      { opacity: 0, scale: 0.92 },
      { opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out' },
      '-=0.7'
    );
  }, []);

  // ── Auto rotation between 9 dimensions ──
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveNode((prev) => (prev + 1) % 9);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  // ── Subtle 3D Mouse Parallax Tilt ──
  const handleMouseMove = (e) => {
    if (!wheelRef.current) return;
    const rect = wheelRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    const rotateX = (y / rect.height) * -6;
    const rotateY = (x / rect.width) * 6;

    gsap.to(wheelRef.current, {
      rotateX: rotateX,
      rotateY: rotateY,
      duration: 0.5,
      ease: 'power2.out',
      transformPerspective: 1000
    });
  };

  const handleMouseLeave = () => {
    if (!wheelRef.current) return;
    gsap.to(wheelRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.8,
      ease: 'power2.out'
    });
  };

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
          <div className="hero-fade-up inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-[#C97A3D]/30 bg-[#C97A3D]/5 mb-4">
            <span className="w-2 h-2 rounded-full bg-[#C97A3D] animate-ping" />
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
              href="#philosophy"
              className="inline-flex items-center gap-3.5 px-8 py-4 bg-[#8C5832] hover:bg-[#A3683C] text-[#F4F1EB] font-subheading text-[10.5px] font-bold tracking-[0.2em] uppercase transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.6)] hover:shadow-[0_15px_35px_rgba(140,88,50,0.35)] hover:-translate-y-0.5 group"
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

        </div>

        {/* Right Column: Signature 9D System Interactive Wheel / Radial Diagram */}
        <div 
          className="lg:col-span-6 relative w-full flex items-center justify-center py-2"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div 
            ref={wheelRef}
            className="hero-wheel-anim relative w-full aspect-square max-w-[420px] md:max-w-[460px] flex items-center justify-center p-3 transition-transform duration-300 ease-out"
          >
            {/* Background Ambient Glow - Organic pulse */}
            <div className="absolute inset-0 bg-radial from-[#C97A3D]/12 via-transparent to-transparent blur-3xl opacity-80 pointer-events-none animate-pulse" style={{ animationDuration: '4s' }} />

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

            {/* Organic flowing rings - not rigid compass */}
            <svg className="absolute inset-0 w-full h-full text-[#C97A3D]/20 pointer-events-none" viewBox="0 0 500 500">
              {/* Soft organic outer ring */}
              <circle cx="250" cy="250" r="220" stroke="currentColor" strokeWidth="0.5" strokeDasharray="8 12" fill="none" opacity="0.6" className="animate-[spin_60s_linear_infinite]" />
              {/* Middle ring with different dash pattern */}
              <circle cx="250" cy="250" r="175" stroke="currentColor" strokeWidth="0.4" strokeDasharray="4 8" fill="none" opacity="0.4" className="animate-[spin_45s_linear_infinite_reverse]" />
              {/* Inner subtle ring */}
              <circle cx="250" cy="250" r="120" stroke="currentColor" strokeWidth="0.3" fill="none" opacity="0.3" />

              {/* Organic connection lines to nodes - curved, not straight */}
              {NINE_DIMENSIONS.map((dim, idx) => {
                const angle = (idx / 9) * Math.PI * 2 - Math.PI / 2;
                const r = 175;
                const x2 = 250 + Math.cos(angle) * r;
                const y2 = 250 + Math.sin(angle) * r;
                const isActive = activeNode === idx;

                return (
                  <g key={dim.num}>
                    <path 
                      d={`M 250 250 Q ${250 + Math.cos(angle) * 50} ${250 + Math.sin(angle) * 50} ${x2} ${y2}`}
                      stroke={isActive ? '#E0A96D' : 'rgba(201,122,61,0.55)'} 
                      strokeWidth={isActive ? '1.2' : '0.5'}
                      fill="none"
                      className="transition-all duration-700 ease-out"
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

            {/* Central HERO "9" Core Node - Organic with glow */}
            <div className="relative z-20 w-40 h-40 md:w-48 md:h-48 rounded-full bg-[#0d0b0a] border border-[#C97A3D]/50 flex flex-col items-center justify-center p-4 text-center group cursor-pointer transition-all duration-700 hover:scale-110 hover:border-[#C97A3D]/80">
              {/* Subtle glow ring */}
              <div className="absolute inset-0 rounded-full bg-[#C97A3D]/15 blur-xl opacity-60 animate-pulse" style={{ animationDuration: '4s' }} />
              <div className="absolute inset-0 rounded-full border border-[#C97A3D]/40 animate-pulse" style={{ animationDuration: '3s' }} />
              
              <span className="font-heading text-[68px] md:text-[85px] font-medium text-[#E0A96D] leading-none drop-shadow-[0_0_20px_rgba(201,122,61,0.5)] transition-all duration-700 group-hover:drop-shadow-[0_0_30px_rgba(201,122,61,0.8)]">
                9
              </span>
              <span className="font-subheading text-[8px] md:text-[9px] font-bold tracking-[0.25em] text-[#F4F1EB]/70 uppercase -mt-1">
                SYSTEM CORE
              </span>
              <span className="font-script text-[15px] md:text-[18px] text-[#E0A96D] font-normal leading-none mt-0.5 opacity-90">
                Aayam
              </span>
            </div>

            {/* 9 Outer Interactive Dimension Nodes - Organic with glow */}
            {NINE_DIMENSIONS.map((dim, idx) => {
              const angle = (idx / 9) * Math.PI * 2 - Math.PI / 2;
              const radiusPercent = 37;
              const leftPos = 50 + radiusPercent * Math.cos(angle);
              const topPos = 50 + radiusPercent * Math.sin(angle);
              const isActive = activeNode === idx;

              return (
                <div
                  key={dim.num}
                  onClick={() => setActiveNode(idx)}
                  onMouseEnter={() => setActiveNode(idx)}
                  className={`absolute z-30 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-700 flex items-center gap-2 group ${
                    isActive ? 'scale-115 z-40' : 'opacity-70 hover:opacity-100 hover:scale-108'
                  }`}
                  style={{
                    left: `${leftPos}%`,
                    top: `${topPos}%`,
                    animation: isActive ? 'none' : `float ${3 + idx * 0.3}s ease-in-out infinite`,
                    animationDelay: `${idx * 0.2}s`
                  }}
                >
                  {/* Organic glow behind node */}
                  {isActive && (
                    <div className="absolute inset-0 bg-[#C97A3D]/30 blur-2xl rounded-full animate-pulse" style={{ animationDuration: '2.5s' }} />
                  )}
                  
                  {/* Subtle breathing ring for inactive nodes */}
                  {!isActive && (
                    <div className="absolute inset-0 rounded-full border border-[#C97A3D]/10 animate-pulse" style={{ animationDuration: `${2 + idx * 0.2}s` }} />
                  )}
                  
                  {/* Node Circle Badge - softer, more organic */}
                  <div className={`relative w-9 h-9 md:w-11 md:h-11 rounded-full flex items-center justify-center font-subheading text-[10px] md:text-[11px] font-bold transition-all duration-700 border ${
                    isActive 
                      ? 'bg-[#C97A3D] text-[#050505] border-[#E0A96D] shadow-[0_0_30px_rgba(201,122,61,0.6)]' 
                      : 'bg-[#121212]/80 text-[#F4F1EB] border-white/15 group-hover:border-[#C97A3D]/50 group-hover:shadow-[0_0_15px_rgba(201,122,61,0.3)]'
                  }`}>
                    {dim.num}
                  </div>

                  {/* Node Label Text - cleaner */}
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
              );
            })}

            {/* Floating Active Dimension Detail Widget Card - More organic, less infographic */}
            <div 
              key={activeNode}
              className="absolute bottom-6 sm:bottom-4 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-[380px] bg-[#141211]/90 border border-[#C97A3D]/30 backdrop-blur-md rounded-lg p-5 shadow-[0_20px_40px_rgba(0,0,0,0.6)] transition-all duration-700 animate-fadeIn"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-subheading text-[8px] font-bold tracking-[0.3em] text-[#C97A3D]/80 uppercase">
                  DIMENSION {NINE_DIMENSIONS[activeNode].num}
                </span>
                <span className="font-mono text-[8px] text-[#A69E93]/70 uppercase tracking-wider">
                  {NINE_DIMENSIONS[activeNode].category}
                </span>
              </div>
              <h3 className="font-heading text-[18px] font-medium text-[#F4F1EB] leading-none mb-2 tracking-tight">
                {NINE_DIMENSIONS[activeNode].title}
              </h3>
              <p className="font-body text-[11px] text-[#C4C8CF]/80 font-light leading-relaxed">
                {NINE_DIMENSIONS[activeNode].desc}
              </p>
            </div>

          </div>
        </div>

      </div>

    </section>
  );
}
