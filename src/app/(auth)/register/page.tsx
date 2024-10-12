import React from 'react';
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import RegisterForm from "@/components/forms/RegisterForm";
import Link from "next/link";

const RegisterPage = () => {
    return (
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
    );
};

export default RegisterPage;