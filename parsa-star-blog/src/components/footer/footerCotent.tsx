import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import FooterSlogan from "./footerSlogan";
import { Pages, Socials } from "@/constant/general";

const FooterContent = () => {
    return (
        <div className="flex w-full container mx-auto p-0 items-stretch gap-1  justify-center sm:gap-0">
            <div className=" p-3 lg:p-5 flex items-center justify-start    w-full  bg-secondary-500 sm:bg-transparent   sm:w-[calc(25%-2px)]">
                <QuickLinks />
            </div>
            <div className=" py-10 hidden sm:flex items-center justify-center  w-[calc(50%-2px)] shrink-0 grow-0 translate-x-[-.5px] bg-secondary-500 ">
                <FooterSlogan />
            </div>
            <div className=" p-3 lg:p-5 flex items-center justify-end  w-full bg-secondary-500 sm:bg-transparent   sm:w-[calc(25%-2px)]">
                <Social />
            </div>
        </div>
    );
};

export default FooterContent;

const QuickLinks = () => {
    return (
        <div className="flex font-roboto_mono   flex-col   gap-2  ">
            <p className="font-normal text-description text-darkGrey-500">
                Quick Links :{" "}
            </p>
            <div className="flex gap-5 items-center">
                {Pages.map((page) => (
                    <Link
                        key={page.href}
                        href={page.href}
                        className=" text-description sm:text-subtitle uppercase font-bold"
                    >
                        {page.name}
                    </Link>
                ))}
            </div>
        </div>
    );
};

const Social = () => {
    return (
        <div className="flex font-roboto_mono  items-end  flex-col   gap-2  ">
            {Socials.map((social) => (
                <Link
                    key={social.href}
                    href={social.href}
                    className="text-description lg:text-subtitle hover:underline uppercase font-bold flex gap-1 items-center"
                >
                    {social.name}
                    <ArrowUpRight />
                </Link>
            ))}
        </div>
    );
};