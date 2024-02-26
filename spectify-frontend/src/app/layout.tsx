import type { Metadata } from "next";
import { Baloo_2 } from "next/font/google";
import "@/app/globals.css";
import ThemeProvider from "@/components/theme/theme-provider";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth/auth";
import NewUsername from "@/components/main/auth/newUsername";

const inter = Baloo_2({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Spectify",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	const session = await auth();
	const username = session?.user.username;
	return (
		<SessionProvider session={session}>
			<html lang="en" suppressHydrationWarning>
				<body className={inter.className}>
					<ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
						{session && username == null ? (
							<>
								<div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-auto w-96 p-8 shadow rounded-xl">
									<NewUsername />
								</div>
							</>
						) : (
							<>{children}</>
						)}
					</ThemeProvider>
				</body>
			</html>
		</SessionProvider>
	);
}
