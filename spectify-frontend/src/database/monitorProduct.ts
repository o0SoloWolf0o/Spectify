"use server"

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createMonitorProduct(
    typeProduct:string,
    name:string,
    image:string,
    panelType:string,
    resolution:string,
    refreshRate:string,
    size:string,
    freesync:string,
    gsync:string,
    price:string,
    description: string
) {
    try{
        await prisma.monitor.create(
            {
                data:{
                    typeProduct,
                    name,
                    image,
                    panelType,
                    resolution,
                    refreshRate,
                    size,
                    freesync,
                    gsync,
                    price,
                    description
                }
            }
        );
    } catch (err) {
        throw new Error(err as string);
    }
}

export async function getMonitorProduct() {
    try {
        const monitor = await prisma.monitor.findMany({take:10})
        return monitor
    } catch (err) {
        throw new Error(err as string)
    }
}

export async function updateMonitorProductById(id: string,
    typeProduct:string,
    name:string,
    image:string,
    panelType:string,
    resolution:string,
    refreshRate:string,
    size:string,
    freesync:string,
    gsync:string,
    price:string,
    description:string) {
    try {
        const monitor = await prisma.monitor.update({where:{id},
        data:{
            typeProduct,
            name,
            image,
            panelType,
            resolution,
            refreshRate,
            size,
            freesync,
            gsync,
            price,
            description
        }})
        return monitor
    } catch (err) {
        throw new Error(err as string)
    }
}

export async function removeMonitorProductById(id: string) {
    try {
        await prisma.monitor.delete({where:{id}})
    } catch (err) {
        throw new Error(err as string)
    }
}