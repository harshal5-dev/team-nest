import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  IconCheck,
  IconEye,
  IconEyeOff,
  IconLoader,
  IconLock,
} from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { StatusCallout } from "@/components/ui/status-callout";
import RequiredLabel from "@/components/ui/field-requirement";
import { useUpdatePasswordMutation } from "@/pages/auth/authApi";
import { showToast as toast } from "@/components/ui/sonner";

/* ─── Schema ─── */
const updatePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Include at least one uppercase letter")
      .regex(/[0-9]/, "Include at least one number"),
    confirmPassword: z.string().min(1, "Please confirm your new password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: "New password must be different from current password",
    path: ["newPassword"],
  });

/* ─── Password Input ─── */
function PasswordField({ field, show, onToggle, placeholder, label, id }) {
  return (
    <div className="relative">
      <IconLock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        id={id}
        type={show ? "text" : "password"}
        placeholder={placeholder}
        className="h-10 pl-10 pr-10"
        autoComplete={
          label === "Current password" ? "current-password" : "new-password"
        }
        required
        {...field}
      />
      <button
        type="button"
        onClick={onToggle}
        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground transition-colors hover:text-foreground"
        aria-label={show ? `Hide ${label}` : `Show ${label}`}
      >
        {show ? (
          <IconEyeOff className="size-4" />
        ) : (
          <IconEye className="size-4" />
        )}
      </button>
    </div>
  );
}

/* ─── Main Form ─── */
export function UpdatePasswordForm() {
  const [updatePassword, { isLoading }] = useUpdatePasswordMutation();
  const [serverStatus, setServerStatus] = useState(null);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    mode: "onBlur",
  });

  const { isDirty } = form.formState;

  const dismissServerStatus = () => setServerStatus(null);

  const resetForm = () => {
    form.reset();
    setServerStatus(null);
    setShowCurrentPassword(false);
    setShowNewPassword(false);
    setShowConfirmPassword(false);
  };

  const handleSubmit = async (formValues) => {
    setServerStatus(null);

    try {
      const response = await updatePassword({
        currentPassword: formValues.currentPassword,
        newPassword: formValues.newPassword,
      }).unwrap();

      setServerStatus({
        variant: "success",
        title: "Password updated",
        message:
          response?.message || "Your password has been changed successfully.",
      });

      form.reset();
      setShowCurrentPassword(false);
      setShowNewPassword(false);
      setShowConfirmPassword(false);

      toast.success("Password updated successfully");
    } catch (error) {
      const message =
        error?.data?.message || "Could not update password. Please try again.";
      const validationErrors = error?.data?.validationErrors;
      const details = validationErrors ? Object.values(validationErrors) : [];

      setServerStatus({
        variant: "error",
        title: "Password update failed",
        message,
        details,
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Update Password</CardTitle>
        <CardDescription>
          Update your password to keep your account secure.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {serverStatus && (
          <StatusCallout
            variant={serverStatus.variant}
            title={serverStatus.title}
            message={serverStatus.message}
            details={serverStatus.details}
            onDismiss={dismissServerStatus}
          />
        )}

        <Form {...form}>
          <form
            id="update-password-form"
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
            noValidate
          >
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <RequiredLabel htmlFor="currentPassword">
                    Current Password
                  </RequiredLabel>
                  <FormControl>
                    <PasswordField
                      id="currentPassword"
                      field={field}
                      show={showCurrentPassword}
                      onToggle={() => setShowCurrentPassword((v) => !v)}
                      placeholder="Enter your current password"
                      label="Current password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <RequiredLabel htmlFor="newPassword">
                      New Password
                    </RequiredLabel>
                    <FormControl>
                      <PasswordField
                        id="newPassword"
                        field={field}
                        show={showNewPassword}
                        onToggle={() => setShowNewPassword((v) => !v)}
                        placeholder="Create a strong password"
                        label="New password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <RequiredLabel htmlFor="confirmPassword">
                      Confirm New Password
                    </RequiredLabel>
                    <FormControl>
                      <PasswordField
                        id="confirmPassword"
                        field={field}
                        show={showConfirmPassword}
                        onToggle={() => setShowConfirmPassword((v) => !v)}
                        placeholder="Re-enter new password"
                        label="Confirm password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="rounded-lg border border-border/70 bg-muted/35 px-3 py-2 text-xs leading-relaxed text-muted-foreground">
              Use at least 8 characters with one uppercase letter and one
              number.
            </div>
          </form>
        </Form>
      </CardContent>

      <CardFooter className="flex items-center justify-between border-t bg-muted/30 px-6 py-4">
        <Button
          type="button"
          variant="outline"
          onClick={resetForm}
          disabled={isLoading || !isDirty}
        >
          Reset
        </Button>

        <Button
          type="submit"
          form="update-password-form"
          disabled={isLoading || !isDirty}
        >
          {isLoading ? (
            <>
              <IconLoader className="mr-2 size-4 animate-spin" />
              Updating...
            </>
          ) : (
            <>
              <IconCheck className="mr-2 size-4" />
              Update Password
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}

export default UpdatePasswordForm;
