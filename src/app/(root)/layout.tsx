import React from 'react';
import {UserSubscriptionProvider} from "@/context/SubscriptionContext";

const Layout = ({children} : {children: React.ReactNode}) => {
    return (
        <main className="h-lvh w-full items-center justify-center">
            <UserSubscriptionProvider>
                {children}
            </UserSubscriptionProvider>
        </main>
    );
};

export default Layout;