"use client";

import { useState } from "react";
import { Input } from "@nextui-org/react";
import { IoSearch } from "react-icons/io5";
import { useDebouncedCallback } from 'use-debounce';

interface SearchBarProps {
    onSearch: (value: string) => void;
    searchValue?: string | null;
    placeholder?: string | null;
}

export default function SearchBarComponent({ onSearch, searchValue, placeholder }: SearchBarProps) {
const [search, setSearch] = useState(searchValue || "");

const handleSearch = useDebouncedCallback((value: string) => {
	console.log("searching",value);
	onSearch(value);
}, 1000);

    return (
        <>
            <form className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                <Input
                    type="text"
                    label=""
                    placeholder={placeholder || ""}
                    labelPlacement="outside"
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        handleSearch(e.target.value);
                    }}
                    startContent={<IoSearch className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />}
                />
            </form>
        </>
    );
}