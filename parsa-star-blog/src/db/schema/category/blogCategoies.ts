import * as t from "drizzle-orm/pg-core";
import { categoryT } from "./category";
import { blogT } from "../blogs/blog";
import { relations } from "drizzle-orm";
import { generateIndexName } from "@/db/helper";

export const blogCategoryT = t.pgTable(
    "blog_category",
    {
        blog_id: t
            .integer()
            .notNull()
            .references(() => blogT.id, { onDelete: "cascade" }),
        category_id: t
            .integer()
            .notNull()
            .references(() => categoryT.id, { onDelete: "cascade" }),
    },
    (table) => [
        t.primaryKey({ columns: [table.blog_id, table.category_id] }),
        t
            .index(generateIndexName("blog_categories", "category_id"))
            .on(table.category_id),
    ]
);

export const blogCategoryRelations = relations(blogCategoryT, ({ one }) => ({
    user: one(blogT, {
        fields: [blogCategoryT.blog_id],
        references: [blogT.id],
    }),
    category: one(categoryT, {
        fields: [blogCategoryT.category_id],
        references: [categoryT.id],
    }),
}));
