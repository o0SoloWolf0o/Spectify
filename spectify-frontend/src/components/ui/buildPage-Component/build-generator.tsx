"use client";

import React, { useState } from 'react';
import { Switch } from "@nextui-org/react";

const Generator = () => {

    const [isSwitchOn, setIsSwitchOn] = useState(false);

    return (

        <>

            <div className='grid grid-cols-1 grid-rows-1 gap-0 m-5 h-12 shadow-xl rounded-lg mt-5'>
                <div className="ml-3 mt-2.5">
                    <Switch checked={isSwitchOn} onChange={() => setIsSwitchOn(!isSwitchOn)} />
                </div>

                <h2 className='flex justify-end mt-2 mx-5 text-2xl font-semibold'>
                    Auto Build
                </h2>
            </div>

            <div className={`transition-opacity ${isSwitchOn ? 'opacity-100' : 'opacity-0'} duration-500 ease-in-out`}>
                <div>
                    <label className='mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                        <h3 className='text-xl font-semibold ml-5 mb-2'>Budget</h3>
                    </label>
                    <div className='flex justify-center'>
                        <input
                            type="number"
                            min="0"
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 mb-5 mx-5'
                        />
                    </div>
                </div>

                <div>
                    <label className='mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                        <h3 className='text-xl font-semibold ml-5 mb-2'>Priority</h3>
                    </label>
                    <div className='flex justify-center'>
                        <select
                            className='flex bg-gray-50 border border-[#D9D9D9] focus:ring-[#00A9FF] focus:border-[#00A9FF] text-black text-md hover:cursor-pointer rounded-lg w-full mx-5 mb-5 p-2.5'
                        >
                            <option value='Gaming'>Gaming</option>
                            <option value='Programming'>Programming</option>
                            <option value='Video Editing'>Video Editing</option>
                            <option value='Office working'>Office working</option>
                        </select>
                    </div>
                </div>

                <div className='grid grid-cols-1 grid-rows-1 gap-0 mx-5'>
                    <button className='rounded-xl bg-[#00A9FF] text-white'>
                        <h2 className='text-2xl font-semibold'>
                            apply
                        </h2>
                    </button>
                </div>
            </div>

        </>
    );

};

export default Generator;