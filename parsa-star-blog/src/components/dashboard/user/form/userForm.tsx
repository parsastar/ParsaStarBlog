import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
    TCreateUserSchema,
    userFormSchema,
} from "@/types/user/schemas/formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { postUserAction, putUserAction } from "@/server/actions/user/user";
import StatusCodes from "@/server/lib/constants";
import { queryClient } from "@/app/provider";
import { queryKeys } from "@/constant/querykeys";
import InputWrapper from "../../shared/InputHandler/InputWrapper";
import { Textarea } from "@/components/ui/textarea";
import { userRolesArray } from "@/types/user/shared";
import { TUserWithoutPassword } from "@/types/user/api";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { TDashboardInputs } from "../../dashboardTypes";
import DashboardInputs from "../../shared/InputHandler/DashboardIntput";

const UserForm = ({
    selectedUser,
}: {
    selectedUser?: TUserWithoutPassword;
}) => {
    const methods = useForm<TCreateUserSchema>({
        resolver: zodResolver(userFormSchema.admin.create),
        defaultValues: selectedUser,
    });
    const {
        formState: { errors, isSubmitting },
        setValue,
        register,
        handleSubmit,
        watch,
    } = methods;
    const onSubmit = async (data: TCreateUserSchema) => {
        try {
            const res = selectedUser
                ? await putUserAction({
                      ...data,
                      id: selectedUser.id,
                  })
                : await postUserAction(data);

            if (res.status !== StatusCodes.success) {
                console.log(res.message);
                return toast.error("some thing went wrong ");
            }
            await Promise.all([
                selectedUser &&
                    queryClient.invalidateQueries({
                        queryKey: [queryKeys.users.get, selectedUser.id],
                    }),
                queryClient.invalidateQueries({
                    queryKey: [queryKeys.users.getList],
                }),
            ]);
            return toast.success(res.message);
        } catch (error) {
            toast.error("some thing went wrong ");
        }
    };

    const Rows: TDashboardInputs<TCreateUserSchema>[][] = [
        [
            {
                label: "First Name",
                input: { formKey: "first_name", type: "text" },
            },
            {
                label: "Last Name",
                input: { formKey: "last_name", type: "text" },
            },
        ],
        [
            {
                label: "Phone Number ",
                input: { formKey: "phone_number", type: "text" },
            },
            { label: "Email", input: { formKey: "email", type: "text" } },
        ],
        [
            { label: "Email", input: { formKey: "email", type: "text" } },
            {
                label: "About ",
                input: {
                    InputClassName: "min-h-[150px] w-full",
                    formKey: "about",
                    type: "textArea",
                },
                wrapperClass: "flex-1 w-full ",
            },
        ],
        [
            {
                label: "Role",
                input: {
                    formKey: "role",
                    values: userRolesArray.map((role) => ({
                        label: role,
                        value: role,
                    })),
                    placeHolder: "Role",
                    type: "select",
                },
            },
            {
                label: "Linkdin",
                input: { formKey: "socials.linkedin", type: "text" },
            },
            {
                label: "Twitter",
                input: { formKey: "socials.twitter", type: "text" },
            },
            {
                label: "Instagram",
                input: { formKey: "socials.instagram", type: "text" },
            },
        ],
    ];
    return (
        <FormProvider {...methods}>
            <form
                className="flex font-roboto flex-col gap-5"
                onSubmit={handleSubmit(onSubmit)}
            >
                {Rows.map((row, index) => (
                    <div key={index} className="w-full items-start flex gap-3">
                        {row.map((input) => (
                            <DashboardInputs key={input.label} {...input} />
                        ))}
                    </div>
                ))}
                <div className="w-full items-start flex gap-3">
                    <InputWrapper
                        WrapperClass="max-w-[150px]  flex-1"
                        label="Image"
                        error={errors.image?.message}
                    >
                        <div className="size-[150px] bg-gray-400" />
                    </InputWrapper>
                    <InputWrapper
                        WrapperClass="flex-1 w-full"
                        label="About"
                        error={errors.about?.message}
                    >
                        <Textarea
                            className="min-h-[150px] w-full"
                            {...register("about")}
                        />
                    </InputWrapper>
                </div>
                <Button
                    disabled={isSubmitting}
                    size={"lg"}
                    className="w-full !py-7 flex items-center justify-center "
                >
                    {isSubmitting ? "Submitting" : "Submit"}
                    {isSubmitting && <Loader2 className="animate-spin" />}
                </Button>
            </form>
        </FormProvider>
    );
};

export default UserForm;
