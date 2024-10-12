'use client';
import React from 'react';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination";

interface PaginationProps {
    page: number;
    setPage: (page: number) => void;
    totalCounts: number;
    limit: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
}

const PaginationBase = ({page, setPage, totalCounts, limit, hasNextPage, hasPrevPage}: PaginationProps) => {
    return (
        <Pagination>
            <PaginationContent
                className="flex justify-center items-center space-x-2"
            >
                <PaginationItem>
                    <PaginationPrevious
                        className={`cursor-pointer ${hasPrevPage ? '' : 'pointer-events-none opacity-50'}`}
                        onClick={() => setPage(page - 1)}
                    />
                </PaginationItem>
                {Array.from({length: Math.ceil(totalCounts / limit)}).map((_, index) => (
                    <PaginationItem key={index}>
                        <PaginationLink
                            className={`w-8 h-8 cursor-pointer ${page === index + 1 ? 'bg-blue-500 text-white' : ''}`}
                            onClick={() => setPage(index + 1)}
                        >
                            {index + 1}
                        </PaginationLink>
                    </PaginationItem>
                ))}
                <PaginationItem>
                    <PaginationNext
                        className={`cursor-pointer ${hasNextPage ? '' : 'pointer-events-none opacity-50'}`}
                        onClick={() => setPage(page + 1)}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
};

export default PaginationBase;