import * as t from "drizzle-orm/pg-core";
import { defaultTimeStamps, generateIndexName } from "../../helper";
import { relations } from "drizzle-orm";
import { blogLikesT } from "./blogLikes";
import { BlogCommentsT } from "./blogComments";
import { userT } from "../user/user";
import { blogCategoryT } from "../category/blogCategoies";
import { ReadLaterT } from "../user/ReadLater";
import { BlogReportT } from "../requests/blogReport";
import { blogViewsT } from "./blogViews";

type TSubSection = { title: string; description: string };

export const blogT = t.pgTable(
    "blogs",
    {
        id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
        title: t.varchar({ length: 150 }).notNull(),
        cover: t.varchar({ length: 500 }),
        description: t.text().notNull(),
        user_id: t
            .integer()
            .notNull()
            .references(() => userT.id, { onDelete: "cascade" }),
        sub_sections: t.json().$type<TSubSection[]>(),
        ...defaultTimeStamps,
    },
    (table) => [
        t.index(generateIndexName("blog", "user_id")).on(table.user_id),
        t.index(generateIndexName("blog", "title")).on(table.title),
    ]
);

/// Relations for blogs
export const blogsTableRelations = relations(blogT, ({ many, one }) => ({
    /// for user table
    user: one(userT, { fields: [blogT.user_id], references: [userT.id] }),

    /// for blog comment table
    comments: many(BlogCommentsT),

    /// for blog likes table
    likes: many(blogLikesT),

    /// for blog category table
    category: many(blogCategoryT),

    /// for read Later Table
    ReadLaterBlog: many(ReadLaterT),

    /// for blog report table
    reportedBlog: many(BlogReportT),

    /// for blogViews
    viewedBlog: many(blogViewsT),
}));
