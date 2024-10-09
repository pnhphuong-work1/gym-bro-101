"use client";

import React, {createContext, useContext, useEffect, useState} from 'react';
import {getUserCredentials} from "@/lib/actions/login.action";

interface GlobalContextProps {
    fullName: string;
    role: string;
    setFullName: (fullName: string) => void;
    setRole: (role: string) => void;
}

const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);

export function GlobalProvider({children} : {children: React.ReactNode}) {
    const [fullName, setFullName] = useState('');
    const [role, setRole] = useState('');
    const handleCredentials = async () => {
        const credentials = await getUserCredentials();
        console.log(credentials)
        if (credentials) {
            setFullName(credentials.fullName);
            setRole(credentials.role);
        }
    }

    useEffect(() => {
        handleCredentials()
            .then(r => console.log(r))
    }, [fullName, role]);

    return (
        <GlobalContext.Provider value={{fullName, role, setFullName, setRole}}>
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