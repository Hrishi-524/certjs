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
        <SidebarMenu className="space-y-1">
            <SidebarMenuItem>
                <SidebarMenuButton
                    asChild
                    tooltip="Settings"
                    className="h-9 rounded-lg px-2.5 text-[13px] font-medium [&_svg]:size-4"
                >
                    <Link href="/dashboard/settings">
                        <AppIcon icon={AiSettingIcon} />
                        <span>Settings</span>
                    </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
                <ThemeButton />
            </SidebarMenuItem>

            <SidebarMenuItem>
                <UserNav />
            </SidebarMenuItem>
        </SidebarMenu>
    )
}

export default SidebarFooterContent
