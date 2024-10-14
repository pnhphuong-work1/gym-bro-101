'use client';

import React, {useState} from 'react';
import Header from "@/components/shared/Header";
import HomeNav from "@/components/shared/navbar/HomeNav";


const Page = () => {
    const [isSticky, setIsSticky] = useState(false);

    return (
        <div className="flex flex-col min-h-screen">
            <div className="h-lvh">
                <Header/>
                <HomeNav isSticky={isSticky} status='memberships'/>
            </div>
        </div>
    );
};

export default Page;