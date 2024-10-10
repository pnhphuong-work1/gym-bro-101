import React from 'react';
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import VerifyEmailForm from "@/components/forms/VerifyEmailForm";

const VerifyEmailPage = () => {
    return (
        <div className="flex min-h-screen w-full items-center justify-center">
            <Card className="w-full max-w-md p-8">
                <CardHeader>
                    <CardTitle className="text-2xl font-semibold">Verify Email</CardTitle>
                </CardHeader>
                <CardContent>
                    <VerifyEmailForm />
                </CardContent>
            </Card>
        </div>
    );
};

export default VerifyEmailPage;