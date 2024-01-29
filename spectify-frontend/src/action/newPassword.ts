import * as z from "zod";
import { newPasswordSchema } from "@/schemas";
import { getResetPasswordTokenByToken } from "@/database/resetPassword";
import { updateUserPasswordByEmail } from "@/database/user";

export default async function NewPassword(token: string, values: z.infer<typeof newPasswordSchema>) {
	const validToken = await getResetPasswordTokenByToken(token);
	if (!validToken) {
		return { success: false, message: "Token is invalid" };
	}

	const isTokenExpired = new Date(validToken.expires) < new Date();
	if (isTokenExpired) {
		return { success: false, message: "Token is expired" };
	}

	const validPassword = newPasswordSchema.safeParse(values);
	if (!validPassword.success) {
		return { success: false, message: validPassword.error.message };
	}

	const { password } = validPassword.data;
	const user = await updateUserPasswordByEmail(validToken.email, password);
	if (!user) {
		return { success: false, message: "User not found" };
	}

	return { success: true, message: "" };
}
