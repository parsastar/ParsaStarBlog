"use server";

import { db } from "@/db";
import { userT } from "@/db/schema";
import StatusCodes from "@/server/lib/constants";
import { generateSalt, hashPassword } from "@/server/lib/passwordHasher";
import { TCreateUserPayload } from "@/types/user/api";
import { userServerSchema } from "@/types/user/schemas/serverSchema";
import { eq, InferInsertModel } from "drizzle-orm";
import { createSession } from "./session";
import { ShortResponses } from "@/server/lib/shortResponses";

type TNewUser = InferInsertModel<typeof userT>;

export const signUpAction = async (payload: TCreateUserPayload) => {
    const { success, data, error } =
        userServerSchema.auth.signUp.safeParse(payload);

    if (!success) {
        return ShortResponses.schemaError(error);
    }

    const { email, firstName, lastName, password, phoneNumber } = data;

    const existingUser = await db.query.userT.findFirst({
        where: eq(userT.email, email),
    });

    if (existingUser !== undefined) {
        return {
            status: StatusCodes.badRequest,
            message: "User already exists",
        };
    }

    try {
        const salt = await generateSalt();
        const hashedPass = await hashPassword(password, salt);

        const newUser: TNewUser = {
            first_name: firstName,
            last_name: lastName,
            phone_number: phoneNumber,
            email,
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
