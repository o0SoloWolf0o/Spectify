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
		try {
			const compareItem = localStorage.getItem("compareData");
			const compareBuild = localStorage.getItem("compareBuildData");

			const compareItemData = compareItem ? JSON.parse(compareItem) : {};
			const compareBuildData = compareBuild ? JSON.parse(compareBuild) : {};

			const totalCompareCount = Object.keys(compareItemData).length;
			const totalCompareBuild = Object.keys(compareBuildData).length;
			const totalCompare = totalCompareCount + totalCompareBuild;

			setCompareCounts(totalCompare);
		} catch (error) {
			console.error("Error parsing localStorage data", error);
			setCompareCounts(0);
		}
	}, []);

	return (
		<>
			<CompareCountContext.Provider value={{ compareCounts, setCompareCounts }}>
				<NavComponent />
				<main className="p-8 md:ml-64">
					{children}
				</main>
			</CompareCountContext.Provider>
		</>
	);
}
