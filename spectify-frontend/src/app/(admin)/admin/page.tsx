"use server";

import { userDetail } from "@/hooks/userDetail";
import { notFound } from "next/navigation";

export default async function adminPage() {
	const user = await userDetail();

	if (user && user.role == "ADMIN") {
		return <>Dashboard</>;
	} else {
		return notFound();
	}
}
