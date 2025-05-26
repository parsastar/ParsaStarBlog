"use client";
import { useScroll, m, useSpring, useTransform } from "motion/react";
import React, { useRef } from "react";

const AnimatedLine = ({
    damping = 30,
    forceDraw = false,
}: {
    damping?: number;
    forceDraw?: boolean;
}) => {
    const container = useRef<HTMLDivElement | null>(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start end", "end start"],
    });
    const LineScaleX = useSpring(
        useTransform(scrollYProgress, [0, forceDraw ? 0.001 : 0.1], [0, 1]),
        { stiffness: 80, damping }
    );
    return (
        <div className="flex relative  w-full h-fit flex-col items-center  gap-0">
            <div
                className="h-[20vh] absolute top-0 z-[-10 ]  w-full"
                ref={container}
            />
            <m.div
                style={{ scaleX: LineScaleX }}
                className="w-[calc(100%-1px)] origin-center mx-auto h-[1px] bg-primary-500 z-[4] relative"
            />
        </div>
    );
};

export default AnimatedLine;
