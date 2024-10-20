'use client'

import React, {useEffect, useState} from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import PaginationBase from "@/components/shared/PaginationBase";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { getAllCheckLogs } from "@/lib/actions/checklogs.action";
import { isErrorResponseValue } from "@/lib/utils";
import {CheckLogResponseValue} from "@/types";

const CheckLogTableHeader = [
    { name: 'No.', sortable: false, sortKey: 'no' },
    { name: 'Customer Name', sortable: true, sortKey: 'fullName' },
    { name: 'Subscription', sortable: true, sortKey: 'subscriptionName'},
    { name: 'Check In Time', sortable: false, sortKey: 'checkInTime' },
    { name: 'Check Status', sortable: false, sortKey: 'checkStatus' },
    { name: 'Workout Time', sortable: false, sortKey: 'workoutTime' },
    { name: 'Date Created', sortable: true, sortKey: 'createdAt' },
];

const CheckLogTable = () => {
    const [logs, setLogs] = useState<CheckLogResponseValue[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
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

    const handleChangeSort = (sortKey: string) => {
        if (sortKey === sortBy) {
            setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
        } else {
            setSortBy(sortKey);
            setSortOrder('desc');
        }
    }

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const handleCheckStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCheckStatus(e.target.value);
    };

    const handleTimeFrameChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setTimeFrame(e.target.value);
    };

    useEffect(() => {
        setLoading(true);
        getAllCheckLogs(checkStatus, timeFrame, search, 'fullName', sortOrder, sortBy, page, limit)
            .then((response) => {
                if (!isErrorResponseValue(response)) {
                    setLogs(response.value.items);
                    setPage(response.value.pageIndex);
                    setTotalCounts(response.value.totalCount);
                    setLimit(response.value.pageSize);
                    setHasNextPage(response.value.hasNextPage);
                    setHasPrevPage(response.value.hasPreviousPage);
                }
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [page, search, sortBy, sortOrder, checkStatus, timeFrame]);

    return (
        <Card>
            <CardHeader
                className="flex justify-between items-center p-6 bg-gradient-to-r from-black to-red-900 text-white rounded-t-lg">
                <CardTitle className="text-2xl font-bold tracking-wide">Check Log</CardTitle>
            </CardHeader>

            {/* Search and Filters */}
            <div className="flex space-x-4 p-6 items-center">
                {/* Search Input */}
                <div className="flex items-center space-x-2">
                    <label htmlFor="search" className="text-lg font-medium">Search:</label>
                    <input
                        id="search"
                        type="text"
                        value={search}
                        onChange={handleSearchChange}
                        className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Search customer..."
                    />
                </div>

                {/* Time Frame Selection */}
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
                        <option value="CheckIn">Checked In</option>
                        <option value="CheckOut">Checked Out</option>
                    </select>
                </div>
            </div>

            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            {CheckLogTableHeader.map((header, index) => (
                                <TableHead key={index}
                                           className={`text-xl ${header.sortable ? 'cursor-pointer' : ''}`}
                                >
                                    {header.sortable ? (
                                        <Button
                                            variant="ghost"
                                            className={`flex items-center justify-center gap-1 ${sortBy === header.sortKey ? 'text-blue-500' : 'text-gray-500'}`}
                                            onClick={() => handleChangeSort(header.sortKey)}
                                        >
                                            {header.name}
                                            <CaretSortIcon className="ml-2 w-4 h-4"/>
                                        </Button>
                                    ) : header.name}
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={7} className="text-center">
                                    <Skeleton className="w-full h-[30px] rounded-full"/>
                                </TableCell>
                            </TableRow>
                        ) : logs && logs.length > 0 ? (
                            logs.map((log, index) => (
                                <TableRow key={log.id} className="border-b">
                                    <TableCell className="text-lg">{index + 1}</TableCell>
                                    <TableCell className="text-lg">{log.fullName}</TableCell> {/* Display Customer Name */}
                                    <TableCell className="text-lg">{log.subscriptionName}</TableCell>
                                    <TableCell className="text-lg">{log.checkInTime ? new Date(log.checkInTime).toLocaleString() : 'N/A'}</TableCell>
                                    <TableCell className="text-lg">{log.checkStatus == 'CheckIn' ? 'Checked In' : 'Checked Out'}</TableCell>
                                    <TableCell
                                        className="text-lg">{log.workoutTime ? log.workoutTime.split('.')[0] : 'N/A'}</TableCell> {/* Trim workout time */}
                                    <TableCell
                                        className="text-lg">{new Date(log.createdAt).toLocaleString()}
                                    </TableCell> {/* Format Date Created */}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center">
                                    No check logs found
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </CardContent>
            <CardFooter>
                <PaginationBase
                    page={page}
                    setPage={setPage}
                    totalCounts={totalCounts}
                    limit={limit}
                    hasNextPage={hasNextPage}
                    hasPrevPage={hasPrevPage}
                />
            </CardFooter>
        </Card>
    );
};


export default CheckLogTable;