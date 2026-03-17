import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import AppLogo from "@/components/AppLogo";
import SidebarMenu from "./SidebarMenu";

export function AppSidebar({ ...props }) {
  const { state, isMobile, openMobile, setOpenMobile } = useSidebar();
  const isCollapsed = state === "collapsed";

  const handleNavClick = () => {
    // Close mobile sidebar after navigation with a small delay
    if (isMobile && openMobile) {
      // Schedule the close to happen after navigation
      setTimeout(() => {
        setOpenMobile(false);
      }, 100);
    }
  };

  return (
    <Sidebar
      collapsible="icon"
      className="border-r border-sidebar-border/40"
      {...props}
      style={{ "--sidebar-width-icon": "4rem" }}
    >
      {/* Logo */}
      <SidebarHeader className={cn("p-4", isCollapsed && "p-2")}>
        <AppLogo size="sm" showText={!isCollapsed} />
      </SidebarHeader>

      <SidebarContent className={cn("px-3", isCollapsed && "px-2")}>
        {/* Menu Title */}
        <div className="px-3 mb-2 transition-all duration-300 opacity-100 group-has-data-[collapsible=icon]/sidebar-wrapper:pl-1.5">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/50">
            Menu
          </span>
        </div>

        {/* Navigation */}
        <SidebarMenu
          isCollapsed={isCollapsed}
          handleNavClick={handleNavClick}
        />
      </SidebarContent>
    </Sidebar>
  );
}

export default AppSidebar;
