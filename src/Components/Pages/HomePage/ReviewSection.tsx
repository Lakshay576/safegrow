"use client";

import React from "react";

export default function ReviewsSection() {
  // --- Data Arrays ---
  const row1Reviews = [
    {
      name: "Rajesh Verma",
      source: "Verified Investor",
      rating: 5,
      text: "The AI trading platform is incredibly user-friendly. Seeing consistent returns without the emotional stress of manual trading is a game-changer.",
    },
    {
      name: "Ankita Rao",
      source: "SafeGrow Client",
      rating: 5,
      text: "SafeGrow's stock picks are fantastic. My portfolio has grown consistently, and the automated risk management gives me absolute peace of mind.",
    },
    {
      name: "Vikram Joshi",
      source: "Premium Member",
      rating: 5,
      text: "Excellent services and spot-on options recommendations. Seamless syncing with my Zerodha account makes execution completely frictionless.",
    },
    {
      name: "Sanjay Deshmukh",
      source: "Verified Investor",
      rating: 4,
      text: "Been trading for a decade. This AI platform is by far the most reliable. The 'max loss' visualization feature alone is worth the investment.",
    },
    {
      name: "Neha Patel",
      source: "SafeGrow Client",
      rating: 5,
      text: "I was skeptical about AI trading at first, but the transparency and the 18% annualized yields have completely won me over. Highly recommend.",
    },
  ];

  const row2Reviews = [
    {
      name: "Rina Sharma",
      source: "Premium Member",
      rating: 5,
      text: "This app has been a huge help. The automated execution means I don't have to stare at charts all day while at work.",
    },
    {
      name: "Amit Verma",
      source: "Verified Investor",
      rating: 5,
      text: "I've been using SafeGrow for a while now. The risk/reward metrics before placing a trade are brilliantly visualized and easy to understand.",
    },
    {
      name: "Sushma Yadav",
      source: "SafeGrow Client",
      rating: 4,
      text: "Amazing work! It empowers investors and is highly educational. The auto-stoploss feature works perfectly during high volatility.",
    },
    {
      name: "Aarav Mittal",
      source: "Verified Investor",
      rating: 5,
      text: "Using the platform for a few months. The algorithmic yields are remarkably stable and the user interface is beautifully crafted.",
    },
    {
      name: "Ishaan Reddy",
      source: "Premium Member",
      rating: 5,
      text: "The institutional-grade tools previously reserved for hedge funds are now on my phone. The seamless broker integration is flawless.",
    },
  ];

  // Duplicating arrays to create the infinite scroll loop effect
  const marqueeRow1 = [...row1Reviews, ...row1Reviews];
  const marqueeRow2 = [...row2Reviews, ...row2Reviews];

  // Star SVG Helper
  const StarIcon = ({ filled }: { filled: boolean }) => (
    <svg 
      className={`w-4 h-4 ${filled ? "text-[var(--primary)]" : "text-[var(--secondary-lt)]"}`} 
      fill="currentColor" 
      viewBox="0 0 20 20"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );

  return (
    <section id="review" className="bg-[var(--bg)] py-24 relative overflow-hidden transition-colors duration-300 font-sans">
      
      {/* Inline Animation Keyframes */}
      <style>{`
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee-left {
          display: flex;
          width: max-content;
          animation: marquee-left 45s linear infinite;
        }
        .animate-marquee-right {
          display: flex;
          width: max-content;
          animation: marquee-right 45s linear infinite;
        }
        .animate-marquee-left:hover, .animate-marquee-right:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="max-w-[1200px] mx-auto text-center px-6 mb-16 animate-fadeUp">
        <h2 className="text-[var(--ink)] text-3xl md:text-5xl font-bold mb-6 tracking-tight font-sora">
          What Our Investors Are Saying
        </h2>
        
        {/* Trust Stats Bar */}
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12 text-sm font-medium text-[var(--ink-muted)]">
          <div className="flex items-center gap-2">
            <span className="bg-[var(--primary-lt)] text-[var(--primary)] px-2.5 py-1 rounded-md font-bold">4.9/5</span>
            Average Rating
          </div>
          <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-[var(--secondary-lt)]" />
          <div className="flex items-center gap-2">
            <span className="bg-[var(--primary-lt)] text-[var(--primary)] px-2.5 py-1 rounded-md font-bold">12K+</span>
            Verified Reviews
          </div>
          <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-[var(--secondary-lt)]" />
          <div className="flex items-center gap-2 text-[var(--ink)]">
            <svg className="w-5 h-5 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            50K+ Active Users
          </div>
        </div>
      </div>

      {/* Marquee Container */}
      <div className="relative w-full overflow-hidden flex flex-col gap-6">
        
        {/* Left & Right Fade Gradients */}
        <div className="absolute top-0 bottom-0 left-0 w-24 md:w-56 bg-gradient-to-r from-[var(--bg)] to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-24 md:w-56 bg-gradient-to-l from-[var(--bg)] to-transparent z-10 pointer-events-none" />

        {/* Top Row: Moves Left */}
        <div className="animate-marquee-left gap-6 px-3">
          {marqueeRow1.map((review, idx) => (
            <div 
              key={`row1-${idx}`} 
              className="w-[340px] md:w-[400px] bg-[var(--surface)] border border-[var(--secondary-lt)] rounded-2xl p-6 md:p-8 shrink-0 hover:border-[var(--primary)] transition-colors duration-300"
            >
              <div className="flex items-start justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[var(--primary-lt)] text-[var(--primary)] flex items-center justify-center font-bold text-lg font-sora">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-[var(--ink)] font-semibold text-sm">{review.name}</h4>
                    <span className="text-[var(--ink-muted)] text-[11px] uppercase tracking-wider">{review.source}</span>
                  </div>
                </div>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} filled={i < review.rating} />
                  ))}
                </div>
              </div>
              <p className="text-[var(--ink-muted)] text-sm leading-relaxed">
                "{review.text}"
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Row: Moves Right */}
        <div className="animate-marquee-right gap-6 px-3">
          {marqueeRow2.map((review, idx) => (
            <div 
              key={`row2-${idx}`} 
              className="w-[340px] md:w-[400px] bg-[var(--surface)] border border-[var(--secondary-lt)] rounded-2xl p-6 md:p-8 shrink-0 hover:border-[var(--primary)] transition-colors duration-300"
            >
              <div className="flex items-start justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[var(--secondary-lt)] text-[var(--secondary)] flex items-center justify-center font-bold text-lg font-sora">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-[var(--ink)] font-semibold text-sm">{review.name}</h4>
                    <span className="text-[var(--ink-muted)] text-[11px] uppercase tracking-wider">{review.source}</span>
                  </div>
                </div>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} filled={i < review.rating} />
                  ))}
                </div>
              </div>
              <p className="text-[var(--ink-muted)] text-sm leading-relaxed">
                "{review.text}"
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}