"use client";

import useMe from "@/hooks/use-me"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import UserNavSkeleton from "./use-nav-skeleton"
import { SidebarMenuButton } from "@/components/ui/sidebar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    AiUserIcon,
    ArrowTurnBackwardIcon,
    CreditCardIcon,
    Notification01Icon,
    SparklesIcon,
    UnfoldMoreIcon,
} from "@hugeicons/core-free-icons";
import { AppIcon } from "@/components/shared/app-icon";

function UserNav() {
    const { data, isLoading } = useMe()

    if (isLoading) {
        return <UserNavSkeleton />
    }

    if (!data) {
        return null
    }

    const { user } = data
    const fallback = user.name?.charAt(0)?.toUpperCase() ?? "U"

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                    size="lg"
                    className="h-14 rounded-lg px-2.5 data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground [&_svg]:size-4"
                >
                    <Avatar className="size-9 rounded-lg">
                        <AvatarImage src={user.avatarUrl ?? undefined} alt={user.name} />
                        <AvatarFallback className="rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                            {fallback}
                        </AvatarFallback>
                    </Avatar>

                    <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate text-[15px] font-semibold">
                            {user.name}
                        </span>
                        <span className="truncate text-xs text-muted-foreground">
                            {user.email}
                        </span>
                    </div>

                    <AppIcon icon={UnfoldMoreIcon} className="ml-auto text-muted-foreground" />
                </SidebarMenuButton>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                className="w-64 rounded-xl"
                side="right"
                align="end"
                sideOffset={8}
            >
                <DropdownMenuLabel className="p-0 font-normal">
                    <div className="flex items-center gap-3 px-3 py-3">
                        <Avatar className="size-10 rounded-lg">
                            <AvatarImage src={user.avatarUrl ?? undefined} alt={user.name} />
                            <AvatarFallback className="rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                {fallback}
                            </AvatarFallback>
                        </Avatar>
                        <div className="grid flex-1 text-left text-sm leading-tight">
                            <span className="truncate font-semibold">{user.name}</span>
                            <span className="truncate text-xs text-muted-foreground">
                                {user.email}
                            </span>
                        </div>
                    </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuItem className="gap-2">
                    <AppIcon icon={SparklesIcon} />
                    Upgrade to Pro
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                    <DropdownMenuItem className="gap-2">
                        <AppIcon icon={AiUserIcon} />
                        Account
                    </DropdownMenuItem>
                    <DropdownMenuItem className="gap-2">
                        <AppIcon icon={CreditCardIcon} />
                        Billing
                    </DropdownMenuItem>
                    <DropdownMenuItem className="gap-2">
                        <AppIcon icon={Notification01Icon} />
                        Notifications
                    </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <DropdownMenuItem className="gap-2">
                    <AppIcon icon={ArrowTurnBackwardIcon} />
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UserNav