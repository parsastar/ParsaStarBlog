"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { TSignUpSchema, userFormSchema } from "@/types/user/schemas/formSchema";
import { LabelWrapper } from "../common/inputs/labelWrapper";
import { StyledInput } from "../common/inputs/styledInput";
import { Button } from "../ui/button";
import { m } from "motion/react";

const AuthForm = () => {
    const methods = useForm<TSignUpSchema>({
        resolver: zodResolver(userFormSchema.auth.signUp),
    });
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = methods;
    const onSubmit: SubmitHandler<TSignUpSchema> = async (data) => {};

    return (
        <form
            className="my-5 mx-2 flex flex-col gap-6"
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className="flex w-full items-start gap-4">
                <LabelWrapper
                    index={0}
                    label="First name"
                    error={errors.firstName?.message?.toString()}
                >
                    <StyledInput {...register("firstName")} />
                </LabelWrapper>
                <LabelWrapper
                    index={1}
                    label="Last name"
                    error={errors.firstName?.message?.toString()}
                >
                    <StyledInput {...register("firstName")} />
                </LabelWrapper>
            </div>
            <LabelWrapper
                index={2}
                label="Phone number"
                error={errors.phoneNumber?.message?.toString()}
            >
                <StyledInput {...register("phoneNumber")} />
            </LabelWrapper>
            <div className="flex items-start gap-4 w-full">
                <LabelWrapper
                    index={3}
                    label="Password"
                    error={errors.password?.message?.toString()}
                >
                    <StyledInput {...register("password")} />
                </LabelWrapper>
                <LabelWrapper
                    index={4}
                    label="Repeat password"
                    error={errors.repeatPassword?.message?.toString()}
                >
                    <StyledInput {...register("repeatPassword")} />
                </LabelWrapper>
            </div>
            <m.div
                initial={{ y: 20, opacity: 0 }}
                animate={{
                    y: 0,
                    opacity: 1,
                    transition: {
                        duration: 0.3,
                        delay: 5 * 0.1,
                        type: "spring",
                        damping: 30,
                        stiffness: 100,
                    },
                }}
                className="w-full"
            >
                <Button className="font-roboto_mono w-full font-normal mt-5 !text-lg text-white bg-primary-900 hover:bg-primary-800 !p-8">
                    {" "}
                    Sing Up{" "}
                </Button>
            </m.div>
        </form>
    );
};

export default AuthForm;
