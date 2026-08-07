import {
    SidebarMenu,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { SidebarThemeButton } from "@/components/shared/sidebar-theme-button";
import UserNav from "@/components/layout/sidebar/user-nav";

function SidebarFooterContent() {

    return (
        <SidebarMenu className="space-y-1.5">
            {/* <SidebarMenu> */}
                {/* <SidebarMenuItem>
                    <SidebarMenuButton
                        asChild
                        tooltip="Settings"
                        className="h-10 rounded-lg px-2.5 text-[15px] font-medium [&_svg]:size-5"
                    >
                        <Link href="/dashboard/settings">
                            <AppIcon icon={AiSettingIcon} />
                            <span>Settings</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem> */}
            {/* </SidebarMenu> */}

            {/* <SidebarMenu> */}
                <SidebarMenuItem>
                    <SidebarThemeButton />
                </SidebarMenuItem>
            {/* </SidebarMenu> */}

            {/* <SidebarMenu> */}
                <SidebarMenuItem>
                    <UserNav/>
                </SidebarMenuItem>
            {/* </SidebarMenu> */}
        </SidebarMenu>
    )
}

export default SidebarFooterContent