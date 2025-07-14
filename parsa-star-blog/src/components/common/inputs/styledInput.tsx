import { Input } from "@/components/ui/input";

export const StyledInput = (
    props: React.InputHTMLAttributes<HTMLInputElement>
) => {
    return (
        <Input
            {...props}
            className="shadow-none border-none focus-visible:ring-0"
        />
    );
};
