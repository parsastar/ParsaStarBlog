"use client";
import React from "react";
import { SidebarTrigger } from "../../ui/sidebar";
import { usePathname } from "next/navigation";

import Link from "next/link";

const DashboardHeader = () => {
    const pathname = usePathname();

    const generatePathArr = () => {
        const path: { href: string; label: string }[] = [];
        pathname
            .slice(1)
            .split("/")
            .map((page, index) => {
                const href =
                    path.length > 0 ? path[index - 1].href + "/" + page : page;
                path.push({ href: href, label: page });
            });

        return path;
    };

    return (
        <div className="w-full sticky top-0 z-10 flex items-center font-roboto text-sm bg-[#fafafa] p-2">
            <SidebarTrigger />
            <div className="flex mx-5 items-center gap-1">
                {generatePathArr().map((page, index) => (
                    <React.Fragment key={index}>
                        <Link
                            className={`text-gray-500 capitalize hover:text-gray-600 ${
                                index == generatePathArr().length - 1 &&
                                "text-gray-900 text-sm"
                            }`}
                            href={"/" + page.href}
                        >
                            {page.label}
                        </Link>
                        {index + 1 < generatePathArr().length && (
                            <p className="mx-1 text-gray-400">/</p>
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default DashboardHeader;
