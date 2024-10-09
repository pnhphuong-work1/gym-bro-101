'use client';
import React from 'react';
import {useGlobalContext} from "@/context/GlobalContext";

const HomePage = () => {
    const {fullName} = useGlobalContext();
    console.log(fullName)
    return (
        <div>
            <h1>Home Page {fullName}</h1>
        </div>
    );
};

export default HomePage;