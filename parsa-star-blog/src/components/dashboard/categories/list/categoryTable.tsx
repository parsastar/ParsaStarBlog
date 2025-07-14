import React from "react";
import { TCategoryListProps } from "./categoryList";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pen, Plus, Trash2 } from "lucide-react";
import { TShapedCategory } from "@/types/categories/api";
import Image from "next/image";
import { findCategoryIcon } from "@/utils/categories";
import { Skeleton } from "@/components/ui/skeleton";

const tableCols = [
    { label: "Image", key: "image" },
    { label: "Name", key: "name" },
    { label: "Sub-Category", key: "children" },
] as const;

const CategoryTable = ({ actions, categories }: TCategoryListProps) => {
    if (!categories) return <CategoryTableMock />;
    if (categories.length === 0)
        return (
            <p className="text-center w-full font-semibold">
                No categories found
            </p>
        );

    return (
        <div className="overflow-auto font-roboto rounded-md border">
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
                    {categories.map((category) => (
                        <React.Fragment key={category.id}>
                            <TableRow>
                                <TableCells
                                    category={category}
                                    actions={actions}
                                />
                            </TableRow>
                            {category.children?.map((child) => (
                                <TableRow
                                    className="bg-secondary-200"
                                    key={child.id}
                                >
                                    <TableCells
                                        category={child}
                                        actions={actions}
                                        isChild
                                    />
                                </TableRow>
                            ))}
                        </React.Fragment>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default CategoryTable;

const TableCells = ({
    category,
    actions,
    isChild = false,
}: {
    category: TShapedCategory;
    actions: TCategoryListProps["actions"];
    isChild?: boolean;
}) => {
    return (
        <>
            {tableCols.map((col) => (
                <TableCell key={col.key}>
                    {col.key === "name" && (
                        <p
                            className={`text-lg ${
                                isChild ? "font-medium" : "font-bold"
                            }`}
                        >
                            {isChild ? `---` : category.name}
                        </p>
                    )}
                    {col.key === "children" && (
                        <p
                            className={`text-lg ${
                                isChild ? "font-bold" : "font-medium"
                            }`}
                        >
                            {isChild ? category.name : "---"}
                        </p>
                    )}
                    {col.key === "image" && (
                        <div className="size-12 rounded-full relative flex justify-center items-center bg-slate-200">
                            {category.icon_name ? (
                                findCategoryIcon(category.icon_name)
                            ) : category.image ? (
                                <Image
                                    src={category.image}
                                    fill
                                    alt={category.name}
                                    style={{ objectFit: "contain" }}
                                />
                            ) : (
                                <p className="text-2xl uppercase font-semibold">
                                    {category.name[0]}
                                </p>
                            )}
                        </div>
                    )}
                </TableCell>
            ))}
            <TableCell className="text-right">
                <div className="flex gap-1 justify-end">
                    <Button
                        onClick={() => actions.Delete(category)}
                        className="bg-red-600 hover:bg-red-600/90 aspect-square size-9"
                    >
                        <Trash2 />
                    </Button>
                    <Button
                        onClick={() => actions.Edit(category)}
                        className="bg-blue-600 hover:bg-blue-600/90 aspect-square size-9"
                    >
                        <Pen />
                    </Button>
                    {!category.parent_id && (
                        <Button
                            className="bg-green-700 hover:bg-green-600"
                            onClick={() => actions.AddSubCat(category)}
                        >
                            Add Sub Category <Plus />
                        </Button>
                    )}
                </div>
            </TableCell>
        </>
    );
};

const CategoryTableMock = () => {
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
                {Array(8)
                    .fill(null)
                    .map((_, index) => (
                        <TableRow key={index}>
                            {tableCols.map((col) => (
                                <TableCell key={col.key}>
                                    {col.key == "image" ? (
                                        <Skeleton className="size-12 rounded-full " />
                                    ) : (
                                        <Skeleton className="h-7 w-full flex-1" />
                                    )}
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
