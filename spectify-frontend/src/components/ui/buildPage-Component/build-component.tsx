import React from "react";

const BuildComponent = () => {
    
    const handleCPU = () => {
        console.log("Choose a Processor.");
    };

    const handleMB = () => {
        console.log("Choose a M/B.");
    };

    const handleRAM = () => {
        console.log("Choose Memory modules.");
    };

    const handleVGA = () => {
        console.log("Choose a VGA.");
    };

    const handleStorage = () => {
        console.log("Choose Storages.");
    };

    const handlePSU = () => {
        console.log("Choose a PSU.");
    };

    const handleCase = () => {
        console.log("Choose a Case.");
    };

    const handleCooler = () => {
        console.log("Choose a Cooler.");
    };

    return (
        <div className='grid grid-cols-1 grid-rows-8 gap-4 place-items-center m-5'>
                    
                    <div onClick={handleCPU}
                         className='flex shadow-xl rounded-xl h-16 w-full
                                hover:bg-[#00A9FF] hover:text-white hover:cursor-pointer duration-200'>
                        cpu
                    </div>
                    
                    <div onClick={handleMB}
                         className='flex shadow-xl rounded-xl h-16 w-full
                                hover:bg-[#00A9FF] hover:text-white hover:cursor-pointer duration-200'>
                        m/b
                    </div>
                    
                    <div onClick={handleRAM}
                         className='flex shadow-xl rounded-xl h-16 w-full
                                hover:bg-[#00A9FF] hover:text-white hover:cursor-pointer duration-200'>
                        memory

                    </div>
                    
                    <div onClick={handleVGA}
                         className='flex shadow-xl rounded-xl h-16 w-full
                                hover:bg-[#00A9FF] hover:text-white hover:cursor-pointer duration-200'>
                        vga
                    </div>
                    
                    <div onClick={handleStorage}
                         className='flex shadow-xl rounded-xl h-16 w-full
                                hover:bg-[#00A9FF] hover:text-white hover:cursor-pointer duration-200'>
                        storage
                    </div>
                    
                    <div onClick={handlePSU}
                         className='flex shadow-xl rounded-xl h-16 w-full
                                hover:bg-[#00A9FF] hover:text-white hover:cursor-pointer duration-200'>
                        psu
                    </div>
                    
                    <div onClick={handleCase}
                         className='flex shadow-xl rounded-xl h-16 w-full
                                hover:bg-[#00A9FF] hover:text-white hover:cursor-pointer duration-200'>
                        case
                    </div>
                    
                    <div onClick={handleCooler}
                         className='flex shadow-xl rounded-xl h-16 w-full
                                hover:bg-[#00A9FF] hover:text-white hover:cursor-pointer duration-200'>
                        cooler
                    </div>
                    
                    <div className='flex shadow-xl rounded-xl h-12 w-full text-center mt-3 bg-[#D9D9D9]'>
                        
                        <h2 className='text-xl font-semibold flex justify-center my-2'>
                            Total price:
                        </h2>
                    
                    </div>
                
                </div>
    );

};

export default BuildComponent;