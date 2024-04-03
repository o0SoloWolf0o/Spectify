"use client";

import React, { useEffect, useState, useMemo, FC } from "react";
import ProductPopUp, { Product } from '@/components/main/build/productPopup';

export type SelectedProducts = {
    [key: string]: Product | null;
};

// export type ProductWithImage = {
//     product: Product | null; // Assuming Product is a type from your context
//     imageUrl: string;
// };

// export type SelectedProductsWithImages = {
//     [key: string]: ProductWithImage;
// };

interface BuildComponentProps {
    selectedProducts: SelectedProducts;
    setSelectedProducts: React.Dispatch<React.SetStateAction<SelectedProducts>>;
  }

// const BuildComponent: FC = () => {
const BuildComponent: React.FC<BuildComponentProps> = ({ selectedProducts, setSelectedProducts }) => {

    // const initialState: SelectedProductsWithImages = {
    //     CPU: { product: null, imageUrl: 'https://www.nextstepreborn.co.th/wp-content/uploads/2022/01/cover-i5-6500-png-resize.png' },
    //     GPU: { product: null, imageUrl: 'https://www.nextstepreborn.co.th/wp-content/uploads/2022/01/cover-i5-6500-png-resize.png' },
    //     MB: { product: null, imageUrl: 'https://www.nextstepreborn.co.th/wp-content/uploads/2022/01/cover-i5-6500-png-resize.png' },
    //     RAM: { product: null, imageUrl: 'https://www.nextstepreborn.co.th/wp-content/uploads/2022/01/cover-i5-6500-png-resize.png' },
    //     SSD: { product: null, imageUrl: 'https://www.nextstepreborn.co.th/wp-content/uploads/2022/01/cover-i5-6500-png-resize.png' },
    //     PSU: { product: null, imageUrl: 'https://www.nextstepreborn.co.th/wp-content/uploads/2022/01/cover-i5-6500-png-resize.png' },
    //     Case: { product: null, imageUrl: 'https://www.nextstepreborn.co.th/wp-content/uploads/2022/01/cover-i5-6500-png-resize.png' },
    //     Cooler: { product: null, imageUrl: 'https://www.nextstepreborn.co.th/wp-content/uploads/2022/01/cover-i5-6500-png-resize.png' },
    // };
    // const [selectedProducts, setSelectedProducts] = useState<SelectedProducts>({
    //     CPU: null,
    //     MB: null,
    //     RAM: null,
    //     GPU: null,
    //     SSD: null,
    //     PSU: null,
    //     Case: null,
    //     Cooler: null,
    // });
    //const [selectedProducts, setSelectedProducts] = useState<SelectedProductsWithImages>(initialState);

    useEffect(() => {
        const loadedProducts = JSON.parse(localStorage.getItem('selectedProducts') || '{}');
        setSelectedProducts(prev => ({ ...prev, ...loadedProducts }));
    }, []);

    const handleSelectProduct = (typeProduct: string, product: Product) => {
    
        setSelectedProducts(prevProducts => {
            //const newProducts = { ...prevProducts, [typeProduct]: { ...prevProducts[typeProduct], product } };
             const newProducts = { ...prevProducts, [typeProduct]: product };
            localStorage.setItem('selectedProducts', JSON.stringify(newProducts));
            localStorage.setItem(typeProduct, product.id);
            return newProducts;
        });
    };

    const handleDeselectProduct = (typeProduct: string) => {
        
        setSelectedProducts(prevProducts => {
            //const newProducts = { ...prevProducts, [typeProduct]: { ...prevProducts[typeProduct], product: null } };
             const newProducts = { ...prevProducts, [typeProduct]: null };
            localStorage.setItem('selectedProducts', JSON.stringify(newProducts));
            localStorage.removeItem(typeProduct);
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
    // const calculateTotalPrice = () => {
    //     return Object.values(selectedProducts).reduce((total, productWithImage) => {
    //       // Check that productWithImage is not null and has a product property
    //       if (productWithImage && 'product' in productWithImage && productWithImage.product) {
    //         const { product } = productWithImage;
    //         // Check that 'product' is not null and has a 'price' property
    //         if ('price' in product) {
    //           const price = Number(product.price);
    //           return !isNaN(price) ? total + price : total;
    //         }
    //       }
    //       return total;
    //     }, 0);
    // };
      

    const totalPrice = useMemo(calculateTotalPrice, [selectedProducts]);

    return (
        <>
            
            <div className='grid grid-cols-1 grid-rows-8 gap-4 place-items-center m-5'>
            {/* {Object.entries(selectedProducts).map(([type, productWithImage]) => ( */}
                {Object.entries(selectedProducts).map(([type, product]) => (
                    <ProductPopUp
                        key={type}
                        typeProduct={type}
                        onSelectProduct={(product) => handleSelectProduct(type, product)}
                        onDeselectProduct={() => handleDeselectProduct(type)}
                        //selectedProduct={productWithImage?.product}
                        selectedProduct={product}
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

