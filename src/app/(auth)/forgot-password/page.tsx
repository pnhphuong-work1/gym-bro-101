import React from 'react';
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import ForgotPasswordForm from "@/components/forms/ForgotPasswordForm";

const ForgotPasswordPage = () => {
    return (
        <div className="flex min-h-screen w-full items-center justify-center">
            <Card className="w-full max-w-md p-8">
                <CardHeader>
                    <CardTitle className="text-2xl font-semibold">Forgot Password</CardTitle>
                </CardHeader>
                <CardContent>
                    <ForgotPasswordForm />
                </CardContent>
            </Card>
        </div>
    );
};

export default ForgotPasswordPage;