"use client";

import { useState } from "react";
import {
  History,
  TrendingUp,
  Play,
  Briefcase,
  LayoutGrid,
  BarChart2,
  Signal,
  Bot,
  ArrowRight,
  Plug,
  BookOpen,
  Receipt,
  Headphones,
  Send,
  PhoneCall,
  Users,
  ChevronRight,
  Zap,
  Sparkles,
  MousePointer2,
  ArrowUpDown,
} from "lucide-react";
import DashboardLayout from "@/Components/Common/ViewLayout/ViewLayout"; 
import { useRouter } from "next/navigation";

// ─── Ticker ───────────────────────────────────────────────────────────────────
const TICKS = [
  { label: "NIFTY 50", val: "22,847", chg: "+1.2%", up: true },
  { label: "SENSEX", val: "75,410", chg: "+0.9%", up: true },
  { label: "BANKNIFTY", val: "48,320", chg: "+0.6%", up: true },
  { label: "RELIANCE", val: "₹2,940", chg: "+0.7%", up: true },
  { label: "TCS", val: "₹4,120", chg: "−0.5%", up: false },
  { label: "INFY", val: "₹1,820", chg: "+1.4%", up: true },
  { label: "HDFC", val: "₹1,650", chg: "+1.1%", up: true },
  { label: "MIDCAP", val: "42,310", chg: "−0.3%", up: false },
];

function TickerBar() {
  const doubled = [...TICKS, ...TICKS];
  return (
    <div className="bg-[#0a0a0a] py-1.5 overflow-hidden">
      <div className="flex gap-8 w-max animate-marquee">
        {doubled.map((t, i) => (
          <span
            key={i}
            className="text-[11px] font-mono whitespace-nowrap text-[#888]"
          >
            {t.label}{" "}
            <span className={t.up ? "text-green-400" : "text-red-400"}>
              {t.up ? "▲" : "▼"} {t.val} ({t.chg})
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Types ────────────────────────────────────────────────────────────────────
type Tab = "algo" | "indicator" | "click";

// ─── Data ─────────────────────────────────────────────────────────────────────
const NAV_CARDS = [
  {
    icon: TrendingUp,
    label: "Algo Trade",
    sub: "Deploy live",
    bg: "bg-green-50",
    color: "text-green-600",
    href: "/algo-trade",
  },
  {
    icon: Play,
    label: "Forward Test",
    sub: "Paper trade",
    bg: "bg-blue-50",
    color: "text-blue-500",
    href: "/forward-test",
  },
  {
    icon: Briefcase,
    label: "Portfolios",
    sub: "Manage algos",
    bg: "bg-purple-50",
    color: "text-purple-600",
    href: "/portfolios",
  },
  {
    icon: LayoutGrid,
    label: "Straddle Heatmap",
    sub: "Daily view",
    bg: "bg-yellow-50",
    color: "text-yellow-600",
    href: "/heatmap",
  },
  {
    icon: BarChart2,
    label: "Trade Analysis",
    sub: "Daily report",
    bg: "bg-orange-50",
    color: "text-orange-500",
    href: "/analysis",
  },
  {
    icon: Signal,
    label: "Signals",
    sub: "Live alerts",
    bg: "bg-pink-50",
    color: "text-pink-600",
    href: "/signals",
  },
];

const BROKERS = [
  {
    id: "fyers",
    name: "Fyers",
    img: "https://cdn.brandfetch.io/idGVu_2qNx/w/182/h/182/theme/dark/icon.jpeg?c=1bxid64Mup7aczewSAYMX&t=1774370685853",
    bg: "bg-blue-50",
  },
  {
    id: "fivepaisa_xstream",
    name: "5Paisa XStream",
    img: "https://cdn.brandfetch.io/idl7VNvriH/w/400/h/400/theme/dark/icon.jpeg?c=1bxid64Mup7aczewSAYMX&t=1772625381697",
    bg: "bg-red-50",
  },
  {
    id: "dhanClient",
    name: "Dhan",
    img: "https://cdn.brandfetch.io/idTxgj7ZNU/w/400/h/400/theme/dark/icon.jpeg?c=1bxid64Mup7aczewSAYMX&t=1774403344271",
    bg: "bg-green-50",
  },
  {
    id: "growwClient",
    name: "Groww",
    img: "https://cdn.brandfetch.io/id02rL-aAO/theme/dark/icon.svg?c=1bxid64Mup7aczewSAYMX&t=1767861092436",
    bg: "bg-emerald-50",
  },
  {
    id: "upstoxClient",
    name: "Upstox",
    img: "https://cdn.brandfetch.io/idCac_AWM0/w/400/h/400/theme/dark/icon.jpeg?c=1bxid64Mup7aczewSAYMX&t=1778057761415",
    bg: "bg-purple-50",
  },
  {
    id: "angelOne",
    name: "Angel One",
    img: "https://cdn.brandfetch.io/idSjPDvKrk/w/400/h/400/theme/dark/icon.jpeg?c=1bxid64Mup7aczewSAYMX&t=1758904060068",
    bg: "bg-orange-50",
  },
];

const MARKETS = [
  { name: "NSE Equity", time: "9:15 AM – 3:30 PM", open: true },
  { name: "NSE F&O", time: "9:15 AM – 3:30 PM", open: true },
  { name: "BSE", time: "9:15 AM – 3:30 PM", open: true },
  { name: "MCX", time: "9:00 AM – 11:30 PM", open: true },
  { name: "SGX Nifty", time: "Opens 6:30 AM", open: false },
];

const HELP_LINKS = [
  { icon: Send, label: "Realtime Support on Telegram" },
  { icon: PhoneCall, label: "Request a Callback" },
  { icon: Users, label: "Join Updates Group" },
];

// ─── Mini sparkline SVG ───────────────────────────────────────────────────────
function Sparkline() {
  return (
    <svg
      className="absolute right-4 bottom-4 opacity-10"
      width="100"
      height="50"
      viewBox="0 0 100 50"
    >
      <polyline
        points="0,45 15,35 30,40 45,20 60,25 75,10 90,8 100,4"
        fill="none"
        stroke="#0066cc"
        strokeWidth="2"
      />
    </svg>
  );
}

function BarPreview() {
  return (
    <svg
      className="absolute right-4 bottom-4 opacity-10"
      width="80"
      height="50"
      viewBox="0 0 80 50"
    >
      <rect x="4" y="28" width="12" height="20" fill="#0066cc" rx="2" />
      <rect x="20" y="16" width="12" height="32" fill="#0066cc" rx="2" />
      <rect x="36" y="8" width="12" height="40" fill="#0066cc" rx="2" />
      <rect x="52" y="20" width="12" height="28" fill="#0066cc" rx="2" />
    </svg>
  );
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────
export default function DashboardSafegrow() {
  const [activeTab, setActiveTab] = useState<Tab>("algo");
  const router = useRouter();

  const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
    { key: "algo", label: "Algo Trading", icon: <Bot size={13} /> },
    {
      key: "indicator",
      label: "Indicator Algo",
      icon: <ArrowUpDown size={13} />,
    },
    { key: "click", label: "ClickTrade", icon: <MousePointer2 size={13} /> },
  ];

  return (
    <DashboardLayout initialRole="user">
      <div className="min-h-screen  font-['Inter',sans-serif]">
        {/* Ticker */}
        {/* <TickerBar /> */}

        {/* Body */}
        <div className="max-w-[1600px] mx-auto px-3 sm:px-4 md:px-6 xl:px-8 py-4 sm:py-5">
          <div className="flex flex-col xl:flex-row gap-4">
            {/* ── LEFT ── */}
            <div className="flex-1 min-w-0 flex flex-col gap-4">
              {/* Tab bar */}
              <div className="bg-white border border-[var(--color-outline-variant)] rounded-full p-1.5 flex gap-1">
                {tabs.map((t) => (
                  <button
                    key={t.key}
                    // onClick={() => setActiveTab(t.key)}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all 
                    text-[var(--color-on-surface-variant)] hover:bg-[var(--color-surface-container-low)]`}
                  >
                    <span
                      className={`w-5 h-5 rounded-full flex items-center justify-center ${activeTab === t.key ? "bg-[var(--color-primary)]" : "bg-[var(--color-surface-container-high)]"}`}
                    >
                      <span
                        className={
                          activeTab === t.key
                            ? "text-white"
                            : "text-[var(--color-on-surface-variant)]"
                        }
                      >
                        {t.icon}
                      </span>
                    </span>
                    <span className="hidden sm:inline">{t.label}</span>
                    <span className="sm:hidden">
                      {t.key === "algo"
                        ? "Algo"
                        : t.key === "indicator"
                          ? "Indicator"
                          : "Click"}
                    </span>
                  </button>
                ))}
              </div>

              {/* Hero cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {/* Backtest */}
                <div className="relative bg-white border border-[var(--color-outline-variant)] rounded-2xl p-4 sm:p-5 cursor-pointer hover:border-[var(--color-primary)] transition-colors overflow-hidden group">
                  <Sparkline />
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2 text-base sm:text-lg font-semibold text-[var(--color-on-surface)]">
                      <History
                        size={18}
                        className="text-[var(--color-on-surface-variant)]"
                      />
                      <span>
                        Backtest{" "}
                        <span className="text-[var(--color-primary)]">
                          AI Powered
                        </span>
                      </span>
                    </div>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[var(--color-primary-container)] text-[var(--color-primary)] whitespace-nowrap">
                      ✦ New
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[var(--color-on-surface-variant)] leading-relaxed mb-4 max-w-[220px]">
                    Backtest smarter with AI. Build and refine strategies using
                    natural language.
                  </p>
                  <button className="flex items-center gap-2 bg-[var(--color-primary)] text-white text-xs sm:text-sm font-medium px-4 py-2 rounded-lg cursor-pointer hover:bg-[var(--color-primary-dim)] transition-colors">
                    <Sparkles size={13} /> Backtest with AI
                  </button>
                </div>

                {/* Marketplace */}
                <div className="relative bg-white border border-[var(--color-outline-variant)] rounded-2xl p-4 sm:p-5 cursor-pointer hover:border-[var(--color-primary)] transition-colors overflow-hidden group">
                  <BarPreview />
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2 text-base sm:text-lg font-semibold text-[var(--color-on-surface)]">
                      <BarChart2
                        size={18}
                        className="text-[var(--color-on-surface-variant)]"
                      />
                      <span>Marketplace</span>
                    </div>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-800 whitespace-nowrap">
                      ✦ New Updates
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[var(--color-on-surface-variant)] leading-relaxed mb-4 max-w-[220px]">
                    Curated strategies by independent creators. Trade-ready
                    algos for NSE, BSE.
                  </p>
                  <button className="flex items-center gap-2 bg-[var(--color-primary)] text-white text-xs sm:text-sm font-medium px-4 py-2 rounded-lg cursor-pointer hover:bg-[var(--color-primary-dim)] transition-colors">
                    <Play size={13} /> Start Trading
                  </button>
                </div>
              </div>

              {/* Nav cards — 2 col on sm, 3 col on md+ */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3">
                {NAV_CARDS.map((c) => (
                  <a
                    key={c.label}
                    // href={c.href}
                    className="bg-white border border-[var(--color-outline-variant)] rounded-xl p-3 sm:p-4 flex items-center gap-3 hover:border-[var(--color-primary)] transition-colors cursor-pointer no-underline group"
                  >
                    <div
                      className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg ${c.bg} flex items-center justify-center flex-shrink-0`}
                    >
                      <c.icon size={16} className={c.color} />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs sm:text-sm font-medium text-[var(--color-on-surface)] truncate">
                        {c.label}
                      </div>
                      <div className="text-[10px] sm:text-xs text-[var(--color-on-surface-variant)]">
                        {c.sub}
                      </div>
                    </div>
                  </a>
                ))}
              </div>

              {/* Promo cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-white border border-[var(--color-outline-variant)] rounded-xl p-4 cursor-pointer hover:border-[var(--color-primary)] transition-colors">
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold px-2.5 py-1 rounded-full bg-blue-100 text-blue-700 mb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 inline-block" />
                    Indian Markets
                  </span>

                  <div className="text-sm font-semibold text-[var(--color-on-surface)] mb-1">
                    Trade NSE & BSE Stocks
                  </div>

                  <div className="text-xs text-[var(--color-on-surface-variant)] leading-relaxed mb-3">
                    Analyze, backtest and execute strategies for Indian stock
                    market trading.
                  </div>

                  <div className="flex items-center gap-1 text-xs font-semibold text-[var(--color-primary)]">
                    <ArrowRight size={12} /> Explore
                  </div>
                </div>

                <div className="bg-white border border-[var(--color-outline-variant)] rounded-xl p-4 cursor-pointer hover:border-[var(--color-primary)] transition-colors">
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold px-2.5 py-1 rounded-full bg-[var(--color-primary-container)] text-[var(--color-primary)] mb-2">
                    <Zap size={10} /> Algo Trading
                  </span>

                  <div className="text-sm font-semibold text-[var(--color-on-surface)] mb-1">
                    Automated Strategy Execution
                  </div>

                  <div className="text-xs text-[var(--color-on-surface-variant)] leading-relaxed mb-3">
                    Create and deploy algorithmic trading strategies for Indian
                    equities and indices.
                  </div>

                  <div className="flex items-center gap-1 text-xs font-semibold text-[var(--color-primary)]">
                    <ArrowRight size={12} /> Start Trading
                  </div>
                </div>
              </div>
            </div>

            {/* ── RIGHT SIDEBAR ── */}
            <div className="w-full xl:w-[260px] 2xl:w-[280px] flex flex-col gap-3 xl:flex-shrink-0">
              {/* Brokers */}
              <div className="bg-white border border-[var(--color-outline-variant)] rounded-2xl p-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold tracking-wide text-[var(--color-on-surface-variant)]">
                    Connect Broker
                  </span>
                </div>
                <p className="text-[11px] text-[var(--color-on-surface-variant)] mb-3 leading-relaxed">
                  Connect your broker account to execute strategies live
                </p>

                {/* On mobile show brokers in a horizontal scrollable row */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3">
                  {BROKERS.map((broker) => (
                    <div
                      key={broker.id}
                      className="bg-white rounded-xl mb-4 flex items-center justify-center hover:border-[var(--color-primary)] hover:shadow-sm transition-all cursor-pointer group"
                    >
                      <div
                        className={`w-12 h-12 rounded-xl bg-white flex items-center justify-center overflow-hidden`}
                      >
                        <img
                          src={broker.img}
                          alt={broker.name}
                          className="w-10 h-10 object-contain group-hover:scale-110 transition-transform"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <button onClick={()=> router.push('/brokers')} className="w-full flex items-center justify-center gap-2 bg-[var(--color-primary)] text-white text-xs sm:text-sm font-medium py-2 rounded-lg cursor-pointer hover:bg-[var(--color-primary-dim)] transition-colors">
                  <Plug size={13} /> View All Brokers
                </button>
              </div>

              {/* Markets */}
              {/* <div className="bg-white border border-[var(--color-outline-variant)] rounded-2xl p-4">
              <div className="text-[10px] font-semibold uppercase tracking-widest text-[var(--color-on-surface-variant)] mb-3">Markets</div>
              <div className="flex flex-col divide-y divide-[var(--color-outline-variant)]">
                {MARKETS.map((m) => (
                  <div key={m.name} className="flex items-center justify-between py-2">
                    <div>
                      <div className="text-xs sm:text-[13px] font-medium text-[var(--color-on-surface)]">{m.name}</div>
                      <div className="text-[10px] text-[var(--color-on-surface-variant)]">{m.time}</div>
                    </div>
                    {m.open ? (
                      <div className="flex items-center gap-1.5 text-[11px] font-semibold text-green-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" /> Open
                      </div>
                    ) : (
                      <div className="text-[11px] text-[var(--color-on-surface-variant)]">Closed</div>
                    )}
                  </div>
                ))}
              </div>
            </div> */}

              {/* Help Centre */}
              <div className="bg-white border border-[var(--color-outline-variant)] rounded-2xl overflow-hidden">
                <div className="bg-[var(--color-primary-container)] px-4 py-3 flex items-center gap-3">
                  <div className="w-9 h-9 bg-[var(--color-primary)] rounded-xl flex items-center justify-center flex-shrink-0">
                    <Headphones size={16} className="text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-[var(--color-on-surface)]">
                      Help Centre
                    </div>
                    <div className="text-[11px] text-[var(--color-on-surface-variant)]">
                      Get support anytime
                    </div>
                  </div>
                </div>
                <div className="px-4 py-1">
                  {HELP_LINKS.map((h) => (
                    <div
                      key={h.label}
                      className="flex items-center gap-3 py-2.5 border-b border-[var(--color-outline-variant)] last:border-0 cursor-pointer group hover:text-[var(--color-primary)]"
                    >
                      <h.icon
                        size={14}
                        className="text-[var(--color-primary)] flex-shrink-0"
                      />
                      <span className="text-xs sm:text-[13px] font-medium text-[var(--color-on-surface)] group-hover:text-[var(--color-primary)] transition-colors">
                        {h.label}
                      </span>
                      <ChevronRight
                        size={13}
                        className="ml-auto text-[var(--color-on-surface-variant)]"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Links */}
              {/* <div className="bg-white border border-[var(--color-outline-variant)] rounded-2xl p-4">
              <div className="text-[10px] font-semibold uppercase tracking-widest text-[var(--color-on-surface-variant)] mb-3">Quick Links</div>
              {[
                { icon: Plug, label: "Broker Setup", sub: "Connect your account", bg: "bg-[var(--color-primary-container)]", color: "text-[var(--color-primary)]" },
                { icon: BookOpen, label: "Documentation", sub: "API guides & tutorials", bg: "bg-green-50", color: "text-green-600" },
                { icon: Receipt, label: "Pricing & Credits", sub: "Plans and usage", bg: "bg-orange-50", color: "text-orange-500" },
              ].map((l) => (
                <div key={l.label} className="flex items-center gap-2.5 py-2 rounded-lg cursor-pointer hover:bg-[var(--color-surface-container-low)] px-1 transition-colors group">
                  <div className={`w-7 h-7 rounded-lg ${l.bg} flex items-center justify-center flex-shrink-0`}>
                    <l.icon size={13} className={l.color} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs sm:text-[13px] font-medium text-[var(--color-on-surface)]">{l.label}</div>
                    <div className="text-[10px] text-[var(--color-on-surface-variant)]">{l.sub}</div>
                  </div>
                  <ChevronRight size={13} className="ml-auto text-[var(--color-on-surface-variant)] opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div> */}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
