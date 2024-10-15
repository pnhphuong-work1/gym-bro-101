import React from 'react';
import Logo from "@/components/shared/Logo";
import FacebookLogo from "@/public/asset/fb_logo.png";
import InstagramLogo from "@/public/asset/instagram_icon.png";
import TwitterLogo from "@/public/asset/twitter_icon.png";
import Image from "next/image";

const Footer = () => {
    return (
        <div className='bg-cyan-950 w-full flex justify-between items-center h-full py-8'>
            <div className='flex flex-col justify-center items-center'>
                <Logo/>
                <div className='flex ml-20 mt-3 justify-between '>
                    <Image width='40' height='40' className='bg-white' src={FacebookLogo} alt='logo'></Image>
                    <Image width='40' height='40' className='bg-white ml-1' src={InstagramLogo} alt='logo'></Image>
                    <Image width='40' height='40' className='bg-white ml-1' src={TwitterLogo} alt='logo'></Image>
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