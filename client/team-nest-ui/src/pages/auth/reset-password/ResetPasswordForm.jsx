import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconEye, IconEyeOff, IconLock } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatusCallout } from "@/components/ui/status-callout";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import RequiredLabel from "@/components/ui/field-requirement";
import { useResetPasswordMutation } from "@/pages/auth/authApi";

const resetPasswordSchema = z
  .object({
    token: z.string().trim().min(1, "Reset token is required"),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Include at least one uppercase letter")
      .regex(/[0-9]/, "Include at least one number"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const maskToken = (token) => {
  if (!token) {
    return "";
  }

  if (token.length <= 12) {
    return `${token.slice(0, 4)}****${token.slice(-2)}`;
  }

  return `${token.slice(0, 8)}******${token.slice(-4)}`;
};

export function ResetPasswordForm() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const tokenFromUrl = searchParams.get("token")?.trim() || "";
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showTokenInput, setShowTokenInput] = useState(!tokenFromUrl);
  const [serverStatus, setServerStatus] = useState(null);
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const redirectTimerRef = useRef(null);

  const form = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      token: tokenFromUrl,
      newPassword: "",
      confirmPassword: "",
    },
    mode: "onBlur",
  });

  useEffect(() => {
    if (tokenFromUrl) {
      form.setValue("token", tokenFromUrl, { shouldValidate: false });
      setShowTokenInput(false);
    }
  }, [form, tokenFromUrl]);

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
      const response = await resetPassword({
        token: data.token.trim(),
        newPassword: data.newPassword,
      }).unwrap();

      setServerStatus({
        variant: "success",
        title: "Password updated",
        message:
          response?.message ||
          "Your password was reset successfully. Redirecting to sign in...",
      });

      form.reset({
        token: data.token.trim(),
        newPassword: "",
        confirmPassword: "",
      });

      redirectTimerRef.current = setTimeout(() => {
        navigate("/login", { replace: true });
      }, 1400);
    } catch (resetPasswordError) {
      const { message, validationErrors } = resetPasswordError.data;
      const details = validationErrors
        ? Object.keys(validationErrors).map((field) => validationErrors[field])
        : [];

      setServerStatus({
        variant: "error",
        title: "Password reset failed",
        message:
          message || "Your reset link may have expired. Request a new one.",
        details,
      });
    }
  };

  return (
    <>
      {tokenFromUrl && !showTokenInput && (
        <StatusCallout
          variant="info"
          title="Secure link detected"
          message={`Using token ${maskToken(tokenFromUrl)} from your reset link.`}
          action={
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setShowTokenInput(true)}
            >
              Edit token
            </Button>
          }
          className="mb-6"
        />
      )}

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

      {!tokenFromUrl && (
        <StatusCallout
          variant="warning"
          title="No token found in URL"
          message="Paste the reset token from your email to continue."
          action={
            <Button type="button" variant="outline" size="sm" asChild>
              <Link to="/forgot-password">Request a new reset link</Link>
            </Button>
          }
          className="mb-6"
        />
      )}

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 animate-fade-in-up animation-delay-300"
          noValidate
        >
          {showTokenInput && (
            <FormField
              control={form.control}
              name="token"
              render={({ field }) => (
                <FormItem>
                  <RequiredLabel>Reset token</RequiredLabel>
                  <div className="relative">
                    <IconLock className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                    <FormControl>
                      <Input
                        placeholder="Paste your reset token"
                        className="h-10 pl-10"
                        autoComplete="off"
                        spellCheck={false}
                        required
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <RequiredLabel>New password</RequiredLabel>
                <div className="relative">
                  <IconLock className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                  <FormControl>
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      className="h-10 pl-10 pr-10"
                      autoComplete="new-password"
                      required
                      {...field}
                    />
                  </FormControl>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground transition-colors hover:text-foreground"
                    aria-label={
                      showPassword ? "Hide new password" : "Show new password"
                    }
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

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <RequiredLabel>Confirm new password</RequiredLabel>
                <div className="relative">
                  <IconLock className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                  <FormControl>
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Re-enter your new password"
                      className="h-10 pl-10 pr-10"
                      autoComplete="new-password"
                      required
                      {...field}
                    />
                  </FormControl>
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground transition-colors hover:text-foreground"
                    aria-label={
                      showConfirmPassword
                        ? "Hide confirm password"
                        : "Show confirm password"
                    }
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

          <div className="rounded-lg border border-border/70 bg-muted/35 px-3 py-2 text-xs leading-relaxed text-muted-foreground">
            Use at least 8 characters with one uppercase letter and one number.
          </div>

          <Button
            type="submit"
            disabled={isLoading || serverStatus?.variant === "success"}
            className="w-full text-base shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all font-medium"
          >
            {isLoading ? (
              <>
                <div className="mr-2 size-4 animate-spin rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground" />
                Updating password...
              </>
            ) : (
              "Update password"
            )}
          </Button>
        </form>
      </Form>

      <div className="mt-5 text-center text-sm text-muted-foreground">
        Back to{" "}
        <Link
          to="/login"
          className="font-medium text-primary hover:text-primary/80 transition-colors hover:underline"
        >
          sign in
        </Link>
      </div>
    </>
  );
}

export default ResetPasswordForm;
