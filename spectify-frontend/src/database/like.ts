import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const like = async (user_id: string, build_id: string) => {
    await prisma.like.create({
        data: {
            user_id,
            build_id,
            date: new Date(),
        },
    });
}

export const unlike = async (user_id: string, build_id: string) => {
    await prisma.like.deleteMany({
        where: {
            user_id,
            build_id,
        },
    });
};

export const isLiked = async (user_id: string, build_id: string) => {
    const like = await prisma.like.findFirst({
        where: {
            user_id,
            build_id,
        },
    });
    return like !== null;
};

export const getLikes = async (user_id: string) => {
    return await prisma.like.findMany({
        where: {
            user_id,
        },
    });
};

export const getLikesCount = async (build_id: string) => {
    return await prisma.like.count({
        where: {
            build_id,
        },
    });
};

export const getMostLiked = async () => {
    const mostLikedBuilds = await prisma.like.groupBy({
        by: ["build_id"],
        _count: {
            build_id: true,
        },
        orderBy: {
            _count: {
                build_id: "desc",
            },
        },
    });

    const buildsWithUser = await Promise.all(mostLikedBuilds.map(async (build) => {
        const buildDetails = await prisma.build.findUnique({
            where: { id: build.build_id },
            select: { user_id: true }
        });
        return {
            build_id: build.build_id,
            user_id: buildDetails?.user_id,
            like_count: build._count.build_id,
        };
    }));

    return buildsWithUser;
};



