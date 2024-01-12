import type { Metadata } from "next";
import { Baloo_2 } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/theme/theme-provider";

const inter = Baloo_2({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Spectify",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={inter.className}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="light"
                    enableSystem
                    disableTransitionOnChange
                >
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
