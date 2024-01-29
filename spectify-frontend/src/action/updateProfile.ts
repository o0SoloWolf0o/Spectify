"use server";

import { userDetail } from "@/hooks/userDetail";
import { getUserById, updateUserBioById } from "@/database/user";
import * as zod from "zod";
import { updateProfileSchema } from "@/schemas";

export async function updateProfile(values: zod.infer<typeof updateProfileSchema>) {
	const { bio } = values;

	const user = await userDetail();
	if (!user) {
		return { success: false, message: "User not found." };
	}

	const isUserInDatabase = await getUserById(user.id);
	if (!isUserInDatabase) {
		return { success: false, message: "User not found." };
	}

	try {
		await updateUserBioById(user.id, bio);
		return { success: true, message: "" };
	} catch (err) {
		return { success: false, message: err as string };
	}
}
