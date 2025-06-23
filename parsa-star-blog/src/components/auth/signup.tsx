import React, { Suspense } from "react";
import AuthTitle from "./authTitle";
import AnimatedLine from "../common/animatedLine";
import AuthForm from "./authForm";

const Auth = async () => {
    return (
        <div className="flex min-h-[80svh] w-full  mx-auto container">
            <AuthTitle />

            <div className="bg-secondary-500 w-[calc(50%-4px)] translate-x-1 flex flex-col gap-0">
                <AnimatedLine />
                <AuthForm />

                <AnimatedLine />
            </div>
        </div>
    );
};

export default Auth;
