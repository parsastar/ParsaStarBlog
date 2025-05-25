"use client";
import Link from "next/link";
import React from "react";
import { m } from "motion/react";
import { SiteInfo } from "@/constant/general";
const Header = () => {
    return (
        <div className="w-screen sticky  z-[100] left-0 top-0 flex bg-secondary-500 justify-center border-b border-[#A0A0A0]">
            <div className="w-full relative flex gap-10 items-center container  p-3 px-5">
                <HeaderBackground />
                <Link
                    className="text-red-500 uppercase font-semibold text-logo z-10 "
                    href="/"
                >
                    {SiteInfo.siteName}
                </Link>
            </div>
        </div>
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
