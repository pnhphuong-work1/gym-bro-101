'use client';

import React, {useEffect, useState} from 'react';
import {CustomerResponseValue} from "@/types";
import {getAllCustomers} from "@/lib/actions/user.action";
import {isErrorResponseValue} from "@/lib/utils";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Skeleton} from "@/components/ui/skeleton";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import PaginationBase from "@/components/shared/PaginationBase";
import CreateCustomerDialog from "@/components/shared/dialog/CreateCustomerDialog";
import {CaretSortIcon} from "@radix-ui/react-icons";

const CustomerTableHeader = [
    {name: 'Id', sortable: false, sortKey: 'id'},
    {name: 'Full Name', sortable: true, sortKey: 'fullName'},
    {name: 'Email', sortable: true, sortKey: 'email'},
    {name: 'Phone Number', sortable: true, sortKey: 'phoneNumber'},
    {name: 'Spent Time (Hours)', sortable: true, sortKey: 'totalSpentTime'},
    {name: 'Payment (VNĐ)', sortable: true, sortKey: 'totalPayment'},
    {name: 'Action', sortable: false, sortKey: 'action'},
]

const CustomerTable = () => {
    const [users, setUsers] = useState<CustomerResponseValue[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [totalCounts, setTotalCounts] = useState<number>(1);
    const [limit, setLimit] = useState<number>(10);
    const [hasNextPage, setHasNextPage] = useState<boolean>(false);
    const [hasPrevPage, setHasPrevPage] = useState<boolean>(false);
    const [search, setSearch] = useState<string>('');
    const [sortBy, setSortBy] = useState<string>('totalPayment');
    const [sortOrder, setSortOrder] = useState<string>('desc');

    const handleChangeSort = (sortKey: string) => {
        if (sortKey === sortBy) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(sortKey);
            setSortOrder('asc');
        }
    }
    useEffect(() => {
        setLoading(true);
        getAllCustomers(search, 'fullName', sortOrder, sortBy, page, limit)
            .then((response) => {
                if (!isErrorResponseValue(response)) {
                    setUsers(response.value.items);
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
                setLoading(false); // Set loading to false after fetching data
            });
    }, [page, search, sortBy, sortOrder]);

    return (
        <Card>
            <CardHeader className="flex justify-between flex-row items-center">
                <CardTitle>Manager Dashboard</CardTitle>
                <CreateCustomerDialog/>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            {CustomerTableHeader.map((header, index) => (
                                <TableHead key={index}>
                                    {
                                        header.sortable ? (
                                            <Button
                                                variant="ghost"
                                                className={`flex items-center justify-center gap-1 ${sortBy === header.sortKey ? 'text-blue-500' : 'text-gray-500'}`}
                                                onClick={() => handleChangeSort(header.sortKey)}
                                            >
                                                {header.name}
                                                <CaretSortIcon className="ml-2 w-4 h-4" />
                                            </Button>
                                        ) : header.name
                                    }
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
                        ) : users && users.length > 0 ? (
                            users.map((user, index) => (
                                <TableRow key={index} className="border-b">
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{user.fullName}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.phoneNumber}</TableCell>
                                    <TableCell>{user.totalSpentTime}</TableCell>
                                    <TableCell>{user.totalPayment}</TableCell>
                                    <TableCell className="flex gap-3">
                                        <Button className="bg-blue-200 text-white px-2 py-1 rounded">
                                            <Link href={`/admin/dashboard/customer/${user.id}`}>
                                                Edit
                                            </Link>
                                        </Button>
                                        <Button className="bg-red-400 text-white px-2 py-1 rounded">
                                            <Link href={`/admin/dashboard/customer/${user.id}`}>
                                                Delete
                                            </Link>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center">
                                    No managers found
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

export default CustomerTable;