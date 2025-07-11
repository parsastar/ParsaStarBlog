import { defaultTimeStamps, generateIndexName, lower } from "@/db/helper";
import { relations } from "drizzle-orm";
import * as t from "drizzle-orm/pg-core";
import { userCategoryT } from "./userCategories";
import { blogCategoryT } from "./blogCategoies";

export const categoryT = t.pgTable(
    "category",
    {
        id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
        name: t.varchar({ length: 200 }).notNull(),
        image: t.varchar({ length: 300 }),
        icon_name: t.varchar({ length: 100 }),
        parent_id: t.integer().references((): t.AnyPgColumn => categoryT.id, {
            onDelete: "cascade",
        }),
        ...defaultTimeStamps,
    },
    (table) => [
        t
            .uniqueIndex(generateIndexName("category", "name"))
            .on(lower(table.name)),
    ]
);

export const categoryTableRelations = relations(categoryT, ({ many, one }) => ({
    userCategories: many(userCategoryT),
    blogCategory: many(blogCategoryT),
    childCategories: many(categoryT, { relationName: "categorySelfRelation" }),
    parent: one(categoryT, {
        relationName: "categorySelfRelation",
        fields: [categoryT.parent_id],
        references: [categoryT.id],
    }),
}));
