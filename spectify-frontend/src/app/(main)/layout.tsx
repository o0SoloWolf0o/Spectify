import NavComponent from "@/components/main/nav";

export default function MainLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<NavComponent />
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
