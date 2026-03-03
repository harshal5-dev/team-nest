import { configureStore } from "@reduxjs/toolkit";

import authReducer from "@/pages/auth/authSlice";
import { authApi } from "@/pages/auth/authApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(authApi.middleware),
});
