"use client";
import { TCategory, TShapedCategory } from "@/types/categories/api";
import { IdCard, TableProperties } from "lucide-react";
import React, { useState } from "react";
import CategoryCards from "./categoryCards";
import { useCategoryDrawerStore } from "@/zustand/categoryDrawerStore";
import { useConfirmDialogStore } from "@/zustand/confirmDialogStore";
import { queryKeys } from "@/constant/querykeys";
import { DeleteCategoryAction } from "@/server/actions/category/category";

export type TCategoryListProps = {
    categories?: TShapedCategory[];
    actions: {
        Delete: (category: TCategory) => void;
        Edit: (category: TCategory) => void;
        AddSubCat: (category: TCategory) => void;
    };
};
const CategoryList = ({ categories }: { categories?: TShapedCategory[] }) => {
    console.log("categories : ", categories);
    const { setContent } = useCategoryDrawerStore();

    const DataViewModes = ["Table", "Card "] as const;
    const [viewMode, setViewMode] =
        useState<(typeof DataViewModes)[number]>("Table");

    const handleEdit = (category: TCategory) => {
        useCategoryDrawerStore.getState().setContent(category);
    };
    const handleDelete = async (category: TCategory) => {
        useConfirmDialogStore.getState().setContent({
            title: `Delete ${category.name}`,
            description: category.parent_id
                ? `Are you sure you want to delete category with the Name :  ${category.name}`
                : `!Warning : by removing this category ( ${category.name} ) all subCategories will be removed `,
            toastMessages: {
                success: ` ${category.name} Deleted Successfully `,
                error: `Failed to delete ${category.name}  `,
            },
            queryKeys: [queryKeys.categories.getList],
            action: () => DeleteCategoryAction(category.id),
        });
    };

    const AddSubCategory = (category: TCategory) => {
        setContent(undefined, category.id);
    };
    const actions: TCategoryListProps["actions"] = {
        Delete: handleDelete,
        Edit: handleEdit,
        AddSubCat: AddSubCategory,
    };
    return (
        <div className="w-full flex flex-col gap-10">
            <div className="w-full flex items-center bg-secondary-500 p-2.5   rounded-full">
                <div className="flex w-full gap-5   items-center">
                    {DataViewModes.map((mode) => (
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
                <CategoryCards actions={actions} categories={categories} />
            ) : (
                <CategoryCards actions={actions} categories={categories} />
            )}
        </div>
    );
};

export default CategoryList;
