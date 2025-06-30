"use client";
import DashboardTitle from "@/components/dashboard/shared/dashboardTitle";
import Authors from "@/components/dashboard/user/authors";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import React from "react";

const Page = () => {
    return (
        <div className="flex p-5 rounded-xl bg-white mx-auto my-3 gap-5 flex-col w-[calc(100%-24px)] ">
            <DashboardTitle page="Users">
                <Button size={"dashboardTitle"} variant={"dashBoardTitle"}>
                    {" "}
                    Create User <Plus />
                </Button>
            </DashboardTitle>
            <Authors />
        </div>
    );
};

export default Page;
