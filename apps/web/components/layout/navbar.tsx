"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { AppIcon } from "@/components/shared/app-icon";
import { NAVBAR_ITEMS } from "@/components/data/landing/navbar";

import { cn } from "@/lib/utils";

import useMe from "@/hooks/use-me";
import UserNavSkeleton from "./sidebar/use-nav-skeleton";
import NavbarUser from "./navbar-user";

export default function Navbar() {
    const pathname = usePathname();
    const { data: me, isLoading } = useMe();
    
    const user = me?.user;
    const isAuthenticated = !!user;

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6">
                {/* Logo */}
                <Link
                    href="/"
                    className="flex items-center gap-2"
                >
                    <span className="text-xl font-bold tracking-tight">
                        CertJS
                    </span>
                </Link>

                {/* Navigation */}
                <NavigationMenu className="hidden lg:flex">
                    <NavigationMenuList>
                        {NAVBAR_ITEMS
                            .filter((item) => !item.disabled)
                            .map((item) => {
                                const active =
                                    !item.external &&
                                    pathname === item.href;

                                return (
                                    <NavigationMenuItem
                                        key={item.label}
                                    >
                                        <NavigationMenuLink
                                            asChild
                                        >
                                            <Link
                                                href={item.href}
                                                target={
                                                    item.external
                                                        ? "_blank"
                                                        : undefined
                                                }
                                                rel={
                                                    item.external
                                                        ? "noreferrer"
                                                        : undefined
                                                }
                                                className={cn(
                                                    "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                                                    active
                                                        ? "bg-muted text-foreground"
                                                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                                )}
                                            >
                                                {item.icon && (
                                                    <AppIcon
                                                        icon={item.icon}
                                                        className="size-4"
                                                    />
                                                )}

                                                {item.label}
                                            </Link>
                                        </NavigationMenuLink>
                                    </NavigationMenuItem>
                                );
                            })}
                    </NavigationMenuList>
                </NavigationMenu>

                {/* Right Side */}
                <div className="flex items-center gap-2">
                    <ThemeToggle />

                    {isLoading ? (
                        <UserNavSkeleton />
                    ) : isAuthenticated ? (
                        <>
                            <Button
                                asChild
                                variant="outline"
                            >
                                <Link href="/dashboard">
                                    Dashboard
                                </Link>
                            </Button>

                            <NavbarUser user={user} />
                        </>
                    ) : (
                        <>
                            <Button asChild variant="ghost">
                                <Link href="/login">
                                    Login
                                </Link>
                            </Button>

                            <Button asChild>
                                <Link href="/signup">
                                    Sign Up
                                </Link>
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}
