import * as t from "drizzle-orm/pg-core";
import { userT } from "../user/user";
import { defaultTimeStamps } from "@/db/helper";
import { RequestStateEnum } from "./shared";
import { relations } from "drizzle-orm";

export const AuthorRequestsT = t.pgTable(
    "author_requests",
    {
        id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
        user_id: t
            .integer()
            .notNull()
            .references(() => userT.id),
        moderator_id: t // the user who accepts or rejects the request (in this project this will be the id of admins )
            .integer()
            .notNull()
            .references(() => userT.id),
        description: t.text(),
        state: RequestStateEnum().default("pending").notNull(),
        ...defaultTimeStamps,
    },
    (table) => [
        t.index("moderator_id_index").on(table.moderator_id),
        t.index("state_index").on(table.state),
    ]
);

export const toBeWriterRequestRelations = relations(
    AuthorRequestsT,
    ({ one }) => ({
        requester: one(userT, {
            relationName: "requester", // the user which wants to be a author
            fields: [AuthorRequestsT.user_id],
            references: [userT.id],
        }),
        moderator: one(userT, {
            relationName: "request_moderator", // the user which moderate the request
            fields: [AuthorRequestsT.moderator_id],
            references: [userT.id],
        }),
    })
);
