import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  IconBuilding,
  IconCheck,
  IconLoader,
  IconLock,
} from "@tabler/icons-react";

import { getUserOrganization } from "@/lib/utils";
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
import { StatusCallout } from "@/components/ui/status-callout";

/* ─── Schema ─── */
const orgSchema = z.object({
  organizationName: z
    .string()
    .trim()
    .min(2, "Organization name must be at least 2 characters"),
});

/* ─── Editable Form (Admin only) ─── */
function OrganizationForm({
  user,
  onUpdateOrganization,
  isUpdatingOrganization,
}) {
  const form = useForm({
    resolver: zodResolver(orgSchema),
    defaultValues: { organizationName: getUserOrganization(user) },
    mode: "onBlur",
  });

  useEffect(() => {
    form.reset({ organizationName: getUserOrganization(user) });
  }, [form, user]);

  const { isDirty } = form.formState;

  const handleSubmit = (values) => {
    onUpdateOrganization({ organizationName: values.organizationName.trim() });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Organization Name</CardTitle>
        <CardDescription>
          Update your workspace organization name. The change is visible to all
          members.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form
            id="org-form"
            onSubmit={form.handleSubmit(handleSubmit)}
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
          </form>
        </Form>
      </CardContent>

      <CardFooter className="flex items-center justify-between border-t bg-muted/30 px-6 py-4">
        <Button
          type="button"
          variant="outline"
          onClick={() =>
            form.reset({ organizationName: getUserOrganization(user) })
          }
          disabled={isUpdatingOrganization || !isDirty}
        >
          Reset
        </Button>
        <Button
          type="submit"
          form="org-form"
          disabled={isUpdatingOrganization || !isDirty}
        >
          {isUpdatingOrganization ? (
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

/* ─── Read-only View (non-admin) ─── */
function OrganizationReadOnly({ user }) {
  return (
    <div className="space-y-4">
      <StatusCallout
        variant="info"
        title="View-only access"
        message="Only Admins can update the organization name. Contact your Admin if changes are needed."
      />

      <Card>
        <CardHeader>
          <CardTitle>Organization</CardTitle>
          <CardDescription>
            Your current workspace organization details.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Organization Name
            </p>
            <div className="flex items-center gap-2.5 rounded-lg border bg-muted/30 px-3 py-2.5">
              <IconBuilding className="size-4 shrink-0 text-muted-foreground" />
              <span className="flex-1 text-sm">
                {getUserOrganization(user)}
              </span>
              <IconLock className="size-3.5 shrink-0 text-muted-foreground" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

/* ─── OrganizationSettings (container) ─── */
export function OrganizationSettings({
  user,
  onUpdateOrganization,
  isUpdatingOrganization,
  canManage,
}) {
  if (!canManage) {
    return <OrganizationReadOnly user={user} />;
  }

  return (
    <OrganizationForm
      user={user}
      onUpdateOrganization={onUpdateOrganization}
      isUpdatingOrganization={isUpdatingOrganization}
    />
  );
}

export default OrganizationSettings;
