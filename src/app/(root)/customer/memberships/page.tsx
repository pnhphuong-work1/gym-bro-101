'use client';

import React, {useState} from 'react';
import Header from "@/components/shared/Header";
import HomeNav from "@/components/shared/navbar/HomeNav";
import UserSubscriptionList from "@/components/list/UserSubscriptionList";
import BgMembership from "@/public/asset/membership-page.jpg";


const Page = () => {
    const [isSticky, setIsSticky] = useState(false);

    return (
        <div className="flex flex-col min-h-screen">
            <div className="h-lvh">
                <Header/>
                <HomeNav isSticky={isSticky} status='memberships'/>
                <div className="relative bg-cover bg-center"
                     style={{
                         backgroundImage: `url(${BgMembership.src})`,
                         height: '100%',
                     }}>
                    <div className='w-full h-full' style={{background: 'rgba(0, 0, 0, 0.5)'}}>
                <h1 className='text-7xl flex justify-center text-red-500 py-3'
                    style={{fontFamily: 'Monda, sans-serif'}}>Subscription</h1>
                <UserSubscriptionList />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;