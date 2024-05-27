"use client";

import React, { useEffect, useMemo, useState } from "react";
import ProductPopUp, { Product } from '@/components/main/build/productPopup';
import { cpuProducts } from "@/components/main/product/productPage";
import { moboProducts } from "@/components/main/product/productPage";
import { ramProducts } from "@/components/main/product/productPage";
import { GrClearOption } from "react-icons/gr";

export type SelectedProducts = {
    [key: string]: Product | null;
};

interface BuildComponentProps {
    selectedProducts: SelectedProducts;
    setSelectedProducts: React.Dispatch<React.SetStateAction<SelectedProducts>>;
}

const BuildComponent: React.FC<BuildComponentProps> = ({ selectedProducts, setSelectedProducts }) => {

    useEffect(() => {
        const loadedProducts = JSON.parse(localStorage.getItem('selectedProducts') || '{}');
        setSelectedProducts(prev => ({ ...prev, ...loadedProducts }));
    }, [setSelectedProducts]);

    const [selectedCpuSocket, setSelectedCpuSocket] = useState<string | null>(null);
    const [selectedMoboRamType, setSelectedMoboRamType] = useState<string | null>(null);

    const isCpuSelected = selectedProducts["CPU"] !== null;
    const isMoboSelected = selectedProducts["MB"] !== null;

    const handleSelectProduct = (typeProduct: string, product: Product) => {
        setSelectedProducts(prevProducts => {
            const newProducts = { ...prevProducts, [typeProduct]: product };
            localStorage.setItem('selectedProducts', JSON.stringify(newProducts));
            localStorage.setItem(typeProduct, product.id);

            if (typeProduct === 'CPU') {
                const cpuProduct = product as cpuProducts;
                setSelectedCpuSocket(cpuProduct.socket);
            } else if (typeProduct === 'MB') {
                const moboProduct = product as moboProducts;
                setSelectedCpuSocket(moboProduct.socketCPU);
                setSelectedMoboRamType(moboProduct.ramslot);
            } else if (typeProduct === 'RAM') {
                const ramProduct = product as ramProducts;
                setSelectedMoboRamType(ramProduct.type);
            }

            return newProducts;
        });
    };

    const selectionOrder = ['CPU', 'MB', 'RAM', 'GPU', 'SSD', 'PSU', 'Cooler', 'Case'];
    const isComponentSelected = (index: number) => index === 0 || selectedProducts[selectionOrder[index - 1]] !== null;


    const handleDeselectProduct = (typeProduct: string) => {
        setSelectedProducts(prevProducts => {
            const newProducts = { ...prevProducts, [typeProduct]: null };
            localStorage.setItem('selectedProducts', JSON.stringify(newProducts));
            localStorage.removeItem(typeProduct);

            if (typeProduct === 'CPU') {
                setSelectedCpuSocket(null);
            } else if (typeProduct === 'MB') {
                setSelectedCpuSocket(null);
                setSelectedMoboRamType(null);
            } else if (typeProduct === 'RAM') {
                setSelectedMoboRamType(null);
            }

            return newProducts;
        });
    };

    const calculateTotalPrice = () => {

        return Object.values(selectedProducts).reduce((total, product) => {
            if (product && !isNaN(Number(product.price))) {
                return total + Number(product.price);
            }

            return total;
        }, 0);
    };

    const totalPrice = useMemo(calculateTotalPrice, [selectedProducts]);

    const handleRemoveAllProducts = () => {
        setSelectedProducts({
            CPU: null,
            MB: null,
            RAM: null,
            GPU: null,
            SSD: null,
            PSU: null,
            Case: null,
            Cooler: null,
        });
        localStorage.clear();
    };

    return (
        <>
            <div onClick={handleRemoveAllProducts} className='flex justify-end mr-5 text-red-600 cursor-pointer'>
                <GrClearOption className="mt-0.5" />
                <h1>&nbsp;<strong>Clear All</strong></h1>
            </div>
            <div className='grid grid-cols-1 grid-rows-8 gap-4 place-items-center m-5'>
                {selectionOrder.map((typeProduct, index) => (
                    <ProductPopUp
                        key={typeProduct}
                        typeProduct={typeProduct}
                        onSelectProduct={(product) => handleSelectProduct(typeProduct, product)}
                        onDeselectProduct={() => handleDeselectProduct(typeProduct)}
                        selectedProduct={selectedProducts[typeProduct]}
                        selectedCpuSocket={typeProduct === 'MB' ? selectedCpuSocket : undefined}
                        selectedMoboRamType={typeProduct === 'RAM' ? selectedMoboRamType : undefined}
                        disabled={index > 0 && !isComponentSelected(index)}
                    />
                ))}

                <div className='flex shadow-xl rounded-xl h-12 w-full text-center mt-3 bg-[#D9D9D9]'>
                    <h2 className='text-xl font-semibold flex justify-center my-2 mx-2'>
                        Total price: {totalPrice} Baht
                    </h2>
                </div>
            </div>
        </>
    );
};

export default BuildComponent;