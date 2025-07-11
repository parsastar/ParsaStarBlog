import * as t from "drizzle-orm/pg-core";

import { userT } from "../user/user";
import { ReportReasonsEnum, RequestStateEnum } from "./shared";
import { defaultTimeStamps } from "@/db/helper";
import { relations } from "drizzle-orm";
import { BlogCommentsT } from "../blogs/blogComments";

export const CommentReportT = t.pgTable(
    "report_blog",
    {
        id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
        comment_id: t
            .integer()
            .notNull()
            .references(() => BlogCommentsT.id, { onDelete: "cascade" }),
        reporter_id: t
            .integer()
            .notNull()
            .references(() => userT.id, { onDelete: "cascade" }),
        moderator_id: t
            .integer()
            .notNull()
            .references(() => userT.id, { onDelete: "set null" }),
        report_reasons: ReportReasonsEnum().default("others").notNull(),
        description: t.text(),
        status: RequestStateEnum().default("pending").notNull(),
        ...defaultTimeStamps,
    },
    (table) => [
        t.index("report_reasons_index").on(table.report_reasons),
        t.index("status_index").on(table.status),
        t.index("moderator_id_index").on(table.moderator_id),
    ]
);

export const CommentReportTableRelations = relations(
    CommentReportT,
    ({ one }) => ({
        reporter: one(userT, {
            relationName: "reporter",
            fields: [CommentReportT.reporter_id],
            references: [userT.id],
        }),
        moderator: one(userT, {
            relationName: "moderator",
            fields: [CommentReportT.moderator_id],
            references: [userT.id],
        }),
        reportedBlog: one(BlogCommentsT, {
            fields: [CommentReportT.comment_id],
            references: [BlogCommentsT.id],
        }),
    })
);
