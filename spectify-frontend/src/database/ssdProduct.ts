"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createSsdProduct(
	typeProduct: string,
	name: string,
	image: string,
	size: string,
	type: string,
	description: string,
	price: string
) {
	try {
		await prisma.ssd.create({
			data: {
				typeProduct,
				name,
				image,
				size,
				type,
				description,
				price,
			},
		});
	} catch (err) {
		throw new Error(err as string);
	}
}

export async function getSsdProduct() {
	try {
		const ssd = await prisma.ssd.findMany({ take: 10 });
		return ssd;
	} catch (err) {
		throw new Error(err as string);
	}
}

export async function getSsdProductById(id: string) {
	return await prisma.ssd.findUnique({ where: { id } });
}

export async function updateSsdProductById(
	id: string,
	typeProduct: string,
	name: string,
	image: string,
	size: string,
	type: string,
	description: string,
	price: string
) {
	try {
		const ssd = await prisma.ssd.update({
			where: { id },
			data: {
				typeProduct,
				name,
				image,
				size,
				type,
				description,
				price,
			},
		});
	} catch (err) {
		throw new Error(err as string);
	}
}

export async function removeSsdProductById(id: string) {
	try {
		await prisma.ssd.delete({ where: { id } });
	} catch (err) {
		throw new Error(err as string);
	}
}
