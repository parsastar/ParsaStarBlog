import React from "react";
import AuthTitle from "./authTitle";
import AnimatedLine from "../common/animatedLine";
import AuthForm from "./authForm";

const Auth = async () => {
    return (
        <div className="flex min-h-[80svh]  w-full  mx-auto container">
            <AuthTitle />

            <div className="bg-secondary-500 w-[calc(50%-1.5px)]  justify-center translate-x-[4px] flex flex-col gap-5">
                <AnimatedLine />
                <AuthForm />

                <AnimatedLine />
            </div>
        </div>
    );
};

export default Auth;
