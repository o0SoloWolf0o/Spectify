"use client";

import React from 'react';
import { SelectedProducts } from './build-component';
import Image from "next/image";

type ProductImageMap = { [key in keyof SelectedProducts]: string };

const productTypeToImageUrl: ProductImageMap = {
  CPU: '/images/vispng/CPU.png',
  GPU: '/images/vispng/GPU.png',
  MB: '/images/vispng/MB2.png',
  RAM: '/images/vispng/RAM.png',
  SSD: '/images/vispng/SSD.png',
  PSU: '/images/vispng/PSU2.png',
  Case: '/images/vispng/Case.png',
  Cooler: '/images/vispng/Cooler.png',
};

interface VisualizationProps {
  selectedProducts: SelectedProducts;
}

const Visualization: React.FC<VisualizationProps> = ({ selectedProducts }) => {
  const safeSelectedProducts = selectedProducts || {};

  const hasSelectedProducts = Object.values(safeSelectedProducts).some(product => product);

  return (
    <div className="relative text-center" style={{ width: '430px', height: '430px' }}>
      {hasSelectedProducts ? (
        Object.entries(safeSelectedProducts).map(([type, product]) => {
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
        })
      ) : (
          <div className='mx-auto block text-center'>
          <strong className="text-xl text-yellow-600 ml-9">Please select a component</strong>
        </div>
      )}
    </div>
  );
};

export default Visualization;
