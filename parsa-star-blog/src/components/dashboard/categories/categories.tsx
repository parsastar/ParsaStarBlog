"use client";
import { queryKeys } from "@/constant/querykeys";
import { getCategories } from "@/server/actions/category/category";
import StatusCodes from "@/server/lib/constants";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import CategoryList from "./list/categoryList";

const Categories = () => {
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

    return <CategoryList categories={data?.categories} />;
};

export default Categories;
