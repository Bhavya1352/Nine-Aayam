import React, { useEffect } from 'react';
import { CursorProvider } from './context/CursorContext';
import Cursor from './components/Cursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Story from './components/Story';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  useEffect(() => {
    // Enhanced smooth section fade transitions with slight parallax
    const sections = document.querySelectorAll('section');
    
    sections.forEach((section, index) => {
      gsap.fromTo(section,
        { 
          opacity: 0.4,
          filter: 'blur(3px)',
          y: 30
        },
        {
          opacity: 1,
          filter: 'blur(0px)',
          y: 0,
          duration: 1.0,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            end: 'top 25%',
            toggleActions: 'play none none reverse',
            scrub: 0.8
          }
        }
      );
    });

    // Enhanced parallax effect for ambient glows with different speeds
    gsap.to('.glow-1', {
      y: -150,
      x: -30,
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 2
      }
    });

    gsap.to('.glow-2', {
      y: 120,
      x: 40,
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 2.5
      }
    });
  }, []);

  return (
    <CursorProvider>
      <div className="relative min-h-screen bg-[#050515] text-[#f3f4f6] overflow-x-hidden">
        <div className="noise-overlay" />
        <div className="ambient-glow glow-1" />
        <div className="ambient-glow glow-2" />

        <Navbar />
        <Hero />
        <Story />
        <Cursor />
      </div>
    </CursorProvider>
  );
}
