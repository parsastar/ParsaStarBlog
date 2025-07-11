import * as t from "drizzle-orm/pg-core";
import { userT } from "../user/user";
import { blogT } from "./blog";
import { relations } from "drizzle-orm";
import { generateIndexName } from "@/db/helper";

export const blogViewsT = t.pgTable(
    "blog_views",
    {
        id: t.serial("id").primaryKey(),
        blog_id: t
            .integer()
            .notNull()
            .references(() => blogT.id, { onDelete: "cascade" }),
        user_id: t.integer().references(() => userT.id), // nullable for guests
        ip_address: t.varchar({ length: 50 }), // optional, for guest tracking
        user_agent: t.varchar({ length: 500 }), // optional, for bot detection
        viewed_at: t.timestamp({ withTimezone: true }).defaultNow(),
    },
    (table) => [
        t.index(generateIndexName("blog_views", "blog_id")).on(table.blog_id),
    ]
);

export const blogViewsTableRelations = relations(blogViewsT, ({ one }) => ({
    user: one(userT, {
        fields: [blogViewsT.user_id],
        references: [userT.id],
    }),
    blog: one(blogT, {
        fields: [blogViewsT.blog_id],
        references: [blogT.id],
    }),
}));
