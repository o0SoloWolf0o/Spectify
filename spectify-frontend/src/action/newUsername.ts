"use server";

import { newUsernameSchema } from "@/schemas";
import { isUsernameUnique, updateUsernameById } from "@/database/user";

export default async function newUsername(id: string, username: string) {
	const validUsername = newUsernameSchema.safeParse(username);
	if (!validUsername) {
		return { success: false, message: "Not valid username." };
	}

	const usernameUnique = await isUsernameUnique(username);
	if (!usernameUnique) {
		return { success: false, message: "Username already exist." };
	}

	try {
		const update = await updateUsernameById(id, username);
		return { success: true, message: "Success" };
	} catch (e) {
		return { success: false, message: "error:", e };
	}
}
