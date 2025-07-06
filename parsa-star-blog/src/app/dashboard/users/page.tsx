"use client";
import { LazyUserDrawer } from "@/components/common/LazyComponents/LazyDrawers";
import DashboardTitle from "@/components/dashboard/shared/dashboardTitle";
import Users from "@/components/dashboard/user/users";
import { Button } from "@/components/ui/button";
import { useUserDrawerStore } from "@/zustand/userDrawerStore";
import { Plus } from "lucide-react";
import React, { Suspense } from "react";

const Page = () => {
    const { setContent } = useUserDrawerStore();
    return (
        <div className="flex p-3 sm:p-5 rounded-xl bg-white mx-auto my-3 gap-5 flex-col w-[95svw] sm:w-[calc(100%-24px)] ">
            <DashboardTitle page="Users">
                <Button
                    onClick={() => setContent(undefined)}
                    size={"dashboardTitle"}
                    variant={"dashBoardTitle"}
                >
                    {" "}
                    Create User <Plus />
                </Button>
            </DashboardTitle>
            <Suspense>
                <Users />
            </Suspense>
            <LazyUserDrawer />
        </div>
    );
};

export default Page;
