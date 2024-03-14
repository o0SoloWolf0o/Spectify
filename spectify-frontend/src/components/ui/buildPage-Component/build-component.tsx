"use client";

import React from "react";
import { useState } from "react";
import ProductPopUp from '@/components/main/build/productPopup';
import { Product } from "@/components/main/build/productPopup";

 interface BuildComponentProps {
    onSelectProduct: (selectedProduct: Product) => void;
}

const BuildComponent: React.FC<BuildComponentProps> = ({ onSelectProduct }) => {
    
    const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
    //const [selectedProducts, setSelectedProducts] = useState<Product | null>(null);
    
    const handleSelectProduct = (selectedProduct: Product) => {
        setSelectedProducts(prevSelected => [...prevSelected, selectedProduct]);
    };

    // Function to calculate total price
    const calculateTotalPrice = () => {
        return selectedProducts.reduce((total, product) => total + parseFloat(product.price), 0);
    };

    return (
        <div className='grid grid-cols-1 grid-rows-8 gap-4 place-items-center m-5'>
                    
                    <ProductPopUp typeProduct="CPU" onSelectProduct={handleSelectProduct} />

                    <ProductPopUp typeProduct="MB" onSelectProduct={handleSelectProduct} />
                    
                    <ProductPopUp typeProduct="RAM" onSelectProduct={handleSelectProduct} />

                    <ProductPopUp typeProduct="GPU" onSelectProduct={handleSelectProduct} />
                   
                    <ProductPopUp typeProduct="SSD" onSelectProduct={handleSelectProduct} />
                   
                    <ProductPopUp typeProduct="PSU" onSelectProduct={handleSelectProduct} />

                    <ProductPopUp typeProduct="Case" onSelectProduct={handleSelectProduct} />

                    <ProductPopUp typeProduct="Cooler" onSelectProduct={handleSelectProduct} />
                 
                    <div className='flex shadow-xl rounded-xl h-12 w-full text-center mt-3 bg-[#D9D9D9]'>
                        
                        <h2 className='text-xl font-semibold flex justify-center my-2 mx-2'>
                            Total price: $ {calculateTotalPrice()}
                        </h2>
                    
                    </div>
                
                </div>
    );

};

export default BuildComponent;