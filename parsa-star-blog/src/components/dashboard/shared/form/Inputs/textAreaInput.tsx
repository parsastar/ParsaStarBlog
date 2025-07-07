import { TDashboardInputProps } from "@/components/dashboard/dashboardTypes";
import { Textarea } from "@/components/ui/textarea";
import React from "react";
import {  useFormContext } from "react-hook-form";

const TextAreaInput = <T extends Record<string, any>>({  // eslint-disable-line @typescript-eslint/no-explicit-any 
    InputClassName,
    formKey,
    placeHolder
}: TDashboardInputProps<T>["textArea"]) => {  
    const { register } = useFormContext<T>();
    return <Textarea placeholder={placeHolder} className={InputClassName} {...register(formKey)} />;
};

export default TextAreaInput;
