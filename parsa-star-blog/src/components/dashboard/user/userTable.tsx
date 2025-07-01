"use client";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Eye, Pen, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { UserDataListProps } from "./users";

const UsersTable = (props: UserDataListProps) => {
    const router = useRouter();
    const { status, pageSize } = props;
    const tableCols = [
        { label: "First Name", key: "first_name" },
        { label: "Last Name", key: "last_name" },
        { label: "Role", key: "role" },
        { label: "Website", key: "website" },
        { label: "Email", key: "email" },
        { label: "Phone", key: "phone_number" },
    ] as const;
    if (status == "pending") return <UserTableMock pageSize={pageSize} />;
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
            <div className="overflow-auto font-roboto rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            {tableCols.map((col) => (
                                <TableHead key={col.key}>{col.label}</TableHead>
                            ))}
                            <TableHead className="text-right">
                                Actions
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users!.map((user) => (
                            <TableRow key={user.id}>
                                {tableCols.map((col) => (
                                    <TableHead key={col.key}>
                                        {user[col.key] || "----"}
                                    </TableHead>
                                ))}
                                <TableCell className="text-right">
                                    <div className="flex gap-1 justify-end">
                                        <Button
                                            size="icon"
                                            className="bg-black hover:bg-black/90 text-white"
                                        >
                                            <Eye className="size-4" />
                                        </Button>
                                        <Button
                                            size="icon"
                                            className="bg-red-600 hover:bg-red-600/90 text-white"
                                        >
                                            <Trash2 className="size-4" />
                                        </Button>
                                        <Button
                                            size="icon"
                                            className="bg-blue-600 hover:bg-blue-600/90 text-white"
                                        >
                                            <Pen className="size-4" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        );
    }
};

export default UsersTable;

const UserTableMock = ({ pageSize }: { pageSize: number }) => {
    const tableCols = [
        { label: "First Name", key: "first_name" },
        { label: "Last Name", key: "last_name" },
        { label: "Role", key: "role" },
        { label: "Website", key: "website" },
        { label: "Email", key: "email" },
        { label: "Phone", key: "phone_number" },
    ] as const;
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    {tableCols.map((col) => (
                        <TableHead key={col.key}>{col.label}</TableHead>
                    ))}
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {Array(pageSize)
                    .fill(null)
                    .map((_, index) => (
                        <TableRow key={index}>
                            {tableCols.map((col) => (
                                <TableCell key={col.key}>
                                    <Skeleton className="h-7 w-full flex-1" />
                                </TableCell>
                            ))}
                            <TableCell className="text-right">
                                <div className="flex gap-1 justify-end">
                                    {Array(3)
                                        .fill(null)
                                        .map((_, index) => (
                                            <Skeleton
                                                key={index}
                                                className="size-8"
                                            />
                                        ))}
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
            </TableBody>
        </Table>
    );
};
