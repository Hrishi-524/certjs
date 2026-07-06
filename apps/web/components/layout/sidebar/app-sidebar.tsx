import {
    Sidebar,
    SidebarFooter,
    SidebarHeader,
} from "@/components/ui/sidebar"
import SidebarNav from "@/components/layout/sidebar/sidebar-nav";
import SidebarFooterContent from "@/components/layout/sidebar/sidebar-footer";

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon">
            <SidebarHeader className="px-3 py-4">
                <div className="flex items-center gap-3 rounded-xl px-2 py-1.5">
                    <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                        <span className="truncate text-base font-semibold">CertJs</span>
                        <span className="truncate text-xs text-muted-foreground">Dashboard</span>
                    </div>
                </div>
            </SidebarHeader>

            <SidebarNav />

            <SidebarFooter className="px-3 pb-3">
                <SidebarFooterContent />
            </SidebarFooter>
        </Sidebar>
    );
}