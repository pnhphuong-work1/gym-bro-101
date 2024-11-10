import React, {useState} from 'react';
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog";
import {deleteSubscription} from "@/lib/actions/subscription.action";
import {isErrorResponseValue} from "@/lib/utils";
import NotificationDialog from "@/components/shared/dialog/NotificationDialog";
import {Button} from "@/components/ui/button";

interface DeleteSubscriptionDialogProps {
    subscriptionId: string;
    onSuccess: () => void;
}
const DeleteSubscriptionDialog = ({subscriptionId, onSuccess}: DeleteSubscriptionDialogProps) => {
    const [open, setOpen] = useState(false);
    const [notificationOpen, setNotificationOpen] = useState(false);
    const [message, setMessage] = useState("");

    const handleDelete = async () => {
         const result = await deleteSubscription(subscriptionId);
        if (!isErrorResponseValue(result)) {
            setMessage("Customer deleted successfully.");
            onSuccess(); // Reload or refresh data
        } else {
            setMessage("Failed to delete customer.");
        }
        setOpen(false)
        setNotificationOpen(true)
    }

    return (
        <div>
            <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Confirm Delete</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete this subscription? This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            <NotificationDialog open={notificationOpen}
                                onClose={() => setNotificationOpen(false)} message={message} />
            <Button className="bg-red-400 text-white px-2 py-1 rounded" onClick={() => setOpen(true)}>
                Delete
            </Button>
        </div>
    );
};

export default DeleteSubscriptionDialog;