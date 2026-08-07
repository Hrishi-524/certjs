"use client";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
    ArrowTurnBackwardIcon,
    BookOpen01Icon,
    DashboardSquare01Icon,
    GithubIcon,
    SparklesIcon,
    UnfoldMoreIcon,
} from "@hugeicons/core-free-icons";

import { AppIcon } from "@/components/shared/app-icon";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";

import { useLogout } from "@/hooks/use-logout";

function UserNav() {
    const { user } = useAuth();
    const fallback = user.name?.charAt(0)?.toUpperCase() ?? "U"

    const logoutMutation = useLogout();

    async function handleLogout() {
        try {
            await logoutMutation.mutateAsync();

            toast.success("Signed out.");
        } catch {
            toast.error("Failed to sign out.");
        }
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                    size="lg"
                    className="h-14 rounded-lg px-2.5 data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground [&_svg]:size-4"
                >
                    <Avatar className="size-9 rounded-lg">
                        <AvatarImage src={user.avatarUrl === null ? undefined : user.avatarUrl} alt={user.name} />
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
                            <AvatarImage
                                src={user.avatarUrl ?? undefined}
                                alt={user.name}
                            />
                            <AvatarFallback className="rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                {fallback}
                            </AvatarFallback>
                        </Avatar>

                        <div className="grid flex-1 text-left text-sm leading-tight">
                            <span className="truncate font-semibold">
                                {user.name}
                            </span>

                            <span className="truncate text-xs text-muted-foreground">
                                {user.email}
                            </span>
                        </div>
                    </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuGroup>

                    <DropdownMenuItem asChild>
                        <Link href="/dashboard">
                            <AppIcon icon={DashboardSquare01Icon} />
                            Dashboard
                        </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild>
                        <Link href="/docs">
                            <AppIcon icon={BookOpen01Icon} />
                            Documentation
                        </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild>
                        <a
                            href="https://github.com/your-org/certjs"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <AppIcon icon={GithubIcon} />
                            GitHub
                        </a>
                    </DropdownMenuItem>

                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <DropdownMenuItem>
                    <AppIcon icon={SparklesIcon} />
                    What's New
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                    disabled={logoutMutation.isPending}
                    onClick={handleLogout}
                    className="text-destructive focus:text-destructive"
                >
                    <AppIcon icon={ArrowTurnBackwardIcon} />

                    {logoutMutation.isPending
                        ? "Signing out..."
                        : "Sign Out"}
                </DropdownMenuItem>

            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UserNav