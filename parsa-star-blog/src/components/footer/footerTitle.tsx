"use client";

import { useSpring, m, useTransform, MotionValue } from "motion/react";
import React from "react";
import "./footer.css";
import { SiteInfo } from "@/constant/general";
const FooterTitle = ({
    scrollYProgress,
}: {
    scrollYProgress: MotionValue<number>;
}) => {
    const CharList = SiteInfo.siteName.split("");
    const CharLength = CharList.length;
    const CharWidth = 130 / CharLength;
    const LineScaleX = useSpring(
        useTransform(scrollYProgress, [0, 0.2], [0, 1]),
        { stiffness: 80, damping: 30 }
    );

    return (
        <>
            <m.div
                style={{ scaleX: LineScaleX }}
                className="w-full shrink-0 origin-center grow-0 h-[1px] bg-primary-500"
            />
            <div className="w-full bg-secondary-500 h-full items-center -translate-x-[.5px]   box-border flex gap-0 ">
                {CharList.map((char, index) => (
                    <React.Fragment key={index}>
                        {index + 1 <= Math.ceil(CharLength / 2) && (
                            <FooterLine
                                CharLength={CharLength}
                                scrollYProgress={scrollYProgress}
                                index={index}
                            />
                        )}
                        <LogoChar
                            index={index}
                            CharLength={CharLength}
                            scrollYProgress={scrollYProgress}
                            width={CharWidth}
                            char={char}
                        />

                        {index + 1 >= Math.ceil(CharLength / 2) && (
                            <FooterLine
                                CharLength={CharLength}
                                scrollYProgress={scrollYProgress}
                                index={index}
                            />
                        )}
                    </React.Fragment>
                ))}
            </div>
            <div className="w-full shrink-0 grow-0 h-[1px] bg-primary-500" />
        </>
    );
};

export default FooterTitle;

const LogoChar = ({
    char,
    width,
    scrollYProgress,
    CharLength,
    index,
}: {
    char: string;
    CharLength: number;
    index: number;
    width: number;
    scrollYProgress: MotionValue<number>;
}) => {
    const bgPosY = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

    // Apply spring animation to the numeric value
    const springBgPosY = useSpring(bgPosY, {
        stiffness: 80,
        damping: 30 + Math.abs(index - Math.floor(CharLength / 2)) * 5,
    });

    // Compose string for backgroundPosition style with spring value
    // Multiply by 100 to get percentage
    const backgroundPosition = useTransform(
        springBgPosY,
        (v) => `0% ${v * 100}%`
    );

    return (
        <div
            style={{
                width: `${width}vw`,
                fontSize: `${width}vw`,
            }}
            className="  text-center"
        >
            <m.p
                style={{
                    height: `${width * 1.3}vw`,
                    backgroundPosition,
                }}
                className={`animated-text z-[3]  relative  uppercase`}
            >
                {char}
            </m.p>
        </div>
    );
};

const FooterLine = ({
    index,
    scrollYProgress,
    CharLength,
}: {
    index: number;
    CharLength: number;
    scrollYProgress: MotionValue<number>;
}) => {
    const scaleY = useSpring(useTransform(scrollYProgress, [0, 0.2], [0, 1]), {
        stiffness: 80,
        damping: 30 + Math.abs(index - Math.floor(CharLength / 2)) * 2,
    });
    return (
        <m.div
            style={{ height: `100%`, scaleY: scaleY }}
            className="w-[1px]  z-[4] origin-top h-full flex-shrink-0 flex-grow-0 relative bg-primary-500"
        />
    );
};
