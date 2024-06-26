"use client";

import React, { useEffect, useState, useMemo } from 'react';
import { Switch } from "@nextui-org/react";
import {
    cpuProducts,
    ramProducts,
    gpuProducts,
    moboProducts,
    ssdProducts,
    cpuCoolerProducts,
} from "@/components/main/product/productPage";

import { getCpuProducts, getRamProducts, getGpuProducts, getSsdProducts, getCpuCoolerProducts, getMoboProducts, getPsuProducts, getCaseComputersProducts } from "@/action/product";
import { Product } from '@/components/main/build/productPopup';
import { SelectedProducts } from './build-component';

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

type psuProducts = {
    id: string;
    typeProduct: string;
    name: string;
    image: string;
    wattage: string;
    description: string;
    price: string;
    tdp: string;
};

interface SelectedProduct {
    CPU: cpuProducts;
    GPU: gpuProducts;
    RAM: ramProducts;
    SSD: ssdProducts;
    MB: moboProducts;
    Cooler: cpuCoolerProducts;
    PSU: psuProducts;
    Case: caseComputerProducts;
}

type GeneratorProps = {
    setSelectedProducts: React.Dispatch<React.SetStateAction<SelectedProducts>>;
};

const Generator: React.FC<{ setSelectedProducts: React.Dispatch<React.SetStateAction<SelectedProducts>> }> = ({ setSelectedProducts }) => {

    const [cpuProducts, setCPUProducts] = useState<cpuProducts[]>([]);
    const [ramProducts, setRamProducts] = useState<ramProducts[]>([]);
    const [gpuProducts, setGpuProducts] = useState<gpuProducts[]>([]);
    const [moboProducts, setMoboProducts] = useState<moboProducts[]>([]);
    const [ssdProducts, setSsdProducts] = useState<ssdProducts[]>([]);
    const [cpuCoolerProducts, setCpuCoolerProducts] = useState<cpuCoolerProducts[]>([]);
    const [psuProducts, setPsuProducts] = useState<psuProducts[]>([]);
    const [caseComputerProducts, setCaseComputerProducts] = useState<caseComputerProducts[]>([]);

    const [productsFetched, setProductsFetched] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                if (!productsFetched) {
                    const [
                        cpuProducts,
                        ramProducts,
                        gpuProducts,
                        moboProducts,
                        ssdProducts,
                        cpuCoolerProducts,
                        psuProducts,
                        caseComputerProducts,
                    ] = await Promise.all([
                        getCpuProducts(),
                        getRamProducts(),
                        getGpuProducts(),
                        getMoboProducts(),
                        getSsdProducts(),
                        getCpuCoolerProducts(),
                        getPsuProducts(),
                        getCaseComputersProducts(),
                    ]);
                    
                    setProductsFetched(true);
                    setCPUProducts(cpuProducts);
                    setMoboProducts(moboProducts);
                    setRamProducts(ramProducts);
                    setGpuProducts(gpuProducts);
                    setSsdProducts(ssdProducts);
                    setPsuProducts(psuProducts);
                    setCaseComputerProducts(caseComputerProducts);
                    setCpuCoolerProducts(cpuCoolerProducts);
                } else {
                    // console.log("Products already fetched. Skipping...");
                }
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, [productsFetched]);


    const [Budget, setBudget] = useState(0);
    
    const selectedProduct = useMemo(() => {
        let selectedProducts: SelectedProduct[] = [];
    
        cpuProducts.forEach(CPU => {
            gpuProducts.forEach(GPU => {
                moboProducts.forEach(MB => {
                    ramProducts.forEach(RAM => {
                        ssdProducts.forEach(SSD => {
                            cpuCoolerProducts.forEach(Cooler => {
                                psuProducts.forEach(PSU => {
                                    caseComputerProducts.forEach(computerCase => {
                                        const totalPrice = parseFloat(CPU.price) + parseFloat(GPU.price) + parseFloat(RAM.price) + parseFloat(SSD.price) + parseFloat(MB.price) + parseFloat(Cooler.price) + parseFloat(PSU.price) + parseFloat(computerCase.price);
                                        if (totalPrice <= Budget) {
                                            // Check if all components are present
                                            if (CPU && GPU && RAM && SSD && MB && Cooler && PSU && computerCase) {
                                                selectedProducts.push({
                                                    CPU,
                                                    GPU,
                                                    MB,
                                                    RAM,
                                                    SSD,
                                                    Cooler,
                                                    PSU,
                                                    Case: computerCase
                                                });
                                            }
                                        }
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    
        return selectedProducts[0];
    }, [Budget, cpuProducts, ramProducts, gpuProducts, moboProducts, ssdProducts, cpuCoolerProducts, psuProducts, caseComputerProducts]);
    

    const handleBudgetChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBudget(parseInt(event.target.value));
    };

    const handleApplyClick = () => {
        const productSelected = selectedProduct;
        
        if (productSelected) {
            localStorage.setItem('selectedProducts', JSON.stringify(productSelected));
        }
        
        // Check if all items are selected
        const allItemsSelected = checkAllItemsSelected(productSelected);
        if (allItemsSelected) {
            window.location.reload();
        }
    };


    const checkAllItemsSelected = (selectedProduct: any) => {
        if (selectedProduct && selectedProduct !== null &&
            selectedProduct.CPU &&
            selectedProduct.GPU &&
            selectedProduct.MB &&
            selectedProduct.RAM &&
            selectedProduct.SSD &&
            selectedProduct.Cooler &&
            selectedProduct.PSU &&
            selectedProduct.Case
        ) {
            return true;
        } else {
            return false;
        }
    };



    const [isSwitchOn, setIsSwitchOn] = useState(false);

    return (

        <>

            <div className='grid grid-cols-1 grid-rows-1 gap-0 m-5 h-12 shadow-xl rounded-lg mt-5'>
                <div className="ml-3 mt-2.5">
                    <Switch checked={isSwitchOn} onChange={() => setIsSwitchOn(!isSwitchOn)} />
                </div>

                <h2 className='flex justify-end mt-2 mx-5 text-2xl font-semibold'>
                    Auto Build
                </h2>
            </div>

            <div className={`transition-opacity ${isSwitchOn ? 'opacity-100' : 'opacity-0'} duration-500 ease-in-out`}>
                <div>
                    <label className='mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                        <h3 className='text-xl font-semibold ml-5 mb-2'>Budget</h3>
                    </label>
                    <div className='flex justify-center'>
                        <input
                            type="number"
                            min="0"
                            placeholder="Enter price"
                            value={Budget}
                            onChange={handleBudgetChange}
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 mb-5 mx-5'
                        />
                    </div>
                </div>

                <div className='grid grid-cols-1 grid-rows-1 gap-0 mx-5'>
                    <button className='rounded-xl bg-[#00A9FF] text-white' onClick={handleApplyClick}>
                        <h2 className='text-2xl font-semibold'>
                            apply
                        </h2>
                    </button>
                </div>
            </div>

        </>
    );

};

export default Generator;