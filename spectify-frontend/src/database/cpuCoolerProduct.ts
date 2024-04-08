"use server";

import { PrismaClient } from "@prisma/client";
import { string } from "zod";

const prisma = new PrismaClient();

export async function createCpuCooler(typeProduct: string, name: string, image: string, socket: string, description: string, price: string, tdp: string) {
	try {
		await prisma.cpuCooler.create({
			data: {
				typeProduct,
				name,
				image,
				socket,
				description,
				price,
				tdp,
			},
		});
	} catch (err) {
		throw new Error(err as string);
	}
}

export async function getCpuCooler() {
	try {
		const cpuCooler = await prisma.cpuCooler.findMany({ take: 10 });
		return cpuCooler;
	} catch (err) {
		throw new Error(err as string);
	}
}

export async function getCpuCoolers() {
	try {
		const cpuCooler = await prisma.cpuCooler.findMany();
		return cpuCooler;
	} catch (err) {
		throw new Error(err as string);
	}
}

export async function getCpuCoolerById(id: string) {
	try {
		const cpuCooler = await prisma.cpuCooler.findUnique({ where: { id } });
		return cpuCooler;
	} catch (err) {
		throw new Error(err as string);
	}
}

export async function updateCpuCooler(
	id: string,
	typeProduct: string,
	name: string,
	image: string,
	socket: string,
	description: string,
	price: string,
	tdp: string
) {
	try {
		const cpuCooler = await prisma.cpuCooler.update({
			where: { id },
			data: {
				typeProduct,
				name,
				image,
				socket,
				description,
				price,
				tdp,
			},
		});
		return cpuCooler;
	} catch (err) {
		throw new Error(err as string);
	}
}

export async function removeCpuCoolerById(id: string) {
	try {
		await prisma.cpuCooler.delete({ where: { id } });
	} catch (err) {
		throw new Error(err as string);
	}
}