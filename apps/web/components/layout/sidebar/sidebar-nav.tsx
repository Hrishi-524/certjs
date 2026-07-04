import Link from "next/link";
import {
    SidebarContent,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
} from "@/components/ui/sidebar"
import { sidebarGroups } from "@/components/data/sidebar-items";
import { AppIcon } from "@/components/shared/app-icon";


function SidebarNav() {
    return (
        <SidebarContent>
            {sidebarGroups.map((group) => (
                <SidebarGroup key={group.label}>
                    <SidebarGroupLabel>
                        {group.label}
                    </SidebarGroupLabel>
                    
                    <SidebarMenu>
                        {group.items.map((item) => (
                            <SidebarMenuItem key={item.href}>
                                <SidebarMenuButton asChild>
                                    <Link href={item.href}>
                                        <AppIcon icon={item.icon} />
                                        <span>{item.title}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            ))}
        </SidebarContent>
    )
}

export default SidebarNav