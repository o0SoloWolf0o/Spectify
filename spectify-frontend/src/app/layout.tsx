import type { Metadata } from "next";
import { Baloo_2 } from "next/font/google";
import "@/app/globals.css";
import ThemeProvider from "@/components/theme/theme-provider";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth/auth";

const inter = Baloo_2({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Spectify",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const session = await auth();
    return (
        <SessionProvider session={session}>
            <html lang="en" suppressHydrationWarning>
                <body className={inter.className}>
                    <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
                        {children}
                    </ThemeProvider>
                </body>
            </html>
        </SessionProvider>
    );
}
