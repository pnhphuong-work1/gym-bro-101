"use client";

import React, {createContext, useContext, useEffect, useState} from 'react';
import {getUserCredentials} from "@/lib/actions/login.action";

interface GlobalContextProps {
    fullName: string;
    role: string;
    setFullName: (fullName: string) => void;
    setRole: (role: string) => void;
    loading: boolean;
}

const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);

export function GlobalProvider({children} : {children: React.ReactNode}) {
    const [fullName, setFullName] = useState('');
    const [role, setRole] = useState('');
    const [loading, setLoading] = useState(true);
    const handleCredentials = async () => {
        const credentials = await getUserCredentials();
        if (credentials) {
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
        <GlobalContext.Provider value={{fullName, role, setFullName, setRole, loading}}>
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