import { Link } from "react-router";
import {
  IconBuilding,
  IconArrowLeft,
  IconCheck,
  IconSun,
  IconMoon,
} from "@tabler/icons-react";
import { useTheme } from "@/components/ThemeProvider";
import AppLogo from "@/components/AppLogo";
import { Button } from "@/components/ui/button";
import RegisterForm from "./RegisterForm";

export function Register() {
  const { theme, setTheme } = useTheme();

  const features = [
    "Unlimited team members",
    "Project management tools",
    "Real-time collaboration",
    "Secure data isolation",
  ];

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
              Create your Organization
            </h1>
            <p className="text-muted-foreground">
              Set up your organization and start collaborating
            </p>
          </div>

          <RegisterForm />

          {/* Sign In Link */}
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-primary hover:text-primary/80 transition-colors hover:underline"
            >
              Sign in
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
              <IconBuilding className="size-16 text-white" strokeWidth={1.5} />
            </div>

            <h2 className="text-3xl font-bold mb-4 animate-fade-in-up animation-delay-200">
              Start building your team
            </h2>
            <p className="text-white/80 text-lg mb-8 animate-fade-in-up animation-delay-300">
              Create your organization workspace and invite team members to
              collaborate on projects together.
            </p>

            {/* Features List */}
            <div className="space-y-3 text-left animate-fade-in-up animation-delay-400">
              {features.map((feature) => (
                <div
                  key={feature}
                  className="flex items-center gap-3 hover:translate-x-1 transition-transform"
                >
                  <div className="shrink-0 size-6 rounded-full bg-white/20 flex items-center justify-center">
                    <IconCheck className="size-4" />
                  </div>
                  <span className="text-white/90">{feature}</span>
                </div>
              ))}
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

export default Register;
