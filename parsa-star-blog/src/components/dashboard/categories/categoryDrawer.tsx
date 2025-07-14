"use client";

import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer";

import { Button } from "@/components/ui/button";

import { X } from "lucide-react";
import { useCategoryDrawerStore } from "@/zustand/categoryDrawerStore";
import CategoryForm from "./categoryForm";

const CategoryDrawer = () => {
    const { isOpen, setClose, selectedCategory, ParentId } =
        useCategoryDrawerStore();
    return (
        <Drawer open={isOpen} onOpenChange={isOpen ? setClose : undefined}>
            <DrawerContent onEscapeKeyDown={setClose}>
                <div className="container  mx-auto flex flex-col gap-5">
                    <DrawerHeader className="w-full font-roboto flex items-center justify-between p-0">
                        <DrawerTitle>
                            {selectedCategory
                                ? `Edit ${selectedCategory.name}`
                                : "Create New Category"}
                        </DrawerTitle>
                        <Button
                            aria-label="close form"
                            onClick={setClose}
                            className="p-5 aspect-square"
                        >
                            <X className="size-24" />
                        </Button>
                    </DrawerHeader>
                    <div className="w-full  h-[1px] bg-primary-500 " />
                    <div
                        data-lenis-prevent
                        className="max-h-[75svh] px-1 pb-10 overflow-y-auto overflow-x-visible"
                    >
                        <CategoryForm
                            ParentId={ParentId}
                            selectedCategory={selectedCategory}
                        />
                    </div>
                </div>
            </DrawerContent>
        </Drawer>
    );
};

export default CategoryDrawer;
