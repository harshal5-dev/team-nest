import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@/lib/utils";

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
    }),

    getUserInfo: builder.query({
      query: () => ({
        url: "/auth/me",
        method: "GET",
      }),
      transformResponse: (response) => response.data,
      providesTags: ["Auth"],
    }),

    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["Auth"],
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
} = authApi;
