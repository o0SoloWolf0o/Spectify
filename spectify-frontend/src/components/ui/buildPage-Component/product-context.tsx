"use client";

import React, { createContext, useContext, useState } from 'react';
import { Product } from '@/components/main/build/productPopup';

interface ProductContextType {
    selectedProducts: { [key: string]: Product | null };
    selectProduct: (type: string, product: Product) => void;
    deselectProduct: (type: string) => void;
}

const defaultState: ProductContextType = {
    selectedProducts: {},
    selectProduct: () => {},
    deselectProduct: () => {}
};

const ProductContext = createContext<ProductContextType>(defaultState);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [selectedProducts, setSelectedProducts] = useState<{ [key: string]: Product | null }>({});

    const selectProduct = (type: string, product: Product) => {
        setSelectedProducts(prev => ({ ...prev, [type]: product }));
    };

    const deselectProduct = (type: string) => {
        setSelectedProducts(prev => ({ ...prev, [type]: null }));
    };

    return (
        <ProductContext.Provider value={{ selectedProducts, selectProduct, deselectProduct }}>
            {children}
        </ProductContext.Provider>
    );
};

export const useProducts = () => useContext(ProductContext);



// Example

// import React, { useEffect, useMemo } from 'react';
// import { useProducts } from './ProductContext';

// const SomeComponent: React.FC = () => {
//   const { selectedProducts } = useProducts();

//   const calculateTotalPrice = useMemo(() => {
//     return Object.values(selectedProducts).reduce((total, product) => {
//       return product ? total + parseFloat(product.price) : total;
//     }, 0);
//   }, [selectedProducts]);

//   const handleActionClick = () => {
//     console.log("Performing action with the following selected products:");
//     Object.values(selectedProducts).forEach(product => {
//       if (product) {
//         console.log(`Product: ${product.name}, Price: ${product.price}`);
//       }
//     });
//   };

//   return (
//     <div>
//       <h1>Selected Products:</h1>
//       <ul>
//         {Object.entries(selectedProducts).map(([type, product]) => {
//           if (product) {
//             return (
//               <li key={type}>
//                 {type}: {product.name} - {product.description}
//               </li>
//             );
//           }
//           return null;
//         })}
//       </ul>
//       <p>Total Price: ${calculateTotalPrice.toFixed(2)}</p>
//       <button onClick={handleActionClick}>Perform Action with Selected Products</button>
//     </div>
//   );
// };

// export default SomeComponent;
