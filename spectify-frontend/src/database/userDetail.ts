import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createUserDetailIfNotExist(userId: string) {
	try {
		const existingUserDetail = await prisma.userDetail.findUnique({
			where: {
				userId: userId,
			},
		});

		if (!existingUserDetail) {
			await prisma.userDetail.create({
				data: {
					userId: userId,
				},
			});
		}
	} catch (error) {
		console.error("Error creating UserDetail:", error);
		throw error;
	}
}

export async function getUserImgById(userId: string) {
	const userDetail = await prisma.userDetail.findUnique({
		where: {
			userId: userId,
		},
	});
	return userDetail?.img;
}

export async function updateUserImgById(userId: string, img: string) {
	const userDetail = await prisma.userDetail.update({
		where: {
			userId: userId,
		},
		data: {
			img: img,
		},
	});
	return userDetail;
}


