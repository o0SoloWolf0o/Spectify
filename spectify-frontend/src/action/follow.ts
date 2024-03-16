"use server";
import {follow, unfollow, isFollowing, getFollowersCount, getFollowingCount} from "@/database/follow";

export async function followUser({followerId, followingId}: {followerId: string, followingId: string}) {
    return await follow(followerId, followingId);
}

export async function unFollowUser({followerId, followingId}: {followerId: string, followingId: string}) {
    return await unfollow(followerId, followingId);
}

export async function isFollowingUser({followerId, followingId}: {followerId: string, followingId: string}) {
    return await isFollowing(followerId, followingId);
}

export async function getFollowersCountById(userId: string) {
    return await getFollowersCount(userId);
}

export async function getFollowingCountById(userId: string) {
    return await getFollowingCount(userId);
}
