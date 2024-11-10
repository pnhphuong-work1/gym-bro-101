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
import {formatDateTime, formatDurationToHour, isErrorResponseValue} from "@/lib/utils";
import {Card} from "@/components/ui/card";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import PaginationBase from "@/components/shared/PaginationBase";
import {getAllCheckLogsByUserId} from "@/lib/actions/checklogs.action";
import {Skeleton} from "@/components/ui/skeleton";

const SchedulePage = () => {
    const [events, setEvents] = useState<WorkoutDaysResponseValue[]>([]);
    const [error, setError] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [activeTab, setActiveTab] = useState<string>('Schedule');
    // Check log history
    const [checkLogList, setCheckLogList] = useState<CheckLogResponseValue[]>([]);
    const [timeFrame, setTimeFrame] = useState<string>('ThisMonth');
    const [checkStatus, setCheckStatus] = useState<string>('CheckIn');
    // Pagination
    const [page, setPage] = useState<number>(1);
    const [totalCounts, setTotalCounts] = useState<number>(1);
    const [hasNextPage, setHasNextPage] = useState<boolean>(false);
    const [hasPrevPage, setHasPrevPage] = useState<boolean>(false);

    const LogTableHeader = [
        { name: 'Type', sortable: true, sortKey: 'checkStatus' },
        { name: 'Subscription', sortable: true, sortKey: 'subscriptionName'},
        { name: 'Workout Time', sortable: false, sortKey: 'workoutTime' },
        { name: 'Date', sortable: true, sortKey: 'createdAt' },
    ];

    const {userId} = useGlobalContext();

    const PAGE_LIMIT = 10;

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
        getAllCheckLogsByUserId(userId, checkStatus, timeFrame, "", "","asc", "CreatedAt", page, PAGE_LIMIT)
            .then((res) => {
                if (!isErrorResponseValue(res)) {
                    setCheckLogList(res.value.items);
                    setTotalCounts(res.value.totalCount);
                    setHasNextPage(res.value.hasNextPage);
                    setHasPrevPage(res.value.hasPreviousPage);
                } else {
                    setError(res.errors[0].message);
                }
            });
    }, [activeTab, checkStatus, timeFrame, page]);
    if (isLoading)
        return (
            <div className="text-center h-lvh">
                <div className={""}>
                    <Header/>
                    <HomeNav isSticky={false} status={"schedule"}/>
                </div>
                <p className={"mt-32 text-3xl text-red-500"}>
                    You need to buy any subscription to view the schedule!
                </p>
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

    const handleTimeFrameChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setTimeFrame(e.target.value);
    };
    const handleCheckStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCheckStatus(e.target.value);
    };

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
                            <div className={"flex space-x-4 p-6 items-center"}>
                                <div className="flex items-center space-x-2">
                                    <label htmlFor="timeFrame" className="text-lg font-medium">Time Frame:</label>
                                    <select
                                        id="timeFrame"
                                        value={timeFrame}
                                        onChange={handleTimeFrameChange}
                                        className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="All">All</option>
                                        <option value="Today">Today</option>
                                        <option value="Yesterday">Yesterday</option>
                                        <option value="ThisWeek">This Week</option>
                                        <option value="ThisMonth">This Month</option>
                                        <option value="90days">Last 90 Days</option>
                                    </select>
                                </div>

                                {/* Check Status Selection */}
                                <div className="flex items-center space-x-2">
                                    <label htmlFor="checkStatus" className="text-lg font-medium">Check Status:</label>
                                    <select
                                        id="checkStatus"
                                        value={checkStatus}
                                        onChange={handleCheckStatusChange}
                                        className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="All">All</option>
                                        <option value="CheckIn">Check-In</option>
                                        <option value="CheckOut">Check-Out</option>
                                    </select>
                                </div>
                            </div>
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
                                    {isLoading ? (
                                        <TableRow>
                                            <TableCell colSpan={7} className="text-center">
                                                <Skeleton className="w-full h-[30px] rounded-full"/>
                                            </TableCell>
                                        </TableRow>
                                    ) : (checkLogList.map((log, index) => (
                                        <TableRow key={log.id} className="border-b">
                                            <TableCell className={`text-lg ${
                                                log.checkStatus === "CheckIn"
                                                    ? 'text-green-400'
                                                    : 'text-yellow-700'}`}
                                            >
                                                {log.checkStatus}
                                            </TableCell>
                                            <TableCell className="text-lg">{log.subscriptionName}</TableCell>
                                            <TableCell className="text-lg">{formatDurationToHour(log.workoutTime)}</TableCell>
                                            <TableCell className="text-lg">{formatDateTime(log.createdAt)}</TableCell>
                                        </TableRow>
                                    )))}
                                </TableBody>
                                <PaginationBase
                                    page={page}
                                    setPage={setPage}
                                    totalCounts={totalCounts}
                                    limit={PAGE_LIMIT}
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