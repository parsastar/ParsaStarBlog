"use client";
import React, { useEffect, useRef } from "react";
import FooterContent from "./footerCotent";
import FooterTitle from "./footerTitle";
import { useScroll } from "motion/react";

const Footer = () => {
    const containerRef = useRef<HTMLElement | null>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });
    useEffect(() => {
        const unsubscribe = scrollYProgress.on("change", (latest) => {
            console.log("scrollYProgress:", latest);
        });

        return () => unsubscribe(); // Clean up listener
    }, [scrollYProgress]);
    return (
        <footer
            ref={containerRef}
            className="flex relative z-[2] flex-col gap-0"
        >
            <div className="w-full h-[1px] bg-primary-500" />
            <div
                style={{
                    clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)",
                }}
                className="relative  h-[400px] bg-dark-green-500 w-full overflow-hidden"
            >
                <div className="fixed h-[400px] bottom-0 container left-1/2 -translate-x-1/2 flex flex-col   w-full gap-0">
                    <FooterContent />
                    <FooterTitle scrollYProgress={scrollYProgress} />
                </div>
            </div>
        </footer>
    );
};

export default Footer;
