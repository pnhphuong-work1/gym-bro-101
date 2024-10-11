import React from 'react';
import {Button} from "@/components/ui/button";

const Subscription = () => {
    return (
        <div className='bg-red-500 w-full h-full flex flex-col items-center justify-center'>
            <h1 className='text-7xl mt-2 text-white'>Choose your plan</h1>
            <div className="w-[10%] h-0.5 bg-white mt-4"></div>
            <h2 className='mt-5 text-xl text-white'>You can choose any membership plan that you like, but we recommend trying our workouts for yourself before buying.
            </h2>
            <div className="flex justify-center items-center w-[70%] h-[60%] mt-5">
                {/* First square */}
                <div className="w-[30%] h-full bg-red-500 flex flex-col items-center justify-center">
                    <p className="text-center text-4xl font-bold">T2, T4, T6</p>
                    <div className="w-[80%] h-0.5 bg-white mt-4"></div>
                    <div className='flex mt-5'>
                        <h2 className='text-4xl'>40$</h2>
                        <p className='text-white text-xl'>/month</p>
                    </div>
                    <Button className='bg-white text-black mt-8 text-4xl py-8'>
                        BUY NOW
                    </Button>
                </div>

                {/* Second square */}
                <div
                    className="w-[40%] h-full bg-red-600 border-amber-100 border flex flex-col items-center justify-center">
                    <p className="text-center text-4xl font-bold">T2, T4, T6</p>
                    <div className="w-[80%] h-0.5 bg-white mt-4"></div>
                    <div className='flex mt-5'>
                        <h2 className='text-5xl text-[#E0E84F]'>59$</h2>
                        <p className='text-white text-xl'>/month</p>
                    </div>
                    <Button className='bg-white text-red-600 mt-8 text-4xl py-8'>
                        BUY NOW
                    </Button>
                </div>

                {/* Third square */}
                <div className="w-[30%] h-full bg-red-500 flex flex-col items-center justify-center">
                    <p className="text-center text-4xl font-bold">T2, T4, T6</p>
                    <div className="w-[80%] h-0.5 bg-white mt-4"></div>
                    <div className='flex mt-5'>
                        <h2 className='text-4xl'>40$</h2>
                        <p className='text-white text-xl'>/month</p>
                    </div>
                    <Button className='bg-white text-black mt-8 text-4xl py-8'>
                        BUY NOW
                    </Button>
                </div>
            </div>

        </div>
    );
};

export default Subscription;