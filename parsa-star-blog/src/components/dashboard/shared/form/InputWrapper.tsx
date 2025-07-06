import React from "react";

const InputWrapper = ({
    label,
    WrapperClass,
    children,
    error,
    errorClass,
    labeClass,
}: {
    label: string;
    error?: string;
    WrapperClass?: string;
    errorClass?: string;
    labeClass?: string;
    children: React.ReactNode;
}) => {
    return (
        <div
            className={`w-full flex flex-col gap-1  font-roboto ${WrapperClass}`}
        >
            <p
                className={`text-sm font-medium text-secondary-800 ${labeClass}`}
            >
                {label}
            </p>
            {children}
            {error && (
                <p className={`text-sm font-normal text-red-500 ${errorClass}`}>
                    {error}
                </p>
            )}
        </div>
    );
};

export default InputWrapper;
