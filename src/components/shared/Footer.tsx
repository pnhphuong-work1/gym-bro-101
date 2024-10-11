import React from 'react';
import Logo from "@/components/shared/Logo";
import FacebookLogo from "@/public/asset/fb_logo.png";
import Image from "next/image";
import {Button} from "@/components/ui/button";

const Footer = () => {
    return (
        <div className='bg-black w-full flex justify-between items-center h-full py-10'>
            <div className='flex flex-col justify-center items-center'>
            <Logo />
                <div className='flex ml-20 mt-3'>
                    <Button>
                        <Image src={FacebookLogo} alt='logo'></Image>
                    </Button>
                    <Button>
                        <Image src={FacebookLogo} alt='logo'></Image>
                    </Button>
                    <Button>
                        <Image src={FacebookLogo} alt='logo'></Image>
                    </Button>
                </div>
            </div>
            <div className='flex flex-col justify-center items-center'>
                <div className='text-white font-bold text-4xl mr-20'>CONTACT</div>
                <div className='text-white mr-20 mt-3 text-2xl'>vk2p@gmail.com</div>
            </div>
        </div>
    );
};

export default Footer;