import * as t from "drizzle-orm/pg-core";
import { userT } from "./user";
import { relations } from "drizzle-orm";

export const userBlockList = t.pgTable(
    "user_block_list",
    {
        user_id: t /// this is for the user which is blocking the other user
            .integer()
            .notNull()
            .references(() => userT.id),
        blocked_user_id: t
            .integer()
            .notNull()
            .references(() => userT.id),
    },
    (table) => [
        t.primaryKey({ columns: [table.user_id, table.blocked_user_id] }),
    ]
);

export const blockTableRelations = relations(userBlockList, ({ one }) => ({
    user: one(userT, {
        /// this is for the user which is blocking the other user
        relationName: "user",
        fields: [userBlockList.user_id],
        references: [userT.id],
    }),
    blockedUser: one(userT, {
        relationName: "blocked_user",
        fields: [userBlockList.blocked_user_id],
        references: [userT.id],
    }),
}));
