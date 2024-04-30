"use server";
import { like, unlike, isLiked, getLikes, getLikesCount, getMostLiked} from "@/database/like";

export async function likeBuild({ userId, buildId }: { userId: string, buildId: string }) {
    return await like(userId, buildId);
}

export async function unlikeBuild({ userId, buildId }: { userId: string, buildId: string }) {
    return await unlike(userId, buildId);
}

export async function isLikedBuild({ userId, buildId }: { userId: string, buildId: string }) {
    return await isLiked(userId, buildId);
}

export async function getLikesBuild(user_id: string) {
    return await getLikes(user_id);
}

export async function getLikesCountBuild(buildId: string) {
    return await getLikesCount(buildId);
}

export async function getMostLikedBuilds() {
    return await getMostLiked();
}