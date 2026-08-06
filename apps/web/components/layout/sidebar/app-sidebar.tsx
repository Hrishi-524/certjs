import {
    Sidebar,
    SidebarFooter,
    SidebarHeader,
} from "@/components/ui/sidebar"
import SidebarNav from "@/components/layout/sidebar/sidebar-nav";
import SidebarFooterContent from "@/components/layout/sidebar/sidebar-footer";
import { Separator } from "@/components/ui/separator";
import { SidebarToggle } from "@/components/layout/sidebar/sidebar-toggle";

export function AppSidebar() {
    return (
        <Sidebar  collapsible="icon">
            <SidebarToggle />
            <SidebarHeader className="px-3 py-4">
                {/* Expanded */}
                <div className="group-data-[collapsible=icon]:hidden">
                    <span className="text-base font-semibold">
                        CertJs
                    </span>
                    <br />
                    <span className="text-xs text-muted-foreground">
                        Dashboard
                    </span>
                </div>

                {/* Collapsed */}
                <div className="hidden group-data-[collapsible=icon]:flex">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
                        CJ
                    </div>
                </div>
            </SidebarHeader>
            <Separator />
            <SidebarNav />
            <Separator />
            <SidebarFooter className="px-3 pb-3">
                <SidebarFooterContent />
            </SidebarFooter>
        </Sidebar>
    );
}