import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type {
  RegisterData,
  AuthState,
  VerifyOTPData,
  ResendOTPData,
  Enable2FAData,
  Enable2FAResponse,
  LoginData,
  Verify2FAData
} from "./authTypes";
import {
  registerService,
  verifyOTPService,
  resendOTPService,
  setup2FAService,
  enable2FAService,
  loginService,
  verify2FAService
} from "./authServices";

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  successMessage: null,
  sessionToken: null,
  resendLoading: false,
  resendError: null,
  twoFAData: null,
  setupLoading: false,
  enableLoading: false,
};

export const registerUser = createAsyncThunk(
  "auth/register",
  async (data: RegisterData, { rejectWithValue }) => {
    try {
      return await registerService(data);
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Registration failed",
      );
    }
  },
);

export const verifyOTP = createAsyncThunk(
  "auth/verifyOTP",
  async (data: VerifyOTPData, { rejectWithValue }) => {
    try {
      return await verifyOTPService(data);
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "OTP verification failed",
      );
    }
  },
);

export const resendOTP = createAsyncThunk(
  "auth/resendOTP",
  async (data: ResendOTPData, { rejectWithValue }) => {
    try {
      return await resendOTPService(data);
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to resend OTP",
      );
    }
  },
);

export const setup2FA = createAsyncThunk(
  'auth/setup2FA',
  async (_, { rejectWithValue }) => {
    try {
      return await setup2FAService()
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || '2FA setup failed')
    }
  }
)

export const enable2FA = createAsyncThunk(
  'auth/enable2FA',
  async (data: Enable2FAData, { rejectWithValue }) => {
    try {
      return await enable2FAService(data)
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || '2FA enable failed')
    }
  }
)

export const login = createAsyncThunk(
  'auth/login',
  async (data: LoginData, { rejectWithValue }) => {
    try {
      return await loginService(data)
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Login failed')
    }
  }
)

export const verify2FAAction = createAsyncThunk(
  'auth/verify2FA',
  async (data: Verify2FAData, { rejectWithValue }) => {
    try {
      return await verify2FAService(data)
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || '2FA verification failed')
    }
  }
)

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data; // { id, email, isEmailVerified }
        state.successMessage = action.payload.message; // "Registration successful. Please check your email..."
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Verify OTP
      .addCase(verifyOTP.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOTP.fulfilled, (state, action) => {
        state.loading = false;
        state.sessionToken = action.payload.data.sessionToken;
        state.successMessage = action.payload.message;
      })
      .addCase(verifyOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Resend OTP
      .addCase(resendOTP.pending, (state) => {
        state.resendLoading = true;
        state.resendError = null;
      })
      .addCase(resendOTP.fulfilled, (state, action) => {
        state.resendLoading = false;
        state.successMessage = action.payload.message;
      })
      .addCase(resendOTP.rejected, (state, action) => {
        state.resendLoading = false;
        state.resendError = action.payload as string;
      })

      // Setup 2FA
    .addCase(setup2FA.pending, (state) => {
    state.setupLoading = true
    state.error = null
    })
    .addCase(setup2FA.fulfilled, (state, action) => {
    state.setupLoading = false
    state.twoFAData = action.payload.data
    })
    .addCase(setup2FA.rejected, (state, action) => {
    state.setupLoading = false
    state.error = action.payload as string
    })

    // Enable 2FA
    .addCase(enable2FA.pending, (state) => {
    state.enableLoading = true
    state.error = null
    })
    .addCase(enable2FA.fulfilled, (state, action) => {
    state.enableLoading = false
    state.successMessage = action.payload.message
    })
    .addCase(enable2FA.rejected, (state, action) => {
    state.enableLoading = false
    state.error = action.payload as string
    })

    // Login
    .addCase(login.pending, (state) => {
      state.loading = true
      state.error = null
      state.successMessage = null
    })
    .addCase(login.fulfilled, (state, action) => {
      state.loading = false
      state.successMessage = action.payload.message
    })
    .addCase(login.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload as string
    })

    // Verify 2FA
    .addCase(verify2FAAction.pending, (state) => {
      state.loading = true
      state.error = null
    })
    .addCase(verify2FAAction.fulfilled, (state, action) => {
      state.loading = false
      state.sessionToken = action.payload.data.sessionToken
      state.successMessage = action.payload.message
      // The user data might need to be stored, currently it's just ID/email/mobile etc.
    })
    .addCase(verify2FAAction.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload as string
    })

  },
});

export const { clearError, clearMessage } = authSlice.actions;
export default authSlice.reducer;
