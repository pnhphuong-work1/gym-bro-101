import React from 'react';
import Link from "next/link";
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet";
import {Button} from "@/components/ui/button";
import {Menu} from "lucide-react";

const DashboardNav = () => {
    return (
        <div className="flex h-full w-full flex-col">
            <header
                className="bg-blue-200 sticky top-0 flex h-16 items-center gap-4 border-b border-black bg-background px-4 md:px-6">
                <nav
                    className="hidden flex-col justify-center gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                    <Link
                        className="text-xl font-bold hover:text-primary transition-colors duration-200 ease-in-out cursor-pointer"
                        href={"/"}
                    >
                        VK2P GYM
                    </Link>

                    <Link
                        className="hover:text-primary transition-colors duration-200 ease-in-out cursor-pointer"
                        href={"/dashboard"}
                    >
                        Dashboard
                    </Link>
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
                    <SheetContent className="bg-blue-400" side="left">
                        <nav
                            className="grid gap-6 text-lg font-medium">
                            <Link
                                className="text-xl font-bold hover:text-primary transition-colors duration-200 ease-in-out cursor-pointer"
                                href={"/"}
                            >
                                VK2P Gym
                            </Link>

                            <Link
                                className="hover:text-primary transition-colors duration-200 ease-in-out cursor-pointer"
                                href={"/dashboard"}
                            >
                                Dashboard
                            </Link>
                        </nav>
                    </SheetContent>
                </Sheet>
            </header>
        </div>
    );
};

export default DashboardNav;