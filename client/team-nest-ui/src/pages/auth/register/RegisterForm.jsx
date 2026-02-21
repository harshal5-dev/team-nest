import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
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
} from "@tabler/icons-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { StatusCallout } from "@/components/ui/status-callout";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRegisterMutation } from "../authApi";

const registerSchema = z
  .object({
    tenantInfo: z.object({
      organizationName: z
        .string()
        .trim()
        .min(1, "Organization name is required"),
    }),
    ownerInfo: z.object({
      firstName: z.string().trim().min(1, "First name is required"),
      lastName: z.string().trim(),
      email: z
        .string()
        .trim()
        .min(1, "Email is required")
        .email("Invalid email format"),
      password: z
        .string()
        .min(1, "Password is required")
        .min(8, "Password must be at least 8 characters"),
    }),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.ownerInfo.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

function RequiredLabel({ children }) {
  return (
    <FormLabel className="flex items-center gap-1">
      <span>{children}</span>
      <span className="text-destructive font-semibold" aria-hidden="true">
        *
      </span>
      <span className="sr-only">(required)</span>
    </FormLabel>
  );
}

export function RegisterForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [serverStatus, setServerStatus] = useState(null);
  const redirectTimerRef = useRef(null);

  const [register, { isLoading }] = useRegisterMutation();

  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      tenantInfo: {
        organizationName: "",
      },
      ownerInfo: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      },
      confirmPassword: "",
    },
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

    const payload = {
      tenantInfo: data.tenantInfo,
      ownerInfo: data.ownerInfo,
    };

    try {
      const response = await register(payload).unwrap();
      const successMessage =
        response?.message ||
        `${data.tenantInfo.organizationName} created successfully. Redirecting you to sign in...`;

      setServerStatus({
        variant: "success",
        title: `${data.tenantInfo.organizationName} is ready`,
        message: successMessage,
      });

      form.reset();

      redirectTimerRef.current = setTimeout(() => {
        navigate("/login");
      }, 1855);
    } catch (registerError) {
      console.error("Registration error:", registerError);
      const { message, validationErrors } = registerError.data;
      const details = validationErrors
        ? Object.keys(validationErrors).map((field) => validationErrors[field])
        : [];

      setServerStatus({
        variant: "error",
        title: "Could not create workspace",
        message:
          message || "Something went wrong while creating your workspace.",
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
                className="hover:bg-success/10 hover:border-success/30"
              >
                Continue to sign in
              </Button>
            ) : null
          }
          className="mb-6"
        />
      )}

      {/* Form */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 animate-fade-in-up animation-delay-300"
        >
          {/* Organization Name Field */}
          <FormField
            control={form.control}
            name="tenantInfo.organizationName"
            render={({ field }) => (
              <FormItem>
                <RequiredLabel>Organization Name</RequiredLabel>
                <div className="relative">
                  <IconBuilding className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                  <FormControl>
                    <Input
                      placeholder="Acme Inc."
                      className="pl-10 h-11"
                      required
                      {...field}
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-4 md:flex-row flex-col">
            {/* First Name Field */}
            <FormField
              control={form.control}
              name="ownerInfo.firstName"
              render={({ field }) => (
                <FormItem>
                  <RequiredLabel>First Name</RequiredLabel>
                  <div className="relative">
                    <IconUser className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                    <FormControl>
                      <Input
                        placeholder="John"
                        className="pl-10 h-11"
                        required
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Last Name Field */}
            <FormField
              control={form.control}
              name="ownerInfo.lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-1">
                    <span>Last Name</span>
                    <span className="text-xs font-normal text-muted-foreground">
                      (Optional)
                    </span>
                  </FormLabel>
                  <div className="relative">
                    <IconUser className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                    <FormControl>
                      <Input
                        placeholder="Doe"
                        className="pl-10 h-11"
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Email Field */}
          <FormField
            control={form.control}
            name="ownerInfo.email"
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
                <RequiredLabel>Password</RequiredLabel>
                <div className="relative">
                  <IconLock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                  <FormControl>
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="pl-10 pr-10 h-11"
                      required
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
                <RequiredLabel>Confirm Password</RequiredLabel>
                <div className="relative">
                  <IconLock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                  <FormControl>
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="pl-10 pr-10 h-11"
                      required
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
            disabled={isLoading || serverStatus?.variant === "success"}
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
    </>
  );
}

export default RegisterForm;
