"use server";
import { categoryT } from "@/db/schema"; // categoryT stands for user table
// import { removeTimeStampsFromSchema } from "@/types/helper";
import {
    createInsertSchema,
    createSelectSchema,
    createUpdateSchema,
} from "drizzle-zod";

/// for db validations
const createUserSchema = createSelectSchema(categoryT);
const insertUserSchema = createInsertSchema(categoryT, {});
const updateUserSchema = createUpdateSchema(categoryT);

export const categoryDBSchemas = async () => ({
    create: createUserSchema,
    insert: insertUserSchema,
    updateUserSchema,
});
