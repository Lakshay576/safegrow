export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL

export const AUTH_ENDPOINTS = {
  REGISTER:        `${API_BASE_URL}/api/auth/register`,
  VERIFY_OTP:      `${API_BASE_URL}/api/auth/verify-otp`,
  RESEND_OTP:      `${API_BASE_URL}/api/auth/resend-otp`,
  SETUP_2FA:       `${API_BASE_URL}/api/auth/2fa/setup`,
  ENABLE_2FA:      `${API_BASE_URL}/api/auth/2fa/enable`,
}
