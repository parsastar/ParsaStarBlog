"use client";
import { AnimatedText } from "@/components/AnimatedText";
import { SiteInfo } from "@/constant/general";
import { useAnimation, useInView } from "motion/react";
import React, { useEffect, useRef } from "react";

const BlogTitle = () => {
    const controls = useAnimation();
    const ref = useRef(null);
    const isInView = useInView(ref, { amount: 0.3, once: true });
    useEffect(() => {
        if (!controls) {
            return;
        }
        if (isInView) {
            controls.start("visible");
        } else {
            controls.start("hidden");
        }
    }, [isInView, controls]);
    return (
        <div
            ref={ref}
            className=" w-full sm:w-[calc(50%-2px)] translate-x-[-.5px] flex  gap-5 flex-col h-fit bg-secondary-500 p-5  sm:p-2 lg:p-10"
        >
            <AnimatedText
                text={"blogs"}
                el={"h1"}
                type="word"
                animType="maxHeight"
                duration={0.4}
                controls={controls}
                className=" w-full uppercase text-center text-subtitle font-roboto_mono text-red-500"
            />
            <span className="sr-only">
                Catch Up on the Newest in {SiteInfo.siteName} WebsiteWebsite
            </span>
            <div className="gap-5 hidden sm:flex sm:flex-col ">
                <AnimatedText
                    text={["Catch Up on the Newest "]}
                    el={"p"}
                    type="word"
                    animType="maxHeight"
                    duration={0.5}
                    controls={controls}
                    className="text-logo sm:text-5xl lg:text-title font-medium leading-[30px] sm:leading-[50px] lg:leading-[70px] text-center"
                />
                <div className=" gap-2 flex w-full justify-center">
                    <AnimatedText
                        text={"in"}
                        el={"p"}
                        type="char"
                        totalDelay={0.2}
                        animType="opacity"
                        staggerDur={0.05}
                        duration={0.4}
                        controls={controls}
                        className="text-logo  sm:text-5xl lg:text-title font-medium leading-[30px] sm:leading-[50px] lg:leading-[70px] text-center"
                    />
                    <AnimatedText
                        text={SiteInfo.siteName}
                        el={"p"}
                        type="char"
                        totalDelay={0.2}
                        animType="opacity"
                        staggerDur={0.05}
                        duration={0.4}
                        controls={controls}
                        className="text-logo sm:text-5xl lg:text-title uppercase text-red-500 font-medium leading-[30px] sm:leading-[50px] lg:leading-[70px] text-center"
                    />
                    <AnimatedText
                        text={"Website"}
                        el={"p"}
                        type="word"
                        totalDelay={0.5}
                        animType="maxHeight"
                        duration={0.4}
                        controls={controls}
                        className="text-logo sm:text-5xl lg:text-title font-medium leading-[30px] sm:leading-[50px] lg:leading-[70px]  text-center"
                    />
                </div>
            </div>
            <div className="flex sm:hidden">
                <p className="text-logo text-center leading-[40px]">
                    {`Catch Up on the Newest in  ${SiteInfo.siteName} Website `}
                </p>
            </div>
        </div>
    );
};

export default BlogTitle;
