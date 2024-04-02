'use client';

import React from 'react';
import BuildComponent from '@/components/ui/buildPage-Component/build-component';
import Generator from '@/components/ui/buildPage-Component/build-generator';
import Performance from '@/components/ui/buildPage-Component/build-performance';
import Visualization from '@/components/ui/buildPage-Component/build-visualization';
import Optimization from '@/components/ui/buildPage-Component/build-opti';
import { SelectedProductsProvider } from '@/components/ui/buildPage-Component/selectedProductsContext';
import SaveBuildComponent from '@/components/main/build/saveBuild';

export default function BuildPage() {
    
    return (
        <>
        <SelectedProductsProvider>
        <div className='grid grid-cols-3 grid-rows-4 gap-4 m-10 p-10'>
            

            <div className='bg-white shadow-xl box-content row-span-2'>
                
                <Visualization />
     
            </div>
            
            <div className='bg-white shadow-xl box-content row-span-2 col-start-1 row-start-3 justify-center flex-row'>
            
                <Generator />
            
            </div>
            
            <div className='bg-white shadow-xl box-content row-span-4 col-start-2 row-start-1'>
                
                <h1 className='text-center mt-2 text-2xl font-semibold'>Components</h1>
                <BuildComponent />
            
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
                 <SaveBuildComponent className=''/> 
            </div>
                
        </div>
        </SelectedProductsProvider>
        </>
    
    );
};