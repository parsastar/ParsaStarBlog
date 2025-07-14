import { TCategory } from "@/types/categories/api";
import React from "react";
import { FormCreator } from "../shared/form/formCreator";
import { TDashboardInputs } from "../dashboardTypes";
import { formCategorySchemas } from "@/types/categories/schema/formSchema";
import { z } from "zod";
import { CategoryIconOptionsArray } from "@/types/categories/shared";
import { findCategoryIcon } from "@/utils/categories";
import { ImageUploadHandler } from "@/lib/imageUploadHandler";
import {
    postCategoryAction,
    putCategoryAction,
} from "@/server/actions/category/category";
import StatusCodes from "@/server/lib/constants";
import { toast } from "sonner";
import { queryClient } from "@/app/provider";
import { queryKeys } from "@/constant/querykeys";

const CategoryForm = ({
    selectedCategory,
    ParentId,
}: {
    ParentId?: number;
    selectedCategory?: TCategory;
}) => {
    const BaseCategoryInputs: TDashboardInputs<
        z.infer<typeof formCategorySchemas.update>
    >[][] = [
        [
            {
                wrapperClass: "max-w-[180px]",
                label: "Icon",
                input: {
                    InputClassName: "w-full",
                    type: "select",
                    formKey: "icon_name",
                    placeHolder: "Select Icon ",
                    values: CategoryIconOptionsArray.map((icon) => ({
                        label: (
                            <div className="flex gap-2 items-center">
                                {findCategoryIcon(icon)} {icon}
                            </div>
                        ),
                        value: icon,
                    })),
                },
            },

            {
                label: "Name",
                input: {
                    type: "text",
                    formKey: "name",
                    placeHolder: "Category name",
                },
            },
        ],
        [
            {
                label: "Image",
                input: {
                    type: "image",
                    formKey: "image",
                    imageFile: "imageFile",
                    InputClassName: "!size-[150px]",
                },
                wrapperClass: "max-w-[150px]",
            },
        ],
    ];
    const onSubmit = async (
        data: z.infer<
            | typeof formCategorySchemas.update
            | typeof formCategorySchemas.create
        >
    ) => {
        try {
            /// handling image files start
            const uploadedImages = await ImageUploadHandler([
                {
                    imageFile: data.imageFile,
                    imageUrl: data.image,
                    imagePath: "image",
                    filePath: "imageFile",
                    initialImageUrl: selectedCategory?.image,
                },
            ]);
            uploadedImages.map((image) => {
                data[image.imagePath] = image.imageUrl;
                data[image.filePath] = null;
            });
            /// handling imageFiles ends
            const res = await (selectedCategory
                ? putCategoryAction(
                      {
                          ...data,
                      },
                      selectedCategory.id
                  )
                : postCategoryAction({ ...data }));

            if (res.status !== StatusCodes.success) {
                toast.error(res.message);
                return;
            }
            await Promise.all([
                queryClient.invalidateQueries({
                    queryKey: [queryKeys.categories.getList],
                }),
            ]);
            toast.success(res.message);
            return;
        } catch (error) {
            console.log("error : ", error);
            toast.error("some thing went wrong ");
        }
    };

    if (selectedCategory) {
        return (
            <FormCreator
                onSubmit={onSubmit}
                inputRows={BaseCategoryInputs}
                schema={formCategorySchemas.update}
                defaultValues={selectedCategory}
            />
        );
    }
    return (
        <FormCreator
            inputRows={BaseCategoryInputs}
            onSubmit={onSubmit}
            schema={formCategorySchemas.create}
            defaultValues={{ parent_id: ParentId }}
        />
    );
};

export default CategoryForm;
