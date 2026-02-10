import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { 
  IconMail, 
  IconLock, 
  IconEye, 
  IconEyeOff,
  IconBrandGoogle,
  IconBrandGithub,
  IconArrowLeft,
  IconSun,
  IconMoon,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/components/ThemeProvider";
import AppLogo from "@/components/AppLogo";
import { Input } from "@/components/ui/input";

export function Login() {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Fake login - simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // Navigate to dashboard after "login"
    navigate("/dashboard");
  };

  const handleDemoLogin = async () => {
    setFormData({ email: "demo@teamnest.app", password: "demo123" });
    setIsLoading(true);
    
    await new Promise((resolve) => setTimeout(resolve, 800));
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex flex-col justify-center px-4 py-12 sm:px-6 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm">
          {/* Back Link */}
          <div className="flex items-center justify-between mb-8 animate-fade-in-up">
            <Link 
              to="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <IconArrowLeft className="size-4" />
              Back to home
            </Link>
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="relative inline-flex items-center justify-center size-9 rounded-lg hover:bg-accent transition-colors"
              aria-label="Toggle theme"
            >
              <IconSun className="size-5 rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0" />
              <IconMoon className="absolute size-5 rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100" />
            </button>
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

          {/* Demo Login Button */}
          <button
            onClick={handleDemoLogin}
            disabled={isLoading}
            className={cn(
              "w-full flex items-center justify-center gap-2 px-4 py-3 mb-6 rounded-lg",
              "bg-gradient-to-r from-primary to-violet-500 text-white font-medium",
              "hover:opacity-90 transition-all shadow-lg shadow-primary/25 hover:scale-[1.02]",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              "animate-fade-in-up animation-delay-300"
            )}
          >
            Try Demo Account
          </button>

          <div className="relative mb-6 animate-fade-in-up animation-delay-400">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          {/* Social Login Buttons */}
          <div className="grid grid-cols-2 gap-3 mb-6 animate-fade-in-up animation-delay-400">
            <button
              type="button"
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-border hover:bg-accent hover:scale-[1.02] transition-all"
            >
              <IconBrandGoogle className="size-5" />
              <span className="text-sm font-medium">Google</span>
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-border hover:bg-accent hover:scale-[1.02] transition-all"
            >
              <IconBrandGithub className="size-5" />
              <span className="text-sm font-medium">GitHub</span>
            </button>
          </div>

          <div className="relative mb-6 animate-fade-in-up animation-delay-500">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or with email
              </span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 animate-fade-in-up animation-delay-500">
            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <div className="relative">
                <IconMail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
                <Link 
                  to="/forgot-password" 
                  className="text-sm text-primary hover:text-primary/80 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <IconLock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="pl-10 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? (
                    <IconEyeOff className="size-4" />
                  ) : (
                    <IconEye className="size-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={cn(
                "w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg",
                "bg-primary text-primary-foreground font-medium",
                "hover:bg-primary/90 transition-all",
                "disabled:opacity-50 disabled:cursor-not-allowed"
              )}
            >
              {isLoading ? (
                <>
                  <div className="size-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          {/* Sign Up Link */}
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link 
              to="/register" 
              className="font-medium text-primary hover:text-primary/80 transition-colors"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side - Decorative */}
      <div className="hidden lg:flex lg:flex-1 relative bg-gradient-to-br from-gradient-start via-gradient-mid to-gradient-end overflow-hidden">
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
              Join thousands of teams who use TeamNest to collaborate, 
              track projects, and achieve their goals together.
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
