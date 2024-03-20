"use server";

import { userDetail } from "@/hooks/userDetail";
import { createBuild } from "@/database/build";
import { buildSchema } from "@/schemas";
import * as zod from "zod";

export default async function saveBuild(build: zod.infer<typeof buildSchema>) {
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
