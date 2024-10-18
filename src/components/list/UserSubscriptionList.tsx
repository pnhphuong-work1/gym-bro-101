import React, { useEffect, useState } from 'react';
import { getUserSubscriptionByUserId } from "@/lib/actions/userSubscription.action";
import { useGlobalContext } from "@/context/GlobalContext";
import { UserSubscriptionResponseValue } from "@/types";
import { isErrorResponseValue } from "@/lib/utils";

const UserSubscriptionList = () => {
    const [userSubscription, setUserSubscription] = useState<UserSubscriptionResponseValue[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const { userId } = useGlobalContext();

    useEffect(() => {
        console.log("userId:", userId);
        setLoading(true);
        setError(''); // Reset error state before fetching
        getUserSubscriptionByUserId(userId)
            .then((response) => {
                if (!isErrorResponseValue(response)) {
                    // Ensure response.value is an array
                    setUserSubscription(Array.isArray(response.value) ? response.value : []);
                } else {
                    setError(response.errors[0]?.message || "An error occurred");
                }
            })
            .catch((error: any) => {
                setError(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [userId]);

    return (
        <div className='w-full'>
            {loading ? ( // Show loading state while fetching data
                <div className="text-center mb-4">
                    <p>Loading...</p>
                </div>
            ) : error ? ( // Conditionally render error message if there is an error
                <div className="text-red-500 text-center mb-4">
                    <p>{error}</p>
                </div>
            ) : (
                <div className='flex w-full justify-center items-center mt-5'>
                    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-16 w-[70%]">
                        {userSubscription.length > 0 ? ( // Check if userSubscription has items
                            userSubscription.map((subscription) => (
                                <div key={subscription.id} className="border p-4 rounded shadow-lg">
                                    <h3 className="text-xl font-semibold">{subscription.name}</h3>
                                    <p><strong>Price:</strong> ${subscription.paymentPrice}</p>
                                    <p><strong>End Date:</strong> {new Date(subscription.subscriptionEndDate).toLocaleDateString()}</p>
                                    <p><strong>Status:</strong> {subscription.group}</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-center">No subscriptions found.</p> // Message if no subscriptions exist
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserSubscriptionList;
