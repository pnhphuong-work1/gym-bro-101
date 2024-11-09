"use client";

import React, {createContext, useContext, useEffect, useState} from 'react';
import {getUserCredentials} from "@/lib/actions/login.action";

interface GlobalContextProps {
    userId: string;
    fullName: string;
    role: string;
    setFullName: (fullName: string) => void;
    setRole: (role: string) => void;
    setUserId: (userId: string) => void;
    loading: boolean;
}

const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);

export function GlobalProvider({children} : {children: React.ReactNode}) {
    const [userId, setUserId] = useState('');
    const [fullName, setFullName] = useState('');
    const [role, setRole] = useState('');
    const [loading, setLoading] = useState(true);
    const handleCredentials = async () => {
        const credentials = await getUserCredentials();
        if (credentials) {
            setUserId(credentials.userId);
            setFullName(credentials.fullName);
            setRole(credentials.role);
        }
        setLoading(false);
    }

    useEffect(() => {
        handleCredentials()
            .then();
    }, []);

    return (
        <GlobalContext.Provider value={{userId, fullName, role, setFullName, setRole, setUserId, loading}}>
            {children}
        </GlobalContext.Provider>
    );
}

export function useGlobalContext() {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error('useGlobalContext must be used within a GlobalProvider');
    }
    return context;
}