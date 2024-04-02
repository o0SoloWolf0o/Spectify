"use client";

import React from 'react';
import { useSelectedProducts } from './selectedProductsContext';

const productTypeToImageUrl: { [type: string]: string } = {
    CPU: 'https://www.nextstepreborn.co.th/wp-content/uploads/2022/01/cover-i5-6500-png-resize.png',
    GPU: 'https://www.nextstepreborn.co.th/wp-content/uploads/2022/01/cover-i5-6500-png-resize.png',
    MB: 'https://www.nextstepreborn.co.th/wp-content/uploads/2022/01/cover-i5-6500-png-resize.png',
    RAM: 'https://www.nextstepreborn.co.th/wp-content/uploads/2022/01/cover-i5-6500-png-resize.png',
    SSD: 'https://www.nextstepreborn.co.th/wp-content/uploads/2022/01/cover-i5-6500-png-resize.png',
    PSU: 'https://www.nextstepreborn.co.th/wp-content/uploads/2022/01/cover-i5-6500-png-resize.png',
    Case: 'https://www.nextstepreborn.co.th/wp-content/uploads/2022/01/cover-i5-6500-png-resize.png',
    Cooler: 'https://www.nextstepreborn.co.th/wp-content/uploads/2022/01/cover-i5-6500-png-resize.png',

};

const Visualization = () => {
  const { selectedProducts } = useSelectedProducts();

  return (
    <div>
      {Object.entries(selectedProducts).map(([type, product]) => {
        if (!product) return null; // If no product is selected for this type, don't render anything.
        const imageUrl: string = productTypeToImageUrl[type];
        return (
          <img key={type} src={imageUrl} alt={type} style={{ width: 100, height: 100 }} />
        );
      })}
    </div>
  );
};

export default Visualization;

