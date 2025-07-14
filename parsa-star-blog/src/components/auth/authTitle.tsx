"use client";
import React, { useEffect } from "react";
import { AnimatedText } from "../common/AnimatedText";
import { useAnimationControls } from "framer-motion";
import Link from "next/link";

const AuthTitle = () => {
    const controls = useAnimationControls();
    useEffect(() => {
        controls.start("visible");
    }, [controls]);
    return (
        <div className="bg-secondary-500 w-[calc(50%-4px)] translate-x-[2px] flex flex-col items-center justify-center gap-[-10px]">
            <AnimatedText
                controls={controls}
                duration={0.5}
                type="char"
                el={"h1"}
                text={"sign up"}
                className="text-red-500 uppercase lg:text-[200px] sm:text-title  "
            />
            <p className="text-sm font-roboto_mono ">
                {" "}
                Already have an account?{" "}
                <Link href={"/signIn"} className="text-red-500 underline">
                    {" "}
                    Sign in
                </Link>
            </p>
        </div>
    );
};

export default AuthTitle;
