import { TDashboardInputProps } from "@/components/dashboard/dashboardTypes";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import React from "react";
import { Path, useFormContext, PathValue } from "react-hook-form";

const SelectInput = <T extends Record<string, any>>({
    formKey,
    values,
    InputClassName,
    Icon,
    placeHolder,
}: TDashboardInputProps<T>["select"]) => {
    const { setValue, watch } = useFormContext<T>();
    return (
        <Select
            defaultValue="user"
            value={watch(formKey)}
            onValueChange={(value) => {
                setValue(formKey, value as PathValue<T, Path<T>>);
            }}
        >
            <SelectTrigger className={InputClassName}>
                <SelectValue placeholder={placeHolder} />
                {Icon && <Icon />}
            </SelectTrigger>
            <SelectContent className="w-fit font-roboto text-sm font-medium ">
                {values.map((value) => (
                    <SelectItem key={value.label} value={value.value}>
                        {value.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};

export default SelectInput;
