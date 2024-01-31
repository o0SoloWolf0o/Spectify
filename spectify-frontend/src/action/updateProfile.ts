"use server";

import { userDetail } from "@/hooks/userDetail";
import { getUserById, updateUserBioById, updateUsernameById, isUsernameUnique} from "@/database/user";
import * as zod from "zod";
import { updateProfileSchema } from "@/schemas";

export async function updateProfile(values: zod.infer<typeof updateProfileSchema>) {
	const { username, bio } = values;
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
		if (username && username !== user.username) {
			// Check for uniqueness before updating
			const isUnique = await isUsernameUnique(username);
			if (!isUnique) {
				return { success: false, message: "Username already exists." };
			}
			await updateUsernameById(user.id, username);
		}

		return { success: true, message: "" };
	} catch (err) {
		return { success: false, message: err as string };
	}
}
