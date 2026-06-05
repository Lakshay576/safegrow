"use client";
import { useEffect, useRef } from "react";

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement!;
    
    let W = parent.offsetWidth;
    let H = parent.offsetHeight;
    canvas.width = W;
    canvas.height = H;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    // --- State Initialization ---
    
    // Faded financial candlesticks drifting right to left
    const initCandles = () => Array.from({ length: Math.floor(W / 70) }).map(() => ({
      x: Math.random() * W,
      y: Math.random() * H,
      w: Math.random() * 6 + 4,              // Width of the candle body
      wickH: Math.random() * 60 + 30,        // Total height of the wick
      bodyYOffset: Math.random() * 15 + 5,   // Gap from the top of the wick to the body
      bodyH: Math.random() * 30 + 15,        // Height of the candle body
      vx: -(Math.random() * 0.4 + 0.1),      // Horizontal speed (drifting left)
      vy: (Math.random() - 0.5) * 0.2,       // Slight vertical drift for organic feel
      isUp: Math.random() > 0.5,             // True = Positive (Primary), False = Negative (Secondary)
      opacity: Math.random() * 0.08 + 0.02,  // Faded effect
    }));

    // Gravity dots falling downwards
    const initParticles = () => Array.from({ length: Math.floor((W * H) / 9000) }).map(() => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.5 + 0.5,
      vx: (Math.random() - 0.5) * 0.3,
      vy: Math.random() * 1.2 + 0.4,         // Downward gravity velocity
    }));

    let candles = initCandles();
    let particles = initParticles();

    // --- Animation Loop ---
    const render = () => {
      ctx.clearRect(0, 0, W, H);
      
      // Dynamic theme checking so it updates instantly if the user toggles dark mode
      const isDark = document.documentElement.classList.contains("dark");
      
      // Extract RGB values matching your CSS tokens
      const primaryRGB = isDark ? "46,244,197" : "0,168,122";
      const secondaryRGB = isDark ? "74,111,165" : "58,90,143";
      const dotColor = `rgba(${primaryRGB}, ${isDark ? 0.45 : 0.35})`;

      // 1. Draw Candlesticks
      candles.forEach((c) => {
        c.x += c.vx;
        c.y += c.vy;

        // Wrap around screen edges
        if (c.x < -20) {
          c.x = W + 20;
          c.y = Math.random() * H;
        }
        if (c.y > H + 50) c.y = -50;
        if (c.y < -50) c.y = H + 50;

        const colorRGB = c.isUp ? primaryRGB : secondaryRGB;
        ctx.fillStyle = `rgba(${colorRGB}, ${c.opacity})`;
        ctx.strokeStyle = `rgba(${colorRGB}, ${c.opacity})`;
        ctx.lineWidth = 1;

        // Draw Wick
        ctx.beginPath();
        ctx.moveTo(c.x + c.w / 2, c.y);
        ctx.lineTo(c.x + c.w / 2, c.y + c.wickH);
        ctx.stroke();

        // Draw Body
        ctx.fillRect(c.x, c.y + c.bodyYOffset, c.w, c.bodyH);
      });

      // 2. Draw Gravity Particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // Wrap particles when they fall off the bottom
        if (p.y > H + 5) {
          p.y = -5;
          p.x = Math.random() * W;
        }
        // Keep within horizontal bounds
        if (p.x > W + 5) p.x = -5;
        if (p.x < -5) p.x = W + 5;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = dotColor;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    // Start loop
    render();

    // --- Window Resize Handler ---
    const handleResize = () => {
      W = parent.offsetWidth;
      H = parent.offsetHeight;
      canvas.width = W;
      canvas.height = H;
      // Re-seed arrays to adapt to new screen dimensions
      candles = initCandles();
      particles = initParticles();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId); // Cleanup
    };
  }, []);

  return (
    <section className="
      relative min-h-[88vh] flex items-center justify-center
      overflow-hidden px-6 py-20
      bg-[var(--bg)] transition-colors duration-300
    ">

      {/* Glow Orbs */}
      <div className="
        absolute -top-32 -right-20 w-[480px] h-[480px] rounded-full
        bg-[var(--primary)] opacity-[0.18] blur-[80px] pointer-events-none
      " />
      <div className="
        absolute -bottom-16 -left-16 w-[320px] h-[320px] rounded-full
        bg-[var(--secondary)] opacity-[0.18] blur-[80px] pointer-events-none
      " />

      {/* Dynamic Background Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-0"
      />

      {/* Content */}
      <div className="relative z-10 text-center max-w-[760px] w-full animate-fadeUp">

        {/* Badge */}
        <div className="
          inline-flex items-center gap-2 mb-7
          bg-[var(--primary-lt)] border border-[var(--primary)]
          text-[var(--primary)] text-[11px] font-medium
          tracking-[0.12em] uppercase px-4 py-1.5 rounded-full
        ">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] animate-pulse" />
          AI-Driven Wealth Engine 2.0
        </div>

        {/* Heading */}
        <h1 className="
          font-sora text-[clamp(36px,6vw,68px)] font-bold leading-[1.1]
          tracking-tight text-[var(--ink)] mb-5
        ">
          Safe Wealth Growth,{" "}
          <br />
          Powered by{" "}
          <span className="text-[var(--primary)]">AI</span>
        </h1>

        {/* Subtitle */}
        <p className="
          text-base text-[var(--ink-muted)] leading-relaxed
          max-w-[520px] mx-auto mb-9
        ">
          Experience the intersection of private banking exclusivity and
          artificial intelligence precision. Your wealth, secured by SafeGrow.
        </p>

        {/* CTA Buttons */}
        <div className="flex gap-3.5 justify-center flex-wrap">
          <button className="
            inline-flex items-center gap-2
            bg-[var(--primary)] text-[var(--bg)]
            text-[15px] font-medium px-7 py-3.5 rounded-[10px]
            border-none cursor-pointer
            transition-all duration-200
            hover:opacity-85 hover:-translate-y-0.5
          ">
            Start Investing &nbsp;→
          </button>

          <button className="
            inline-flex items-center gap-2
            bg-transparent text-[var(--ink)]
            text-[15px] font-medium px-7 py-3.5 rounded-[10px]
            border-[1.5px] border-[var(--secondary-lt)] cursor-pointer
            transition-all duration-200
            hover:bg-[var(--secondary-lt)] hover:border-[var(--secondary)] hover:-translate-y-0.5
          ">
            Explore Strategies
          </button>
        </div>

        {/* Stats */}
        <div className="flex justify-center gap-10 mt-14 flex-wrap">
          {[
            { value: "$2.4B+", label: "Assets Managed" },
            { value: "18%",    label: "Avg. Annual Return" },
            { value: "50K+",   label: "Active Investors" },
          ].map((stat, i) => (
            <div key={i} className="text-center relative
              [&:not(:last-child)]:after:content-['']
              [&:not(:last-child)]:after:absolute
              [&:not(:last-child)]:after:-right-5
              [&:not(:last-child)]:after:top-[20%]
              [&:not(:last-child)]:after:h-[60%]
              [&:not(:last-child)]:after:w-px
              [&:not(:last-child)]:after:bg-[var(--ink-muted)]
              [&:not(:last-child)]:after:opacity-25
            ">
              <div className="font-sora text-[26px] font-bold tracking-tight text-[var(--ink)]">
                {stat.value.replace(/(\d[\d.]*)(.)/, (_, num, suffix) => num)}
                <span className="text-[var(--primary)]">
                  {stat.value.replace(/^[\d.$]+/, "")}
                </span>
              </div>
              <div className="text-xs text-[var(--ink-muted)] mt-0.5 tracking-wide">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}