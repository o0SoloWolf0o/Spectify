"use client";

import { useContext, useEffect, useState } from "react";
import SearchBarComponent from "@/components/main/searchBar";
import Image from "next/image";
import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { getCpuProducts } from "@/action/product";
import { getRamProducts } from "@/action/product";
import { getGpuProducts } from "@/action/product";
import { getHddProducts } from "@/action/product";
import { getSsdProducts } from "@/action/product";
import { getCpuCoolerProducts } from "@/action/product";
import { getMoboProducts } from "@/action/product";
import { getMonitorProducts } from "@/action/product";
import { getPsuProducts } from "@/action/product";
import { CompareCountContext } from "@/app/(main)/layout";
import { GoArrowSwitch } from "react-icons/go";
import { Card, Skeleton } from "@nextui-org/react";

export type cpuProducts = {
	id: string;
	typeProduct: string;
	name: string;
	image: string;
	type: string;
	socket: string;
	core: string;
	thread: string;
	year: string;
	price: string;
	tdp: string;
	clock: string;
	turbo: string;
	description: string;
};

export type ramProducts = {
	typeProduct: string;
	name: string;
	image: string;
	size: string;
	type: string;
	kit: string;
	description: string;
	price: string;
	bus: string;
};

export type gpuProducts = {
	typeProduct: string;
	name: string;
	image: string;
	type: string;
	performance: string;
	architecture: string;
	year: string;
	series: string;
	vram: string;
	price: string;
	tdp: string;
	motherboardBus: string;
	coreClock: string;
	boostClock: string;
	effectiveClock: string;
	length: string;
	coolingFans: string;
	caseSlots: string;
	frameSync: string;
	description: string;
};

export type moboProducts = {
	typeProduct: string;
	name: string;
	image: string;
	size: string;
	socket: string;
	ramslot: string;
	description: string;
	price: string;
};

export type hddProducts = {
	typeProduct: string;
	name: string;
	image: string;
	size: string;
	description: string;
	price: string;
	speedRead: string;
	speedWrite: string;
};

export type ssdProducts = {
	typeProduct: string;
	name: string;
	image: string;
	size: string;
	type: string;
	description: string;
	price: string;
	speedRead: string;
	speedWrite: string;
};

export type cpuCoolerProducts = {
	typeProduct: string;
	name: string;
	image: string;
	socket: string;
	description: string;
	price: string;
};

export type monitorProducts = {
	typeProduct: string;
	name: string;
	image: string;
	panelType: string;
	resolution: string;
	refreshRate: string;
	size: string;
	freesync: string;
	gsync: string;
	price: string;
	description: string;
};

export type psuProducts = {
	typeProduct: string;
	name: string;
	image: string;
	wattage: string;
	description: string;
	price: string;
};

export type Product = cpuProducts | ramProducts | gpuProducts | moboProducts | hddProducts | ssdProducts | cpuCoolerProducts | monitorProducts | psuProducts;

export default function ProductPage() {
	const [allProducts, setAllProducts] = useState<Product[]>([]);
	const [searchValue, setSearchValue] = useState("");
	const [filteredSearchProducts, setFilteredSearchProducts] = useState<Product[]>([]);
	const { compareCounts, setCompareCounts } = useContext(CompareCountContext);

	useEffect(() => {
		console.log("Fetching products...");
		const fetchProducts = async () => {
			try {
				const [
					cpuProducts,
					ramProducts,
					gpuProducts,
					moboProducts,
					hddProducts,
					ssdProducts,
					cpuCoolerProducts,
					monitorProducts,
					psuProducts,
				] = await Promise.all([
					getCpuProducts(),
					getRamProducts(),
					getGpuProducts(),
					getMoboProducts(),
					getHddProducts(),
					getSsdProducts(),
					getCpuCoolerProducts(),
					getMonitorProducts(),
					getPsuProducts(),
				]);

				const combinedProducts: Product[] = [
					...cpuProducts,
					...ramProducts,
					...gpuProducts,
					...moboProducts,
					...hddProducts,
					...ssdProducts,
					...cpuCoolerProducts,
					...monitorProducts,
					...psuProducts,
				] as Product[];

				setFilteredSearchProducts(combinedProducts);
				setAllProducts(combinedProducts);

				console.log(combinedProducts);
			} catch (error) {
				// Handle errors here
				console.error("Error fetching products:", error);
			}
		};

		// Call the fetchProducts function when the component mounts
		fetchProducts();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []); // The empty dependency array ensures this useEffect runs only once, equivalent to componentDidMount

	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

	function handleProductClick(product: Product) {
		setSelectedProduct(product);
		onOpen();
	}

	function handleSearch(value: string) {
		console.log("Search value:", value);
		setSearchValue(value);

		const updatedProducts = allProducts.filter((product) => product.name.toLowerCase().includes(value.toLowerCase()));
		setFilteredSearchProducts(updatedProducts.length > 0 ? updatedProducts : allProducts);
	}

	const [selectedTypeProduct, setSelectedTypeProduct] = useState<string | null>(null);

	const filterNames = ["CPU", "GPU", "RAM", "SSD", "HDD", "Power Supply", "Mother Board", "CPU Cooler", "Monitor"];

	function handleTypeProduct(typeName: string | null) {
		if (typeName === null) {
			setSelectedTypeProduct(null);
			setFilteredSearchProducts(allProducts);
		} else {
			setSelectedTypeProduct(typeName);
			const updatedProducts = allProducts.filter((product) => product.typeProduct === typeName);
			setFilteredSearchProducts(updatedProducts);
			console.log("Updated products:", updatedProducts);
		}
	}

	function handleResetFilter() {
		setSelectedTypeProduct(null);
		setFilteredSearchProducts(allProducts);
	}

	// Function to save JSON data to local storage
	const saveToLocalStorage = (data: Product[]) => {
		try {
			const jsonData = JSON.stringify(data);
			localStorage.setItem("compareData", jsonData);
			console.log("Data saved to local storage:", jsonData);
		} catch (error) {
			console.error("Error saving data to local storage:", error);
		}
	};

	const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);

	function handleCompareClick(product: Product) {
		// Additional logic if needed before adding to the array
		const updatedSelectedProducts = [...selectedProducts, product];

		// Limit the array to 2 products if needed
		// const limitedSelectedProducts = updatedSelectedProducts.slice(0, 2);

		// Remove the limit on the array size
		const unlimitedSelectedProducts = updatedSelectedProducts;

		// Update the state
		// setSelectedProducts(limitedSelectedProducts);
		setSelectedProducts(unlimitedSelectedProducts);

		// Save to local storage
		// saveToLocalStorage(limitedSelectedProducts);
		saveToLocalStorage(unlimitedSelectedProducts);

		const compareItem = localStorage.getItem("compareData");
		const totalCompare = Object.keys(JSON.parse(compareItem || "{}")).length;
		setCompareCounts(totalCompare);
	}

	return (
		<>
			<SearchBarComponent onSearch={handleSearch} placeholder={"Product"} />

			<div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
				{filterNames.map((name, index) => (
					<div key={index} style={{ display: "flex", flexDirection: "row", alignItems: "center", margin: "0 10px 0 10px" }}>
						<input
							type="radio"
							id={name}
							name="typeProduct"
							value={name}
							checked={selectedTypeProduct === name}
							onChange={(e) => handleTypeProduct(e.target.value)}
						/>
						<label htmlFor={name} style={{ fontWeight: selectedTypeProduct === name ? "bold" : "normal" }}>
							&nbsp;{name}
						</label>
					</div>
				))}
				<button onClick={handleResetFilter}>Reset Filter</button>
			</div>

			<div style={{ display: "flex", flexWrap: "wrap", marginTop: "20px" }}>

				{/* loading product skeleton */}
				{filteredSearchProducts.length === 0 && (
					<div style={{ display: "flex",  flexWrap: "wrap" }}>
						{/* <p>Loading products...</p> */}
						<Card className="w-[200px] space-y-5 p-4 mr-5" radius="lg">
							<Skeleton className="rounded-lg">
								<div className="h-24 rounded-lg bg-default-300"></div>
							</Skeleton>
							<div className="space-y-3">
								<Skeleton className="w-3/5 rounded-lg">
									<div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
								</Skeleton>
								<Skeleton className="w-4/5 rounded-lg">
									<div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
								</Skeleton>
								<Skeleton className="w-2/5 rounded-lg">
									<div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
								</Skeleton>
							</div>
						</Card>

						<Card className="w-[200px] space-y-5 p-4 mr-5" radius="lg">
							<Skeleton className="rounded-lg">
								<div className="h-24 rounded-lg bg-default-300"></div>
							</Skeleton>
							<div className="space-y-3">
								<Skeleton className="w-3/5 rounded-lg">
									<div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
								</Skeleton>
								<Skeleton className="w-4/5 rounded-lg">
									<div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
								</Skeleton>
								<Skeleton className="w-2/5 rounded-lg">
									<div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
								</Skeleton>
							</div>
						</Card>

						<Card className="w-[200px] space-y-5 p-4 mr-5" radius="lg">
							<Skeleton className="rounded-lg">
								<div className="h-24 rounded-lg bg-default-300"></div>
							</Skeleton>
							<div className="space-y-3">
								<Skeleton className="w-3/5 rounded-lg">
									<div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
								</Skeleton>
								<Skeleton className="w-4/5 rounded-lg">
									<div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
								</Skeleton>
								<Skeleton className="w-2/5 rounded-lg">
									<div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
								</Skeleton>
							</div>
						</Card>

						<Card className="w-[200px] space-y-5 p-4 mr-5" radius="lg">
							<Skeleton className="rounded-lg">
								<div className="h-24 rounded-lg bg-default-300"></div>
							</Skeleton>
							<div className="space-y-3">
								<Skeleton className="w-3/5 rounded-lg">
									<div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
								</Skeleton>
								<Skeleton className="w-4/5 rounded-lg">
									<div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
								</Skeleton>
								<Skeleton className="w-2/5 rounded-lg">
									<div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
								</Skeleton>
							</div>
						</Card>

						<Card className="w-[200px] space-y-5 p-4 mr-5" radius="lg">
							<Skeleton className="rounded-lg">
								<div className="h-24 rounded-lg bg-default-300"></div>
							</Skeleton>
							<div className="space-y-3">
								<Skeleton className="w-3/5 rounded-lg">
									<div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
								</Skeleton>
								<Skeleton className="w-4/5 rounded-lg">
									<div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
								</Skeleton>
								<Skeleton className="w-2/5 rounded-lg">
									<div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
								</Skeleton>
							</div>
						</Card>

						<Card className="w-[200px] space-y-5 p-4 mr-5" radius="lg">
							<Skeleton className="rounded-lg">
								<div className="h-24 rounded-lg bg-default-300"></div>
							</Skeleton>
							<div className="space-y-3">
								<Skeleton className="w-3/5 rounded-lg">
									<div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
								</Skeleton>
								<Skeleton className="w-4/5 rounded-lg">
									<div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
								</Skeleton>
								<Skeleton className="w-2/5 rounded-lg">
									<div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
								</Skeleton>
							</div>
						</Card>

						<Card className="w-[200px] space-y-5 p-4 mr-5" radius="lg">
							<Skeleton className="rounded-lg">
								<div className="h-24 rounded-lg bg-default-300"></div>
							</Skeleton>
							<div className="space-y-3">
								<Skeleton className="w-3/5 rounded-lg">
									<div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
								</Skeleton>
								<Skeleton className="w-4/5 rounded-lg">
									<div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
								</Skeleton>
								<Skeleton className="w-2/5 rounded-lg">
									<div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
								</Skeleton>
							</div>
						</Card>

						<Card className="w-[200px] space-y-5 p-4 mr-5 mt-5" radius="lg">
							<Skeleton className="rounded-lg">
								<div className="h-24 rounded-lg bg-default-300"></div>
							</Skeleton>
							<div className="space-y-3">
								<Skeleton className="w-3/5 rounded-lg">
									<div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
								</Skeleton>
								<Skeleton className="w-4/5 rounded-lg">
									<div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
								</Skeleton>
								<Skeleton className="w-2/5 rounded-lg">
									<div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
								</Skeleton>
							</div>
						</Card>

						<Card className="w-[200px] space-y-5 p-4 mr-5 mt-5" radius="lg">
							<Skeleton className="rounded-lg">
								<div className="h-24 rounded-lg bg-default-300"></div>
							</Skeleton>
							<div className="space-y-3">
								<Skeleton className="w-3/5 rounded-lg">
									<div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
								</Skeleton>
								<Skeleton className="w-4/5 rounded-lg">
									<div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
								</Skeleton>
								<Skeleton className="w-2/5 rounded-lg">
									<div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
								</Skeleton>
							</div>
						</Card>

						<Card className="w-[200px] space-y-5 p-4 mr-5 mt-5" radius="lg">
							<Skeleton className="rounded-lg">
								<div className="h-24 rounded-lg bg-default-300"></div>
							</Skeleton>
							<div className="space-y-3">
								<Skeleton className="w-3/5 rounded-lg">
									<div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
								</Skeleton>
								<Skeleton className="w-4/5 rounded-lg">
									<div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
								</Skeleton>
								<Skeleton className="w-2/5 rounded-lg">
									<div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
								</Skeleton>
							</div>
						</Card>

						<Card className="w-[200px] space-y-5 p-4 mr-5 mt-5" radius="lg">
							<Skeleton className="rounded-lg">
								<div className="h-24 rounded-lg bg-default-300"></div>
							</Skeleton>
							<div className="space-y-3">
								<Skeleton className="w-3/5 rounded-lg">
									<div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
								</Skeleton>
								<Skeleton className="w-4/5 rounded-lg">
									<div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
								</Skeleton>
								<Skeleton className="w-2/5 rounded-lg">
									<div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
								</Skeleton>
							</div>
						</Card>

						<Card className="w-[200px] space-y-5 p-4 mr-5 mt-5" radius="lg">
							<Skeleton className="rounded-lg">
								<div className="h-24 rounded-lg bg-default-300"></div>
							</Skeleton>
							<div className="space-y-3">
								<Skeleton className="w-3/5 rounded-lg">
									<div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
								</Skeleton>
								<Skeleton className="w-4/5 rounded-lg">
									<div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
								</Skeleton>
								<Skeleton className="w-2/5 rounded-lg">
									<div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
								</Skeleton>
							</div>
						</Card>

						<Card className="w-[200px] space-y-5 p-4 mr-5 mt-5" radius="lg">
							<Skeleton className="rounded-lg">
								<div className="h-24 rounded-lg bg-default-300"></div>
							</Skeleton>
							<div className="space-y-3">
								<Skeleton className="w-3/5 rounded-lg">
									<div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
								</Skeleton>
								<Skeleton className="w-4/5 rounded-lg">
									<div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
								</Skeleton>
								<Skeleton className="w-2/5 rounded-lg">
									<div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
								</Skeleton>
							</div>
						</Card>

						<Card className="w-[200px] space-y-5 p-4 mr-5 mt-5" radius="lg">
							<Skeleton className="rounded-lg">
								<div className="h-24 rounded-lg bg-default-300"></div>
							</Skeleton>
							<div className="space-y-3">
								<Skeleton className="w-3/5 rounded-lg">
									<div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
								</Skeleton>
								<Skeleton className="w-4/5 rounded-lg">
									<div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
								</Skeleton>
								<Skeleton className="w-2/5 rounded-lg">
									<div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
								</Skeleton>
							</div>
						</Card>

						<Card className="w-[200px] space-y-5 p-4 mr-5 mt-5" radius="lg">
							<Skeleton className="rounded-lg">
								<div className="h-24 rounded-lg bg-default-300"></div>
							</Skeleton>
							<div className="space-y-3">
								<Skeleton className="w-3/5 rounded-lg">
									<div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
								</Skeleton>
								<Skeleton className="w-4/5 rounded-lg">
									<div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
								</Skeleton>
								<Skeleton className="w-2/5 rounded-lg">
									<div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
								</Skeleton>
							</div>
						</Card>

						<Card className="w-[200px] space-y-5 p-4 mr-5 mt-5" radius="lg">
							<Skeleton className="rounded-lg">
								<div className="h-24 rounded-lg bg-default-300"></div>
							</Skeleton>
							<div className="space-y-3">
								<Skeleton className="w-3/5 rounded-lg">
									<div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
								</Skeleton>
								<Skeleton className="w-4/5 rounded-lg">
									<div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
								</Skeleton>
								<Skeleton className="w-2/5 rounded-lg">
									<div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
								</Skeleton>
							</div>
						</Card>

						<Card className="w-[200px] space-y-5 p-4 mr-5 mt-5" radius="lg">
							<Skeleton className="rounded-lg">
								<div className="h-24 rounded-lg bg-default-300"></div>
							</Skeleton>
							<div className="space-y-3">
								<Skeleton className="w-3/5 rounded-lg">
									<div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
								</Skeleton>
								<Skeleton className="w-4/5 rounded-lg">
									<div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
								</Skeleton>
								<Skeleton className="w-2/5 rounded-lg">
									<div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
								</Skeleton>
							</div>
						</Card>

						<Card className="w-[200px] space-y-5 p-4 mr-5 mt-5" radius="lg">
							<Skeleton className="rounded-lg">
								<div className="h-24 rounded-lg bg-default-300"></div>
							</Skeleton>
							<div className="space-y-3">
								<Skeleton className="w-3/5 rounded-lg">
									<div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
								</Skeleton>
								<Skeleton className="w-4/5 rounded-lg">
									<div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
								</Skeleton>
								<Skeleton className="w-2/5 rounded-lg">
									<div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
								</Skeleton>
							</div>
						</Card>

						<Card className="w-[200px] space-y-5 p-4 mr-5 mt-5" radius="lg">
							<Skeleton className="rounded-lg">
								<div className="h-24 rounded-lg bg-default-300"></div>
							</Skeleton>
							<div className="space-y-3">
								<Skeleton className="w-3/5 rounded-lg">
									<div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
								</Skeleton>
								<Skeleton className="w-4/5 rounded-lg">
									<div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
								</Skeleton>
								<Skeleton className="w-2/5 rounded-lg">
									<div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
								</Skeleton>
							</div>
						</Card>

						<Card className="w-[200px] space-y-5 p-4 mr-5 mt-5" radius="lg">
							<Skeleton className="rounded-lg">
								<div className="h-24 rounded-lg bg-default-300"></div>
							</Skeleton>
							<div className="space-y-3">
								<Skeleton className="w-3/5 rounded-lg">
									<div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
								</Skeleton>
								<Skeleton className="w-4/5 rounded-lg">
									<div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
								</Skeleton>
								<Skeleton className="w-2/5 rounded-lg">
									<div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
								</Skeleton>
							</div>
						</Card>

						<Card className="w-[200px] space-y-5 p-4 mr-5 mt-5" radius="lg">
							<Skeleton className="rounded-lg">
								<div className="h-24 rounded-lg bg-default-300"></div>
							</Skeleton>
							<div className="space-y-3">
								<Skeleton className="w-3/5 rounded-lg">
									<div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
								</Skeleton>
								<Skeleton className="w-4/5 rounded-lg">
									<div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
								</Skeleton>
								<Skeleton className="w-2/5 rounded-lg">
									<div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
								</Skeleton>
							</div>
						</Card>

						<Card className="w-[200px] space-y-5 p-4 mr-5 mt-5" radius="lg">
							<Skeleton className="rounded-lg">
								<div className="h-24 rounded-lg bg-default-300"></div>
							</Skeleton>
							<div className="space-y-3">
								<Skeleton className="w-3/5 rounded-lg">
									<div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
								</Skeleton>
								<Skeleton className="w-4/5 rounded-lg">
									<div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
								</Skeleton>
								<Skeleton className="w-2/5 rounded-lg">
									<div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
								</Skeleton>
							</div>
						</Card>

						<Card className="w-[200px] space-y-5 p-4 mr-5 mt-5" radius="lg">
							<Skeleton className="rounded-lg">
								<div className="h-24 rounded-lg bg-default-300"></div>
							</Skeleton>
							<div className="space-y-3">
								<Skeleton className="w-3/5 rounded-lg">
									<div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
								</Skeleton>
								<Skeleton className="w-4/5 rounded-lg">
									<div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
								</Skeleton>
								<Skeleton className="w-2/5 rounded-lg">
									<div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
								</Skeleton>
							</div>
						</Card>

						<Card className="w-[200px] space-y-5 p-4 mr-5 mt-5" radius="lg">
							<Skeleton className="rounded-lg">
								<div className="h-24 rounded-lg bg-default-300"></div>
							</Skeleton>
							<div className="space-y-3">
								<Skeleton className="w-3/5 rounded-lg">
									<div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
								</Skeleton>
								<Skeleton className="w-4/5 rounded-lg">
									<div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
								</Skeleton>
								<Skeleton className="w-2/5 rounded-lg">
									<div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
								</Skeleton>
							</div>
						</Card>

						<Card className="w-[200px] space-y-5 p-4 mr-5 mt-5" radius="lg">
							<Skeleton className="rounded-lg">
								<div className="h-24 rounded-lg bg-default-300"></div>
							</Skeleton>
							<div className="space-y-3">
								<Skeleton className="w-3/5 rounded-lg">
									<div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
								</Skeleton>
								<Skeleton className="w-4/5 rounded-lg">
									<div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
								</Skeleton>
								<Skeleton className="w-2/5 rounded-lg">
									<div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
								</Skeleton>
							</div>
						</Card>

						<Card className="w-[200px] space-y-5 p-4 mr-5 mt-5" radius="lg">
							<Skeleton className="rounded-lg">
								<div className="h-24 rounded-lg bg-default-300"></div>
							</Skeleton>
							<div className="space-y-3">
								<Skeleton className="w-3/5 rounded-lg">
									<div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
								</Skeleton>
								<Skeleton className="w-4/5 rounded-lg">
									<div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
								</Skeleton>
								<Skeleton className="w-2/5 rounded-lg">
									<div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
								</Skeleton>
							</div>
						</Card>

						<Card className="w-[200px] space-y-5 p-4 mr-5 mt-5" radius="lg">
							<Skeleton className="rounded-lg">
								<div className="h-24 rounded-lg bg-default-300"></div>
							</Skeleton>
							<div className="space-y-3">
								<Skeleton className="w-3/5 rounded-lg">
									<div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
								</Skeleton>
								<Skeleton className="w-4/5 rounded-lg">
									<div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
								</Skeleton>
								<Skeleton className="w-2/5 rounded-lg">
									<div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
								</Skeleton>
							</div>
						</Card>

						<Card className="w-[200px] space-y-5 p-4 mr-5 mt-5" radius="lg">
							<Skeleton className="rounded-lg">
								<div className="h-24 rounded-lg bg-default-300"></div>
							</Skeleton>
							<div className="space-y-3">
								<Skeleton className="w-3/5 rounded-lg">
									<div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
								</Skeleton>
								<Skeleton className="w-4/5 rounded-lg">
									<div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
								</Skeleton>
								<Skeleton className="w-2/5 rounded-lg">
									<div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
								</Skeleton>
							</div>
						</Card>
					</div>
				)}
				{filteredSearchProducts.map((product, index) => (
					<div
						key={index}
						style={{
							width: "200px",
							height: "350px",
							flex: "0 0 auto",
							boxSizing: "border-box",
							padding: "10px",
							margin: "10px",
							boxShadow: "2px 4px 8px rgba(0, 0, 0, 0.1)",
						}}
					>
						<p style={{ fontWeight: "bold" }} onClick={() => handleProductClick(product)}>
							{product.name}
						</p>
						<p style={{ fontSize: "13px" }} onClick={() => handleProductClick(product)}>
							{product.description}
						</p>
						<Image
							src={product.image}
							alt={product.name}
							width={200}
							height={200}
							style={{
								boxShadow: "2px 4px 8px rgba(0, 0, 0, 0.1)",
							}}
							onClick={() => handleProductClick(product)}
						/>

						<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "7px" }}>
							<div>
								{product.price ? (
									<div>
										<p style={{ color: "#6B6B6B" }} onClick={() => handleProductClick(product)}>
											Estimate Price
										</p>
										<p style={{ fontWeight: "bold" }} onClick={() => handleProductClick(product)}>
											{product.price}
										</p>
									</div>
								) : (
									<p>No price available</p>
								)}
							</div>

							<GoArrowSwitch
								className="h-6 w-6"
								onClick={() => handleCompareClick(product)}
							/>
						</div>
					</div>
				))
				}

				<Modal isOpen={isOpen} onOpenChange={onOpenChange} size={"lg"} >
					<Modal isOpen={isOpen} onOpenChange={onOpenChange} size={"lg"}>
						<ModalContent>
							{(onClose) => (
								<>
									<ModalHeader className="flex flex-col gap-1">{selectedProduct?.name}</ModalHeader>
									<ModalBody>
										<div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'stretch' }}>
											<div style={{ display: 'flex', flexDirection: 'column', flex: '1' }}>
												<p style={{ fontSize: '13px', maxWidth: '200px', overflowWrap: 'break-word' }}>{selectedProduct?.description}</p>
												{selectedProduct && selectedProduct.image && selectedProduct.name && (
													<Image
														src={selectedProduct.image}
														alt={selectedProduct.name}
														width={200}
														height={200}
														style={{ boxShadow: '2px 4px 8px rgba(0, 0, 0, 0.1)' }}
													/>
												)}

												<div style={{ marginTop: '7px' }}>
													<p style={{ color: '#6B6B6B' }}>Estimate Price</p>
													<p style={{ fontWeight: 'bold' }}>{selectedProduct?.price} THB</p>
												</div>
											</div>
											<div style={{
												background: "#DCF1FB", flex: '1', padding: '10px',
												display: 'flex', flexDirection: 'column', alignItems: 'flex-start', maxWidth: '200px', marginBottom: '10px'
											}}>
												{selectedProduct?.typeProduct === "CPU" && (
													<div>
														<p>Type: {(selectedProduct as cpuProducts).type}</p>
														<p>Socket: {(selectedProduct as cpuProducts).socket}</p>
														<p>Core: {(selectedProduct as cpuProducts).core}</p>
														<p>Thread: {(selectedProduct as cpuProducts).thread}</p>
														<p>Year: {(selectedProduct as cpuProducts).year}</p>
														<p>TDP: {(selectedProduct as cpuProducts).tdp} W</p>
														<p>Base Clock: {(selectedProduct as cpuProducts).clock} GHz</p>
														<p>Turbo Clock: {(selectedProduct as cpuProducts).turbo} GHz</p>
													</div>
												)}
												{selectedProduct?.typeProduct === "RAM" && (
													<div>
														<p>Size: {(selectedProduct as ramProducts).size}</p>
														<p>Type: {(selectedProduct as ramProducts).type}</p>
														<p>Kit: {(selectedProduct as ramProducts).kit}</p>
														<p>Bus Speed: {(selectedProduct as ramProducts).bus}</p>
													</div>
												)}
												{selectedProduct?.typeProduct === "GPU" && (
													<div>
														<p>Type: {(selectedProduct as gpuProducts).type}</p>
														<p>Architecture: {(selectedProduct as gpuProducts).architecture}</p>
														<p>Performance: {(selectedProduct as gpuProducts).performance}</p>
														<p>Year: {(selectedProduct as gpuProducts).year}</p>
														<p>Series: {(selectedProduct as gpuProducts).series}</p>
														<p>VRAM: {(selectedProduct as gpuProducts).vram}</p>
														<p>TDP: {(selectedProduct as gpuProducts).tdp} W</p>
														<p>Motherboard Bus: {(selectedProduct as gpuProducts).motherboardBus}</p>
														<p>Core Clock: {(selectedProduct as gpuProducts).coreClock} MHz</p>
														<p>Boost Clock: {(selectedProduct as gpuProducts).boostClock} MHz</p>
														<p>Effective Clock: {(selectedProduct as gpuProducts).effectiveClock} MHz</p>
														<p>Length: {(selectedProduct as gpuProducts).length} mm</p>
														<p>Cooling Fans: {(selectedProduct as gpuProducts).coolingFans}</p>
														<p>Case Slots: {(selectedProduct as gpuProducts).caseSlots}</p>
														<p>Frame Sync: {(selectedProduct as gpuProducts).frameSync}</p>
													</div>
												)}
												{selectedProduct?.typeProduct === "SSD" && (
													<div>
														<p>Size: {(selectedProduct as ssdProducts).size}</p>
														<p>Type: {(selectedProduct as ssdProducts).type}</p>
														<p>Read Speed: {(selectedProduct as ssdProducts).speedRead}</p>
														<p>Write Speed: {(selectedProduct as ssdProducts).speedWrite}</p>
													</div>
												)}
												{selectedProduct?.typeProduct === "HDD" && (
													<div>
														<p>Size: {(selectedProduct as hddProducts).size}</p>
														<p>Read Speed: {(selectedProduct as hddProducts).speedRead}</p>
														<p>Write Speed: {(selectedProduct as hddProducts).speedWrite}</p>
													</div>
												)}
												{selectedProduct?.typeProduct === "Power Supply" && (
													<div>
														<p>Wattage: {(selectedProduct as psuProducts).wattage} W</p>
													</div>
												)}
												{selectedProduct?.typeProduct === "Mother Board" && (
													<div>
														<p>Size: {(selectedProduct as moboProducts).size}</p>
														<p>Socket: {(selectedProduct as moboProducts).socket}</p>
														<p>Ram Slot: {(selectedProduct as moboProducts).ramslot}</p>
													</div>
												)}
												{selectedProduct?.typeProduct === "CPU Cooler" && (
													<div>
														<p>Socket: {(selectedProduct as cpuCoolerProducts).socket}</p>
													</div>
												)}
												{selectedProduct?.typeProduct === "Monitor" && (
													<div>
														<p>Panel Type: {(selectedProduct as monitorProducts).panelType}</p>
														<p>Resolution: {(selectedProduct as monitorProducts).resolution}</p>
														<p>Refresh Rate: {(selectedProduct as monitorProducts).refreshRate}</p>
														<p>Size: {(selectedProduct as monitorProducts).size}</p>
														<p>FreeSync: {(selectedProduct as monitorProducts).freesync}</p>
														<p>G-Sync: {(selectedProduct as monitorProducts).gsync}</p>
													</div>
												)}

											</div>
										</div>
									</ModalBody>
								</>
							)}
						</ModalContent>
					</Modal>

				</Modal>
			</div>
		</>
	);
}
