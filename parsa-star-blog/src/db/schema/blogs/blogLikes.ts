import { defaultTimeStamps } from "@/db/helper";
import { relations } from "drizzle-orm";
import * as t from "drizzle-orm/pg-core";
import { userT } from "../user";
import { blogT } from "./blog";

export const blogLikesT = t.pgTable(
    "blog_likes",
    {
        user_id: t
            .integer()
            .notNull()
            .references(() => userT.id, { onDelete: "cascade" }),
        blog_id: t
            .integer()
            .notNull()
            .references(() => blogT.id, { onDelete: "cascade" }),
        ...defaultTimeStamps,
    },
    (table) => [t.primaryKey({ columns: [table.blog_id, table.user_id] })]
);

export const BlogLikesRelations = relations(blogLikesT, ({ one }) => ({
    user: one(userT, { fields: [blogLikesT.user_id], references: [userT.id] }),
    blog: one(blogT, { fields: [blogLikesT.blog_id], references: [blogT.id] }),
}));
