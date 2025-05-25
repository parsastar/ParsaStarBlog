"use client";
import { AnimatedText } from "@/components/AnimatedText";
import { SiteInfo } from "@/constant/general";
import { useAnimation, useInView } from "motion/react";
import React, { useEffect, useRef } from "react";

const BlogHead = () => {
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
            className="gridTwoBlocks flex  gap-5 flex-col h-fit bg-secondary-500  p-10"
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
            <AnimatedText
                text={"Catch Up on the Newest in"}
                el={"p"}
                type="word"
                animType="maxHeight"
                duration={0.5}
                controls={controls}
                className="text-title font-medium leading-[70px] text-center"
            />
            <div className="flex gap-2 w-full justify-center">
                <AnimatedText
                    text={SiteInfo.siteName}
                    el={"p"}
                    type="char"
                    totalDelay={0.2}
                    animType="opacity"
                    staggerDur={0.05}
                    duration={0.4}
                    controls={controls}
                    className="text-title uppercase text-red-500 font-medium leading-[70px] text-center"
                />
                <AnimatedText
                    text={"Website"}
                    el={"p"}
                    type="word"
                    totalDelay={0.5}
                    animType="maxHeight"
                    duration={0.4}
                    controls={controls}
                    className="text-title font-medium leading-[70px] text-center"
                />
            </div>
        </div>
    );
};

export default BlogHead;
