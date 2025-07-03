"use client";
import { deleteUserAction } from "@/server/actions/user/user";
import { TGetUsers, TUserWithoutPassword } from "@/types/user/api";
import { useConfirmDialogStore } from "@/zustand/confirmDialogStore";
import { IdCard, TableProperties } from "lucide-react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import UsersTable from "./userTable";
import UserCards from "./UserCards";
import { queryKeys } from "@/constant/querykeys";
import { useUserDrawerStore } from "@/zustand/userDrawerStore";

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
const UsersList = ({
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
        useUserDrawerStore.getState().setContent(user);
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
export default UsersList;
