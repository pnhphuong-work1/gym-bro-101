'use client';
import React, { useEffect, useState } from 'react';
import { useUserSubscriptionContext } from "@/context/SubscriptionContext";
import Container from "@/components/ui/container";
import Header from "@/components/shared/Header";
import HomeNav from "@/components/shared/navbar/HomeNav";
import Cart from "@/components/ui/cart";
import { Button } from "@/components/ui/button";
import { useGlobalContext } from "@/context/GlobalContext"; // Assuming userId comes from GlobalContext
import { useRouter } from 'next/navigation';
import Modal from "@/components/ui/modal";
import {createPayment, createPaymentReturn} from "@/lib/actions/payment.action";
import {isErrorResponseValue} from "@/lib/utils";
import {getSubscriptionById} from "@/lib/actions/subscription.action";

const Page = () => {
    const { subscriptionId } = useUserSubscriptionContext();
    const { userId } = useGlobalContext();
    console.log(userId, '123')
    const router = useRouter(); // To handle redirects
    const [loading, setLoading] = useState<boolean>(false);
    const [price, setPrice] = useState<number>(0);
    const [name, setName] = useState('');
    const [group, setGroup] = useState('');
    const [totalWorkoutTime, setTotalWorkoutTime] = useState('');
    const [buyLoading, setBuyLoading] = useState(false); // For buy button loading state
    const [showQrModal, setShowQrModal] = useState(false); // Control QR code modal
    const [qrCode, setQrCode] = useState(''); // Store QR code

    useEffect(() => {
        setLoading(true);
        getSubscriptionById(subscriptionId)
            .then((response) => {
                setName(response.value.name);
                setPrice(response.value.price);
                setTotalWorkoutTime(response.value.totalWorkoutTime);
                setGroup(response.value.group);
            })
            .catch((error) => {
                console.error("Error fetching subscription:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [subscriptionId, router]);
    // Handle Buy Button Click
    const handleBuy = async () => {
        setBuyLoading(true); // Start loading state
        const paymentResponse = await createPayment(userId, subscriptionId);
        console.log("Payment Response:", paymentResponse);
        if (!isErrorResponseValue(paymentResponse)) {
            if (paymentResponse.isSuccess) {
                window.location.href = paymentResponse.value.checkoutUrl; // Redirect to the payment checkout URL
            } else {
                console.error("Payment not successful:", paymentResponse); // Log detailed error
                alert('Failed to create payment. Please try again later.');
            }
        } else {
            console.error("Error response:", paymentResponse); // Log detailed error response
            alert('Failed to create payment. Please try again later.');
        }
        setBuyLoading(false); // End loading state
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="flex flex-col min-h-screen">
            <div className="h-lvh">
                <Header />
                <HomeNav isSticky={false} status='null' />
                <h1 className='text-7xl mt-2 flex justify-center text-red-500 pb-5' style={{ fontFamily: 'Monda, sans-serif' }}>Subscription</h1>
                <Cart
                    subscriptions={[{
                        id: subscriptionId,
                        name,
                        totalWorkoutTime,
                        group,
                        price,
                    }]}
                />
                <Container className='justify-end flex'>
                    <Button className='bg-red-500 text-white mt-8 text-4xl py-8' onClick={handleBuy} disabled={buyLoading}>
                        {buyLoading ? 'Processing...' : 'BUY'}
                    </Button>
                </Container>
            </div>

            {/* Modal to display QR code */}
            {showQrModal && (
                <Modal isOpen={showQrModal} onClose={() => setShowQrModal(false)}>
                    <div className="flex flex-col items-center">
                        <h2 className="text-3xl font-bold mb-4">Scan QR Code to Pay</h2>
                        {qrCode ? (
                            <img src={qrCode} alt="PayOS QR Code" className="w-64 h-64" />
                        ) : (
                            <p>Loading QR code...</p>
                        )}
                        <Button className="mt-4 bg-red-500 text-white" onClick={() => setShowQrModal(false)}>
                            Close
                        </Button>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default Page;
