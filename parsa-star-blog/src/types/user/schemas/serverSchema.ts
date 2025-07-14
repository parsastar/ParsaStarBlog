import { z } from "zod";
import { SharedUserSchema } from "../shared";

// this is zod validation for server actions
const { emailField, passwordField, userBase, nameFields, phoneField } =
    SharedUserSchema; // the source of shared types between form and sever used for dry - simplicity and one source

const signUp = z.object({
    ...emailField,
    ...passwordField,
    ...nameFields,
    ...phoneField,
});

const signInUserSchema = z.object({
    ...emailField,
    ...passwordField,
});

const profileUserSchema = z
    .object({
        ...userBase,
    })
    .omit({ role: true, password: true, email: true });

const passwordChangeSchema = z.object({
    ...passwordField,
    newPassword: z.string(),
});

const editUserSchema = z
    .object({
        ...userBase,
    })
    .omit({ password: true });

const postUserSchema = z.object({
    ...userBase,
});

export const userServerSchema = {
    auth: {
        signUp,
        signin: signInUserSchema,
    },
    profile: {
        profile: profileUserSchema,
        changePassword: passwordChangeSchema,
    },
    admin: {
        update: editUserSchema,
        create: postUserSchema,
    },
};
