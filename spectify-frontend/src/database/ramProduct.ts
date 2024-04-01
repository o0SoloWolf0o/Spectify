"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createRamProduct(
	typeProduct: string,
	name: string,
	image: string,
	size: string,
	type: string,
	kit: string,
	description: string,
	price: string
) {
	try {
		await prisma.ram.create({
			data: {
				typeProduct,
				name,
				image,
				size,
				type,
				kit,
				description,
				price,
			},
		});
	} catch (err) {
		throw new Error(err as string);
	}
}

export async function getRamProduct() {
	try {
		const ram = await prisma.ram.findMany({ take: 10 });
		return ram;
	} catch (err) {
		throw new Error(err as string);
	}
}

export async function getRamProductById(id: string) {
	try {
		const ram = await prisma.ram.findUnique({ where: { id } });
		return ram;
	} catch (err) {
		throw new Error(err as string);
	}
}

export async function updateRamProductById(
	id: string,
	typeProduct: string,
	name: string,
	image: string,
	size: string,
	type: string,
	kit: string,
	description: string,
	price: string
) {
	try {
		const ram = await prisma.ram.update({
			where: { id },
			data: {
				typeProduct,
				name,
				image,
				size,
				type,
				kit,
				description,
				price,
			},
		});
		return ram;
	} catch (err) {
		throw new Error(err as string);
	}
}

export async function removeRamProductById(id: string) {
	try {
		await prisma.ram.delete({ where: { id } });
	} catch (err) {
		throw new Error(err as string);
	}
}
