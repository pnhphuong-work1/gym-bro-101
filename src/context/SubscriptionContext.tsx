"use client";

import React, {createContext, useContext, useEffect, useState} from 'react';
import {getUserCredentials} from "@/lib/actions/login.action";

interface UserSubscriptionContextProps {
    fullName: string;
    setFullName: (fullName: string) => void;
    loading: boolean;
    subscriptionId: string;
    setSubscriptionId: (subscriptionId: string) => void;
}

const UserSubscriptionContext = createContext<UserSubscriptionContextProps | undefined>(undefined);

export function UserSubscriptionProvider({children} : {children: React.ReactNode}) {
    const [fullName, setFullName] = useState('');
    const [subscriptionId, setSubscriptionId] = useState('');
    const [loading, setLoading] = useState(true);
    const handleCredentials = async () => {
        const credentials = await getUserCredentials();
        if (credentials) {
            setFullName(credentials.fullName);
        }
        setLoading(false);
    }

    useEffect(() => {
        handleCredentials()
            .then();
    }, []);

    return (
        <UserSubscriptionContext.Provider value={{fullName, subscriptionId, setFullName, setSubscriptionId, loading}}>
            {children}
        </UserSubscriptionContext.Provider>
    );
}

export function useUserSubscriptionContext() {
    const context = useContext(UserSubscriptionContext);
    if (!context) {
        throw new Error('use UserSubscriptionContext must be used within a UserSubscriptionProvider');
    }
    return context;
}