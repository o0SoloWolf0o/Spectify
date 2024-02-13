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
        <div className='grid grid-cols-1 grid-rows-8 gap-4 place-items-center mt-5'>
                    
                    <div onClick={handleCPU}
                         className='shadow-xl rounded-xl box-content h-16 w-80 
                                hover:bg-[#00A9FF] hover:text-white hover:cursor-pointer duration-200
                                '>
                        cpu
                    
                    </div>
                    
                    <div onClick={handleMB}
                         className='shadow-xl rounded-xl box-content h-16 w-80 
                                hover:bg-[#00A9FF] hover:text-white hover:cursor-pointer duration-200
                                '>
                        m/b
                    
                    </div>
                    
                    <div onClick={handleRAM}
                         className='shadow-xl rounded-xl box-content h-16 w-80 
                                hover:bg-[#00A9FF] hover:text-white hover:cursor-pointer duration-200
                                '>
                        memory
                    
                    </div>
                    
                    <div onClick={handleVGA}
                         className='shadow-xl rounded-xl box-content h-16 w-80 
                                hover:bg-[#00A9FF] hover:text-white hover:cursor-pointer duration-200
                                '>
                        vga
                    
                    </div>
                    
                    <div onClick={handleStorage}
                         className='shadow-xl rounded-xl box-content h-16 w-80 
                                hover:bg-[#00A9FF] hover:text-white hover:cursor-pointer duration-200
                                '>
                        storage
                    
                    </div>
                    
                    <div onClick={handlePSU}
                         className='shadow-xl rounded-xl box-content h-16 w-80 
                                hover:bg-[#00A9FF] hover:text-white hover:cursor-pointer duration-200
                                '>
                        psu
                    
                    </div>
                    
                    <div onClick={handleCase}
                         className='shadow-xl rounded-xl box-content h-16 w-80 
                                hover:bg-[#00A9FF] hover:text-white hover:cursor-pointer duration-200
                                '>
                        case
                    
                    </div>
                    
                    <div onClick={handleCooler}
                         className='shadow-xl rounded-xl box-content h-16 w-80 
                                hover:bg-[#00A9FF] hover:text-white hover:cursor-pointer duration-200
                                '>
                        cooler
                    
                    </div>
                    
                    <div className='shadow-xl rounded-xl box-content h-12 w-80 text-center mt-3 bg-[#D9D9D9]'>
                        
                        <h2 className='text-xl font-semibold flex justify-center my-2'>
                            Total price:
                        </h2>
                    
                    </div>
                
                </div>
    );

};

export default BuildComponent;