/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import SearchBarComponent from "@/components/main/searchBar";
import Image from "next/image";
import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";


type Product = {
	type: string;
	name: string;
	description: string;
	Image: string;
	price: string;
};

export default function ProductPage() {

	const products = [
		{
			type: "CPU", name: "Intel", description: "CPU (ซีพียู) INTEL CORE i5-10400F 2.9 GHz (SOCKET LGA 1200)"
			, Image: "https://speedcom.co.th/uploads/cache/img_1280x1280/uploads/images/product_1688954988390.jpg",
			price: "100,000.-"
		},
		{
			type: "GPU", name: "MSI", description: "MSI GEFORCE RTX 4090 SUPRIM LIQUID X 24G GDDR6X "
			, Image: "https://m.media-amazon.com/images/I/71mKnFnBj+L.jpg",
			price: "100,000.-"
		},
		{
			type: "RAM", name: "HyperX", description: "8GB (8GBx1) DDR4/3200 RAM PC (แรมพีซี) KINGSTON HyperX FURY RGB"
			, Image: "https://www.jib.co.th/img_master/product/original/20210107151232_44581_66_1.png",
			price: "100,000.-"
		},
		{
			type: "SSD", name: "GIGABYTE", description: "1 TB SSD SATA GIGABYTE (GSTFS31100TNTD)",
			Image: "https://img.advice.co.th/images_nas/pic_product4/A0135669/A0135669OK_BIG_1.jpg",
			price: "100,000.-"
		},
		{
			type: "Power Supply", name: "Corsair", description: "POWER SUPPLY  CORSAIR 1000W RM1000X"
			, Image: "https://down-th.img.susercontent.com/file/1fb7579e0283c4cfd22f2a698ad11ff4",
			price: "100,000.-"
		},
		{
			type: "Mother Board", name: "Asus", description: "MAINBOARD ASUS PRIME Z790-P D4-CSM DDR4 (LGA 1700)"
			, Image: "https://media-cdn.bnn.in.th/271998/asus-prime-z790-p-d4-csm-4-square_medium.jpg",
			price: "100,000.-"
		},
		{
			type: "HDD", name: "Seagate", description: "1 TB HDD Seagate"
			, Image: "https://store.cyn.co.th/wp-content/uploads/2023/02/seagate-barracuda-1tb-7200rpm.jpg",
			price: "100,000.-"
		},
		{
			type: "M2", name: "Samsung", description: "SSD M.2 PCIe 1.TB Samsung 990 PRO (MZ-V9P1T0BW)"
			, Image: "https://i.ebayimg.com/images/g/8oUAAOSweURjh3wu/s-l400.jpg",
			price: "100,000.-"
		}
	];

	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

	function handleProductClick(product: Product) {
		setSelectedProduct(product);
		onOpen();
	}

	const filterNames = ["CPU", "GPU", "RAM", "SSD", "HDD", "M2", "Power Supply", "Mother Board"];
	const [filterStates, setFilterStates] = useState(Array(8).fill(false));
	const [filteredProducts, setFilteredProducts] = useState(products);
	const [searchValue, setSearchValue] = useState("");

	function handleSearch(value: string) {
		console.log("Search value:", value);
		setSearchValue(value);

		const updatedProducts = products.filter((product) =>
			product.name.toLowerCase().includes(value.toLowerCase())
		);
		setFilteredProducts(updatedProducts.length > 0 ? updatedProducts : products);
	}

	function handleFilterChange(index: number) {
		const newFilterStates = [...filterStates];
		newFilterStates[index] = !newFilterStates[index];
		console.log(`${filterNames[index]} state:`, newFilterStates[index]);
		setFilterStates(newFilterStates);

		const selectedFilters = filterNames.filter((_, i) => newFilterStates[i]);
		const updatedProducts = products.filter((product) => selectedFilters.includes(product.type));
		setFilteredProducts(updatedProducts.length > 0 ? updatedProducts : products);
	}


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
						<img src={product.Image} alt={product.name} style={{ width: "200px", height: "200px", boxShadow: "2px 4px 8px rgba(0, 0, 0, 0.1)" }} />
						<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "7px" }}>
							<div>
								<p style={{ color: "#6B6B6B" }}>Estimate Price</p>
								<p style={{ fontWeight: "bold" }}>{product.price}</p>
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
									<img src={selectedProduct?.Image} alt={selectedProduct?.name} style={{ width: "200px", height: "200px", boxShadow: "2px 4px 8px rgba(0, 0, 0, 0.1)" }} />
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