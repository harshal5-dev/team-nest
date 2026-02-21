import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  IconUser,
  IconShieldLock,
  IconBell,
  IconSun,
  IconLoader,
  IconCamera,
  IconRefresh,
  IconCheck,
} from "@tabler/icons-react";

import { cn, getApiErrorDetails } from "@/lib/utils";
import { useTheme } from "@/components/ThemeProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
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
import { authApi } from "@/pages/auth/authApi";
import {
  getUserInitials,
  getUserPrimaryRole,
  saveProfileOverridesForUser,
  useAuthUser,
} from "@/components/auth/use-auth-user";

const profileSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required"),
  lastName: z.string().trim().min(1, "Last name is required"),
  bio: z.string().max(240, "Bio must be at most 240 characters").optional(),
});

export function Profile() {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("general");
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [isSavingNotifications, setIsSavingNotifications] = useState(false);
  const {
    user,
    isLoading,
    isFetching,
    error,
    refetch,
  } = useAuthUser({ refetchOnMountOrArgChange: true });

  const handleUpdateProfile = async (formValues) => {
    if (!user) {
      return;
    }

    setIsSavingProfile(true);

    try {
      const nextUserState = {
        firstName: formValues.firstName.trim(),
        lastName: formValues.lastName.trim(),
        bio: (formValues.bio || "").trim(),
      };

      saveProfileOverridesForUser(user, nextUserState);

      dispatch(
        authApi.util.updateQueryData("getUserInfo", undefined, (draft) => {
          if (!draft) {
            return;
          }

          draft.firstName = nextUserState.firstName;
          draft.lastName = nextUserState.lastName;
        }),
      );

      toast.success("Profile updated successfully");
    } catch {
      toast.error("Could not save profile changes");
    } finally {
      setIsSavingProfile(false);
    }
  };

  const handleSaveNotifications = async (nextNotifications) => {
    if (!user) {
      return;
    }

    setIsSavingNotifications(true);

    try {
      saveProfileOverridesForUser(user, { notifications: nextNotifications });
      toast.success("Notification preferences updated");
    } catch {
      toast.error("Could not save notification preferences");
    } finally {
      setIsSavingNotifications(false);
    }
  };

  const tabs = [
    { id: "general", label: "General", icon: IconUser },
    { id: "security", label: "Security", icon: IconShieldLock },
    { id: "notifications", label: "Notifications", icon: IconBell },
    { id: "appearance", label: "Appearance", icon: IconSun },
  ];

  if (isLoading && !user) {
    return (
      <div className="container max-w-4xl py-8">
        <Card className="animate-pulse">
          <CardHeader>
            <CardTitle className="h-6 w-48 bg-muted rounded" />
            <CardDescription className="h-4 w-72 bg-muted rounded" />
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="h-11 bg-muted rounded" />
            <div className="h-11 bg-muted rounded" />
            <div className="h-24 bg-muted rounded" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error && !user) {
    const { message } = getApiErrorDetails(error);

    return (
      <div className="container max-w-4xl py-8">
        <StatusCallout
          variant="error"
          title="Could not load profile"
          message={message}
          action={
            <Button type="button" variant="outline" size="sm" onClick={refetch}>
              <IconRefresh className="size-4 mr-2" />
              Retry
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <div className="container max-w-6xl py-8 space-y-8 animate-fade-in-up">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences.
          </p>
        </div>
        {isFetching && (
          <div className="inline-flex items-center gap-2 text-xs text-muted-foreground rounded-lg border px-2.5 py-1.5">
            <IconLoader className="size-3.5 animate-spin" />
            Syncing...
          </div>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Navigation */}
        <aside className="md:w-1/4">
          <nav className="flex md:flex-col space-x-2 md:space-x-0 md:space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors w-full text-left",
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
        </aside>

        {/* Content Area */}
        <div className="flex-1 md:max-w-3xl">
          {activeTab === "general" && (
            <GeneralSettings
              user={user}
              onUpdate={handleUpdateProfile}
              isLoading={isSavingProfile}
            />
          )}
          {activeTab === "security" && <SecuritySettings />}
          {activeTab === "notifications" && (
            <NotificationSettings
              user={user}
              onSave={handleSaveNotifications}
              isSaving={isSavingNotifications}
            />
          )}
          {activeTab === "appearance" && <AppearanceSettings />}
        </div>
      </div>
    </div>
  );
}

function GeneralSettings({ user, onUpdate, isLoading }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      bio: user?.bio || "",
    },
  });

  useEffect(() => {
    if (!user) {
      return;
    }

    reset({
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      bio: user.bio || "",
    });
  }, [user, reset]);

  return (
    <div className="space-y-6">
      <StatusCallout
        variant="info"
        title="Profile Sync"
        message="Name and bio changes are currently saved on this device while profile write APIs are being finalized."
      />

      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>
            View your account details and update your display information.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Avatar Section */}
          <div className="flex items-center gap-6">
            <div className="relative group">
              <Avatar className="size-20 border-2 border-border">
                <AvatarImage src={user?.avatar || null} />
                <AvatarFallback className="text-xl bg-primary/10 text-primary font-medium">
                  {getUserInitials(user)}
                </AvatarFallback>
              </Avatar>
              <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-not-allowed">
                <IconCamera className="text-white size-6" />
              </div>
            </div>
            <div className="space-y-1">
              <h3 className="font-medium">Profile Photo</h3>
              <p className="text-sm text-muted-foreground">
                Avatar upload will be enabled with the profile API update.
              </p>
            </div>
          </div>

          <Separator />

          {/* Form */}
          <form
            id="profile-form"
            onSubmit={handleSubmit(onUpdate)}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First name</Label>
                <Input id="firstName" {...register("firstName")} />
                {errors.firstName && (
                  <p className="text-sm text-destructive">{errors.firstName.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last name</Label>
                <Input id="lastName" {...register("lastName")} />
                {errors.lastName && (
                  <p className="text-sm text-destructive">{errors.lastName.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={user?.email || ""} disabled />
              <p className="text-xs text-muted-foreground">
                Email address is managed by your organization.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Input id="role" value={getUserPrimaryRole(user)} disabled />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                placeholder="Write a short bio about yourself..."
                className="resize-none h-24"
                {...register("bio")}
              />
              <p className="text-xs text-muted-foreground">
                This appears in your profile card and team context.
              </p>
              {errors.bio && (
                <p className="text-sm text-destructive">{errors.bio.message}</p>
              )}
            </div>
          </form>
        </CardContent>
        <CardFooter className="border-t bg-muted/40 px-6 py-4">
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
            Password update is currently handled through the reset password flow.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <StatusCallout
            variant="info"
            title="Password Management"
            message="Use the Forgot Password flow on the login page to securely rotate your password."
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <CardTitle className="text-base">Two-Factor Authentication</CardTitle>
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

function NotificationSettings({ user, onSave, isSaving }) {
  const [settings, setSettings] = useState({
    email: true,
    push: false,
    marketing: false,
  });

  useEffect(() => {
    setSettings({
      email: user?.notifications?.email ?? true,
      push: user?.notifications?.push ?? false,
      marketing: user?.notifications?.marketing ?? false,
    });
  }, [user]);

  const toggleSetting = (key) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      [key]: !prevSettings[key],
    }));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>
            Choose what you want to be notified about.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="email-notifs" className="flex flex-col space-y-1">
              <span>Email Notifications</span>
              <span className="font-normal text-xs text-muted-foreground">
                Receive activity updates and account alerts via email.
              </span>
            </Label>
            <input
              type="checkbox"
              id="email-notifs"
              className="size-5 accent-primary"
              checked={settings.email}
              onChange={() => toggleSetting("email")}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="push-notifs" className="flex flex-col space-y-1">
              <span>Push Notifications</span>
              <span className="font-normal text-xs text-muted-foreground">
                Receive in-app alerts for mentions and assignments.
              </span>
            </Label>
            <input
              type="checkbox"
              id="push-notifs"
              className="size-5 accent-primary"
              checked={settings.push}
              onChange={() => toggleSetting("push")}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="marketing-notifs" className="flex flex-col space-y-1">
              <span>Product Updates</span>
              <span className="font-normal text-xs text-muted-foreground">
                Receive feature release notes and best practices.
              </span>
            </Label>
            <input
              type="checkbox"
              id="marketing-notifs"
              className="size-5 accent-primary"
              checked={settings.marketing}
              onChange={() => toggleSetting("marketing")}
            />
          </div>
        </CardContent>
        <CardFooter className="border-t bg-muted/40 px-6 py-4">
          <Button
            type="button"
            onClick={() => onSave(settings)}
            disabled={isSaving}
          >
            {isSaving ? (
              <>
                <IconLoader className="mr-2 size-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Preferences"
            )}
          </Button>
        </CardFooter>
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
          Customize the look and feel of the application.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div
          className={cn(
            "cursor-pointer rounded-lg border-2 p-2 hover:bg-accent",
            theme === "light" ? "border-primary" : "border-muted",
          )}
          onClick={() => setTheme("light")}
        >
          <div className="space-y-2 rounded-md bg-[#ecedef] p-2">
            <div className="space-y-2 rounded-md bg-white p-2 shadow-sm">
              <div className="h-2 w-20 rounded-lg bg-[#ecedef]" />
              <div className="h-2 w-16 rounded-lg bg-[#ecedef]" />
            </div>
            <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
              <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
              <div className="h-2 w-20 rounded-lg bg-[#ecedef]" />
            </div>
          </div>
          <p className="mt-2 text-center text-sm font-medium">Light</p>
        </div>

        <div
          className={cn(
            "cursor-pointer rounded-lg border-2 p-2 hover:bg-accent",
            theme === "dark" ? "border-primary" : "border-muted",
          )}
          onClick={() => setTheme("dark")}
        >
          <div className="space-y-2 rounded-md bg-slate-950 p-2">
            <div className="space-y-2 rounded-md bg-slate-800 p-2 shadow-sm">
              <div className="h-2 w-20 rounded-lg bg-slate-400" />
              <div className="h-2 w-16 rounded-lg bg-slate-400" />
            </div>
            <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
              <div className="h-4 w-4 rounded-full bg-slate-400" />
              <div className="h-2 w-20 rounded-lg bg-slate-400" />
            </div>
          </div>
          <p className="mt-2 text-center text-sm font-medium">Dark</p>
        </div>
      </CardContent>
    </Card>
  );
}

export default Profile;
