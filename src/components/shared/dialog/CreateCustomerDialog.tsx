import React from 'react';
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import RegisterForm from "@/components/forms/RegisterForm";

const CreateCustomerDialog = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    className="bg-red-600 hover:bg-red-400 text-white"
                >
                    Create Customer
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create Customer</DialogTitle>
                </DialogHeader>
                <RegisterForm />
            </DialogContent>
        </Dialog>
    );
};

export default CreateCustomerDialog;