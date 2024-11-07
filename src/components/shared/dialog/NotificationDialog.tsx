import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import React from "react";

interface NotificationDialogProps {
    open: boolean;
    onClose: () => void;
    message: string;
}

const NotificationDialog: React.FC<NotificationDialogProps> = ({ open, onClose, message }) => {
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Notification</DialogTitle>
                </DialogHeader>
                <div className="py-4">{message}</div>
                <DialogFooter>
                    <Button onClick={onClose}>OK</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default NotificationDialog;
