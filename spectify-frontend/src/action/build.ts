"use server";

import { userDetail } from "@/hooks/userDetail";
import { createBuild } from "@/database/build";
import { buildSchema, buildBioSchema } from "@/schemas";
import { getBuildById, updateBuildById } from "@/database/build";
import * as zod from "zod";

export async function saveBuild(build: zod.infer<typeof buildSchema>) {
	const user = await userDetail();
	if (!user) {
		return { success: false, message: "User not found" };
	}

	try {
		await createBuild(user.id, build);
		return { success: true, message: "Build saved" };
	} catch (e) {
		return { success: false, message: "Error saving build" };
	}
}

export async function updateBuild(build: zod.infer<typeof buildBioSchema>) {
	const user = await userDetail();
	if (!user) {
		return { success: false, message: "User not found" };
	}

	try {
		await updateBuildById(user.id, build);
		return { success: true, message: "Build saved" };
	} catch (e) {
		return { success: false, message: "Error saving build" };
	}
}

export async function deleteBuild(buildId: string) {
	const user = await userDetail();
	if (!user) {
		return { success: false, message: "User not found" };
	}
}
