"use client";
import React from "react";
import { TypeAnimation } from "react-type-animation";

const FooterSlogan = () => {
    return (
        <div className="flex items-center justify-center   ">
            <div className="flex gap-5 items-center">
                <div className="size-5 bg-red-500" />
                <p className="text-logo  text-red-500 font-roboto_mono">
                    <TypeAnimation
                        sequence={[
                            // Same substring at the start will only be typed out once, initially
                            "Interested?",
                            5000, // wait 1s before replacing "Mice" with "Hamsters"
                            "Lets get in touch",
                            5000,
                        ]}
                        wrapper="span"
                        speed={20}
                        repeat={Infinity}
                    />
                </p>
            </div>
        </div>
    );
};

export default FooterSlogan;
