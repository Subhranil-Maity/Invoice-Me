"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {useAuth, UserData} from "@/context/authcontext"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"

export function UserNav({ user }: { user: UserData }) {

    const { logOut} = useAuth();
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>{user.orgName.charAt(0) ?? "U"}</AvatarFallback>
                    {/*<AvatarFallback>{"E"}</AvatarFallback>*/}
                </Avatar>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
                <DropdownMenuItem>{user.email}</DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logOut}>
                    Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
