"use server";

import { db } from "@/db";
import { userT } from "@/db/schema";
import StatusCodes from "@/server/lib/constants";
import { generateSalt, hashPassword } from "@/server/lib/passwordHasher";
import { TCreateUserPayload } from "@/types/user/api";
import { userServerSchema } from "@/types/user/schemas/serverSchema";
import { eq, InferInsertModel } from "drizzle-orm";

type TNewUser = InferInsertModel<typeof userT>;

export const signUpAction = async (payload: TCreateUserPayload) => {
    const { success, data, error } =
        userServerSchema.auth.signUp.safeParse(payload);

    if (!success) {
        return {
            status: StatusCodes.badRequest,
            message: "Invalid data",
            errors: error.errors, // You can send specific errors if needed
        };
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
            .returning({ user_id: userT.id, role: userT.role });

        console.log("insertedUser : ", insertedUser);

        if (!insertedUser) {
            return {
                status: StatusCodes.badRequest,
                message: "Can't create user!",
            };
        }

        return {
            status: StatusCodes.success,
            user: insertedUser,
            message: "User created successfully",
        };
    } catch (error) {
        return {
            status: StatusCodes.internalServerError,
            message: "Server error",
            error,
        };
    }
};
