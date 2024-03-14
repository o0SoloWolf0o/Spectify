'use client';

import React, { useState } from 'react';
import SaveButt from '@/components/ui/buildPage-Component/build-saveButton';
import BuildComponent from '@/components/ui/buildPage-Component/build-component';
import Generator from '@/components/ui/buildPage-Component/build-generator';
import Vitualization from '@/components/ui/buildPage-Component/build-vit';
import Performance from '@/components/ui/buildPage-Component/build-performance';
import Optimization from '@/components/ui/buildPage-Component/build-Opti';

export default function BuildPage() {
    
    const [selectedProduct, setSelectedProduct] = useState({});

    return (
        
        <div className='grid grid-cols-3 grid-rows-4 gap-4 m-10 p-10'>
            

            <div className='bg-white shadow-xl box-content row-span-2'>
                
                <Vitualization />

            </div>
            
            <div className='bg-white shadow-xl box-content row-span-2 col-start-1 row-start-3 justify-center flex-row'>
            
                <Generator />
            
            </div>
            
            <div className='bg-white shadow-xl box-content row-span-4 col-start-2 row-start-1'>
                
                <h1 className='text-center mt-2 text-2xl font-semibold'>Components</h1>
                <BuildComponent onSelectProduct={setSelectedProduct} />
           
            </div>
            
            <div className='bg-white shadow-xl box-content row-span-2 col-start-3 row-start-1'>
                
                <h1 className='text-center mt-2 text-2xl font-semibold'>Performance</h1>
                <Performance />

            </div>
            
            <div className='bg-white shadow-xl box-content row-span-2 col-start-3 row-start-3'>
                
                <h1 className='text-center mt-2 text-2xl font-semibold'>Optimization</h1>
                <Optimization />
                
            </div>
            
            <div className='grid grid-cols-1 grid-rows-1 gap-0 mx-5'>
                <SaveButt selectedProduct={selectedProduct} />
            </div>
                
        </div>

    );
};