"use client";

import React from 'react';
import { SelectedProducts } from './build-component';
import Image from "next/image";

type ProductImageMap = { [key in keyof SelectedProducts]: string };

const productTypeToImageUrl: ProductImageMap = {

  CPU: '/images/vispng/CPU.png',
  GPU: '/images/vispng/GPU.png',
  MB: '/images/vispng/MB.png',
  RAM: '/images/vispng/RAM.png',
  SSD: '/images/vispng/SSD.png',
  PSU: '/images/vispng/PSU.png',
  Case: '/images/vispng/Case.png',
  Cooler: '/images/vispng/Cooler.png',

};

interface VisualizationProps {
  selectedProducts: SelectedProducts;
}

const Visualization: React.FC<VisualizationProps> = ({ selectedProducts }) => {

  const safeSelectedProducts = selectedProducts || {};

  return (

    <div className="relative text-center" style={{ width: '430px', height: '430px' }}>
      {Object.entries(safeSelectedProducts).map(([type, product]) => {

        if (!product) return null;
        const imageUrl = productTypeToImageUrl[type as keyof SelectedProducts];
        return (
          <div key={type}>
            <Image
              key={type}
              src={imageUrl}
              alt={type}
              layout='fill'
              objectFit='contain'
            />
          </div>
        );
      })}
    </div>

  );
};

export default Visualization;

