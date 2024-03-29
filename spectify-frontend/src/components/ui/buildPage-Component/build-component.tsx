"use client";

import React, { useEffect, useState, useMemo } from "react";
import ProductPopUp, { Product } from '@/components/main/build/productPopup';

// Define a type for the selected products state
type SelectedProducts = {
  [key: string]: Product | null;
};

const BuildComponent = () => {
  // Initialize state to store selected products by type
    const [selectedProducts, setSelectedProducts] = useState<SelectedProducts>({
    CPU: null,
    MB: null,
    RAM: null,
    GPU: null,
    SSD: null,
    PSU: null,
    Case: null,
    Cooler: null,
  });

    useEffect(() => {
        // Load the selected products from local storage on component mount
        const loadedProducts = JSON.parse(localStorage.getItem('selectedProducts') || '{}');
        setSelectedProducts(prev => ({ ...prev, ...loadedProducts }));
    }, []);

    // Store the selected product in local storage
    const handleSelectProduct = (typeProduct: string, product: Product) => {
        setSelectedProducts(prevProducts => {
        
            const newProducts = { ...prevProducts, [typeProduct]: product };
            localStorage.setItem('selectedProducts', JSON.stringify(newProducts));
            return newProducts;
        });
    };

    // Remove a selected product from local storage
    const handleDeselectProduct = (typeProduct: string) => {
        setSelectedProducts(prevProducts => {
        
            const newProducts = { ...prevProducts, [typeProduct]: null };
            localStorage.setItem('selectedProducts', JSON.stringify(newProducts));
            return newProducts;
        });
    };

    const calculateTotalPrice = () => {
        return Object.values(selectedProducts).reduce((total, product) => {
          // Ensure the product is not null and price is a number
          if (product && !isNaN(Number(product.price))) {
            return total + Number(product.price);
          }
          return total;
        }, 0);
    };

    const totalPrice = useMemo(calculateTotalPrice, [selectedProducts]);

  // Render ProductPopUp components with the ability to select and deselect products
    return (
        <div className='grid grid-cols-1 grid-rows-8 gap-4 place-items-center m-5'>
        
        {Object.entries(selectedProducts).map(([type, product]) => (
            <ProductPopUp
            key={type}
            typeProduct={type}
            onSelectProduct={(product) => handleSelectProduct(type, product)}
            onDeselectProduct={() => handleDeselectProduct(type)}
            selectedProduct={product}
            />
        ))}

        {/* ...other parts of the component */}
        <div className='flex shadow-xl rounded-xl h-12 w-full text-center mt-3 bg-[#D9D9D9]'>
            <h2 className='text-xl font-semibold flex justify-center my-2 mx-2'>
                Total price: ${totalPrice}
            </h2>
        </div>
        
        </div>
    );
};

export default BuildComponent;
