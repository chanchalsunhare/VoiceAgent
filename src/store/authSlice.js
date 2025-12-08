import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: localStorage.getItem('authToken') || null,
  isAuthenticated: !!localStorage.getItem('authToken'),
  loading: false,
  error: null,
  successMessage: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Login actions
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
      state.successMessage = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.error = null;
      state.successMessage = 'Login successful!';
      localStorage.setItem('authToken', action.payload.token);
      if (action.payload.user) {
        localStorage.setItem('user', JSON.stringify(action.payload.user));
      }
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
      state.token = null;
    },

    // Signup actions
    signupStart: (state) => {
      state.loading = true;
      state.error = null;
      state.successMessage = null;
    },
    signupSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.successMessage = action.payload.message || 'Signup successful! Please login.';
    },
    signupFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Logout action
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      state.successMessage = null;
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
    },

    // Clear messages
    clearError: (state) => {
      state.error = null;
    },
    clearSuccessMessage: (state) => {
      state.successMessage = null;
    },

    // Initialize auth from localStorage
    initializeAuth: (state) => {
      const token = localStorage.getItem('authToken');
      const user = localStorage.getItem('user');
      if (token) {
        state.token = token;
        state.isAuthenticated = true;
        state.user = user ? JSON.parse(user) : null;
      }
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  signupStart,
  signupSuccess,
  signupFailure,
  logout,
  clearError,
  clearSuccessMessage,
  initializeAuth,
} = authSlice.actions;

export default authSlice.reducer;
