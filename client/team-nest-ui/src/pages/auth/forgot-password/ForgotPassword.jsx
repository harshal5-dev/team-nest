import { Link } from "react-router";
import {
  IconArrowLeft,
  IconCheck,
  IconMoon,
  IconShieldLock,
  IconSun,
} from "@tabler/icons-react";
import { useTheme } from "@/components/ThemeProvider";
import AppLogo from "@/components/AppLogo";
import { Button } from "@/components/ui/button";
import ForgotPasswordForm from "./ForgotPasswordForm";

export function ForgotPassword() {
  const { theme, setTheme } = useTheme();

  const steps = [
    "Enter your account email address.",
    "Open the secure reset link in your inbox.",
    "Create a new password and continue working.",
  ];

  return (
    <div className="min-h-screen flex text-foreground bg-background">
      <div className="flex-1 flex flex-col justify-center px-4 py-12 sm:px-6 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm">
          <div className="mb-8 flex items-center justify-between animate-fade-in-up">
            <Button
              variant="ghost"
              asChild
              className="pl-0 text-muted-foreground hover:bg-transparent hover:text-foreground"
            >
              <Link to="/login" className="gap-2">
                <IconArrowLeft className="size-4" />
                Back to sign in
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

          <div className="mb-8 animate-fade-in-up animation-delay-100">
            <AppLogo size="default" href="/" />
          </div>

          <div className="mb-8 animate-fade-in-up animation-delay-200">
            <h1 className="text-2xl font-bold tracking-tight mb-2">
              Forgot your password?
            </h1>
            <p className="text-muted-foreground">
              No problem. We&apos;ll send a secure link to reset it.
            </p>
          </div>

          <ForgotPasswordForm />
        </div>
      </div>

      <div className="hidden lg:flex lg:flex-1 relative bg-linear-to-br from-gradient-start via-gradient-mid to-gradient-end overflow-hidden">
        <div className="absolute top-24 left-12 size-64 rounded-full bg-white/10 blur-3xl animate-blob" />
        <div className="absolute bottom-16 right-8 size-72 rounded-full bg-white/10 blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-50" />

        <div className="relative flex flex-col items-center justify-center p-12 text-white">
          <div className="max-w-md text-center">
            <div className="mb-8 inline-flex rounded-2xl bg-white/10 p-4 backdrop-blur-sm animate-fade-in-up hover:scale-105 transition-transform">
              <IconShieldLock className="size-16 text-white" strokeWidth={1.5} />
            </div>

            <h2 className="mb-4 text-3xl font-bold animate-fade-in-up animation-delay-200">
              Get back in securely
            </h2>
            <p className="text-lg text-white/85 animate-fade-in-up animation-delay-300">
              TeamNest keeps recovery simple, fast, and protected with secure
              one-time reset links.
            </p>

            <div className="mt-10 space-y-3 text-left animate-fade-in-up animation-delay-400">
              {steps.map((step) => (
                <div
                  key={step}
                  className="flex items-center gap-3 rounded-xl border border-white/20 bg-white/5 px-3 py-2 backdrop-blur-sm hover:translate-x-1 transition-transform"
                >
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-white/20">
                    <IconCheck className="size-4" />
                  </span>
                  <span className="text-sm text-white/90">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute -top-20 -right-20 size-80 rounded-full bg-white/10 animate-pulse" />
        <div className="absolute -bottom-32 -left-32 size-96 rounded-full bg-white/10 animate-pulse animation-delay-2000" />
      </div>
    </div>
  );
}

export default ForgotPassword;
