"use client";

import Link from "next/link";
import ThemeToggle from "@/components/theme/theme-toggle";
import AuthPopup from "@/components/main/auth/authPopup";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

export default function NavComponent() {
	const session = useSession();
	const isSession = session.status === "authenticated";
	const pathname = usePathname();

	function handleSignOut() {
		if (pathname === "/profile" || pathname === "/following") {
			signOut({ callbackUrl: "/" });
		} else {
			signOut();
		}
	}

	return (
		<>
			<div className="h-screen w-60 fixed flex flex-col items-start shadow">
				<Link href="/">Logo</Link>
				<Link href="/">Home</Link>
				<Link href="/search">Search</Link>
				{isSession ? <Link href="/following">Following</Link> : <AuthPopup buttonText="Following" />}
				{isSession ? <Link href="/profile">Profile</Link> : <AuthPopup buttonText="Profile" />}
				<Link href="/build">Build</Link>
				<Link href="/product">Product</Link>
				<Link href="/compare">Compare</Link>
				<ThemeToggle />
				{isSession ? <button onClick={handleSignOut}>Sign out</button> : <AuthPopup buttonText="Sign in" />}
			</div>
		</>
	);
}
