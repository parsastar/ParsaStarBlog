import { z } from "zod";
import { sharedCategorySchema } from "../shared";
const { baseCategory } = sharedCategorySchema;

const createCategorySchema = z.object({ ...baseCategory });
const EditCategorySchema = createCategorySchema.omit({ parent_id: true });

export const serverCategorySchemas = {
    create: createCategorySchema,
    update: EditCategorySchema,
};
