import React from "react";
import { FieldErrors, useFormContext } from "react-hook-form";
import InputWrapper from "./InputWrapper";
import { TDashboardInputs } from "../../dashboardTypes";
import TextInput from "./Inputs/textInput";
import TextAreaInput from "./Inputs/textAreaInput";
import SelectInput from "./Inputs/selectInput";
import ImageInput from "./Inputs/imageInput";

const DashboardInputs = <T extends Record<string, any>>( // eslint-disable-line @typescript-eslint/no-explicit-any
    props: TDashboardInputs<T>
) => {
    const { label, wrapperClass, input } = props;
    const {
        formState: { errors },
    } = useFormContext<T>();
    const chooseInput = () => {
        switch (input.type) {
            case "text":
                return <TextInput {...input} />;
            case "textArea":
                return <TextAreaInput {...input} />;
            case "select":
                return <SelectInput {...input} />;
            case "image":
                return <ImageInput {...input} />;
            default:
                return <div>hey</div>;
        }
    };
    return (
        <InputWrapper
            label={label}
            WrapperClass={wrapperClass}
            error={(errors as FieldErrors<T>)[input.formKey]?.message as string}
        >
            {chooseInput()}
        </InputWrapper>
    );
};

export default DashboardInputs;
