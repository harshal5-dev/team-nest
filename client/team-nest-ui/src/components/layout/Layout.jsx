import { Outlet } from "react-router";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { AppHeader } from "@/components/layout/AppHeader";

export function Layout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="flex flex-col">
        <AppHeader />
        <main className="flex-1 p-4 md:p-6 bg-background overflow-auto">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default Layout;