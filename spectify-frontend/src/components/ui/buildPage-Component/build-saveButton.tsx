"use client";

import React from "react";
import { Product } from "@/components/main/build/productPopup";

interface SaveButtProps {
    selectedProduct: any;
}

const SaveButt: React.FC<SaveButtProps> = ({ selectedProduct}: {selectedProduct: Product | null }) => {
    
    const handleClick = () => {
        if (selectedProduct){
            saveSelectedProduct(selectedProduct);
            console.log('Saved: ', selectedProduct);
        } else {
            console.log('No product selected');
        };
        console.log('Saved!');
    };

    const saveSelectedProduct = (product: Product) => {
        try{
            const savedProductsJSON = localStorage.getItem('savedProducts');
            const savedProducts = savedProductsJSON ? JSON.parse(savedProductsJSON) : [];

            savedProducts.push(product);

            localStorage.setItem('savedProducts', JSON.stringify(savedProducts));
        } catch (error) {
            console.log('error saving: ', error);
        }
    };

    return (
        <button onClick={handleClick}
                className='rounded-xl bg-[#00A9FF] text-white py-1'>
                
            <h2 className='text-center text-2xl font-semibold'>
                save
            </h2>
            
        </button>
    );
};

export default SaveButt;