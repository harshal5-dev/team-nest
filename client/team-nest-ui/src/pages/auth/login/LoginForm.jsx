import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import { IconMail, IconLock, IconEye, IconEyeOff } from "@tabler/icons-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { StatusCallout } from "@/components/ui/status-callout";
import { useLoginMutation } from "@/pages/auth/authApi";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import RequiredLabel from "@/components/ui/field-requirement";

const loginSchema = z.object({
  email: z.email("Invalid email format").min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});

export function LoginForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [serverStatus, setServerStatus] = useState(null);
  const redirectTimerRef = useRef(null);
  const [login, { isLoading }] = useLoginMutation();

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  });

  useEffect(() => {
    return () => {
      if (redirectTimerRef.current) {
        clearTimeout(redirectTimerRef.current);
      }
    };
  }, []);

  const dismissServerStatus = () => {
    if (redirectTimerRef.current) {
      clearTimeout(redirectTimerRef.current);
      redirectTimerRef.current = null;
    }
    setServerStatus(null);
  };

  const onSubmit = async (data) => {
    if (redirectTimerRef.current) {
      clearTimeout(redirectTimerRef.current);
      redirectTimerRef.current = null;
    }
    setServerStatus(null);
    form.clearErrors();
    try {
      const response = await login(data).unwrap();
      const successMessage =
        response?.message ||
        "Login successful. Redirecting to your workspace...";
      setServerStatus({
        variant: "success",
        title: "Signed in successfully",
        message: successMessage,
      });

      redirectTimerRef.current = setTimeout(() => {
        navigate("/dashboard", { replace: true });
      }, 1000);
    } catch (loginError) {
      const { message, validationErrors } = loginError.data;
      const details = validationErrors
        ? Object.keys(validationErrors).map((field) => validationErrors[field])
        : [];

      setServerStatus({
        variant: "error",
        title: "Sign in failed",
        message,
        details,
      });
    }
  };

  return (
    <>
      {serverStatus && (
        <StatusCallout
          variant={serverStatus.variant}
          title={serverStatus.title}
          message={serverStatus.message}
          details={serverStatus.details}
          onDismiss={dismissServerStatus}
          className="mb-6"
        />
      )}

      {/* Form */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 animate-fade-in-up animation-delay-500"
          noValidate
        >
          {/* Email Field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <RequiredLabel>Email</RequiredLabel>
                <div className="relative">
                  <IconMail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="name@example.com"
                      className="pl-10 h-11"
                      required
                      autoComplete="email"
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
            name="password"
            render={({ field }) => (
              <FormItem>
                <RequiredLabel>Password</RequiredLabel>
                <div className="flex items-center justify-between mb-2">
                  <Link
                    to="/forgot-password"
                    className="text-sm text-primary hover:text-primary/80 transition-colors hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <IconLock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                  <FormControl>
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="pl-10 pr-10 h-11"
                      required
                      autoComplete="current-password"
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

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isLoading || serverStatus?.variant === "success"}
            className="w-full h-11 text-base shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all font-medium"
          >
            {isLoading ? (
              <>
                <div className="size-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2" />
                Signing in...
              </>
            ) : (
              "Sign in"
            )}
          </Button>
        </form>
      </Form>
    </>
  );
}

export default LoginForm;
