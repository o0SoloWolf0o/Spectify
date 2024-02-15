import * as zod from "zod";
import { isUsernameUnique } from "@/database/user";


export const signInSchema = zod.object({
	email: zod.string().email(),
	password: zod.string().min(1, {
		message: "Password is required",
	}),
});

export const signUpSchema = zod
	.object({
		username: zod.string().min(6, {
			message: "Username must be at least 6 characters",
		}),
		email: zod.string().email(),
		password: zod.string().min(6, {
			message: "Password must be at least 6 characters",
		}),
		confirmPassword: zod.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});

export const forgetPasswordSchema = zod.object({
	email: zod.string().email(),
});

export const newPasswordSchema = zod
	.object({
		password: zod.string().min(6, {
			message: "Password must be at least 6 characters",
		}),
		confirmPassword: zod.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});

	export const updateProfileSchema = zod.object({
		username: zod
		  .string()
		  .min(6, {
			message: "Username must be at least 6 characters",
		  }).max(20, {
			message: "Username must be less than 20 characters",
		  }),

		bio: zod.string().max(100, {
		  message: "Bio must be less than 100 characters",
		}),
		image: zod.string(),
	  });
	  