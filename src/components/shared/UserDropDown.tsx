'use client';

import React from 'react';
import {
    CircleUser
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {useGlobalContext} from "@/context/GlobalContext";
import Link from "next/link";
import {logout} from "@/lib/actions/login.action";

const UserDropDown = () => {
    const {fullName,setFullName, setRole} = useGlobalContext();
    const handleLogout = async () => {
        const res = await logout();
        if (res) {
            setFullName('');
            setRole('');
        }
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="secondary"
                        className="rounded-full md:rounded-lg flex items-center gap-2 px-4 py-2
                        bg-red-500 hover:text-yellow-100 transition-colors
                        duration-200 ease-in-out"
                >
                    <CircleUser className="h-5 w-5 md:hidden"/>
                    <p className="hidden md:flex">
                        {fullName}
                    </p>
                    <span className="sr-only">Toggle user menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <Link
                        className="hover:text-primary w-full transition-colors duration-200 ease-in-out cursor-pointer"
                        href={"/profile"}
                    >
                        Profile
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                    Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default UserDropDown;