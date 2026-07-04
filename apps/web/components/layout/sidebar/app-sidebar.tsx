import {
    Sidebar,
    SidebarFooter,
    SidebarHeader,
} from "@/components/ui/sidebar"
import SidebarNav from "@/components/layout/sidebar/sidebar-nav";
import SidebarFooterContent from "@/components/layout/sidebar/sidebar-footer";

export function AppSidebar() {  
    return (
        <Sidebar>
            <SidebarHeader>
                CertJs
            </SidebarHeader>

            <SidebarNav/>

            <SidebarFooter>
                <SidebarFooterContent/>
            </SidebarFooter>
        </Sidebar>
    );
}