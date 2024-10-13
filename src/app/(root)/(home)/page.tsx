'use client';
import React, {useRef} from 'react';
import {useGlobalContext} from "@/context/GlobalContext";

import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import HomePageImage from "@/public/asset/home-page.png"
import { Button } from '@/components/ui/button';
import Logo from "@/components/shared/Logo";
import Welcome from "@/app/(root)/(home)/welcome";
import Subscription from "@/app/(root)/(home)/subscription";

const HomePage = () => {
    const welcomeRef = useRef<HTMLDivElement>(null);;
    const {fullName} = useGlobalContext();
    console.log(fullName)
    const scrollToWelcome = () => {
        welcomeRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
    return (
        <div className="flex flex-col min-h-screen">
            <div className="h-lvh">
                <Header/>
                <div
                    className="relative bg-cover bg-center flex flex-col items-center justify-center flex-grow"
                    style={{
                        backgroundImage: `url(${HomePageImage.src})`,
                        height: '90%',
                    }}
                >
                    <h1 className="text-white text-8xl font-bold italic">NO PAIN NO GAIN</h1>
                    <h2 className="text-white text-1xl mt-5">
                        Having a perfect body requires a lot of training. Nice-looking body and powerful organism are
                        interconnected – and we can help you with both.
                    </h2>
                    <Button className="text-white font-bold text-3xl bg-red-600 py-7 px-6 mt-10" onClick={scrollToWelcome}>
                        GET STARTED
                    </Button>
                    <div className="absolute top-5 left-4">
                        <Logo/>
                    </div>
                </div>
            </div>
            <div>
                <div ref={welcomeRef} className='h-[60%] bg-white'>
                    <Welcome/>
                </div>
                <div className='h-[50%]'>
                    <Subscription />
                </div> 
            </div>
            <Footer/>
        </div>
    )
        ;
};

export default HomePage;