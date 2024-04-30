'use client';

import React, { useState } from 'react';
import BuildComponent, { SelectedProducts } from '@/components/ui/buildPage-Component/build-component';
import Generator from '@/components/ui/buildPage-Component/build-generator';
import Performance from '@/components/ui/buildPage-Component/build-performance';
import Visualization from '@/components/ui/buildPage-Component/build-visualization';
import Optimization from '@/components/ui/buildPage-Component/build-opti';
import SaveBuildComponent from '@/components/main/build/saveBuild';
import Image from 'next/image';

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
            <div className='grid grid-cols-3 grid-rows-4 gap-4 m-10 p-10'>


                <div className='bg-white shadow-xl box-content row-span-2'>
                
                    {/* <div className="relative text-center" style={{ width: '430px', height: '430px' }}>
                        <Image src={"/images/vispng/main.png"} alt='' layout='fill' objectFit='contain'/>
                    </div> */}
                    
                    <Visualization selectedProducts={selectedProducts} />

                </div>

                <div className='bg-white shadow-xl box-content row-span-2 col-start-1 row-start-3 justify-center flex-row'>

                    <Generator />

                </div>

                <div className='bg-white shadow-xl box-content row-span-4 col-start-2 row-start-1'>

                    <h1 className='text-center mt-2 text-2xl font-semibold'>Components</h1>

                    <BuildComponent
                        selectedProducts={selectedProducts}
                        setSelectedProducts={setSelectedProducts}
                    />

                </div>

                <div className='bg-white shadow-xl box-content row-span-3 col-start-3 row-start-1'>

                    <h1 className='text-center mt-2 text-2xl font-semibold'>Performance</h1>
                    <Performance />

                </div>

                <div className='bg-white shadow-xl box-content row-span-1 col-start-3 row-start-4'>

                    <h1 className='text-center mt-2 text-2xl font-semibold'>Optimization</h1>
                    <Optimization />

                </div>


                <div className='grid grid-cols-1 grid-rows-1 gap-0 mx-5 col-start-1 row-start-5'>

                    <SaveBuildComponent className='rounded-xl bg-[#00A9FF] text-white text-2xl font-semibold' />

                </div>

            </div>
        </>

    );
};