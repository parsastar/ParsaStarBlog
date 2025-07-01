"use client";
import { DashboardPagesDefaults, sortArray, TSort } from "@/constant/dashboard";
import { queryKeys } from "@/constant/querykeys";
import { deleteUserAction, GetUsers } from "@/server/actions/user/user";
import { TFilterUsers } from "@/types/sharedSchema";
import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import DashboardFilters from "../shared/dashboardfilters";
import { PaginationList } from "@/components/common/paginationList";
import { TUserRoles, userRolesArray } from "@/types/user/shared";
import UsersTable from "./userTable";
import { TGetUsers, TUserWithoutPassword } from "@/types/user/api";
import UserCards from "./UserCards";
import { IdCard, TableProperties } from "lucide-react";
import { useConfirmDialogStore } from "@/zustand/confirmDialogStore";

const Users = () => {
    const searchParams = useSearchParams();
    const { pageSize, startPage, role, sorting, search } =
        DashboardPagesDefaults.users.authorSection;

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
                <ViewMode
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

export type UserDataListProps = {
    pageSize: number;
    status: "error" | "success" | "pending";
    users?: TGetUsers["users"];
    actions: {
        Delete: (user: TUserWithoutPassword) => void;
        Edit: (user: TUserWithoutPassword) => void;
        View: (user: TUserWithoutPassword) => void;
    };
};
const ViewMode = ({
    pageSize,
    status,
    users,
}: {
    pageSize: number;
    status: "error" | "success" | "pending";
    users?: TGetUsers["users"];
}) => {
    type TDataView = "Table" | "Card";
    const [viewMode, setViewMode] = useState<TDataView>("Table");
    const DataViews = ["Table", "Card "] as TDataView[];
    const router = useRouter();
    const pathname = usePathname();
    const handleView = (user: TUserWithoutPassword) => {
        router.push(`${pathname}/${user.id}`);
    };
    const handleEdit = (user: TUserWithoutPassword) => {
        router.push(`${pathname}/${user.id}`);
    };
    const handleDelete = async (user: TUserWithoutPassword) => {
        useConfirmDialogStore.getState().setContent({
            title: `Delete ${user.first_name + " " + user.last_name}`,
            description: `Are you sure you want to delete user with the Name :  ${
                user.first_name + " " + user.last_name
            }`,
            toastMessages: {
                success: ` ${
                    user.first_name + " " + user.last_name
                } Deleted Successfully `,
                error: `Failed to delete ${
                    user.first_name + " " + user.last_name
                }  `,
            },
            queryKeys: [queryKeys.users.getList],
            action: () => deleteUserAction(user.id),
        });
    };
    const actions: UserDataListProps["actions"] = {
        Delete: handleDelete,
        View: handleView,
        Edit: handleEdit,
    };
    return (
        <div className="w-full flex flex-col gap-10">
            <div className="w-full flex items-center bg-secondary-500 p-2.5  rounded-full">
                <div className="flex w-full gap-5   items-center">
                    {DataViews.map((mode) => (
                        <button
                            onClick={() => setViewMode(mode)}
                            key={mode}
                            className={`w-full text-center text-secondary-800 p-3 duration-200 rounded-full flex items-center justify-center gap-2 ${
                                viewMode == mode &&
                                "bg-secondary-800 shadow-sm !text-secondary-500"
                            }`}
                        >
                            {mode !== "Table" ? (
                                <IdCard />
                            ) : (
                                <TableProperties />
                            )}
                            {mode}
                        </button>
                    ))}
                </div>
            </div>

            {viewMode == "Table" ? (
                <UsersTable
                    actions={actions}
                    pageSize={pageSize}
                    status={status}
                    users={users!}
                />
            ) : (
                <UserCards
                    actions={actions}
                    pageSize={pageSize}
                    status={status}
                    users={users!}
                />
            )}
        </div>
    );
};
