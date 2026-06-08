"use client";

export default function BrokersSection() {
  const brokers = [
    { name: "ZERODHA", style: "font-semibold tracking-widest text-[20px] uppercase" },
    { name: "upstox", style: "font-medium tracking-tight text-[24px] lowercase" },
    { name: "AngelOne", style: "font-semibold tracking-tight text-[22px]" },
    { name: "ICICI Direct", style: "font-bold italic tracking-wide text-[20px]" },
    { name: "5paisa", style: "font-extrabold tracking-tight text-[22px]" },
    { name: "FYERS", style: "font-bold tracking-widest text-[20px] uppercase" },
  ];

  // Duplicate the array to create a seamless infinite scroll effect
  const marqueeBrokers = [...brokers, ...brokers];

  return (
    <section className="bg-[var(--bg)] py-24 relative overflow-hidden transition-colors duration-300">
      
      {/* Inline styles for the infinite scroll animation */}
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          display: flex;
          width: max-content;
          animation: scroll 35s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="max-w-[1200px] mx-auto text-center px-6">
        {/* Header Section */}
        <h2 className="text-[var(--ink)] text-3xl md:text-4xl font-bold mb-4 tracking-tight font-sora">
          Integrated with Leading Brokers
        </h2>
        <p className="text-[var(--ink-muted)] text-lg mb-16 max-w-2xl mx-auto leading-relaxed">
          Connect seamlessly with your trusted broker. SafeGrow’s AI engine binds directly to your account for zero-latency trade execution.
        </p>
      </div>

      {/* Infinite Scrolling Brokers Grid */}
      <div className="w-full overflow-hidden relative mb-24">
        {/* Fading gradients on the edges for a smooth blend */}
        <div className="absolute top-0 bottom-0 left-0 w-24 md:w-48 bg-gradient-to-r from-[var(--bg)] to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-24 md:w-48 bg-gradient-to-l from-[var(--bg)] to-transparent z-10 pointer-events-none" />

        <div className="animate-scroll gap-6 px-3">
          {marqueeBrokers.map((broker, index) => (
            <div 
              key={index} 
              className="
                flex items-center justify-center min-w-[220px] h-[88px] px-8
                bg-[var(--surface)] border border-[var(--secondary-lt)] rounded-2xl
                text-[var(--ink-muted)] hover:text-[var(--primary)]
                hover:border-[var(--primary)] hover:bg-[var(--primary-lt)] 
                transition-all duration-300 cursor-pointer shadow-sm
              "
              title={broker.name}
            >
              {/* If you have SVGs, replace this span with your <img src="..." /> */}
              <span className={`${broker.style} transition-colors duration-300`}>
                {broker.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-[1000px] mx-auto px-6">
        {/* Testimonial Section */}
        <div className="relative max-w-[800px] mx-auto mt-12 pt-14 border-t border-[var(--secondary-lt)]">
          
          {/* Top Quote Icon */}
          <div className="absolute top-0 left-0 -translate-y-1/2 -translate-x-2 md:-translate-x-6 bg-[var(--bg)] px-4 transition-colors duration-300">
            <svg 
              className="w-10 h-10 md:w-12 md:h-12 text-[var(--primary)] opacity-80" 
              fill="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
          </div>

          <p className="text-[var(--ink)] text-xl md:text-2xl leading-relaxed font-medium font-serif text-center">
            “SafeGrow takes the emotional guesswork out of investing. By executing precise, AI-driven strategies directly through my trusted broker, it actively protects my capital during volatility while consistently capturing market upside. It’s hands-off wealth generation at its absolute peak.”
          </p>

          <div className="mt-8 text-center relative z-10">
            <div className="text-[var(--primary)] font-semibold tracking-wide uppercase text-sm">
              Verified SafeGrow Investor
            </div>
            <div className="text-[var(--ink-muted)] text-xs mt-1">
              Active Portfolio • 18% Annualized Yield
            </div>
          </div>

          {/* Bottom Quote Icon */}
          <div className="absolute bottom-16 right-0 translate-y-[80%] translate-x-2 md:translate-x-6 bg-[var(--bg)] px-4 transition-colors duration-300">
            <svg 
              className="w-10 h-10 md:w-12 md:h-12 text-[var(--primary)] opacity-80 rotate-180" 
              fill="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
          </div>
          
        </div>
      </div>
    </section>
  );
}