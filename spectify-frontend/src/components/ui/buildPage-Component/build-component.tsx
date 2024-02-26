"use client";

import React from "react";
import { useState } from "react";
import ProductPopUp from '@/components/main/build/productPopup';

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

const BuildComponent = () => {
    
    const handleCPU = () => {
        console.log("Choose a Processor.");
    };

    const handleMB = () => {
        console.log("Choose a M/B.");
    };

    const handleRAM = () => {
        console.log("Choose Memory modules.");
    };

    const handleVGA = () => {
        console.log("Choose a VGA.");
    };

    const handleStorage = () => {
        console.log("Choose Storages.");
    };

    const handlePSU = () => {
        console.log("Choose a PSU.");
    };

    const handleCase = () => {
        console.log("Choose a Case.");
    };

    const handleCooler = () => {
        console.log("Choose a Cooler.");
    };
    
    const [selectedProductFromChild, setSelectedProductFromChild] = useState<Product | null>(null);

    const handleSelectProduct = (selectedProduct: Product) => {
        setSelectedProductFromChild(selectedProduct);
    };

    return (
        <div className='grid grid-cols-1 grid-rows-8 gap-4 place-items-center m-5'>
                    
                    <ProductPopUp typeProduct="CPU" onSelectProduct={handleSelectProduct} />

                    {selectedProductFromChild && (
                    <div>
                        <p>Selected Product in Parent Component:</p>
                        <pre>{JSON.stringify(selectedProductFromChild, null, 2)}</pre>
                    </div>
                    )}
                    
                    <ProductPopUp typeProduct="Mother Board" onSelectProduct={handleSelectProduct} />

                    {selectedProductFromChild && (
                    <div>
                        <p>Selected Product in Parent Component:</p>
                        <pre>{JSON.stringify(selectedProductFromChild, null, 2)}</pre>
                    </div>
                    )}
                    
                    <ProductPopUp typeProduct="RAM" onSelectProduct={handleSelectProduct} />

                    {selectedProductFromChild && (
                    <div>
                        <p>Selected Product in Parent Component:</p>
                        <pre>{JSON.stringify(selectedProductFromChild, null, 2)}</pre>
                    </div>
                    )}

                    <ProductPopUp typeProduct="GPU" onSelectProduct={handleSelectProduct} />

                    {selectedProductFromChild && (
                    <div>
                        <p>Selected Product in Parent Component:</p>
                        <pre>{JSON.stringify(selectedProductFromChild, null, 2)}</pre>
                    </div>
                    )}
                   
                    <div onClick={handleStorage}
                         className='flex shadow-xl rounded-xl h-16 w-full
                                hover:bg-[#00A9FF] hover:text-white hover:cursor-pointer duration-200'>
                        storage
                    </div>
                    
                    <ProductPopUp typeProduct="Power Supply" onSelectProduct={handleSelectProduct} />

                    {selectedProductFromChild && (
                    <div>
                        <p>Selected Product in Parent Component:</p>
                        <pre>{JSON.stringify(selectedProductFromChild, null, 2)}</pre>
                    </div>
                    )}

                    <div onClick={handleCase}
                         className='flex shadow-xl rounded-xl h-16 w-full
                                hover:bg-[#00A9FF] hover:text-white hover:cursor-pointer duration-200'>
                        case
                    </div>
                    
                    <ProductPopUp typeProduct="CPU Cooler" onSelectProduct={handleSelectProduct} />

                    {selectedProductFromChild && (
                    <div>
                        <p>Selected Product in Parent Component:</p>
                        <pre>{JSON.stringify(selectedProductFromChild, null, 2)}</pre>
                    </div>
                    )}                    

                    <div className='flex shadow-xl rounded-xl h-12 w-full text-center mt-3 bg-[#D9D9D9]'>
                        
                        <h2 className='text-xl font-semibold flex justify-center my-2'>
                            Total price:
                        </h2>
                    
                    </div>
                
                </div>
    );

};

export default BuildComponent;