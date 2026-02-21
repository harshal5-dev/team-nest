import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import {
  IconUser,
  IconLogout,
  IconChevronDown,
} from "@tabler/icons-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { showToast } from "@/components/ui/sonner";
import { getApiErrorDetails } from "@/lib/utils";
import { authApi, useLogoutMutation } from "@/pages/auth/authApi";
import {
  getUserFullName,
  getUserInitials,
  getUserPrimaryRole,
  useAuthUser,
} from "@/components/auth/use-auth-user";

export function UserMenu() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logout, { isLoading: isLoggingOut }] = useLogoutMutation();
  const { user } = useAuthUser();
  const userName = getUserFullName(user);
  const userInitials = getUserInitials(user);
  const userRole = getUserPrimaryRole(user);
  const userEmail = user?.email || "";
  const userAvatar = user?.avatar || null;

  const handleLogout = async () => {
    try {
      const response = await logout().unwrap();
      showToast.success(response?.message || "Logged out successfully");
    } catch (logoutError) {
      const { message } = getApiErrorDetails(logoutError);
      showToast.error(message);
    } finally {
      dispatch(authApi.util.resetApiState());
      navigate("/login", { replace: true });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="group flex items-center gap-2 p-1 pr-2 rounded-full hover:bg-accent/50 focus:outline-none transition-all duration-200">
        {/* Avatar with animated ring */}
        <div className="relative">
          <Avatar className="size-9 ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all duration-300">
            <AvatarImage src={userAvatar} alt={userName} />
            <AvatarFallback className="bg-gradient-to-br from-gradient-start via-gradient-mid to-gradient-end text-primary-foreground text-xs font-semibold">
              {userInitials}
            </AvatarFallback>
          </Avatar>
          {/* Online status indicator */}
          <span className="absolute bottom-0 right-0 size-2.5 bg-success rounded-full ring-2 ring-background animate-pulse" />
        </div>
        
        {/* User info - hidden on mobile */}
        <div className="hidden md:flex flex-col items-start">
          <span className="text-sm font-medium leading-tight group-hover:text-primary transition-colors">
            {userName}
          </span>
          <span className="text-xs text-muted-foreground leading-tight">
            {userRole}
          </span>
        </div>
        
        {/* Chevron icon */}
        <IconChevronDown className="hidden md:block size-4 text-muted-foreground group-hover:text-foreground transition-all duration-200 group-data-[state=open]:rotate-180" />
      </DropdownMenuTrigger>
      
      <DropdownMenuContent 
        align="end" 
        className="w-56 p-2 animate-in fade-in-0 zoom-in-95 slide-in-from-top-2 duration-200"
      >
        {/* User header in dropdown */}
        <div className="flex items-center gap-3 p-2 mb-1">
          <Avatar className="size-10 ring-2 ring-primary/20">
            <AvatarImage src={userAvatar} alt={userName} />
            <AvatarFallback className="bg-gradient-to-br from-gradient-start via-gradient-mid to-gradient-end text-primary-foreground text-sm font-semibold">
              {userInitials}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-semibold">{userName}</span>
            <span className="text-xs text-muted-foreground truncate max-w-[140px]">
              {userEmail}
            </span>
          </div>
        </div>
        
        <DropdownMenuSeparator className="my-1" />
        
        {/* Menu items */}
        <DropdownMenuItem onClick={() => navigate("/profile")} className="cursor-pointer gap-2 p-2 rounded-md transition-all duration-150 hover:translate-x-1">
          <div className="flex items-center justify-center size-8 rounded-md bg-primary/10 text-primary">
            <IconUser className="size-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium">Profile</span>
            <span className="text-xs text-muted-foreground">View your profile</span>
          </div>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator className="my-1" />
        
        <DropdownMenuItem 
          disabled={isLoggingOut}
          className="cursor-pointer gap-2 p-2 rounded-md text-destructive focus:text-destructive focus:bg-destructive/10 transition-all duration-150 hover:translate-x-1"
          onClick={handleLogout}
        >
          <div className="flex items-center justify-center size-8 rounded-md bg-destructive/10">
            <IconLogout className="size-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium">
              {isLoggingOut ? "Logging out..." : "Log out"}
            </span>
            <span className="text-xs opacity-70">Sign out of your account</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserMenu;
