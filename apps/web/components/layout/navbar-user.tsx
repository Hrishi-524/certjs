"use client";
import Link from "next/link";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import UserNavSkeleton from "./sidebar/use-nav-skeleton";

import {
    ArrowTurnBackwardIcon,
    BookOpen01Icon,
    DashboardSquare01Icon,
    GithubIcon,
    SparklesIcon,
    UnfoldMoreIcon,
} from "@hugeicons/core-free-icons";

import { AppIcon } from "@/components/shared/app-icon";
import type { MeResponse } from "@/types/auth.types";
import { toast } from "sonner";
import { useLogout } from "@/hooks/use-logout";

type NavbarUserProps = {
    user: MeResponse["user"];
}
export default function NavbarUser({ user }: NavbarUserProps) {
    const fallback =
        user.name?.charAt(0)?.toUpperCase() ?? "U";

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
                <Button
                    variant="ghost"
                    className="h-11 gap-3 px-2"
                >
                    <Avatar className="size-8 rounded-full">
                        <AvatarImage
                            src={user.avatarUrl ?? undefined}
                            alt={user.name}
                        />

                        <AvatarFallback>
                            {fallback}
                        </AvatarFallback>
                    </Avatar>

                    <div className="hidden text-left lg:grid">
                        <span className="truncate text-sm font-medium">
                            {user.name}
                        </span>

                        <span className="truncate text-xs text-muted-foreground">
                            {user.email}
                        </span>
                    </div>

                    <AppIcon
                        icon={UnfoldMoreIcon}
                        className="hidden text-muted-foreground lg:block"
                    />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                align="end"
                className="w-64 rounded-xl"
            >
                <DropdownMenuLabel className="font-normal">
                    <div className="flex items-center gap-3">
                        <Avatar className="size-10">
                            <AvatarImage
                                src={user.avatarUrl ?? undefined}
                            />

                            <AvatarFallback>
                                {fallback}
                            </AvatarFallback>
                        </Avatar>

                        <div className="grid">
                            <span className="font-semibold">
                                {user.name}
                            </span>

                            <span className="text-xs text-muted-foreground">
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
    );
}