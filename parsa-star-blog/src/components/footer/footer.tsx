"use client";
import React, { useEffect, useRef } from "react";

import { useScroll } from "motion/react";

const Footer = () => {
    return (
        <footer className="flex relative z-[2] flex-col gap-0">
            <div className="w-full h-[1px] bg-primary-500" />
            <div
                style={{
                    clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)",
                }}
                className="relative  h-[400px] bg-dark-green-500 w-full overflow-hidden"
            >
                <div className="fixed h-[400px] bottom-0 container left-1/2 -translate-x-1/2 flex flex-col   w-full gap-0">
                    footer
                </div>
            </div>
        </footer>
    );
};

export default Footer;
