"use client";

import React, { useEffect, useState } from "react";
import SearchBarComponent from "@/components/main/searchBar";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { getCaseComputersProducts, getCpuProducts } from "@/action/product";
import { getRamProducts } from "@/action/product";
import { getGpuProducts } from "@/action/product";
import { getHddProducts } from "@/action/product";
import { getSsdProducts } from "@/action/product";
import { getCpuCoolerProducts } from "@/action/product";
import { getMoboProducts } from "@/action/product";
import { getMonitorProducts } from "@/action/product";
import { getPsuProducts } from "@/action/product";
import { VscClose } from "react-icons/vsc";
import { Image } from "@nextui-org/react";
import { Card, Skeleton } from "@nextui-org/react";

type cpuProducts = {
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
}

type ramProducts = {
	id: string;
	typeProduct: string;
	name: string;
	image: string;
	size: string;
	type: string;
	kit: string;
	description: string;
	price: string;
	bus: string;
	tdp: string;
}

type gpuProducts = {
	id: string;
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
	id: string;
	typeProduct: string;
	name: string;
	image: string;
	size: string;
	socketCPU: string;
	socketStorage: string;
	ramslot: string;
	ramkit: string;
	description: string;
	price: string;
}

type hddProducts = {
	id: string;
	typeProduct: string;
	name: string;
	image: string;
	size: string;
	description: string;
	price: string;
	speedRead: string;
	speedWrite: string;
}

type ssdProducts = {
	id: string;
	typeProduct: string;
	name: string;
	image: string;
	size: string;
	type: string;
	description: string;
	price: string;
	speedRead: string;
	speedWrite: string;
}

type cpuCoolerProducts = {
	id: string;
	typeProduct: string;
	name: string;
	image: string;
	socket: string;
	description: string;
	price: string;
}

type monitorProducts = {
	id: string;
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
	id: string;
	typeProduct: string;
	name: string;
	image: string;
	wattage: string;
	description: string;
	price: string;
}

type caseComputerProducts = {
	id: string;
	typeProduct: string;
	name: string;
	image: string;
	size: string;
	isolation: string;
	description: string;
	price: string;
}

export type Product = cpuProducts | ramProducts | gpuProducts | moboProducts | hddProducts | ssdProducts | cpuCoolerProducts | monitorProducts | psuProducts | caseComputerProducts;

export type SelectedProductIDs = {
	[key: string]: string | null;
};

export interface ProductContextType {
	selectedProductIDs: SelectedProductIDs;
	handleSelectProduct: (type: string, id: string) => void;
	handleDeselectProduct: (type: string) => void;
};

interface ProductPopUpProps {
    typeProduct: string;
    onSelectProduct: (product: Product) => void;
    onDeselectProduct: () => void;
    selectedProduct: Product | null;
    selectedCpuSocket?: string | null;
    selectedMoboRamType?: string | null;
    disabled?: boolean;  // Add disabled prop
}

export default function ProductPopUp({
    typeProduct,
    onSelectProduct,
    onDeselectProduct,
    selectedCpuSocket,
    selectedMoboRamType,
    selectedProduct,
    disabled = false 
}: ProductPopUpProps) {

	const [allProducts, setAllProducts] = useState<Product[]>([]);
	const [searchValue, setSearchValue] = useState("");
	const [filteredSearchProducts, setFilteredSearchProducts] = useState<Product[]>([]);

	const [displayText, setDisplayText] = useState<string>('');

	const defaultProductImage = 'https://cdn4.iconfinder.com/data/icons/computer-hardware-and-devices-1/512/cpu-512.png'
	const [displayImage, setDisplayImage] = useState(defaultProductImage);


	// eslint-disable-next-line react-hooks/exhaustive-deps
	function handleSearch(value: string) {

		setSearchValue(value);

		const filteredProducts = allProducts.filter((product) =>
			product.name.toLowerCase().includes(value.toLowerCase())
		);
		setFilteredSearchProducts(filteredProducts.length > 0 ? filteredProducts : allProducts);

	};

	const [selectedProductInfo, setSelectedProductInfo] = useState<Product | null>(null);

	const [selectedProductIDs, setSelectedProductIDs] = useState<{ [key: string]: string | null; }>({});

	function handleProductClickInfo(product: Product) {

		setSelectedProductInfo(product);
		innerModalOpenHandler();
	};

	function handleProductClick(product: Product) {

		onSelectProduct(product);
		setDisplayText(product.name)
		setDisplayImage(product.image || defaultProductImage);
	};

	const handleDeselectClick = () => {

		onDeselectProduct();
	};

	useEffect(() => {
		if (selectedProduct) {
			setDisplayImage(selectedProduct.image || defaultProductImage);
			setDisplayText(selectedProduct.name);
			setSelectedProductIDs(prevIDs => ({
				...prevIDs,
				[typeProduct]: selectedProduct.id
			}));
		} else {
			setDisplayImage(defaultProductImage);
			setSelectedProductIDs(prevIDs => ({
				...prevIDs,
				[typeProduct]: null
			}));
		}
	}, [selectedProduct, typeProduct]);

	useEffect(() => {
		// console.log("Selected Product IDs:", selectedProductIDs);
	}, [selectedProductIDs]);

	const { isOpen: outerModalOpen, onOpen: outerModalOpenHandler, onOpenChange: outerModalOpenChangeHandler } = useDisclosure();
	const { isOpen: innerModalOpen, onOpen: innerModalOpenHandler, onOpenChange: innerModalOpenChangeHandler } = useDisclosure();
	
	useEffect(() => {
		const fetchData = async () => {
			let products: Product[] = [];
	
			switch (typeProduct) {
				case "CPU":
					products = await getCpuProducts();
					break;
				case "GPU":
					products = await getGpuProducts();
					break;
				case "RAM":
					products = await getRamProducts();
					break;
				case "SSD":
					products = await getSsdProducts();
					break;
				case "HDD":
					products = await getHddProducts();
					break;
				case "MB":
					products = await getMoboProducts();
					break;
				case "PSU":
					products = await getPsuProducts();
					break;
				case "Monitor":
					products = await getMonitorProducts();
					break;
				case "Cooler":
					products = await getCpuCoolerProducts();
					break;
				case "Case":
					products = await getCaseComputersProducts();
					break;
			}
	
			if (selectedCpuSocket || selectedMoboRamType) {
				products = products.filter(product => {
					if (typeProduct === "MB") {
						return (!selectedCpuSocket || (product as moboProducts).socketCPU === selectedCpuSocket) &&
							   (!selectedMoboRamType || (product as moboProducts).ramslot === selectedMoboRamType);
					}
					if (typeProduct === "CPU") {
						return !selectedCpuSocket || (product as cpuProducts).socket === selectedCpuSocket;
					}
					if (typeProduct === "RAM") {
						return !selectedMoboRamType || (product as ramProducts).type === selectedMoboRamType;
					}
					return true;
				});
			}
	
			setAllProducts(products);
			setFilteredSearchProducts(products);
		};
		fetchData();
	}, [typeProduct, selectedCpuSocket, selectedMoboRamType]);

	return (
		<>
        <div onClick={() => {
            if (!disabled) {
                handleSearch("");
                outerModalOpenHandler();
            }
        }} className={`relative flex shadow-xl rounded-xl h-16 w-full text-center ${disabled ? "bg-gray-200 cursor-not-allowed text-gray-600" : "bg-white hover:bg-[#00A9FF] hover:text-white hover:cursor-pointer"} duration-200`}>
            <Image src={displayImage || defaultProductImage} alt="Product Image" style={{ display: 'inline-block', marginRight: '1rem' }} width={65} height={65} />
            {selectedProduct ? (
                <span className="flex items-center">{displayText}</span>
            ) : (
                <p className="flex items-center justify-center">{typeProduct}</p>
            )}
            {selectedProduct && (
                <div onClick={(event) => {
                    if (!disabled) {
                        event.stopPropagation();
                        handleDeselectClick();
                    }
                }} className="absolute inset-y-0 right-0 bg-red-700 text-white p-2 cursor-pointer rounded-xl">
                    <VscClose className="flex items-center my-3" />
                </div>
            )}
        </div>
			
			<Modal isOpen={outerModalOpen} onOpenChange={outerModalOpenChangeHandler} size={"full"}>
				<ModalContent>
					{(outerModalOnClose) => (
						<>
							<ModalHeader className="flex flex-col gap-1">
								<div className="w-full pr-8">
									<SearchBarComponent onSearch={handleSearch} placeholder={"Product"} />
								</div>
							</ModalHeader>

							<ModalBody>
								{filteredSearchProducts.length === 0 ? (
									<div className="mr-2" style={{ display: "flex", flexWrap: "wrap"}}>
										{Array(32).fill('').map((_, index) => (
											<Card key={index} className="w-[200px] space-y-5 p-4 mr-5 mt-5" radius="lg">
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
										))}
									</div>
								) : (
									<div style={{ display: "flex", flexWrap: "wrap", marginTop: "20px" }}>
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
												<div style={{ width: '180px', height: '180px', boxShadow: '2px 4px 8px rgba(0, 0, 0, 0.1)' }}>
													<Image src={product.image} alt={product.name} width={180} height={180} />
												</div>
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
																		<div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'stretch' }}>
																			<div style={{ display: 'flex', flexDirection: 'column', flex: '1' }}>
																				<p style={{ fontSize: '13px', maxWidth: '200px', overflowWrap: 'break-word' }}>{selectedProductInfo?.description}</p>
																				<Image
																					src={selectedProductInfo?.image}
																					alt={selectedProductInfo?.name}
																					width={180}
																					height={180}
																					style={{ boxShadow: '2px 4px 8px rgba(0, 0, 0, 0.1)' }}
																				/>
																				<div style={{ marginTop: '7px' }}>
																					<p style={{ color: '#6B6B6B' }}>Estimate Price</p>
																					<p style={{ fontWeight: 'bold' }}>{selectedProductInfo?.price} THB</p>
																				</div>
																			</div>
																			<div style={{
																				background: "#DCF1FB", flex: '1', padding: '10px',
																				display: 'flex', flexDirection: 'column', alignItems: 'flex-start', maxWidth: '200px', marginBottom: '10px', borderRadius: '10px'
																			}}>
																				{selectedProductInfo?.typeProduct === "CPU" && (
																					<div>
																						<p>Type: {(selectedProductInfo as cpuProducts).type}</p>
																						<p>Socket: {(selectedProductInfo as cpuProducts).socket}</p>
																						<p>Core: {(selectedProductInfo as cpuProducts).core}</p>
																						<p>Thread: {(selectedProductInfo as cpuProducts).thread}</p>
																						<p>Year: {(selectedProductInfo as cpuProducts).year}</p>
																						<p>TDP: {(selectedProductInfo as cpuProducts).tdp} W</p>
																						<p>Base Clock: {(selectedProductInfo as cpuProducts).clock} GHz</p>
																						<p>Turbo Clock: {(selectedProductInfo as cpuProducts).turbo} GHz</p>
																					</div>
																				)}
																				{selectedProductInfo?.typeProduct === "RAM" && (
																					<div>
																						<p>Size: {(selectedProductInfo as ramProducts).size}</p>
																						<p>Type: {(selectedProductInfo as ramProducts).type}</p>
																						<p>Kit: {(selectedProductInfo as ramProducts).kit}</p>
																						<p>Bus Speed: {(selectedProductInfo as ramProducts)?.bus}</p>
																					</div>
																				)}
																				{selectedProductInfo?.typeProduct === "GPU" && (
																					<div>
																						<p>Type: {(selectedProductInfo as gpuProducts).type}</p>
																						<p>Architecture: {(selectedProductInfo as gpuProducts).architecture}</p>
																						<p>Performance: {(selectedProductInfo as gpuProducts).performance}</p>
																						<p>Year: {(selectedProductInfo as gpuProducts).year}</p>
																						<p>Series: {(selectedProductInfo as gpuProducts).series}</p>
																						<p>VRAM: {(selectedProductInfo as gpuProducts).vram}</p>
																						<p>TDP: {(selectedProductInfo as gpuProducts).tdp}</p>
																						<p>Motherboard Bus: {(selectedProductInfo as gpuProducts).motherboardBus}</p>
																						<p>Core Clock: {(selectedProductInfo as gpuProducts).coreClock} MHz</p>
																						<p>Boost Clock: {(selectedProductInfo as gpuProducts).boostClock} MHz</p>
																						<p>Effective Clock: {(selectedProductInfo as gpuProducts).effectiveClock} MHz</p>
																						<p>Length: {(selectedProductInfo as gpuProducts).length} mm</p>
																						<p>Cooling Fans: {(selectedProductInfo as gpuProducts).coolingFans}</p>
																						<p>Case Slots: {(selectedProductInfo as gpuProducts).caseSlots}</p>
																						<p>Frame Sync: {(selectedProductInfo as gpuProducts).frameSync}</p>
																					</div>
																				)}
																				{selectedProductInfo?.typeProduct === "SSD" && (
																					<div>
																						<p>Size: {(selectedProductInfo as ssdProducts)?.size}</p>
																						<p>Type: {(selectedProductInfo as ssdProducts)?.type}</p>
																						<p>Read Speed: {(selectedProductInfo as ssdProducts)?.speedRead}</p>
																						<p>Write Speed: {(selectedProductInfo as ssdProducts)?.speedWrite}</p>
																					</div>
																				)}
																				{selectedProductInfo?.typeProduct === "HDD" && (
																					<div>
																						<p>Size: {(selectedProductInfo as hddProducts).size}</p>
																						<p>Read Speed: {(selectedProduct as hddProducts).speedRead}</p>
																						<p>Write Speed: {(selectedProduct as hddProducts).speedWrite}</p>
																					</div>
																				)}
																				{selectedProductInfo?.typeProduct === "Power Supply" && (
																					<div>
																						<p>Wattage: {(selectedProductInfo as psuProducts).wattage}</p>
																					</div>
																				)}
																				{selectedProductInfo?.typeProduct === "Mother Board" && (
																					<div>
																						<p>Size: {(selectedProductInfo as moboProducts).size}</p>
																						<p>Socket: {(selectedProductInfo as moboProducts).socketCPU}</p>
																						<p>Ram Slot: {(selectedProductInfo as moboProducts).ramslot}</p>
																					</div>
																				)}
																				{selectedProductInfo?.typeProduct === "CPU Cooler" && (
																					<div>
																						<p>Socket: {(selectedProductInfo as cpuCoolerProducts).socket}</p>
																					</div>
																				)}
																				{selectedProductInfo?.typeProduct === "Monitor" && (
																					<div>
																						<p>Panel Type: {(selectedProductInfo as monitorProducts).panelType}</p>
																						<p>Resolution: {(selectedProductInfo as monitorProducts).resolution}</p>
																						<p>Refresh Rate: {(selectedProductInfo as monitorProducts).refreshRate}</p>
																						<p>Size: {(selectedProductInfo as monitorProducts).size}</p>
																						<p>FreeSync: {(selectedProductInfo as monitorProducts).freesync}</p>
																						<p>G-Sync: {(selectedProductInfo as monitorProducts).gsync}</p>
																					</div>
																				)}

																			</div>
																		</div>
																	</ModalBody>

																</>
															)}
														</ModalContent>
													</Modal>

													<Button
														size="sm"
														onPress={() => {
															handleProductClick(product);
															outerModalOnClose();
														}}
														style={{ background: "#00A9FF", color: "#FFFFFF" }}>
														Add Component
													</Button>
												</div>
											</div>
										))}
									</div>
								)}
							</ModalBody>

						</>
					)}
				</ModalContent>
			</Modal>

		</>
	);
};