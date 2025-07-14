"use client";
import React from "react";

const DashboardTitle = ({
    page,
    children,
}: {
    page: string;
    children?: React.ReactNode;
}) => {
    return (
        <div className="flex items-center font-roboto w-full justify-between">
            <h1 className="text-logo font-semibold "> {page} </h1>
            {children}
        </div>
    );
};

export default DashboardTitle;
