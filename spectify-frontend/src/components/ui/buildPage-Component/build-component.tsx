"use client";

import React, { useEffect, useMemo, useState } from "react";
import ProductPopUp, { Product } from '@/components/main/build/productPopup';
import { cpuProducts } from "@/components/main/product/productPage";
import { moboProducts } from "@/components/main/product/productPage";
import { ramProducts } from "@/components/main/product/productPage";

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

    // const handleSelectProduct = (typeProduct: string, product: Product) => {
    //     setSelectedProducts(prevProducts => {
    //         const newProducts = { ...prevProducts, [typeProduct]: product };
    //         localStorage.setItem('selectedProducts', JSON.stringify(newProducts));
    //         localStorage.setItem(typeProduct, product.id);
    
    //         if (typeProduct === 'CPU' && 'socket' in product) {
    //             const cpuProduct = product as cpuProducts;
    //             setSelectedCpuSocket(cpuProduct.socket);
    //         } else if (typeProduct === 'MB' && 'ramslot' in product) {
    //             const moboProduct = product as unknown as moboProducts;
    //             setSelectedMoboRamType(moboProduct.ramslot);
    //         }

    //         return newProducts;
    //     });
    // };
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

return (
    <>
        <div className='grid grid-cols-1 grid-rows-8 gap-4 place-items-center m-5'>
            <ProductPopUp
                typeProduct="CPU"
                onSelectProduct={(product) => handleSelectProduct("CPU", product)}
                onDeselectProduct={() => handleDeselectProduct("CPU")}
                selectedProduct={selectedProducts["CPU"]}
                selectedCpuSocket={null}
                selectedMoboRamType={null}
                disabled={false}  // CPU selection is never disabled
            />
            <ProductPopUp
                typeProduct="MB"
                onSelectProduct={(product) => handleSelectProduct("MB", product)}
                onDeselectProduct={() => handleDeselectProduct("MB")}
                selectedProduct={selectedProducts["MB"]}
                selectedCpuSocket={selectedCpuSocket}
                selectedMoboRamType={null}
                disabled={!isCpuSelected}  // Disable MB selection until CPU is selected
            />
            <ProductPopUp
                typeProduct="RAM"
                onSelectProduct={(product) => handleSelectProduct("RAM", product)}
                onDeselectProduct={() => handleDeselectProduct("RAM")}
                selectedProduct={selectedProducts["RAM"]}
                selectedCpuSocket={null}
                selectedMoboRamType={selectedMoboRamType}
                disabled={!isCpuSelected || !isMoboSelected}  // Disable RAM selection until CPU and MB are selected
            />
            <ProductPopUp
                typeProduct="GPU"
                onSelectProduct={(product) => handleSelectProduct("GPU", product)}
                onDeselectProduct={() => handleDeselectProduct("GPU")}
                selectedProduct={selectedProducts["GPU"]}
                selectedCpuSocket={null}
                selectedMoboRamType={null}
                disabled={false}  // GPU selection is never disabled
            />
            <ProductPopUp
                typeProduct="SSD"
                onSelectProduct={(product) => handleSelectProduct("SSD", product)}
                onDeselectProduct={() => handleDeselectProduct("SSD")}
                selectedProduct={selectedProducts["SSD"]}
                selectedCpuSocket={null}
                selectedMoboRamType={null}
                disabled={false}  // SSD selection is never disabled
            />
            <ProductPopUp
                typeProduct="PSU"
                onSelectProduct={(product) => handleSelectProduct("PSU", product)}
                onDeselectProduct={() => handleDeselectProduct("PSU")}
                selectedProduct={selectedProducts["PSU"]}
                selectedCpuSocket={null}
                selectedMoboRamType={null}
                disabled={false}  // PSU selection is never disabled
            />      
            <ProductPopUp
                typeProduct="Cooler"
                onSelectProduct={(product) => handleSelectProduct("Cooler", product)}
                onDeselectProduct={() => handleDeselectProduct("Cooler")}
                selectedProduct={selectedProducts["Cooler"]}
                selectedCpuSocket={null}
                selectedMoboRamType={null}
                disabled={false}  // Cooler selection is never disabled
            />
            <ProductPopUp
                typeProduct="Case"
                onSelectProduct={(product) => handleSelectProduct("Case", product)}
                onDeselectProduct={() => handleDeselectProduct("Case")}
                selectedProduct={selectedProducts["Case"]}
                selectedCpuSocket={null}
                selectedMoboRamType={null}
                disabled={false}  // Case selection is never disabled
            />
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
