import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Eye, Pen, Trash2, User } from "lucide-react";
import Image from "next/image";
import React from "react";

import { useRouter } from "next/navigation";
import { TUserDataListProps } from "./usersList";


const UserCards = (props: TUserDataListProps) => {
    const router = useRouter();
    const { status, pageSize, actions } = props;

    if (status == "pending") return <UserCardsMock pageSize={pageSize} />;
    if (status == "error")
        return (
            <div className="w-full flex items-center justify-center">
                <p className=" text-center"> Ops something went wrong! </p>
                <Button
                    onClick={() => router.refresh()}
                    variant={"ghost"}
                    className="underline bg-transparent w-fit p-1 hover:bg-transparent"
                >
                    {" "}
                    Retry{" "}
                </Button>
            </div>
        );
    if (status == "success") {
        const { users } = props;
        if (users!.length == 0)
            return <p className="w-full text-center"> No user found</p>;
        return (
            <div className="flex flex-wrap font-roboto items-center justify-evenly w-full gap-5">
                {users!.map((user) => (
                    <div
                        key={user.id}
                        className="flex flex-col gap-5 border flex-1  sm:min-w-[400px] border-secondary-500 bg-secondary-400 rounded-xl p-4"
                    >
                        <div className="w-full  flex gap-5">
                            <div className="relative items-center justify-center flex bg-secondary-600 size-[50px] overflow-hidden rounded-full">
                                {user.image ? (
                                    <Image
                                        src={user.image}
                                        alt={user.first_name}
                                        fill
                                        style={{ objectFit: "cover" }}
                                    />
                                ) : (
                                    <User />
                                )}
                            </div>
                            <div className="flex flex-col justify-between">
                                <p>
                                    <span className="font-semibold">
                                        {" "}
                                        Name :{" "}
                                    </span>
                                    {`${user.first_name} ${user.last_name}`}{" "}
                                </p>
                                <p>
                                    {" "}
                                    <span className="font-semibold">
                                        {" "}
                                        Role :{" "}
                                    </span>{" "}
                                    {user.role}
                                </p>
                            </div>
                        </div>
                        <div className="w-full gap-5 justify-between flex sm:flex-row flex-col sm:items-end ">
                            <div className="flex flex-col gap-1">
                                <p>
                                    <span className="font-semibold">
                                        {" "}
                                        Website :{" "}
                                    </span>
                                    {user.website || "----"}
                                </p>
                                <p>
                                    <span className="font-semibold">
                                        {" "}
                                        Email :{" "}
                                    </span>
                                    {user.email}
                                </p>
                                <p>
                                    <span className="font-semibold">
                                        {" "}
                                        Phone :{" "}
                                    </span>
                                    {user.phone_number || "----"}
                                </p>
                            </div>
                            <div className="flex gap-1 text-white">
                                <Button
                                    onClick={() => actions.Delete(user)}
                                    className="bg-red-600 hover:bg-red-600/90 aspect-square size-9"
                                >
                                    {" "}
                                    <Trash2 />{" "}
                                </Button>
                                <Button
                                    onClick={() => actions.Edit(user)}
                                    className="bg-blue-600 hover:bg-blue-600/90 aspect-square size-9"
                                >
                                    {" "}
                                    <Pen />{" "}
                                </Button>
                                <Button
                                    onClick={() => actions.View(user)}
                                    className="bg-black hover:bg-black/90 aspect-square size-9"
                                >
                                    {" "}
                                    <Eye />{" "}
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }
};
export default UserCards;

const UserCardsMock = ({ pageSize }: { pageSize: number }) => {
    return (
        <div className="flex flex-wrap font-roboto items-center justify-evenly w-full gap-5">
            {Array(pageSize)
                .fill(null)
                .map((_, index) => (
                    <div
                        key={index}
                        className="flex flex-col gap-5 border flex-1  sm:min-w-[400px] border-secondary-500 bg-secondary-400 rounded-xl p-4"
                    >
                        <div className="w-full  flex gap-5">
                            <div className="relative aspect-square min-w-[50px] size-[50px] overflow-hidden rounded-full">
                                <Skeleton className="w-full h-full " />
                            </div>
                            <div className="flex flex-col w-full justify-between">
                                <Skeleton className="w-3/5 h-5" />
                                <Skeleton className="w-2/5 h-5" />
                            </div>
                        </div>
                        <div className="w-full gap-5 justify-between flex sm:flex-row flex-col sm:items-end ">
                            <div className="flex flex-col w-full gap-1">
                                <Skeleton className="w-4/5 h-5" />
                                <Skeleton className="w-2/5 h-5" />
                                <Skeleton className="w-3/5 h-5" />
                            </div>
                            <div className="flex gap-1 text-white">
                                <Skeleton className="size-5 as" />
                                <Skeleton className="size-5" />
                                <Skeleton className="size-5" />
                            </div>
                        </div>
                    </div>
                ))}
        </div>
    );
};
