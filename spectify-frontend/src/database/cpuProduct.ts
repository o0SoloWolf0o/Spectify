"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createCpuProduct(
	typeProduct: string,
	name: string,
	image: string,
	type: string,
	socket: string,
	core: string,
	thread: string,
	year: string,
	price: string,
	tdp: string,
	clock: string,
	turbo: string,
	description: string
) {
	try {
		await prisma.cpu.create({
			data: {
				typeProduct,
				name,
				image,
				type,
				socket,
				core,
				thread,
				year,
				price,
				tdp,
				clock,
				turbo,
				description,
			},
		});
	} catch (err) {
		throw new Error(err as string);
	}
}

export async function getCpuProduct() {
	try {
		const cpu = await prisma.cpu.findMany({ take: 10 });
		return cpu;
	} catch (err) {
		throw new Error(err as string);
	}
}

export async function getCpuProducts() {
	try {
		const cpu = await prisma.cpu.findMany();
		return cpu;
	} catch (err) {
		throw new Error(err as string);
	}
}

export async function getCpuProductById(id: string) {
	try {
		const cpu = await prisma.cpu.findUnique({ where: { id } });
		return cpu;
	} catch (err) {
		throw new Error(err as string);
	}
}

export async function updateCpuProductById(
	id: string,
	typeProduct: string,
	name: string,
	image: string,
	type: string,
	socket: string,
	core: string,
	thread: string,
	year: string,
	price: string,
	tdp: string,
	clock: string,
	turbo: string,
	description: string
) {
	try {
		const cpu = await prisma.cpu.update({
			where: { id },
			data: {
				typeProduct,
				name,
				image,
				type,
				socket,
				core,
				thread,
				year,
				price,
				tdp,
				clock,
				turbo,
				description,
			},
		});
		return cpu;
	} catch (err) {
		throw new Error(err as string);
	}
}

export async function removeCpuProductById(id: string) {
	try {
		await prisma.cpu.delete({ where: { id } });
	} catch (err) {
		throw new Error(err as string);
	}
}