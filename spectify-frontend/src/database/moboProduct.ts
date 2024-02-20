"use server"

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createMoboProduct(
    typeProduct: string,
    name: string,
    image: string,
    size: string,
    socket: string,
    ramslot: string,
    description: string,
    price: string
) {
    try {
        await prisma.mobo.create(
            {
                data: {
                    typeProduct,
                    name,
                    image,
                    size,
                    socket,
                    ramslot,
                    description,
                    price
                }
            }
        )
    } catch (err) {
        throw new Error(err as string);
    }
}

export async function getMoboProduct() {
    try {
        const mobo = await prisma.mobo.findMany({ take: 10 })
        return mobo;
    } catch (err) {
        throw new Error(err as string)
    }
}

export async function updateMoboProductById(id: string,
    typeProduct: string,
    name: string,
    image: string,
    size: string,
    socket: string,
    ramslot: string,
    description: string,
    price: string
) {
    try {
        const mobo = await prisma.mobo.update({
            where: { id },
            data: {
                typeProduct,
                name,
                image,
                size,
                socket,
                ramslot,
                description,
                price
            }
        })
        return mobo;
    } catch (err) {
        throw new Error(err as string)
    }
}

export async function removeMoboById(id:string) {
    try {
        const mobo = await prisma.mobo.delete({where:{id}})
        return mobo;
    } catch (err) {
        throw new Error(err as string)
    }
}