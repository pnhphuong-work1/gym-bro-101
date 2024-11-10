'use client';

import React, {useEffect, useState} from 'react';
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Button} from "@/components/ui/button";
import {CaretSortIcon} from "@radix-ui/react-icons";
import {SubscriptionResponseValue} from "@/types";
import {getAllSubscriptions} from "@/lib/actions/subscription.action";
import {isErrorResponseValue} from "@/lib/utils";
import {Skeleton} from "@/components/ui/skeleton";
import Link from "next/link";
import PaginationBase from "@/components/shared/PaginationBase";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import CreateSubscriptionForm from "@/components/forms/CreateSubscriptionForm";
import DeleteSubscriptionDialog from "@/components/shared/dialog/DeleteSubscriptionDialog";
import SubscriptionDialog from "@/components/shared/dialog/SubscriptionDialog";

const SubscriptionTableHeader = [
    {name: "Id", sortable: false, sortKey: 'id'},
    {name: "Subscription Name", sortable: false, sortKey: 'name'},
    {name: "Time Limit (Hours)", sortable: false, sortKey: 'totalWorkoutTime'},
    {name: "Price (VNĐ)", sortable: false, sortKey: 'price'},
    {name: "Action", sortable: false, sortKey: 'action'},
]

const SubscriptionTable = () => {
    const [subscriptions, setSubscriptions] = useState<SubscriptionResponseValue[]>([])
    const [loading, setLoading] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [totalCounts, setTotalCounts] = useState<number>(1);
    const [limit, setLimit] = useState<number>(10);
    const [hasNextPage, setHasNextPage] = useState<boolean>(false);
    const [hasPrevPage, setHasPrevPage] = useState<boolean>(false);
    const [createDialogIsOpen, setCreateDialogIsOpen] = useState<boolean>(false);
    const [search, setSearch] = useState<string>('');
    const [sortBy, setSortBy] = useState<string>('price');
    const [sortOrder, setSortOrder] = useState<string>('desc');
    const [forceReload, setForceReload] = useState<boolean>(false);

    const handleChangeSort = (sortKey: string) => {
        if (sortKey === sortBy) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(sortKey);
            setSortOrder('asc');
        }
    }

    const handleOpenCreateDialog = () => {
        setCreateDialogIsOpen(true);
        console.log("dialog ", createDialogIsOpen);
    }
    const handleDataReload = () => {
        setCreateDialogIsOpen(false);
        setForceReload(!forceReload);
    }

    useEffect(() => {
        setLoading(true);
        getAllSubscriptions(search, 'name', sortOrder, sortBy, page, limit)
            .then((response) => {
                if (!isErrorResponseValue(response)) {
                    setSubscriptions(response.value.items);
                    setPage(response.value.pageIndex);
                    setTotalCounts(response.value.totalCount);
                    setLimit(response.value.pageSize);
                    setHasNextPage(response.value.hasNextPage);
                    setHasPrevPage(response.value.hasPreviousPage);
                }
            }).catch((error) => {
                console.log(error);
            }).finally(() => {
                setLoading(false);
            });
    }, [createDialogIsOpen, forceReload]);

    return (
        <Card>
            <CardHeader>
                <CardTitle className={"text-2xl text-center"}>Subscription Table</CardTitle>
                <Dialog open={createDialogIsOpen}
                        onOpenChange={setCreateDialogIsOpen}>
                    <DialogTrigger asChild>
                        <Button onClick={handleOpenCreateDialog}
                                className="bg-blue-500 text-white w-[50%] mx-auto px-2 py-1 rounded">
                            Create Subscription
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>
                                Create Subscription
                            </DialogTitle>
                        </DialogHeader>
                        <div className="flex justify-center">
                            <div className="w-[80%]">
                                <CreateSubscriptionForm onSuccess={handleDataReload} />
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            {SubscriptionTableHeader.map((header, index) => (
                                <TableHead key={index}>
                                    {header.sortable ? (
                                        <Button
                                            variant="ghost"
                                            className={`flex items-center justify-center gap-1 ${sortBy === header.sortKey ? 'text-blue-500' : 'text-gray-500'}`}
                                            onClick={() => {}}
                                        >
                                            {header.name}
                                            <CaretSortIcon className="ml-2 w-4 h-4" />
                                        </Button>
                                    ) : header.name }
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
                        ) : subscriptions && subscriptions.length > 0 ? (
                            subscriptions.map((sub, index) => (
                                <TableRow key={index} className="border-b">
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{sub.name}</TableCell>
                                    <TableCell>{sub.totalWorkoutTime}</TableCell>
                                    <TableCell>{sub.price}</TableCell>
                                    <TableCell className="flex gap-3">
                                        <SubscriptionDialog subscription={sub} onSuccess={handleDataReload} />
                                        <Button className="bg-red-400 text-white px-2 py-1 rounded">
                                            <DeleteSubscriptionDialog subscriptionId={sub.id} onSuccess={handleDataReload} />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center">
                                    No Subscription found
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

export default SubscriptionTable;