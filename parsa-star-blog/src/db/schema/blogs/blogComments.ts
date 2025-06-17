import { defaultTimeStamps } from "@/db/helper";
import { relations } from "drizzle-orm";
import * as t from "drizzle-orm/pg-core";
import { userT } from "../user";
import { blogT } from "./blog";

export const BlogCommentsT = t.pgTable("blog_comments", {
    id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
    content: t.text().notNull(),
    userId: t
        .integer()
        .notNull()
        .references(() => userT.id, { onDelete: "cascade" }),
    blogId: t
        .integer()
        .notNull()
        .references(() => blogT.id, { onDelete: "cascade" }),
    replyToId: t.integer().references((): t.AnyPgColumn => BlogCommentsT.id, {
        onDelete: "cascade",
    }), // self-referencing FK
    ...defaultTimeStamps,
});

export const BlogCommentsTableRelations = relations(
    BlogCommentsT,
    ({ many, one }) => ({
        blog: one(blogT, {
            fields: [BlogCommentsT.blogId],
            references: [blogT.id],
        }),
        user: one(userT, {
            fields: [BlogCommentsT.userId],
            references: [userT.id],
        }),
        parent: one(BlogCommentsT, {
            fields: [BlogCommentsT.replyToId],
            references: [BlogCommentsT.id],
        }),
        replies: many(BlogCommentsT),
    })
);
