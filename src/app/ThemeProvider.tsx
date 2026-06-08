"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

type ThemeContextType = {
  dark: boolean;
  setDark: (dark: boolean) => void;
};

const ThemeContext = createContext<ThemeContextType>({
  dark: true,
  setDark: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [dark, setDarkState] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
      setDarkState(false);
      document.documentElement.classList.remove("dark");
    } else {
      setDarkState(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const handleSetDark = (isDark: boolean) => {
    setDarkState(isDark);
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  // Ensure hydration mismatch is avoided by only doing class manipulation after mount
  return (
    <ThemeContext.Provider value={{ dark, setDark: handleSetDark }}>
      {children}
    </ThemeContext.Provider>
  );
}
