import React, {useState} from 'react';
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import RegisterForm from "@/components/forms/RegisterForm";

const CreateCustomerDialog = ({ onSuccess }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleSuccess = () => {
        onSuccess();  // Trigger data reload after registration is successful
        setIsOpen(false); // Close the dialog after successful registration
    };


    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
                <RegisterForm onSuccess={handleSuccess} />
            </DialogContent>
        </Dialog>
    );
};

export default CreateCustomerDialog;