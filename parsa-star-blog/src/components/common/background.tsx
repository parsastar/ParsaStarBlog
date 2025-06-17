"use client";
import {
    m,
    MotionValue,
    useScroll,
    useSpring,
    useTransform,
} from "motion/react";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

const Background = () => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });
    const [backGroundHeight, setBackgroundHeight] = useState<number | null>(
        null
    );
    const linesPositions = [0, 300, 600, 900, 1200];
    const pathname = usePathname();
    useEffect(() => {
        const updateHeight = () => {
            const windowHeight = document.body.offsetHeight;
            setBackgroundHeight(windowHeight);
        };

        updateHeight(); // Set initial height
        window.addEventListener("resize", updateHeight); // Update on resize

        return () => {
            window.removeEventListener("resize", updateHeight); // Cleanup
        };
    }, []);
    useEffect(() => {
        const updateHeight = () => {
            const windowHeight = document.body.offsetHeight;
            setBackgroundHeight(windowHeight);
        };

        updateHeight(); // Set initial height
    }, [pathname]);

    return (
        <div
            style={{ height: backGroundHeight || "100svh" }}
            ref={containerRef}
            className="absolute left-1/2 -translate-x-1/2 top-0 w-full container h-[400svh] z-[-1]"
        >
            <m.svg
                className="w-full h-full overflow-visible"
                preserveAspectRatio="none"
                viewBox="0 0 1201 2718"
            >
                {linesPositions.map((line, index) => (
                    <GridLines
                        key={index}
                        index={index}
                        line={line}
                        scrollYProgress={scrollYProgress}
                    />
                ))}
            </m.svg>
        </div>
    );
};

export default Background;

interface GridLineProps {
    index: number;
    line: number;
    scrollYProgress: MotionValue<number>;
}

const GridLines: React.FC<GridLineProps> = ({
    index,
    line,
    scrollYProgress,
}) => {
    const strokeDashoffset = useSpring(
        useTransform(scrollYProgress, [0, 0.65], [2718, 0]),
        {
            stiffness: 80,
            damping: 30 + Math.abs(index - 2) * 5,
        }
    );

    return (
        <m.line
            strokeDasharray="2718 2718"
            strokeDashoffset={strokeDashoffset}
            x1={line}
            x2={line}
            y1="0"
            y2="2718"
            stroke="#A0A0A0"
            strokeWidth="1px"
        />
    );
};
