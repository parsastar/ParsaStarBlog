"use client";
import { DashboardPagesDefaults, sortArray, TSort } from "@/constant/dashboard";
import { queryKeys } from "@/constant/querykeys";
import { GetUsers } from "@/server/actions/user/user";
import { TFilterUsers } from "@/types/sharedSchema";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import React from "react";
import DashboardFilters from "../shared/dashboardfilters";
import { PaginationList } from "@/components/common/paginationList";

const Authors = () => {
    const searchParams = useSearchParams();
    const { pageSize, startPage, role, sorting, search } =
        DashboardPagesDefaults.users.authorSection;
    const params: TFilterUsers = {
        role,
        page: Number(searchParams.get("page")) || startPage,
        pageSize: Number(searchParams.get("pageSize")) || pageSize,
        search: searchParams.get("search") || null,
        sort: sortArray.includes(searchParams.get("sort") as TSort)
            ? (searchParams.get("sort") as TSort)
            : sorting,
    };
    const { data, status } = useQuery({
        queryKey: [queryKeys.users.authors.getList],
        queryFn: async () => await GetUsers(params),
    });

    return (
        <div className="flex flex-col bg-white w-full">
            <DashboardFilters
                hasPageSize
                hasResetButton
                currentValues={params}
                hasSorting
                hasSearch
                defaultValues={{ pageSize, search, sorting }}
            />

            <PaginationList
                isLoading={status == "pending"}
                currentPage={params.page}
                isDashboard
                totalPages={
                    10
                    // (data?.status == 200 && data.totalPages) || undefined
                }
            />
        </div>
    );
};

export default Authors;
