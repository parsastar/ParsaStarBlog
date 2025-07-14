"use client";
import { LazyCategoryDrawer } from "@/components/common/LazyComponents/LazyDrawers";
import Categories from "@/components/dashboard/categories/categories";
import DashboardTitle from "@/components/dashboard/shared/dashboardTitle";
import { Button } from "@/components/ui/button";
import { useCategoryDrawerStore } from "@/zustand/categoryDrawerStore";
import { Plus } from "lucide-react";
import React from "react";

const Page = () => {
    const { setContent } = useCategoryDrawerStore();
    return (
        <div className="flex p-3 sm:p-5 rounded-xl min-h-[calc(100svh-70px)] bg-white mx-auto my-3 gap-5 flex-col w-[95svw] sm:w-[calc(100%-24px)] ">
            <DashboardTitle page="Categories">
                <Button
                    onClick={() => setContent(undefined)}
                    size={"dashboardTitle"}
                    variant={"dashBoardTitle"}
                >
                    {" "}
                    Create Category <Plus />
                </Button>
            </DashboardTitle>
            <Categories />
            <LazyCategoryDrawer />
        </div>
    );
};

export default Page;
