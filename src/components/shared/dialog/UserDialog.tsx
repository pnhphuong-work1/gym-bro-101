import React from 'react';
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import UserForm from "@/components/forms/UserForm";

interface UserDialogProps {
    editable: boolean;
    id: string;
}

const UserDialog = ({editable, id} : UserDialogProps) => {
    return (
        <Dialog>
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
                <UserForm editable={editable} id={id} />
            </DialogContent>
        </Dialog>
    );
};

export default UserDialog;