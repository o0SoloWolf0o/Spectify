'use client';

import React from 'react';
import SaveButt from '@/components/ui/buildPage-Component/build-saveButton';
import BuildComponent from '@/components/ui/buildPage-Component/build-component';
import Generator from '@/components/ui/buildPage-Component/build-generator';
import Performance from '@/components/ui/buildPage-Component/build-performance';


export default function BuildPage() {
    
    return (
        <>
        <div className='grid grid-cols-3 grid-rows-4 gap-4 m-10 p-10'>
            

            <div className='bg-white shadow-xl box-content row-span-2'>
                
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
                
            </div>
            
            <div className='grid grid-cols-1 grid-rows-1 gap-0 mx-5'>
                <SaveButt />
            </div>
                
        </div>
        </>
    );
};