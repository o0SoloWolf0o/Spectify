"use server";
import { user } from "@nextui-org/react";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";



const prisma = new PrismaClient();

export async function changePassword(email: string, password: string) {
    const hash_salt = 10;
	const hashedPassword = await bcrypt.hash(password, hash_salt);
    const user = await prisma.user.update({
        where: {
            email,
        },
        data: {
            password: hashedPassword,
        },
    });
    return user;
}

export async function isOldPasswordCorrect(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    const isPasswordCorrect = await bcrypt.compare(password, user?.password ?? "");
    return isPasswordCorrect;
}