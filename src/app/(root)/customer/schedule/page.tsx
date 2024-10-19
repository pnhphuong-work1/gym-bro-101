'use client';

import React, {useEffect, useState} from 'react';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import Header from "@/components/shared/Header";
import HomeNav from "@/components/shared/navbar/HomeNav";
import {Card} from "@/components/ui/card";
import {WorkoutDaysResponseValue} from "@/types";
import {getAllWorkoutDaysByUserId} from "@/lib/actions/userSubscription.action";
import {useGlobalContext} from "@/context/GlobalContext";
import {isErrorResponseValue} from "@/lib/utils";

const SchedulePage = () => {
    const [isSticky, setIsSticky] = useState(false);
    const [events, setEvents] = useState<WorkoutDaysResponseValue[]>([]);
    const [error, setError] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);
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

    const {userId} = useGlobalContext();

    useEffect(() => {
        getAllWorkoutDaysByUserId(userId)
            .then((res) => {
                if (!isErrorResponseValue(res))
                    setEvents(res.value);
                else
                    setError(res.errors[0].message);
                setIsLoading(false);
        });
        console.log(events);
        console.log("userId: ",userId);
    }, []);
    if (isLoading)
        return (
            <div className="text-center h-full">
                <div className={""}>
                    <Header/>
                    <HomeNav isSticky={isSticky} status={"schedule"}/>
                </div>
                <p>Loading...</p>
            </div>
        )
    return (
        <div className={"h-full"}>
            <div className={""}>
                <Header/>
                <HomeNav isSticky={isSticky} status={"schedule"}/>
            </div>
            <div className="h-12 bg-gray-800 text-white flex items-center justify-center text-2xl">
                YOUR SCHEDULE
            </div>
            <div className={"flex-row items-center justify-center pb-4"}>
                <Card
                    className={" p-5"}>
                    <FullCalendar
                        height={"70vh"}
                        allDayContent={"All Day"}
                        plugins={[dayGridPlugin]}
                        events={events}
                        initialView="dayGridMonth"
                        weekends={true}
                        headerToolbar={
                            {
                                left: 'prev today next',
                                center: 'title',
                                right: 'dayGridMonth dayGridWeek'
                            }
                        }
                    />
                </Card>
            </div>

        </div>
    );
};

export default SchedulePage;