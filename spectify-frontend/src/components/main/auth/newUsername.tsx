"use client";

import * as zod from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState, useTransition } from "react";
import { newUsernameSchema } from "@/schemas";
import AuthErrorComponent from "@/components/main/auth/authError";
import AuthSuccessComponent from "@/components/main/auth/authSuccess";
import newUsername from "@/action/newUsername";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function NewPasswordComponent() {
	const [success, setSuccess] = useState(false);
	const [authError, setAuthError] = useState("");
	const [authSuccess, setAuthSuccess] = useState("");
	const [isPending, startTransition] = useTransition();
	const userId = useSession().data?.user.id;
	const router = useRouter();

	const newUsernameForm = useForm<zod.infer<typeof newUsernameSchema>>({
		resolver: zodResolver(newUsernameSchema),
		defaultValues: {
			username: "",
		},
	});

	function newUsernameSubmit(values: zod.infer<typeof newUsernameSchema>) {
		startTransition(() => {
			setAuthError("");
			setAuthSuccess("");
			newUsername(userId || "", values.username).then((res) => {
				if (res.success) {
					setSuccess(true);
					let timeLeft = 3;
					const timerInterval = setInterval(() => {
						if (timeLeft > 0) {
							setAuthSuccess(`Success. Redirecting in ${timeLeft} seconds...`);
							timeLeft--;
						} else {
							clearInterval(timerInterval);
							router.refresh();
						}
					}, 1000);
				} else {
					setAuthError(res.message);
				}
			});
		});
	}

	return (
		<>
			<Form {...newUsernameForm}>
				<form onSubmit={newUsernameForm.handleSubmit(newUsernameSubmit)} className="space-y-4">
					<h1>Welcome! Signing up with Google? Please choose a username.</h1>
					<FormDescription>Set your new username.</FormDescription>
					<div className="flex flex-col gap-3">
						<FormField
							control={newUsernameForm.control}
							name="username"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input placeholder="username" type="text" {...field} disabled={isPending} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<AuthSuccessComponent message={authSuccess} />
					<AuthErrorComponent message={authError} />
					{!success ? (
						<Button type="submit" disabled={isPending} className="w-full bg-primary1-5">
							Confirm
						</Button>
					) : (
						<></>
					)}
				</form>
			</Form>
		</>
	);
}
