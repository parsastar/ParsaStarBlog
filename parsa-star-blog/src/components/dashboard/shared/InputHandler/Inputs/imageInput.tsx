import { TDashboardInputProps } from "@/components/dashboard/dashboardTypes";
import { Input } from "@/components/ui/input";
import React from "react";
import { useFormContext } from "react-hook-form";

const ImageInput = <T extends Record<string, any>>({
    InputClassName,
    formKey,
    imageFile,
}: TDashboardInputProps<T>["image"]) => {
    const { register } = useFormContext<T>();
    return <Input className={InputClassName} {...register(formKey)} />;
};

export default ImageInput;
