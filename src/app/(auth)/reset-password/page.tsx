import React from 'react';
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import RenewPasswordForm from "@/components/forms/RenewPasswordForm";

const ResetPasswordPage = () => {
    return (
        <div className="flex min-h-screen w-full items-center justify-center">
            <Card className="w-full max-w-md p-8">
                <CardHeader>
                    <CardTitle className="text-2xl font-semibold">Reset Password</CardTitle>
                </CardHeader>
                <CardContent>
                    <RenewPasswordForm />
                </CardContent>
            </Card>
        </div>
    );
};

export default ResetPasswordPage;