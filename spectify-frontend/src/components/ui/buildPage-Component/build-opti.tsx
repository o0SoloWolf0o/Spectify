import React from "react";

interface Product {
    CPU?: {
        id: string;
        typeProduct: string;
        name: string;
        image: string;
        type: string;
        socket: string;
        core: string;
        thread: string;
        year: string;
        price: string;
        tdp: string;
        clock: string;
        turbo: string;
        description: string;
    }
    RAM?: {
        id: string;
        typeProduct: string;
        name: string;
        image: string;
        size: string;
        type: string;
        kit: string;
        description: string;
        price: string;
        bus: string;
        tdp: string;
    }
    GPU?: {
        id: string;
        typeProduct: string;
        name: string;
        image: string;
        type: string;
        performance: string;
        architecture: string;
        year: string;
        series: string;
        vram: string;
        price: string;
        tdp: string;
        motherboardBus: string;
        coreClock: string;
        boostClock: string;
        effectiveClock: string;
        length: string;
        coolingFans: string;
        caseSlots: string;
        frameSync: string;
        description: string;
    }
    MB?: {
        id: string;
        typeProduct: string;
        name: string;
        image: string;
        size: string;
        socket: string;
        ramslot: string;
        description: string;
        price: string;
        tdp: string;
    }
    HDD?: {
        id: string;
        typeProduct: string;
        name: string;
        image: string;
        size: string;
        description: string;
        price: string;
        speedRead: string;
        speedWrite: string;
        tdp: string;
    }
    SSD?: {
        id: string;
        typeProduct: string;
        name: string;
        image: string;
        size: string;
        type: string;
        description: string;
        price: string;
        speedRead: string;
        speedWrite: string;
        tdp: string;
    }
    Cooler?: {
        id: string;
        typeProduct: string;
        name: string;
        image: string;
        socket: string;
        description: string;
        price: string;
        tdp: string;
    }
    Case?: {
        id: string;
        typeProduct: string;
        name: string;
        image: string;
        size: string;
        isolation: string;
        description: string;
        price: string;
    }
    PSU?: {
        id: string;
        typeProduct: string;
        name: string;
        image: string;
        wattage: string;
        description: string;
        price: string;
        tdp: string;
    }
}

const Optimization = () => {

    let product: Product = {};

    if (typeof localStorage !== 'undefined') {
        const allProductData = localStorage.getItem('selectedProducts');
        
        if (allProductData) {
            product = JSON.parse(allProductData);
        }
    }

    // Sum of all TDP
    let totalTDP = 0;
    if (product.CPU) totalTDP += parseInt(product.CPU.tdp);
    if (product.GPU) totalTDP += parseInt(product.GPU.tdp);
    if (product.RAM) totalTDP += parseInt(product.RAM.tdp);
    if (product.MB) totalTDP += parseInt(product.MB.tdp);
    if (product.HDD) totalTDP += parseInt(product.HDD.tdp);
    if (product.SSD) totalTDP += parseInt(product.SSD.tdp);
    if (product.Cooler) totalTDP += parseInt(product.Cooler.tdp);
    if (product.PSU) totalTDP += parseInt(product.PSU.tdp);

    const psuWattage = product.PSU ? parseInt(product.PSU.wattage) : 0;

    return (
        <>
            {totalTDP > 0 && (
                <div className="col-12 text-center">
                    {psuWattage ? (
                        totalTDP <= psuWattage ? (
                            <strong className="text-xl">Your build is optimized!</strong>
                        ) : (
                            <strong className="text-xl">Warning: Your build exceeds PSU wattage!</strong>
                        )
                    ) : (
                        <strong className="text-xl">Please select a power supply!</strong>
                    )}
                </div>
            )}
        </>
    );
};

export default Optimization;