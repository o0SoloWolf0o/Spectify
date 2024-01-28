import { forgetPasswordSchema } from "@/schemas";
import * as z from "zod";
import { isUserEmailExists } from "@/database/user";
import { generateResetPasswordToken } from "@/action/tokens";
import { resetPasswordMail } from "@/mail/index";

export default async function ResetPassword(values: z.infer<typeof forgetPasswordSchema>) {
	const valid = forgetPasswordSchema.safeParse(values);
	if (!valid.success) {
		return { success: false, message: valid.error.message };
	}
	const { email } = valid.data;

	const isUserExist = await isUserEmailExists(email);
	if (!isUserExist) {
		return { success: false, message: "Email does not exist." };
	}

	const tokenRecord = await generateResetPasswordToken(email);

	await resetPasswordMail(tokenRecord);
	return { success: true, message: null };
}
