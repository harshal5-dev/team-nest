import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@/lib/utils";
import { clearCredentials, setCredentials, setUser } from "./authSlice";
import { showToast } from "@/components/ui/sonner";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQuery,
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Auth"],
    }),

    register: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/register",
        method: "POST",
        body: userInfo,
      }),
    }),

    refreshToken: builder.mutation({
      query: (payload) => ({
        url: "/auth/refresh",
        method: "POST",
        body: payload,
      }),
      transformResponse: (response) => response.data,
    }),

    forgotPassword: builder.mutation({
      query: (payload) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: payload,
      }),
    }),

    resetPassword: builder.mutation({
      query: (payload) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: payload,
      }),
    }),

    isAuthenticated: builder.query({
      query: () => ({
        url: "/auth/is-authenticated",
        method: "GET",
      }),
      transformResponse: (response) => response.data,
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          if (data) {
            // Hydrate Redux with tokens from cookies on initial load
            const getTokenFromCookie = async (name) => {
              if (typeof cookieStore === "undefined") return null;
              const cookie = await cookieStore.get(name);
              return cookie?.value ?? null;
            };

            const [refreshToken, accessToken] = await Promise.all([
              getTokenFromCookie("refreshToken"),
              getTokenFromCookie("accessToken"),
            ]);

            dispatch(setCredentials({ refreshToken, accessToken }));
          }
        } catch (_error) {
          dispatch(clearCredentials());
          showToast.error("Session check failed. Please log in again.");
        }
      },
    }),

    getUserInfo: builder.query({
      query: () => ({
        url: "/auth/me",
        method: "GET",
      }),
      transformResponse: (response) => response.data,
      providesTags: ["Auth"],
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
        } catch (_error) {
          showToast.error("Failed to fetch user info. Please try again.");
        }
      },
    }),

    updateUserInfo: builder.mutation({
      query: (userData) => ({
        url: "/auth/update/me",
        method: "PUT",
        body: userData,
      }),
      invalidatesTags: ["Auth"],
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data: response } = await queryFulfilled;
          const userData = response?.data ?? response;
          if (userData) {
            dispatch(setUser(userData));
          }
        } catch {
          // handled by caller
        }
      },
    }),

    updatePassword: builder.mutation({
      query: (payload) => ({
        url: "/auth/update-password",
        method: "POST",
        body: payload,
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useLogoutMutation,
  useGetUserInfoQuery,
  useIsAuthenticatedQuery,
  useUpdateUserInfoMutation,
  useUpdatePasswordMutation,
  useRefreshTokenMutation,
} = authApi;
