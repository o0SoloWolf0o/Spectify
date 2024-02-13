import React from "react";

const SaveButt = () => {
    const handleClick = () => {
        console.log('Saved!');
    };

    return (
        <button onClick={handleClick}
                className='rounded-xl bg-[#00A9FF] text-white py-1'>
                
            <h2 className='text-center text-2xl font-semibold'>
                save
            </h2>
            
        </button>
    );
};

export default SaveButt;