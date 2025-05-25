"use client";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { ArrowRight } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import { Skeleton } from "./ui/skeleton";
import { Button } from "./ui/button";

export function PaginationList({
    currentPage,
    totalPages,
}: {
    totalPages: number;
    currentPage: number;
}) {
    const searchParam = useSearchParams();
    const pathname = usePathname();
    const toWhere = (value: string) => {
        const params = new URLSearchParams(searchParam.toString());
        params.set("page", value);
        return `${pathname}?${params}`;
    };
    const renderPaginationItems = () => {
        const pages = [];
        const delta = 1; // Number of pages before/after the current page

        for (let i = 1; i <= totalPages; i++) {
            if (
                i === 1 || // Always show the first page
                i === totalPages || // Always show the last page
                (i >= currentPage - delta && i <= currentPage + delta) // Pages around the current page
            ) {
                pages.push(
                    <PaginationItem key={i}>
                        <PaginationLink
                            className={`size-[50px] !shadow-none shrink-0 grow-0 font-bold   border border-red-500 rounded-[2px]  text-[30px] ${
                                currentPage == i
                                    ? " bg-red-500 text-secondary-500 hover:text-secondary-500 hover:bg-red-500 "
                                    : "text-red-500 bg-secondary-500 hover:text-secondary-500 hover:bg-red-400 "
                            } `}
                            href={toWhere(String(i))}
                            isActive={i === currentPage}
                        >
                            {i}
                        </PaginationLink>
                    </PaginationItem>
                );
            } else if (
                pages[pages.length - 1]?.type !== PaginationEllipsis // Add ellipsis for skipped ranges
            ) {
                pages.push(
                    <PaginationEllipsis
                        className="size-[50px] text-red-500"
                        key={`ellipsis-${i}`}
                    />
                );
            }
        }

        return pages;
    };

    return (
        <Pagination dir="ltr">
            <PaginationContent>
                <PaginationItem>
                    <Button
                        variant={"ghost"}
                        className="h-fit w-fit sm:block hidden px-0 py-0"
                        disabled={currentPage - 1 <= 0}
                    >
                        <PaginationPrevious
                            className={`flex  items-center justify-center p-0 size-[50px] bg-red-500 border border-red-500 rounded-[2px] hover:bg-red-400`}
                            href={toWhere(String(currentPage - 1))}
                        >
                            <ArrowRight className="!size-[25px] shrink-0 rotate-180 grow-0 text-secondary-500 " />
                        </PaginationPrevious>
                    </Button>
                </PaginationItem>
                {renderPaginationItems()}
                <PaginationItem>
                    <Button
                        variant={"ghost"}
                        className="h-fit w-fit sm:block hidden px-0 py-0"
                        disabled={currentPage + 1 > totalPages}
                    >
                        <PaginationNext
                            className={`flex items-center justify-center p-0 size-[50px] bg-red-500 border border-red-500 rounded-[2px] hover:bg-red-400`}
                            href={toWhere(
                                String(
                                    currentPage + 1 < totalPages
                                        ? currentPage + 1
                                        : totalPages
                                )
                            )}
                        >
                            <ArrowRight className="!size-[25px] shrink-0 grow-0 text-secondary-500 " />
                        </PaginationNext>
                    </Button>
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}

export const PaginationMock = () => {
    return (
        <div className="flex w-full justify-center gap-4">
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-16" />
        </div>
    );
};
