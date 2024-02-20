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

type gpuProducts ={
	typeProduct:string;
    name:string;
    image:string;
    type:string;
    performance:string;
    architecture:string;
    year:string;
    series:string;
    vram:string;
    price:string;
    tdp:string;
    motherboardBus:string;
    coreClock:string;
    boostClock:string;
    effectiveClock:string;
    length:string;
    coolingFans:string;
    caseSlots:string;
    frameSync:string;
    description:string;
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
	typeProduct:string;
    name:string;
    image:string;
    size:string;
    type:string;
    description:string;
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
	typeProduct:string;
    name:string;
    image:string;
    panelType:string;
    resolution:string;
    refreshRate:string;
    size:string;
    freesync:string;
    gsync:string;
    price:string;
    description: string;
}

type psuProducts = {
	typeProduct:string;
    name:string;
    image:string;
    wattage:string;
    description:string;
    price: string;
}

type Product = cpuProducts | ramProducts | gpuProducts | moboProducts | hddProducts | ssdProducts | cpuCoolerProducts | monitorProducts | psuProducts;

export default function ProductPage() {

	const [cpuProducts, setCpuProducts] = useState<cpuProducts[]>([]);
	const [ramProducts, setRamProducts] = useState<ramProducts[]>([]);
	const [gpuProducts, setGpuProducts] = useState<gpuProducts[]>([]);
	const [moboProducts, setMoboProducts] = useState<moboProducts[]>([]);
	const [hddProducts, setHddProducts] = useState<Product[]>([]);
	const [ssdProducts, setSsdProducts] = useState<ssdProducts[]>([]);
	const [cpuCoolerProducts, setCpuCoolerProducts] = useState<cpuCoolerProducts[]>([]);
	const [monitorProducts, setMonitorProducts] = useState<monitorProducts[]>([]);
	const [psuProducts, setPsuProducts] = useState<psuProducts[]>([]);

	const [allProducts, setAllProducts] = useState<Product[]>([]);


	useEffect(() => {
		getCpuProducts().then((res) => {
			if (res) {
				setCpuProducts(res);
			}
		});
		getRamProducts().then((res) => {
			if (res) {
				setRamProducts(res);
			}
		});
		getGpuProducts().then((res) => {
			if (res) {
				setGpuProducts(res);
			}
		})
		getMoboProducts().then((res) =>{
			if (res) {
				setMoboProducts(res);
			}
		})
		getHddProducts().then((res) => {
			if (res) {
				setHddProducts(res);
			}
		})
		getSsdProducts().then((res) => {
			if (res) {
				setSsdProducts(res);
			}
		})
		getCpuCoolerProducts().then((res) => {
			if (res) {
				setCpuCoolerProducts(res);
			}
		})
		getMonitorProducts().then((res) =>  {
			if (res) {
				setMonitorProducts(res);
			}
		})
		getPsuProducts().then((res) => {
			if (res) {
				setPsuProducts(res);
			}
		})

	}, []);

	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

	const filterNames = ["CPU", "GPU", "RAM", "SSD", "HDD", "Power Supply", "Mother Board", "CPU Cooler", "Monitor"];
	const [filterStates, setFilterStates] = useState(Array(9).fill(false));
	const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

	const [searchValue, setSearchValue] = useState("");

	useEffect(() => {
		const combinedProducts: Product[] = [...cpuProducts, ...ramProducts, ...gpuProducts, ...moboProducts, ...hddProducts, ...ssdProducts, ...cpuCoolerProducts, ...monitorProducts, ...psuProducts];
		setAllProducts(combinedProducts);
	}, [cpuProducts, ramProducts, gpuProducts, moboProducts, hddProducts, ssdProducts, cpuCoolerProducts, monitorProducts, psuProducts]);

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
		setFilteredProducts(updatedProducts.length > 0 ? updatedProducts : allProducts);
	}

	function handleFilterChange(index: number) {
		const newFilterStates = [...filterStates];
		newFilterStates[index] = !newFilterStates[index];
		console.log(`${filterNames[index]} state:`, newFilterStates[index]);
		setFilterStates(newFilterStates);

		const selectedFilters = filterNames.filter((_, i) => newFilterStates[i]);
		const updatedProducts = allProducts.filter((product) => selectedFilters.includes(product.typeProduct));
		setFilteredProducts(updatedProducts.length > 0 ? updatedProducts : allProducts);
	}

	useEffect(() => {
		setFilteredProducts(allProducts);
	}, [allProducts]);


	return (
		<>
			<SearchBarComponent onSeach={handleSearch} placeholder={"Product"} />
			<div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
				{filterStates.map((isChecked, index) => (
					<div key={index} style={{ marginRight: "90px" }}>
						<label>
							<input
								type="checkbox"
								checked={isChecked}
								onChange={() => handleFilterChange(index)}
							/>
							{" "}{filterNames[index]}
						</label>
					</div>
				))}
			</div> 

			<div onClick={onOpen} style={{ display: "flex", flexWrap: "wrap", marginTop: "20px" }}>
				{filteredProducts.map((product, index) => (
					<div key={index} style={{
						width: "200px",
						height: "350px",
						flex: "0 0 auto",
						boxSizing: "border-box",
						padding: "10px",
						margin: "10px",
						boxShadow: "2px 4px 8px rgba(0, 0, 0, 0.1)",
					}}
						onClick={() => handleProductClick(product)}
					>
						<p style={{ fontWeight: "bold" }}>{product.name}</p>
						<p style={{ fontSize: "13px" }}>{product.description}</p>
						<img src={product.image} alt={product.name} style={{ width: "200px", height: "200px", boxShadow: "2px 4px 8px rgba(0, 0, 0, 0.1)" }} />
						<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "7px" }}>
							<div>
								{product.price ? (
									<div>
										<p style={{ color: "#6B6B6B" }}>Estimate Price</p>
										<p style={{ fontWeight: "bold" }}>{product.price}</p>
									</div>
								) : (
									<p>No price available</p>
								)}
							</div>
							<Image src="/images/switch_black.png" alt="Compare" width={30} height={30} className="mr-2" />
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
									<Button color="danger" variant="light" onPress={onClose}>
										Close
									</Button>

									{/* 
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