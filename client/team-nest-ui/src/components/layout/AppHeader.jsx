import { SidebarTrigger } from "@/components/ui/sidebar";
import UserMenu from "@/components/layout/UserMenu";
import { useGetUserInfoQuery } from "@/pages/auth/authApi";
import { getUserOrganization } from "@/lib/utils";
import { selectIsAuthenticated } from "@/pages/auth/authSlice";
import { useSelector } from "react-redux";
import { skipToken } from "@reduxjs/toolkit/query";
import ThemeToggle from "../theme/ThemeToggle";
import { IconBuilding } from "@tabler/icons-react";

const AppHeader = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const userResponse = useGetUserInfoQuery(
    isAuthenticated ? undefined : skipToken,
  );
  const userInfo = userResponse.data || {};
  const organizationLabel = getUserOrganization(userInfo);

  return (
    <header className="border-b border-border/50 bg-linear-to-r from-background via-background to-primary/10 backdrop-blur-sm shrink-0 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-14">
      <div className="flex h-15 items-center justify-between px-3 sm:px-4 gap-2 sm:gap-3">
        {/* Left section */}
        <div className="flex items-center gap-2 sm:gap-3 h-full min-w-0">
          <SidebarTrigger className="size-9 rounded-lg hover:bg-accent/50 active:bg-accent transition-colors shrink-0" />

          <div className="h-6 w-px bg-border/30 hidden sm:block" />

          {/* Organization Badge */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/50 min-w-0">
            <IconBuilding className="size-4 text-primary shrink-0" />
            <span className="text-sm font-medium truncate">
              {organizationLabel}
            </span>
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-2 h-full">
          <ThemeToggle />

          <div className="h-6 w-px bg-border/30 hidden sm:block" />

          <UserMenu userResponse={userResponse} />
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
