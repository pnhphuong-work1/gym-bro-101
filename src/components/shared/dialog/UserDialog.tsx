import React, {useState} from 'react';
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import UserForm from "@/components/forms/UserForm";

interface UserDialogProps {
    editable: boolean;
    id: string;
    isCustomer: boolean;
    onSuccess?: () => void;
}

const UserDialog = ({editable, id, isCustomer, onSuccess} : UserDialogProps) => {

    const [open, setOpen] = useState(false);

    const handleSuccess =  () => {
        if (onSuccess) {
            onSuccess();
        }
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    className={`${editable ? "bg-blue-400" : "bg-green-300"} hover:${editable ? "bg-blue-500" : "bg-green-100"} text-white`}
                >
                    {editable ? "Edit" : "View"}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{editable ? "Edit User" : "User"}</DialogTitle>
                </DialogHeader>
                <UserForm editable={editable} id={id} isCustomer={isCustomer} onSuccess={handleSuccess} />
            </DialogContent>
        </Dialog>
    );
};

export default UserDialog;