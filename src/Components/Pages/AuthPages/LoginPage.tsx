"use client";

import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { login, verify2FAAction } from "../../../Features/Auth/authSlice";
import { useToast } from "@/Components/Common/Toast/customToast";

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch<any>();
  const { loading, error } = useSelector((state: any) => state.auth);
  const { showToast } = useToast();

  const [step, setStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [twoFactorCode, setTwoFactorCode] = useState("");
  const [tempToken, setTempToken] = useState("");
  const twoFAInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Validation States
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [twoFactorError, setTwoFactorError] = useState(false);

  const handleStep1Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    let isValid = true;

    // Email Validation (Empty or Invalid Format)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setEmailError(true);
      isValid = false;
    }

    // Password Validation (Empty)
    if (!password) {
      setPasswordError(true);
      isValid = false;
    }

    if (!isValid) return;

    try {
      const res = await dispatch(login({ email, password })).unwrap();
      if (res.requires2FA || res.requires2FASetup) {
        setTempToken(res.tempToken);
        setStep(2);
      } else {
        if (res.data?.twoFAEnabled === false) {
          showToast("2FA is not enabled. Redirecting to set it up...", 'info', 3000);
          setTimeout(() => router.push("/2fa"), 1500);
        } else {
          showToast("Login successful!", 'success');
          router.push("/dashboard");
        }
      }
    } catch (err: any) {
      showToast(err || "Login failed", 'error');
    }
  };

  const handleStep2Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 2FA Validation (Must be exactly 6 digits)
    if (twoFactorCode.length < 6) {
      setTwoFactorError(true);
      return;
    }

    try {
      const res = await dispatch(verify2FAAction({ tempToken, token: twoFactorCode })).unwrap();
      if (res.success) {
        showToast("Authentication successful!", 'success');
        router.push(res.data?.redirect || "/dashboard");
      }
    } catch (err: any) {
      showToast(err || "2FA verification failed", 'error');
      setTwoFactorCode("");
      twoFAInputRefs.current[0]?.focus();
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] relative overflow-hidden transition-colors duration-300 font-sans flex items-center">
      
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 opacity-[0.2]"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, var(--secondary-lt) 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
      />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[var(--primary)] opacity-[0.05] blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[var(--secondary)] opacity-[0.05] blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-[1200px] w-full mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center justify-between gap-16 relative z-10">
        
        {/* LEFT SECTION: Minimal Platform Information */}
        <div className="w-full lg:w-[50%] flex flex-col items-start animate-fadeUp">
          
          <div className="inline-flex items-center gap-3 text-[var(--ink)] font-sora font-bold text-3xl tracking-tight mb-8">
            <div className="w-12 h-12 rounded-xl bg-[var(--primary)] flex items-center justify-center text-[#0A0F1E] shadow-lg shadow-[var(--primary)]/20">
              <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
            </div>
            SafeGrow
          </div>

          <h1 className="text-[var(--ink)] text-4xl md:text-5xl font-bold font-sora tracking-tight leading-[1.1] mb-6">
            Intelligent <br />
            Algorithmic Trading.
          </h1>
          
          <p className="text-[var(--ink-muted)] text-lg leading-relaxed max-w-[480px] mb-10">
            Connect your broker and let our AI engine optimize your portfolio. Experience institutional-grade execution, automated risk mitigation, and completely emotionless trading.
          </p>

          <div className="space-y-5">
            {[
              "Zero-latency direct market access (NSE/BSE).",
              "Automated risk & stop-loss management.",
              "SEBI-compliant, proven quantitative strategies."
            ].map((feature, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[var(--primary-lt)] text-[var(--primary)] flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-[var(--ink)] font-medium text-sm md:text-base">{feature}</span>
              </div>
            ))}
          </div>

        </div>

        {/* RIGHT SECTION: Login Card */}
        <div className="w-full lg:w-[440px] shrink-0 animate-fadeUp" style={{ animationDelay: '0.1s' }}>
          <div className="bg-[var(--surface)] border border-[var(--secondary-lt)] p-8 md:p-10 rounded-[2rem]  backdrop-blur-sm">
            
            <div className="mb-8 text-left">
              <h2 className="text-[var(--ink)] text-2xl font-bold font-sora tracking-tight mb-2">
                {step === 1 ? "Welcome back" : "Security Verification"}
              </h2>
              <p className="text-[var(--ink-muted)] text-sm">
                {step === 1 
                  ? "Enter your credentials to access your account." 
                  : "Enter the 6-digit code from your authenticator app."}
              </p>
            </div>

            {/* STEP 1: Email & Password */}
            {step === 1 && (
              <form onSubmit={handleStep1Submit} className="space-y-5" noValidate>
                <div>
                  <label className="block text-sm font-medium text-[var(--ink)] mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (emailError) setEmailError(false);
                    }}
                    placeholder="Enter your email"
                    className={`w-full bg-[var(--bg)] border rounded-xl px-4 py-3.5 text-sm text-[var(--ink)] placeholder-[var(--ink-muted)] focus:outline-none focus:ring-1 transition-all ${
                      emailError 
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500" 
                        : "border-[var(--secondary-lt)] focus:border-[var(--primary)] focus:ring-[var(--primary)]"
                    }`}
                  />
                  {emailError && <p className="text-red-500 text-xs mt-1.5 font-medium">Please enter a valid email address.</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--ink)] mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (passwordError) setPasswordError(false);
                      }}
                      placeholder="Enter your password"
                      className={`w-full bg-[var(--bg)] border rounded-xl pl-4 pr-12 py-3.5 text-sm text-[var(--ink)] placeholder-[var(--ink-muted)] focus:outline-none focus:ring-1 transition-all ${
                        passwordError 
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500" 
                          : "border-[var(--secondary-lt)] focus:border-[var(--primary)] focus:ring-[var(--primary)]"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute cursor-pointer right-4 top-1/2 -translate-y-1/2 text-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors"
                    >
                      {showPassword ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                      )}
                    </button>
                  </div>
                  {passwordError && <p className="text-red-500 text-xs mt-1.5 font-medium">Password is required.</p>}
                </div>

                <div className="flex justify-end pt-1">
                  <a href="#forgot" className="text-xs text-[var(--primary)] font-medium hover:underline">
                    Forgot Password?
                  </a>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full cursor-pointer bg-[var(--primary)] text-[#0A0F1E] text-sm font-semibold py-4 rounded-xl transition-all hover:opacity-90 mt-2 flex items-center justify-center gap-2 shadow-lg shadow-[var(--primary)]/20"
                >
                  {loading ? (
                    <span className="w-5 h-5 border-2 border-[#0A0F1E] border-t-transparent rounded-full animate-spin" />
                  ) : (
                    "Log in securely"
                  )}
                </button>
              </form>
            )}

            {/* STEP 2: Google Authenticator */}
            {step === 2 && (
              <form onSubmit={handleStep2Submit} className="space-y-6" noValidate>
                <div>
                  <label className="block text-sm font-medium text-[var(--ink)] mb-3 text-center">
                    Authenticator Code
                  </label>
                  <div className="flex justify-center gap-2.5">
                    {Array.from({ length: 6 }).map((_, idx) => (
                      <input
                        key={idx}
                        ref={(el) => { twoFAInputRefs.current[idx] = el; }}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={twoFactorCode[idx] || ""}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, "");
                          let newCode = twoFactorCode.split("");
                          while (newCode.length < 6) newCode.push("");
                          newCode[idx] = val;
                          setTwoFactorCode(newCode.join(""));
                          if (twoFactorError) setTwoFactorError(false);
                          if (val && idx < 5) {
                            twoFAInputRefs.current[idx + 1]?.focus();
                          }
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Backspace" && (!twoFactorCode[idx] || twoFactorCode[idx] === "") && idx > 0) {
                            let newCode = twoFactorCode.split("");
                            while (newCode.length < 6) newCode.push("");
                            newCode[idx - 1] = "";
                            setTwoFactorCode(newCode.join(""));
                            twoFAInputRefs.current[idx - 1]?.focus();
                          }
                        }}
                        onPaste={(e) => {
                          e.preventDefault();
                          const paste = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
                          setTwoFactorCode(paste);
                          if (twoFactorError) setTwoFactorError(false);
                          const focusIdx = Math.min(paste.length, 5);
                          twoFAInputRefs.current[focusIdx]?.focus();
                        }}
                        className={`w-12 h-14 bg-[var(--bg)] border rounded-xl text-center text-xl font-semibold text-[var(--ink)] focus:outline-none focus:ring-1 transition-all ${
                          twoFactorError
                            ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                            : "border-[var(--secondary-lt)] focus:border-[var(--primary)] focus:ring-[var(--primary)]"
                        }`}
                      />
                    ))}
                  </div>
                  {twoFactorError && <p className="text-red-500 text-xs mt-2 font-medium text-center">Please enter a valid 6-digit code.</p>}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full cursor-pointer bg-[var(--primary)] text-[#0A0F1E] text-sm font-semibold py-4 rounded-xl transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-[var(--primary)]/20"
                >
                  {loading ? (
                    <span className="w-5 h-5 border-2 border-[#0A0F1E] border-t-transparent rounded-full animate-spin" />
                  ) : (
                    "Verify & Access Portfolio"
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setStep(1);
                    setTwoFactorCode("");
                    setTwoFactorError(false);
                  }}
                  className="w-full cursor-pointer text-center text-sm text-[var(--ink-muted)] hover:text-[var(--ink)] font-medium transition-colors mt-4"
                >
                  ← Back to credentials
                </button>
              </form>
            )}

            {/* Footer info link */}
            <div className="mt-8 pt-6 border-t border-[var(--secondary-lt)] text-center text-sm text-[var(--ink-muted)]">
              Don't have an account?{" "}
              <a href="/signup" className="text-[var(--primary)] font-semibold hover:underline">
                Sign up
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}