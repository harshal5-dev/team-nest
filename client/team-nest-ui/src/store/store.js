import { configureStore } from "@reduxjs/toolkit";

import authReducer from "@/pages/auth/authSlice";
import { authApi } from "@/pages/auth/authApi";
import { permissionApi } from "@/pages/permission/permissionApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [permissionApi.reducerPath]: permissionApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(authApi.middleware, permissionApi.middleware),
});
