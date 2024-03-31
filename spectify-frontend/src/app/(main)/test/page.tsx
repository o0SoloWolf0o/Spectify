"use client";

import React from "react";
import { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import Image from 'next/image';
import { color } from "framer-motion";

type cpuProducts = {
    id: string;
    typeProduct: string;
    name: string;
    image: string;
    type: string;
    socket: string;
    coreThreads: string;
    year: string;
    price: string;
    tdp: string;
    clock: string;
    turbo: string;
    description: string;
}

type ramProducts = {
    typeProduct: string;
    name: string;
    image: string;
    size: string;
    type: string;
    kit: string;
    description: string;
    price: string;
}

type gpuProducts = {
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

type moboProducts = {
    typeProduct: string;
    name: string;
    image: string;
    size: string;
    socket: string;
    ramslot: string;
    description: string;
    price: string;
}

type hddProducts = {
    typeProduct: string;
    name: string;
    image: string;
    size: string;
    description: string;
    price: string;
}

type ssdProducts = {
    typeProduct: string;
    name: string;
    image: string;
    size: string;
    type: string;
    description: string;
    price: string;
}

type cpuCoolerProducts = {
    typeProduct: string;
    name: string;
    image: string;
    socket: string;
    description: string;
    price: string;
}

type monitorProducts = {
    typeProduct: string;
    name: string;
    image: string;
    panelType: string;
    resolution: string;
    refreshRate: string;
    size: string;
    freesync: string;
    gsync: string;
    price: string;
    description: string;
}

type psuProducts = {
    typeProduct: string;
    name: string;
    image: string;
    wattage: string;
    description: string;
    price: string;
}

type Product = cpuProducts | ramProducts | gpuProducts | moboProducts | hddProducts | ssdProducts | cpuCoolerProducts | monitorProducts | psuProducts;


export default function App() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();



    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <h1>title</h1>
                    <p style={{ fontSize: '13px' }}>brand</p>
                    <Image
                        src="/spectify-frontend/public/images/Logo.png"
                        alt="Product"
                        width={200}
                        height={200}
                        style={{ boxShadow: '2px 4px 8px rgba(0, 0, 0, 0.1)' }}
                    />
                    <div style={{ marginTop: '7px' }}>
                        <p style={{ color: '#6B6B6B' }}>Estimate Price</p>
                        <p style={{ fontWeight: 'bold' }}>price THB</p>
                    </div>
                </div>
                <div style={{ background: "#DCF1FB", flex: 1, padding: '20px' }}>
                    <h1>description</h1>
                </div>
            </div>

            <Button onPress={onOpen}>Open Modal</Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
                            <ModalBody>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                                        <h1>title</h1>
                                        <p style={{ fontSize: '13px' }}>brand</p>
                                        <Image
                                            src="/spectify-frontend/public/images/Logo.png"
                                            alt="Product"
                                            width={200}
                                            height={200}
                                            style={{ boxShadow: '2px 4px 8px rgba(0, 0, 0, 0.1)' }}
                                        />
                                        <div style={{ marginTop: '7px' }}>
                                            <p style={{ color: '#6B6B6B' }}>Estimate Price</p>
                                            <p style={{ fontWeight: 'bold' }}>price THB</p>
                                        </div>
                                    </div>
                                    <div style={{ background: "#DCF1FB", flex: 1, marginLeft: '20px', padding: '20px' }}>
                                        <h1>description</h1>
                                    </div>
                                </div>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>


        </>
    );
}