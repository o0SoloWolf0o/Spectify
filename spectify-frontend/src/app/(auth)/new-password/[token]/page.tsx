import NewPasswordComponent from "@/components/main/auth/newPassword";
import { getResetPasswordTokenByToken } from "@/database/resetPassword";
import { notFound } from "next/navigation";

export default async function newPasswordPage({ params }: { params: { token: string } }) {
	const token = params.token;
	const validToken = await getResetPasswordTokenByToken(token);
	if (validToken) {
		const isTokenExpired = new Date(validToken.expires) < new Date();
		if (!isTokenExpired) {
			return (
				<>
					<NewPasswordComponent token={token} />
				</>
			);
		} else {
			return (
				<>
					<p className="flex justify-center">This token is expired.</p>
				</>
			);
		}
	} else return notFound();
}
