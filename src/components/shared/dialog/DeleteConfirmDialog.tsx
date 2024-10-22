import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import NotificationDialog from "@/components/shared/dialog/NotificationDialog";
import { deleteUser } from "@/lib/actions/user.action";
import {isErrorResponseValue} from "@/lib/utils";
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog";

interface DeleteCustomerDialogProps {
    userId: string;
    onSuccess: () => void;
}

const DeleteConfirmDialog: React.FC<DeleteCustomerDialogProps> = ({ userId, onSuccess }) => {
    const [open, setOpen] = useState(false);
    const [notificationOpen, setNotificationOpen] = useState(false);
    const [message, setMessage] = useState("");

    const handleDelete = async () => {
        const result = await deleteUser(userId);
        if (!isErrorResponseValue(result)) {
            setMessage("Customer deleted successfully.");
            onSuccess(); // Reload or refresh data
        } else {
            setMessage("Failed to delete customer.");
        }
        setOpen(false); // Close the delete dialog
        setNotificationOpen(true); // Open the notification dialog
    };

    return (
        <>
            <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Confirm Delete</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete this customer? This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <NotificationDialog open={notificationOpen} onClose={() => setNotificationOpen(false)} message={message} />

            <Button className="bg-red-400 text-white px-2 py-1 rounded" onClick={() => setOpen(true)}>
                Delete
            </Button>
        </>
    );
};

export default DeleteConfirmDialog;
