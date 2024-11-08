import React, { useEffect, useState } from 'react';
import { getUserSubscriptionByUserId } from "@/lib/actions/userSubscription.action";
import { useGlobalContext } from "@/context/GlobalContext";
import { UserSubscriptionResponseValue } from "@/types";
import { isErrorResponseValue } from "@/lib/utils";
import QRCodeDialog from '@/components/canvas/qr-code'; // Import the QR code dialog component

const UserSubscriptionList = () => {
    const [userSubscription, setUserSubscription] = useState<UserSubscriptionResponseValue[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const { userId } = useGlobalContext();
    const [isDialogOpen, setDialogOpen] = useState<boolean>(false);
    const [selectedSubscription, setSelectedSubscription] = useState<UserSubscriptionResponseValue | null>(null); // State to hold selected subscription

    useEffect(() => {
        setLoading(true);
        setError(''); // Reset error state before fetching
        getUserSubscriptionByUserId(userId)
            .then((response) => {
                if (!isErrorResponseValue(response)) {
                    setUserSubscription(Array.isArray(response.value) ? response.value : []);
                } else {
                    setError('You have not bought any subscription yet!');
                }
            })
            .catch((error: any) => {
                setError(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [userId]);

    const handleSubscriptionClick = (subscription: React.SetStateAction<UserSubscriptionResponseValue | null>) => {
        setSelectedSubscription(subscription);
        setDialogOpen(true); // Open dialog
    };

    return (
        <div className='w-full'>
            {loading ? (
                <div className="text-center mb-4">
                    <p>Loading...</p>
                </div>
            ) : error ? (
                <div className="text-red-500 text-center mb-4">
                    <p>{error}</p>
                </div>
            ) : (
                <div className='flex w-full justify-center items-center mt-5'>
                    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-16 w-[70%]">
                        {userSubscription.length > 0 ? (
                            userSubscription.map((subscription) => (
                                <div
                                    key={subscription.id}
                                    className="border p-4 rounded shadow-lg bg-white cursor-pointer"
                                    onClick={() => handleSubscriptionClick(subscription)}
                                >
                                    <h3 className="text-xl font-semibold">{subscription.name}</h3>
                                    <p><strong>Price:</strong> ${subscription.paymentPrice}</p>
                                    <p><strong>End Date:</strong> {new Date(subscription.subscriptionEndDate).toLocaleDateString()}</p>
                                    <p><strong>Status:</strong> {subscription.group}</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-center">No subscriptions found.</p>
                        )}
                    </div>
                </div>
            )}

            {/* QR Code Dialog */}
            <QRCodeDialog
                isOpen={isDialogOpen}
                onClose={() => setDialogOpen(false)}
                subscription={selectedSubscription}
            />
        </div>
    );
};

export default UserSubscriptionList;
