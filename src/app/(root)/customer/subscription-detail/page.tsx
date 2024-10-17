'use client';
import React, { useEffect, useState } from 'react';
import { useUserSubscriptionContext } from "@/context/SubscriptionContext";
import { getSubscriptionById } from "@/lib/actions/subscription.action";
import Container from "@/components/ui/container";
import Header from "@/components/shared/Header";
import HomeNav from "@/components/shared/navbar/HomeNav";
import Cart from "@/components/ui/cart";
import { Button } from "@/components/ui/button";
import axios from 'axios'; // For API requests
import { useGlobalContext } from "@/context/GlobalContext"; // Assuming userId comes from GlobalContext
import { useRouter } from 'next/navigation';
import Modal from "@/components/ui/modal"; // Import your modal component

const Page = () => {
    const { subscriptionId } = useUserSubscriptionContext();
    const { userId } = useGlobalContext(); // Assuming userId comes from GlobalContext
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

    async function handleBuy() {
        setBuyLoading(true);
        try {
            const response = await axios.post('/api/v2024-09-29/payments', {
                userId: userId, // The current user's ID
                subscriptionId: subscriptionId // The selected subscription's ID
            });

            // Extract the checkoutUrl from the response
            const { checkoutUrl } = response.data;

            if (checkoutUrl) {
                // Redirect to PayOS payment page
                window.location.href = checkoutUrl;
            } else {
                console.error("Checkout URL is missing in the response.");
            }
        } catch (error) {
            console.error("Error processing payment:", error);
        } finally {
            setBuyLoading(false);
        }
    }

    // Handle Payment return (Success or Cancel)
    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const orderCode = queryParams.get('orderCode');
        const subscriptionId = queryParams.get('subscriptionId');
        const status = queryParams.get('status'); // "PAID" or "CANCEL"

        if (orderCode && subscriptionId && status) {
            axios.post(`https://vk2pgym.azurewebsites.net/api/v2024-09-29/payments/payment-return`, {
                orderCode,
                subscriptionId,
                status,
                cancel: status === 'CANCEL',
            }).then((response) => {
                if (response.data.paymentStatus === 'Success') {
                    alert('Payment successful!');
                    router.push('/confirmation'); // Navigate to a confirmation page
                } else {
                    alert('Payment failed or canceled.');
                }
            }).catch((error) => {
                console.error('Error handling payment return:', error);
            });
        }
    }, [router]);

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
