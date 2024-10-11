'use client';
import React from 'react';
import {useGlobalContext} from "@/context/GlobalContext";

import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import HomePageImage from "@/public/asset/home-page.png"
import Image from "next/image";

const HomePage = () => {
    const {fullName} = useGlobalContext();
    console.log(fullName)
    return (
        <div className='flex flex-col h-lvh'>
            <Header />
            <Image
                className='w-full h-[80%]'
                src={HomePageImage}
                alt='' />
            <Footer/>
        </div>
    );
};

export default HomePage;