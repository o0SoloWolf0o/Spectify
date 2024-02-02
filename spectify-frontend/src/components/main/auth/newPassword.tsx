"use client";

import * as zod from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState, useTransition } from "react";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { newPasswordSchema } from "@/schemas";
import AuthErrorComponent from "@/components/main/auth/authError";
import AuthSuccessComponent from "@/components/main/auth/authSuccess";
import NewPassword from "@/action/newPassword";
import Link from "next/link";
interface NewPasswordProps {
	token: string;
}

export default function NewPasswordComponent({ token }: NewPasswordProps) {
	const [showPassword, setShowPassword] = useState(false);
	const [authError, setAuthError] = useState("");
	const [authSuccess, setAuthSuccess] = useState("");
	const [isResetPasswordSuccess, setIsResetPasswordSuccess] = useState(false);
	const [isPending, startTransition] = useTransition();

	// const [isResetPasswordSuccess, setIsResetPasswordSuccess] = useState(true);
	// const [authSuccess, setAuthSuccess] = useState("Password has been changed.");

	const newPasswordForm = useForm<zod.infer<typeof newPasswordSchema>>({
		resolver: zodResolver(newPasswordSchema),
		defaultValues: {
			password: "",
			confirmPassword: "",
		},
	});

	function newPasswordSubmit(values: zod.infer<typeof newPasswordSchema>) {
		setAuthError("");
		console.log(values);
		startTransition(() => {
			NewPassword(token, values).then((res) => {
				if (res.success) {
					setIsResetPasswordSuccess(true);
					setAuthSuccess("Password has been changed.");
				} else {
					setAuthError(res.message);
				}
			});
		});
	}

	if (!isResetPasswordSuccess) {
		return (
			<>
				<Form {...newPasswordForm}>
					<h1>Set password</h1>
					<FormDescription>Set your new password.</FormDescription>
					<form onSubmit={newPasswordForm.handleSubmit(newPasswordSubmit)} className="space-y-8">
						<div className="flex flex-col gap-3">
							<FormField
								control={newPasswordForm.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<div className="relative">
											<FormLabel>New Password</FormLabel>
											<FormControl>
												<Input
													placeholder="********"
													type={showPassword ? "text" : "password"}
													{...field}
													disabled={isPending}
												/>
											</FormControl>
											<Button
												type="button"
												onClick={() => setShowPassword(!showPassword)}
												size="icon"
												variant="ghost"
												className="absolute bottom-0 right-0"
												tabIndex={-1}
												disabled={isPending}
											>
												{showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
											</Button>
										</div>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={newPasswordForm.control}
								name="confirmPassword"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Confirm Password</FormLabel>
										<FormControl>
											<Input placeholder="********" type="password" {...field} disabled={isPending} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<AuthErrorComponent message={authError} />
						<Button type="submit" className="w-full" disabled={isPending}>
							Confirm
						</Button>
					</form>
				</Form>
			</>
		);
	} else {
		return (
			<>
				<div className="flex flex-col gap-3">
					<AuthSuccessComponent message={authSuccess} />
					<Button className="bg-primary1-5">
						<Link href="/login">Click here to sign in.</Link>
					</Button>
				</div>
			</>
		);
	}
}
