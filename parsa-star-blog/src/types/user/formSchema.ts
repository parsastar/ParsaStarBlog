import { z } from "zod";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
const phoneRegex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/;

const nameFields = {
    firstName: z.string().min(3, "First name must be at least 3 characters"),
    lastName: z.string().min(3, "Last name must be at least 3 characters"),
};

const emailField = {
    email: z.string().email("Invalid email").min(1, "Email is required"),
};

const phoneField = {
    phoneNumber: z
        .string()
        .regex(phoneRegex, "Insert a valid phone number")
        .optional(),
};

const passwordField = {
    password: z
        .string()
        .regex(
            passwordRegex,
            "Password must contain lower and upper case letters and numbers"
        ),
};

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
    ...emailField,
    about: z.string().optional(),
    socials: z
        .object({
            instagram: z.string().optional(),
            linkedin: z.string().optional(),
            twitter: z.string().optional(),
        })
        .optional(),
    website: z.string().optional(),
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
    ...nameFields,
    ...phoneField,
    ...emailField,
    ...passwordField,
    about: z.string().optional(),
    socials: z
        .object({
            instagram: z.string().optional(),
            linkedin: z.string().optional(),
            twitter: z.string().optional(),
        })
        .optional(),
    website: z.string().optional(),
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
