"use server";
import { db } from "@/db";
import { userT } from "@/db/schema";
import StatusCodes from "@/server/lib/constants";
import {
    comparePassword,
    generateSalt,
    hashPassword,
} from "@/server/lib/passwordHasher";
import { TSingUpPayload, TSignInPayload } from "@/types/user/api";
import { userServerSchema } from "@/types/user/schemas/serverSchema";
import { eq, InferInsertModel } from "drizzle-orm";
import { createSession, RemoveSession } from "./session";
import { ShortResponses } from "@/server/lib/shortResponses";
import { getSessionCookie } from "@/server/lib/cookies";

type TNewUser = InferInsertModel<typeof userT>;

export const signUpAction = async (payload: TSingUpPayload) => {
    const { success, data, error } =
        userServerSchema.auth.signUp.safeParse(payload);

    if (!success) {
        return ShortResponses.schemaError(error);
    }

    const { email, password } = data;

    const existingUser = await db.query.userT.findFirst({
        where: eq(userT.email, email),
    });

    if (existingUser !== undefined) {
        return {
            status: StatusCodes.badRequest,
            message: "User with this Email already exists",
        };
    }

    try {
        const salt = await generateSalt();
        const hashedPass = await hashPassword(password, salt);

        const newUser: TNewUser = {
            ...data,
            password: hashedPass,
            salt,
        };

        const insertedUser = await db
            .insert(userT)
            .values(newUser)
            .returning({ user_id: userT.id, role: userT.role })
            .then((data) => data[0]);

        if (!insertedUser) {
            return {
                status: StatusCodes.badRequest,
                message: "Can't create user!",
            };
        }

        await createSession({
            role: insertedUser.role,
            userId: String(insertedUser.user_id),
        });
        return {
            status: StatusCodes.success,
            user: insertedUser,
            message: "User created successfully",
        };
    } catch (error) {
        return ShortResponses.severError(error);
    }
};

export const SignInAction = async (payload: TSignInPayload) => {
    const { success, data, error } =
        userServerSchema.auth.signin.safeParse(payload);
    if (!success) {
        return ShortResponses.schemaError(error);
    }
    const { email, password } = data;
    console.log("here we are ");
    try {
        const user = await db.query.userT.findFirst({
            where: eq(userT.email, email),
        });
        console.log("user : ", user);
        if (!user) {
            return ShortResponses.notFoundError("email");
        }
        const isEqualPassword = await comparePassword({
            password,
            hashedPassword: user.password,
            salt: user.salt,
        });
        if (!isEqualPassword) {
            return {
                status: StatusCodes.unauthorized,
                message: "password is incorrect !",
            };
        }
        await createSession({ role: user.role, userId: String(user.id) });
        return {
            status: StatusCodes.success,
            message: `Welcome ${user.first_name}`,
        };
    } catch (error) {
        return ShortResponses.severError(error);
    }
};

export const logOutAction = async () => {
    try {
        const sessionId = await getSessionCookie();
        if (!sessionId?.value) {
            return ShortResponses.unAuthorized();
        }
        const logout = await RemoveSession(sessionId.value);

        return logout;
    } catch (error) {
        return ShortResponses.severError(error);
    }
};
