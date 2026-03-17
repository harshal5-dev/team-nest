import { cn } from "@/lib/utils";
import {
  IconChecklist,
  IconFolder,
  IconLayoutDashboard,
  IconShield,
  IconUsers,
} from "@tabler/icons-react";
import { NavLink } from "react-router";

// Main navigation items
const navItems = [
  { title: "Dashboard", href: "/dashboard", icon: IconLayoutDashboard },
  { title: "Projects", href: "/projects", icon: IconFolder },
  { title: "Tasks", href: "/tasks", icon: IconChecklist },
  { title: "Team", href: "/members", icon: IconUsers },
  { title: "Roles", href: "/roles", icon: IconShield },
];

const SidebarMenu = ({ isCollapsed, handleNavClick }) => {
  return (
    <nav className="space-y-1">
      {navItems.map((item, index) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.href}
            to={item.href}
            title={item.title}
            end
            onClick={handleNavClick}
            style={{ animationDelay: `${index * 50}ms` }}
            className={({ isActive }) =>
              cn(
                "group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium overflow-hidden",
                "transition-all duration-300 ease-out",
                "hover:scale-[1.02] active:scale-[0.98]",
                isCollapsed && "justify-center px-2",
                isActive
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/25"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/60",
              )
            }
          >
            {({ isActive }) => (
              <>
                {/* Hover shine sweep effect */}
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-out bg-linear-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

                {/* Hover gradient background */}
                <span
                  className={cn(
                    "absolute inset-0 bg-linear-to-r from-primary/10 via-primary/5 to-transparent opacity-0 transition-all duration-300",
                    "group-hover:opacity-100",
                    isActive && "opacity-0 group-hover:opacity-0",
                  )}
                />

                {/* Active left indicator */}
                <span
                  className={cn(
                    "absolute left-0 top-1/2 -translate-y-1/2 w-1 rounded-r-full bg-primary-foreground transition-all duration-300 ease-out",
                    isActive
                      ? "h-5 opacity-100"
                      : "h-0 opacity-0 group-hover:h-3 group-hover:opacity-30 group-hover:bg-primary",
                  )}
                />

                {/* Icon with bounce effect */}
                <span className="relative">
                  <Icon
                    className={cn(
                      "size-4.5 shrink-0 transition-all duration-300 ease-out",
                      "group-hover:scale-110 group-hover:-rotate-6",
                      "group-active:scale-95",
                      isActive && "drop-shadow-sm",
                    )}
                  />
                  {/* Icon glow on hover */}
                  <span
                    className={cn(
                      "absolute inset-0 blur-md opacity-0 transition-opacity duration-300",
                      "group-hover:opacity-40",
                      isActive ? "bg-primary-foreground" : "bg-primary",
                    )}
                  />
                </span>

                {/* Text with slide effect */}
                <span
                  className={cn(
                    "relative truncate transition-all duration-300 ease-out",
                    "group-hover:translate-x-1 group-hover:font-semibold",
                    isCollapsed && "hidden",
                  )}
                >
                  {item.title}
                </span>

                {/* Active dot indicator with pulse */}
                {isActive && !isCollapsed && (
                  <span className="relative ml-auto">
                    <span className="size-1.5 rounded-full bg-primary-foreground/80 animate-pulse" />
                  </span>
                )}

                {/* Hover arrow indicator */}
                {!isActive && !isCollapsed && (
                  <span className="relative ml-auto opacity-0 -translate-x-2 group-hover:opacity-60 group-hover:translate-x-0 transition-all duration-300 text-xs">
                    →
                  </span>
                )}
              </>
            )}
          </NavLink>
        );
      })}
    </nav>
  );
};

export default SidebarMenu;
