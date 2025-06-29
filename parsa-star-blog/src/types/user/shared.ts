export type TUserRoles = "user" | "author" | "admin";
export const userRolesArray = ["user", "author", "admin"] as const;
export type TUserSocials = {
    instagram: string | null;
    linkedin: string | null;
    twitter: string | null;
};

/// idea is that we share a base schema and its parts for bot client and server to validate data and prevent the dry
/// user shared schema parts for server zod validation in api.ts and the form.ts
// this way we will have one source of truth and export and use the same thing over and over

import { z } from "zod";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
const phoneRegex = /^(?:\+98\s?|0)?9\d{9}$/;

const nameFields = {
    first_name: z.string().min(3, "First name must be at least 3 characters"),
    last_name: z.string().min(3, "Last name must be at least 3 characters"),
};
const emailField = {
    email: z.string().email("Invalid email").min(1, "Email is required"),
};
const phoneField = {
    phone_number: z
        .string()
        .regex(phoneRegex, "Insert a valid phone number")

        .nullable(),
};
const passwordField = {
    password: z
        .string()
        .regex(
            passwordRegex,
            "Password must contain lower and upper case letters and numbers"
        ),
};
const infoField = {
    image: z.string().nullable(),
    about: z.string().nullable(),
    website: z.string().nullable(),
    socials: z
        .object({
            instagram: z.string().nullable(),
            linkedin: z.string().nullable(),
            twitter: z.string().nullable(),
        })

        .nullable(),
};

const roleField = { role: z.enum(userRolesArray) };

const userBase = {
    id: z.number(),
    ...nameFields,
    ...emailField,
    ...phoneField,
    ...passwordField,
    ...roleField,
    ...infoField,
};

// we export all we need to a shared user schema and use this in user/api and user/fomr
export const SharedUserSchema = {
    nameFields,
    emailField,
    phoneField,
    passwordField,
    infoField,
    roleField,
    userBase,
    phoneRegex,
    passwordRegex,
};
