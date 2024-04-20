"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createMoboProduct(
	typeProduct: string,
	name: string,
	image: string,
	size: string,
	socketCPU: string,
	socketStorage: string,
	ramslot: string,
	ramkit: string,
	description: string,
	price: string,
	tdp: string,
) {
	try {
		await prisma.mobo.create({
			data: {
				typeProduct,
				name,
				image,
				size,
				socketCPU,
				socketStorage,
				ramslot,
				ramkit,
				description,
				price,
				tdp,
			},
		});
	} catch (err) {
		throw new Error(err as string);
	}
}

export async function getMoboProduct() {
	try {
		const mobo = await prisma.mobo.findMany({ take: 10 });
		return mobo;
	} catch (err) {
		throw new Error(err as string);
	}
}

export async function getMoboProducts() {
	try {
		const mobo = await prisma.mobo.findMany();
		return mobo;
	} catch (err) {
		throw new Error(err as string);
	}
}

export async function getMoboProductById(id: string) {
	try {
		const mobo = await prisma.mobo.findUnique({ where: { id } });
		return mobo;
	} catch (err) {
		throw new Error(err as string);
	}
}

export async function updateMoboProductById(
	id: string,
	typeProduct: string,
	name: string,
	image: string,
	size: string,
	socketCPU: string,
	socketStorage: string,
	ramslot: string,
	ramkit: string,
	description: string,
	price: string,
	tdp: string,
) {
	try {
		const mobo = await prisma.mobo.update({
			where: { id },
			data: {
				typeProduct,
				name,
				image,
				size,
				socketCPU,
				socketStorage,
				ramslot,
				ramkit,
				description,
				price,
				tdp
			},
		});
		return mobo;
	} catch (err) {
		throw new Error(err as string);
	}
}

export async function removeMoboById(id: string) {
	try {
		const mobo = await prisma.mobo.delete({ where: { id } });
		return mobo;
	} catch (err) {
		throw new Error(err as string);
	}
}