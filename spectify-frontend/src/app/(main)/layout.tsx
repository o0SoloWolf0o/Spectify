"use client";

import NavComponent from "@/components/main/nav";

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <NavComponent />
            <main className="ml-60 p-8">{children}</main>
        </>
    );
}
