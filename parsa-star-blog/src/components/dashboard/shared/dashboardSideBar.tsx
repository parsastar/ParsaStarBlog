"use client";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "../../ui/button";
import { logOutAction } from "@/server/actions/user/auth";
import { DoorClosed, DoorOpen } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { dashboardPages } from "@/constant/dashboard";
import Link from "next/link";

export function AppSidebar() {
    const router = useRouter();
    const pathname = usePathname();
    const logoutHandler = async () => {
        try {
            await logOutAction();
            toast.success("You've logged out successfully");
            router.push("/signin");
        } catch {
            toast.error("log out failed , try again later");
        }
    };
    return (
        <Sidebar collapsible="icon" className="font-roboto ">
            <SidebarHeader />
            <SidebarContent className="px-2">
                <SidebarGroup />
                <SidebarGroupContent>
                    <SidebarMenu className="flex flex-col gap-2">
                        {dashboardPages.map((page) => (
                            <SidebarMenuItem key={page.name}>
                                <SidebarMenuButton size={"md"} asChild>
                                    <Link
                                        className={`font-normal hover:!bg-primary-100 ${
                                            pathname == page.href &&
                                            "bg-primary-200"
                                        }    px-2 py-2 `}
                                        href={page.href}
                                    >
                                        <page.icon className="!size-[1.5rem] stroke-[1.7px]" />
                                        <span>{page.name}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroupContent>
                <SidebarGroup />
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenuItem>
                    <SidebarMenuButton size={"md"} asChild>
                        <Button
                            className="group group-data-[collapsible=icon]:justify-start hover:bg-red-400 active:bg-red-500 active:text-white hover:text-white"
                            onClick={logoutHandler}
                        >
                            <DoorClosed className="group-active:flex hidden !size-[1.5rem] stroke-[1.7px] " />
                            <DoorOpen className="group-active:hidden flex !size-[1.5rem] stroke-[1.7px]" />{" "}
                            Log out
                        </Button>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarFooter>
        </Sidebar>
    );
}
