"use client";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/Store/store";
import { enable2FA, setup2FA } from "@/Features/Auth/authSlice";
import { useToast } from "@/Components/Common/Toast/customToast";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";

export default function TwoFactorPage() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { showToast } = useToast();
  const { twoFAData, setupLoading, enableLoading } = useSelector((state: RootState) => state.auth);
  
  // Upgraded to an array for premium segmented input boxes
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [copied, setCopied] = useState(false);

  // Re-fetch QR if store was cleared (page refresh)
  useEffect(() => {
    if (!twoFAData && !setupLoading) {
      dispatch(setup2FA());
    }
  }, []);

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const copyToClipboard = () => {
    if (twoFAData?.secret) {
      navigator.clipboard.writeText(twoFAData.secret);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      showToast("Setup key copied!", "success");
    }
  };

  const handleEnable = async (e: React.FormEvent) => {
    e.preventDefault();
    const totpCode = otp.join("");
    
    if (totpCode.length < 6) {
      showToast("Please enter a 6-digit TOTP code", "error");
      return;
    }

    const result = await dispatch(enable2FA({ token: totpCode }));
    if (enable2FA.fulfilled.match(result)) {
      showToast("2FA enabled successfully!", "success");
      router.push("/login");
    } else {
      showToast((result.payload as string) || "Invalid code. Try again.", "error");
      // Clear inputs on error
      setOtp(Array(6).fill(""));
      otpRefs.current[0]?.focus();
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] relative overflow-hidden transition-colors duration-300 font-sans flex items-center justify-center p-4 md:p-6">

      {/* Background Ambient Elements */}
      <div className="absolute inset-0 opacity-[0.2]"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, var(--secondary-lt) 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
      />
      <div className="absolute top-0 right-0 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-[var(--primary)] opacity-[0.06] blur-[100px] md:blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-[var(--secondary)] opacity-[0.06] blur-[100px] md:blur-[150px] rounded-full pointer-events-none" />

      {/* Main Card Container */}
      <div className="w-full max-w-[480px] relative z-10 animate-fadeUp">
        <div className="bg-[var(--surface)] border border-[var(--secondary-lt)] p-6 md:p-10 rounded-[2rem] backdrop-blur-md">

          {/* Centered Header */}
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-[var(--primary)] flex items-center justify-center text-[#0A0F1E] shadow-lg shadow-[var(--primary)]/20 mb-5">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h2 className="text-[var(--ink)] text-2xl md:text-3xl font-bold font-sora tracking-tight mb-2">
              Secure your account
            </h2>
            <p className="text-[var(--ink-muted)] text-sm md:text-base max-w-[300px]">
              Scan the QR code with an Authenticator app like Google or Authy.
            </p>
          </div>

          {/* Body Content */}
          {setupLoading ? (
            <div className="flex flex-col items-center justify-center py-12 gap-4">
              <span className="w-10 h-10 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin" />
              <p className="text-[var(--ink-muted)] text-sm font-medium animate-pulse">Generating secure key...</p>
            </div>
          ) : !twoFAData ? (
            <div className="text-center py-10 bg-[var(--bg)] rounded-2xl border border-[var(--secondary-lt)]">
              <p className="text-[var(--ink-muted)] text-sm mb-4">QR code not found or expired.</p>
              <button
                onClick={() => router.push('/signup')}
                className="text-[var(--primary)] font-semibold text-sm hover:underline px-4 py-2 bg-[var(--primary-lt)] rounded-lg"
              >
                Return to Signup
              </button>
            </div>
          ) : (
            <form onSubmit={handleEnable} className="space-y-8">
              
              {/* QR Code & Key Section */}
              <div className="flex flex-col items-center p-5 md:p-6 bg-[var(--bg)] border border-[var(--secondary-lt)] rounded-2xl shadow-inner">
                {twoFAData.qrCode ? (
                  <div className="bg-white p-3 rounded-2xl shadow-sm mb-5">
                    <img src={twoFAData.qrCode} alt="2FA QR Code" className="w-36 h-36 md:w-40 md:h-40 object-contain" />
                  </div>
                ) : (
                  <div className="w-36 h-36 md:w-40 md:h-40 rounded-2xl bg-[var(--secondary-lt)] mb-5 flex items-center justify-center text-[var(--ink-muted)] text-sm">
                    QR Error
                  </div>
                )}
                
                <div className="w-full text-center">
                  <p className="text-[11px] text-[var(--ink-muted)] uppercase tracking-wider mb-2 font-semibold">
                    Or enter manual setup key
                  </p>
                  <div 
                    onClick={copyToClipboard}
                    className="group flex items-center justify-between bg-[var(--surface)] text-[var(--ink)] px-4 py-2.5 rounded-xl border border-[var(--secondary-lt)] cursor-pointer hover:border-[var(--primary)] transition-colors"
                    title="Click to copy"
                  >
                    <code className="text-xs md:text-sm font-mono tracking-widest font-semibold truncate">
                      {twoFAData.secret || "ERROR-KEY"}
                    </code>
                    <div className="text-[var(--ink-muted)] group-hover:text-[var(--primary)] transition-colors shrink-0 ml-3">
                      {copied ? (
                        <svg className="w-4 h-4 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg>
                      ) : (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Segmented TOTP Input */}
              <div>
                <label className="block text-xs md:text-sm font-semibold text-[var(--ink)] mb-3 text-center uppercase tracking-wider">
                  Enter 6-digit Code
                </label>
                <div className="flex justify-between gap-2 md:gap-3">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => { otpRefs.current[index] = el; }}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      className="w-10 h-12 md:w-12 md:h-14 bg-[var(--bg)] border border-[var(--secondary-lt)] rounded-xl text-center text-xl md:text-2xl font-bold text-[var(--ink)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all shadow-sm"
                    />
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={enableLoading || otp.join("").length < 6}
                className="w-full cursor-pointer bg-[var(--primary)] text-[#0A0F1E] text-sm md:text-base font-bold py-4 rounded-xl transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-[var(--primary)]/20 mt-2"
              >
                {enableLoading ? (
                  <span className="w-5 h-5 border-2 border-[#0A0F1E] border-t-transparent rounded-full animate-spin" />
                ) : (
                  "Complete Setup"
                )}
              </button>
            </form>
          )}

        </div>
      </div>
    </div>
  );
}