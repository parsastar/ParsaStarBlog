"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { TSignUpSchema, userFormSchema } from "@/types/user/schemas/formSchema";
import { LabelWrapper } from "../common/inputs/labelWrapper";
import { StyledInput } from "../common/inputs/styledInput";
import { Button } from "../ui/button";
import { m } from "motion/react";

import StatusCodes from "@/server/lib/constants";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { signUpAction } from "@/server/actions/user/auth";

const SignUpForm = () => {
    const methods = useForm<TSignUpSchema>({
        resolver: zodResolver(userFormSchema.auth.signUp),
    });
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = methods;
    const onSubmit: SubmitHandler<TSignUpSchema> = async (data) => {
        const { repeatPassword: _repeatPassword, ...otherFields } = data;
        try {
            const result = await signUpAction(otherFields);
            if (result.status !== StatusCodes.success) {
                return toast.error(result.message);
            }
            toast.success(result.message);
        } catch (error) {
            toast.error("something went wrong try again later");
        }
    };

    return (
        <form
            className="my-5 mx-2 lg:px-0 px-5 gap-10 flex flex-col lg:gap-6"
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className="flex w-full items-start gap-4">
                <LabelWrapper
                    index={0}
                    label="First name"
                    error={errors.firstName?.message?.toString()}
                >
                    <StyledInput
                        placeholder="Your firstName "
                        {...register("firstName")}
                    />
                </LabelWrapper>
                <LabelWrapper
                    index={1}
                    label="Last name"
                    error={errors.lastName?.message?.toString()}
                >
                    <StyledInput
                        placeholder="your lastName"
                        {...register("lastName")}
                    />
                </LabelWrapper>
            </div>
            <LabelWrapper
                index={2}
                label="Phone number"
                error={errors.phoneNumber?.message?.toString()}
            >
                <StyledInput
                    placeholder="0*********"
                    {...register("phoneNumber")}
                />
            </LabelWrapper>
            <LabelWrapper
                index={3}
                label="Email"
                error={errors.email?.message?.toString()}
            >
                <StyledInput placeholder="your_email@gmail.com" {...register("email")} />
            </LabelWrapper>
            <div className="flex items-start gap-4 w-full">
                <LabelWrapper
                    index={4}
                    label="Password"
                    error={errors.password?.message?.toString()}
                >
                    <StyledInput placeholder={"Your_password"} {...register("password")} />
                </LabelWrapper>
                <LabelWrapper
                    index={5}
                    label="Repeat password"
                    error={errors.repeatPassword?.message?.toString()}
                >
                    <StyledInput placeholder="Repeat_password" {...register("repeatPassword")} />
                </LabelWrapper>
            </div>
            <m.div
                initial={{ y: 20, opacity: 0 }}
                animate={{
                    y: 0,
                    opacity: 1,
                    transition: {
                        duration: 0.3,
                        delay: 6 * 0.1,
                        type: "spring",
                        damping: 30,
                        stiffness: 100,
                    },
                }}
                className="w-full"
            >
                <Button
                    disabled={isSubmitting}
                    className="font-roboto_mono w-full font-normal mt-5 !text-lg text-white bg-primary-900 hover:bg-primary-800 !p-8"
                >
                    {" "}
                    {isSubmitting ? (
                        <>
                            Singing Up
                            <Loader2 className="animate-spin" />
                        </>
                    ) : (
                        "Sing Up"
                    )}
                </Button>
            </m.div>
        </form>
    );
};

export default SignUpForm;
