"use client";

import { registerUser, verifyOTP, resendOTP, setup2FA, enable2FA  } from "@/Features/Auth/authSlice";
import { AppDispatch, RootState } from "@/Store/store";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/Components/Common/Toast/customToast";

type Step = "signup" | "otp" | "setup2fa";

interface FormData {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export default function SignupPage() {
  // --- STATE FROM YOUR CODE ---
  const [step, setStep] = useState<Step>("signup");
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [errors, setErrors] = useState<Partial<FormData & { otp: string }>>({});
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
  const { showToast } = useToast();
  const router = useRouter();
  
  const [totpCode, setTotpCode] = useState("");

  const dispatch = useDispatch<AppDispatch>();
  const {loading: isLoading, error: registerError, loading: otpLoading, resendLoading, setupLoading, enableLoading, twoFAData } = useSelector((state: RootState)=> state.auth);

  // --- EFFECTS ---
  useEffect(() => {
    if (step === "otp") otpRefs.current[0]?.focus();
  }, [step]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (step === "otp" && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    if (timer === 0) {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [timer, step]);

  // --- HANDLERS ---
  const validate = (): boolean => {
    const e: Partial<FormData> = {};
    if (!formData.name.trim()) e.name = "Name is required";
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = "Valid email required";
    if (!formData.phone.match(/^\+?[\d\s-]{10,}/)) e.phone = "Valid phone required";
    if (formData.password.length < 8) e.password = "Min 8 characters required";
    if (formData.password !== formData.confirmPassword) e.confirmPassword = "Passwords don't match";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleStep1Submit = async (e: React.FormEvent) => {
  e.preventDefault()
  if (!validate()) return

  const result = await dispatch(registerUser({
    name: formData.name,
    email: formData.email,
    password: formData.password,
    mobile: formData.phone,
  }))

  if (registerUser.fulfilled.match(result)) {
    setTimer(60)
    setCanResend(false)
    setStep("otp")
  }
}

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (errors.otp) setErrors(prev => ({ ...prev, otp: undefined }));

    if (value && index < 5) otpRefs.current[index + 1]?.focus();
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

    const handleStep2Submit = async (e: React.FormEvent) => {
  e.preventDefault()
  const code = otp.join("")
  if (code.length < 6) {
    setErrors({ otp: "Please enter a 6-digit code" })
    return
  }

  const verifyResult = await dispatch(verifyOTP({ email: formData.email, otp: code }))
  if (verifyOTP.fulfilled.match(verifyResult)) {
    await dispatch(setup2FA())
    setStep("setup2fa")
  }
}

const handleResendOtp = async () => {
  const result = await dispatch(resendOTP({ email: formData.email }))
  if (resendOTP.fulfilled.match(result)) {
    setTimer(60)
    setCanResend(false)
    showToast("OTP resent to your email.")
  }
}

 const handleStep3Submit = async (e: React.FormEvent) => {
  e.preventDefault()
  if (totpCode.length < 6) return

  const result = await dispatch(enable2FA({ token: totpCode }))
  if (enable2FA.fulfilled.match(result)) {
    showToast("Account created and secured successfully!")
    router.push('/login')
  }
}

  return (
    <div className="min-h-screen bg-[var(--bg)] relative overflow-hidden transition-colors duration-300 font-sans flex items-center py-10">
      
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 opacity-[0.2]"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, var(--secondary-lt) 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
      />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[var(--primary)] opacity-[0.05] blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[var(--secondary)] opacity-[0.05] blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-[1200px] w-full mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16 relative z-10">
        
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
              "24/7 automated risk & stop-loss management.",
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

        {/* RIGHT SECTION: Signup/Verification Card */}
        <div className="w-full lg:w-[460px] shrink-0 animate-fadeUp" style={{ animationDelay: '0.1s' }}>
          <div className="bg-[var(--surface)] border border-[var(--secondary-lt)] p-8 md:p-10 rounded-[2rem] backdrop-blur-sm">
            
            {/* Header Titles */}
            <div className="mb-8 text-left">
              <h2 className="text-[var(--ink)] text-2xl font-bold font-sora tracking-tight mb-2">
                {step === "signup" && "Create your account"}
                {step === "otp" && "Verify your email"}
                {step === "setup2fa" && "Secure your account"}
              </h2>
              <p className="text-[var(--ink-muted)] text-sm">
                {step === "signup" && "Start your journey to autonomous wealth generation."}
                {step === "otp" && `We sent a 6-digit code to ${formData.email || 'your email'}.`}
                {step === "setup2fa" && "Scan the QR code with your Authenticator app."}
              </p>
            </div>

            {/* STEP 1: SIGNUP FORM */}
            {step === "signup" && (
              <form onSubmit={handleStep1Submit} className="space-y-4" noValidate>
                {/* Name */}
                <div>
                     <label className="block text-sm font-medium text-[var(--ink)] mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Full Name"
                    className={`w-full bg-[var(--bg)] border rounded-xl px-4 py-3.5 text-sm text-[var(--ink)] placeholder-[var(--ink-muted)] focus:outline-none focus:ring-1 transition-all ${
                      errors.name ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-[var(--secondary-lt)] focus:border-[var(--primary)] focus:ring-[var(--primary)]"
                    }`}
                  />
                </div>

                  <div className="flex-1">
                       <label className="block text-sm font-medium text-[var(--ink)] mb-1.5">
                    Email Address
                  </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email Address"
                      className={`w-full bg-[var(--bg)] border rounded-xl px-4 py-3.5 text-sm text-[var(--ink)] placeholder-[var(--ink-muted)] focus:outline-none focus:ring-1 transition-all ${
                        errors.email ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-[var(--secondary-lt)] focus:border-[var(--primary)] focus:ring-[var(--primary)]"
                      }`}
                    />
                  </div>

                  <div className="flex-1">
                       <label className="block text-sm font-medium text-[var(--ink)] mb-1.5">
                    Mobile Number
                  </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Phone Number"
                      className={`w-full bg-[var(--bg)] border rounded-xl px-4 py-3.5 text-sm text-[var(--ink)] placeholder-[var(--ink-muted)] focus:outline-none focus:ring-1 transition-all ${
                        errors.phone ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-[var(--secondary-lt)] focus:border-[var(--primary)] focus:ring-[var(--primary)]"
                      }`}
                    />
                  </div>
                  {/* Password */}
                    <div>
                    <label className="block text-sm font-medium text-[var(--ink)] mb-1.5">
                        Password
                    </label>
                    <div className="relative">
                        <input
                        type={showPass ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Create Password"
                        className={`w-full bg-[var(--bg)] border rounded-xl pl-4 pr-12 py-3.5 text-sm text-[var(--ink)] placeholder-[var(--ink-muted)] focus:outline-none focus:ring-1 transition-all ${
                            errors.password ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-[var(--secondary-lt)] focus:border-[var(--primary)] focus:ring-[var(--primary)]"
                        }`}
                        />
                        <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--ink-muted)] hover:text-[var(--ink)]">
                        {showPass ? <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg> : <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>}
                        </button>
                    </div>
                    </div>

                    {/* Confirm Password */}
                    <div>
                    <label className="block text-sm font-medium text-[var(--ink)] mb-1.5">
                        Confirm Password
                    </label>
                    <div className="relative">
                        <input
                        type={showConfirm ? "text" : "password"}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm Password"
                        className={`w-full bg-[var(--bg)] border rounded-xl pl-4 pr-12 py-3.5 text-sm text-[var(--ink)] placeholder-[var(--ink-muted)] focus:outline-none focus:ring-1 transition-all ${
                            errors.confirmPassword ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-[var(--secondary-lt)] focus:border-[var(--primary)] focus:ring-[var(--primary)]"
                        }`}
                        />
                        <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--ink-muted)] hover:text-[var(--ink)]">
                            {showConfirm ? <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg> : <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>}
                        </button>
                    </div>
                    </div>

          
                <button type="submit" disabled={isLoading} className="w-full cursor-pointer bg-[var(--primary)] text-[#0A0F1E] text-sm font-semibold py-4 rounded-xl transition-all hover:opacity-90 mt-4 flex items-center justify-center gap-2 shadow-lg shadow-[var(--primary)]/20">
                  {isLoading ? <span className="w-5 h-5 border-2 border-[#0A0F1E] border-t-transparent rounded-full animate-spin" /> : "Continue to Verification"}
                </button>
              </form>
            )}

            {/* STEP 2: EMAIL OTP VERIFICATION */}
            {step === "otp" && (
              <form onSubmit={handleStep2Submit} className="space-y-6 animate-fadeUp">
                <div>
                  <div className="flex justify-between gap-2 md:gap-3 mb-2">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        ref={(el) => { otpRefs.current[index] = el; }}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                        className={`w-12 h-14 bg-[var(--bg)] border rounded-xl text-center text-xl font-semibold text-[var(--ink)] focus:outline-none focus:ring-1 transition-all ${
                          errors.otp ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-[var(--secondary-lt)] focus:border-[var(--primary)] focus:ring-[var(--primary)]"
                        }`}
                      />
                    ))}
                  </div>
                  {errors.otp && <p className="text-red-500 text-xs font-medium text-center">{errors.otp}</p>}
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-[var(--ink-muted)]">
                    {timer > 0 ? `Resend code in 00:${timer.toString().padStart(2, "0")}` : "Didn't receive a code?"}
                  </span>
                  <button type="button" onClick={handleResendOtp} disabled={!canResend || resendLoading} className="text-[var(--primary)] font-semibold disabled:opacity-50 hover:underline">
                    Resend Code
                  </button>
                </div>

                <button type="submit" disabled={otpLoading || otp.join("").length < 6} className="w-full cursor-pointer bg-[var(--primary)] text-[#0A0F1E] text-sm font-semibold py-4 rounded-xl transition-all hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-[var(--primary)]/20">
                  {otpLoading ? <span className="w-5 h-5 border-2 border-[#0A0F1E] border-t-transparent rounded-full animate-spin" /> : "Verify Email"}
                </button>
              </form>
            )}

            {/* STEP 3: 2FA SETUP */}
            {step === "setup2fa" && (
              <form onSubmit={handleStep3Submit} className="space-y-6 animate-fadeUp">
                {setupLoading ? (
                  <div className="flex justify-center py-10"><span className="w-8 h-8 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin" /></div>
                ) : (
                  <>
                    <div className="flex flex-col items-center p-4 bg-[var(--bg)] border border-[var(--secondary-lt)] rounded-2xl">
                      {twoFAData?.qrCode ? (
                        <img src={twoFAData.qrCode} alt="2FA QR Code" className="w-40 h-40 rounded-xl mb-4 bg-white p-2" />
                      ) : (
                        <div className="w-40 h-40 rounded-xl bg-[var(--secondary-lt)] mb-4 flex items-center justify-center text-[var(--ink-muted)]">QR Error</div>
                      )}
                      <p className="text-xs text-[var(--ink-muted)] uppercase tracking-wider mb-1">Manual Setup Key</p>
                      <code className="bg-[var(--surface)] text-[var(--ink)] px-3 py-1.5 rounded text-sm font-mono tracking-widest border border-[var(--secondary-lt)]">
                        {twoFAData?.secret || "ERROR-KEY"}
                      </code>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[var(--ink)] mb-1.5 text-center">
                        Enter 6-digit TOTP Code
                      </label>
                      <input
                        type="text"
                        maxLength={6}
                        value={totpCode}
                        onChange={(e) => setTotpCode(e.target.value.replace(/\D/g, ""))}
                        placeholder="000000"
                        className="w-full bg-[var(--bg)] border border-[var(--secondary-lt)] rounded-xl px-4 py-4 text-center text-2xl font-mono tracking-[0.5em] text-[var(--ink)] placeholder-[var(--ink-muted)] focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] transition-all"
                      />
                    </div>

                    <button type="submit" disabled={enableLoading || totpCode.length < 6} className="w-full cursor-pointer bg-[var(--primary)] text-[#0A0F1E] text-sm font-semibold py-4 rounded-xl transition-all hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-[var(--primary)]/20">
                      {enableLoading ? <span className="w-5 h-5 border-2 border-[#0A0F1E] border-t-transparent rounded-full animate-spin" /> : "Complete Setup"}
                    </button>
                  </>
                )}
              </form>
            )}

            {/* Footer info link */}
            {step === "signup" && (
              <div className="mt-8 pt-6 border-t border-[var(--secondary-lt)] text-center text-sm text-[var(--ink-muted)]">
                Already have an account?{" "}
                <a href="/login" className="text-[var(--primary)] font-semibold hover:underline">
                  Log in
                </a>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}