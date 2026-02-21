import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

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

// Base query with error interceptor
export const baseQuery = async (args, api, extraOptions) => {
  const result = await rawBaseQuery(args, api, extraOptions);

  if (result?.error) {
    const normalizedError = getApiErrorDetails(result.error);

    // Transform error to a consistent format
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
