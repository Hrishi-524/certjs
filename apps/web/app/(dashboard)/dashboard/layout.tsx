import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/layout/sidebar/app-sidebar"
import DashboardHeader from "@/components/layout/header/dashboard-header"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
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
      <SidebarInset className="h-svh min-h-0 min-w-0 overflow-hidden">
        <div className="shrink-0">
          <DashboardHeader />
        </div>
        <div className="min-h-0 min-w-0 flex-1 overflow-auto">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
