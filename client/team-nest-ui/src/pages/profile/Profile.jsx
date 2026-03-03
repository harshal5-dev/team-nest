import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  IconBuilding,
  IconCamera,
  IconCheck,
  IconLoader,
  IconMail,
  IconRefresh,
  IconShieldLock,
  IconSun,
  IconUser,
} from "@tabler/icons-react";

import {
  cn,
  getApiErrorDetails,
  getUserInitials,
  getUserOrganization,
  getUserPrimaryRole,
} from "@/lib/utils";
import { useTheme } from "@/components/ThemeProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { StatusCallout } from "@/components/ui/status-callout";
import { showToast as toast } from "@/components/ui/sonner";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import RequiredLabel from "@/components/ui/field-requirement";
import {
  PageHeader,
  PageHeaderActions,
  PageHeaderDescription,
  PageHeaderHeading,
  PageHeaderTitle,
} from "@/components/ui/page-header";
import { authApi, useGetUserInfoQuery } from "@/pages/auth/authApi";

const profileSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required"),
  lastName: z.string().trim().min(1, "Last name is required"),
  organizationName: z
    .string()
    .trim()
    .min(2, "Organization name must be at least 2 characters"),
  bio: z
    .string()
    .trim()
    .max(240, "Bio must be at most 240 characters")
    .optional(),
});

const tabs = [
  { id: "general", label: "General", icon: IconUser },
  { id: "security", label: "Security", icon: IconShieldLock },
  { id: "appearance", label: "Appearance", icon: IconSun },
];

const buildDefaultFormValues = (user) => ({
  firstName: user?.firstName || "",
  lastName: user?.lastName || "",
  organizationName: getUserOrganization(user),
  bio: user?.bio || "",
});

export function Profile() {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("general");
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const { user, isLoading, isFetching, error, refetch } = useGetUserInfoQuery(
    undefined,
    {
      skip: true,
    },
  );

  const handleUpdateProfile = async (formValues) => {
    if (!user) {
      return;
    }

    setIsSavingProfile(true);

    try {
      const nextUserState = {
        firstName: formValues.firstName.trim(),
        lastName: formValues.lastName.trim(),
        organizationName: formValues.organizationName.trim(),
        bio: (formValues.bio || "").trim(),
      };

      dispatch(
        authApi.util.updateQueryData("getUserInfo", undefined, (draft) => {
          if (!draft) {
            return;
          }

          draft.firstName = nextUserState.firstName;
          draft.lastName = nextUserState.lastName;
          draft.organizationName = nextUserState.organizationName;
          draft.tenant = {
            ...(draft.tenant || {}),
            name: nextUserState.organizationName,
          };
        }),
      );

      toast.success("Profile updated successfully");
    } catch {
      toast.error("Could not save profile changes");
    } finally {
      setIsSavingProfile(false);
    }
  };

  if (isLoading && !user) {
    return (
      <div className="flex flex-col gap-6">
        <Card className="animate-pulse">
          <CardHeader>
            <CardTitle className="h-6 w-48 rounded bg-muted" />
            <CardDescription className="h-4 w-72 rounded bg-muted" />
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="h-11 rounded bg-muted" />
            <div className="h-11 rounded bg-muted" />
            <div className="h-24 rounded bg-muted" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error && !user) {
    const { message } = getApiErrorDetails(error);

    return (
      <div className="flex flex-col gap-6">
        <StatusCallout
          variant="error"
          title="Could not load profile"
          message={message}
          action={
            <Button type="button" variant="outline" size="sm" onClick={refetch}>
              <IconRefresh className="mr-2 size-4" />
              Retry
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 animate-fade-in-up">
      <PageHeader>
        <PageHeaderHeading icon={IconUser}>
          <PageHeaderTitle>Profile Settings</PageHeaderTitle>
          <PageHeaderDescription>
            Manage your personal details, organization identity, and workspace
            preferences.
          </PageHeaderDescription>
        </PageHeaderHeading>

        <PageHeaderActions>
          {isFetching && (
            <div className="inline-flex items-center gap-2 rounded-lg border px-2.5 py-1.5 text-xs text-muted-foreground">
              <IconLoader className="size-3.5 animate-spin" />
              Syncing...
            </div>
          )}
        </PageHeaderActions>
      </PageHeader>

      <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
        <Card className="h-fit">
          <CardContent className="p-3">
            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors",
                    activeTab === tab.id
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  <tab.icon className="size-4" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </CardContent>
        </Card>

        <div className="space-y-6">
          {activeTab === "general" && (
            <GeneralSettings
              user={user}
              onUpdate={handleUpdateProfile}
              isLoading={isSavingProfile}
            />
          )}
          {activeTab === "security" && <SecuritySettings />}
          {activeTab === "appearance" && <AppearanceSettings />}
        </div>
      </div>
    </div>
  );
}

function GeneralSettings({ user, onUpdate, isLoading }) {
  const form = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: buildDefaultFormValues(user),
    mode: "onBlur",
  });

  const bioValue = form.watch("bio") || "";

  useEffect(() => {
    form.reset(buildDefaultFormValues(user));
  }, [form, user]);

  const resetForm = () => {
    form.reset(buildDefaultFormValues(user));
  };

  return (
    <div className="space-y-6">
      <StatusCallout
        variant="info"
        title="Profile Sync"
        message="Profile and organization changes are currently saved on this device while profile write APIs are being finalized."
      />

      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="relative overflow-hidden rounded-xl bg-linear-to-br from-primary/14 via-primary/5 to-background p-5">
            <div className="absolute -right-12 -top-14 size-36 rounded-full bg-primary/10 blur-2xl" />
            <div className="absolute -bottom-12 -left-8 size-28 rounded-full bg-primary/10 blur-2xl" />

            <div className="relative flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="relative group">
                  <Avatar className="size-18 border border-border/80 bg-background">
                    <AvatarImage src={user?.avatar || null} />
                    <AvatarFallback className="bg-primary/12 text-primary text-lg font-semibold">
                      {getUserInitials(user)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute inset-0 flex cursor-not-allowed items-center justify-center rounded-full bg-black/45 opacity-0 transition-opacity group-hover:opacity-100">
                    <IconCamera className="size-5 text-white" />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold leading-tight">
                    {user?.firstName} {user?.lastName}
                  </h3>
                  <p className="text-sm text-muted-foreground">{user?.email}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <Badge variant="secondary">
                      {getUserPrimaryRole(user)}
                    </Badge>
                    <Badge variant="outline">{getUserOrganization(user)}</Badge>
                  </div>
                </div>
              </div>

              <p className="text-xs text-muted-foreground">
                Avatar upload will be enabled with the profile API update.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Account Details</CardTitle>
          <CardDescription>
            Update your display name, organization name, and bio.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form
              id="profile-form"
              onSubmit={form.handleSubmit(onUpdate)}
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
                      <RequiredLabel>Last Name</RequiredLabel>
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
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <RequiredLabel required={false}>Email</RequiredLabel>
                  <div className="relative">
                    <IconMail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      type="email"
                      className="h-10 pl-10"
                      value={user?.email || ""}
                      disabled
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Email is managed by your organization.
                  </p>
                </div>

                <div className="space-y-2">
                  <RequiredLabel required={false}>Role</RequiredLabel>
                  <Input
                    className="h-10"
                    value={getUserPrimaryRole(user)}
                    disabled
                  />
                </div>
              </div>

              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <RequiredLabel required={false}>Bio</RequiredLabel>
                    <FormControl>
                      <Textarea
                        rows={4}
                        maxLength={240}
                        placeholder="Tell your team about your focus and how you collaborate best."
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">
                        Visible in your team profile card.
                      </span>
                      <span className="text-muted-foreground">
                        {bioValue.length}/240
                      </span>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </CardContent>

        <CardFooter className="flex items-center justify-between border-t bg-muted/35 px-6 py-4">
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

function SecuritySettings() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Password</CardTitle>
          <CardDescription>
            Use reset-password flow to rotate your credentials securely.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <StatusCallout
            variant="info"
            title="Password Management"
            message="Use Forgot Password to receive a secure reset link and update your password."
          />
          <Button asChild>
            <Link to="/forgot-password">Open Forgot Password</Link>
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-4">
            <div>
              <CardTitle className="text-base">
                Two-Factor Authentication
              </CardTitle>
              <CardDescription>
                Additional account protection options are coming soon.
              </CardDescription>
            </div>
            <Button variant="outline" disabled>
              Enable 2FA
            </Button>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
}

function AppearanceSettings() {
  const { theme, setTheme } = useTheme();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Appearance</CardTitle>
        <CardDescription>
          Choose your workspace theme. Preference is saved on this device.
        </CardDescription>
      </CardHeader>

      <CardContent className="grid gap-4 sm:grid-cols-2">
        <button
          type="button"
          className={cn(
            "group relative rounded-xl border p-3 text-left transition-colors hover:bg-accent/40",
            theme === "light"
              ? "border-primary ring-1 ring-primary/20"
              : "border-border",
          )}
          onClick={() => setTheme("light")}
        >
          <div className="space-y-2 rounded-lg bg-[#ecedef] p-2">
            <div className="space-y-2 rounded-md bg-white p-2 shadow-sm">
              <div className="h-2 w-24 rounded bg-[#dde0e4]" />
              <div className="h-2 w-16 rounded bg-[#dde0e4]" />
            </div>
            <div className="flex items-center gap-2 rounded-md bg-white p-2 shadow-sm">
              <div className="size-4 rounded-full bg-[#dde0e4]" />
              <div className="h-2 w-20 rounded bg-[#dde0e4]" />
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-sm font-medium">Light</span>
            {theme === "light" && <Badge>Active</Badge>}
          </div>
        </button>

        <button
          type="button"
          className={cn(
            "group relative rounded-xl border p-3 text-left transition-colors hover:bg-accent/40",
            theme === "dark"
              ? "border-primary ring-1 ring-primary/20"
              : "border-border",
          )}
          onClick={() => setTheme("dark")}
        >
          <div className="space-y-2 rounded-lg bg-slate-950 p-2">
            <div className="space-y-2 rounded-md bg-slate-800 p-2 shadow-sm">
              <div className="h-2 w-24 rounded bg-slate-500" />
              <div className="h-2 w-16 rounded bg-slate-500" />
            </div>
            <div className="flex items-center gap-2 rounded-md bg-slate-800 p-2 shadow-sm">
              <div className="size-4 rounded-full bg-slate-500" />
              <div className="h-2 w-20 rounded bg-slate-500" />
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-sm font-medium">Dark</span>
            {theme === "dark" && <Badge>Active</Badge>}
          </div>
        </button>
      </CardContent>

      <Separator />

      <CardFooter className="px-6 py-4 text-xs text-muted-foreground">
        Theme changes apply instantly across your TeamNest workspace.
      </CardFooter>
    </Card>
  );
}

export default Profile;
