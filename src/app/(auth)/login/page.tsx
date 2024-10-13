import React from 'react';
import LoginForm from "@/components/forms/LoginForm";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import BgLogin from "@/public/asset/bg_login.png";
import Link from "next/link";

const LoginPage = () => {
    return (
        <div
            className="relative bg-cover bg-center flex flex-col items-center justify-center flex-grow"
            style={{
                backgroundImage: `url(${BgLogin.src})`,
                height: '90%',
            }}>
            <div className="flex min-h-screen w-full items-center justify-center">
                <Card className="w-full max-w-md p-8">
                    <Link className='h-10 w-10' href='/'>
                        Back
                    </Link>
                     <CardHeader>
                        <CardTitle className="text-2xl font-semibold flex items-center justify-center">Login</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <LoginForm/>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default LoginPage;