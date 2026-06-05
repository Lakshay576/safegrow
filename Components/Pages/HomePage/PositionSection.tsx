"use client";

export default function PositionsSection() {
  return (
    <section className="bg-[var(--bg)] py-24 px-6 relative overflow-hidden transition-colors duration-300 font-sans">
      
      {/* Gentle Floating Animation Keyframes */}
      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        @keyframes float-medium {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        .animate-float-slow { animation: float-slow 7s ease-in-out infinite; }
        .animate-float-medium { animation: float-medium 5s ease-in-out infinite; }
      `}</style>

      <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-16">
        
        {/* Left Content Area */}
        <div className="w-full lg:w-[40%] animate-fadeUp z-10">
          <h4 className="text-[var(--primary)] text-sm font-bold tracking-widest uppercase mb-4">
            Portfolio Intelligence
          </h4>
          <h2 className="text-[var(--ink)] text-4xl md:text-5xl font-bold mb-6 tracking-tight font-sora leading-[1.15]">
            Analyse or <br />
            Manage your <br />
            wealth
          </h2>
          <p className="text-[var(--ink-muted)] text-lg leading-relaxed max-w-[400px]">
            Analyse your AI-driven positions, manage algorithmic risks, group assets intelligently, and let SafeGrow optimize your yield automatically.
          </p>
        </div>

        {/* Right Graphic Assembly (CSS UI instead of static image) */}
        <div className="w-full lg:w-[55%] relative flex justify-center items-center min-h-[550px] scale-90 md:scale-100 z-10">
          
          {/* Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[var(--primary)] opacity-[0.12] blur-[100px] rounded-full pointer-events-none" />

          {/* Main Base Card (The underlying dashboard) */}
          <div className="absolute w-full max-w-[480px] bg-[var(--surface)] border border-[var(--secondary-lt)] rounded-2xl p-5 shadow-lg shadow-[var(--bg)]/50">
            
            {/* Strategy Group 1 */}
            <div className="mb-6">
              <h3 className="text-[var(--ink)] font-semibold text-sm mb-3">SafeGrow Alpha Spread</h3>
              
              <div className="flex justify-between items-center text-[10px] text-[var(--ink-muted)] mb-3 pb-3 border-b border-[var(--secondary-lt)]">
                <div>
                  <span className="block mb-1">Total P&L</span>
                  <span className="text-[var(--primary)] font-medium text-xs">+1.18L</span>
                </div>
                <div>
                  <span className="block mb-1">Booked</span>
                  <span className="text-[var(--primary)] font-medium text-xs">+5,460</span>
                </div>
                <div>
                  <span className="block mb-1">Unbooked</span>
                  <span className="text-[var(--primary)] font-medium text-xs">+1.12L</span>
                </div>
                <div>
                  <span className="block mb-1">Max profit</span>
                  <span className="text-[var(--ink)] font-medium text-xs">+10.34L</span>
                </div>
                <div>
                  <span className="block mb-1">Max loss</span>
                  <span className="text-[var(--ink)] font-medium text-xs">31,000</span>
                </div>
              </div>

              {/* Data Rows */}
              <div className="space-y-2">
                {[
                  { name: "SGW 25800 CE", qty: "5200", avg: "98", ltp: "181", pl: "+9,555", color: "text-[var(--primary)]" },
                  { name: "SGW 26000 CE", qty: "5200", avg: "290", ltp: "384", pl: "-4,095", color: "text-[#EF4444]" },
                ].map((row, i) => (
                  <div key={i} className="flex justify-between items-center text-[11px] bg-[var(--bg)] p-2 rounded border border-[var(--secondary-lt)]">
                    <div className="flex items-center gap-2 w-[35%]">
                      <div className="w-3 h-3 rounded bg-[var(--primary-lt)] border border-[var(--primary)] flex items-center justify-center">
                        <svg className="w-2 h-2 text-[var(--primary)]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                      </div>
                      <span className="text-[var(--ink)] font-medium truncate">{row.name}</span>
                    </div>
                    <span className="text-[var(--ink-muted)] w-[10%] text-right">{row.qty}</span>
                    <span className="text-[var(--ink-muted)] w-[10%] text-right">{row.avg}</span>
                    <span className="text-[var(--ink-muted)] w-[10%] text-right">{row.ltp}</span>
                    <span className={`${row.color} font-medium w-[20%] text-right`}>{row.pl}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Strategy Group 2 */}
            <div>
              <h3 className="text-[var(--ink)] font-semibold text-sm mb-3">Yield Generation Core</h3>
              <div className="flex justify-between items-center text-[10px] text-[var(--ink-muted)] mb-3 pb-3 border-b border-[var(--secondary-lt)]">
                <div>
                  <span className="block mb-1">Total P&L</span>
                  <span className="text-[var(--primary)] font-medium text-xs">+3.14L</span>
                </div>
                <div>
                  <span className="block mb-1">Booked</span>
                  <span className="text-[var(--primary)] font-medium text-xs">+1.23L</span>
                </div>
                <div>
                  <span className="block mb-1">Unbooked</span>
                  <span className="text-[var(--primary)] font-medium text-xs">+1.91L</span>
                </div>
                <div>
                  <span className="block mb-1">Max profit</span>
                  <span className="text-[var(--ink)] font-medium text-xs">4.27L</span>
                </div>
                <div>
                  <span className="block mb-1">Max loss</span>
                  <span className="text-[#EF4444] font-medium text-xs">-11.33L</span>
                </div>
              </div>
               <div className="space-y-2 opacity-60">
                <div className="flex justify-between items-center text-[11px] bg-[var(--bg)] p-2 rounded border border-[var(--secondary-lt)]">
                  <div className="flex items-center gap-2 w-[35%]">
                    <div className="w-3 h-3 rounded bg-[var(--primary-lt)] border border-[var(--primary)]" />
                    <span className="text-[var(--ink)] font-medium truncate">SGW 60100 PE</span>
                  </div>
                  <span className="text-[var(--ink-muted)] w-[10%] text-right">160</span>
                  <span className="text-[var(--ink-muted)] w-[10%] text-right">139</span>
                  <span className="text-[var(--ink-muted)] w-[10%] text-right">98</span>
                  <span className="text-[#EF4444] font-medium w-[20%] text-right">-4,095</span>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Top Right Card (Summary) */}
          <div className="absolute -top-6 -right-4 md:-right-12 w-[260px] bg-[var(--surface)] border border-[var(--secondary-lt)] rounded-xl p-4 shadow-2xl animate-float-slow z-20 backdrop-blur-md">
            <div className="flex bg-[var(--bg)] rounded-md p-1 mb-4 border border-[var(--secondary-lt)]">
              <button className="flex-1 bg-[var(--primary)] text-[var(--bg)] text-xs font-semibold py-1.5 rounded">Positions</button>
              <button className="flex-1 text-[var(--ink-muted)] text-xs font-medium py-1.5">Groups</button>
            </div>
            <div className="flex justify-between items-center mb-4 text-xs">
              <div>
                <span className="block text-[var(--ink-muted)] mb-1">Total P&L</span>
                <span className="text-[var(--primary)] font-bold text-lg">+4.2L</span>
              </div>
              <div className="text-right">
                <span className="block text-[var(--ink-muted)] mb-1">Booked P&L</span>
                <span className="text-[var(--primary)] font-medium">+1.53L</span>
              </div>
            </div>
            <div className="flex justify-between items-center pt-3 border-t border-[var(--secondary-lt)]">
              <div className="flex items-center gap-2 text-[10px] text-[var(--ink-muted)]">
                <div className="w-6 h-3 bg-[var(--primary)] rounded-full relative">
                  <div className="w-2.5 h-2.5 bg-[var(--bg)] rounded-full absolute top-[1px] right-[1px]"></div>
                </div>
                Closed positions
              </div>
              <span className="text-[var(--primary)] text-[10px] font-semibold cursor-pointer">View Funds →</span>
            </div>
          </div>

          {/* Floating Bottom Right Card (Actions Menu) */}
          <div className="absolute -bottom-10 right-4 md:-right-8 w-[220px] bg-[var(--surface)] border border-[var(--secondary-lt)] rounded-xl overflow-hidden shadow-2xl animate-float-medium z-30" style={{ animationDelay: "1.5s" }}>
            <div className="bg-[var(--bg)] px-4 py-3 border-b border-[var(--secondary-lt)] flex justify-between items-center">
              <span className="text-[var(--ink-muted)] text-xs font-semibold uppercase tracking-wider">Actions</span>
              <span className="text-[var(--ink-muted)] text-lg leading-none">&times;</span>
            </div>
            <div className="p-2 space-y-1 flex flex-col">
              <button className="flex items-center gap-3 px-3 py-2 text-sm text-[var(--primary)] bg-[var(--primary-lt)] rounded-lg font-medium transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                AI Analyse
              </button>
              {[
                { icon: "M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14", text: "Open in Builder" },
                { icon: "M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1", text: "Exit Positions (5)" },
                { icon: "M12 4v16m8-8H4", text: "Add to Group" },
                { icon: "M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z", text: "Add to Drafts" },
                { icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", text: "Smart Stoploss" }
              ].map((item, i) => (
                <button key={i} className="flex items-center gap-3 px-3 py-2 text-sm text-[var(--ink)] hover:bg-[var(--secondary-lt)] rounded-lg transition-colors text-left">
                  <svg className="w-4 h-4 text-[var(--ink-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} /></svg>
                  {item.text}
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}