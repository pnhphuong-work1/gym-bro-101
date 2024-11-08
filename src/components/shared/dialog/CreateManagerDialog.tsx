import React, {useState} from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {Button} from "@/components/ui/button";
import CreateManagerForm from "@/components/forms/CreateManagerForm";

interface prop{
    onSuccess?: () => void;
}

const CreateManagerDialog = ({ onSuccess }: prop) => {

    const [isOpen, setIsOpen] = useState(false);

    const handleSuccess = () => {
        if (onSuccess) {
            onSuccess();
        }  // Trigger data reload after registration is successful
        setIsOpen(false); // Close the dialog after successful registration
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    className="bg-red-600 hover:bg-red-400 text-white"
                >
                    Create Manager
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create User</DialogTitle>
                </DialogHeader>
                <CreateManagerForm onSuccess={handleSuccess} />
            </DialogContent>
        </Dialog>
    );
};

export default CreateManagerDialog;