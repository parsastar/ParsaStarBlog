"use client";
import React, { useEffect } from "react";
import { AnimatedText } from "../common/AnimatedText";
import { useAnimationControls } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

const AuthTitle = () => {
    const pathname = usePathname();
    const controls = useAnimationControls();
    useEffect(() => {
        controls.start("visible");
    }, [controls]);
    return (
        <div className="bg-secondary-500 w-[calc(100%-2px)] lg:py-0 py-10 lg:w-[calc(50%-4px)] translate-x-[1px] lg:translate-x-[2px] flex flex-col items-center justify-center gap-[5px] lg:gap-[-10px]">
            <AnimatedText
                controls={controls}
                duration={0.5}
                type="char"
                el={"h1"}
                text={pathname == "/signin" ? " Sign in" : " Sign up"}
                className="text-red-500 uppercase lg:text-[200px] md:text-[120px] sm:text-title  "
            />
            <p className="text-sm font-roboto_mono ">
                {" "}
                Already have an account?{" "}
                <Link
                    prefetch={true}
                    href={pathname == "/signin" ? "/signup" : "/signin"}
                    className="text-red-500 underline"
                >
                    {" "}
                    {pathname == "/signup" ? " Sign in" : " Sign in"}
                </Link>
            </p>
        </div>
    );
};

export default AuthTitle;
