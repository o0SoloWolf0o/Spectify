"use client";

import React, { useEffect, useState, useMemo, FC } from "react";
import ProductPopUp, { Product } from '@/components/main/build/productPopup';

export type SelectedProducts = {
  [key: string]: Product | null;
};

// const getProductImageSrc: (typeProduct: keyof SelectedProducts) => string = (typeProduct) => {
//   const images: { [key in keyof SelectedProducts]: string } = {
//     CPU: 'https://cdn4.iconfinder.com/data/icons/computer-hardware-and-devices-1/512/cpu-512.png',
//     GPU: 'https://cdn4.iconfinder.com/data/icons/computer-hardware-and-devices-1/512/cpu-512.png',
//     // Define paths for other product types...
//     MB: 'https://cdn4.iconfinder.com/data/icons/computer-hardware-and-devices-1/512/cpu-512.png',
//     RAM: 'https://cdn4.iconfinder.com/data/icons/computer-hardware-and-devices-1/512/cpu-512.png',
//     SSD: 'https://cdn4.iconfinder.com/data/icons/computer-hardware-and-devices-1/512/cpu-512.png',
//     PSU: 'https://cdn4.iconfinder.com/data/icons/computer-hardware-and-devices-1/512/cpu-512.png',
//     Case: 'https://cdn4.iconfinder.com/data/icons/computer-hardware-and-devices-1/512/cpu-512.png',
//     Cooler: 'https://cdn4.iconfinder.com/data/icons/computer-hardware-and-devices-1/512/cpu-512.png',
//   };
//   return images[typeProduct] || '';
// };

const BuildComponent: FC = () => {

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
      const loadedProducts = JSON.parse(localStorage.getItem('selectedProducts') || '{}');
      setSelectedProducts(prev => ({ ...prev, ...loadedProducts }));
  }, []);

  const handleSelectProduct = (typeProduct: string, product: Product) => {
    
    setSelectedProducts(prevProducts => {
      const newProducts = { ...prevProducts, [typeProduct]: product };
        localStorage.setItem('selectedProducts', JSON.stringify(newProducts));
        localStorage.setItem(typeProduct, product.id);
        return newProducts;
      });
  };

  const handleDeselectProduct = (typeProduct: string) => {
        
    setSelectedProducts(prevProducts => {
      const newProducts = { ...prevProducts, [typeProduct]: null };
        localStorage.setItem('selectedProducts', JSON.stringify(newProducts));
        localStorage.removeItem(typeProduct);
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
    <>
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
    </>
  );
};

export default BuildComponent;

