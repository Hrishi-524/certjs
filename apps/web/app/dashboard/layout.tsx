import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/layout/sidebar/app-sidebar"
import { SidebarToggle } from "@/components/layout/sidebar/sidebar-toggle"
import DashboardHeader from "@/components/layout/header/dashboard-header"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
    <SidebarProvider
        style={
            {
                "--sidebar-width": "15rem",
                "--sidebar-width-mobile": "15rem",
                "--sidebar-width-icon": "4rem",
            } as React.CSSProperties
        }
    >
      <AppSidebar />
      <main>
        {children}
      </main>
    </SidebarProvider>
     <DashboardHeader /> 
    </>
  )
}