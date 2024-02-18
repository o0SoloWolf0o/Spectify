"use server"

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createPsuProduct(
    typeProduct:string,
    name:string,
    image:string,
    wattage:string
) {
    try {
        await prisma.psu.create(
            {
                data:{
                    typeProduct,
                    name,
                    image,
                    wattage
                }
            }
        );
    } catch (err){
        throw new Error(err as string);
    }
}

export async function getPsuProduct() {
    try {
        const psu = await prisma.psu.findMany({take:10})
        return psu
    } catch (err) {
        throw new Error(err as string)
    }
}

export async function updatePsuProduct(id:string,
    typeProduct:string,
    name:string,
    image:string,
    wattage:string
) {
    try {
        const psu = await prisma.psu.update({where:{id},
        data:{
            typeProduct,
            name,
            image,
            wattage
        }})
        return psu;
    } catch (err) {
        throw new Error(err as string)
    }
}

export async function removePsuProductById(id:string) {
    try {
        await prisma.psu.delete({where:{id}})
    } catch (err) {
        throw new Error(err as string)
    }
}