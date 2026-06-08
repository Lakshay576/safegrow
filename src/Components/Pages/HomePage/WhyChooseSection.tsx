"use client";

export default function WhyChooseSection() {
  return (
    <section id="why-us" className="bg-[var(--bg)] py-24 px-6 relative overflow-hidden transition-colors duration-300 font-sans">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--primary)] opacity-[0.05] blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1200px] mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-16 md:mb-24 animate-fadeUp">
          <div className="
            inline-flex items-center gap-2 mb-6
            bg-[var(--surface)] border border-[var(--secondary-lt)]
            text-[var(--ink-muted)] text-[11px] font-semibold
            tracking-[0.15em] uppercase px-4 py-1.5 rounded-full
          ">
            <svg className="w-3 h-3 text-[var(--primary)]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" /></svg>
            Why Choose SafeGrow
          </div>
          <h2 className="text-[var(--ink)] text-4xl md:text-5xl font-bold tracking-tight font-sora mb-6">
            Engineered for <br className="hidden md:block" /> Uncompromised Growth
          </h2>
          <p className="text-[var(--ink-muted)] text-lg max-w-2xl mx-auto">
            We support investors at every stage of their wealth generation journey, combining institutional-grade risk management with autonomous AI execution.
          </p>
        </div>

        {/* Staggered Masonry Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start">
          
          {/* Column 1 (Shifted down slightly) */}
          <div className="flex flex-col gap-6 lg:gap-8 md:pt-16">
            
            {/* Card: Proven at Scale */}
            <div className="bg-[var(--surface)] border border-[var(--secondary-lt)] hover:border-[var(--primary)] p-8 rounded-3xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[var(--bg)]">
              <div className="w-12 h-12 rounded-2xl bg-[var(--primary-lt)] flex items-center justify-center mb-6 border border-[var(--primary)] border-opacity-20">
                <svg className="w-6 h-6 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[var(--ink)] mb-3 font-sora">Proven At Scale</h3>
              <p className="text-[var(--ink-muted)] text-sm leading-relaxed">
                Trusted by elite investors and institutions with active funds totalling over <span className="font-semibold text-[var(--ink)]">₹500+ Crores</span>, delivering consistent risk-adjusted returns.
              </p>
            </div>

            {/* Card: Recommendations */}
            <div className="bg-[var(--surface)] border border-[var(--secondary-lt)] hover:border-[var(--primary)] p-8 rounded-3xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[var(--bg)]">
              <div className="w-12 h-12 rounded-2xl bg-orange-500/10 dark:bg-orange-500/20 flex items-center justify-center mb-6 border border-orange-500/30">
                <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[var(--ink)] mb-3 font-sora">Tailored Recommendations</h3>
              <p className="text-[var(--ink-muted)] text-sm leading-relaxed">
                Receive ongoing stock and options recommendations dynamically calibrated to your specific portfolio weightage and personal financial goals.
              </p>
            </div>

          </div>

          {/* Column 2 (Center Content) */}
          <div className="flex flex-col gap-6 lg:gap-8">
            
            {/* Card: Broker Network */}
            <div className="bg-[var(--surface)] border border-[var(--secondary-lt)] hover:border-[var(--primary)] p-8 rounded-3xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[var(--bg)]">
              <div className="w-12 h-12 rounded-2xl bg-[var(--secondary-lt)] flex items-center justify-center mb-6 border border-[var(--secondary)] border-opacity-30">
                <svg className="w-6 h-6 text-[var(--secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[var(--ink)] mb-3 font-sora">Backed by a Strong Network</h3>
              <p className="text-[var(--ink-muted)] text-sm leading-relaxed">
                Partnered directly with <span className="font-semibold text-[var(--ink)]">32+ leading broking houses</span> including Zerodha, Upstox, and 5paisa for seamless, zero-latency execution.
              </p>
            </div>

            {/* Center Graphic Tile (The Anchor) */}
            <div className="relative aspect-square w-full rounded-3xl bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] p-1 overflow-hidden shadow-xl shadow-[var(--primary)]/20 transition-transform duration-500 hover:scale-[1.02]">
              {/* Inner glowing effect */}
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 mix-blend-overlay"></div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-20 blur-2xl rounded-full"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-black opacity-20 blur-2xl rounded-full"></div>
              
              <div className="w-full h-full bg-[var(--bg)]/10 backdrop-blur-sm rounded-[22px] flex items-center justify-center relative z-10 border border-white/10">
                {/* Custom SafeGrow Icon Logo inside the tile */}
                <svg className="w-24 h-24 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  <circle cx="12" cy="12" r="3" fill="currentColor" className="animate-pulse" />
                </svg>
              </div>
            </div>

            {/* Card: Emotionless Execution */}
            <div className="bg-[var(--surface)] border border-[var(--secondary-lt)] hover:border-[var(--primary)] p-8 rounded-3xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[var(--bg)]">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 dark:bg-purple-500/20 flex items-center justify-center mb-6 border border-purple-500/30">
                <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[var(--ink)] mb-3 font-sora">Emotionless Execution</h3>
              <p className="text-[var(--ink-muted)] text-sm leading-relaxed">
                Remove human bias from the equation. Our algorithms execute entry and exit mandates strictly based on mathematical probabilities, not market panic.
              </p>
            </div>

          </div>

          {/* Column 3 (Shifted down heavily) */}
          <div className="flex flex-col gap-6 lg:gap-8 md:pt-32">
            
            {/* Card: Always-On Risk Intelligence */}
            <div className="bg-[var(--surface)] border border-[var(--secondary-lt)] hover:border-[var(--primary)] p-8 rounded-3xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[var(--bg)]">
              <div className="w-12 h-12 rounded-2xl bg-red-500/10 dark:bg-red-500/20 flex items-center justify-center mb-6 border border-red-500/30">
                <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[var(--ink)] mb-3 font-sora">Always-On Risk Intelligence</h3>
              <p className="text-[var(--ink-muted)] text-sm leading-relaxed">
                Secure your capital with a personalized portfolio guarded by an inbuilt <span className="font-semibold text-[var(--ink)]">24x7 Risk Management System</span> that identifies threats instantly.
              </p>
            </div>

            {/* Card: Smart Autopilot */}
            <div className="bg-[var(--surface)] border border-[var(--secondary-lt)] hover:border-[var(--primary)] p-8 rounded-3xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[var(--bg)]">
              <div className="w-12 h-12 rounded-2xl bg-[var(--primary-lt)] flex items-center justify-center mb-6 border border-[var(--primary)] border-opacity-20">
                <svg className="w-6 h-6 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[var(--ink)] mb-3 font-sora">Smart Autopilot</h3>
              <p className="text-[var(--ink-muted)] text-sm leading-relaxed">
                Set your parameters once and let the engine drive. Dynamic rebalancing, automatic stop-loss adjustments, and deep liquidity routing handled seamlessly.
              </p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}