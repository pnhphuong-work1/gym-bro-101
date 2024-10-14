'use client'
import React, {useEffect, useState} from 'react';
import {useUserSubscriptionContext} from "@/context/SubscriptionContext";
import {getSubscriptionById} from "@/lib/actions/subscription.action";
import Container from "@/components/ui/container";
import Header from "@/components/shared/Header";
import HomeNav from "@/components/shared/navbar/HomeNav";
import Cart from "@/components/ui/cart";
import {Button} from "@/components/ui/button";

const Page = () => {
    const { subscriptionId } = useUserSubscriptionContext();
    const [isSticky, setIsSticky] = useState(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [price, setPrice] = useState<number>(0);
    const [name, setName] = useState('');
    const [group, setGroup] = useState('');
    const [totalWorkoutTime, setTotalWorkoutTime] = useState('');
    useEffect(() => {
        if (!subscriptionId) {
            return;
        }
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
    }, [subscriptionId]);

    const handleBuy = (id: string) => {
        console.log(`Buying subscription with ID: ${id}`);
        // Implement your buy logic here, such as navigating to a payment page or confirming the purchase
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="flex flex-col min-h-screen">
            <div className="h-lvh">
                <Header/>
                <HomeNav isSticky={isSticky} status='null'/>
                <h1 className='text-7xl mt-2 flex justify-center text-red-500 pb-5' style={{fontFamily: 'Monda, sans-serif'}}>Subscription</h1>
                    <Cart
                        subscriptions={[{
                            id: subscriptionId, // Use the subscription ID as the key
                            name,
                            totalWorkoutTime,
                            group,
                            price,
                        }]}
                       onBuy={handleBuy}
                    />
                <Container className='justify-end flex'>
                    <Button className='bg-red-500 text-white mt-8 text-4xl py-8'>
                        BUY
                    </Button>
                </Container>
            </div>
        </div>
    );
};

export default Page;
