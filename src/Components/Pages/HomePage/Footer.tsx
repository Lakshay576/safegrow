"use client";
import { useTheme } from "@/app/ThemeProvider";

export default function Footer() {
  const { dark, setDark } = useTheme();

  return (
    <footer style={{
      background: "var(--bg)",
      borderTop: "1px solid var(--secondary-lt)",
      transition: "background 0.3s",
    }}>

      {/* Top row */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        padding: "48px 48px 0",
        flexWrap: "wrap",
        gap: "32px",
      }}>

        {/* Left — tagline */}
        <p style={{
          fontFamily: "'Sora', sans-serif",
          fontSize: "clamp(14px, 1.4vw, 17px)",
          color: "var(--ink-muted)",
          fontWeight: 400,
          margin: 0,
          letterSpacing: "-0.01em",
        }}>
          Safe wealth. Powered by AI.
        </p>

        {/* Right — nav links in 2 cols */}
        <div style={{ display: "flex", gap: "64px", flexWrap: "wrap" }}>
          {[
            ["Product", "Strategies", "Market", "Portfolio", "Pricing"],
            ["Blog", "Docs", "Changelog", "Press", "Releases"],
          ].map((col, ci) => (
            <ul key={ci} style={{
              listStyle: "none", margin: 0, padding: 0,
              display: "flex", flexDirection: "column", gap: "14px",
            }}>
              {col.map(link => (
                <li key={link}>
                  <a href="#" style={{
                    color: "var(--ink-muted)",
                    fontSize: "15px",
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                    onMouseEnter={e => (e.currentTarget.style.color = "var(--primary)")}
                    onMouseLeave={e => (e.currentTarget.style.color = "var(--ink-muted)")}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      {/* Giant wordmark */}
      <div style={{
        padding: "0 32px",
        lineHeight: 1,
        overflow: "hidden",
        marginTop: "24px",
      }}>
        <span style={{
          fontFamily: "'Sora', sans-serif",
          fontSize: "clamp(72px, 14vw, 172px)",
          fontWeight: 700,
          color: "var(--ink)",
          letterSpacing: "-0.04em",
          display: "block",
          transition: "color 0.3s",
          userSelect: "none",
        }}>
          SafeGrow
        </span>
      </div>

      {/* Bottom bar */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px 48px 28px",
        borderTop: "1px solid var(--secondary-lt)",
        flexWrap: "wrap",
        gap: "16px",
      }}>

        {/* Left — copyright */}
        <span style={{
          fontSize: "13px",
          color: "var(--ink-muted)",
        }}>
          © {new Date().getFullYear()} SafeGrow. All rights reserved.
        </span>

        {/* Center — legal links */}
        <div style={{ display: "flex", gap: "24px" }}>
          {["Privacy", "Terms", "Use Cases", "About"].map(l => (
            <a key={l} href="#" style={{
              fontSize: "13px",
              color: "var(--ink-muted)",
              textDecoration: "none",
              transition: "color 0.2s",
            }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--primary)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--ink-muted)")}
            >
              {l}
            </a>
          ))}
        </div>

        {/* Right — theme toggle */}
        <button
          onClick={() => setDark(!dark)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            background: "var(--surface)",
            border: "1px solid var(--secondary-lt)",
            color: "var(--ink)",
            padding: "8px 16px",
            borderRadius: "999px",
            fontSize: "13px",
            fontWeight: 500,
            cursor: "pointer",
            transition: "all 0.2s",
          }}
          onMouseEnter={e => {
            const el = e.currentTarget;
            el.style.borderColor = "var(--primary)";
            el.style.color = "var(--primary)";
          }}
          onMouseLeave={e => {
            const el = e.currentTarget;
            el.style.borderColor = "var(--secondary-lt)";
            el.style.color = "var(--ink)";
          }}
        >
          <span style={{ fontSize: "15px" }}>{dark ? "☀️" : "🌙"}</span>
          {dark ? "Light mode" : "Dark mode"}
        </button>
      </div>

    </footer>
  );
}