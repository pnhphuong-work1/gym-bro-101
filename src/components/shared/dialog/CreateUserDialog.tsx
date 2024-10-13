import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {Button} from "@/components/ui/button";
import CreateManagerForm from "@/components/forms/CreateManagerForm";
const CreateUserDialog = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    className="bg-red-600 hover:bg-red-400 text-white"
                >
                    Create User
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create User</DialogTitle>
                </DialogHeader>
                <CreateManagerForm />
            </DialogContent>
        </Dialog>
    );
};

export default CreateUserDialog;