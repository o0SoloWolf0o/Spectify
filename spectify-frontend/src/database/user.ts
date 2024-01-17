"use server";

import bcrypt from "bcryptjs";
import * as zod from "zod";
import { signUpSchema } from "@/schemas";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createUser(values: zod.infer<typeof signUpSchema>) {
    const valid = signUpSchema.safeParse(values);
    if (!valid.success) {
        return { success: false, error: valid.error.message };
    }
    const { username, email, password } = valid.data;
    const hash_salt = 10;
    const hashedPassword = await bcrypt.hash(password, hash_salt);

    const existingUserByUsername = await prisma.user.findUnique({ where: { username } });
    const existingUserByEmail = await prisma.user.findUnique({ where: { email } });

    if (existingUserByUsername && existingUserByEmail) {
        return { success: false, error: "Username and Email already exist." };
    } else if (existingUserByUsername) {
        return { success: false, error: "Username already exists." };
    } else if (existingUserByEmail) {
        return { success: false, error: "Email already exists." };
    }

    try {
        await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
            },
        });

        return { success: true, error: null };
    } catch (err) {
        throw new Error(err as string);
    }
}

export async function getUserByEmail(email: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    return user;
}

export async function getUserById(id: string) {
    const user = await prisma.user.findUnique({ where: { id } });
    return user;
}
