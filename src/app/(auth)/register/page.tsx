import React from 'react';
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import RegisterForm from "@/components/forms/RegisterForm";

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
            </Card>
        </div>
    );
};

export default RegisterPage;