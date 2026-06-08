import api from "@/lib/axios";
import { AUTH_ENDPOINTS } from "./authRoutes";
import { RegisterData, RegisterResponse, VerifyOTPData, VerifyOTPResponse, ResendOTPData, ResendOTPResponse, Setup2FAResponse, Enable2FAData, Enable2FAResponse } from "./authTypes";

export const registerService = async (data: RegisterData): Promise<RegisterResponse> => {
  try {
    const response = await api.post<RegisterResponse>(AUTH_ENDPOINTS.REGISTER, data)
    return response.data
  } catch (error) {
    throw error
  }
}

export const verifyOTPService = async (data: VerifyOTPData): Promise<VerifyOTPResponse> => {
  try {
    const response = await api.post<VerifyOTPResponse>(AUTH_ENDPOINTS.VERIFY_OTP, data)
    return response.data
  } catch (error) {
    throw error
  }
}

export const resendOTPService = async (data: ResendOTPData): Promise<ResendOTPResponse> => {
  try {
    const response = await api.post<ResendOTPResponse>(AUTH_ENDPOINTS.RESEND_OTP, data)
    return response.data
  } catch (error) {
    throw error
  }
}

export const setup2FAService = async (): Promise<Setup2FAResponse> => {
  try {
    const response = await api.post<Setup2FAResponse>(AUTH_ENDPOINTS.SETUP_2FA)
    return response.data
  } catch (error) {
    throw error
  }
}

export const enable2FAService = async (data: Enable2FAData): Promise<Enable2FAResponse> => {
  try {
    const response = await api.post<Enable2FAResponse>(AUTH_ENDPOINTS.ENABLE_2FA, data)
    return response.data
  } catch (error) {
    throw error
  }
}