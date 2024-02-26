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
import { on } from "events";
import { color } from "framer-motion";

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

interface ProductPopUpProps {
	typeProduct: string;
	onSelectProduct: (selectedProduct: Product) => void;
}


export default function ProductPopUp({ typeProduct, onSelectProduct }:  ProductPopUpProps ) {

	const [allProducts, setAllProducts] = useState<Product[]>([]);
	const [searchValue, setSearchValue] = useState("");
	const [filteredSearchProducts, setFilteredSearchProducts] = useState<Product[]>([]);


	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	const[displayText, setDisplayText] = useState<string>('');

	const fetchData = async (typeProduct: string) => {
		switch (typeProduct) {
			case "CPU":
				getCpuProducts().then((data) => {
					setAllProducts(data);
					console.log("CPU products:", data);
					setDisplayText('CPU');
				});
				break;
			case "GPU":
				getGpuProducts().then((data) => {
					setAllProducts(data);
					console.log("GPU products:", allProducts);
					setDisplayText('VGA')
				});
				break;
			case "RAM":
				getRamProducts().then((data) => {
					setAllProducts(data);
					console.log("RAM products:", allProducts);
					setDisplayText('Memory');
				});
				break;
			case "SSD":
				getSsdProducts().then((data) => {
					setAllProducts(data);
					console.log("SSD products:", allProducts);
					setDisplayText('SSD')
				});
				break;
			case "HDD":
				getHddProducts().then((data) => {
					setAllProducts(data);
					console.log("HDD products:", allProducts);
					setDisplayText('HDD')
				});
				break;
			case "Mother Board":
				getMoboProducts().then((data) => {
					setAllProducts(data);
					console.log("Motherboard products:", allProducts);
					setDisplayText('Motherboard')
				});
				break;
			case "Power Supply":
				getPsuProducts().then((data) => {
					setAllProducts(data);
					console.log("PSU products:", allProducts);
					setDisplayText('Power Supply')
				});
				break;
			case "Monitor":
				getMonitorProducts().then((data) => {
					setAllProducts(data);
					console.log("Monitor products:", allProducts);
				});
				break;
			case "CPU Cooler":
				getCpuCoolerProducts().then((data) => {
					setAllProducts(data);
					console.log("CPU Cooler products:", allProducts);
					setDisplayText('CPU cooler')
				});
				break;
			default:
				setAllProducts([]);
				setFilteredSearchProducts(allProducts);
				break;
		}
	}


	function handleSearch(value: string) {
		console.log("Search value:", value);
		setSearchValue(value);


		const filteredProducts = allProducts.filter((product) =>
			product.name.toLowerCase().includes(value.toLowerCase())
		);

		setFilteredSearchProducts(filteredProducts);

	}

	const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

	const [selectedProductInfo, setSelectedProductInfo] = useState<Product | null>(null);

	function handleProductClickInfo(product: Product) {
		setSelectedProductInfo(product);
		innerModalOpenHandler();
	}

	function handleProductClick(product: Product) {
		setSelectedProduct(product);
		console.log("Selected product:", product);
		// return here the selected
		onSelectProduct(product);
	}

	useEffect(() => {
		fetchData(typeProduct); // Call fetchData with the typeProduct parameter
		// eslint-disable-next-line react-hooks/exhaustive-deps
	  }, [typeProduct]);
	  
	const { isOpen: outerModalOpen, onOpen: outerModalOpenHandler, onOpenChange: outerModalOpenChangeHandler } = useDisclosure();
	const { isOpen: innerModalOpen, onOpen: innerModalOpenHandler, onOpenChange: innerModalOpenChangeHandler } = useDisclosure();

	return (
		<>
			{/* 
			<Button onPress={() => {
				handleSearch("");
				outerModalOpenHandler();
			}} className="flex shadow-xl rounded-xl h-16 w-full bg-white hover:bg-[#00A9FF] hover:text-white hover:cursor-pointer duration-200">
				{displayText}
			</Button>
			*/}

			<div onClick={() => {
				handleSearch("");
				outerModalOpenHandler();
			}} className="flex shadow-xl rounded-xl h-16 w-full bg-white hover:bg-[#00A9FF] hover:text-white hover:cursor-pointer duration-200">
				{displayText}
			</div>

			<Modal isOpen={outerModalOpen} onOpenChange={outerModalOpenChangeHandler} size={"full"}>
				<ModalContent>
					{(outerModalOnClose) => (
						<>
							<ModalHeader className="flex flex-col gap-1">
								<div className="w-full pr-8">
									<SearchBarComponent onSeach={handleSearch} placeholder={"Product"} />
								</div>
							</ModalHeader>

							<ModalBody>
								{filteredSearchProducts.map((product, index) => (
									<div key={index} style={{
										width: "200px",
										height: "400px",
										flex: "0 0 auto",
										boxSizing: "border-box",
										padding: "10px",
										margin: "10px",
										boxShadow: "2px 4px 8px rgba(0, 0, 0, 0.1)",
									}}
									>
										<p style={{ fontWeight: "bold" }}>
											{product.name}
										</p>
										<p style={{ fontSize: "13px" }} >{product.description}</p>
										<img src={product.image} alt={product.name} style={{ width: "200px", height: "200px", boxShadow: "2px 4px 8px rgba(0, 0, 0, 0.1)" }} />
										<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "7px" }}>
											<div>
												{product.price ? (
													<div>
														<p style={{ color: "#6B6B6B" }} >Estimate Price</p>
														<p style={{ fontWeight: "bold" }} >{product.price}</p>
													</div>
												) : (
													<p>No price available</p>
												)}
											</div>
										</div>
										<div className="flex gap-4 items-center" style={{ justifyContent: "space-between", marginTop: "5px" }}>

											<Button size="sm" style={{ background: "#00A9FF", color: "#FFFFFF" }} onPress={() => {
												handleProductClickInfo(product);
											}}>
												Info
											</Button>
											<Modal isOpen={innerModalOpen} onOpenChange={innerModalOpenChangeHandler}>
												<ModalContent>
													{(innerModalOnClose) => (
														<>

															<ModalHeader className="flex flex-col gap-1">{selectedProductInfo?.name}</ModalHeader>
															<ModalBody>
																<p style={{ fontSize: "13px" }}>{selectedProductInfo?.description}</p>
																<img src={selectedProductInfo?.image} alt={selectedProductInfo?.name} style={{ width: "200px", height: "200px", boxShadow: "2px 4px 8px rgba(0, 0, 0, 0.1)" }} />
																<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "7px" }}>
																	<div>
																		{product.price ? (
																			<div>
																				<p style={{ color: "#6B6B6B" }}>Estimate Price</p>
																				<p style={{ fontWeight: "bold" }} >{product.price}</p>
																			</div>
																		) : (
																			<p>No price available</p>
																		)}
																	</div>
																</div>
															</ModalBody>

														</>
													)}
												</ModalContent>
											</Modal>
											<Button size="sm" onPress={() => handleProductClick(product)} style={{ background: "#00A9FF", color: "#FFFFFF" }}>Add Component</Button>
										</div>
									</div>
								))}
							</ModalBody>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
}
