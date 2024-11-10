import React, {useState} from 'react';
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import UpdateSubscriptionForm from "@/components/forms/UpdateSubscriptionForm";
import {SubscriptionResponseValue} from "@/types";

interface SubscriptionDialogProps {
    subscription: SubscriptionResponseValue;
    onSuccess: () => void;
}
const SubscriptionDialog = ({subscription, onSuccess} : SubscriptionDialogProps ) => {
    const [open, setOpen] = useState(false);
    return (
        <Dialog
                open={open}
                onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    className="bg-blue-400 hover:bg-blue-500 text-white"
                >
                    Edit
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Subscription</DialogTitle>
                </DialogHeader>
                <UpdateSubscriptionForm subscription={subscription} onSuccess={onSuccess} />
            </DialogContent>
        </Dialog>
    );
};

export default SubscriptionDialog;