import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  refreshToken: null,
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { refreshToken } = action.payload;
      state.refreshToken = refreshToken;
      state.isAuthenticated = true;
    },
    clearCredentials: (state) => {
      state.user = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setCredentials, clearCredentials, setUser } = authSlice.actions;

export const selectCurrentUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectRefreshToken = (state) => state.auth.refreshToken;

export default authSlice.reducer;
