import * as t from "drizzle-orm/pg-core";
import { blogT } from "../blogs/blog";
import { userT } from "../user/user";
import { ReportReasonsEnum, RequestStateEnum } from "./shared";
import { defaultTimeStamps, generateIndexName } from "@/db/helper";
import { relations } from "drizzle-orm";

export const BlogReportT = t.pgTable(
    "report_blog",
    {
        id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
        blog_id: t
            .integer()
            .notNull()
            .references(() => blogT.id, { onDelete: "cascade" }),
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
        t.index(generateIndexName("blog","reason")).on(table.report_reasons),
        t.index(generateIndexName("blog","state")).on(table.status),
        t.index(generateIndexName("blog","moderator_id")).on(table.moderator_id),
    ]
);

export const BlogReportTableRelations = relations(BlogReportT, ({ one }) => ({
    reporter: one(userT, {
        relationName: "reporter",
        fields: [BlogReportT.reporter_id],
        references: [userT.id],
    }),
    moderator: one(userT, {
        relationName: "moderator",
        fields: [BlogReportT.moderator_id],
        references: [userT.id],
    }),
    reportedBlog: one(blogT, {
        fields: [BlogReportT.blog_id],
        references: [blogT.id],
    }),
}));
