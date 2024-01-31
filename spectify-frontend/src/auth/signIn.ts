"use server";

import * as zod from "zod";
import { signInSchema } from "@/schemas";
import { signIn } from "@/auth/auth";
import { AuthError } from "next-auth";

export async function authSignIn(values: zod.infer<typeof signInSchema>) {
	const valid = signInSchema.safeParse(values);

	if (!valid.success) {
		return { success: false, message: valid.error.message };
	}

	const { email, password } = valid.data;

	try {
		await signIn("credentials", { email, password });
	} catch (error) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case "CredentialsSignin":
					return { success: false, message: "Invalid credentials." };
				default:
					return { success: false, message: error.message };
			}
		}
		throw error;
	}
}
