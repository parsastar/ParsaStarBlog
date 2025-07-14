"use client";
import Link from "next/link";
import React from "react";
import { m } from "motion/react";
import { Pages, SiteInfo } from "@/constant/general";
import { Sparkle } from "lucide-react";
import { usePathname } from "next/navigation";

const Header = () => {
    const pathname = usePathname();
    return (
        <header className="w-screen sticky  z-[100] left-0 top-0 flex bg-secondary-500 justify-center border-b border-[#A0A0A0]">
            <div className="w-full relative flex  items-center container  py-3 sm:p-3 px-2 sm:px-5">
                <HeaderBackground />
                <Link
                    className="text-red-500 w-full uppercase font-semibold sm:text-blogTitle text-xl lg:text-logo   z-10 "
                    href="/"
                >
                    {SiteInfo.siteName}
                </Link>
                {Pages.map((page) => (
                    <Link
                        key={page.href}
                        className={` w-full uppercase hover:text-red-300 text-center duration-200 font-semibold sm:text-blogTitle text-xl lg:text-logo   z-10 ${
                            pathname == page.href
                                ? "text-red-500 "
                                : "text-black"
                        } `}
                        href={page.href}
                    >
                        {page.name}
                    </Link>
                ))}
                <div className="w-full flex justify-end text-red-500">
                    <Sparkle className="fill-red-500 !size-5 !sm:size-8 lg:!size-10" />
                </div>
            </div>
        </header>
    );
};

export default Header;

const HeaderBackground = () => {
    const linesPositions = [0, 300, 600, 900, 1200];
    return (
        <div className="absolute inset-0 h-full w-full ">
            <m.svg
                className="w-full h-full overflow-visible"
                preserveAspectRatio="none"
                viewBox="0 0 1201 2718"
            >
                {linesPositions.map((line, index) => (
                    <m.line
                        key={index}
                        strokeDasharray="2718 2718"
                        initial={{ strokeDashoffset: 2718 }}
                        animate={{
                            strokeDashoffset: 0,
                            transition: {
                                duration: 0.1,
                                stiffness: 80,
                                damping: 30 + Math.abs(index - 2) * 5,
                            },
                        }}
                        x1={line}
                        x2={line}
                        y1="0"
                        y2="2718"
                        stroke="#A0A0A0"
                        strokeWidth="1px"
                    />
                ))}
            </m.svg>
        </div>
    );
};
