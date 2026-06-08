"use client";

import React, { useState, useEffect } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect for the glassmorphism navbar background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
      { name: "Strategies", href: "#strategies" },
      { name: "Brokers", href: "#brokers" },
      { name: "Why SafeGrow", href: "#why-us" },
      { name: "Reviews", href: "#review" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[var(--bg)]/80 backdrop-blur-lg border-b border-[var(--secondary-lt)] shadow-sm py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between">
        
        {/* Brand Logo */}
        <a href="/" className="flex items-center gap-2.5 text-[var(--ink)] font-sora font-bold text-xl tracking-tight z-50">
          <div className="w-8 h-8 rounded-lg bg-[var(--primary)] flex items-center justify-center text-[#0A0F1E] shadow-sm shadow-[var(--primary)]/20">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
          </div>
          SafeGrow
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-[var(--ink-muted)] hover:text-[var(--primary)] transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="/login"
            className="text-sm font-semibold text-[var(--ink)] hover:text-[var(--primary)] transition-colors px-2"
          >
            Log In
          </a>
          <a
            href="/signup"
            className="bg-[var(--primary)] text-[#0A0F1E] text-sm font-semibold px-5 py-2.5 rounded-xl hover:opacity-90 hover:-translate-y-0.5 transition-all shadow-lg shadow-[var(--primary)]/20"
          >
            Sign Up
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 z-50 space-y-1.5 focus:outline-none"
          aria-label="Toggle Menu"
        >
          <span
            className={`block w-6 h-0.5 bg-[var(--ink)] rounded-full transition-transform duration-300 ${
              isOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-[var(--ink)] rounded-full transition-opacity duration-300 ${
              isOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-[var(--ink)] rounded-full transition-transform duration-300 ${
              isOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>

      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`md:hidden absolute top-0 left-0 w-full bg-[var(--bg)] border-b border-[var(--secondary-lt)] shadow-xl transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="px-6 pt-24 pb-8 flex flex-col gap-6">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-lg font-medium text-[var(--ink)] hover:text-[var(--primary)] transition-colors border-b border-[var(--secondary-lt)] pb-3"
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="flex flex-col gap-3 mt-4">
            <a
              href="/login"
              onClick={() => setIsOpen(false)}
              className="w-full text-center border border-[var(--secondary-lt)] text-[var(--ink)] text-base font-semibold px-5 py-3.5 rounded-xl hover:bg-[var(--secondary-lt)] transition-colors"
            >
              Log In
            </a>
            <a
              href="/signup"
              onClick={() => setIsOpen(false)}
              className="w-full text-center bg-[var(--primary)] text-[#0A0F1E] text-base font-semibold px-5 py-3.5 rounded-xl hover:opacity-90 transition-all shadow-lg shadow-[var(--primary)]/20"
            >
              Sign Up
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}