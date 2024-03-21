"use client";

import NavComponent from "@/components/main/nav";
import { useState, createContext, useEffect } from "react";

export const CompareCountContext = createContext<{ compareCounts: number; setCompareCounts: React.Dispatch<React.SetStateAction<number>> }>({
	compareCounts: 0,
	setCompareCounts: () => {},
});

export default function MainLayout({ children }: { children: React.ReactNode }) {
	const [compareCounts, setCompareCounts] = useState(0);

	useEffect(() => {
		const compareItem = localStorage.getItem("compareData");
		const totalCompare = Object.keys(JSON.parse(compareItem || "{}")).length;
		setCompareCounts(totalCompare);
	}, []);

	return (
		<>
			<CompareCountContext.Provider value={{ compareCounts, setCompareCounts }}>
				<NavComponent />
				<main
					className="
                p-8
                md:ml-64
                "
				>
					{children}
				</main>
			</CompareCountContext.Provider>
		</>
	);
}
