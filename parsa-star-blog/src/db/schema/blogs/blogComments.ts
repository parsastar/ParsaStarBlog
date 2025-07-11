import { defaultTimeStamps, generateIndexName } from "@/db/helper";
import { relations } from "drizzle-orm";
import * as t from "drizzle-orm/pg-core";
import { userT } from "../user/user";
import { blogT } from "./blog";

export const BlogCommentsT = t.pgTable(
    "blog_comments",
    {
        id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
        content: t.text().notNull(),
        user_id: t
            .integer()
            .notNull()
            .references(() => userT.id, { onDelete: "cascade" }),
        blog_id: t
            .integer()
            .notNull()
            .references(() => blogT.id, { onDelete: "cascade" }),
        reply_to_id: t
            .integer()
            .references((): t.AnyPgColumn => BlogCommentsT.id, {
                onDelete: "cascade",
            }), // self-referencing FK
        ...defaultTimeStamps,
    },
    (table) => [
        t.index(generateIndexName("blog_comments", "user_id")).on(table.user_id),
        t.index(generateIndexName("blog_comments", "blog_id")).on(table.blog_id),
        t.index(generateIndexName("blog_comments", "reply_to_id")).on(table.reply_to_id),
    ]
);

export const BlogCommentsTableRelations = relations(
    BlogCommentsT,
    ({ many, one }) => ({
        blog: one(blogT, {
            fields: [BlogCommentsT.blog_id],
            references: [blogT.id],
        }),
        user: one(userT, {
            fields: [BlogCommentsT.user_id],
            references: [userT.id],
        }),
        parent: one(BlogCommentsT, {
            relationName: "commentThread",
            fields: [BlogCommentsT.reply_to_id],
            references: [BlogCommentsT.id],
        }),
        replies: many(BlogCommentsT, {
            relationName: "commentThread",
        }),
    })
);
