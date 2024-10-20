'use client';

import React, {useEffect} from 'react';
import LoginForm from "@/components/forms/LoginForm";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {useGlobalContext} from "@/context/GlobalContext";
import {useRouter} from "next/navigation";

import BgLogin from "@/public/asset/bg_login.png";
import Link from "next/link";
import {Role} from "@/constants";

const LoginPage = () => {
    const router = useRouter();
    const {role, loading} = useGlobalContext();

    useEffect(() => {
        if (role === 'Admin' && !loading) {
            router.push('/admin/dashboard/staff');  // Only perform this redirection on the client side
        } else if(role === 'User' && !loading) {
            router.push('/customer/memberships');
        } else if (role === Role.Manager && !loading) {
            router.push('/manager/dashboard/check-log');
        }
    }, [role, router, loading]);  // Trigger this effect when `role` or `router` changes
    return (
        <div
            className="relative bg-cover bg-center flex flex-col items-center justify-center flex-grow"
            style={{
                backgroundImage: `url(${BgLogin.src})`,
                height: '90%',
            }}>
            <div className='w-full h-full' style={{background: 'rgba(0, 0, 0, 0.5)'}}>
                <div className="flex min-h-screen w-full items-center justify-center">
                    <Card className="w-full max-w-md p-8">
                        <Link className='h-10 w-10' href='/'>
                            Back
                        </Link>
                        <CardHeader>
                            <CardTitle
                                className="text-2xl font-semibold flex items-center justify-center">Login</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <LoginForm/>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;