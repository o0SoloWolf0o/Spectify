import * as zod from "zod";

export const signInSchema = zod.object({
    email: zod.string().email(),
    password: zod.string().min(1, {
        message: "Password is required",
    }),
});

export const signUpSchema = zod
    .object({
        username: zod.string().min(6, {
            message: "Username must be at least 6 characters",
        }),
        email: zod.string().email(),
        password: zod.string().min(6, {
            message: "Password must be at least 6 characters",
        }),
        confirmPassword: zod.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

export const forgetPasswordSchema = zod.object({
    email: zod.string().email(),
});
