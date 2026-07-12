import React, { useRef } from 'react';

const items = [
  'Brand Strategy',
  'Graphic Design',
  'Motion Design',
  'UI / UX',
  'Web Development',
  'Copywriting',
  'Social Media',
  'Ad Campaigns',
  'Photo Direction',
];

const Dot = () => (
  <span className="mx-5 sm:mx-7 text-[#C97A3D]/40 text-xs select-none" aria-hidden="true">•</span>
);

export default function Marquee() {
  const trackRef = useRef(null);
  // Triple for seamless loop at all viewport widths
  const track = [...items, ...items, ...items];

  const pause = () => { if (trackRef.current) trackRef.current.style.animationPlayState = 'paused'; };
  const resume = () => { if (trackRef.current) trackRef.current.style.animationPlayState = 'running'; };

  return (
    <div
      className="relative z-10 w-full overflow-hidden border-y border-white/[0.06] py-4 bg-[#050505]"
      onMouseEnter={pause}
      onMouseLeave={resume}
    >
      {/* Fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-24 bg-gradient-to-r from-[#050505] to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-24 bg-gradient-to-l from-[#050505] to-transparent z-10" />

      <div
        ref={trackRef}
        className="flex whitespace-nowrap marquee-track"
      >
        {track.map((item, i) => (
          <React.Fragment key={i}>
            <span className="font-subheading text-[10px] sm:text-[11px] font-semibold tracking-[0.25em] uppercase text-[#C4C8CF]/50 select-none shrink-0">
              {item}
            </span>
            <Dot />
          </React.Fragment>
        ))}
      </div>

      <style>{`
        .marquee-track {
          animation: marquee-scroll 36s linear infinite;
          will-change: transform;
        }
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-33.333%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation: none; }
        }
      `}</style>
    </div>
  );
}
