"use client";

import * as zod from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "@/schemas";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState, useTransition } from "react";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import AuthErrorComponent from "@/components/main/auth/authError";
import { createUser } from "@/database/user";
import { useRouter } from "next/navigation";
import { authSignIn } from "@/auth/signIn";

interface SignUpProps {
	setPanel?: React.Dispatch<React.SetStateAction<string>>;
}

export default function SignUpComponent({ setPanel }: SignUpProps) {
	const [showPassword, setShowPassword] = useState(false);
	const [authError, setAuthError] = useState("");
	const [isPending, startTransition] = useTransition();
	const router = useRouter();
	const signUpForm = useForm<zod.infer<typeof signUpSchema>>({
		resolver: zodResolver(signUpSchema),
		defaultValues: {
			username: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
	});

	function signUpSubmit(values: zod.infer<typeof signUpSchema>) {
		startTransition(() => {
			setAuthError("");
			createUser(values).then((createRes) => {
				if (createRes.success) {
					authSignIn(values).then((res) => {
						if (res && !res.success) {
							setAuthError(res.message);
						}
					});
				} else {
					setAuthError(createRes.message || "Error");
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
			<Form {...signUpForm}>
				<form onSubmit={signUpForm.handleSubmit(signUpSubmit)} className="space-y-4">
					<h1>Sign up</h1>
					<FormDescription>Sign up to enjoy the feature of Revolutie.</FormDescription>
					<div className="flex flex-col gap-3">
						<FormField
							control={signUpForm.control}
							name="username"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Username</FormLabel>
									<FormControl>
										<Input placeholder="Username" {...field} disabled={isPending} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={signUpForm.control}
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
						<FormField
							control={signUpForm.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<div className="relative">
										<FormLabel>Password</FormLabel>
										<FormControl>
											<Input placeholder="********" type={showPassword ? "text" : "password"} {...field} disabled={isPending} />
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
							control={signUpForm.control}
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
					<Button type="submit" disabled={isPending} className="w-full bg-primary1-5 hover:bg-primary1-6">
						Sign up
					</Button>
					<div className="flex items-center">
						<hr className="flex-1 border-t border-gray-300" />
						<p className="mx-4 text-gray-500">or</p>
						<hr className="flex-1 border-t border-gray-300" />
					</div>
					<Button type="button" disabled={isPending} className="w-full bg-primary1-5 hover:bg-primary1-6">
						<FcGoogle className="mr-2" /> Sign in with Google
					</Button>
					<div className="flex flex-col items-center">
						<div className="flex gap-2">
							<p>Have an account?</p>
							<button
								type="button"
								onClick={redirectSignIn}
								disabled={isPending}
								className="text-primary1-5 hover:text-primary1-6 disabled:text-primary1-2"
							>
								Sign in
							</button>
						</div>
					</div>
				</form>
			</Form>
		</>
	);
}
