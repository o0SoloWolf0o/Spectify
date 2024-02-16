"use server";
import {updateUserImgById} from "@/database/userDetail";
import { userDetail } from "@/hooks/userDetail";
import { getUserById, updateUserBioById, updateUsernameById, isUsernameUnique} from "@/database/user";
import * as zod from "zod";
import { updateProfileSchema } from "@/schemas";
import { getUserImgById } from "@/database/userDetail"



export async function updateProfile(values: zod.infer<typeof updateProfileSchema>) {
	const { image, username, bio } = values;
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
		if (image) {
			await updateUserImgById(user.id, image);
        }

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

export async function getUserImg(userId: string) {
	return await getUserImgById(userId);
  }