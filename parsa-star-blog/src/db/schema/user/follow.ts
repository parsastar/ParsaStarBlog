import * as t from "drizzle-orm/pg-core";
import { userT } from "./user";
import { relations } from "drizzle-orm";
import { defaultTimeStamps } from "@/db/helper";

export const followT = t.pgTable(
    "follow",
    {
        follower_id: t
            .integer()
            .notNull()
            .references(() => userT.id),
        following_id: t
            .integer()
            .notNull()
            .references(() => userT.id),
        ...defaultTimeStamps,
    },
    (table) => [
        t.primaryKey({ columns: [table.follower_id, table.following_id] }),
        t.index("following_id_index").on(table.following_id),
    ]
);

export const followTableRelations = relations(followT, ({ one }) => ({
    follower: one(userT, {
        relationName: "follower",
        fields: [followT.follower_id],
        references: [userT.id],
    }),
    following: one(userT, {
        relationName: "following",
        fields: [followT.following_id],
        references: [userT.id],
    }),
}));
