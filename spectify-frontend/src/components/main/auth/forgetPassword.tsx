"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgetPasswordSchema } from "@/schemas";
import * as zod from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import AuthErrorComponent from "@/components/main/auth/authError";
import AuthSuccessComponent from "@/components/main/auth/authSuccess";
import { useState, useTransition } from "react";
import ResetPassword from "@/action/resetPassword";

interface ForgetPasswordProps {
	setPanel?: React.Dispatch<React.SetStateAction<string>>;
}

export default function ForgetPasswordComponent({ setPanel }: ForgetPasswordProps) {
	const [authError, setAuthError] = useState<string | null | undefined>("");
	const [authSuccess, setAuthSuccess] = useState<string | null | undefined>("");
	const [isPending, startTransition] = useTransition();
	const router = useRouter();
	const forgetPasswordForm = useForm<zod.infer<typeof forgetPasswordSchema>>({
		resolver: zodResolver(forgetPasswordSchema),
		defaultValues: {
			email: "",
		},
	});

	function forgetPasswordSubmit(values: { email: string }) {
		setAuthError("");
		setAuthSuccess("");
		startTransition(() => {
			ResetPassword(values).then((res) => {
				if (res.success) {
					setAuthSuccess("Reset password email has been sent.");
				} else {
					setAuthError(res.message);
				}
			});
		});
	}

	function redirectSignIn() {
		if (setPanel) {
			setPanel("signIn");
		} else {
			router.push("/login");
		}
	}

	return (
		<>
			<Form {...forgetPasswordForm}>
				<h1>Forget Password</h1>
				<FormDescription>Enter your account email, and we'll send a secure password reset message.</FormDescription>
				<form onSubmit={forgetPasswordForm.handleSubmit(forgetPasswordSubmit)} className="space-y-8">
					<FormField
						control={forgetPasswordForm.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input placeholder="Email" {...field} disabled={isPending} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<AuthErrorComponent message={authError} />
					<AuthSuccessComponent message={authSuccess} />
					<Button type="submit" className="w-full" disabled={isPending}>
						Send mail
					</Button>
				</form>
				<div className="flex flex-col items-center">
					<div className="flex gap-2">
						<p>Remember your password?</p>
						<button onClick={redirectSignIn} disabled={isPending}>
							Sign in
						</button>
					</div>
				</div>
			</Form>
		</>
	);
}
