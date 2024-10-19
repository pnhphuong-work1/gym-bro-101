'use client';

import React, {useState} from 'react';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import Header from "@/components/shared/Header";
import HomeNav from "@/components/shared/navbar/HomeNav";
import {Card} from "@/components/ui/card";

const SchedulePage = () => {
    const [isSticky, setIsSticky] = useState(false);
    const [events, setEvents] = useState([]);
    const eventss = [
        {
            start: "2024-10-14T10:10:00"
        },
        {
            title: "Gold",
            start: "2024-10-21T10:10:00"
        },
        {
            title: "Gold",
            start: "2024-10-16T10:10:00"
        },
        {
            title: "Gold",
            start: "2024-10-23T10:10:00"
        },
        {
            title: "Gold",
            start: "2024-10-18T10:10:00"
        },
        {
            title: "Gold",
            start: "2024-10-25T10:10:00"
        },
        {
            title: "Premium",
            start: "2024-10-14T10:10:00"
        },
        {
            title: "Premium",
            start: "2024-10-21T10:10:00"
        },
        {
            title: "Premium",
            start: "2024-10-15T10:10:00"
        },
        {
            title: "Premium",
            start: "2024-10-22T10:10:00"
        },
        {
            title: "Premium",
            start: "2024-10-16T10:10:00"
        },
        {
            title: "Premium",
            start: "2024-10-23T10:10:00"
        },
        {
            title: "Premium",
            start: "2024-10-17T10:10:00"
        },
        {
            title: "Premium",
            start: "2024-10-24T10:10:00"
        },
        {
            title: "Premium",
            start: "2024-10-18T10:10:00"
        },
        {
            title: "Premium",
            start: "2024-10-25T10:10:00"
        },
        {
            title: "Premium",
            start: "2024-10-19T10:10:00"
        },
        {
            title: "Premium",
            start: "2024-10-20T10:10:00"
        }
    ];

    return (
        <div className={"h-full"}>
            <div className={""}>
                <Header/>
                <HomeNav isSticky={isSticky} status={"schedule"}/>
            </div>
            <div className="h-12 bg-gray-800 text-white flex items-center justify-center text-2xl">
                YOUR SCHEDULE
            </div>
            <div className={"flex-row pt-2"}>
                <div className={"w-3/12 absolute left-0"}>
                    <div className={"text-2xl text-center"}>
                        Your Schedule
                    </div>
                    <div className={"text-center"}>
                        <p>Here you can see your schedule for the month.</p>
                        <p>Click on a day to see the details.</p>
                    </div>
                </div>
                <Card
                    className={"w-9/12 absolute right-0 p-5"}>
                    <FullCalendar
                        height={"70vh"}
                        plugins={[dayGridPlugin]}
                        events={eventss}
                        initialView="dayGridMonth"
                        weekends={true}
                        headerToolbar={
                            {
                                left: 'prev,next today',
                                center: 'title',
                                right: 'dayGridMonth,dayGridWeek'
                            }
                        }
                    />
                </Card>

            </div>

        </div>
    );
};

export default SchedulePage;