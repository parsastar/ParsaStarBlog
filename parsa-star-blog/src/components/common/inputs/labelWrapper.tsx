import { m } from "motion/react";

export const LabelWrapper = ({
    className,
    label,
    error,
    index = 0,
    labelClass,
    errorClass,
    children,
}: {
    className?: string;
    children: React.ReactNode;
    label: string;
    labelClass?: string;
    index?: number;
    errorClass?: string;
    error?: string;
}) => {
    return (
        <div
            className={`w-full flex flex-col gap-1 font-roboto_mono group  ${className}`}
        >
            <m.p
                initial={{ y: 10, opacity: 0 }}
                animate={{
                    y: 0,
                    opacity: 1,
                    transition: {
                        duration: 0.3,
                        delay: index * 0.1,
                        type: "spring",
                        damping: 30,
                        stiffness: 100,
                    },
                }}
                className={`text-description  ${labelClass}`}
            >
                {label} :
            </m.p>
            <div className="flex flex-col gap-1">
                {children}{" "}
                <m.div
                    initial={{ scaleX: 0 }}
                    animate={{
                        scaleX: 1,
                        transition: {
                            duration: 0.5,
                            delay: index * 0.1,
                            type: "spring",
                            damping: 30,
                            stiffness: 100,
                        },
                    }}
                    className="w-full h-[2px] relative origin-left bg-primary-500 transform"
                >
                    <div className="absolute left-0 top-0 scale-x-0 w-full h-full bg-red-500 origin-left group-focus-within:scale-x-100 transition-all duration-1000 " />
                </m.div>
            </div>
            {error && (
                <p className={`text-sm text-red-500 font-normal ${errorClass}`}>
                    {error}
                </p>
            )}
        </div>
    );
};
