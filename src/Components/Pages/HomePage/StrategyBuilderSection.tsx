"use client";

import { useState, useEffect } from "react";

export default function StrategyBuilderSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  // 4 Distinct Chart Configurations
  const chartStates = [
    {
      name: "Bull Call Spread",
      expiryPath: "M 0 350 L 350 350 L 550 50 L 1000 50",
      targetPath: "M 0 350 C 300 350, 450 300, 550 150 C 650 50, 1000 50, 1000 50",
      profit: "+1.08L (+5%)",
      maxProfit: "+3.15L",
      maxLoss: "-3.35L",
      pop: "49%",
    },
    {
      name: "Bear Put Spread",
      expiryPath: "M 0 50 L 450 50 L 650 350 L 1000 350",
      targetPath: "M 0 50 C 300 50, 450 100, 550 250 C 650 350, 1000 350, 1000 350",
      profit: "+2.15L (+12%)",
      maxProfit: "+4.20L",
      maxLoss: "-1.80L",
      pop: "55%",
    },
    {
      name: "Iron Condor",
      expiryPath: "M 0 350 L 250 350 L 350 100 L 650 100 L 750 350 L 1000 350",
      targetPath: "M 0 350 C 200 350, 300 150, 500 150 C 700 150, 800 350, 1000 350",
      profit: "+0.85L (+4%)",
      maxProfit: "+1.25L",
      maxLoss: "-4.50L",
      pop: "72%",
    },
    {
      name: "Long Straddle",
      expiryPath: "M 0 50 L 500 350 L 1000 50",
      targetPath: "M 0 100 C 400 300, 600 300, 1000 100",
      profit: "+4.20L (+22%)",
      maxProfit: "Unlimited",
      maxLoss: "-2.10L",
      pop: "41%",
    }
  ];

  const currentChart = chartStates[activeIndex];

  // Auto-cycle the charts every 2.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % chartStates.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [chartStates.length]);

  return (
    <section className="bg-[var(--bg)] py-24 px-6 relative transition-colors duration-300 font-sans">
      <div className="max-w-[1200px] mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
          <div className="max-w-2xl animate-fadeUp">
            <h2 className="text-[var(--ink)] text-3xl md:text-4xl font-bold mb-4 tracking-tight font-sora">
              Build Strategies without Spreadsheets
            </h2>
            <p className="text-[var(--ink-muted)] text-base md:text-lg leading-relaxed">
              SafeGrow AI automatically scans and projects outcomes for complex market environments. 
              Visualize projections and analyze risk instantly.
            </p>
          </div>
          <button className="
            shrink-0 inline-flex items-center justify-center
            bg-[var(--primary)] text-[var(--bg)]
            text-[15px] font-semibold px-8 py-3.5 rounded-[10px]
            transition-all duration-200 cursor-pointer
            hover:opacity-90 hover:-translate-y-0.5 shadow-sm
          ">
            Create Custom Strategy
          </button>
        </div>

        {/* Chart & Data Panel */}
        <div className="w-full bg-[var(--surface)] border border-[var(--secondary-lt)] rounded-2xl p-6 flex flex-col pointer-events-none">
          
          {/* Dynamic Strategy Header Nav */}
          <div className="flex items-center gap-8 border-b border-[var(--secondary-lt)] pb-3 mb-8 overflow-x-auto whitespace-nowrap">
            {chartStates.map((strat, i) => {
              const isActive = i === activeIndex;
              return (
                <div 
                  key={i} 
                  className={`text-sm font-semibold relative transition-colors duration-300 ${isActive ? "text-[var(--primary)]" : "text-[var(--ink-muted)] opacity-60"}`}
                >
                  {strat.name}
                  {isActive && (
                    <div className="absolute -bottom-[13px] left-0 w-full h-[2px] bg-[var(--primary)] rounded-t-full transition-all duration-300" />
                  )}
                </div>
              );
            })}
            <div className="text-sm font-medium text-[var(--ink-muted)] opacity-40 ml-2 border border-dashed border-[var(--ink-muted)] px-3 py-1 rounded-full">
              + 21 Many More...
            </div>
          </div>

          <div className="flex flex-col xl:flex-row gap-10 flex-1">
            
            {/* Chart Area */}
            <div className="flex-1 relative flex flex-col">
              {/* Legends & Current Price */}
              <div className="flex justify-between items-start mb-6 text-xs font-medium text-[var(--ink-muted)]">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-[2px] bg-[var(--primary)] rounded-full"></span> On expiry
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-[2px] bg-[var(--secondary)] rounded-full"></span> On target date
                  </div>
                </div>
                <div className="bg-[var(--bg)] border border-[var(--secondary-lt)] px-4 py-2 rounded-md text-[var(--ink)]">
                  Current Index: 26,341
                </div>
              </div>

              {/* Main Dynamic SVG Graph */}
              <div className="flex-1 min-h-[300px] w-full relative">
                {/* Y-Axis labels */}
                <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-[10px] text-[var(--ink-muted)] py-4">
                  <span>3L</span>
                  <span>1L</span>
                  <span>0</span>
                  <span>-1L</span>
                  <span>-3L</span>
                </div>

                {/* X-Axis labels */}
                <div className="absolute bottom-0 w-full flex justify-between pl-10 pr-4 text-[10px] text-[var(--ink-muted)]">
                  <span>25,800</span>
                  <span>26,000</span>
                  <span>26,200</span>
                  <span>26,400</span>
                  <span>26,600</span>
                  <span>26,800</span>
                  <span>27,000</span>
                </div>

                {/* SVG Graph */}
                <svg className="w-full h-[calc(100%-25px)] ml-8" preserveAspectRatio="none" viewBox="0 0 1000 400">
                  {/* Grid lines */}
                  <line x1="0" y1="200" x2="1000" y2="200" stroke="var(--ink-muted)" strokeWidth="1" strokeDasharray="4 4" opacity="0.2" />
                  
                  {/* Active Chart Paths with CSS transition for smooth shifting */}
                  <path 
                    d={currentChart.expiryPath} 
                    stroke="var(--primary)" 
                    strokeWidth="3" 
                    fill="none" 
                    className="transition-all duration-700 ease-in-out"
                  />
                  <path 
                    d={currentChart.targetPath} 
                    stroke="var(--secondary)" 
                    strokeWidth="3" 
                    fill="none" 
                    className="transition-all duration-700 ease-in-out"
                  />
                  
                  {/* Current Price Vertical Line */}
                  <line x1="520" y1="0" x2="520" y2="400" stroke="var(--primary)" strokeWidth="1" opacity="0.6" />
                </svg>

                {/* Dynamic Profit Pill */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-[var(--primary-lt)] text-[var(--primary)] text-[12px] font-semibold px-4 py-1.5 rounded-full border border-[var(--primary)] flex items-center gap-1.5 transition-all duration-300 shadow-sm">
                  Projected: {currentChart.profit}
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
                </div>
              </div>
            </div>

            {/* Right Stats Sidebar (Dynamic) */}
            <div className="w-full xl:w-[260px] shrink-0 border-t xl:border-t-0 xl:border-l border-[var(--secondary-lt)] pt-6 xl:pt-0 xl:pl-8 flex flex-col gap-6 text-sm">
              
              <div>
                <div className="text-[var(--ink-muted)] mb-1">Max Profit Potential</div>
                <div className="text-[var(--primary)] text-xl font-bold transition-all duration-300">
                  {currentChart.maxProfit}
                </div>
              </div>
              
              <div>
                <div className="text-[var(--ink-muted)] mb-1">Max Risk Exposure</div>
                <div className="text-[#EF4444] text-xl font-bold transition-all duration-300">
                  {currentChart.maxLoss}
                </div>
              </div>
              
              <div>
                <div className="text-[var(--ink-muted)] mb-1">AI Calculated Breakeven</div>
                <div className="text-[var(--ink)] font-semibold text-base">26353 (+0.1%)</div>
              </div>

              <div className="h-px bg-[var(--secondary-lt)] w-full my-1"></div>

              <div className="flex justify-between items-center">
                <span className="text-[var(--ink-muted)]">Risk/Reward</span>
                <span className="text-[var(--ink)] font-semibold">1.06</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[var(--ink-muted)]">Probability of Profit</span>
                <span className="text-[var(--ink)] font-semibold transition-all duration-300">{currentChart.pop}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[var(--ink-muted)]">Time Value</span>
                <span className="text-[var(--ink)] font-semibold">78,650</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}