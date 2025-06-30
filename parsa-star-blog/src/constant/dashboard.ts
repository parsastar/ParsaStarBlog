import { TUserRoles } from "@/types/user/shared";
import {
    LucideProps,
    SquareLibrary,
    Users,
    BadgeCheck,
    CircleUser,
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
        authorSection: {
            startPage: 1,
            pageSize: 20,
            sorting: "asc",
            search: undefined,
            role: "author" as TUserRoles,
        },
        ReaderSection: {
            startPage: 1,
            pageSize: 20,
            search: undefined,
            sorting: "asc",
            role: "author" as TUserRoles,
        },
    },
} as const;
