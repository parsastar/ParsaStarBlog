import { defaultTimeStamps } from "@/db/helper";
import { relations } from "drizzle-orm";
import * as t from "drizzle-orm/pg-core";
import { userT } from "../user";
import { blogT } from "./blog";

export const blogLikesT = t.pgTable(
    "blog_likes",
    {
        userId: t
            .integer()
            .notNull()
            .references(() => userT.id, { onDelete: "cascade" }),
        blogId: t
            .integer()
            .notNull()
            .references(() => blogT.id, { onDelete: "cascade" }),
        ...defaultTimeStamps,
    },
    (table) => [t.primaryKey({ columns: [table.blogId, table.userId] })]
);

export const BlogLikesRelations = relations(blogLikesT, ({ one }) => ({
    user: one(userT, { fields: [blogLikesT.userId], references: [userT.id] }),
    blog: one(blogT, { fields: [blogLikesT.blogId], references: [blogT.id] }),
}));


