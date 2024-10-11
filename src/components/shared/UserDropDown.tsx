'use client';

import React from 'react';
import {
    CircleUser,
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

const UserDropDown = () => {
    const {fullName} = useGlobalContext();
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="secondary"
                        className="sm:rounded-full"
                >
                    <CircleUser className="md:hidden h-5 w-5" />
                    <p className="sm:hidden">{fullName}</p>
                    <span className="sr-only">Toggle user menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default UserDropDown;