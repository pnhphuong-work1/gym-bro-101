import React from 'react';
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import RegisterForm from "@/components/forms/RegisterForm";
import BgLogin from "@/public/asset/bg_login.png";
import Link from "next/link";

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
        <div className="flex min-h-screen w-full items-center justify-center">
            <Card className="w-full max-w-md p-8">
                <CardHeader>
                    <CardTitle className="text-2xl font-semibold">Register</CardTitle>
                </CardHeader>
                <CardContent>
                    <RegisterForm />
                </CardContent>
                <CardFooter>
                    <p
                        className="text-center text-sm"
                    >
                        Already have an account?
                        <Link
                            className="text-blue-500 p-2 hover:underline"
                            href={"/login"}
                        >
                            Login
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
        </div>
    );
};

export default RegisterPage;