import React from "react";
import { useFormContext, FieldErrors, Path } from "react-hook-form";
import InputWrapper from "../../shared/InputHandler/InputWrapper";
import { Input } from "@/components/ui/input";

// Generic type T for form schema
type TRows<T> = { label: string; key: Path<T> }[];

type RowTextInputsProps<T> = {
    Rows: TRows<T>;
};

const RowTextInputs = <T extends Record<string, any>>({
    Rows,
}: RowTextInputsProps<T>) => {
    const {
        register,
        formState: { errors },
    } = useFormContext<T>();

    return (
        <div className="w-full items-start flex gap-3">
            {Rows.map((row) => (
                <InputWrapper
                    key={row.key}
                    label={row.label}
                    error={
                        (errors as FieldErrors<T>)[row.key]?.message as string
                    }
                >
                    <Input {...register(row.key)} />
                </InputWrapper>
            ))}
        </div>
    );
};

export default RowTextInputs;
