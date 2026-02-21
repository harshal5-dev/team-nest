import { Link } from "react-router";
import { IconArrowLeft, IconSun, IconMoon } from "@tabler/icons-react";
import { useTheme } from "@/components/ThemeProvider";
import AppLogo from "@/components/AppLogo";
import { Button } from "@/components/ui/button";
import LoginForm from "./LoginForm";

export function Login() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="min-h-screen flex text-foreground bg-background">
      {/* Left Side - Form */}
      <div className="flex-1 flex flex-col justify-center px-4 py-12 sm:px-6 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm">
          {/* Back Link */}
          <div className="flex items-center justify-between mb-8 animate-fade-in-up">
            <Button
              variant="ghost"
              asChild
              className="pl-0 hover:bg-transparent text-muted-foreground hover:text-foreground"
            >
              <Link to="/" className="gap-2">
                <IconArrowLeft className="size-4" />
                Back to home
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-lg"
              aria-label="Toggle theme"
            >
              <IconSun className="size-5 rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0" />
              <IconMoon className="absolute size-5 rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100" />
            </Button>
          </div>

          {/* Logo */}
          <div className="mb-8 animate-fade-in-up animation-delay-100">
            <AppLogo size="default" href="/" />
          </div>

          {/* Header */}
          <div className="mb-8 animate-fade-in-up animation-delay-200">
            <h1 className="text-2xl font-bold tracking-tight mb-2">
              Welcome back
            </h1>
            <p className="text-muted-foreground">
              Sign in to your account to continue
            </p>
          </div>

          <LoginForm />

          {/* Sign Up Link */}
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              to="/register"
              className="font-medium text-primary hover:text-primary/80 transition-colors hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side - Decorative */}
      <div className="hidden lg:flex lg:flex-1 relative bg-linear-to-br from-gradient-start via-gradient-mid to-gradient-end overflow-hidden">
        {/* Animated background blobs */}
        <div className="absolute top-20 left-10 size-64 bg-white/10 rounded-full blur-3xl animate-blob" />
        <div className="absolute bottom-20 right-10 size-72 bg-white/10 rounded-full blur-3xl animate-blob animation-delay-2000" />

        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-50" />

        {/* Content */}
        <div className="relative flex flex-col items-center justify-center p-12 text-white">
          <div className="max-w-md text-center">
            <div className="mb-8 p-4 rounded-2xl bg-white/10 backdrop-blur-sm inline-block animate-fade-in-up hover:scale-105 transition-transform">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="size-16 text-white"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  d="M4 19c0-4 4-6 8-6s8 2 8 6"
                  strokeLinecap="round"
                  fill="currentColor"
                  fillOpacity="0.2"
                />
                <path
                  d="M12 13c-2.5 0-4.5-2-4.5-4.5S9.5 4 12 4s4.5 2 4.5 4.5-2 4.5-4.5 4.5z"
                  fill="currentColor"
                  fillOpacity="0.3"
                />
                <path
                  d="M9 8.5c0 1.5 1.5 3 3 3s3-1.5 3-3-1.5-2.5-3-2.5-3 1-3 2.5z"
                  fill="currentColor"
                />
              </svg>
            </div>

            <h2 className="text-3xl font-bold mb-4 animate-fade-in-up animation-delay-200">
              Manage your team effortlessly
            </h2>
            <p className="text-white/80 text-lg animate-fade-in-up animation-delay-300">
              Join thousands of teams who use TeamNest to collaborate, track
              projects, and achieve their goals together.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-12 animate-fade-in-up animation-delay-400">
              <div className="text-center hover:scale-110 transition-transform">
                <div className="text-3xl font-bold">10k+</div>
                <div className="text-sm text-white/70">Users</div>
              </div>
              <div className="text-center hover:scale-110 transition-transform">
                <div className="text-3xl font-bold">500+</div>
                <div className="text-sm text-white/70">Teams</div>
              </div>
              <div className="text-center hover:scale-110 transition-transform">
                <div className="text-3xl font-bold">99%</div>
                <div className="text-sm text-white/70">Uptime</div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative circles */}
        <div className="absolute -top-20 -right-20 size-80 rounded-full bg-white/10 animate-pulse" />
        <div className="absolute -bottom-32 -left-32 size-96 rounded-full bg-white/10 animate-pulse animation-delay-2000" />
      </div>
    </div>
  );
}

export default Login;
