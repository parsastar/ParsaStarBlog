"use server";
import {
    and,
    asc,
    count,
    desc,
    eq,
    ilike as iLike,
    InferInsertModel,
    or,
} from "drizzle-orm";
import { db } from "@/db";
import { userT } from "@/db/schema";
import {
    TGetUser,
    TGetUsers,
    TPostUserPayload,
    TPutUserPayload,
} from "@/types/user/api";
import { ShortResponses } from "@/server/lib/shortResponses";
import { TServerResponse } from "@/types/shared";
import StatusCodes from "@/server/lib/constants";
import { filterSchemas, TFilterUsers } from "@/types/sharedSchema";
import { userServerSchema } from "@/types/user/schemas/serverSchema";
import { generateSalt, hashPassword } from "@/server/lib/passwordHasher";
import { z } from "zod";

type TNewUser = InferInsertModel<typeof userT>;

export const GetUserById = async (
    userId: number
): Promise<TGetUser | TServerResponse> => {
    const foundUser = await db.query.userT.findFirst({
        where: eq(userT.id, userId),
    });
    if (!foundUser) {
        return ShortResponses.notFoundError("user");
    }
    const { salt, password, ...sendingUser } = foundUser;

    return {
        status: StatusCodes.success,
        message: "user has been sent successfully",
        user: sendingUser,
    };
};

export const GetUsers = async (payload: TFilterUsers) => {
    const { success, error, data } = filterSchemas.users.safeParse(payload);
    if (!success) {
        return ShortResponses.schemaError(error);
    }
    try {
        const { sort, page, pageSize, search, role } = data; // extracting from safe data

        const whereClause = and(
            role ? eq(userT.role, role) : undefined,
            search // this is used for searching first , last name or email
                ? or(
                      iLike(userT.first_name, `%${search}%`),
                      iLike(userT.last_name, `%${search}%`),
                      iLike(userT.email, `%${search}%`)
                  )
                : undefined
        );

        const usersCount = await db
            .select({ totalRows: count() })
            .from(userT)
            .where(whereClause)
            .then((res) => res[0]);
        const users = await db.query.userT.findMany({
            columns: { password: false, salt: false },
            where: whereClause,
            limit: pageSize,
            offset: (page - 1) * pageSize,
            orderBy: [
                sort == "asc" ? asc(userT.created_at) : desc(userT.created_at),
            ],
        });
        return {
            status: StatusCodes.success,
            message: "users sent successfully",
            currentPage: page,
            totalPages: Math.ceil(usersCount.totalRows / pageSize),
            users,
        };
    } catch (error) {
        return ShortResponses.severError(error);
    }
};

export const postUserAction = async (
    payload: TPostUserPayload
): Promise<TServerResponse> => {
    const { success, data, error } =
        userServerSchema.admin.create.safeParse(payload);
    if (!success) {
        return ShortResponses.schemaError(error);
    }
    try {
        const { password, email, first_name, last_name } = data;
        const emailExists = await db.query.userT.findFirst({
            where: eq(userT.email, email),
        });
        if (emailExists) {
            return {
                status: StatusCodes.badRequest,
                message: "User with this Email already exists",
            };
        }
        const salt = await generateSalt();
        const hashedPassword = await hashPassword(password, salt);
        const newUser: TNewUser = {
            ...data,
            password: hashedPassword,
            salt: salt,
        };
        await db.insert(userT).values(newUser); // insert use to db
        return {
            status: StatusCodes.success,
            message: `user "${
                first_name + " " + last_name
            }"  created successfully`,
        };
    } catch (error) {
        return ShortResponses.severError(error);
    }
};

export const putUserAction = async (
    payload: TPutUserPayload
): Promise<TServerResponse> => {
    const { success, error, data } =
        userServerSchema.admin.update.safeParse(payload);
    if (!success) {
        return ShortResponses.schemaError(error);
    }
    try {
        const { email, password, id } = data;
        const emailExists = await db.query.userT.findFirst({
            where: eq(userT.email, email),
        });
        if (emailExists) {
            return {
                status: StatusCodes.badRequest,
                message: "user with this email already exists ",
            };
        }
        const salt = await generateSalt();
        const hashedPassword = await hashPassword(password, salt);
        await db
            .update(userT)
            .set({ ...data, salt: salt, password: hashedPassword })
            .where(eq(userT.id, id));

        return {
            status: StatusCodes.success,
            message: "user has been updated Successfully",
        };
    } catch (error) {
        return ShortResponses.severError(error);
    }
};

export const deleteUserAction = async (userId: number) => {
    const { success, error, data } = z
        .object({ userId: z.number() })
        .safeParse({ userId });
    if (!success) {
        return ShortResponses.schemaError(error);
    }
    try {
        const { userId } = data;
        await db.delete(userT).where(eq(userT.id, userId)); // since we defined  cascade on delete for the related tables they will remove automatically
        return {
            status: StatusCodes.success,
            message: "user has been deleted successfully ",
        };
    } catch (error) {
        return ShortResponses.severError(error);
    }
};
