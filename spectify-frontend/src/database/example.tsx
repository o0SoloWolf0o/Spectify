"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createExample(inputText: string) {
    const example = await prisma.example.create({
        data: {
            text: inputText,
        },
    });
    return example;
}

export async function getExamples() {
    const examples = await prisma.example.findMany();
    return examples;
}
