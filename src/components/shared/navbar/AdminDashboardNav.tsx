'use client';
import React from 'react';
import Link from "next/link";
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet";
import {Button} from "@/components/ui/button";
import {Menu} from "lucide-react";
import UserDropDown from "@/components/shared/UserDropDown";
import {usePathname} from "next/navigation";
import {adminNavLinks} from "@/constants";

const AdminDashboardNav = () => {
    const path = usePathname();
    return (
        <div className="flex h-full w-full flex-col">
            <header
                className="bg-red-600 sticky top-0 flex flex-row justify-between h-16 items-center gap-4 border-b border-black bg-background px-4 md:px-6">
                <nav
                    className="hidden flex-col justify-center gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-6 md:text-lg lg:gap-6">
                    <Link
                        className="text-xl w-full h-full pr-6 font-bold hover:text-primary transition-colors duration-200 ease-in-out cursor-pointer"
                        href={"/"}
                    >
                        <div className="text-2xl font-bold w-32">
                            VK2P <span className="text-yellow-400">GYM</span>
                        </div>
                    </Link>

                    {adminNavLinks.map((item, index) => {
                        const isActive = (path.includes(item.href) &&
                            item.href.length > 1) || (path === item.href);
                        return (
                            <Link
                                key={index}
                                href={item.href}
                                className={`${isActive
                                    ? 'text-yellow-100 font-bold'
                                    : 'text-black'
                                } hover:text-yellow-100
                                transition-colors duration-200 ease-in-out 
                                flex items-center justify-center px-4 py-2
                                w-full cursor-pointer`}
                            >
                                {item.name}
                            </Link>
                        )
                    })}
                </nav>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button
                            variant="outline"
                            size="icon"
                            className="shrink-0 md:hidden bg-blue-300 hover:bg-blue-400 transition-colors duration-200 ease-in-out"
                        >
                            <Menu className="h-5 w-5"/>
                            <span className="sr-only">Toggle navigation menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent
                        className="bg-blue-400 w-full h-full"
                        side="left"
                    >
                        <nav
                            className="grid gap-6 text-lg font-medium">
                            <Link
                                className="text-xl font-bold hover:text-primary transition-colors duration-200 ease-in-out cursor-pointer"
                                href={"/"}
                            >
                                VK2P Gym
                            </Link>

                            {adminNavLinks.map((item, index) => {
                                const isActive = (path.includes(item.href) &&
                                    item.href.length > 1) || (path === item.href);
                                return (
                                    <Link
                                        key={index}
                                        href={item.href}
                                        className={`${isActive
                                            ? 'text-primary font-bold bg-blue-300'
                                            : 'text-black'
                                        } hover:text-yellow-100 transition-colors 
                                        duration-200 flex ease-in-out items-center justify-start
                                        gap-4 p-4
                                        w-full h-10 cursor-pointer`}
                                    >
                                        {item.name}
                                    </Link>
                                )
                            })}
                        </nav>
                    </SheetContent>
                </Sheet>

                <UserDropDown />
            </header>
        </div>
    );
};

export default AdminDashboardNav;