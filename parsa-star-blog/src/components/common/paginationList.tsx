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
import { Skeleton } from "../ui/skeleton";
import { Button } from "../ui/button";

export function PaginationList({
    currentPage,
    totalPages,
    isLoading,
    isDashboard = false,
}: {
    isLoading: boolean;
    isDashboard?: boolean;
    totalPages: number | undefined;
    currentPage: number;
}) {
    const searchParam = useSearchParams();
    const pathname = usePathname();

    const toWhere = (value: string) => {
        const params = new URLSearchParams(searchParam.toString());
        params.set("page", value);
        return `${pathname}?${params}`;
    };

    const sizeClass = "size-[40px] lg:size-[50px] ";
    const textClass =
        "text-description sm:text-subtitle lg:text-[30px]" + isDashboard &&
        "font-roboto";
    const shapeClass = isDashboard
        ? "rounded-lg border-none active:scale-95"
        : "rounded-[2px] border border-red-500";
    const paginationBase = `${sizeClass} !shadow-none shrink-0 grow-0 bg-secondary-500 font-bold ${shapeClass} ${textClass}`;
    const activePage = isDashboard
        ? " bg-secondary-800 hover:text-white hover:bg-secondary-700 text-white "
        : "bg-red-500 text-secondary-500 hover:bg-red-500 hover:text-secondary-500";
    const inactivePage = isDashboard
        ? " bg-secondary-600 hover:text-white hover:bg-secondary-700 text-primary-600 "
        : "bg-secondary-500 text-red-500 hover:bg-red-400 hover:text-secondary-500";
    const arrowClass = isDashboard
        ? " bg-transparent  group-hover:text-white group-hover:bg-transparent text-primary-600  size-[18px] lg:!size-[20px] shrink-0 grow-0 "
        : "size-[20px] lg:!size-[25px] shrink-0 grow-0 text-secondary-500";
    const navButtonBase = isDashboard
        ? `flex items-center   justify-center p-0 ${sizeClass} group bg-secondary-600 ${shapeClass} hover:bg-secondary-700`
        : `flex items-center justify-center p-0 ${sizeClass} bg-red-500 ${shapeClass} hover:bg-red-400`;

    const renderPaginationItems = () => {
        const pages = [];
        if (!totalPages) return;

        const delta = 1;

        for (let i = 1; i <= totalPages; i++) {
            if (
                i === 1 ||
                i === totalPages ||
                (i >= currentPage - delta && i <= currentPage + delta)
            ) {
                pages.push(
                    <PaginationItem key={i}>
                        <PaginationLink
                            className={`${paginationBase} ${
                                currentPage === i ? activePage : inactivePage
                            }`}
                            href={toWhere(String(i))}
                            isActive={i === currentPage}
                        >
                            {i}
                        </PaginationLink>
                    </PaginationItem>
                );
            } else if (pages[pages.length - 1]?.type !== PaginationEllipsis) {
                pages.push(
                    <PaginationEllipsis
                        className={`${sizeClass} text-red-500`}
                        key={`ellipsis-${i}`}
                    />
                );
            }
        }

        return pages;
    };

    if (isLoading) return <PaginationMock />;
    if (totalPages === undefined) return null;

    return (
        <Pagination dir="ltr">
            <PaginationContent className="w-full px-5 justify-center">
                <PaginationItem>
                    <Button
                        variant="ghost"
                        className="h-fit w-fit px-0 py-0"
                        disabled={currentPage - 1 <= 0}
                    >
                        <PaginationPrevious
                            className={navButtonBase}
                            href={toWhere(String(currentPage - 1))}
                        >
                            <ArrowRight
                                className={`${arrowClass} rotate-180`}
                            />
                        </PaginationPrevious>
                    </Button>
                </PaginationItem>

                {renderPaginationItems()}

                <PaginationItem>
                    <Button
                        variant="ghost"
                        className="h-fit w-fit px-0 py-0"
                        disabled={currentPage + 1 > totalPages}
                    >
                        <PaginationNext
                            className={navButtonBase}
                            href={toWhere(
                                String(
                                    currentPage + 1 < totalPages
                                        ? currentPage + 1
                                        : totalPages
                                )
                            )}
                        >
                            <ArrowRight className={arrowClass} />
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
