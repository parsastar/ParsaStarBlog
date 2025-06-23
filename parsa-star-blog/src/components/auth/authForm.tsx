"use client";
import { TPostUser } from "@/types/user/client/user";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../ui/input";
const AuthForm = () => {
    const methods = useForm<TPostUser>({
        // resolver: zodResolver(mySchema),
    });
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = methods;
    const onSubmit: SubmitHandler<TPostUser> = async (data) => {};

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex w-full items-center gap-2">
                <LabelWrapper
                    label="First name"
                    error={errors.firstName?.message?.toString()}
                >
                    <Input {...register("firstName")} />
                </LabelWrapper>
                <LabelWrapper
                    label="Last name"
                    error={errors.firstName?.message?.toString()}
                >
                    <Input {...register("firstName")} />
                </LabelWrapper>
            </div>
        </form>
    );
};

export default AuthForm;

const LabelWrapper = ({
    className,
    label,
    error,
    labelClass,
    errorClass,
    children,
}: {
    className?: string;
    children: React.ReactNode;
    label: string;
    labelClass?: string;
    errorClass?: string;
    error?: string;
}) => {
    return (
        <div className={`w-full flex flex-col gap-2  ${className}`}>
            <p className="text-description">{label}</p>
            {children}
            {error && (
                <p className="text-sm text-red-500 font-normal">{error}</p>
            )}
        </div>
    );
};
