import Link from "next/link";
import {
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton
} from "@/components/ui/sidebar"
import { AppIcon } from "@/components/shared/app-icon";
import { AiSettingIcon } from '@hugeicons/core-free-icons';
import { ThemeButton } from "@/components/shared/theme-button";
import UserNav from "@/components/layout/sidebar/user-nav";

function SidebarFooterContent() {
    return (
        <div className="space-y-1.5">
            <SidebarMenu>
                <SidebarMenuItem>
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
                </SidebarMenuItem>
            </SidebarMenu>

            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton
                        size="sm"
                        className="h-10 rounded-lg px-2.5 text-[15px] font-medium [&_svg]:size-5"
                    >
                        <ThemeButton />
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>

            <SidebarMenu>
                <SidebarMenuItem>
                    <UserNav />
                </SidebarMenuItem>
            </SidebarMenu>
        </div>
    )
}

export default SidebarFooterContent