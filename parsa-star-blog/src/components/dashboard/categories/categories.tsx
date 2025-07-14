"use client";
import { queryKeys } from "@/constant/querykeys";
import { getCategories } from "@/server/actions/category/category";
import StatusCodes from "@/server/lib/constants";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import CategoryList from "./list/categoryList";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const Categories = () => {
    const router = useRouter();
    const { data, status } = useQuery({
        queryKey: [queryKeys.categories.getList],
        queryFn: async () => {
            const res = await getCategories();
            if (res.status !== StatusCodes.success) {
                throw new Error(res.message || "Failed to fetch users");
            }
            return res;
        },
    });
    if (status == "error") {
        return (
            <div className="w-full text-center">
                Some thing went wrong{" "}
                <Button variant={"ghost"} className="underline" onClick={() => router.refresh()}>
                    {" "}
                    Retry ?{" "}
                </Button>
            </div>
        );
    }
    return <CategoryList categories={data?.categories} />;
};

export default Categories;
