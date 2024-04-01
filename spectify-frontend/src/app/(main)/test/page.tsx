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


    return (
        <>


        </>
    );
}