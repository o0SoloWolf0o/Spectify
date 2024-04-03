"use client";

import React, {useState} from 'react';
import { SelectedProducts } from './build-component';

type ProductImageMap = { [key in keyof SelectedProducts]: string };

const productTypeToImageUrl: ProductImageMap = {  

  CPU: 'https://www.nextstepreborn.co.th/wp-content/uploads/2022/01/cover-i5-6500-png-resize.png',
  GPU: 'https://www.nextstepreborn.co.th/wp-content/uploads/2022/01/cover-i5-6500-png-resize.png',
  MB: 'https://www.nextstepreborn.co.th/wp-content/uploads/2022/01/cover-i5-6500-png-resize.png',
  RAM: 'https://www.nextstepreborn.co.th/wp-content/uploads/2022/01/cover-i5-6500-png-resize.png',
  SSD: 'https://www.nextstepreborn.co.th/wp-content/uploads/2022/01/cover-i5-6500-png-resize.png',
  PSU: 'https://www.nextstepreborn.co.th/wp-content/uploads/2022/01/cover-i5-6500-png-resize.png',
  Case: 'https://www.nextstepreborn.co.th/wp-content/uploads/2022/01/cover-i5-6500-png-resize.png',
  Cooler: 'https://www.nextstepreborn.co.th/wp-content/uploads/2022/01/cover-i5-6500-png-resize.png',

};

interface VisualizationProps {
  selectedProducts: SelectedProducts;
}

const Visualization: React.FC<VisualizationProps> = ({ selectedProducts }) => {
  
  const safeSelectedProducts = selectedProducts || {};

  return (
    
    <div className="flex flex-nowrap justify-center items-center">
      
      {Object.entries(safeSelectedProducts).map(([type, product]) => {
        
        if (!product) return null;
        const imageUrl = productTypeToImageUrl[type as keyof SelectedProducts];
        return (
          
          <img 
            key={type} 
            src={imageUrl} 
            alt={type} 
            style={{ width: '50px', height: '50px' }} 
          />
        
        );
      })}
    </div>
  
  );
};

export default Visualization;

