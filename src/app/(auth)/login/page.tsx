import React from 'react';
import LoginForm from "@/components/forms/LoginForm";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";


const LoginPage = () => {
    return (
        <div className="flex min-h-screen w-full items-center justify-center">
            <Card className="w-full max-w-md p-8">
                <CardHeader>
                    <CardTitle className="text-2xl font-semibold">Login</CardTitle>
                </CardHeader>
                <CardContent>
                    <LoginForm />
                </CardContent>
            </Card>
        </div>
    );
};

export default LoginPage;