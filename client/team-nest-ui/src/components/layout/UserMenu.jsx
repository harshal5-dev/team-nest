import { useNavigate } from "react-router";
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

// Sample user data - will be replaced with actual auth context
const currentUser = {
  name: "Harshal Ganbote",
  email: "harshal@teamnest.app",
  avatar: null,
  role: "Admin",
  organization: "TeamNest",
};

function getInitials(name) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function UserMenu() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="group flex items-center gap-2 p-1 pr-2 rounded-full hover:bg-accent/50 focus:outline-none transition-all duration-200">
        {/* Avatar with animated ring */}
        <div className="relative">
          <Avatar className="size-9 ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all duration-300">
            <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
            <AvatarFallback className="bg-gradient-to-br from-gradient-start via-gradient-mid to-gradient-end text-primary-foreground text-xs font-semibold">
              {getInitials(currentUser.name)}
            </AvatarFallback>
          </Avatar>
          {/* Online status indicator */}
          <span className="absolute bottom-0 right-0 size-2.5 bg-success rounded-full ring-2 ring-background animate-pulse" />
        </div>
        
        {/* User info - hidden on mobile */}
        <div className="hidden md:flex flex-col items-start">
          <span className="text-sm font-medium leading-tight group-hover:text-primary transition-colors">
            {currentUser.name}
          </span>
          <span className="text-xs text-muted-foreground leading-tight">
            {currentUser.role}
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
            <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
            <AvatarFallback className="bg-gradient-to-br from-gradient-start via-gradient-mid to-gradient-end text-primary-foreground text-sm font-semibold">
              {getInitials(currentUser.name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-semibold">{currentUser.name}</span>
            <span className="text-xs text-muted-foreground truncate max-w-[140px]">
              {currentUser.email}
            </span>
          </div>
        </div>
        
        <DropdownMenuSeparator className="my-1" />
        
        {/* Menu items */}
        <DropdownMenuItem className="cursor-pointer gap-2 p-2 rounded-md transition-all duration-150 hover:translate-x-1">
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
          className="cursor-pointer gap-2 p-2 rounded-md text-destructive focus:text-destructive focus:bg-destructive/10 transition-all duration-150 hover:translate-x-1"
          onClick={handleLogout}
        >
          <div className="flex items-center justify-center size-8 rounded-md bg-destructive/10">
            <IconLogout className="size-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium">Log out</span>
            <span className="text-xs opacity-70">Sign out of your account</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export { currentUser };
export default UserMenu;
