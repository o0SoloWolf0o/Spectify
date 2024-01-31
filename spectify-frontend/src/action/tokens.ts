import { v4 as uuid } from "uuid";
import { createResetPasswordToken, getResetPasswordTokenByEmail, deleteResetPasswordTokenById } from "@/database/resetPassword";

const TIME_SECOND = 1000;
const TIME_MINUTE = 60 * TIME_SECOND;
const TIME_HOUR = 60 * TIME_MINUTE;

export async function generateResetPasswordToken(email: string) {
	const token = uuid();
	const expires_duration = TIME_HOUR;
	const expires = new Date(new Date().getTime() + expires_duration);

	const existingToken = await getResetPasswordTokenByEmail(email);

	if (existingToken) {
		await deleteResetPasswordTokenById(existingToken.id);
	}

	const tokenRecord = await createResetPasswordToken(email, token, expires);
	return tokenRecord;
}
