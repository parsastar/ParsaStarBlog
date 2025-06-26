import { z } from "zod";
import { SharedUserSchema } from "../shared";

const {
    emailField,
    nameFields,
    passwordField,
    passwordRegex,
    phoneField,
    infoField,
    userBase,
} = SharedUserSchema;

const signUpBase = {
    ...nameFields,
    ...phoneField,
    ...emailField,
    ...passwordField,
    repeatPassword: z.string().min(1, "Repeat password is required"),
};

// actualSchemas

const signUp = z
    .object(signUpBase)
    .refine((data) => data.password === data.repeatPassword, {
        message: "Passwords do not match",
        path: ["repeatPassword"],
    });

// 🔐 Login schema
const logIn = z.object({
    ...emailField,
    ...passwordField,
});

// 🧑‍💼 Profile schema
const profile = z.object({
    ...nameFields,
    ...phoneField,
    ...infoField,
});

// 🔁 Change password schema
const changePassword = z
    .object({
        currentPassword: z
            .string()
            .regex(
                passwordRegex,
                "Password must contain lower and upper case letters and numbers"
            ),
        newPassword: z
            .string()
            .regex(
                passwordRegex,
                "Password must contain lower and upper case letters and numbers"
            ),
        repeatNewPassword: z.string().min(1, "Repeat password is required"),
    })
    .superRefine(({ currentPassword, newPassword, repeatNewPassword }, ctx) => {
        if (currentPassword === newPassword) {
            ctx.addIssue({
                message: "New and old password can't be the same",
                code: "custom",
                path: ["newPassword"],
            });
        }
        if (newPassword !== repeatNewPassword) {
            ctx.addIssue({
                message: "New and repeat password do not match",
                code: "custom",
                path: ["repeatNewPassword"],
            });
        }
    });

// 🛠 Update user schema — safely omit repeatPassword
const UpDateUserSchema = z.object({
    ...userBase,
});

// 🔡 Type definitions
export type TSignUpSchema = z.infer<typeof signUp>;
export type TLogInSchema = z.infer<typeof logIn>;
export type TProfileSchema = z.infer<typeof profile>;
export type TChangePasswordSchema = z.infer<typeof changePassword>;
export type TUpdateUserSchema = z.infer<typeof UpDateUserSchema>;

// final export
export const userFormSchema = {
    auth: {
        signUp: signUp,
        logIn,
    },
    profile: {
        profile,
        changePassword,
    },
    admin: {
        update: UpDateUserSchema,
    },
};
