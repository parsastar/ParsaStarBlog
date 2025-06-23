"use server";
import { userT } from "@/db/schema"; // userT stands for user table
// import { removeTimeStampsFromSchema } from "@/types/helper";
import {
    createInsertSchema,
    createSelectSchema,
    createUpdateSchema,
} from "drizzle-zod";

/// for db validations
const createUserSchema = createSelectSchema(userT);
const insertUserSchema = createInsertSchema(userT, {});
const updateUserSchema = createUpdateSchema(userT);

export const userSchemas = async () => ({
    create: createUserSchema,
    insert: insertUserSchema,
    updateUserSchema,
});
