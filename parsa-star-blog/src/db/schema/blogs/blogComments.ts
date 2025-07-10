import { defaultTimeStamps } from "@/db/helper";
import { relations } from "drizzle-orm";
import * as t from "drizzle-orm/pg-core";
import { userT } from "../user";
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
        t.index("user_id_index").on(table.user_id),
        t.index("blog_id_index").on(table.blog_id),
        t.index("reply_to_id_index").on(table.reply_to_id),
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
            fields: [BlogCommentsT.reply_to_id],
            references: [BlogCommentsT.id],
        }),
        replies: many(BlogCommentsT),
    })
);
