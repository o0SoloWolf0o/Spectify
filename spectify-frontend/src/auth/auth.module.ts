import { Role } from "@prisma/client";
import { type DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
	username: string | null;
	bio: string;
	role: Role;
};

declare module "next-auth" {
	interface Session {
		user: ExtendedUser;
	}
}

declare module "next-auth" {
	interface signIn {
		username: string | null;
	}
}
