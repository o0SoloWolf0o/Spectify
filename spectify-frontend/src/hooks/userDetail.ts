"use server";

import { auth } from "@/auth/auth";
import { ExtendedUser } from "@/auth/auth.module";

interface userDetailProps {
	user?: ExtendedUser;
}

export async function userDetail(): Promise<ExtendedUser | undefined> {
	const session = await auth();
	const user = session?.user;
	return user ? user : undefined;
}
