"use server";

import { buildSchema } from "@/schemas";
import * as zod from "zod";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createBuild(userId: string, build: zod.infer<typeof buildSchema>) {
	try {
		await prisma.build.create({
			data: {
				image: build.image,
				buildName: build.buildName,
				buildBio: build.buildBio,
				cpu_id: build.cpu,
				mobo_id: build.mb,
				ram_id: build.ram,
				gpu_id: build.gpu,
				ssd_id: build.ssd,
				psu_id: build.psu,
				case_id: build.cases,
				cpuCooler_id: build.cooler,
				user_id: userId,
				date: new Date(),
			},
		});
	} catch (e) {
		throw e;
	}
}

export async function getBuildById(buildId: string) {
	const build = await prisma.build.findUnique({
		where: {
			id: buildId,
		},
	});
	return build;
}

export const getBuildByUserId = async (user_id: string) => {
	return await prisma.build.findMany({
		where: {
			user_id: user_id,
		},
	});
}
	
export const getBuildsCountByUserId = async (user_id: string) => {
	return await prisma.build.count({
		where: {
			user_id: user_id,
		},
	});
}

export const getBuildsIdbyUserId = async (user_id: string) => {
	const builds = await prisma.build.findMany({
		where: {
			user_id: user_id,
		},
		select: {
			id: true,
			date: true,
		},
	});
	return builds;
}
