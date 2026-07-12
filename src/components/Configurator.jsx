import React, { useState, useEffect, useRef } from 'react';
import { useCursor } from '../context/CursorContext';
import { Copy, Check, Send } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const dimensions = [
  { id: 1, label: "Brand Strategy & Identity", code: "BSD" },
  { id: 2, label: "Graphic Design & Collateral", code: "GDC" },
  { id: 3, label: "Content Strategy & Copywriting", code: "CSC" },
  { id: 4, label: "Social Media Creative", code: "SMC" },
  { id: 5, label: "Advertising & Campaign Creatives", code: "ACC" },
  { id: 6, label: "Video, Reels & Motion Design", code: "VRM" },
  { id: 7, label: "Photography & Production Direction", code: "PPD" },
  { id: 8, label: "UI/UX Design", code: "UXD" },
  { id: 9, label: "Website & Landing Page Design", code: "WLD" }
];

export default function Configurator() {
  const { setCursor } = useCursor();
  const sectionRef = useRef(null);
  const [selected, setSelected] = useState([1, 4, 8, 9]);
  const [copied, setCopied] = useState(false);
  const [scopeScale, setScopeScale] = useState('launch');
  const [timelineIntensity, setTimelineIntensity] = useState('standard');

  useEffect(() => {
    const ctx = gsap.context(() => {

      gsap.fromTo('.config-header',
        { opacity: 0, y: 28 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true }
        }
      );

      gsap.fromTo('.config-form',
        { opacity: 0, y: 36 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: 0.15,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', once: true }
        }
      );

      gsap.fromTo('.config-summary',
        { opacity: 0, x: 30 },
        {
          opacity: 1, x: 0, duration: 0.9, ease: 'power3.out', delay: 0.25,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', once: true }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggleDimension = (id) => {
    if (selected.includes(id)) {
      setSelected(selected.filter(x => x !== id));
    } else {
      setSelected([...selected, id].sort((a, b) => a - b));
    }
  };

  const handleCopyBrief = () => {
    const activeNames = selected.map(id => {
      const dim = dimensions.find(d => d.id === id);
      return `Dimension 0${dim.id}: ${dim.label} [${dim.code}]`;
    }).join('\n');

    const briefText = `NINE AAYAM — BRAND CONFIGURATOR BRIEF\n` +
      `-------------------------------------------\n` +
      `Selected Dimensions of Creative Growth:\n${activeNames}\n\n` +
      `System Parameters:\n` +
      `- Scope Scale: ${scopeScale.toUpperCase()}\n` +
      `- Timeline: ${timelineIntensity.toUpperCase()}\n\n` +
      `Tagline: Nine Aayam — Nine Dimensions. One Creative System.\n` +
      `Compiled on: ${new Date().toLocaleDateString()}`;

    navigator.clipboard.writeText(briefText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const emailSubject = encodeURIComponent("Creative System Brief - Nine Aayam");
  const emailBody = encodeURIComponent(
    `Hi Team Nine Aayam,\n\nWe have configured our creative system brief. Details:\n\n` +
    selected.map(id => `- Dimension 0${id}: ${dimensions.find(d => d.id === id).label}`).join('\n') +
    `\n\nParameters:\n- Scope Scale: ${scopeScale.toUpperCase()}\n- Timeline: ${timelineIntensity.toUpperCase()}\n\n` +
    `Best regards,\n[Your Name]`
  );

  return (
    <section 
      ref={sectionRef}
      id="configurator"
      className="relative z-10 py-12 sm:py-16 px-6 md:px-12 lg:px-16 bg-[#1B1F24]"
    >
      <div className="blueprint-grid-line vertical left-6 md:left-12 lg:left-16 hidden sm:block" />

      <div className="max-w-[1200px] mx-auto relative z-10 pl-0 sm:pl-4 md:pl-8 lg:pl-12">
        
        {/* Header */}
        <div className="config-header flex flex-col items-start mb-12 max-w-[700px] text-left" style={{ opacity: 0 }}>
          <span className="font-subheading text-[8px] sm:text-[9px] tracking-[0.3em] uppercase font-bold text-gray-500 block mb-3 select-none">
            05 // BRIEF BUILDER
          </span>
          <h2 className="font-heading text-xl sm:text-2xl md:text-3xl font-medium tracking-tight text-[#F4F1EB] mb-4">
            Configure Your Creative System
          </h2>
          <p className="font-body text-[#C4C8CF] text-sm sm:text-base leading-relaxed">
            Select the creative dimensions your business needs, choose your scope parameters, and compile a structured creative brief.
          </p>
        </div>

        {/* Clean Form Layout */}
        <div className="grid lg:grid-cols-12 gap-6 md:gap-8 lg:gap-12 items-start">
          
          {/* Form Side (Col 7) */}
          <div className="config-form lg:col-span-7 flex flex-col gap-6 md:gap-8 text-left" style={{ opacity: 0 }}>
            
            {/* Dimensions Multi-Select */}
            <div>
              <span className="font-subheading text-[9px] font-bold text-gray-500 tracking-widest block mb-4 select-none">
                01 / SELECT CREATIVE DIMENSIONS
              </span>
              <div className="flex flex-wrap gap-2.5">
                {dimensions.map((dim) => {
                  const isSelected = selected.includes(dim.id);
                  return (
                    <button
                      key={dim.id}
                      type="button"
                      onClick={() => toggleDimension(dim.id)}
                      onMouseEnter={() => setCursor('view')}
                      onMouseLeave={() => setCursor('')}
                      className={`py-1.5 px-3 sm:py-2 sm:px-4 rounded border text-[9px] sm:text-[10px] font-subheading tracking-wider uppercase transition-all duration-350 ${
                        isSelected
                          ? 'bg-[#C97A3D] border-[#C97A3D] text-[#1B1F24] font-bold'
                          : 'bg-[#2C333D] border-white/[0.08] text-[#C4C8CF] hover:border-white/20 hover:text-[#F4F1EB]'
                      }`}
                    >
                      {dim.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Scale and Timeline Selectors */}
            <div className="grid sm:grid-cols-2 gap-6 pt-8">
              
              {/* Scope Scale Selector */}
              <div className="flex flex-col gap-3">
                <span className="font-subheading text-[9px] font-bold text-gray-550 tracking-widest block select-none">
                  02 / SELECT SCOPE SCALE
                </span>
                <div className="flex flex-col gap-2">
                  {[
                    { id: 'minimalist', label: 'Minimalist Startup' },
                    { id: 'launch', label: 'Launch Scale' },
                    { id: 'leader', label: 'Market Leader Campaign' }
                  ].map((scale) => (
                    <button
                      key={scale.id}
                      type="button"
                      onClick={() => setScopeScale(scale.id)}
                      className={`py-2 px-4 rounded text-xs font-body text-left border transition-all duration-200 ${
                        scopeScale === scale.id
                          ? 'border-[#C97A3D] bg-[#C97A3D]/5 text-[#C97A3D] font-semibold'
                          : 'border-white/[0.08] bg-[#2C333D] text-[#C4C8CF] hover:text-[#F4F1EB]'
                      }`}
                    >
                      {scale.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Timeline Selector */}
              <div className="flex flex-col gap-3">
                <span className="font-subheading text-[9px] font-bold text-gray-550 tracking-widest block select-none">
                  03 / CHOOSE TIMELINE
                </span>
                <div className="flex flex-col gap-2">
                  {[
                    { id: 'standard', label: 'Standard Delivery' },
                    { id: 'accelerated', label: 'Accelerated Sprint' }
                  ].map((timeline) => (
                    <button
                      key={timeline.id}
                      type="button"
                      onClick={() => setTimelineIntensity(timeline.id)}
                      className={`py-2 px-4 rounded text-xs font-body text-left border transition-all duration-200 ${
                        timelineIntensity === timeline.id
                          ? 'border-[#C97A3D] bg-[#C97A3D]/5 text-[#C97A3D] font-semibold'
                          : 'border-white/[0.08] bg-[#2C333D] text-[#C4C8CF] hover:text-[#F4F1EB]'
                      }`}
                    >
                      {timeline.label}
                    </button>
                  ))}
                </div>
              </div>

            </div>

          </div>

          {/* Summary/Actions Side (Col 5) */}
          <div className="config-summary lg:col-span-5 text-left" style={{ opacity: 0 }}>
            <div className="card-lift bg-[#2C333D] border border-white/[0.08] rounded-xl p-5 sm:p-6 md:p-8 flex flex-col justify-between min-h-[280px] md:min-h-[300px] hover:border-[#C97A3D]/20 transition-colors">
              
              <div>
                <span className="font-subheading text-[9px] font-bold text-[#C97A3D] tracking-widest block mb-4 uppercase select-none">
                  Brief Summary
                </span>
                
                <div className="flex flex-col gap-4 font-body text-xs text-[#C4C8CF]">
                  <div>
                    <span className="text-gray-400 block mb-1">Selected Dimensions ({selected.length})</span>
                    <p className="font-semibold text-[#F4F1EB] leading-relaxed">
                      {selected.length === 0 
                        ? 'None selected' 
                        : selected.map(id => dimensions.find(d => d.id === id).label).join(', ')}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div>
                      <span className="text-gray-400 block mb-1">Scope Scale</span>
                      <p className="font-semibold text-[#F4F1EB] uppercase text-[10px] tracking-wider">{scopeScale}</p>
                    </div>
                    <div>
                      <span className="text-gray-400 block mb-1">Timeline</span>
                      <p className="font-semibold text-[#F4F1EB] uppercase text-[10px] tracking-wider">{timelineIntensity}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mt-8 pt-6 select-none">
                <button
                  type="button"
                  disabled={selected.length === 0}
                  onClick={handleCopyBrief}
                  onMouseEnter={() => setCursor('connect')}
                  onMouseLeave={() => setCursor('')}
                  className="flex-1 flex items-center justify-center gap-1.5 py-3 border border-white/10 hover:border-[#C97A3D]/40 disabled:opacity-40 rounded text-[9px] font-subheading font-bold text-[#F4F1EB] tracking-wider uppercase transition-all duration-300"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-green-550" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-[#C97A3D]" />
                      <span>Copy Brief</span>
                    </>
                  )}
                </button>

                <a
                  href={selected.length === 0 ? "#" : `mailto:connect@nayagrowth.com?subject=${emailSubject}&body=${emailBody}`}
                  onClick={(e) => selected.length === 0 && e.preventDefault()}
                  onMouseEnter={() => setCursor('connect')}
                  onMouseLeave={() => setCursor('')}
                  className="flex-1 flex items-center justify-center gap-1.5 py-3 bg-[#C97A3D] disabled:opacity-40 hover:bg-[#C97A3D]/90 text-[#1B1F24] rounded text-[9px] font-subheading font-bold tracking-wider uppercase transition-all duration-300 text-center"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Brief</span>
                </a>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
