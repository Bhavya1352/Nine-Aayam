import React from 'react';
import { CursorProvider } from './context/CursorContext';
import Cursor from './components/Cursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Story from './components/Story';
import Philosophy from './components/Philosophy';

export default function App() {
  return (
    <CursorProvider>
      <div className="relative min-h-screen bg-[#040c08] text-[#f3f4f6] overflow-x-hidden">
        <div className="noise-overlay" />
        <div className="ambient-glow glow-1" />
        <div className="ambient-glow glow-2" />

        <Navbar />
        <Hero />
        <Story />
        <Philosophy />
        <Cursor />
      </div>
    </CursorProvider>
  );
}
