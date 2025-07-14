import React, { useState } from "react";
import { TCategoryListProps } from "./categoryList";
import { TShapedCategory } from "@/types/categories/api";
import { findCategoryIcon } from "@/utils/categories";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Minus, Pen, Plus, Trash2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const CategoryCards = ({ actions, categories }: TCategoryListProps) => {
    if (!categories) return <CategoryMocks />;
    if (categories.length == 0)
        return (
            <p className="text-center w-full font-semibold ">
                {" "}
                No categories found{" "}
            </p>
        );

    return (
        <div className="flex flex-col gap-5">
            {categories.map((category) => (
                <ParentDropDownCard
                    key={category.id}
                    actions={actions}
                    category={category}
                />
            ))}
        </div>
    );
};

export default CategoryCards;

const ParentDropDownCard = ({
    actions,
    category,
}: {
    category: TShapedCategory;
    actions: TCategoryListProps["actions"];
}) => {
    const [hideChildren, setHideChildren] = useState(
        category.children ? false : true
    );
    return (
        <div
            style={{
                transitionDelay: hideChildren
                    ? `${
                          category.children
                              ? category.children.length * 0.05 + 0.2
                              : 0
                      }s`
                    : "0s",
            }}
            className={`flex w-full flex-col duration-200  bg-secondary-400 rounded-xl border-secondary-500 p-5 ${
                hideChildren ? " gap-0 " : " gap-5 "
            }`}
        >
            <CategoryCardContent
                category={category}
                actions={actions}
                isParent={true}
                hideChildren={hideChildren}
                setHideChildren={setHideChildren}
            />
            {category.children?.length && (
                <div
                    data-lenis-prevent
                    style={{
                        maxHeight: hideChildren
                            ? "0px"
                            : `${category.children.length * 130}px`,
                        transition: `${category.children.length * 0.05 + 0.3}s`,
                    }}
                    className={`flex overflow-y-scroll ease-linear overflow-hidden flex-col ml-10  gap-5  duration-200 `}
                >
                    {category.children?.map((category) => (
                        <div
                            key={category.id}
                            className="bg-secondary-700/40 p-5 rounded-xl"
                        >
                            <CategoryCardContent
                                category={category}
                                actions={actions}
                                hideChildren={hideChildren}
                                isParent={false}
                                setHideChildren={setHideChildren}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const CategoryCardContent = ({
    category,
    actions,
    setHideChildren,
    isParent,
    hideChildren,
}: {
    isParent: boolean;
    actions: TCategoryListProps["actions"];
    category: TShapedCategory;
    setHideChildren: React.Dispatch<React.SetStateAction<boolean>>;
    hideChildren: boolean;
}) => {
    return (
        <div className="flex justify-between w-full">
            <div className="flex gap-2 items-center">
                <div
                    className={`size-16 rounded-full  relative flex justify-center items-center bg-slate-200  `}
                >
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
                            {" "}
                            {category.name[0]}
                        </p>
                    )}
                </div>
                <p className="text-lg font-semibold">{category.name}</p>
            </div>
            <div className="flex gap-2 items-center">
                <Button
                    onClick={() => actions.Delete(category)}
                    className="bg-red-600 hover:bg-red-600/90 aspect-square size-9"
                >
                    {" "}
                    <Trash2 />{" "}
                </Button>
                <Button
                    onClick={() => actions.Edit(category)}
                    className="bg-blue-600 hover:bg-blue-600/90 aspect-square size-9"
                >
                    {" "}
                    <Pen />{" "}
                </Button>
                {isParent && (
                    <Button
                        className="bg-green-700 hover:bg-green-600"
                        onClick={() => actions.AddSubCat(category)}
                    >
                        {" "}
                        Add Sub Category <Plus />
                    </Button>
                )}
                {isParent &&
                    category.children &&
                    category.children.length > 0 && (
                        <>
                            <Button
                                className="flex gap-2"
                                onClick={() => setHideChildren(!hideChildren)}
                            >
                                {" "}
                                {hideChildren == false ? (
                                    <>
                                        {" "}
                                        Hide SubCategories <Minus />{" "}
                                    </>
                                ) : (
                                    <>
                                        {" "}
                                        Show {category.children?.length}{" "}
                                        SubCategories <Plus />{" "}
                                    </>
                                )}{" "}
                            </Button>
                        </>
                    )}
            </div>
        </div>
    );
};

const CategoryMocks = () => {
    return (
        <>
            {Array(8)
                .fill(null)
                .map((_, index) => (
                    <div
                        key={index}
                        className={`flex w-full justify-between  bg-secondary-400 rounded-xl border-secondary-500 p-5 
                        `}
                    >
                        <div className="flex items-center gap-2">
                            <Skeleton className="size-16 rounded-full" />
                            <Skeleton className="h-5 w-32" />
                        </div>
                        <div className="flex items-center gap-2">
                            <Skeleton className="size-8" />
                            <Skeleton className="size-8" />
                            <Skeleton className="size-8 w-20" />
                        </div>
                    </div>
                ))}
        </>
    );
};
