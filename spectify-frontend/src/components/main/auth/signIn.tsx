"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema } from "@/schemas";
import * as zod from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState, useTransition } from "react";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { authSignIn } from "@/auth/signIn";
import AuthErrorComponent from "@/components/main/auth/authError";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

interface SignInProps {
	setPanel?: React.Dispatch<React.SetStateAction<string>>;
}

export default function SignInComponent({ setPanel }: SignInProps) {
	const [showPassword, setShowPassword] = useState(false);
	const [authError, setAuthError] = useState<string | null | undefined>("");
	const [isPending, startTransition] = useTransition();
	const router = useRouter();
	const signInForm = useForm<zod.infer<typeof signInSchema>>({
		resolver: zodResolver(signInSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	function signInSubmit(values: zod.infer<typeof signInSchema>) {
		setAuthError("");
		startTransition(() => {
			authSignIn(values).then((res) => {
				if (res && !res.success) {
					setAuthError(res.message);
				}
			});
		});
	}

	function signInWithGoogle() {
		setAuthError("");
		startTransition(() => {
			signIn("google");
		});
	}

	function redirectSignUp() {
		if (setPanel) {
			setPanel("signUp");
		} else {
			router.push("/register");
		}
	}

	function redirectForgotPassword() {
		if (setPanel) {
			setPanel("forgotPassword");
		} else {
			router.push("/reset-password");
		}
	}

	return (
		<>
			<Form {...signInForm}>
				<form onSubmit={signInForm.handleSubmit(signInSubmit)} className="space-y-4">
					<h1>Sign in</h1>
					<FormDescription>Please sign in to continue to your account.</FormDescription>
					<div className="flex flex-col gap-3">
						<FormField
							control={signInForm.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input placeholder="Email" {...field} disabled={isPending} autoComplete="email" />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={signInForm.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<div className="relative">
										<FormLabel>Password</FormLabel>
										<FormControl>
											<Input
												placeholder="********"
												type={showPassword ? "text" : "password"}
												{...field}
												disabled={isPending}
												autoComplete="current-password"
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
					</div>
					<AuthErrorComponent message={authError} />
					<Button type="submit" className="w-full bg-primary1-5 hover:bg-primary1-6" disabled={isPending}>
						Sign in
					</Button>
					<div className="flex items-center">
						<hr className="flex-1 border-t border-gray-300" />
						<p className="mx-4 text-gray-500">or</p>
						<hr className="flex-1 border-t border-gray-300" />
					</div>
					<Button type="button" onClick={signInWithGoogle} disabled={isPending} className="w-full bg-primary1-5 hover:bg-primary1-6">
						<FcGoogle className="mr-2" /> Sign in with Google
					</Button>
					<div className="flex flex-col items-center">
						<div className="flex gap-2">
							<p>Can&apos;t remember password?</p>
							<button
								type="button"
								onClick={redirectForgotPassword}
								disabled={isPending}
								className="text-primary1-5 hover:text-primary1-6 disabled:text-primary1-2"
							>
								Reset Password
							</button>
						</div>
						<div className="flex gap-2">
							<p>Need an account?</p>
							<button
								type="button"
								onClick={redirectSignUp}
								disabled={isPending}
								className="text-primary1-5 hover:text-primary1-6 disabled:text-primary1-2"
							>
								Sign up
							</button>
						</div>
					</div>
				</form>
			</Form>
		</>
	);
}
