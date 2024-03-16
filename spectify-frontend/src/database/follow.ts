import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const follow = async (followerId: string, followingId: string) => {
    await prisma.follow.create({
        data: {
            followerId,
            followingId,
        },
    });
}

export const unfollow = async (followerId: string, followingId: string) => {
    await prisma.follow.deleteMany({
        where: {
            followerId,
            followingId,
        },
    });
};

export const isFollowing = async (followerId: string, followingId: string) => {
    const following = await prisma.follow.findFirst({
        where: {
            followerId,
            followingId,
        },
    });
    return following !== null;
};

export const getFollowing = async (userId: string) => {
    return await prisma.follow.findMany({
        where: {
            followerId: userId,
        },
    });
};

export const getFollowers = async (userId: string) => {
    return await prisma.follow.findMany({
        where: {
            followingId: userId,
        },
    });
};

export const getFollowingCount = async (userId: string) => {
    return await prisma.follow.count({
        where: {
            followerId: userId,
        },
    });
};

export const getFollowersCount = async (userId: string) => {
    return await prisma.follow.count({
        where: {
            followingId: userId,
        },
    });
};