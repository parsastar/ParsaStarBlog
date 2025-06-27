"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { TSignInSchema, userFormSchema } from "@/types/user/schemas/formSchema";
import { LabelWrapper } from "../common/inputs/labelWrapper";
import { StyledInput } from "../common/inputs/styledInput";
import { Button } from "../ui/button";
import { m } from "motion/react";

import StatusCodes from "@/server/lib/constants";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { SignInAction } from "@/server/actions/user/auth";


const SingInForm = () => {
    const methods = useForm<TSignInSchema>({
        resolver: zodResolver(userFormSchema.auth.logIn),
    });
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = methods;
    const onSubmit: SubmitHandler<TSignInSchema> = async (data) => {
        try {
            const result = await SignInAction(data);
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
            className="my-5 mx-2 flex flex-col gap-6"
            onSubmit={handleSubmit(onSubmit)}
        >
            <LabelWrapper
                index={0}
                label="Email"
                error={errors.email?.message?.toString()}
            >
                <StyledInput
                    placeholder="Your_Email@gmail.com"
                    {...register("email")}
                />
            </LabelWrapper>
            <LabelWrapper
                index={1}
                label="Password"
                error={errors.password?.message?.toString()}
            >
                <StyledInput
                    placeholder="Your_Password@1380"
                    {...register("password")}
                />
            </LabelWrapper>

            <m.div
                initial={{ y: 20, opacity: 0 }}
                animate={{
                    y: 0,
                    opacity: 1,
                    transition: {
                        duration: 0.3,
                        delay: 3 * 0.1,
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
                            Singing In
                            <Loader2 className="animate-spin" />
                        </>
                    ) : (
                        "Sing In"
                    )}
                </Button>
            </m.div>
        </form>
    );
};

export default SingInForm;
