
// State
export interface AuthState {
  user: {
    id: string
    email: string
    isEmailVerified: boolean
  } | null
  loading: boolean
  error: string | null
  successMessage: string | null
  sessionToken: string | null
    resendLoading: boolean
    resendError: string | null
    twoFAData: { qrCode: string; secret: string } | null
    setupLoading: boolean
    enableLoading: boolean
}





// Request
export interface RegisterData {
  name?: string
  email: string
  password: string
  mobile?: string
}

// Response
export interface RegisterResponse {
  success: boolean
  message: string
  data: {
    id: string
    email: string
    isEmailVerified: boolean
  }
}

export interface VerifyOTPData {
  email: string
  otp: string
}

export interface VerifyOTPResponse {
  success: boolean
  message: string
  data: {
    id: string
    email: string
    sessionToken: string
  }
}

export interface ResendOTPData {
  email: string
}

export interface ResendOTPResponse {
  success: boolean
  message: string
}

export interface Setup2FAResponse {
  success: boolean
  message: string
  data: {
    qrCode: string
    secret: string
  }
}

export interface Enable2FAData {
  token: string
}

export interface Enable2FAResponse {
  success: boolean
  message: string
}

export interface LoginData {
  email: string
  password: string
}

export interface LoginResponse {
  success: boolean
  requires2FA?: boolean
  requires2FASetup?: boolean
  tempToken?: string
  message: string
}

export interface Verify2FAData {
  tempToken: string
  token: string
}

export interface Verify2FAResponse {
  success: boolean
  message: string
  data: {
    id: string
    name: string
    email: string
    mobile: string
    sessionToken: string
    redirect: string
  }
}