import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { IconCheck, IconLoader, IconMail, IconUser } from "@tabler/icons-react";

import { getUserPrimaryRole } from "@/lib/utils";
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
const userSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required"),
  lastName: z.string().trim(),
});

/* ─── User Info Form ─── */
function UserInfoForm({ user, pendingAvatar, onUpdateUser, isUpdatingUser }) {
  const form = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
    },
    mode: "onBlur",
  });

  useEffect(() => {
    form.reset({
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
    });
  }, [form, user]);

  const { isDirty } = form.formState;
  const hasChanges =
    isDirty || (pendingAvatar !== null && pendingAvatar !== user?.avatar);

  const handleSubmit = (values) => {
    onUpdateUser({
      firstName: values.firstName.trim(),
      lastName: values.lastName.trim(),
      avatar: pendingAvatar || user?.avatar || "",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
        <CardDescription>Update your display name and avatar.</CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form
            id="user-form"
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-5"
            noValidate
          >
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
          onClick={() =>
            form.reset({
              firstName: user?.firstName || "",
              lastName: user?.lastName || "",
            })
          }
          disabled={isUpdatingUser || !hasChanges}
        >
          Reset
        </Button>

        <Button
          type="submit"
          form="user-form"
          disabled={isUpdatingUser || !hasChanges}
        >
          {isUpdatingUser ? (
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
  );
}

/* ─── ProfileForm ─── */
export function ProfileForm({
  user,
  pendingAvatar,
  onUpdateUser,
  isUpdatingUser,
}) {
  return (
    <UserInfoForm
      user={user}
      pendingAvatar={pendingAvatar}
      onUpdateUser={onUpdateUser}
      isUpdatingUser={isUpdatingUser}
    />
  );
}

export default ProfileForm;
