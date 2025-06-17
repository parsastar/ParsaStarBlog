import { relations } from "drizzle-orm";
import { defaultTimeStamps, lower } from "../helper";
import * as t from "drizzle-orm/pg-core";
import { blogT } from "./blogs/blog";
import { blogLikesT } from "./blogs/blogLikes";
import { BlogCommentsT } from "./blogs/blogComments";

type Socials = { instagram?: string; linkedin?: string; twitter?: string };
export const userRoles = t.pgEnum("role", ["admin", "author", "user"]);

export const userT = t.pgTable(
    "users",
    {
        id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
        role: userRoles().default("user"),
        password: t.varchar({ length: 20 }).notNull(),
        firstName: t.varchar({ length: 200 }).notNull(),
        lastName: t.varchar({ length: 200 }).notNull(),
        email: t.varchar({ length: 300 }).notNull(),
        salt: t.varchar({ length: 100 }).notNull(),
        about: t.text(),
        phoneNumber: t.varchar({ length: 30 }),
        socials: t.json().$type<Socials>(),
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