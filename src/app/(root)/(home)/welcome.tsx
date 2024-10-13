import React from 'react';
import Image from "next/image";
import GymIcon from "@/public/asset/gym_icon.png"
const Welcome = () => {
    return (
        <div className='w-full bg-white flex flex-col items-center justify-center pb-10'>
            <h1 className='text-7xl mt-3' style={{fontFamily: 'Monda, sans-serif'}}>Welcome</h1>
            <div className="w-[10%] h-0.5 bg-red-600 mt-3"></div>
            <h2 className='mt-5 text-xl w-[60%]'>Welcome to the website VK2P Gym! We hope that you will appreciate our services and opportunities we offer our loyal and potential customers. Here are some of them:</h2>
            <div className="flex justify-between items-center w-[90%] h-[50%] mt-10">
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
                        className="absolute bg-black top-[-60px] left-1/2 transform -translate-x-1/2 w-28 h-28 rounded-full border-2 border-black flex items-center justify-center">
                        <svg width="60" height="60" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M10.2083 16.0417L16.0417 2.91666C17.202 2.91666 18.3148 3.37759 19.1353 4.19806C19.9557 5.01854 20.4167 6.13133 20.4167 7.29166V13.125H28.6708C29.0936 13.1202 29.5124 13.2074 29.8981 13.3805C30.2839 13.5536 30.6274 13.8086 30.9048 14.1276C31.1822 14.4467 31.387 14.8222 31.5049 15.2283C31.6228 15.6343 31.6509 16.0611 31.5875 16.4792L29.575 29.6042C29.4695 30.2996 29.1163 30.9336 28.5803 31.3892C28.0443 31.8447 27.3617 32.0913 26.6583 32.0833H10.2083M10.2083 16.0417V32.0833M10.2083 16.0417H5.83333C5.05978 16.0417 4.31792 16.3489 3.77094 16.8959C3.22395 17.4429 2.91666 18.1848 2.91666 18.9583V29.1667C2.91666 29.9402 3.22395 30.6821 3.77094 31.2291C4.31792 31.776 5.05978 32.0833 5.83333 32.0833H10.2083"
                                stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>

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
                    <p className="text-center text-xl my-3 mx-3">We cooperate with leading fitness equipment suppliers
                        to give you the superior results
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Welcome;