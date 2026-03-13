import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const isEmptyObject = (obj) => {
  return obj && Object.keys(obj).length === 0 && obj.constructor === Object;
};

const DEFAULT_ERROR_MESSAGE = "An error occurred, please try again.";

const getStatusMessage = (status) => {
  if (status === 401) {
    return "Unauthorized - Please log in again.";
  }

  if (status === 403) {
    return "Forbidden - You do not have permission to access this resource.";
  }

  if (status === 404) {
    return "Requested resource was not found.";
  }

  if (status === 429) {
    return "Too many requests - Please wait and try again.";
  }

  if (status === 500) {
    return "Internal Server Error - Please try again later.";
  }

  if (status === "FETCH_ERROR") {
    return "Network error - Please check your connection.";
  }

  return null;
};

export const getApiErrorDetails = (
  error,
  fallbackMessage = DEFAULT_ERROR_MESSAGE,
) => {
  const source =
    error && (error.status !== undefined || error.data) ? error : error?.error;

  const status = source?.status ?? error?.status ?? null;
  const data =
    source?.data && typeof source.data === "object" ? source.data : {};

  const validationErrors =
    data.validationErrors ?? data.errors ?? source?.validationErrors ?? null;

  const message =
    data.message ||
    source?.message ||
    error?.message ||
    getStatusMessage(status) ||
    fallbackMessage;

  return {
    status,
    message,
    validationErrors,
    apiPath: data.apiPath || "",
  };
};

const rawBaseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8080/api",
  credentials: "include",
});

/* ─── Mutex to prevent concurrent refresh calls ─── */
let isRefreshing = false;
let refreshPromise = null;
let hasHandledSessionExpiry = false;

const redirectToLogin = () => {
  if (typeof window === "undefined") {
    return;
  }

  const loginPath = "/login";
  if (window.location.pathname === loginPath) {
    return;
  }

  window.location.replace(loginPath);
};

const refetchRefreshToken = async (args, api, extraOptions, result) => {
  // Skip refresh for auth endpoints that shouldn't trigger it
  const url = typeof args === "string" ? args : args?.url || "";
  const skipRefreshUrls = [
    "/auth/login",
    "/auth/register",
    "/auth/refresh",
    "/auth/logout",
  ];
  const shouldSkipRefresh = skipRefreshUrls.some((path) => url.includes(path));

  if (!shouldSkipRefresh) {
    // Use mutex to avoid concurrent refresh calls
    if (!isRefreshing) {
      isRefreshing = true;
      refreshPromise = (async () => {
        try {
          const { auth } = api.getState();
          const refreshToken = auth?.refreshToken;

          if (!refreshToken) {
            return false;
          }

          const refreshResult = await rawBaseQuery(
            {
              url: "/auth/refresh",
              method: "POST",
              body: { refreshToken },
            },
            api,
            extraOptions,
          );

          if (refreshResult?.data) {
            const data = refreshResult.data?.data ?? refreshResult.data;
            const newRefreshToken = data.refreshToken;

            // Dynamically import to avoid circular dependency
            const { setCredentials } = await import("@/pages/auth/authSlice");

            api.dispatch(
              setCredentials({
                refreshToken: newRefreshToken,
              }),
            );

            return true;
          }

          return false;
        } catch {
          return false;
        } finally {
          isRefreshing = false;
          refreshPromise = null;
        }
      })();
    }

    const refreshSuccess = await refreshPromise;

    if (refreshSuccess) {
      // Retry original request with new credentials
      result = await rawBaseQuery(args, api, extraOptions);
    } else {
      // Refresh failed — clear credentials (force logout)
      const { clearCredentials } = await import("@/pages/auth/authSlice");

      if (!hasHandledSessionExpiry) {
        hasHandledSessionExpiry = true;
        api.dispatch(clearCredentials());
        redirectToLogin();
      }
    }
  }

  return result;
};

/**
 * baseQueryWithReauth — wraps every RTK Query request:
 *  1. Try the original request
 *  2. On 401, attempt to refresh tokens using the refreshToken from Redux
 *  3. If refresh succeeds, update credentials & retry the original request
 *  4. If refresh fails, clear credentials (force logout)
 *
 * A mutex (isRefreshing + shared promise) ensures only ONE refresh call
 * fires even when multiple 401s arrive at the same time.
 */
export const baseQuery = async (args, api, extraOptions) => {
  let result = await rawBaseQuery(args, api, extraOptions);

  // Attempt token refresh if we get a 401 and we're not already trying to refresh
  if (result?.error?.status === 401) {
    result = await refetchRefreshToken(args, api, extraOptions, result);
  }

  // Normalize error shape
  if (result?.error) {
    const normalizedError = getApiErrorDetails(result.error);

    result.error = {
      status: normalizedError.status,
      data: {
        message: normalizedError.message,
        validationErrors: normalizedError.validationErrors,
        apiPath: normalizedError.apiPath,
      },
    };
  }

  return result;
};

export const getUserOrganization = (user) => {
  const tenantInfo = user?.tenant;
  const organizationName = tenantInfo?.name || "Organization";
  return organizationName.trim();
};

export const getUserPrimaryRole = (user) => {
  const firstRole = user?.roles?.[0];
  return firstRole || "User";
};

export const getUserFullName = (user) => {
  const firstName = user?.firstName || "";
  const lastName = user?.lastName || "";
  const fullName = `${firstName} ${lastName}`.trim();
  return fullName || "User";
};

export const getUserInitials = (user) => {
  const fullName = getUserFullName(user);
  return fullName
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0] || "")
    .join("")
    .toUpperCase()
    .slice(0, 2);
};
