import * as t from "drizzle-orm/pg-core";
import { userT } from "./user";
import { blogT } from "../blogs/blog";
import { relations } from "drizzle-orm";
import { defaultTimeStamps } from "@/db/helper";

export const ReadLaterT = t.pgTable(
    "read_later_blogs",
    {
        user_id: t
            .integer()
            .notNull()
            .references(() => userT.id),
        blog_id: t
            .integer()
            .notNull()
            .references(() => blogT.id),
        ...defaultTimeStamps,
    },
    (table) => [t.primaryKey({ columns: [table.user_id] })]
);

export const ReadLaterTableRelations = relations(ReadLaterT, ({ one }) => ({
    user: one(userT, { fields: [ReadLaterT.user_id], references: [userT.id] }),
    blog: one(blogT, { fields: [ReadLaterT.user_id], references: [blogT.id] }),
}));
