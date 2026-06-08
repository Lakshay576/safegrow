"use client";

import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import { X, CheckCircle2, AlertCircle, Info, Loader2 } from 'lucide-react';

// --- Types ---
type ToastType = 'success' | 'error' | 'info' | 'loading';

interface ToastItem {
  id: string;
  message: string;
  type: ToastType;
  duration: number;
}

interface ToastContextValue {
  showToast: (message: string, type?: ToastType, duration?: number) => void;
}

interface ToastProps extends ToastItem {
  onClose: (id: string) => void;
}

// --- Context & Hook Definition ---
const ToastContext = createContext<ToastContextValue | null>(null);

export const useToast = (): ToastContextValue => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

// --- Toast Component ---
const Toast = ({ id, message, type = 'success', onClose, duration = 4000 }: ToastProps) => {
  const [isExiting, setIsExiting] = useState(false);
  const [remaining, setRemaining] = useState(duration);
  const [isPaused, setIsPaused] = useState(false);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const startRef = useRef<number>(Date.now());

  const handleClose = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => onClose(id), 500);
  }, [id, onClose]);

  useEffect(() => {
    if (isPaused || isExiting) {
      if (timerRef.current) clearTimeout(timerRef.current);
      return;
    }

    startRef.current = Date.now();
    timerRef.current = setTimeout(handleClose, remaining);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isPaused, isExiting, remaining, handleClose]);

  const onMouseEnter = () => {
    setIsPaused(true);
    const elapsed = Date.now() - startRef.current;
    setRemaining((prev) => Math.max(0, prev - elapsed));
  };

  const onMouseLeave = () => {
    setIsPaused(false);
  };

  const config: Record<ToastType, { icon: React.ReactNode; bg: string; border: string }> = {
    success: {
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-500" />,
      bg: 'bg-white',
      border: 'border-slate-200',
    },
    error: {
      icon: <AlertCircle className="w-5 h-5 text-red-500" />,
      bg: 'bg-[#fafafa]',
      border: 'border-slate-200',
    },
    info: {
      icon: <Info className="w-5 h-5 text-blue-500" />,
      bg: 'bg-white',
      border: 'border-slate-200',
    },
    loading: {
      icon: <Loader2 className="w-5 h-5 text-slate-400 animate-spin" />,
      bg: 'bg-white',
      border: 'border-slate-200',
    },
  };

  const { icon, bg, border } = config[type] ?? config.success;

  return (
    <>
      <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; filter: blur(4px); }
          to { transform: translateX(0); opacity: 1; filter: blur(0); }
        }
        .toast-entrance {
          animation: slideIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
      <div
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className={`
          flex items-center min-w-[320px] max-w-md p-4 mb-3 rounded-lg border shadow-lg
          ${bg} ${border} text-slate-900 cursor-default
          transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1) transform
          ${isExiting ? 'opacity-0 translate-x-12 scale-95 blur-sm' : 'toast-entrance'}
          ${isPaused ? 'ring-2 ring-slate-100 scale-[1.02]' : ''}
        `}
        role="alert"
      >
        <div className="flex-shrink-0 mr-3">{icon}</div>
        <div className="flex-1 text-sm font-medium pr-4 leading-tight">{message}</div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleClose();
          }}
          className="flex-shrink-0 ml-auto -mx-1.5 -my-1.5 cursor-pointer text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg p-1.5 inline-flex h-8 w-8 transition-colors active:scale-90"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </>
  );
};

// --- Provider Component ---
export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showToast = useCallback((message: string, type: ToastType = 'success', duration = 4000) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, message, type, duration }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed top-6 right-6 z-[9999] flex flex-col items-end pointer-events-none">
        {toasts.map((toast) => (
          <div key={toast.id} className="pointer-events-auto">
            <Toast {...toast} onClose={removeToast} />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};