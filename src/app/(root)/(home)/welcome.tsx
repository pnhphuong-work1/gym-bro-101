import React from 'react';
import Image from "next/image";
import GymIcon from "@/public/asset/gym_icon.png"
import LikeIcon from "@/public/asset/like_icon.png"

const Welcome = () => {
    return (
        <div className='w-full bg-white flex flex-col items-center justify-center pb-10'>
            <h1 className='text-7xl mt-3' style={{fontFamily: 'Monda, sans-serif'}}>Welcome</h1>
            <div className="w-[10%] h-0.5 bg-red-600 mt-3"></div>
            <h2 className='mt-5 text-xl w-[60%]'>Welcome to the website VK2P Gym! We hope that you will appreciate our services and opportunities we offer our loyal and potential customers. Here are some of them:</h2>
            <div className="flex justify-between items-center w-[90%] h-[50%] mt-14">
                <div className="relative w-[30%] border-2 border-black flex flex-col items-center justify-center">
                    <div
                        className="absolute bg-black top-[-60px] left-1/2 transform -translate-x-1/2 w-28 h-28 rounded-full border-2 border-black flex items-center justify-center">
                        <svg width="60" height="60" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M14 14C12.1667 14 10.5972 13.3472 9.29166 12.0417C7.98611 10.7361 7.33333 9.16666 7.33333 7.33332C7.33333 5.49999 7.98611 3.93055 9.29166 2.62499C10.5972 1.31943 12.1667 0.666656 14 0.666656C15.8333 0.666656 17.4028 1.31943 18.7083 2.62499C20.0139 3.93055 20.6667 5.49999 20.6667 7.33332C20.6667 9.16666 20.0139 10.7361 18.7083 12.0417C17.4028 13.3472 15.8333 14 14 14ZM0.666664 27.3333V22.6667C0.666664 21.7222 0.90972 20.8542 1.39583 20.0625C1.88194 19.2708 2.52778 18.6667 3.33333 18.25C5.05555 17.3889 6.80555 16.743 8.58333 16.3125C10.3611 15.8819 12.1667 15.6667 14 15.6667C15.8333 15.6667 17.6389 15.8819 19.4167 16.3125C21.1944 16.743 22.9444 17.3889 24.6667 18.25C25.4722 18.6667 26.1181 19.2708 26.6042 20.0625C27.0903 20.8542 27.3333 21.7222 27.3333 22.6667V27.3333H0.666664ZM4 24H24V22.6667C24 22.3611 23.9236 22.0833 23.7708 21.8333C23.6181 21.5833 23.4167 21.3889 23.1667 21.25C21.6667 20.5 20.1528 19.9375 18.625 19.5625C17.0972 19.1875 15.5556 19 14 19C12.4444 19 10.9028 19.1875 9.375 19.5625C7.84722 19.9375 6.33333 20.5 4.83333 21.25C4.58333 21.3889 4.38194 21.5833 4.22916 21.8333C4.07639 22.0833 4 22.3611 4 22.6667V24ZM14 10.6667C14.9167 10.6667 15.7014 10.3403 16.3542 9.68749C17.0069 9.03471 17.3333 8.24999 17.3333 7.33332C17.3333 6.41666 17.0069 5.63193 16.3542 4.97916C15.7014 4.32638 14.9167 3.99999 14 3.99999C13.0833 3.99999 12.2986 4.32638 11.6458 4.97916C10.9931 5.63193 10.6667 6.41666 10.6667 7.33332C10.6667 8.24999 10.9931 9.03471 11.6458 9.68749C12.2986 10.3403 13.0833 10.6667 14 10.6667Z"
                                fill="#FEF7FF"/>
                        </svg>


                    </div>

                    <p className="text-center text-xl font-bold text-red-500 mt-14">Qualified Coaches</p>
                    <p className="text-center text-xl my-3 mx-3">Our coaches have years of experience in various types
                        of fitness and sports.
                    </p>
                </div>

                <div className="relative w-[30%] border-2 border-black flex flex-col items-center justify-center">
                    <div
                        className="absolute bg-white top-[-60px] left-1/2 transform -translate-x-1/2 w-28 h-28 rounded-full border-2 border-black flex items-center justify-center">
                        <Image width='60' height='60' src={LikeIcon} alt='icon'></Image>
                    </div>

                    <p className="text-center text-xl font-bold text-red-500 mt-14">Individual Approach</p>
                    <p className="text-center text-xl my-3 mx-3">Every client of Intense has a personalized program of
                        training and nutrition.
                    </p>
                </div>

                <div className="relative w-[30%] border-2 border-black flex flex-col items-center justify-center">
                    <div
                        className="absolute bg-white top-[-60px] left-1/2 transform -translate-x-1/2 w-28 h-28 rounded-full border-2 border-black flex items-center justify-center">
                        <Image width='60' height='60' src={GymIcon} alt='icon'></Image>
                    </div>

                    <p className="text-center text-xl font-bold text-red-500 mt-14">Modern Fitness Equipment</p>
                    <p className="text-center text-xl my-3 mx-3">Leading fitness equipment suppliers
                        to give you the superior results
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Welcome;