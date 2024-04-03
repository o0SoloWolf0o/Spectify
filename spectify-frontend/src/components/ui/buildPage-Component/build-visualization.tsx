"use client";

import React from 'react';
import { SelectedProducts } from './build-component';

type ProductImageMap = { [key in keyof SelectedProducts]: string };

const productTypeToImageUrl: ProductImageMap = {  

  CPU: 'https://www.nextstepreborn.co.th/wp-content/uploads/2022/01/cover-i5-6500-png-resize.png',
  GPU: 'https://www.asus.com/media/Odin/Websites/global/ProductLine/20201028111930.png',
  MB: 'https://png.pngtree.com/png-vector/20230728/ourmid/pngtree-motherboard-clipart-an-image-of-a-motherboard-cartoon-vector-png-image_6814261.png',
  RAM: 'https://i.pinimg.com/originals/d9/26/92/d926929a407749d1e1a259193bc74885.png',
  SSD: 'https://png.pngtree.com/png-vector/20230328/ourmid/pngtree-ssd-solid-drive-computer-storage-vector-png-image_6672882.png',
  PSU: 'https://atlas-content-cdn.pixelsquid.com/stock-images/computer-power-supply-pc-18d5exA-600.jpg',
  Case: 'https://atlas-content-cdn.pixelsquid.com/stock-images/full-pc-case-open-desktop-computer-8JYmGv4-600.jpg',
  Cooler: 'https://cdn-reichelt.de/bilder/web/xxl_ws/E200/BEQUIET_BK021-01.png',

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

