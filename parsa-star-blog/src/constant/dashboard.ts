import { TUserRoles } from "@/types/user/shared";
import {
    LucideProps,
    SquareLibrary,
    Users,
    BadgeCheck,
    CircleUser,
    Boxes,
} from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

type TDashboardPages = {
    name: string;
    roles: TUserRoles[];
    href: string;
    icon: ForwardRefExoticComponent<
        Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
    >;
}[];

export const dashboardPages: TDashboardPages = [
    {
        name: "Users",
        roles: ["admin"],
        href: "/dashboard/users",
        icon: Users,
    },
    {
        name: "Profile",
        roles: ["admin", "author", "user"],
        href: "/dashboard/profile",
        icon: CircleUser,
    },
    {
        name: "Blogs",
        roles: ["admin", "author", "user"],
        href: "/dashboard/blogs",
        icon: SquareLibrary,
    },
    {
        name: "Categories",
        roles: ["admin"],
        href: "/dashboard/categories",
        icon: Boxes,
    },
    {
        name: "getAuthor",
        roles: ["admin", "user"],
        href: "/dashboard/getAuthor",
        icon: BadgeCheck,
    },
];

export const sortArray: TSort[] = ["asc", "dsc"];
export type TSort = "asc" | "dsc";

export const DashboardPagesDefaults = {
    users: {
        startPage: 1,
        pageSize: 20,
        search: undefined,
        sorting: "dsc",
        role: null as TUserRoles | null,
    },
} as const;
