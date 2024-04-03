"use client";

import { useState } from "react";
import { Input } from "@nextui-org/react";
import { IoSearch } from "react-icons/io5";

interface SearchBarProps {
	onSearch: (value: string) => void;
	searchValue?: string | null;
	placeholder?: string | null;
	className?: string;
}

export default function SearchBarComponentAdmin({ onSearch, searchValue, placeholder, className }: SearchBarProps) {
	const [search, setSearch] = useState(searchValue || "");

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		onSearch(search);
	}

	return (
		<>
			<form className={`gap-4 ${className}`} onSubmit={handleSubmit}>
				<Input
					type="text"
					label=""
					placeholder={placeholder || ""}
					labelPlacement="outside"
					startContent={<IoSearch className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />}
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>
			</form>
		</>
	);
}
