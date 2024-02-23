"use client";

import ProductPopUp from '@/components/main/build/productPopup';


export default function App() {

    return (
        <>

            <ProductPopUp typeProduct="CPU"/>
            <ProductPopUp typeProduct="RAM"/>
            <ProductPopUp typeProduct="GPU"/>
            <ProductPopUp typeProduct="SSD"/>
            <ProductPopUp typeProduct="HDD"/>
            <ProductPopUp typeProduct="Mother Board"/>
            <ProductPopUp typeProduct="Power Supply"/> 

        </>
    );
}