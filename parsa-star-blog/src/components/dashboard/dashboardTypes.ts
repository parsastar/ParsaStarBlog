import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";
import { Path } from "react-hook-form";

type TBaseInput<T> = {
    formKey: Path<T>;
    placeHolder?: string;
    InputClassName?: string;
};
type TTextInput<T> = TBaseInput<T> & {
    type: "text";
};

type TTextAreaInput<T> = TBaseInput<T> & {
    type: "textArea";
};
type TSelectInput<T> = TBaseInput<T> & {
    type: "select";
    values: { label: string; value: string }[];
    Icon?: LucideIcon;
};

type TImageInput<T> = TBaseInput<T> & {
    type: "image";
    imageFile: Path<T>;
};

export type TInputs<T> =
    | TTextInput<T>
    | TTextAreaInput<T>
    | TImageInput<T>
    | TSelectInput<T>
    | {
          type: "custom";
          component: ReactNode;
          formKey: Path<T>;
      };

export type TDashboardInputs<T> = {
    wrapperClass?: string;
    input: TInputs<T>;
    label: string;
};

export type TDashboardInputProps<T> = {
    text: TTextInput<T>;
    textArea: TTextAreaInput<T>;
    image: TImageInput<T>;
    select: TSelectInput<T>;
};
