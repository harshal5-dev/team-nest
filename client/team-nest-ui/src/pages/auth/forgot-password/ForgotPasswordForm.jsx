import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconMail } from "@tabler/icons-react";
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
import { useForgotPasswordMutation } from "@/pages/auth/authApi";

const forgotPasswordSchema = z.object({
  email: z.email("Invalid email format").min(1, "Email is required"),
});

export function ForgotPasswordForm() {
  const navigate = useNavigate();
  const [serverStatus, setServerStatus] = useState(null);
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const redirectTimerRef = useRef(null);

  const form = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
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
      const response = await forgotPassword({
        email: data.email.trim(),
      }).unwrap();

      setServerStatus({
        variant: "success",
        title: "Reset link sent",
        message:
          response?.message ||
          "If this email exists in TeamNest, a password reset link has been sent.",
      });
    } catch (forgotPasswordError) {
      const { message, validationErrors } = forgotPasswordError.data;
      const details = validationErrors
        ? Object.keys(validationErrors).map((field) => validationErrors[field])
        : [];

      setServerStatus({
        variant: "error",
        title: "Could not send reset link",
        message:
          message || "Please verify your email and try again in a few moments.",
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
          action={
            serverStatus.variant === "success" ? (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => navigate("/login")}
              >
                Back to sign in
              </Button>
            ) : null
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
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <RequiredLabel>Email address</RequiredLabel>
                <div className="relative">
                  <IconMail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="name@example.com"
                      className="h-10 pl-10"
                      autoComplete="email"
                      required
                      {...field}
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <p className="rounded-lg border border-border/70 bg-muted/35 px-3 py-2 text-xs leading-relaxed text-muted-foreground">
            We&apos;ll email you a secure reset link. For your security, the link
            expires after a short period.
          </p>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full text-base shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all font-medium"
          >
            {isLoading ? (
              <>
                <div className="mr-2 size-4 animate-spin rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground" />
                Sending link...
              </>
            ) : (
              "Send reset link"
            )}
          </Button>
        </form>
      </Form>

      <div className="mt-5 text-center text-sm text-muted-foreground">
        Remembered your password?{" "}
        <Link
          to="/login"
          className="font-medium text-primary hover:text-primary/80 transition-colors hover:underline"
        >
          Sign in
        </Link>
      </div>
    </>
  );
}

export default ForgotPasswordForm;
