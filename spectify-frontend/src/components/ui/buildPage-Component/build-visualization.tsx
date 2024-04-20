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

    <div className="flex flex-nowrap justify-center items-center">
      {Object.entries(safeSelectedProducts).map(([type, product]) => {

        if (!product) return null;
        const imageUrl = productTypeToImageUrl[type as keyof SelectedProducts];
        return (
          <div key={type}>
            test image
            <Image
              key={type}
              src={imageUrl}
              alt={type}
              width={50}
              height={50}
              style={{ width: '50px', height: '50px' }}
              className='w-full h-full'
            />
          </div>
        );
      })}
    </div>

  );
};

export default Visualization;

