import {
  IconSun,
  IconMoon,
  IconBuilding,
} from "@tabler/icons-react";

import { getUserOrganization, useAuthUser } from "@/components/auth/use-auth-user";
import { useTheme } from "@/components/ThemeProvider";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { UserMenu } from "@/components/layout/UserMenu";

function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex items-center justify-center size-9 rounded-lg hover:bg-accent hover:text-accent-foreground transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      aria-label="Toggle theme"
    >
      <IconSun className="size-5 rotate-0 scale-100 transition-all duration-300 ease-in-out dark:-rotate-90 dark:scale-0" />
      <IconMoon className="absolute size-5 rotate-90 scale-0 transition-all duration-300 ease-in-out dark:rotate-0 dark:scale-100" />
    </button>
  );
}

export function AppHeader() {
  const { user } = useAuthUser();
  const organizationLabel = getUserOrganization(user);

  return (
    <header className="sticky top-0 z-[5] w-full border-b bg-background/80 backdrop-blur-lg supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center justify-between px-4 md:px-6">
        {/* Left section */}
        <div className="flex items-center gap-3 h-full">
          <SidebarTrigger className="size-9 rounded-lg hover:bg-accent transition-colors" />
          
          <div className="h-6 w-px bg-border hidden sm:block" />
          
          {/* Organization Badge */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/50">
            <IconBuilding className="size-4 text-primary" />
            <span className="text-sm font-medium">{organizationLabel}</span>
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-2 h-full">
          <ThemeToggle />
          
          <div className="h-6 w-px bg-border" />
          
          <UserMenu />
        </div>
      </div>
    </header>
  );
}

export default AppHeader;
