"use client";

import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer";

import { Button } from "@/components/ui/button";

import UserForm from "./userForm";
import { X } from "lucide-react";
import { useUserDrawerStore } from "@/zustand/userDrawerStore";

const UserDrawer = () => {
    const { isOpen, setClose, selectedUser } = useUserDrawerStore();
    return (
        <Drawer open={isOpen} onOpenChange={isOpen ? setClose : undefined}>
            <DrawerContent onEscapeKeyDown={setClose}>
                <div className="container  mx-auto flex flex-col gap-5">
                    <DrawerHeader className="w-full font-roboto flex items-center justify-between p-0">
                        <DrawerTitle>
                            {selectedUser
                                ? `Edit ${selectedUser.first_name}`
                                : "Create New User"}
                        </DrawerTitle>
{/* fake commot  */}
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
                        <UserForm selectedUser={selectedUser} />
                    </div>
                </div>
            </DrawerContent>
        </Drawer>
    );
};

export default UserDrawer;
