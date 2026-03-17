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
import {
  useUpdateUserInfoMutation,
  useUpdateTenantInfoMutation,
} from "@/pages/auth/authApi";
import { selectCurrentUser } from "../auth/authSlice";
import {
  AVATAR_CATEGORIES,
  getAvatarsByCategory,
} from "@/components/AvatarGallery";
import { ProfileForm } from "./ProfileForm";
import { OrganizationSettings } from "./OrganizationSettings";
import { UpdatePasswordForm } from "./UpdatePasswordForm";

const tabs = [
  { id: "general", label: "General", icon: IconUser },
  { id: "organization", label: "Organization", icon: IconBuilding },
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
      <DialogContent className="max-w-[calc(100vw-2rem)] sm:max-w-md max-h-[85vh] sm:max-h-[80vh] p-2 sm:p-4 flex flex-col">
        <DialogHeader className="shrink-0 px-1 sm:px-2 py-2 sm:py-3">
          <DialogTitle className="text-base sm:text-lg">
            Choose Your Avatar
          </DialogTitle>
          <DialogDescription className="text-xs sm:text-sm">
            Pick a category and select the avatar that represents you best.
          </DialogDescription>
        </DialogHeader>

        {/* Category tabs */}
        <div className="flex flex-wrap gap-0.5 sm:gap-1 shrink-0 px-1 sm:px-2 py-2 overflow-x-auto">
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
        <div className="flex-1 overflow-y-auto px-1 sm:px-2 py-2 min-h-0">
          <div className="grid grid-cols-3 gap-1 sm:grid-cols-4 md:grid-cols-6 sm:gap-1.5 place-items-center">
            {visibleAvatars.map((avatar) => (
              <TooltipProvider key={avatar.id}>
                <Tooltip>
                  <TooltipTrigger
                    render={
                      <button
                        type="button"
                        onClick={() => setSelectedAvatar(avatar.url)}
                        className={cn(
                          "w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 relative flex items-center justify-center rounded-lg sm:rounded-xl border-2 transition-all hover:border-primary/30 aspect-square",
                          selectedAvatar === avatar.url
                            ? "border-primary bg-primary/5 ring-2 ring-primary/20 shadow-md scale-105"
                            : "border-transparent",
                        )}
                      >
                        <img
                          src={avatar.url}
                          alt={avatar.label}
                          className="w-full h-full object-cover rounded-md sm:rounded-lg"
                        />
                        {selectedAvatar === avatar.url && (
                          <div className="absolute -right-1 -top-1 flex size-4 sm:size-5 items-center justify-center rounded-full bg-primary text-primary-foreground shadow">
                            <IconCheck className="size-2.5 sm:size-3" />
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
        </div>

        {/* Preview */}
        {selectedAvatar && (
          <div className="shrink-0 flex flex-col sm:flex-row items-center gap-1.5 sm:gap-2 rounded-lg border bg-muted/30 p-2 sm:p-3 mx-1 sm:mx-2 my-2 sm:my-3">
            <img
              src={selectedAvatar}
              alt="Preview"
              className="size-9 sm:size-11 rounded-full border bg-background shrink-0"
            />
            <div className="text-xs text-center sm:text-left">
              <p className="font-medium text-xs sm:text-sm">Preview</p>
              <p className="text-muted-foreground text-xs leading-tight">
                This avatar will appear across TeamNest.
              </p>
            </div>
          </div>
        )}

        <DialogFooter
          showCloseButton
          className="shrink-0 px-1 sm:px-2 py-2 sm:py-3"
        >
          <Button
            type="button"
            onClick={handleConfirm}
            disabled={!selectedAvatar}
            className="w-full sm:w-auto text-xs sm:text-sm"
          >
            <IconCheck className="mr-2 size-3 sm:size-4" />
            <span className="hidden sm:inline">Apply Avatar</span>
            <span className="sm:hidden">Apply</span>
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
  const isGeneralTab = activeTab === "general";

  const canManageOrg = user?.roles?.some(
    (role) =>
      (typeof role === "string" && role.toLowerCase() === "admin") ||
      (typeof role === "object" && role?.name?.toLowerCase() === "admin"),
  );

  const [updateUserInfo, { isLoading: isUpdatingUser }] =
    useUpdateUserInfoMutation();
  const [updateTenantInfo, { isLoading: isUpdatingOrg }] =
    useUpdateTenantInfoMutation();

  const hasUnsavedAvatar =
    pendingAvatar !== null && pendingAvatar !== user?.avatar;

  const handleAvatarSelect = (avatarUrl) => {
    setPendingAvatar(avatarUrl);
  };

  const handleUpdateUser = async (userPayload) => {
    try {
      await updateUserInfo(userPayload).unwrap();
      setPendingAvatar(null);
      toast.success("Profile updated successfully");
    } catch (error) {
      const message = error?.data?.message || "Could not save profile changes";
      toast.error(message);
    }
  };

  const handleUpdateOrganization = async (orgPayload) => {
    try {
      await updateTenantInfo({
        id: user?.tenant?.id,
        ...orgPayload,
      }).unwrap();
      toast.success("Organization updated successfully");
    } catch (error) {
      const message =
        error?.data?.message || "Could not save organization changes";
      toast.error(message);
    }
  };

  /* No user data available */
  if (!user) {
    return (
      <div className="flex flex-col gap-4 sm:gap-6 animate-fade-in-up w-full overflow-hidden">
        <PageHeader>
          <PageHeaderHeading icon={IconUser}>
            <PageHeaderTitle>Profile</PageHeaderTitle>
            <PageHeaderDescription>
              Manage your account, preferences, and workspace identity.
            </PageHeaderDescription>
          </PageHeaderHeading>
        </PageHeader>

        <Card className="overflow-hidden py-0 -mt-1">
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
    <div className="flex flex-col gap-4 sm:gap-6 animate-fade-in-up w-full overflow-hidden">
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
      <Card className="overflow-hidden sm:py-0">
        <div className="relative">
          {/* Gradient banner — shorter, with layered effects */}
          <div className="relative h-20 bg-linear-to-r from-gradient-start via-gradient-mid to-gradient-end sm:h-24 -mb-1">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.12)_0%,transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.08)_0%,transparent_40%)]" />
            {/* Subtle dot pattern overlay */}
            <div className="absolute inset-0 opacity-[0.07] bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxMCIgY3k9IjEwIiByPSIxLjUiIGZpbGw9IiNmZmYiLz48L3N2Zz4=')]" />
          </div>

          {/* Profile info — horizontal layout */}
          <div className="relative px-3 sm:px-5 md:px-6 pt-0 pb-2 sm:pb-3 md:pb-4">
            <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4">
              {/* Left: Avatar + Name/Email/Badges */}
              <div className="flex flex-col flex-1 min-w-0">
                {/* Avatar + Name row */}
                <div className="flex flex-col sm:flex-row sm:items-end gap-3 sm:gap-4">
                  {/* Avatar */}
                  <div className="-mt-6 sm:-mt-8 md:-mt-10 relative shrink-0 w-fit">
                    <div className="rounded-full bg-background p-1 shadow-lg ring-1 ring-border/50">
                      <Avatar className="size-16 sm:size-18 md:size-20 bg-background">
                        <AvatarImage
                          src={pendingAvatar || user?.avatar || null}
                        />
                        <AvatarFallback className="bg-primary/10 text-primary text-base sm:text-lg md:text-xl font-bold">
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
                  <div className="min-w-0 space-y-0.5 flex-1 pt-1.5">
                    <h2 className="truncate text-base sm:text-lg md:text-xl font-semibold tracking-tight">
                      {getUserFullName(user)}
                    </h2>
                    <p className="truncate text-xs sm:text-sm text-muted-foreground">
                      {user?.email}
                    </p>
                    <div className="flex flex-wrap items-center gap-1 sm:gap-1.5 pt-1">
                      <Badge
                        variant="default"
                        className="gap-0.5 sm:gap-1 text-xs"
                      >
                        {getUserPrimaryRole(user)}
                      </Badge>
                      <Badge
                        variant="outline"
                        className="gap-0.5 sm:gap-1 text-xs"
                      >
                        <IconBuilding className="size-2.5 sm:size-3" />
                        {getUserOrganization(user)}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Change Avatar button */}
              <div className="shrink-0 sm:mt-0 pt-5">
                {isGeneralTab ? (
                  <AvatarPickerDialog
                    currentAvatar={pendingAvatar || user?.avatar}
                    onSelect={handleAvatarSelect}
                    isLoading={isUpdatingUser}
                  />
                ) : (
                  <div className="space-y-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="gap-2"
                      onClick={() => setActiveTab("general")}
                      disabled={isUpdatingUser}
                    >
                      <IconPalette className="size-3.5 sm:size-4" />
                      <span className="hidden sm:inline">
                        Manage Avatar In General
                      </span>
                      <span className="sm:hidden">Avatar…</span>
                    </Button>
                    <p className="text-xs text-muted-foreground text-left">
                      Avatar changes are saved from the General tab.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Unsaved avatar warning */}
            {hasUnsavedAvatar && (
              <div className="mt-4">
                <StatusCallout
                  variant="warning"
                  title="Unsaved avatar"
                  message={
                    isGeneralTab
                      ? 'You have selected a new avatar. Click "Save Changes" to apply it.'
                      : "You have selected a new avatar. Go back to the General tab to save it."
                  }
                  action={
                    !isGeneralTab ? (
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() => setActiveTab("general")}
                      >
                        Open General Tab
                      </Button>
                    ) : null
                  }
                  onDismiss={() => setPendingAvatar(null)}
                />
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Tab layout */}
      <div className="grid gap-2 md:gap-4 md:grid-cols-[160px_1fr] lg:grid-cols-[180px_1fr]">
        {/* Sidebar nav */}
        <Card className="h-fit border-0 md:border bg-transparent md:bg-card overflow-x-auto md:overflow-visible">
          <CardContent className="p-0 md:p-2">
            <nav className="flex flex-row md:flex-col gap-1.5 md:gap-1 md:space-y-0">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex shrink-0 md:w-full items-center gap-2 md:gap-2 rounded-full md:rounded-lg px-3 md:px-2.5 py-1.5 md:py-2 text-left text-xs md:text-sm font-medium transition-all duration-200 whitespace-nowrap md:whitespace-normal border md:border-0",
                    activeTab === tab.id
                      ? "bg-primary text-primary-foreground shadow-sm border-primary md:border-0 md:bg-primary/10 md:text-primary md:shadow-none"
                      : "border-transparent text-muted-foreground hover:bg-muted/50 hover:text-foreground md:hover:bg-muted/40",
                  )}
                >
                  <tab.icon className="size-3.5 md:size-4 shrink-0" />
                  <span className="hidden md:inline">{tab.label}</span>
                  <span className="md:hidden text-xs">{tab.label}</span>
                </button>
              ))}
            </nav>
          </CardContent>
        </Card>

        {/* Tab content */}
        <div className="space-y-4 md:space-y-6">
          {activeTab === "general" && (
            <ProfileForm
              user={user}
              pendingAvatar={pendingAvatar}
              onUpdateUser={handleUpdateUser}
              isUpdatingUser={isUpdatingUser}
            />
          )}
          {activeTab === "organization" && (
            <OrganizationSettings
              user={user}
              onUpdateOrganization={handleUpdateOrganization}
              isUpdatingOrganization={isUpdatingOrg}
              canManage={canManageOrg}
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
