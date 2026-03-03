import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  IconBuilding,
  IconCheck,
  IconLoader,
  IconMail,
  IconUser,
} from "@tabler/icons-react";

import { getUserOrganization, getUserPrimaryRole } from "@/lib/utils";
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
import RequiredLabel from "@/components/ui/field-requirement";

/* ─── Schema ─── */
const profileSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required"),
  lastName: z.string().trim(),
  organizationName: z
    .string()
    .trim()
    .min(2, "Organization name must be at least 2 characters"),
});

const buildDefaultFormValues = (user) => ({
  firstName: user?.firstName || "",
  lastName: user?.lastName || "",
  organizationName: getUserOrganization(user),
});

export function ProfileForm({ user, pendingAvatar, onUpdate, isLoading }) {
  const form = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: buildDefaultFormValues(user),
    mode: "onBlur",
  });

  useEffect(() => {
    form.reset(buildDefaultFormValues(user));
  }, [form, user]);

  const resetForm = () => form.reset(buildDefaultFormValues(user));

  const handleSubmit = (formValues) => {
    const payload = {
      userInfo: {
        firstName: formValues.firstName.trim(),
        lastName: formValues.lastName.trim(),
        avatar: pendingAvatar || user?.avatar || "",
      },
      tenantInfo: {
        organizationName: formValues.organizationName.trim(),
      },
    };
    onUpdate(payload);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Account Details</CardTitle>
          <CardDescription>
            Update your display name and organization identity.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form
              id="profile-form"
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-5"
              noValidate
            >
              <FormField
                control={form.control}
                name="organizationName"
                render={({ field }) => (
                  <FormItem>
                    <RequiredLabel>Organization Name</RequiredLabel>
                    <div className="relative">
                      <IconBuilding className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                      <FormControl>
                        <Input
                          placeholder="Acme Inc."
                          className="h-10 pl-10"
                          required
                          {...field}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <RequiredLabel>First Name</RequiredLabel>
                      <div className="relative">
                        <IconUser className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                        <FormControl>
                          <Input className="h-10 pl-10" required {...field} />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <RequiredLabel required={false}>Last Name</RequiredLabel>
                      <div className="relative">
                        <IconUser className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                        <FormControl>
                          <Input className="h-10 pl-10" {...field} />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <RequiredLabel required={false} htmlFor="profile-email">
                    Email
                  </RequiredLabel>
                  <div className="relative">
                    <IconMail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="profile-email"
                      type="email"
                      className="h-10 pl-10"
                      value={user?.email || ""}
                      disabled
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Managed by your organization.
                  </p>
                </div>

                <div className="space-y-2">
                  <RequiredLabel required={false} htmlFor="profile-role">
                    Role
                  </RequiredLabel>
                  <Input
                    id="profile-role"
                    className="h-10"
                    value={getUserPrimaryRole(user)}
                    disabled
                  />
                </div>
              </div>
            </form>
          </Form>
        </CardContent>

        <CardFooter className="flex items-center justify-between border-t bg-muted/30 px-6 py-4">
          <Button
            type="button"
            variant="outline"
            onClick={resetForm}
            disabled={isLoading}
          >
            Reset
          </Button>

          <Button type="submit" form="profile-form" disabled={isLoading}>
            {isLoading ? (
              <>
                <IconLoader className="mr-2 size-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <IconCheck className="mr-2 size-4" />
                Save Changes
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default ProfileForm;
