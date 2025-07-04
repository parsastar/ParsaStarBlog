import { relations } from "drizzle-orm";
import { defaultTimeStamps, lower } from "../helper";
import * as t from "drizzle-orm/pg-core";
import { blogT } from "./blogs/blog";
import { blogLikesT } from "./blogs/blogLikes";
import { BlogCommentsT } from "./blogs/blogComments";
import { userRolesArray, TUserSocials } from "@/types/user/shared";

export const userRoles = t.pgEnum("role", userRolesArray);

export const userT = t.pgTable(
    "users",
    {
        id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
        role: userRoles().default("user").notNull(),
        password: t.varchar({ length: 500 }).notNull(),
        first_name: t.varchar({ length: 200 }).notNull(),
        image: t.varchar({ length: 1000 }),
        last_name: t.varchar({ length: 200 }).notNull(),
        email: t.varchar({ length: 300 }).notNull(),
        salt: t.varchar({ length: 100 }).notNull(),
        about: t.text(),
        phone_number: t.varchar({ length: 30 }),
        socials: t.json().$type<TUserSocials>(),
        website: t.varchar({ length: 400 }),
        ...defaultTimeStamps,
    },
    (table) => [t.uniqueIndex("emailUniqueIndex").on(lower(table.email))]
);

export const userTableRelations = relations(userT, ({ many }) => ({
    blogs: many(blogT),
    blogLikes: many(blogLikesT),
    blogComments: many(BlogCommentsT),
}));
