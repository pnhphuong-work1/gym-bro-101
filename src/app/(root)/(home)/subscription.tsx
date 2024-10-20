import React, {useEffect, useState} from 'react';
import {Button} from "@/components/ui/button";
import {SubscriptionResponseValue} from "@/types";
import {isErrorResponseValue} from "@/lib/utils";
import {getAllSubscriptions} from "@/lib/actions/subscription.action";
import {useRouter} from "next/navigation";
import {useUserSubscriptionContext} from "@/context/SubscriptionContext";

const Subscription = () => {

    const [subscriptions, setSubscriptions] = useState<SubscriptionResponseValue[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();
    const { setSubscriptionId } = useUserSubscriptionContext();
    useEffect(() => {
        setLoading(true);
        getAllSubscriptions()
            .then((response) => {
                if (!isErrorResponseValue(response)) {
                    setSubscriptions(response.value.items);
                }
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false); // Set loading to false after fetching data
            });
    }, []);

    if (loading) return <div>Loading...</div>;
    if (!subscriptions || subscriptions.length !== 3) return <div>Error: Expected 3 subscriptions.</div>;
    const [first, second, third] = subscriptions;

    const handleBuyNow = (subscriptionId: string) => {
        setSubscriptionId(subscriptionId);
        router.push(`/customer/subscription-detail`);
    };

    const formatPriceVND = (price: number) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(price);
    };


    return (
        <div className='bg-red-500 w-full h-full flex flex-col items-center justify-center pb-10'>
            <h1 className='text-7xl mt-2 text-white' style={{fontFamily: 'Monda, sans-serif'}}>Choose your plan</h1>
            <div className="w-[10%] h-0.5 bg-white mt-4"></div>
            <h2 className='mt-5 text-xl text-white'>
                You can choose any membership plan that you like, but we recommend trying our workouts for yourself
                before buying.
            </h2>
            <div className="flex justify-center items-center w-[80%] mt-5 gap-5">
                {/* First square */}
                <div className="w-[30%] h-full bg-red-500 flex flex-col items-center justify-center pb-5 mt-3">
                    <p className="text-center text-4xl font-bold mt-2">{third.name}</p>
                    <div className="w-[80%] h-0.5 bg-white mt-4"></div>
                    <div className='flex mt-5'>
                        <h2 className='text-4xl'>{formatPriceVND(third.price)}</h2>
                        <p className='text-white text-xl'>/month</p>
                    </div>
                    <div className='text-xl mt-3 w-full justify-center items-center flex flex-col'>
                        <p>{third.totalWorkoutTime}</p>
                        <p>{third.group}</p>
                    </div>
                    <Button
                        className='bg-white text-black mt-8 text-4xl py-8'
                        onClick={() => handleBuyNow(third.id)} // Pass the subscription id
                    >
                        BUY NOW
                    </Button>
                </div>

                {/* Second square */}
                <div
                    className="w-[40%] h-full bg-red-600 border-amber-100 border flex flex-col items-center justify-center pb-5 mt-3">
                    <p className="text-center text-4xl font-bold text-white mt-2">{first.name}</p>
                    <div className="w-[80%] h-0.5 bg-white mt-4"></div>
                    <div className='flex mt-5'>
                        <h2 className='text-5xl  text-[#E0E84F]'>{formatPriceVND(first.price)}</h2>
                        <p className='text-white text-xl'>/month</p>
                    </div>
                    <div className='text-xl mt-3 w-full justify-center items-center flex flex-col text-white'>
                        <p>{first.totalWorkoutTime}</p>
                        <p>{first.group}</p>
                    </div>
                    <Button
                        className='bg-white text-black mt-8 text-4xl py-8'
                        onClick={() => handleBuyNow(first.id)} // Pass the subscription id
                    >
                        BUY NOW
                    </Button>
                </div>

                {/* Third square */}
                <div className="w-[30%] h-full bg-red-500 flex flex-col items-center justify-center pb-5 mt-3">
                    <p className="text-center text-4xl font-bold mt-2">{second.name}</p>
                    <div className="w-[80%] h-0.5 bg-white mt-4"></div>
                    <div className='flex mt-5'>
                        <h2 className='text-4xl'>{formatPriceVND(second.price)}</h2>
                        <p className='text-white text-xl'>/month</p>
                    </div>
                    <div className='text-xl mt-3 w-full justify-center items-center flex flex-col'>
                        <p>{second.totalWorkoutTime}</p>
                        <p>{second.group}</p>
                    </div>
                    <Button
                        className='bg-white text-black mt-8 text-4xl py-8'
                        onClick={() => handleBuyNow(second.id)}
                    >
                        BUY NOW
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Subscription;