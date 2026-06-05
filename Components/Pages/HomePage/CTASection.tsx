"use client";

import React from "react";

export default function CTASection() {
  return (
    <section className="bg-[var(--bg)] py-24 px-6 relative transition-colors duration-300 font-sans">
      
      {/* Inline animations for the trajectory lines */}
      <style>{`
        @keyframes dash {
          to {
            stroke-dashoffset: -100;
          }
        }
        .animate-dash {
          stroke-dasharray: 6, 6;
          animation: dash 3s linear infinite;
        }
      `}</style>

      {/* Main Dark CTA Card */}
      <div className="max-w-[1200px] mx-auto bg-[#0B0F19] rounded-[2.5rem] relative overflow-hidden p-10 md:p-16 lg:p-20 shadow-2xl border border-[#1E2638]">
        
        {/* Abstract Dotted Map / Grid Background */}
        <div 
          className="absolute inset-0 opacity-[0.15] pointer-events-none mix-blend-screen"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.4) 1px, transparent 0)`,
            backgroundSize: '24px 24px',
            maskImage: 'radial-gradient(ellipse at 70% 50%, black 20%, transparent 70%)',
            WebkitMaskImage: 'radial-gradient(ellipse at 70% 50%, black 20%, transparent 70%)'
          }}
        />

        {/* Ambient Glows */}
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[var(--primary)] opacity-[0.15] blur-[130px] rounded-full pointer-events-none" />
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-[var(--primary)] opacity-[0.05] blur-[100px] rounded-full pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-8 h-full">
          
          {/* Left Side: Content */}
          <div className="w-full lg:w-[45%] flex flex-col items-start text-left animate-fadeUp">
            
        
            {/* Headline */}
            <h2 className="text-white text-4xl md:text-5xl lg:text-[56px] font-bold font-sora mb-10 leading-[1.1] tracking-tight">
              Launch Your <br />
              Wealth Strategy <br />
              with SafeGrow
            </h2>

            {/* CTA Button */}
            <button className="
              group inline-flex items-center justify-center gap-3
              bg-[var(--primary)] text-[#0A0F1E]
              text-base font-bold px-8 py-4 rounded-full
              transition-all duration-300
              hover:opacity-90 hover:shadow-[0_0_20px_rgba(46,244,197,0.4)]
              hover:-translate-y-1
            ">
              Sign Up Now
              <div className="w-8 h-8 rounded-full bg-[#0A0F1E]/10 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
                <svg className="w-4 h-4 text-[#0A0F1E]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
          </div>

          {/* Right Side: Trajectory Nodes Graphic */}
          <div className="w-full lg:w-[55%] h-[400px] relative hidden md:block">
            
            {/* Animated Trajectory SVG Arcs */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 600 400" preserveAspectRatio="xMidYMid slice">
              {/* Arc 1 (Bottom Left to Top Middle) */}
              <path 
                d="M 50 280 Q 200 150 350 120" 
                fill="none" 
                stroke="var(--primary)" 
                strokeWidth="1.5" 
                opacity="0.4"
                className="animate-dash"
              />
              {/* Arc 2 (Top Middle to Right Edge) */}
              <path 
                d="M 350 120 Q 450 100 550 250" 
                fill="none" 
                stroke="var(--primary)" 
                strokeWidth="1.5" 
                opacity="0.4"
                className="animate-dash"
                style={{ animationDelay: '1s' }}
              />
              {/* Arc 3 (Middle to Bottom Right) */}
              <path 
                d="M 250 220 Q 400 200 500 320" 
                fill="none" 
                stroke="var(--primary)" 
                strokeWidth="1.5" 
                opacity="0.2"
                className="animate-dash"
                style={{ animationDelay: '2s' }}
              />
            </svg>

            {/* Floating Node 1: Signal Detected */}
            <div className="absolute left-[5%] top-[65%] -translate-y-1/2 flex items-center gap-3 bg-[#121826]/90 border border-[#2A344A] rounded-full p-2 pr-5 backdrop-blur-md shadow-lg animate-float-slow">
              <div className="w-8 h-8 rounded-full bg-[var(--primary-lt)] text-[var(--primary)] flex items-center justify-center">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
              </div>
              <div>
                <div className="text-white text-[11px] font-semibold">AI Signal</div>
                <div className="text-[var(--primary)] text-[10px] font-medium">+ High Conviction</div>
              </div>
            </div>

            {/* Floating Node 2: Execute Order */}
            <div className="absolute left-[40%] top-[25%] -translate-y-1/2 flex items-center gap-3 bg-[#121826]/90 border border-[#2A344A] rounded-full p-2 pr-5 backdrop-blur-md shadow-lg animate-float-medium">
              <div className="w-8 h-8 rounded-full bg-[#3A5A8F]/20 text-[#4A6FA5] flex items-center justify-center">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
              </div>
              <div>
                <div className="text-white text-[11px] font-semibold">Execute Spread</div>
                <div className="text-[#8A9AB5] text-[10px] font-medium">Zero Latency</div>
              </div>
            </div>

            {/* Floating Node 3: Book Profit */}
            <div className="absolute right-[5%] top-[60%] -translate-y-1/2 flex items-center gap-3 bg-[#121826]/90 border border-[#2A344A] rounded-full p-2 pr-5 backdrop-blur-md shadow-lg animate-float-slow" style={{ animationDelay: '1s' }}>
              <div className="w-8 h-8 rounded-full bg-[var(--primary-lt)] text-[var(--primary)] flex items-center justify-center">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
              </div>
              <div>
                <div className="text-white text-[11px] font-semibold">Profit Booked</div>
                <div className="text-[var(--primary)] text-[10px] font-medium">+ 1.54L</div>
              </div>
            </div>

            {/* Floating Node 4: Risk Mitigated */}
            <div className="absolute left-[25%] top-[50%] -translate-y-1/2 flex items-center gap-3 bg-[#121826]/90 border border-[#2A344A] rounded-full p-2 pr-5 backdrop-blur-md shadow-lg animate-float-medium" style={{ animationDelay: '0.5s' }}>
              <div className="w-8 h-8 rounded-full bg-orange-500/10 text-orange-400 flex items-center justify-center">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
              </div>
              <div>
                <div className="text-white text-[11px] font-semibold">Risk Managed</div>
                <div className="text-orange-400 text-[10px] font-medium">Stoploss Shifted</div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}