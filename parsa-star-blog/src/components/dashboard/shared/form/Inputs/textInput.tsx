import { TDashboardInputProps } from "@/components/dashboard/dashboardTypes";
import { Input } from "@/components/ui/input";
import React from "react";
import { useFormContext } from "react-hook-form";

const TextInput = <T extends Record<string, any>>({  // eslint-disable-line @typescript-eslint/no-explicit-any 
    InputClassName,
    formKey,
    placeHolder,
}: TDashboardInputProps<T>["text"]) => {
    const { register } = useFormContext<T>();
    return (
        <Input
            placeholder={placeHolder}
            className={InputClassName}
            {...register(formKey)}
        />
    );
};

export default TextInput;
