import { z } from "zod";

export const CategoryIconOptionsArray = [
    "Technology",
    "Programming",
    "Weather",
    "Travel",
    "Health",
    "Education",
    "Finance",
    "Food",
    "Entertainment",
    "Lifestyle",
] as const;
export type TCategoryIconOptions = (typeof CategoryIconOptionsArray)[number];

const categoryBaseSchema = {
    name: z.string().min(3),
    icon_name: z.enum(CategoryIconOptionsArray).optional().nullable(),
    image: z.string().nullable().optional(),
    parent_id: z.number().nullable().optional(),
};

export const sharedCategorySchema = {
    baseCategory: categoryBaseSchema,
};
