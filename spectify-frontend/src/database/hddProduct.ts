"use server"

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createHddProduct(
    typeProduct: string,
    name: string,
    image: string,
    size: string
) {
    try {


        await prisma.hdd.create(
            {
                data: {
                    typeProduct,
                    name,
                    image,
                    size
                }
            }
        );
    } catch (err) {
        throw new Error(err as string)
    }
}

export async function getHddProduct() {
    try {
        const gpu = await prisma.gpu.findMany({ take: 10 })
        return gpu
    } catch (err) {
        throw new Error(err as string)
    }
}

export async function updateHddProductById(id: string,
    typeProduct: string,
    name: string,
    image: string,
    size: string) {
    try {
        const hdd = await prisma.hdd.update({
            where: { id },
            data: {
                typeProduct,
                name,
                image,
                size
            }
        })
        return hdd
    } catch (err) {
        throw new Error(err as string)
    }
}

export async function removeHddProductById(id:string){
    try {
        await prisma.hdd.delete({where:{id}})
    } catch (err) {
        throw new Error(err as string)
    }
}