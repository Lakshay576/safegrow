"use client";

import { useState, useEffect } from "react";
import { LogOut, Menu, X } from "lucide-react";
import Sidebar from "./Sidebar";
import { useRouter } from "next/navigation";

type Role = "user" | "admin" | "superadmin";

type Props = {
  children: React.ReactNode;
  role: Role;
};

export default function DashboardLayout({ children, role }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsOpen(false);
  }, []);

  const handleLogout = () => {
    router.replace("/login");
  };

  return (
    <div className="flex min-h-screen bg-[var(--bg)] relative">

      {/* Mobile Topbar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 h-14 bg-[var(--surface)] border-b border-[var(--secondary-lt)] flex items-center justify-between px-4 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[var(--primary)] flex items-center justify-center">
            <svg className="w-4 h-4" fill="none" stroke="#0A0F1E" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="text-base font-bold tracking-tight text-[var(--ink)]">
            SafeGrow
          </span>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-lg hover:bg-[var(--secondary-lt)] transition-colors text-[var(--ink)]"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`
        flex flex-col h-screen bg-[var(--surface)] border-r border-[var(--secondary-lt)] shadow-sm
        fixed top-0 left-0 z-40 w-64 transition-transform duration-300
        lg:sticky lg:translate-x-0
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}>

        {/* Brand */}
        <div className="flex-shrink-0 px-5 py-5 border-b border-[var(--secondary-lt)]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[var(--primary)] flex items-center justify-center shadow-sm">
              <svg className="w-4 h-4" fill="none" stroke="#0A0F1E" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="text-lg font-bold tracking-tight text-[var(--ink)]">
              SafeGrow
            </span>
          </div>
        </div>

        {/* Scrollable Nav */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden py-2">
          <Sidebar role={role} onNavigate={() => setIsOpen(false)} />
        </div>

        {/* Logout */}
        <div className="flex-shrink-0 px-4 py-4 border-t border-[var(--secondary-lt)]">
          <button
            onClick={handleLogout}
            className="w-full flex cursor-pointer items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-500 hover:bg-red-500/10 transition-all duration-150 group"
          >
            <LogOut size={17} className="text-red-500 group-hover:translate-x-0.5 transition-transform duration-150" />
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 z-30 bg-black/30 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 p-4 lg:p-6 bg-[var(--bg)] overflow-auto pt-20 lg:pt-6">
        <div className="max-w-6xl mx-auto">{children}</div>
      </main>

    </div>
  );
}