'use client';

import React, { useState, useEffect } from 'react';
import BuildComponent, { SelectedProducts } from '@/components/ui/buildPage-Component/build-component';
import Generator from '@/components/ui/buildPage-Component/build-generator';
import Performance from '@/components/ui/buildPage-Component/build-performance';
import Visualization from '@/components/ui/buildPage-Component/build-visualization';
import Optimization from '@/components/ui/buildPage-Component/build-opti';
import SaveBuildComponent from '@/components/main/build/saveBuild';

export default function BuildPage() {

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

    return (
        <>
            <div className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4'>
                <div className='bg-white shadow-xl box-content row-span-1 flex-row'>
                    <Visualization selectedProducts={selectedProducts} />
                </div>
                <div className='bg-white shadow-xl box-content row-span-1'>
                    <h1 className='text-center mt-2 text-2xl font-semibold'>Components</h1>
                    <BuildComponent
                        selectedProducts={selectedProducts}
                        setSelectedProducts={setSelectedProducts}
                    />
                </div>
                <div className='bg-white shadow-xl box-content row-span-1'>
                    <h1 className='text-center mt-2 text-2xl font-semibold'>Performance</h1>
                    <Performance />
                </div>
                <div className='bg-white shadow-xl box-content row-span-1 flex-row p-10'>
                    <Generator setSelectedProducts={setSelectedProducts} />
                </div>
                <div className='bg-white shadow-xl box-content row-span-1'>
                    <h1 className='text-center mt-2 text-2xl font-semibold'>Optimization</h1>
                    <Optimization />
                </div>
                <div className='grid grid-cols-1 grid-rows-1 gap-0 mx-5'>
                    <SaveBuildComponent className='rounded-xl bg-[#00A9FF] text-white text-2xl font-semibold' />
                </div>
            </div>
        </>
    );
};