import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import React from "react";
import { Controller, Path, useFormContext } from "react-hook-form";
import { TDashboardInputProps } from "@/components/dashboard/dashboardTypes";

const SelectInput = <T extends Record<string, any>>({ // eslint-disable-line @typescript-eslint/no-explicit-any 
    formKey,
    values,
    InputClassName,
    Icon,
    placeHolder,
}: TDashboardInputProps<T>["select"]) => {
    const { control } = useFormContext<T>();

    return (
        <Controller
            control={control}
            name={formKey as Path<T>}
            render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className={InputClassName}>
                        <SelectValue placeholder={placeHolder} />
                        {Icon && <Icon />}
                    </SelectTrigger>
                    <SelectContent className="w-fit font-roboto text-sm font-medium">
                        {values.map((value) => (
                            <SelectItem key={value.value} value={value.value}>
                                {value.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            )}
        />
    );
};

export default SelectInput;
