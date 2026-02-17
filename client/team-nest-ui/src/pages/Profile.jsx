import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  IconUser,
  IconShieldLock,
  IconBell,
  IconSun,
  IconMoon,
  IconCheck,
  IconLoader,
  IconCamera,
} from "@tabler/icons-react";

import { cn } from "@/lib/utils";
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
import { showToast as toast } from "@/components/ui/sonner";
import { Separator } from "@/components/ui/separator";

// Mock current user data
const MOCK_USER = {
  id: 1,
  firstName: "Harshal",
  lastName: "Ganbote",
  email: "harshal@teamnest.app",
  role: "Admin",
  bio: "Full Stack Developer & Admin",
  avatar: null,
  notifications: {
    email: true,
    push: false,
    marketing: false,
  },
};

const profileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  bio: z.string().optional(),
  email: z.string().email(),
});

export function Profile() {
  const [user, setUser] = useState(MOCK_USER);
  const [activeTab, setActiveTab] = useState("general");
  const [isLoading, setIsLoading] = useState(false);

  // Update logic would go here
  const handleUpdate = async (data) => {
    setIsLoading(true);
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setUser({ ...user, ...data });
    toast.success("Profile updated successfully");
    setIsLoading(false);
  };

  const tabs = [
    { id: "general", label: "General", icon: IconUser },
    { id: "security", label: "Security", icon: IconShieldLock },
    { id: "notifications", label: "Notifications", icon: IconBell },
    { id: "appearance", label: "Appearance", icon: IconSun },
  ];

  return (
    <div className="container max-w-6xl py-8 space-y-8 animate-fade-in-up">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences.
        </p>
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
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
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
            <GeneralSettings user={user} onUpdate={handleUpdate} isLoading={isLoading} />
          )}
          {activeTab === "security" && <SecuritySettings />}
          {activeTab === "notifications" && <NotificationSettings user={user} />}
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
    formState: { errors },
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      bio: user.bio,
    },
  });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>
            Update your photo and personal details here.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Avatar Section */}
          <div className="flex items-center gap-6">
            <div className="relative group">
              <Avatar className="size-20 border-2 border-border">
                <AvatarImage src={user.avatar} />
                <AvatarFallback className="text-xl bg-primary/10 text-primary font-medium">
                  {user.firstName[0]}
                  {user.lastName[0]}
                </AvatarFallback>
              </Avatar>
              <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                <IconCamera className="text-white size-6" />
              </div>
            </div>
            <div className="space-y-1">
              <h3 className="font-medium">Profile Photo</h3>
              <p className="text-sm text-muted-foreground">
                Click to upload a new profile picture.
              </p>
            </div>
          </div>

          <Separator />

          {/* Form */}
          <form id="profile-form" onSubmit={handleSubmit(onUpdate)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
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
              <Input id="email" type="email" {...register("email")} disabled />
              <p className="text-xs text-muted-foreground">
                Email address cannot be changed directly. Contact support.
              </p>
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
                Brief description for your profile. URLs are hyperlinked.
              </p>
            </div>
          </form>
        </CardContent>
        <CardFooter className="border-t bg-muted/40 px-6 py-4">
          <Button type="submit" form="profile-form" disabled={isLoading}>
            {isLoading && <IconLoader className="mr-2 size-4 animate-spin" />}
            Save Changes
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
            Change your password to keep your account secure.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Current Password</Label>
            <Input type="password" />
          </div>
          <div className="space-y-2">
            <Label>New Password</Label>
            <Input type="password" />
          </div>
          <div className="space-y-2">
            <Label>Confirm New Password</Label>
            <Input type="password" />
          </div>
        </CardContent>
        <CardFooter className="border-t bg-muted/40 px-6 py-4">
          <Button>Update Password</Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
           <div className="flex items-center justify-between">
             <div className="space-y-1">
               <CardTitle className="text-base">Two-Factor Authentication</CardTitle>
                <CardDescription>
                  Add an extra layer of security to your account.
                </CardDescription>
             </div>
             <Button variant="outline" disabled>Enable 2FA</Button>
           </div>
        </CardHeader>
      </Card>
    </div>
  );
}

function NotificationSettings() {
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
              <span className="font-normal text-xs text-muted-foreground">Receieve daily digests and updates via email.</span>
            </Label>
            <Input type="checkbox" id="email-notifs" className="size-5 w-auto" defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="push-notifs" className="flex flex-col space-y-1">
              <span>Push Notifications</span>
              <span className="font-normal text-xs text-muted-foreground">Receieve real-time updates in your browser.</span>
            </Label>
            <Input type="checkbox" id="push-notifs" className="size-5 w-auto" disabled />
          </div>
        </CardContent>
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
      <CardContent className="grid grid-cols-2 gap-4">
        <div 
          className={cn(
            "cursor-pointer rounded-lg border-2 p-2 hover:bg-accent",
            theme === "light" ? "border-primary" : "border-muted"
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
            theme === "dark" ? "border-primary" : "border-muted"
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
