/* eslint-disable @next/next/no-img-element */
"use client";

import { use, useEffect, useState } from "react";
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

type cpuProducts = {
	id: string;
	typeProduct: string;
	name: string;
	image: string;
	type: string;
	socket: string;
	coreThreads: string;
	year: string;
	price: string;
	tdp: string;
	clock: string;
	turbo: string;
	description: string;
}

type ramProducts = {
	typeProduct: string;
	name: string;
	image: string;
	size: string;
	type: string;
	kit: string;
	description: string;
	price: string;
}

type gpuProducts = {
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
}

type moboProducts = {
	typeProduct: string;
	name: string;
	image: string;
	size: string;
	socket: string;
	ramslot: string;
	description: string;
	price: string;
}

type hddProducts = {
	typeProduct: string;
	name: string;
	image: string;
	size: string;
	description: string;
	price: string;
}

type ssdProducts = {
	typeProduct: string;
	name: string;
	image: string;
	size: string;
	type: string;
	description: string;
	price: string;
}

type cpuCoolerProducts = {
	typeProduct: string;
	name: string;
	image: string;
	socket: string;
	description: string;
	price: string;
}

type monitorProducts = {
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
}

type psuProducts = {
	typeProduct: string;
	name: string;
	image: string;
	wattage: string;
	description: string;
	price: string;
}

type Product = cpuProducts | ramProducts | gpuProducts | moboProducts | hddProducts | ssdProducts | cpuCoolerProducts | monitorProducts | psuProducts;

export default function ProductPage() {


	const [allProducts, setAllProducts] = useState<Product[]>([]);

	const [searchValue, setSearchValue] = useState("");
	const [filteredSearchProducts, setFilteredSearchProducts] = useState<Product[]>([]);


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
				] as Product[];;

				setFilteredSearchProducts(combinedProducts);
				setAllProducts(combinedProducts);

				console.log(combinedProducts);
			} catch (error) {
				// Handle errors here
				console.error('Error fetching products:', error);
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

		const updatedProducts = allProducts.filter((product) =>
			product.name.toLowerCase().includes(value.toLowerCase())

		);
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
			localStorage.setItem('compareData', jsonData);
			console.log('Data saved to local storage:', jsonData);
		} catch (error) {
			console.error('Error saving data to local storage:', error);
		}
	};

	const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);

	function handleCompareClick(product: Product) {
		// Additional logic if needed before adding to the array
		const updatedSelectedProducts = [...selectedProducts, product];

		// Limit the array to 2 products if needed
		const limitedSelectedProducts = updatedSelectedProducts.slice(0, 2);

		// Update the state
		setSelectedProducts(limitedSelectedProducts);

		// Save to local storage
		saveToLocalStorage(limitedSelectedProducts);
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
				{filteredSearchProducts.map((product, index) => (
					<div key={index} style={{
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
						<p style={{ fontSize: "13px" }} onClick={() => handleProductClick(product)}>{product.description}</p>
						<img src={product.image} alt={product.name} style={{ width: "200px", height: "200px", boxShadow: "2px 4px 8px rgba(0, 0, 0, 0.1)" }} onClick={() => handleProductClick(product)} />
						<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "7px" }}>
							<div>
								{product.price ? (
									<div>
										<p style={{ color: "#6B6B6B" }} onClick={() => handleProductClick(product)}>Estimate Price</p>
										<p style={{ fontWeight: "bold" }} onClick={() => handleProductClick(product)}>{product.price}</p>
									</div>
								) : (
									<p>No price available</p>
								)}
							</div>
							<Image
								src="/images/switch_black.png"
								alt="Compare"
								width={30}
								height={30}
								className="mr-2"
								onClick={() => handleCompareClick(product)}
							/>
						</div>
					</div>
				))}

				<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
					<ModalContent>
						{(onClose) => (
							<>
								<ModalHeader className="flex flex-col gap-1">{selectedProduct?.name}</ModalHeader>
								<ModalBody>
									<p style={{ fontSize: "13px" }}>{selectedProduct?.description}</p>
									<img src={selectedProduct?.image} alt={selectedProduct?.name} style={{ width: "200px", height: "200px", boxShadow: "2px 4px 8px rgba(0, 0, 0, 0.1)" }} />
									<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "7px" }}>
										<div>
											<p style={{ color: "#6B6B6B" }}>Estimate Price</p>
											<p style={{ fontWeight: "bold" }}>{selectedProduct?.price}</p>
										</div>
									</div>
								</ModalBody>
								<ModalFooter>
									{/* 
									<Button color="danger" variant="light" onPress={onClose}>
										Close
									</Button>

									<Button color="primary" onPress={onClose}>
										Action
									</Button>
									*/}
								</ModalFooter>
							</>
						)}
					</ModalContent>
				</Modal>
			</div>
		</>
	);
}