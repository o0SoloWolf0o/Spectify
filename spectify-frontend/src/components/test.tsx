"use client";

import { updateProfile } from "@/action/updateProfile";
import { useForm } from "react-hook-form";
import * as zod from "zod";
import { updateProfileSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";

export default function TestComponent() {
	const [isPending, startTransition] = useTransition();
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<zod.infer<typeof updateProfileSchema>>({
		resolver: zodResolver(updateProfileSchema),
		defaultValues: {
			bio: "",
		},
	});

	function updateProfileSubmit(values: zod.infer<typeof updateProfileSchema>) {
		startTransition(() => {
			updateProfile(values).then((res) => {
				if (res) {
					window.location.reload();
				} else {
					alert("Error");
				}
			});
		});
	}

	return (
		<>
			<form onSubmit={handleSubmit(updateProfileSubmit)} className="flex gap-2">
				<input {...register("bio")} type="text" className="outline" placeholder="Update Bio" />
				<button type="submit">Update</button>
			</form>
		</>
	);
}
