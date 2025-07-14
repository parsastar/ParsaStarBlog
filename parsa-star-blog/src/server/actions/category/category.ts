"use server";

import { db } from "@/db";
import { categoryT } from "@/db/schema";
import StatusCodes from "@/server/lib/constants";
import { ShortResponses } from "@/server/lib/shortResponses";
import {
    TCategory,
    TPostCategoryPayload,
    TPutCategoryPayload,
} from "@/types/categories/api";
import { serverCategorySchemas } from "@/types/categories/schema/serverSchema";
import { shapeCategories } from "@/utils/categories";
import { eq } from "drizzle-orm";

export const postCategoryAction = async (payload: TPostCategoryPayload) => {
    const { error, data, success } =
        serverCategorySchemas.create.safeParse(payload);
    if (!success) {
        return ShortResponses.schemaError(error);
    }
    const existCategory = await db.query.categoryT.findFirst({
        where: eq(categoryT.name, data.name),
    });
    if (existCategory) {
        return ShortResponses.wrongInput(
            "category with this name already exists "
        );
    }
    if (data.parent_id) {
        const parentCategory = await db.query.categoryT.findFirst({
            where: eq(categoryT.id, data.parent_id),
        });
        if (parentCategory?.parent_id) {
            return ShortResponses.wrongInput(
                "Parent category should not have a parent!"
            );
        }
    }
    try {
        await db.insert(categoryT).values(data);
        return {
            status: StatusCodes.success,
            message: `category ${data.name} has uploaded successfully `,
        };
    } catch (error) {
        return ShortResponses.severError(error);
    }
};

export const putCategoryAction = async (
    payload: TPutCategoryPayload,
    category_id: number
) => {
    const { error, data, success } =
        serverCategorySchemas.update.safeParse(payload);
    if (!success) {
        return ShortResponses.schemaError(error);
    }
    try {
        const selectedCategory = await db.query.categoryT.findFirst({
            where: eq(categoryT.id, category_id),
        });
        if (!selectedCategory) {
            return ShortResponses.notFoundError(
                "category with the Id given doesn't exists "
            );
        }
        if (selectedCategory.name !== data.name) {
            const existCategory = await db.query.categoryT.findFirst({
                where: eq(categoryT.name, data.name),
            });
            if (existCategory) {
                return ShortResponses.wrongInput(
                    "category with this name already exists "
                );
            }
        }
        await db
            .update(categoryT)
            .set(data)
            .where(eq(categoryT.id, category_id));
        return {
            status: StatusCodes.success,
            message: `category ${data.name} has updated successfully `,
        };
    } catch (error) {
        return ShortResponses.severError(error);
    }
};

export const DeleteCategoryAction = async (category_id: number) => {
    try {
        const { name } = await db
            .delete(categoryT)
            .where(eq(categoryT.id, category_id))
            .returning({ name: categoryT.name })
            .then((data) => data[0]);

        return {
            status: StatusCodes.success,
            message: `deleted category with the name "  ${name} "`,
        };
    } catch (error) {
        return ShortResponses.severError(error);
    }
};

export const getCategories = async () => {
    try {
        const categories = await db.query.categoryT.findMany();

        const shapedCategories = shapeCategories(categories as TCategory[]);
        return {
            status: StatusCodes.success,
            categories: shapedCategories,
            message: "categories has been sent successfully ",
        };
    } catch (error) {
        return ShortResponses.severError(error);
    }
};

export const getCategoryById = async (id: number) => {
    try {
        const category = await db.query.categoryT.findMany({
            where: eq(categoryT.id, id) || eq(categoryT.parent_id, id),
        });
        const shapedCategory = shapeCategories(category as TCategory[])[0];
        return {
            status: StatusCodes.success,
            message: "category with its children has been sent ",
            category: shapedCategory,
        };
    } catch (error) {
        return ShortResponses.severError(error);
    }
};
