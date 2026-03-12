import { useEffect } from "react";
import { Link, Navigate, Outlet, useLocation, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { StatusCallout } from "@/components/ui/status-callout";
import { isEmptyObject } from "@/lib/utils";
import { useRefreshTokenMutation } from "@/pages/auth/authApi";
import { useDispatch, useSelector } from "react-redux";

import { selectRefreshToken, setCredentials } from "@/pages/auth/authSlice";
import { toast } from "sonner";

function AuthLoadingScreen({ message }) {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-2xl border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="size-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
          <p className="text-sm text-muted-foreground">
            {message || "Checking your session..."}
          </p>
        </div>
      </div>
    </div>
  );
}

function getRedirectPath(location) {
  return `${location.pathname}${location.search}${location.hash}`;
}

export function ProtectedRoute() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const refreshTokenStr = useSelector(selectRefreshToken);
  const [refreshToken, { data, isLoading, isFetching, error, isSuccess }] =
    useRefreshTokenMutation();

  const onInit = async () => {
    try {
      const res = await refreshToken({
        refreshToken: refreshTokenStr,
      }).unwrap();
      dispatch(setCredentials({ refreshToken: res.refreshToken }));
    } catch (_err) {
      toast.error("Session expired. Please log in again.");
      navigate("/login");
    }
  };

  useEffect(() => {
    onInit();
  }, []);

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
}

export default ProtectedRoute;
