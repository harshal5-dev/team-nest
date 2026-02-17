import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { 
  IconMail, 
  IconLock, 
  IconEye, 
  IconEyeOff,
  IconUser,
  IconBuilding,
  IconArrowLeft,
  IconCheck,
  IconSun,
  IconMoon,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/components/ThemeProvider";
import AppLogo from "@/components/AppLogo";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// Validation schema matching backend DTO structure
const registerSchema = z.object({
  tenantInfo: z.object({
    organizationName: z.string().min(1, "Organization name is required"),
  }),
  ownerInfo: z.object({
    fullName: z.string().min(1, "Full name is required"),
    email: z.string().min(1, "Email is required").email("Invalid email format"),
    password: z.string().min(1, "Password is required").min(8, "Password must be at least 8 characters"),
  }),
  confirmPassword: z.string().min(1, "Please confirm your password"),
}).refine((data) => data.ownerInfo.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export function Register() {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      tenantInfo: {
        organizationName: "",
      },
      ownerInfo: {
        fullName: "",
        email: "",
        password: "",
      },
      confirmPassword: "",
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    
    // Prepare payload matching backend structure (without confirmPassword)
    const payload = {
      tenantInfo: data.tenantInfo,
      ownerInfo: data.ownerInfo,
    };
    
    console.log("Registration payload:", payload);
    
    // Fake registration - simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    // Navigate to login after successful registration
    navigate("/login");
  };

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
              Create your workspace
            </h1>
            <p className="text-muted-foreground">
              Set up your organization and start collaborating
            </p>
          </div>

          {/* Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 animate-fade-in-up animation-delay-300">
              {/* Organization Name Field */}
              <FormField
                control={form.control}
                name="tenantInfo.organizationName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Organization Name</FormLabel>
                    <div className="relative">
                      <IconBuilding className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                      <FormControl>
                        <Input
                          placeholder="Acme Inc."
                          className="pl-10 h-11"
                          {...field}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Full Name Field */}
              <FormField
                control={form.control}
                name="ownerInfo.fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <div className="relative">
                      <IconUser className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                      <FormControl>
                        <Input
                          placeholder="John Doe"
                          className="pl-10 h-11"
                          {...field}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email Field */}
              <FormField
                control={form.control}
                name="ownerInfo.email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <div className="relative">
                      <IconMail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="name@example.com"
                          className="pl-10 h-11"
                          {...field}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password Field */}
              <FormField
                control={form.control}
                name="ownerInfo.password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <div className="relative">
                      <IconLock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                      <FormControl>
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          className="pl-10 pr-10 h-11"
                          {...field}
                        />
                      </FormControl>
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1"
                      >
                        {showPassword ? (
                          <IconEyeOff className="size-4" />
                        ) : (
                          <IconEye className="size-4" />
                        )}
                      </button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Confirm Password Field */}
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <div className="relative">
                      <IconLock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                      <FormControl>
                        <Input
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="••••••••"
                          className="pl-10 pr-10 h-11"
                          {...field}
                        />
                      </FormControl>
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1"
                      >
                        {showConfirmPassword ? (
                          <IconEyeOff className="size-4" />
                        ) : (
                          <IconEye className="size-4" />
                        )}
                      </button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                size="lg"
                className="w-full mt-6 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all font-medium"
              >
                {isLoading ? (
                  <>
                    <div className="size-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2" />
                    Creating workspace...
                  </>
                ) : (
                  "Create Workspace"
                )}
              </Button>
            </form>
          </Form>

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
                  <div className="flex-shrink-0 size-6 rounded-full bg-white/20 flex items-center justify-center">
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
