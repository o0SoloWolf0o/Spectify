"use client";

import SearchBarComponent from "@/components/main/searchBar";

export default function SearchPage() {
	function handleSearch(value: string) {
		console.log(value);
	}

	return (
		<>
			<SearchBarComponent onSeach={handleSearch} placeholder={"Username"} />
		</>
	);
}
