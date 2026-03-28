import { baseQuery } from "@/lib/utils";
import { createApi } from "@reduxjs/toolkit/query";

export const permissionApi = createApi({
  reducerPath: "permissionApi",
  baseQuery: baseQuery,
  tagTypes: ["Permissions"],
  endpoints: (builder) => ({
    getPermissions: builder.query({
      query: (name) => ({
        url: "/permissions?name=" + name,
        method: "GET",
      }),
      transformResponse: (response) => response.data,
      providesTags: ["Permissions"],
    }),
  }),
});
