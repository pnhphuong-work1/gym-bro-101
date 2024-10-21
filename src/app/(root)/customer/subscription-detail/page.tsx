'use client';
import React, { useEffect, useState } from 'react';
import { useUserSubscriptionContext } from "@/context/SubscriptionContext";
import Container from "@/components/ui/container";
import Header from "@/components/shared/Header";
import HomeNav from "@/components/shared/navbar/HomeNav";
import Cart from "@/components/ui/cart";
import { Button } from "@/components/ui/button";
import { useGlobalContext } from "@/context/GlobalContext"; // Assuming userId comes from GlobalContext
import { useRouter, useSearchParams } from 'next/navigation';
import Modal from "@/components/ui/modal";
import { createPayment, createPaymentReturn } from "@/lib/actions/payment.action";
import { isErrorResponseValue } from "@/lib/utils";
import { getSubscriptionById } from "@/lib/actions/subscription.action";

const Page = () => {
    const { subscriptionId, setSubscriptionId } = useUserSubscriptionContext();
    const { userId } = useGlobalContext();
    const router = useRouter();
    const searchParams = useSearchParams(); // To get query parameters
    const [loading, setLoading] = useState<boolean>(false);
    const [price, setPrice] = useState<number>(0);
    const [name, setName] = useState('');
    const [group, setGroup] = useState('');
    const [totalWorkoutTime, setTotalWorkoutTime] = useState('');
    const [buyLoading, setBuyLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false); // Modal open state
    const [modalMessage, setModalMessage] = useState(''); // Modal message
    console.log(userId, 'tai sao')
    console.log(subscriptionId, 'fck')
    // Fetch subscription details on page load
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
    }, []);

    // Handle payment return on component mount
    useEffect(() => {
        const subscriptionIdFromParams = searchParams.get('subscriptionId');
        const code = searchParams.get('code');
        const id = searchParams.get('id');
        const cancel = searchParams.get('cancel') === 'true';
        const status = searchParams.get('status');
        const orderCode = Number(searchParams.get('orderCode'));

        if (subscriptionIdFromParams && code && id && status && !isNaN(orderCode)) {
            // Correctly pass subscriptionId to handlePaymentReturn
            handlePaymentReturn({ code, id, cancel, status, orderCode, subscriptionId: subscriptionIdFromParams });
        }
    }, [searchParams]);

    // Handle Buy Button Click
    const handleBuy = async () => {
        setBuyLoading(true);
        const paymentResponse = await createPayment(userId, subscriptionId);

        if (!isErrorResponseValue(paymentResponse)) {
            if (paymentResponse.isSuccess) {
                window.location.href = paymentResponse.value.checkoutUrl;
            } else {
                console.error("Payment not successful:", paymentResponse);
                alert('Failed to create payment. Please try again later.');
            }
        } else {
            console.error("Error response:", paymentResponse);
            alert('Failed to create payment. Please try again later.');
        }
        setBuyLoading(false);
    };

    // Handle payment return from the payment gateway
    const handlePaymentReturn = async ({ code, id, cancel, status, orderCode, subscriptionId }: any) => {
        console.log(subscriptionId, '345')
        setLoading(true);
        const paymentReturnResponse = await createPaymentReturn({ code, id, cancel, status, orderCode, subscriptionId });

        if (!isErrorResponseValue(paymentReturnResponse)) {
            if (paymentReturnResponse.isSuccess) {
                setModalMessage('Payment successful! Redirecting to membership...');
                setIsModalOpen(true);
                setTimeout(() => {
                    setIsModalOpen(false);
                    router.push('/customer/memberships');
                }, 3000); // Show modal for 3 seconds, then redirect
            } else {
                console.error("Payment return failed:", paymentReturnResponse);
            }
        } else {
            console.error("Error in payment return:", paymentReturnResponse);
            alert('Payment return failed. Please contact support.');
        }
        setLoading(false);
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

            {/* Modal for showing success message */}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">{modalMessage}</h2>
                    <p>Your payment was successful!</p>
                    <button
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                        onClick={() => {
                            setIsModalOpen(false);
                            router.push('/customer/membership');
                        }}
                    >
                        OK
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default Page;
