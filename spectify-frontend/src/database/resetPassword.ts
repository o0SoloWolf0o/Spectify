"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createResetPasswordToken(email: string, token: string, expires: Date) {
	const tokenRecord = await prisma.resetPasswordToken.create({
		data: {
			email,
			token,
			expires,
		},
	});
	return tokenRecord;
}

export async function deleteResetPasswordTokenById(id: string) {
	await prisma.resetPasswordToken.delete({
		where: {
			id,
		},
	});
}

export async function getResetPasswordTokenByEmail(email: string) {
	const tokenRecord = await prisma.resetPasswordToken.findFirst({
		where: {
			email,
		},
	});
	return tokenRecord;
}

export async function getResetPasswordTokenByToken(token: string) {
	const tokenRecord = await prisma.resetPasswordToken.findFirst({
		where: {
			token,
		},
	});
	return tokenRecord;
}

export async function isTokenExistByToken(token: string) {
	const tokenRecord = await prisma.resetPasswordToken.findFirst({
		where: {
			token,
		},
	});
	const isTokenExist = tokenRecord !== null;
	return isTokenExist;
}
