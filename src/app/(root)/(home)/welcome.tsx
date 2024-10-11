import React from 'react';

const Welcome = () => {
    return (
        <div className='w-full bg-white flex flex-col items-center justify-center'>
            <h1 className='text-7xl mt-4' style={{fontFamily: 'Monda, sans-serif'}}>Welcome</h1>
            <div className="w-[10%] h-0.5 bg-red-600 mt-4"></div>
            <h2 className='mt-5 text-xl'>Welcome to the website VK2P Gym! We hope that you will appreciate our services and opportunities we offer our loyal and potential customers. Here are some of them:</h2>
            <div className="flex justify-between items-center w-[90%] h-[50%] mt-20">
                <div className="relative w-[25%] border-2 border-black flex flex-col items-center justify-center">
                    <div
                        className="absolute bg-black top-[-60px] left-1/2 transform -translate-x-1/2 w-28 h-28 rounded-full border-2 border-black flex items-center justify-center">
                        <svg width="60" height="60" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M10.2083 16.0417L16.0417 2.91666C17.202 2.91666 18.3148 3.37759 19.1353 4.19806C19.9557 5.01854 20.4167 6.13133 20.4167 7.29166V13.125H28.6708C29.0936 13.1202 29.5124 13.2074 29.8981 13.3805C30.2839 13.5536 30.6274 13.8086 30.9048 14.1276C31.1822 14.4467 31.387 14.8222 31.5049 15.2283C31.6228 15.6343 31.6509 16.0611 31.5875 16.4792L29.575 29.6042C29.4695 30.2996 29.1163 30.9336 28.5803 31.3892C28.0443 31.8447 27.3617 32.0913 26.6583 32.0833H10.2083M10.2083 16.0417V32.0833M10.2083 16.0417H5.83333C5.05978 16.0417 4.31792 16.3489 3.77094 16.8959C3.22395 17.4429 2.91666 18.1848 2.91666 18.9583V29.1667C2.91666 29.9402 3.22395 30.6821 3.77094 31.2291C4.31792 31.776 5.05978 32.0833 5.83333 32.0833H10.2083"
                                stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>

                    </div>

                    <p className="text-center text-xl font-bold text-red-500 mt-14">Qualified Coaches</p>
                    <p className="text-center text-xl mt-3 mb-3">Our coaches have years of experience in various types of fitness and sports.
                    </p>
                </div>
                
                <div className="relative w-[25%] border-2 border-black flex flex-col items-center justify-center">
                    <div
                        className="absolute bg-black top-[-60px] left-1/2 transform -translate-x-1/2 w-28 h-28 rounded-full border-2 border-black flex items-center justify-center">
                        <svg width="60" height="60" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M10.2083 16.0417L16.0417 2.91666C17.202 2.91666 18.3148 3.37759 19.1353 4.19806C19.9557 5.01854 20.4167 6.13133 20.4167 7.29166V13.125H28.6708C29.0936 13.1202 29.5124 13.2074 29.8981 13.3805C30.2839 13.5536 30.6274 13.8086 30.9048 14.1276C31.1822 14.4467 31.387 14.8222 31.5049 15.2283C31.6228 15.6343 31.6509 16.0611 31.5875 16.4792L29.575 29.6042C29.4695 30.2996 29.1163 30.9336 28.5803 31.3892C28.0443 31.8447 27.3617 32.0913 26.6583 32.0833H10.2083M10.2083 16.0417V32.0833M10.2083 16.0417H5.83333C5.05978 16.0417 4.31792 16.3489 3.77094 16.8959C3.22395 17.4429 2.91666 18.1848 2.91666 18.9583V29.1667C2.91666 29.9402 3.22395 30.6821 3.77094 31.2291C4.31792 31.776 5.05978 32.0833 5.83333 32.0833H10.2083"
                                stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>

                    </div>

                    <p className="text-center text-xl font-bold text-red-500 mt-14">Individual Approach</p>
                    <p className="text-center text-xl mt-3 mb-3">Every client of Intense has a personalized program of
                        training and nutrition.
                    </p>
                </div>
                
                <div className="relative w-[25%] border-2 border-black flex flex-col items-center justify-center">
                    <div
                        className="absolute bg-black top-[-60px] left-1/2 transform -translate-x-1/2 w-28 h-28 rounded-full border-2 border-black flex items-center justify-center">
                        <svg width="60" height="60" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M10.2083 16.0417L16.0417 2.91666C17.202 2.91666 18.3148 3.37759 19.1353 4.19806C19.9557 5.01854 20.4167 6.13133 20.4167 7.29166V13.125H28.6708C29.0936 13.1202 29.5124 13.2074 29.8981 13.3805C30.2839 13.5536 30.6274 13.8086 30.9048 14.1276C31.1822 14.4467 31.387 14.8222 31.5049 15.2283C31.6228 15.6343 31.6509 16.0611 31.5875 16.4792L29.575 29.6042C29.4695 30.2996 29.1163 30.9336 28.5803 31.3892C28.0443 31.8447 27.3617 32.0913 26.6583 32.0833H10.2083M10.2083 16.0417V32.0833M10.2083 16.0417H5.83333C5.05978 16.0417 4.31792 16.3489 3.77094 16.8959C3.22395 17.4429 2.91666 18.1848 2.91666 18.9583V29.1667C2.91666 29.9402 3.22395 30.6821 3.77094 31.2291C4.31792 31.776 5.05978 32.0833 5.83333 32.0833H10.2083"
                                stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>

                    </div>

                    <p className="text-center text-xl font-bold text-red-500 mt-14">Individual Approach</p>
                    <p className="text-center text-xl mt-3 mb-3">Every client of Intense has a personalized program of
                        training and nutrition.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Welcome;