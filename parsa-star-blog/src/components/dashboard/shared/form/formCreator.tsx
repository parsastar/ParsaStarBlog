import { DefaultValues, FormProvider, useForm } from "react-hook-form";
import DashboardInputs from "./DashboardIntput";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, ZodTypeAny } from "zod";
import { TDashboardInputs } from "../../dashboardTypes";

// ---------- Types ----------
type ExtractZodType<T extends ZodTypeAny> = z.infer<T>;

type TFormCreatorProps<T extends ZodTypeAny> = {
    schema: T;
    onSubmit: (data: ExtractZodType<T>) => void | Promise<void>;
    inputRows: TDashboardInputs<ExtractZodType<T>>[][];
    defaultValues?: DefaultValues<ExtractZodType<T>>;
    className?: string;
};

// ---------- Main Component ----------
export const FormCreator = <T extends ZodTypeAny>({
    onSubmit,
    inputRows,
    schema,
    className,
    defaultValues,
}: TFormCreatorProps<T>) => {
    const methods = useForm<ExtractZodType<T>>({
        resolver: zodResolver(schema),
        defaultValues,
    });

    const {
        handleSubmit,
        formState: { isSubmitting, errors },
    } = methods;

    // Debug: see what values are being passed

    return (
        <FormProvider {...methods}>
            <form
                className={`flex font-roboto flex-col gap-5 ${className}`}
                onSubmit={handleSubmit(onSubmit)}
            >
                {inputRows.map((row, index) => (
                    <div key={index} className="w-full items-start flex gap-3">
                        {row.map((input) => (
                            <DashboardInputs key={input.label} {...input} />
                        ))}
                    </div>
                ))}
                <Button
                    disabled={isSubmitting}
                    size="lg"
                    className="w-full !py-7 flex items-center justify-center"
                >
                    {isSubmitting ? "Submitting" : "Submit"}
                    {isSubmitting && <Loader2 className="animate-spin ml-2" />}
                </Button>
            </form>
        </FormProvider>
    );
};
