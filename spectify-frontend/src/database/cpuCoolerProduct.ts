"use server"

import { PrismaClient } from "@prisma/client";
import { string } from "zod";

const prisma = new PrismaClient();


export async function createCpuCooler (
    typeProduct: string,
    name: string,
    image: string,
    socket: string
) {
    try {
        await prisma.cpuCooler.create({
            data: {
                typeProduct,
                name,
                image,
                socket
            }
        }
        );
    } catch (err) {
        throw new Error(err as string);
    }
}

export async function getCpuCooler(){
    try {
        const cpuCooler = await prisma.cpuCooler.findMany({take:10})
        return cpuCooler
    } catch (err) {
        throw new Error(err as string)
    }
}

export async function updateCpuCooler(id:string,
    typeProduct:string,
    name:string,
    image:string,
    socket:string
    ) {
        try {
            const cpuCooler = await prisma.cpuCooler.update({where:{id},
            data:{
                typeProduct,
                name,
                image,
                socket

            }})
            return cpuCooler
        } catch (err) {
            throw new Error(err as string)
        }
    }

export async function removeCpuCoolerById(id:string){
    try {
        await prisma.cpuCooler.delete({where:{id}})
    } catch (err) {
        throw new Error(err as string)
    }
}