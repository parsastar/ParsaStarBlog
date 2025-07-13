import React, { useState } from "react";
import { TCategoryListProps } from "./categoryList";
import { TCategory, TShapedCategory } from "@/types/categories/api";
import { findCategoryIcon } from "@/utils/categories";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Minus, Pen, Plus, Trash2 } from "lucide-react";

const CategoryCards = ({ actions, categories }: TCategoryListProps) => {
    if (!categories) return <p> loading </p>;
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
                <ParentDropDownCard actions={actions} category={category} />
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
    const [hideChildren, setHideChildren] = useState(false);

    return (
        <div className="flex w-full flex-col gap-5 bg-secondary-400 border-secondary-500 p-5">
            <CategoryCardContent
                category={category}
                actions={actions}
                isParent={true}
                hideChildren={hideChildren}
                setHideChildren={setHideChildren}
            />
            <div
                className={`flex flex-col gap-5 ml-10  ${
                    hideChildren ? "max-h-0" : "max-h-[100rem]"
                } duration-500 `}
            >
                {category.children?.map((category) => (
                    <CategoryCardContent
                        category={category}
                        actions={actions}
                        hideChildren={hideChildren}
                        isParent={false}
                        setHideChildren={setHideChildren}
                    />
                ))}
            </div>
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
    category: TCategory;
    setHideChildren: React.Dispatch<React.SetStateAction<boolean>>;
    hideChildren: boolean;
}) => {
    return (
        <div className="flex justify-between w-full">
            <div className="flex gap-2 items-center">
                <div
                    className={`size-10 rounded-full  relative flex justify-center items-center bg-slate-100  `}
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
                                Show SubCategories <Plus />{" "}
                            </>
                        )}{" "}
                    </Button>
                )}
            </div>
        </div>
    );
};
