"use client";

import React, { useEffect, useMemo, useState } from "react";
import ProductPopUp, { Product } from '@/components/main/build/productPopup';
import { cpuProducts } from "@/components/main/product/productPage";

export type SelectedProducts = {
    [key: string]: Product | null;
};

interface BuildComponentProps {
    selectedProducts: SelectedProducts;
    setSelectedProducts: React.Dispatch<React.SetStateAction<SelectedProducts>>;
  }

const BuildComponent: React.FC<BuildComponentProps> = ({ selectedProducts, setSelectedProducts }) => {

    const [selectedCpuSocket, setSelectedCpuSocket] = useState<string | null>(null);

    useEffect(() => {
        const loadedProducts = JSON.parse(localStorage.getItem('selectedProducts') || '{}');
        setSelectedProducts(prev => ({ ...prev, ...loadedProducts }));
        if (loadedProducts.CPU) {
            setSelectedCpuSocket(loadedProducts.CPU.socket);
        }
        
    }, [setSelectedProducts]);

    const handleSelectProduct = (typeProduct: string, product: Product) => {
    
        setSelectedProducts(prevProducts => {
            const newProducts = { ...prevProducts, [typeProduct]: product };
            localStorage.setItem('selectedProducts', JSON.stringify(newProducts));
            localStorage.setItem(typeProduct, product.id);
            
            if (typeProduct === 'CPU') {
                setSelectedCpuSocket((product as cpuProducts).socket);
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
                {Object.entries(selectedProducts).map(([type, product]) => (
                    <ProductPopUp
                        key={type}
                        typeProduct={type}
                        onSelectProduct={(product) => handleSelectProduct(type, product)}
                        onDeselectProduct={() => handleDeselectProduct(type)}
                        selectedProduct={product}
                        selectedCpuSocket={type === 'MB' ? selectedCpuSocket : undefined}
                    />
                ))}

                <div className='flex shadow-xl rounded-xl h-12 w-full text-center mt-3 bg-[#D9D9D9]'>
                    <h2 className='text-xl font-semibold flex justify-center my-2 mx-2'>
                        Total price: ${totalPrice}
                    </h2>
                </div>
            </div>
        
        </>
    );

};

export default BuildComponent;

