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
		})
		.max(20, {
			message: "Username must be less than 20 characters",
		}),

	bio: zod
		.string()
		.max(100, {
			message: "Bio must be less than 100 characters",
		})
		.min(0)
		.nullish(),
	image: zod.string(),
});

export const changePasswordSchema = zod
	.object({
		oldPassword: zod.string().min(1, {
			message: "Old password is required",
		}),
		newPassword: zod.string().min(6, {
			message: "New password must be at least 6 characters",
		}),
		confirmPassword: zod.string(),
	})
	.refine((data) => data.newPassword === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});

export const newUsernameSchema = zod.object({
	username: zod.string().min(6, {
		message: "Username must be at least 6 characters",
	}),
});

export const buildSchema = zod.object({
	image: zod.string(),
	buildName: zod.string().min(1, {
		message: "Name is required",
	}),
	buildBio: zod.string().max(100, {
		message: "Bio must be less than 100 characters",
	}),
	cpu: zod.string().min(1),
	mb: zod.string().min(1),
	ram: zod.string().min(1),
	gpu: zod.string().min(1),
	ssd: zod.string().min(1),
	psu: zod.string().min(1),
	cases: zod.string().min(1),
	cooler: zod.string().min(1),
});

export const buildBioSchema = zod.object({
	buildId: zod.string(),
	image: zod.string(),
	buildName: zod.string().min(1, {
		message: "Name is required",
	}),
	buildBio: zod.string().max(100, {
		message: "Bio must be less than 100 characters",
	}),
});
