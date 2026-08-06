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
import { Separator } from "@/components/ui/separator";

function SidebarNav() {
    return (
        <SidebarContent className="w-full gap-1 px-1">
            {sidebarGroups.map((group) => (
                <SidebarGroup key={group.label} className="border-b pb-3 last:border-none first:my-3">
                    <SidebarGroupLabel className="h-7 px-2 text-sm text-sidebar-foreground/65">
                        {group.label}
                    </SidebarGroupLabel>

                    <SidebarMenu className="gap-1">
                        {group.items.map((item) => (
                            <SidebarMenuItem key={item.href}>
                                <SidebarMenuButton
                                    asChild
                                    tooltip={item.title}
                                    className="h-10 rounded-lg text-[14px] font-medium [&_svg]:size-5"
                                >
                                    <Link href={item.href}>
                                        <AppIcon icon={item.icon} />
                                        <span>{item.title}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                    {/* <Separator/> */}
                </SidebarGroup>
            ))}
        </SidebarContent>
    )
}

export default SidebarNav