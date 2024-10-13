import React from 'react';
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import RegisterForm from "@/components/forms/RegisterForm";
import BgLogin from "@/public/asset/bg_login.png";

const RegisterPage = () => {
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
                        <CardTitle className="text-2xl font-semibold">Register</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <RegisterForm/>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default RegisterPage;