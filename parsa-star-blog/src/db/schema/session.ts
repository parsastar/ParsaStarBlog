// were instead using the redis to handle session not with the db so i commented this code but its complete :)

// import * as t from "drizzle-orm/pg-core";
// import { userRoles, userT } from "./user";
// import { relations } from "drizzle-orm";
// import { defaultTimeStamps } from "../helper";
// export const sessionT = t.pgTable("sessions", {
//     id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
//     userId: t.integer().notNull(),
//     role: userRoles().default("user"),
//     ...defaultTimeStamps,
//     expirationDate: t.timestamp().notNull(),
// });
// export const sessionTableRelations = relations(sessionT, ({ one }) => ({
//     user: one(userT, {
//         fields: [sessionT.userId],
//         references: [userT.id],
//     }),
// }));
