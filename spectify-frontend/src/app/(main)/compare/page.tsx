"use client";

import { useEffect, useState } from 'react';
import { Product } from '@/components/main/product/productPage';
import { IoMdClose } from "react-icons/io";
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
};

type ramProducts = {
	typeProduct: string;
	name: string;
	image: string;
	size: string;
	type: string;
	kit: string;
	description: string;
	price: string;
};

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
};

type moboProducts = {
	typeProduct: string;
	name: string;
	image: string;
	size: string;
	socket: string;
	ramslot: string;
	description: string;
	price: string;
};

type hddProducts = {
	typeProduct: string;
	name: string;
	image: string;
	size: string;
	description: string;
	price: string;
};

type ssdProducts = {
	typeProduct: string;
	name: string;
	image: string;
	size: string;
	type: string;
	description: string;
	price: string;
};

type cpuCoolerProducts = {
	typeProduct: string;
	name: string;
	image: string;
	socket: string;
	description: string;
	price: string;
};

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
};

type psuProducts = {
	typeProduct: string;
	name: string;
	image: string;
	wattage: string;
	description: string;
	price: string;
};
type ProductType = "CPU" | "ram" | "gpu" | "mobo" | "hdd" | "ssd";

export default function ComparePage() {

    const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    useEffect(() => {
        // Fetch selected products from local storage or props
        const savedProducts = localStorage.getItem('compareData');
        if (savedProducts) {
            const parsedProducts: Product[] = JSON.parse(savedProducts);
            setSelectedProducts(parsedProducts);
        }
    }, []);

    const filterProductsByType = (type: ProductType) => {
        return selectedProducts.filter(product => product.typeProduct === type);
    }

    const removeFromLocalStorage = (product: Product) => {
        const updatedProducts = selectedProducts.filter(p => p !== product);
        localStorage.setItem('compareData', JSON.stringify(updatedProducts));
        setSelectedProducts(updatedProducts);
    }

    const handleRemoveProduct = (product: Product) => {
        removeFromLocalStorage(product);
    }

    const handleProductClick = (product: Product) => {
        setSelectedProduct(product);
    }

    const renderProductSection = (type: ProductType) => {
        const products = filterProductsByType(type);

        return (
            <>
                <p style={{ fontSize: "24px", marginTop: "30px", marginBottom: "15px" }}>{type}</p>
                <div style={{ marginLeft: "45%" }}></div>
                {products.map((product, index) => (
                    <div key={index} style={{ display: "inline-block", textAlign: "center", }}>
                        <img
                            src={product.image}
                            alt={product.name}
                            style={{
                                width: "80px",
                                height: "80px",
                                boxShadow: "2px 4px 8px rgba(0, 0, 0, 0.1)",
                                cursor: "pointer" // Add cursor pointer for indicating clickable
                            }}
                            onClick={() => handleProductClick(product)} // Call handleProductClick on image click
                        />
                        <p>{product.name}</p>
                        <button onClick={() => handleRemoveProduct(product)}>
                            <IoMdClose style={{ width: "20px", height: "20px" }} />
                        </button>
                    </div>
                ))}
            </>
        );
    }

    return (
        <>
            <div style={{ borderTop: "5px solid #00A9FF", boxShadow: "5px 4px 8px rgba(0, 0, 0, 0.1)" }}>
                <div style={{ display: "flex", flexWrap: "wrap", marginTop: "20px" }}>
                    <div style={{
                        width: "400px",
                        height: "1200px",
                        flex: "0 0 auto",
                        boxSizing: "border-box",
                        padding: "10px",
                        margin: "10px",
                        boxShadow: "2px 4px 8px rgba(0, 0, 0, 0.1)",
                    }}>
                        <p style={{ fontWeight: "bold", textAlign: "center", fontSize: "24px" }}>Select</p>

                        {/* PC build section */}
                        <p style={{ fontSize: "24px", marginTop: "30px", marginBottom: "15px" }}>PC build</p>
                        <div style={{ marginLeft: "45%" }}></div>

                        {renderProductSection("CPU")}
                        {renderProductSection("gpu")}
                        {renderProductSection("ram")}
                        {renderProductSection("ssd")}
                    </div>

                    {/* Right side content */}
                    <div style={{
                        width: "400px",
                        height: "1200px",
                        flex: "0 0 auto",
                        boxSizing: "border-box",
                        padding: "10px",
                        margin: "10px",
                        boxShadow: "2px 4px 8px rgba(0, 0, 0, 0.1)",
                    }}>
                        {selectedProduct && (
                        <p style={{ fontWeight: "bold", textAlign: "center", fontSize: "24px" }}>{selectedProduct.name}</p>
                        )}
                        {selectedProduct && (
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr" }}>
                                <img src={selectedProduct.image} alt={selectedProduct.name} style={{ width: "200px", height: "200px", boxShadow: "2px 4px 8px rgba(0, 0, 0, 0.1)" }}/>
                            </div>
                        </div>
                        )}
                        {selectedProduct && (
                        <div style={{ textAlign: "left" }}>
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
													</div>
												)}
												{selectedProduct?.typeProduct === "HDD" && (
													<div>
														<p>Size: {(selectedProduct as hddProducts).size}</p>
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
                        )}
                    </div>
                    {/*more right side content*/}
                    <div style={{
                        width: "400px",
                        height: "1200px",
                        flex: "0 0 auto",
                        boxSizing: "border-box",
                        padding: "10px",
                        margin: "10px",
                        boxShadow: "2px 4px 8px rgba(0, 0, 0, 0.1)",
                    }}>
                        
                    </div>
                </div>
            </div>
        </>
    );
}

