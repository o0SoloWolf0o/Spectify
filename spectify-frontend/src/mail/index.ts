"use server";

import nodemailer from "nodemailer";

const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;
const DOMAIN_NAME = process.env.DOMAIN_NAME;

const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: EMAIL_USER,
		pass: EMAIL_PASS,
	},
});

const mailOptions = {
	from: `Spectify <${EMAIL_USER}>`,
};

export async function createAccountMail(email: string) {
	await transporter.sendMail({
		...mailOptions,
		to: email,
		subject: "Spectify Account Created.",
		text: "Thank you for creating an account with Spectify!",
	});
}

export async function resetPasswordMail({ id, email, token, expires }: { id: string; email: string; token: string; expires: Date }) {
	const webLink = `${DOMAIN_NAME}/new-password/${token}`;
	await transporter.sendMail({
		...mailOptions,
		to: email,
		subject: "Spectify Password Reset.",
		text: `Please use this link to reset your password: ${webLink}`,
	});
}
