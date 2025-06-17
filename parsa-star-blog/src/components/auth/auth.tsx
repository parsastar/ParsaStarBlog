import React from "react";
import AuthTitle from "./authTitle";
import AnimatedLine from "../common/animatedLine";

const Auth = () => {
    return (
        <div className="flex min-h-[80svh] w-full  mx-auto container">
            <AuthTitle />

            <div className="bg-secondary-500 w-[calc(50%-4px)] translate-x-1 flex flex-col gap-0">
                <AnimatedLine />
                    
                <AnimatedLine />
            </div>
        </div>
    );
};

export default Auth;
