import { useState } from "react";
import { useSelector } from "react-redux";
import {
  IconAlertTriangle,
  IconBuilding,
  IconCheck,
  IconPalette,
  IconShieldLock,
  IconSun,
  IconUser,
  IconUserCircle,
} from "@tabler/icons-react";

import {
  cn,
  getUserInitials,
  getUserOrganization,
  getUserPrimaryRole,
  getUserFullName,
} from "@/lib/utils";
import { useTheme } from "@/components/ThemeProvider";
import { Button } from "@/components/ui/button";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  PageHeader,
  PageHeaderActions,
  PageHeaderDescription,
  PageHeaderHeading,
  PageHeaderTitle,
} from "@/components/ui/page-header";
import { useUpdateUserInfoMutation } from "@/pages/auth/authApi";
import { selectCurrentUser } from "../auth/authSlice";
import {
  AVATAR_CATEGORIES,
  getAvatarsByCategory,
} from "@/components/AvatarGallery";
import { ProfileForm } from "./ProfileForm";
import { UpdatePasswordForm } from "./UpdatePasswordForm";

const tabs = [
  { id: "general", label: "General", icon: IconUser },
  { id: "security", label: "Security", icon: IconShieldLock },
  { id: "appearance", label: "Appearance", icon: IconSun },
];

/* ─── Avatar Picker Dialog ─── */
function AvatarPickerDialog({ currentAvatar, onSelect, isLoading }) {
  const [open, setOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(AVATAR_CATEGORIES[0].id);
  const [selectedAvatar, setSelectedAvatar] = useState(currentAvatar || "");

  const visibleAvatars = getAvatarsByCategory(activeCategory);

  const handleConfirm = () => {
    onSelect(selectedAvatar);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            disabled={isLoading}
          >
            <IconPalette className="size-4" />
            Change Avatar
          </Button>
        }
      />
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Choose Your Avatar</DialogTitle>
          <DialogDescription>
            Pick a category and select the avatar that represents you best.
          </DialogDescription>
        </DialogHeader>

        {/* Category tabs */}
        <div className="flex gap-1.5">
          {AVATAR_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "rounded-full px-3 py-1 text-xs font-medium transition-all",
                activeCategory === cat.id
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground",
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Avatar grid */}
        <div className="grid grid-cols-4 gap-3 sm:grid-cols-6">
          {visibleAvatars.map((avatar) => (
            <TooltipProvider key={avatar.id}>
              <Tooltip>
                <TooltipTrigger
                  render={
                    <button
                      type="button"
                      onClick={() => setSelectedAvatar(avatar.url)}
                      className={cn(
                        "relative rounded-xl border-2 p-1.5 transition-all hover:scale-105",
                        selectedAvatar === avatar.url
                          ? "border-primary bg-primary/5 ring-2 ring-primary/20 shadow-md"
                          : "border-transparent hover:border-border",
                      )}
                    >
                      <img
                        src={avatar.url}
                        alt={avatar.label}
                        className="size-full rounded-lg"
                      />
                      {selectedAvatar === avatar.url && (
                        <div className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-primary text-primary-foreground shadow">
                          <IconCheck className="size-3" />
                        </div>
                      )}
                    </button>
                  }
                />
                <TooltipContent>{avatar.label}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>

        {/* Preview */}
        {selectedAvatar && (
          <div className="flex items-center gap-3 rounded-lg border bg-muted/30 p-3">
            <img
              src={selectedAvatar}
              alt="Preview"
              className="size-12 rounded-full border bg-background"
            />
            <div className="text-sm">
              <p className="font-medium">Preview</p>
              <p className="text-muted-foreground text-xs">
                This avatar will appear across TeamNest.
              </p>
            </div>
          </div>
        )}

        <DialogFooter showCloseButton>
          <Button
            type="button"
            onClick={handleConfirm}
            disabled={!selectedAvatar}
          >
            <IconCheck className="mr-2 size-4" />
            Apply Avatar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

/* ─── Main Profile ─── */
export function Profile() {
  const [activeTab, setActiveTab] = useState("general");
  const [pendingAvatar, setPendingAvatar] = useState(null);
  const user = useSelector(selectCurrentUser);

  const [updateUserInfo, { isLoading: isUpdating }] =
    useUpdateUserInfoMutation();

  const hasUnsavedAvatar =
    pendingAvatar !== null && pendingAvatar !== user?.avatar;

  const handleAvatarSelect = (avatarUrl) => {
    setPendingAvatar(avatarUrl);
  };

  const handleUpdateProfile = async (payload) => {
    try {
      await updateUserInfo(payload).unwrap();
      setPendingAvatar(null);
      toast.success("Profile updated successfully");
    } catch (error) {
      const message = error?.data?.message || "Could not save profile changes";
      toast.error(message);
    }
  };

  /* No user data available */
  if (!user) {
    return (
      <div className="flex flex-col gap-6 animate-fade-in-up">
        <PageHeader>
          <PageHeaderHeading icon={IconUser}>
            <PageHeaderTitle>Profile</PageHeaderTitle>
            <PageHeaderDescription>
              Manage your account, preferences, and workspace identity.
            </PageHeaderDescription>
          </PageHeaderHeading>
        </PageHeader>

        <Card className="py-12">
          <CardContent className="flex flex-col items-center justify-center text-center">
            <div className="flex size-16 items-center justify-center rounded-full bg-muted mb-4">
              <IconUserCircle className="size-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold">No profile data</h3>
            <p className="mt-1 max-w-sm text-sm text-muted-foreground">
              Your profile information isn&apos;t available right now. Please
              log in again to load your account details.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 animate-fade-in-up">
      {/* Page Header */}
      <PageHeader>
        <PageHeaderHeading icon={IconUser}>
          <PageHeaderTitle>Profile</PageHeaderTitle>
          <PageHeaderDescription>
            Manage your account, preferences, and workspace identity.
          </PageHeaderDescription>
        </PageHeaderHeading>
        <PageHeaderActions />
      </PageHeader>

      {/* Profile Hero Banner */}
      <Card className="overflow-hidden py-0">
        <div className="relative">
          {/* Gradient banner — shorter, with layered effects */}
          <div className="relative h-20 bg-linear-to-r from-gradient-start via-gradient-mid to-gradient-end sm:h-24">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.12)_0%,transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.08)_0%,transparent_40%)]" />
            {/* Subtle dot pattern overlay */}
            <div className="absolute inset-0 opacity-[0.07] bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxMCIgY3k9IjEwIiByPSIxLjUiIGZpbGw9IiNmZmYiLz48L3N2Zz4=')]" />
          </div>

          {/* Profile info — horizontal layout */}
          <div className="relative px-5 pb-5 sm:px-6 sm:pb-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:gap-5">
              {/* Avatar */}
              <div className="-mt-10 sm:-mt-12 relative shrink-0">
                <div className="rounded-full bg-background p-1 shadow-lg ring-1 ring-border/50">
                  <Avatar className="size-18 bg-background sm:size-20">
                    <AvatarImage src={pendingAvatar || user?.avatar || null} />
                    <AvatarFallback className="bg-primary/10 text-primary text-lg font-bold sm:text-xl">
                      {getUserInitials(user)}
                    </AvatarFallback>
                  </Avatar>
                </div>
                {hasUnsavedAvatar && (
                  <div className="absolute -right-0.5 bottom-0.5 flex size-5 items-center justify-center rounded-full bg-warning text-warning-foreground shadow ring-2 ring-background">
                    <IconAlertTriangle className="size-3" />
                  </div>
                )}
              </div>

              {/* Name, email & badges */}
              <div className="flex flex-1 flex-col gap-3 pt-1 sm:flex-row sm:items-end sm:justify-between">
                <div className="min-w-0 space-y-0.5">
                  <h2 className="truncate text-lg font-semibold tracking-tight sm:text-xl">
                    {getUserFullName(user)}
                  </h2>
                  <p className="truncate text-sm text-muted-foreground">
                    {user?.email}
                  </p>
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    <Badge variant="default" className="gap-1 text-xs">
                      {getUserPrimaryRole(user)}
                    </Badge>
                    <Badge variant="outline" className="gap-1 text-xs">
                      <IconBuilding className="size-3" />
                      {getUserOrganization(user)}
                    </Badge>
                  </div>
                </div>

                {/* Change Avatar action */}
                <div className="shrink-0">
                  <AvatarPickerDialog
                    currentAvatar={pendingAvatar || user?.avatar}
                    onSelect={handleAvatarSelect}
                    isLoading={isUpdating}
                  />
                </div>
              </div>
            </div>

            {/* Unsaved avatar warning */}
            {hasUnsavedAvatar && (
              <div className="mt-4">
                <StatusCallout
                  variant="warning"
                  title="Unsaved avatar"
                  message='You have selected a new avatar. Click "Save Changes" in the General tab to apply it.'
                  onDismiss={() => setPendingAvatar(null)}
                />
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Tab layout */}
      <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
        {/* Sidebar nav */}
        <Card className="h-fit">
          <CardContent className="p-2">
            <nav className="space-y-0.5">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-all",
                    activeTab === tab.id
                      ? "bg-primary/10 text-primary shadow-sm"
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

        {/* Tab content */}
        <div className="space-y-6">
          {activeTab === "general" && (
            <ProfileForm
              user={user}
              pendingAvatar={pendingAvatar}
              onUpdate={handleUpdateProfile}
              isLoading={isUpdating}
            />
          )}
          {activeTab === "security" && <SecuritySettings />}
          {activeTab === "appearance" && <AppearanceSettings />}
        </div>
      </div>
    </div>
  );
}

/* ─── Security Settings ─── */
function SecuritySettings() {
  return (
    <div className="space-y-6">
      <UpdatePasswordForm />

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-4">
            <div>
              <CardTitle className="text-base">
                Two-Factor Authentication
              </CardTitle>
              <CardDescription>
                Additional account protection is coming soon.
              </CardDescription>
            </div>
            <Badge variant="outline">Coming Soon</Badge>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
}

/* ─── Appearance Settings ─── */
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
            "group relative overflow-hidden rounded-xl border-2 p-3 text-left transition-all hover:shadow-md",
            theme === "light"
              ? "border-primary ring-2 ring-primary/20 shadow-md"
              : "border-border hover:border-muted-foreground/30",
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
            "group relative overflow-hidden rounded-xl border-2 p-3 text-left transition-all hover:shadow-md",
            theme === "dark"
              ? "border-primary ring-2 ring-primary/20 shadow-md"
              : "border-border hover:border-muted-foreground/30",
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
