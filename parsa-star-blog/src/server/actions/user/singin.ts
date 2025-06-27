"use server";

import { eq } from "drizzle-orm";
import { db } from "@/db";
import { userT } from "@/db/schema";
import { ShortResponses } from "@/server/lib/shortResponses";
import { TSignInPayload } from "@/types/user/api";
import { userServerSchema } from "@/types/user/schemas/serverSchema";
import { comparePassword } from "@/server/lib/passwordHasher";
import StatusCodes from "@/server/lib/constants";
import { createSession } from "./session";

export const SignInAction = async (payload: TSignInPayload) => {
    const { success, data, error } =
        userServerSchema.auth.logIn.safeParse(payload);
    if (!success) {
        return ShortResponses.schemaError(error);
    }
    const { email, password } = data;
    console.log("here we are ")
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
