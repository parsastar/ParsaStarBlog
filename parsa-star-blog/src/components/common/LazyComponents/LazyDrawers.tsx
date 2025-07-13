"use client";
import dynamic from "next/dynamic";
const UserDrawer = dynamic(
    () => import("@/components/dashboard/user/userDrawer"),
    {
        ssr: false,
    }
);

const CategoryDrawer = dynamic(
    () => import("@/components/dashboard/categories/categoryDrawer"),
    {
        ssr: false,
    }
);
export const LazyUserDrawer = () => {
    return <UserDrawer />;
};

export const LazyCategoryDrawer = () => {
    return <CategoryDrawer />;
};
