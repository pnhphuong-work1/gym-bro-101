import React from 'react';
import Logo from "@/components/shared/Logo";
import Link from "next/link";
import {useGlobalContext} from "@/context/GlobalContext";

interface HomeNavProps {
    isSticky: boolean;
    status: string;
}

const HomeNav = ({isSticky, status}: HomeNavProps) => {

    const {role} = useGlobalContext();

    return (
        <div
            className={`left-0 right-0 z-10 p-4 bg-opacity-100 bg-black transition-all duration-300 ease-in-out 
                ${isSticky ? 'fixed top-0 bg-opacity-100' : 'relative bg-opacity-100'}`}
        >
            <div className="container mx-auto flex items-center">
                <div className='w-[40%]'>
                    <Logo/>
                </div>
                {role === 'User' && (
                    <nav className='w-[60%]'>
                        <ul className="flex space-x-6 text-white justify-between text-3xl">
                            <li>
                                <Link href="/"
                                      className={`hover:text-gray-300 ${status === 'memberships' ? 'text-[#E0E84F]' : ''}`}
                                >
                                    HOME
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/customer/memberships"
                                    className={`hover:text-gray-300 ${status === 'memberships' ? 'text-[#E0E84F]' : ''}`}
                                >
                                    MEMBERSHIPS
                                </Link>
                            </li>
                            <li>
                                <a href="/" className="hover:text-gray-300">SCHEDULE</a>
                            </li>
                        </ul>
                    </nav>
                )}

            </div>
        </div>
    );
};

export default HomeNav;