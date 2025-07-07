import React from "react";
import {
    TCreateUserBaseSchema,
    TPostUserSchema,
    TPutUserSchema,
    userFormSchema,
} from "@/types/user/schemas/formSchema";
import { toast } from "sonner";
import { postUserAction, putUserAction } from "@/server/actions/user/user";
import StatusCodes from "@/server/lib/constants";
import { queryClient } from "@/app/provider";
import { queryKeys } from "@/constant/querykeys";
import { userRolesArray } from "@/types/user/shared";
import { TUserWithoutPassword } from "@/types/user/api";
import { TDashboardInputs } from "../../dashboardTypes";
import { ImageUploadHandler } from "@/lib/imageUploadHandler";
import { FormCreator } from "../../shared/form/formCreator";

const UserForm = ({
    selectedUser,
}: {
    selectedUser?: TUserWithoutPassword;
}) => {
    const BaseRows: TDashboardInputs<TCreateUserBaseSchema>[][] = [
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
            {
                label: "Image",
                wrapperClass: "max-w-[150px]  flex-1",
                input: {
                    formKey: "image",
                    type: "image",
                    imageFile: "imageFile",
                },
            },
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

    if (selectedUser) {
        const PutUserOnSubmit = async (data: TPutUserSchema) => {
            try {
                /// handling image files start
                const uploadedImages = await ImageUploadHandler([
                    {
                        imageFile: data.imageFile,
                        imageUrl: data.image,
                        imagePath: "image",
                        filePath: "imageFile",
                        initialImageUrl: selectedUser.image,
                    },
                ]);
                uploadedImages.map((image) => {
                    data[image.imagePath] = image.imageUrl;
                    data[image.filePath] = null;
                });
                /// handling imageFiles ends
                const res = await putUserAction({
                    ...data,
                    id: selectedUser.id,
                });

                if (res.status !== StatusCodes.success) {
                    console.log(res.message);
                    toast.error(res.message);
                    return;
                }
                await Promise.all([
                    queryClient.invalidateQueries({
                        queryKey: [queryKeys.users.get, selectedUser.id],
                    }),
                    queryClient.invalidateQueries({
                        queryKey: [queryKeys.users.getList],
                    }),
                ]);
                toast.success(res.message);
                return;
            } catch (error) {
                console.log("error : ", error);
                toast.error("some thing went wrong ");
            }
        };
        const updateUserRows = BaseRows;
        return (
            <FormCreator
                onSubmit={PutUserOnSubmit}
                defaultValues={{ ...selectedUser, imageFile: null }}
                schema={userFormSchema.admin.update}
                inputRows={updateUserRows}
            />
        );
    }
    if (!selectedUser) {
        const CreateUserRows = BaseRows.map((row, index) => {
            if (index == 1) {
                return [
                    ...row,
                    {
                        label: "password",
                        input: { formKey: "password", type: "text" },
                    },
                ];
            }
            return row;
        }) as TDashboardInputs<TPostUserSchema>[][];

        const createUserOnSubmit = async (data: TPostUserSchema) => {
            try {
                /// handling image files start
                const uploadedImages = await ImageUploadHandler([
                    {
                        imageFile: data.imageFile,
                        imageUrl: data.image,
                        imagePath: "image",
                        filePath: "imageFile",
                    },
                ]);
                uploadedImages.map((image) => {
                    data[image.imagePath] = image.imageUrl;
                    data[image.filePath] = null;
                });
                /// handling imageFiles ends
                const res = await postUserAction(data);
                if (res.status !== StatusCodes.success) {
                    toast.error(res.message);
                    return;
                }

                await queryClient.invalidateQueries({
                    queryKey: [queryKeys.users.getList],
                });
                toast.success(res.message);
            } catch (error) {
                console.log("error : ", error);
                toast.error("something went wrong");
            }
        };
        return (
            <FormCreator
                defaultValues={{ imageFile: null }}
                onSubmit={createUserOnSubmit}
                schema={userFormSchema.admin.create}
                inputRows={CreateUserRows}
            />
        );
    }
};

export default UserForm;
