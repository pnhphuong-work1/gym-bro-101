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

const CheckLogTableHeader = [
    { name: 'Id', sortable: false, sortKey: 'id' },
    { name: 'Check In ID', sortable: true, sortKey: 'checkInId' },
    { name: 'Subscription ID', sortable: true, sortKey: 'userSubscriptionId' },
    { name: 'Check Status', sortable: true, sortKey: 'checkStatus' },
    { name: 'Workout Time', sortable: true, sortKey: 'workoutTime' },
];

const CheckLogTable = () => {
    const [logs, setLogs] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [totalCounts, setTotalCounts] = useState<number>(1);
    const [limit, setLimit] = useState<number>(10);
    const [hasNextPage, setHasNextPage] = useState<boolean>(false);
    const [hasPrevPage, setHasPrevPage] = useState<boolean>(false);
    const [search, setSearch] = useState<string>('');
    const [sortBy, setSortBy] = useState<string>('checkStatus');
    const [sortOrder, setSortOrder] = useState<string>('asc');

    const handleChangeSort = (sortKey: string) => {
        if (sortKey === sortBy) {
            setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
        } else {
            setSortBy(sortKey);
            setSortOrder('desc');
        }
    }

    useEffect(() => {
        setLoading(true);
        getAllCheckLogs(search, 'email', sortOrder, sortBy, page, limit)
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
    }, [page, search, sortBy, sortOrder]);

    return (
        <Card>
            <CardHeader className="flex justify-between flex-row items-center">
                <CardTitle>Check Log</CardTitle>
            </CardHeader>
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
                                            <CaretSortIcon className="ml-2 w-4 h-4" />
                                        </Button>
                                    ) : header.name}
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center">
                                    <Skeleton className="w-full h-[30px] rounded-full" />
                                </TableCell>
                            </TableRow>
                        ) : logs && logs.length > 0 ? (
                            logs.map((log, index) => (
                                <TableRow key={log.id} className="border-b">
                                    <TableCell className="text-lg">{log.id}</TableCell>
                                    <TableCell className="text-lg">{log.checkInId ? log.checkInId : 'N/A'}</TableCell>
                                    <TableCell className="text-lg">{log.userSubscriptionId}</TableCell>
                                    <TableCell className="text-lg">{log.checkStatus}</TableCell>
                                    <TableCell className="text-lg">{log.workoutTime ? log.workoutTime.split('.')[0] : 'N/A'}</TableCell>
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