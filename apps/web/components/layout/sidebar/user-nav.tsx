"use client";

import useMe from '@/hooks/use-me'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from '@/components/ui/button'
import UserNavSkeleton from './use-nav-skeleton'

function UserNav() {
    const { data, isLoading } = useMe()

    if(isLoading) {
        return <UserNavSkeleton/>
    }

    if(!data) {
        return null
    }

    const { user } = data

    return (
        <Button variant="ghost" className="w-full justify-start">
            <Avatar>
                <AvatarImage src={user.avatarUrl ?? undefined}/>
                <AvatarFallback>
                    {user.name.charAt(0).toUpperCase()}
                </AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-start overflow-hidden">
                <span className="truncate font-medium">
                    {user.name}
                </span>

                <span className="truncate text-xs text-muted-foreground">
                    {user.email}
                </span>
            </div>
        </Button>
    )
}

export default UserNav