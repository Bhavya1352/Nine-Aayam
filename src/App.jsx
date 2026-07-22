import React, { useState } from 'react';
import { CursorProvider } from './context/CursorContext';
import PageLoader from './components/PageLoader';
import Cursor from './components/Cursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Philosophy from './components/Philosophy';
import Manifesto from './components/Manifesto';
import Story from './components/Story';
import Outcomes from './components/Outcomes';
import Boundaries from './components/Boundaries';
import Process from './components/Process';
import Configurator from './components/Configurator';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

export default function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <CursorProvider>
      {!loaded && <PageLoader onComplete={() => setLoaded(true)} />}

      <div className="relative min-h-screen bg-[#050505] text-[#C4C8CF] overflow-x-hidden selection:bg-[#C97A3D] selection:text-[#050505]">

        <div className="noise-bg" />
        <div className="atmospheric-vignette" />

        <Navbar />
        <Hero />
        <Philosophy />
        <Manifesto />
        <Story />
        <Outcomes />
        <Boundaries />
        <Process />
        <Configurator />
        <Testimonials />
        <FAQ />
        <Footer />
        <Cursor />
      </div>
    </CursorProvider>
  );
}
