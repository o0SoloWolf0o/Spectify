import AdminNav from "@/components/admin/adminNav";

export default function MainLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<AdminNav />
			<main
				className="
                p-8
                md:ml-64
                "
			>
				{children}
			</main>
		</>
	);
}
