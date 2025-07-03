"use client";
import dynamic from "next/dynamic";
const UserDrawer = dynamic(
    () => import("@/components/dashboard/user/userDrawer"),
    {
        ssr: false,
    }
);

export const LazyUserDrawer = () => {
    return <UserDrawer />;
};
