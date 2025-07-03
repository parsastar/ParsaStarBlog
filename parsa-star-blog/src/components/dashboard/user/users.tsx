"use client";
import { DashboardPagesDefaults, sortArray, TSort } from "@/constant/dashboard";
import { queryKeys } from "@/constant/querykeys";
import { GetUsers } from "@/server/actions/user/user";
import { TFilterUsers } from "@/types/sharedSchema";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import DashboardFilters from "../shared/dashboardfilters";
import { PaginationList } from "@/components/common/paginationList";
import { TUserRoles, userRolesArray } from "@/types/user/shared";
import UsersList from "./usersList";

const Users = () => {
    const searchParams = useSearchParams();
    const { pageSize, startPage, role, sorting, search } =
        DashboardPagesDefaults.users;

    const params: TFilterUsers = {
        role: userRolesArray.includes(searchParams.get("role") as TUserRoles)
            ? (searchParams.get("role") as TUserRoles)
            : null, // to be changed
        page: Number(searchParams.get("page")) || startPage,
        pageSize: Number(searchParams.get("pageSize")) || pageSize,
        search: searchParams.get("search") || null,
        sort: sortArray.includes(searchParams.get("sort") as TSort)
            ? (searchParams.get("sort") as TSort)
            : sorting,
    };

    const { data, status } = useQuery({
        queryKey: [queryKeys.users.getList, params],
        queryFn: async () => {
            const res = await GetUsers(params);
            if (res.status !== 200) {
                // since were not throwing any error with the api response we handle it like this
                throw new Error(res.message || "Failed to fetch users");
            }
            return res;
        },
    });

    return (
        <div className="flex flex-col gap-10 justify-between min-h-[calc(100svh-200px)] bg-white w-full">
            <div className=" flex flex-col gap-10">
                <DashboardFilters
                    hasPageSize
                    hasResetButton
                    currentValues={params}
                    hasSorting
                    hasUserRole
                    hasSearch
                    defaultValues={{ pageSize, search, sorting, role }}
                />
                <UsersList
                    status={status}
                    pageSize={params.pageSize}
                    users={data?.users}
                />
            </div>
            <PaginationList
                isLoading={status == "pending"}
                currentPage={params.page}
                isDashboard
                totalPages={
                    (data?.status == 200 && data.totalPages) || undefined
                }
            />
        </div>
    );
};

export default Users;
