import React from 'react';
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import ForgotPasswordForm from "@/components/forms/ForgotPasswordForm";
import BgLogin from "@/public/asset/bg_login.png";

const ForgotPasswordPage = () => {
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
                        <CardTitle className="text-2xl font-semibold">Forgot Password</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ForgotPasswordForm/>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;