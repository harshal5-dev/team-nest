import { Link, Navigate, Outlet, useLocation } from "react-router";
import { Button } from "@/components/ui/button";
import { StatusCallout } from "@/components/ui/status-callout";
import { getApiErrorDetails } from "@/lib/utils";
import { useGetUserInfoQuery } from "@/pages/auth/authApi";

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
  const { data, isLoading, isFetching, error, refetch } = useGetUserInfoQuery(
    undefined,
    {
      refetchOnMountOrArgChange: true,
    },
  );

  if (isLoading || isFetching) {
    return <AuthLoadingScreen message="Verifying access..." />;
  }

  if (data) {
    return <Outlet />;
  }

  if (error) {
    const { status, message } = getApiErrorDetails(error);
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
              <Button type="button" variant="outline" size="sm" onClick={refetch}>
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

export function GuestRoute() {
  const { data, isLoading, isFetching, error } = useGetUserInfoQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  if (isLoading || isFetching) {
    return <AuthLoadingScreen message="Checking your session..." />;
  }

  if (data) {
    return <Navigate to="/dashboard" replace />;
  }

  if (error) {
    const { status } = getApiErrorDetails(error);
    const isUnauthorized = status === 401 || status === 403;

    if (isUnauthorized) {
      return <Outlet />;
    }
  }

  return <Outlet />;
}

export default ProtectedRoute;
