export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<main className="m-8 p-8 shadow">{children}</main>
		</>
	);
}
