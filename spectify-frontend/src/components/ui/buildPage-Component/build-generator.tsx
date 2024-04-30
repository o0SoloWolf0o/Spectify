"use client";

import React, { useEffect, useState } from 'react';
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

const Generator = () => {

    const [cpuProducts, setCPUProducts] = useState<cpuProducts[]>([]);
    const [ramProducts, setRamProducts] = useState<ramProducts[]>([]);
    const [gpuProducts, setGpuProducts] = useState<gpuProducts[]>([]);
    const [moboProducts, setMoboProducts] = useState<moboProducts[]>([]);
    const [ssdProducts, setSsdProducts] = useState<ssdProducts[]>([]);
    const [cpuCoolerProducts, setCpuCoolerProducts] = useState<cpuCoolerProducts[]>([]);
    const [psuProducts, setPsuProducts] = useState<psuProducts[]>([]);
    const [caseComputerProducts, setCaseComputerProducts] = useState<caseComputerProducts[]>([]);

    const fetchProducts = async () => {
        try {
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
            setCPUProducts(cpuProducts);
            setMoboProducts(moboProducts);
            setRamProducts(ramProducts);
            setGpuProducts(gpuProducts);
            setSsdProducts(ssdProducts);
            setPsuProducts(psuProducts);
            setCaseComputerProducts(caseComputerProducts);
            setCpuCoolerProducts(cpuCoolerProducts);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };
    fetchProducts();

    // Select all products from all products prices make it lower than budget or = budget and save all product to local storage
    const budget = 30000;
    // cpuprice + ramprice + gpuprice + moboprice + ssdprice + cpucoolerprice + psuprice + caseprice
    // cpuProducts.forEach(cpuProduct => {
    //     console.log(cpuProduct.price);
    // });
    // ramProducts.forEach(ramProduct => {
    //     console.log(ramProduct.price);
    // });
    // gpuProducts.forEach(gpuProduct => {
    //     console.log(gpuProduct.price);
    // });
    // moboProducts.forEach(moboProduct => {
    //     console.log(moboProduct.price);
    // });
    // ssdProducts.forEach(ssdProduct => {
    //     console.log(ssdProduct.price);
    // });
    // cpuCoolerProducts.forEach(cpuCoolerProduct => {
    //     console.log(cpuCoolerProduct.price);
    // });
    // psuProducts.forEach(psuProduct => {
    //     console.log(psuProduct.price);
    // });
    // caseComputerProducts.forEach(caseComputerProduct => {
    //     console.log(caseComputerProduct.price);
    // });

    // 

    const saveToLocalStorage = (data: any[]) => {
        try {
            const jsonData = JSON.stringify(data);
            localStorage.setItem("compareData", jsonData);
            console.log("Data saved to local storage:", jsonData);
        } catch (error) {
            console.error("Error saving data to local storage:", error);
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
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 mb-5 mx-5'
                        />
                    </div>
                </div>

                <div className='grid grid-cols-1 grid-rows-1 gap-0 mx-5'>
                    <button className='rounded-xl bg-[#00A9FF] text-white'>
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