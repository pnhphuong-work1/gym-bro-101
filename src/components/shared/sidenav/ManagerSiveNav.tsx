'use client';
import React from 'react';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {managerNavLinks} from '@/constants';

const ManagerSideNav = () => {
    const path = usePathname();

    return (
        <aside className="w-64 bg-gray-800 h-screen fixed top-0 left-0 flex flex-col p-4">
            <div className="text-white text-2xl font-bold mb-8">
                VK2P <span className="text-yellow-400">GYM</span>
            </div>
            <nav className="flex flex-col gap-4">
                {managerNavLinks.map((item, index) => {
                    const isActive = path === item.href;
                    return (
                        <Link
                            key={index}
                            href={item.href}
                            className={`px-4 py-2 rounded-lg transition-colors duration-200 ease-in-out ${isActive
                                ? 'bg-yellow-400 text-black font-bold'
                                : 'text-white hover:bg-gray-700'
                            }`}
                        >
                            {item.name}
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
};

export default ManagerSideNav;