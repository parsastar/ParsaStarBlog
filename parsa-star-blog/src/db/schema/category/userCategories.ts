import * as t from "drizzle-orm/pg-core";
import { userT } from "../user/user";
import { categoryT } from "./category";
import { relations } from "drizzle-orm";
import { generateIndexName } from "@/db/helper";

export const userCategoryT = t.pgTable(
    "user_category",
    {
        user_id: t
            .integer()
            .notNull()
            .references(() => userT.id, { onDelete: "cascade" }),
        category_id: t
            .integer()
            .notNull()
            .references(() => categoryT.id, { onDelete: "cascade" }),
    },
    (table) => [
        t.primaryKey({ columns: [table.user_id, table.category_id] }),
        t
            .index(generateIndexName("user_category", "category_id"))
            .on(table.category_id),
    ]
);

export const userCategoryRelations = relations(userCategoryT, ({ one }) => ({
    user: one(userT, {
        fields: [userCategoryT.user_id],
        references: [userT.id],
    }),
    category: one(categoryT, {
        fields: [userCategoryT.category_id],
        references: [categoryT.id],
    }),
}));
