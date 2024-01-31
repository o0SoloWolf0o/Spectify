export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<main className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-auto w-96 p-8 shadow rounded-xl">{children}</main>
		</>
	);
}
