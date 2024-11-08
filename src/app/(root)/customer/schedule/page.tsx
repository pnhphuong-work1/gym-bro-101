'use client';

import React, {useEffect, useState} from 'react';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import * as Tabs from "@radix-ui/react-tabs";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import Header from "@/components/shared/Header";
import HomeNav from "@/components/shared/navbar/HomeNav";
import {CheckLogResponseValue, WorkoutDaysResponseValue} from "@/types";
import {getAllWorkoutDaysByUserId} from "@/lib/actions/userSubscription.action";
import {useGlobalContext} from "@/context/GlobalContext";
import {isErrorResponseValue} from "@/lib/utils";
import {Card} from "@/components/ui/card";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import PaginationBase from "@/components/shared/PaginationBase";

const SchedulePage = () => {
    const [events, setEvents] = useState<WorkoutDaysResponseValue[]>([]);
    const [error, setError] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [activeTab, setActiveTab] = useState<string>('Schedule');
    const [checkLogList, setCheckLogList] = useState<CheckLogResponseValue[]>([]);
    const [page, setPage] = useState<number>(1);
    const [totalCounts, setTotalCounts] = useState<number>(1);
    const [limit, setLimit] = useState<number>(10);
    const [hasNextPage, setHasNextPage] = useState<boolean>(false);
    const [hasPrevPage, setHasPrevPage] = useState<boolean>(false);
    const [search, setSearch] = useState<string>('');
    const [sortBy, setSortBy] = useState<string>('createdAt');
    const [sortOrder, setSortOrder] = useState<string>('desc');
    const [timeFrame, setTimeFrame] = useState<string>('ThisMonth');
    const [checkStatus, setCheckStatus] = useState<string>('All');

    const LogTableHeader = [
        { name: 'Type', sortable: true, sortKey: 'checkStatus' },
        { name: 'Subscription', sortable: true, sortKey: 'subscriptionName'},
        { name: 'Workout Time', sortable: false, sortKey: 'workoutTime' },
        { name: 'Date', sortable: true, sortKey: 'createdAt' },
    ];

    const {userId} = useGlobalContext();

    useEffect(() => {
        getAllWorkoutDaysByUserId(userId)
            .then((res) => {
                console.log("res in : ",res);
                if (!isErrorResponseValue(res))
                    setEvents(res.value);
                else
                    setError(res.errors[0].message);
                setIsLoading(false);
        });
        setActiveTab("Schedule");
    }, []);
    if (isLoading)
        return (
            <div className="text-center h-full">
                <div className={""}>
                    <Header/>
                    <HomeNav isSticky={false} status={"schedule"}/>
                </div>
                <p>Loading...</p>
            </div>
        )
    if (error)
        return (
            <div className="text-center h-full">
                <div className={""}>
                    <Header/>
                    <HomeNav isSticky={false} status={"schedule"}/>
                </div>
                <p>{error}</p>
            </div>
        )
    return (
        <div className={"h-full"}>
            <div className={"h-lvh"}>
                <Header/>
                <HomeNav isSticky={false} status={"schedule"}/>
                <Card
                    className={"w-[70%] mx-auto mt-4 rounded-lg shadow-lg"}
                >
                    <Tabs.Root defaultValue="Schedule">
                        <Tabs.List className={"flex justify-around rounded-t-lg bg-white h-12"}>
                            <Tabs.Trigger
                                key={"Schedule"}
                                value={"Schedule"}
                                onClick={() => setActiveTab("Schedule")}
                                className={`w-full px-4 py-2 text-2xl ${
                                    activeTab === "Schedule" 
                                        ? 'text-gray-800 border-b-2'
                                        : 'text-gray-300'} 
                                        hover:text-gray-600 
                                        hover:scale-110 
                                        hover:border-0 
                                        cursor-pointer`}
                            >
                                Schedule
                            </Tabs.Trigger>
                            <Tabs.Trigger
                                key={"History"}
                                value={"History"}
                                onClick={() => setActiveTab("History")}
                                className={`w-full px-4 py-2 text-2xl ${
                                    activeTab === "History" 
                                        ? 'text-gray-800 border-b-2'
                                        : 'text-gray-300'} 
                                        hover:text-gray-600 
                                        hover:scale-110 
                                        hover:border-0 
                                        cursor-pointer`}
                            >
                                Check-in history
                            </Tabs.Trigger>
                        </Tabs.List>
                        {/*Schedule*/}
                        <Tabs.Content value={"Schedule"}>
                            <div className={"flex-row items-center justify-center w-[90%] mx-auto py-4"}>
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
                            </div>
                        </Tabs.Content>
                        {/*Check log history*/}
                        <Tabs.Content value={"History"}>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        {LogTableHeader.map((header, index) => (
                                            <TableHead key={index}
                                                         className={`text-xl ${header.sortable ? 'cursor-pointer' : ''}`}
                                            >
                                                {header.name}
                                            </TableHead>
                                        ))}
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {checkLogList.map((log, index) => (
                                        <TableRow key={log.id} className="border-b">
                                            <TableCell className={`text-lg ${
                                                log.checkStatus === "CheckIn" 
                                                    ? 'text-green-400' 
                                                    : 'text-yellow-700'}`}
                                            >
                                                {log.checkStatus}
                                            </TableCell>
                                            <TableCell className="text-lg">{log.subscriptionName}</TableCell>
                                            <TableCell className="text-lg">{log.workoutTime}</TableCell>
                                            <TableCell className="text-lg">{log.createdAt}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                                <PaginationBase
                                    page={page}
                                    setPage={setPage}
                                    totalCounts={totalCounts}
                                    limit={limit}
                                    hasNextPage={hasNextPage}
                                    hasPrevPage={hasPrevPage}
                                />
                            </Table>
                        </Tabs.Content>
                    </Tabs.Root>
                </Card>
            </div>
        </div>
    );
};

export default SchedulePage;