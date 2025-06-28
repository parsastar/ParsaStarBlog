import React from "react";
import AuthTitle from "./authTitle";
import AnimatedLine from "../common/animatedLine";
import SignUpForm from "./signUpForm";

const SignUp = async () => {
    return (
        <div className="flex min-h-[80svh] lg:flex-row flex-col   w-full  mx-auto container">
            <AuthTitle />

            <div className="bg-secondary-500 translate-x-[.5px]   w-[calc(100%-1.5px)] lg:w-[calc(50%-1.5px)]  justify-center lg:translate-x-[4px] flex flex-col gap-5">
                <AnimatedLine />
                <SignUpForm />
                <AnimatedLine />
            </div>
        </div>
    );
};

export default SignUp;
