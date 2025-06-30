import { z } from "zod";
import { userRolesArray } from "./user/shared";

// schemas for pagination sorting and search of a request payload for example getUsers
const paginationSchema = z.object({
    page: z.number().min(1),
    pageSize: z.number().min(1),
});

const sortSchema = z.object({
    sort: z.enum(["asc", "dsc"]),
});

const searchSchema = z.object({
    search: z.string().nullable(),
});

const getUsersSchema = z.object({
    ...paginationSchema.shape,
    ...sortSchema.shape,
    ...searchSchema.shape,
    role: z.enum(userRolesArray).nullable(),
});
export type TFilterUsers = z.infer<typeof getUsersSchema>;

export const filterSchemas = {
    users: getUsersSchema,
};
