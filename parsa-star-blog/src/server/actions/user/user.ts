import {
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
import { TGetUser, TGetUsers, TPostUserPayload } from "@/types/user/api";
import { ShortResponses } from "@/server/lib/shortResponses";
import { TServerResponse } from "@/types/shared";
import StatusCodes from "@/server/lib/constants";
import { filterSchemas, TFilterUsers } from "@/types/sharedSchema";
import { userServerSchema } from "@/types/user/schemas/serverSchema";
import { generateSalt, hashPassword } from "@/server/lib/passwordHasher";

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

export const GetUsers = async (
    payload: TFilterUsers
): Promise<TGetUsers | TServerResponse> => {
    const { success, error, data } = filterSchemas.users.safeParse(payload);
    if (!success) {
        return ShortResponses.schemaError(error);
    }
    try {
        const { sort, page, pageSize, search } = data; // extracting from safe data

        const whereClause = search // this is used for searching first , last name or email
            ? or(
                  iLike(userT.first_name, `%${search}%`),
                  iLike(userT.last_name, `%${search}%`),
                  iLike(userT.password, `%${search}%`) // usually not recommended to search passwords
              )
            : undefined;
        const usersCount = await db
            .select({ totalRows: count() })
            .from(userT)
            .where(whereClause)
            .then((res) => res[0]);
        const users = await db.query.userT.findMany({
            columns: { password: false, salt: false },
            where: whereClause,
            limit: pageSize,
            offset: page * pageSize,
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

export const postUserAction = async (payload: TPostUserPayload) => {
    const { success, data, error } =
        userServerSchema.admin.create.safeParse(payload);
    if (!success) {
        return ShortResponses.schemaError(error);
    }
    try {
        const { password } = data;
        const salt = await generateSalt();
        const hashedPassword = await hashPassword(password, salt);
        const newUser: TNewUser = {
            ...data,
            password: hashedPassword,
            salt: salt,
        };
    } catch (error) {
        return ShortResponses.severError(error);
    }
};




    