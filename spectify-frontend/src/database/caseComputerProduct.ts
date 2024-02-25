"use server"

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export async function createCaseComputer(
    typeProduct: string,
    name: string,
    image: string,
    size: string,
    isolation: string,
    description: string,
    price: string
) {
    try {
        await prisma.caseComputer.create(
            {
                data: {
                    typeProduct,
                    name,
                    image,
                    size,
                    isolation,
                    description,
                    price
                }
            }
        );
    } catch (err) {
        throw new Error(err as string);
    }
}

export async function getCaseComputer() {
    try {
        const caseComputer = await prisma.caseComputer.findMany({take:10})
        return caseComputer
    } catch (err) {
        throw new Error(err as string)
    }
}

export async function updateCaseComputerById(id:string,
    typeProduct: string,
    name: string,
    image: string,
    size: string,
    isolation: string,
    description: string,
    price: string
){
    try {
        const caseComputer = await prisma.caseComputer.update({where:{id},
        data:{
            typeProduct,
            name,
            image,
            size,
            isolation,
            description,
            price
        }})
        return caseComputer;
    } catch (err){
        throw new Error(err as string)
    }
}

export async function removeCaseComputerById(id: string) {
    try {
        await prisma.caseComputer.delete({where:{id}})
    } catch (err) {
        throw new Error(err as string)
    }
}