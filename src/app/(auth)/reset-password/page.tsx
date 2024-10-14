import React from 'react';
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import RenewPasswordForm from "@/components/forms/RenewPasswordForm";
import BgLogin from "@/public/asset/bg_login.png";
import {useSearchParams} from "next/navigation";

const ResetPasswordPage = () => {
    const searchParams = useSearchParams();
    const email = searchParams.get('email') as string;
    const token = searchParams.get('token') as string;
    return (
        <div
            className="relative bg-cover bg-center flex flex-col items-center justify-center flex-grow"
            style={{
                backgroundImage: `url(${BgLogin.src})`,
                height: '90%',
            }}>
            <div className="flex min-h-screen w-full items-center justify-center">
                <Card className="w-full max-w-md p-8">
                    <CardHeader>
                        <CardTitle className="text-2xl font-semibold">Reset Password</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <RenewPasswordForm email={email} token={token} />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default ResetPasswordPage;