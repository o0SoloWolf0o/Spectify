"use server"

import { getCpuProduct } from "@/database/cpuProduct";
import { getCaseComputer } from "@/database/caseComputerProduct";
import { getCpuCooler } from "@/database/cpuCoolerProduct";
import { getGpuProduct } from "@/database/gpuProduct";
import { getHddProduct } from "@/database/hddProduct";
import { getSsdProduct } from "@/database/ssdProduct";
import { getMoboProduct } from "@/database/moboProduct";
import { getMonitorProduct } from "@/database/monitorProduct";
import { getPsuProduct } from "@/database/psuProduct";
import { getRamProduct } from "@/database/ramProduct";

export async function getCpuProducts() {
    return await getCpuProduct();
}

export async function getCaseComputersProducts() {
    return await getCaseComputer();
}

export async function getCpuCoolerProducts() {
    return await getCpuCooler();
}

export async function getGpuProducts() {
    return await getGpuProduct();
}

export async function getHddProducts() {
    return await getHddProduct();
}

export async function getSsdProducts() {
    return await getSsdProduct();
}

export async function getMoboProducts() {
    return await getMoboProduct();
}

export async function getMonitorProducts() {
    return await getMonitorProduct();
}

export async function getPsuProducts(){
    return await getPsuProduct();
}

export async function getRamProducts(){
    return await getRamProduct();
}