"use client";

import React, {Suspense} from 'react';
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import RenewPasswordForm from "@/components/forms/RenewPasswordForm";
import BgLogin from "@/public/asset/bg_login.png";
import {useSearchParams} from "next/navigation";

function Search() {
    const searchParams = useSearchParams();
    const email = searchParams.get('email') as string;
    const token = searchParams.get('token') as string;

    return <RenewPasswordForm email={email} token={token}/>;
}


const ResetPasswordPage = () => {
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
                        <CardHeader>
                            <CardTitle className="text-2xl font-semibold">Reset Password</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Suspense>
                                <Search/>
                            </Suspense>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default ResetPasswordPage;