import * as t from "drizzle-orm/pg-core";
import { defaultTimeStamps } from "../../helper";
import { relations } from "drizzle-orm";
import { blogLikesT } from "./blogLikes";
import { BlogCommentsT } from "./blogComments";
import { userT } from "../user";

type TSubSection = { title: string; description: string };

export const blogT = t.pgTable(
    "blogs",
    {
        id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
        title: t.varchar({ length: 150 }).notNull(),
        cover: t.varchar({ length: 500 }),
        description: t.text().notNull(),
        user_id: t
            .integer()
            .notNull()
            .references(() => userT.id, { onDelete: "cascade" }),
        sub_sections: t.json().$type<TSubSection[]>(),
        ...defaultTimeStamps,
    },
    (table) => [
        t.index("user_id_index").on(table.user_id),
        t.index("title_index").on(table.title),
    ]
);

/// Relations for blogs
export const blogsTableRelations = relations(blogT, ({ many, one }) => ({
    user: one(userT, { fields: [blogT.user_id], references: [userT.id] }),
    comments: many(BlogCommentsT),
    likes: many(blogLikesT),
}));
