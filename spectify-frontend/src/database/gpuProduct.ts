"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createGpuProduct(
	typeProduct: string,
	name: string,
	image: string,
	type: string,
	performance: string,
	architecture: string,
	year: string,
	series: string,
	vram: string,
	price: string,
	tdp: string,
	motherboardBus: string,
	coreClock: string,
	boostClock: string,
	effectiveClock: string,
	length: string,
	coolingFans: string,
	caseSlots: string,
	frameSync: string,
	description: string
) {
	try {
		await prisma.gpu.create({
			data: {
				typeProduct,
				name,
				image,
				type,
				performance,
				architecture,
				year,
				series,
				vram,
				price,
				tdp,
				motherboardBus,
				coreClock,
				boostClock,
				effectiveClock,
				length,
				coolingFans,
				caseSlots,
				frameSync,
				description,
			},
		});
	} catch (err) {
		throw new Error(err as string);
	}
}

export async function getGpuProduct() {
	try {
		const gpu = await prisma.gpu.findMany({ take: 10 });
		return gpu;
	} catch (err) {
		throw new Error(err as string);
	}
}

export async function getGpuProducts() {
	try {
		const gpu = await prisma.gpu.findMany();
		return gpu;
	} catch (err) {
		throw new Error(err as string);
	}
}

export async function getGpuProductById(id: string) {
	try {
		const gpu = await prisma.gpu.findUnique({ where: { id } });
		return gpu;
	} catch (err) {
		throw new Error(err as string);
	}
}

export async function updateGpuProductById(
	id: string,
	typeProduct: string,
	name: string,
	image: string,
	type: string,
	performance: string,
	architecture: string,
	year: string,
	series: string,
	vram: string,
	price: string,
	tdp: string,
	motherboardBus: string,
	coreClock: string,
	boostClock: string,
	effectiveClock: string,
	length: string,
	coolingFans: string,
	caseSlots: string,
	frameSync: string,
	description: string
) {
	try {
		const gpu = await prisma.gpu.update({
			where: { id },
			data: {
				typeProduct,
				name,
				image,
				type,
				performance,
				architecture,
				year,
				series,
				vram,
				price,
				tdp,
				motherboardBus,
				coreClock,
				boostClock,
				effectiveClock,
				length,
				coolingFans,
				caseSlots,
				frameSync,
				description,
			},
		});
		return gpu;
	} catch (err) {
		throw new Error(err as string);
	}
}

export async function removeGpuProductById(id: string) {
	try {
		await prisma.gpu.delete({ where: { id } });
	} catch (err) {
		throw new Error(err as string);
	}
}
