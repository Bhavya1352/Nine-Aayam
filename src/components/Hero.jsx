import React, { useEffect, useRef } from 'react';
import { useCursor } from '../context/CursorContext';
import { ArrowUpRight } from 'lucide-react';
import MagneticButton from './MagneticButton';

export default function Hero() {
  const { setCursor } = useCursor();
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const scrollIndicatorRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let particles = [];
    const particleCount = 120;
    const connectionDistance = 145;
    
    let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    
    const handleResize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    handleResize();

    let scrollY = 0;
    const handleScroll = () => {
      scrollY = window.scrollY;
      if (scrollIndicatorRef.current) {
        const opacity = Math.max(0, 1 - scrollY / 300);
        scrollIndicatorRef.current.style.opacity = opacity;
      }
    };
    window.addEventListener('scroll', handleScroll);

    class Particle {
      constructor() {
        this.reset();
        this.z = Math.random() * 800;
      }

      reset() {
        this.x = (Math.random() - 0.5) * window.innerWidth * 1.5;
        this.y = (Math.random() - 0.5) * window.innerHeight * 1.5;
        this.z = 800;
        this.vx = (Math.random() - 0.5) * 0.7;
        this.vy = (Math.random() - 0.5) * 0.7;
        this.vz = -0.4 - Math.random() * 1.0;
        this.radius = 1 + Math.random() * 1.8;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        
        const scrollFactor = scrollY * 1.5;
        this.z += this.vz - scrollFactor * 0.05;

        let virtualMouseX = mouse.x - window.innerWidth / 2;
        let virtualMouseY = mouse.y - window.innerHeight / 2;

        let scale = 300 / (this.z + 300);
        let dx = virtualMouseX - (this.x * scale);
        let dy = virtualMouseY - (this.y * scale);
        let dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 180) {
          let force = (180 - dist) / 180;
          this.x -= (dx / dist) * force * 12;
          this.y -= (dy / dist) * force * 12;
        }

        if (this.z <= -300 || Math.abs(this.x) > window.innerWidth * 2 || Math.abs(this.y) > window.innerHeight * 2) {
          this.reset();
        }
      }

      draw() {
        let focalLength = 300;
        let scale = focalLength / (this.z + focalLength);
        let projX = canvas.width / 2 + this.x * scale;
        let projY = canvas.height / 2 + this.y * scale;

        if (projX > 0 && projX < canvas.width && projY > 0 && projY < canvas.height) {
          let opacity = Math.min(1, Math.max(0, 1 - (this.z / 800))) * (1 - scrollY / 600);
          if (opacity <= 0) return;
          
          ctx.beginPath();
          ctx.arc(projX, projY, this.radius * scale * 1.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(16, 185, 129, ${opacity * 0.55})`;
          ctx.fill();
        }
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        let focalLength = 300;
        let p1 = particles[i];
        let scale1 = focalLength / (p1.z + focalLength);
        let x1 = canvas.width / 2 + p1.x * scale1;
        let y1 = canvas.height / 2 + p1.y * scale1;

        for (let j = i + 1; j < particles.length; j++) {
          let p2 = particles[j];
          let scale2 = focalLength / (p2.z + focalLength);
          let x2 = canvas.width / 2 + p2.x * scale2;
          let y2 = canvas.height / 2 + p2.y * scale2;

          let dx = x1 - x2;
          let dy = y1 - y2;
          let distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            let alpha = (1 - distance / connectionDistance) * 0.14 * (1 - scrollY / 600);
            if (alpha > 0) {
              ctx.beginPath();
              ctx.moveTo(x1, y1);
              ctx.lineTo(x2, y2);
              ctx.strokeStyle = `rgba(16, 185, 129, ${alpha})`;
              ctx.lineWidth = 0.55 * Math.min(scale1, scale2);
              ctx.stroke();
            }
          }
        }
      }

      particles.forEach(p => {
        p.update();
        p.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen w-full flex items-center justify-center px-6 py-20 z-10 overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-65 z-0">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>

      <div className="max-w-[900px] text-center flex flex-col items-center justify-center z-10 relative">
        <div 
          className="font-subheading text-[0.85rem] font-bold tracking-[0.35em] text-[#10B981] mb-6 py-2 px-6 bg-[#10B981]/5 border border-[#10B981]/15 rounded-full backdrop-blur-sm"
          onMouseEnter={() => setCursor('view')}
          onMouseLeave={() => setCursor('')}
        >
          NINE DIMENSIONS • ONE CREATIVE SYSTEM
        </div>
        
        <h1 className="font-heading text-5xl md:text-8xl font-black mb-8 leading-[0.95] tracking-tight">
          <span className="bg-gradient-to-r from-white via-white to-[#34D399] bg-clip-text text-transparent">
            NINE AAYAM
          </span>
        </h1>
        
        <p className="text-lg md:text-xl font-body font-normal text-gray-400 max-w-[700px] leading-relaxed mb-12">
          Helping businesses build stronger digital experiences through premium 3D design, branding, and AI-driven video content.
        </p>

        <div className="flex flex-col sm:flex-row gap-5">
          <MagneticButton 
            href="#philosophy" 
            variant="outline" 
            cursorType="explore"
            className="text-[0.95rem] py-3.5 px-8"
          >
            Explore System
          </MagneticButton>
          <MagneticButton 
            href="#connect" 
            variant="primary" 
            className="text-[0.95rem] py-3.5 px-8"
          >
            <span>Start a Project</span>
            <ArrowUpRight className="w-5 h-5" />
          </MagneticButton>
        </div>
      </div>

      <div 
        ref={scrollIndicatorRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-60 transition-opacity duration-300 pointer-events-none"
      >
        <span className="font-subheading text-[10px] font-bold tracking-[0.25em] text-gray-400 uppercase">
          Scroll to Explore
        </span>
        <div className="w-0.5 h-12 bg-white/10 relative overflow-hidden rounded">
          <div className="absolute top-0 left-0 w-full h-[15px] bg-[#10B981] rounded animate-scroll-indicator" />
        </div>
      </div>
    </section>
  );
}
