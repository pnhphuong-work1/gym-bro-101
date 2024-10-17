'use client';

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useGlobalContext } from "@/context/GlobalContext";
import Link from "next/link";
import {logout} from "@/lib/actions/login.action";

const Header = () => {
    const { fullName, role } = useGlobalContext();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleLogout = async () => {
        localStorage.removeItem('authToken')
        await logout();
    };

    const buttonByRole = () => {
        switch (role) {
            case 'Admin':
            case 'Manager':
            case 'User':
                return (
                    <div className='relative z-50'>
                        <Button
                            className='text-white font-bold flex bg-red-600 border py-5 px-8 mr-10'
                            onClick={toggleDropdown}
                        >
                            {fullName}
                        </Button>

                        {/* Dropdown Menu */}
                        {dropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50"
                                 style={{ zIndex: 9999 }}>
                                <Link href='/profile'>
                                    <button className='block px-4 py-2 text-black hover:bg-gray-200 w-full text-left'>
                                        Profile
                                    </button>
                                </Link>
                                <button
                                    className='block px-4 py-2 text-black hover:bg-gray-200 w-full text-left'
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                );
            default:
                return (
                    <Link href='/login'>
                        <Button className='text-white font-bold flex bg-red-600 border py-5 px-8 mr-10'>Login</Button>
                    </Link>
                );
        }
    };

    return (
        <div className='bg-red-600 h-[10%] w-full top-0 flex items-center justify-between'>
            <div className='text-white font-bold flex ml-20'>
                {/* Phone SVG */}
                <svg width="20" height="20" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_2_43)">
                        <path
                            d="M7.525 2.5C8.01336 2.59528 8.46219 2.83413 8.81403 3.18597C9.16587 3.53781 9.40471 3.98663 9.5 4.475M7.525 0.5C8.53963 0.612718 9.48579 1.06709 10.2081 1.7885C10.9304 2.50992 11.386 3.4555 11.5 4.47M11 8.46V9.96C11.0006 10.0993 10.972 10.2371 10.9163 10.3647C10.8605 10.4923 10.7786 10.6068 10.676 10.7009C10.5734 10.7951 10.4523 10.8667 10.3204 10.9114C10.1885 10.956 10.0487 10.9725 9.91 10.96C8.37141 10.7928 6.8935 10.2671 5.595 9.425C4.38691 8.65733 3.36267 7.63309 2.595 6.425C1.74999 5.1206 1.22412 3.6355 1.06 2.09C1.0475 1.95173 1.06393 1.81238 1.10825 1.68081C1.15256 1.54924 1.22378 1.42834 1.31738 1.32581C1.41098 1.22328 1.5249 1.14135 1.65189 1.08526C1.77889 1.02917 1.91617 1.00013 2.055 1H3.555C3.79765 0.997612 4.03289 1.08354 4.21688 1.24177C4.40086 1.39999 4.52104 1.61972 4.555 1.86C4.61831 2.34003 4.73572 2.81136 4.905 3.265C4.97227 3.44396 4.98683 3.63846 4.94695 3.82544C4.90707 4.01242 4.81443 4.18406 4.68 4.32L4.045 4.955C4.75677 6.20677 5.79322 7.24322 7.045 7.955L7.68 7.32C7.81594 7.18557 7.98757 7.09292 8.17456 7.05305C8.36154 7.01317 8.55603 7.02773 8.735 7.095C9.18863 7.26428 9.65996 7.38169 10.14 7.445C10.3829 7.47926 10.6047 7.6016 10.7633 7.78875C10.9218 7.97589 11.0061 8.21479 11 8.46Z"
                            stroke="#FFFAFA" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                    </g>
                    <defs>
                        <clipPath id="clip0_2_43">
                            <rect width="12" height="12" fill="white"/>
                        </clipPath>
                    </defs>
                </svg>
                <h3 className='ml-2'>0949769812</h3>
            </div>
            <div className='text-white font-bold flex'>
                <svg width="20" height="20" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M6 11C5.88333 11 5.78333 10.9667 5.7 10.9C5.61667 10.8333 5.55417 10.7458 5.5125 10.6375C5.35417 10.1708 5.15417 9.73333 4.9125 9.325C4.67917 8.91667 4.35 8.4375 3.925 7.8875C3.5 7.3375 3.15417 6.8125 2.8875 6.3125C2.62917 5.8125 2.5 5.20833 2.5 4.5C2.5 3.525 2.8375 2.7 3.5125 2.025C4.19583 1.34167 5.025 1 6 1C6.975 1 7.8 1.34167 8.475 2.025C9.15833 2.7 9.5 3.525 9.5 4.5C9.5 5.25833 9.35417 5.89167 9.0625 6.4C8.77917 6.9 8.45 7.39583 8.075 7.8875C7.625 8.4875 7.28333 8.9875 7.05 9.3875C6.825 9.77917 6.6375 10.1958 6.4875 10.6375C6.44583 10.7542 6.37917 10.8458 6.2875 10.9125C6.20417 10.9708 6.10833 11 6 11ZM6 5.75C6.35 5.75 6.64583 5.62917 6.8875 5.3875C7.12917 5.14583 7.25 4.85 7.25 4.5C7.25 4.15 7.12917 3.85417 6.8875 3.6125C6.64583 3.37083 6.35 3.25 6 3.25C5.65 3.25 5.35417 3.37083 5.1125 3.6125C4.87083 3.85417 4.75 4.15 4.75 4.5C4.75 4.85 4.87083 5.14583 5.1125 5.3875C5.35417 5.62917 5.65 5.75 6 5.75Z"
                        stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <h3 className='ml-2 mr-4'>6th Floor, Hanoi</h3>
                {buttonByRole()}
            </div>
        </div>
    );
};

export default Header;
