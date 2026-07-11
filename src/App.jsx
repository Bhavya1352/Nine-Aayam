import React from 'react';
import { CursorProvider } from './context/CursorContext';
import Cursor from './components/Cursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Manifesto from './components/Manifesto';
import Story from './components/Story';
import Outcomes from './components/Outcomes';
import Boundaries from './components/Boundaries';
import Configurator from './components/Configurator';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';

export default function App() {
  return (
    <CursorProvider>
      <div className="relative min-h-screen bg-[#1B1F24] text-[#C4C8CF] overflow-x-hidden selection:bg-[#C97A3D] selection:text-[#1B1F24]">

        {/* Architectural guidelines noise overlay */}
        <div className="noise-bg" />
        <div className="atmospheric-vignette" />

        <Navbar />
        <Hero />
        <Manifesto />
        <Story />
        <Outcomes />
        <Boundaries />
        <Configurator />
        <Testimonials />
        <Footer />
        <Cursor />
      </div>
    </CursorProvider>
  );
}
