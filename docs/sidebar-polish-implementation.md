# Sidebar Polish Implementation

This implementation keeps the existing shadcn sidebar primitives and makes the sidebar feel closer to the second screenshot: slightly larger nav text, tighter shadcn spacing, a stronger account switcher/profile row, and a richer profile dropdown.

## 1. Replace `apps/web/components/layout/sidebar/app-sidebar.tsx`      

```tsx
import {
    Sidebar,
    SidebarFooter,
    SidebarHeader,
} from "@/components/ui/sidebar"
import SidebarNav from "@/components/layout/sidebar/sidebar-nav";
import SidebarFooterContent from "@/components/layout/sidebar/sidebar-footer";

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon">
            <SidebarHeader className="px-3 py-4">
                <div className="flex items-center gap-3 rounded-xl px-2 py-1.5">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                        <span className="text-sm font-bold">C</span>
                    </div>
                    <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                        <span className="truncate text-base font-semibold">CertJs</span>
                        <span className="truncate text-xs text-muted-foreground">Dashboard</span>
                    </div>
                </div>
            </SidebarHeader>

            <SidebarNav />

            <SidebarFooter className="px-3 pb-3">
                <SidebarFooterContent />
            </SidebarFooter>
        </Sidebar>
    );
}
```

## 2. Replace `apps/web/components/layout/sidebar/sidebar-nav.tsx`

```tsx
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
        <SidebarContent className="gap-1 px-1">
            {sidebarGroups.map((group) => (
                <SidebarGroup key={group.label} className="px-2 py-3">
                    <SidebarGroupLabel className="h-7 px-2 text-sm font-semibold text-sidebar-foreground/65">
                        {group.label}
                    </SidebarGroupLabel>

                    <SidebarMenu className="gap-1">
                        {group.items.map((item) => (
                            <SidebarMenuItem key={item.href}>
                                <SidebarMenuButton
                                    asChild
                                    tooltip={item.title}
                                    className="h-10 rounded-lg px-2.5 text-[15px] font-medium [&_svg]:size-5"
                                >
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
```

## 3. Replace `apps/web/components/layout/sidebar/sidebar-footer.tsx`

```tsx
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
                    <ThemeButton />
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
```

If `ThemeButton` still renders smaller than the rest of the footer, give its root `SidebarMenuButton` the same class:

```tsx
className="h-10 rounded-lg px-2.5 text-[15px] font-medium [&_svg]:size-5"
```

## 4. Replace `apps/web/components/layout/sidebar/user-nav.tsx`

```tsx
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
```

## 5. If any Hugeicons import does not exist

Hugeicons names can vary by package version. If TypeScript complains about an icon import, keep the component code and swap only the missing icon names for icons already used in the project.

Known existing icons in this repo include:

```tsx
import {
    AiSettingIcon,
    BookOpen01Icon,
    CodeIcon,
    DashboardSquare01Icon,
    File01Icon,
    Key01Icon,
    Task01Icon,
    UnfoldMoreIcon,
} from "@hugeicons/core-free-icons";
```

## 6. Optional global sidebar font tuning

If you want the whole shadcn sidebar to default bigger without repeating classes, edit the `sidebarMenuButtonVariants` base class in `apps/web/components/ui/sidebar.tsx`.

Change:

```tsx
"peer/menu-button group/menu-button flex w-full items-center gap-2 overflow-hidden rounded-xl px-3 py-2 text-left text-sm whitespace-nowrap ..."
```

To:

```tsx
"peer/menu-button group/menu-button flex w-full items-center gap-2 overflow-hidden rounded-xl px-3 py-2 text-left text-[15px] font-medium whitespace-nowrap ..."
```

Then change the default size variant:

```tsx
default: "h-8 text-sm",
```

To:

```tsx
default: "h-10 text-[15px]",
```

I would use the local class approach first because it is less risky and keeps the shadcn primitive reusable.
