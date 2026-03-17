import { useCallback, useEffect } from "react";
import { Link, Navigate, Outlet, useLocation, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { StatusCallout } from "@/components/ui/status-callout";
import { isEmptyObject } from "@/lib/utils";
import { useRefreshTokenMutation } from "@/pages/auth/authApi";
import { useDispatch, useSelector } from "react-redux";

import {
  selectIsAuthenticated,
  selectIsLoggingOut,
  selectRefreshToken,
  setCredentials,
} from "@/pages/auth/authSlice";
import { showToast } from "../ui/sonner";
import AuthLoadingScreen from "./AuthLoadingScreen";

function getRedirectPath(location) {
  return `${location.pathname}${location.search}${location.hash}`;
}

const ProtectedRoute = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const refreshTokenStr = useSelector(selectRefreshToken);
  const isLoggingOut = useSelector(selectIsLoggingOut);

  const [refreshToken, { data, isLoading, isFetching, error, refetch }] =
    useRefreshTokenMutation();

  const onInit = useCallback(async () => {
    try {
      const res = await refreshToken({
        refreshToken: refreshTokenStr,
      }).unwrap();
      dispatch(setCredentials({ refreshToken: res.refreshToken }));
    } catch {
      showToast.error("Session expired. Please log in again.");
      navigate("/login", {
        replace: true,
        state: { from: getRedirectPath(location) },
      });
    }
  }, [refreshToken, refreshTokenStr, navigate, location, dispatch]);

  useEffect(() => {
    if (!isAuthenticated && !isLoggingOut) {
      onInit();
    }
  }, [onInit, isAuthenticated, isLoggingOut]);

  if (isLoading || isFetching) {
    return <AuthLoadingScreen message="Verifying access..." />;
  }

  if (!isEmptyObject(data)) {
    return <Outlet />;
  }

  if (error) {
    const {
      status,
      data: { message },
    } = error;
    const isUnauthorized = status === 401 || status === 403;

    if (isUnauthorized) {
      return (
        <Navigate
          to="/login"
          replace
          state={{ from: getRedirectPath(location) }}
        />
      );
    }

    return (
      <div className="min-h-screen bg-background px-4 py-8 flex items-center justify-center">
        <StatusCallout
          variant="error"
          title="Could not verify your session"
          message={message}
          action={
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={refetch}
              >
                Retry
              </Button>
              <Button type="button" size="sm" asChild>
                <Link to="/login">Go to login</Link>
              </Button>
            </div>
          }
          className="w-full max-w-lg"
        />
      </div>
    );
  }

  return (
    <Navigate to="/login" replace state={{ from: getRedirectPath(location) }} />
  );
};

export default ProtectedRoute;
