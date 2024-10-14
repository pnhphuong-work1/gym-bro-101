import React from 'react';
import Logo from "@/components/shared/Logo";
import Link from "next/link";

const HomeNav = ({ isSticky }) => {
    return (
        <div
            className={`left-0 right-0 z-10 p-4 bg-opacity-100 bg-black transition-all duration-300 ease-in-out 
                ${isSticky ? 'fixed top-0 bg-opacity-100' : 'relative bg-opacity-100'}`}
        >
            <div className="container mx-auto flex items-center">
                <div className='w-[40%]'>
                    <Logo/>
                </div>
                <nav className='w-[60%]'>
                    <ul className="flex space-x-6 text-white justify-between text-3xl">
                        <li><Link href="/" className="hover:text-gray-300">HOME</Link></li>
                        <li><a href="#services" className="hover:text-gray-300">MEMBERSHIPS</a></li>
                        <li><a href="#about" className="hover:text-gray-300">SCHEDULE</a></li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default HomeNav;