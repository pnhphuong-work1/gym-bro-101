'use client';
import React, {useEffect} from 'react';
import {useGlobalContext} from "@/context/GlobalContext";
import {useRouter} from "next/navigation";
import {LoadingSpinner} from "@/components/shared/LoadingSpinner";
import {Role} from "@/constants";

const ManagerLayout = ({children} : {children: React.ReactNode}) => {
    const router = useRouter();
    const {role, loading} = useGlobalContext();

    useEffect(() => {
        if (role !== Role.Manager && !loading) {
            router.push('/login');  // Only perform this redirection on the client side
        }
    }, [role, router, loading]);  // Trigger this effect when `role` or `router` changes

    if (role !== Role.Manager) {
        return (
            <div className="flex items-center justify-center h-screen">
                <LoadingSpinner
                    string={"Redirecting to login page..."}
                    className="h-32 w-32 flex items-center justify-center"
                />
            </div>
        )
    }

    return (
        <main>
            {children}
        </main>
    );
};

export default ManagerLayout;