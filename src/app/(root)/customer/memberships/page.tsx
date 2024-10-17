'use client';

import React, {useState} from 'react';
import Header from "@/components/shared/Header";
import HomeNav from "@/components/shared/navbar/HomeNav";
import UserSubscriptionList from "@/components/list/UserSubscriptionList";


const Page = () => {
    const [isSticky, setIsSticky] = useState(false);

    return (
        <div className="flex flex-col min-h-screen">
            <div className="h-lvh">
                <Header/>
                <HomeNav isSticky={isSticky} status='memberships'/>
                <h1 className='text-7xl mt-2 flex justify-center text-red-500 pb-5'
                    style={{fontFamily: 'Monda, sans-serif'}}>Subscription</h1>
                <UserSubscriptionList />
            </div>
        </div>
    );
};

export default Page;