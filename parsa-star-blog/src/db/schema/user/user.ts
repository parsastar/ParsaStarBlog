import { relations } from "drizzle-orm";
import { defaultTimeStamps, lower } from "../../helper";
import * as t from "drizzle-orm/pg-core";
import { blogT } from "../blogs/blog";
import { blogLikesT } from "../blogs/blogLikes";
import { BlogCommentsT } from "../blogs/blogComments";
import {
    userRolesArray,
    TUserSocials,
    AccountStatusArray,
} from "@/types/user/shared";
import { userCategoryT } from "../category/userCategories";
import { followT } from "./follow";
import { userBlockList } from "./userBlockList";
import { AuthorRequestsT } from "../requests/author";
import { ReadLaterT } from "./ReadLater";
import { BlogReportT } from "../requests/blogReport";
import { blogViewsT } from "../blogs/blogViews";

export const userRoles = t.pgEnum("role", userRolesArray);
export const userAccountStatusEnum = t.pgEnum(
    "account_status",
    AccountStatusArray
);
export const userT = t.pgTable(
    "users",
    {
        id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
        role: userRoles().default("user").notNull(),
        password: t.varchar({ length: 500 }).notNull(),
        first_name: t.varchar({ length: 200 }).notNull(),
        image: t.varchar({ length: 1000 }),
        last_name: t.varchar({ length: 200 }).notNull(),
        email: t.varchar({ length: 300 }).notNull(),
        salt: t.varchar({ length: 100 }).notNull(),
        about: t.text(),
        phone_number: t.varchar({ length: 30 }),
        socials: t.json().$type<TUserSocials>(),
        website: t.varchar({ length: 400 }),
        account_status: userAccountStatusEnum().default("ok").notNull(),
        suspension_ends_at: t.timestamp(), // this is null and only has a date value when the account_status's value is suspense
        ...defaultTimeStamps,
    },
    (table) => [t.uniqueIndex("emailUniqueIndex").on(lower(table.email))]
);

export const userTableRelations = relations(userT, ({ many }) => ({
    // for blog tables and related tables to blogs
    blogs: many(blogT),
    blogLikes: many(blogLikesT),
    blogComments: many(BlogCommentsT),

    // for category table
    category: many(userCategoryT),

    /// for the follow table
    follower: many(followT, { relationName: "follower" }),
    following: many(followT, { relationName: "following" }),

    /// for block List table
    user: many(userBlockList, { relationName: "user" }), // this is for the user which is blocking the other user
    blockedUser: many(userBlockList, { relationName: "blocked_user" }),

    /// for to be Author Request table
    authorRequester: many(AuthorRequestsT, { relationName: "requester" }),
    authorModerator: many(AuthorRequestsT, {
        relationName: "request_moderator",
    }),

    /// for ReadLater table (a table which stores the blogs ids which user wants to read later )
    ReadLaterUser: many(ReadLaterT),

    /// for  blog reports  table
    blogReporter: many(BlogReportT, { relationName: "reporter" }),
    blogReportModerator: many(BlogReportT, { relationName: "moderator" }),

    /// for  blog Comment reports  table
    blogCommentReporter: many(BlogReportT, { relationName: "reporter" }),
    blogCommentReportModerator: many(BlogReportT, {
        relationName: "moderator",
    }),

    /// for blogView table
    viewer: many(blogViewsT),
}));
