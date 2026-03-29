import { baseQuery } from "@/lib/utils";
import { createApi } from "@reduxjs/toolkit/query/react";

export const permissionApi = createApi({
  reducerPath: "permissionApi",
  baseQuery: baseQuery,
  tagTypes: ["Permissions"],
  endpoints: (builder) => ({
    getPermissions: builder.query({
      query: ({ name = "", page = 0, size = 5 } = {}) => {
        const params = new URLSearchParams();
        if (name) params.append("name", name);
        params.append("page", page);
        params.append("size", size);
        return {
          url: `/permissions?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["Permissions"],
    }),
  }),
});

export const { useGetPermissionsQuery } = permissionApi;
