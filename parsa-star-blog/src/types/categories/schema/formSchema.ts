import { z } from "zod";
import { sharedCategorySchema } from "../shared";
import { imageFileSchema } from "../../shared";
const { baseCategory } = sharedCategorySchema;

const createCategorySchema = z.object({ ...baseCategory, ...imageFileSchema });
const EditCategorySchema = createCategorySchema.omit({ parent_id: true });

export const formCategorySchemas = {
    create: createCategorySchema,
    update: EditCategorySchema,
};
