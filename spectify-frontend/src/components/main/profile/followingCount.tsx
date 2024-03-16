"use client";
import { getFollowingCountById } from "@/action/follow";
import { useEffect, useState } from "react";

export default function FollowingCount({ userId }: { userId: string }) {
    const [followingCount, setFollowingCount] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            getFollowingCountById(userId).then((res) => {
                setFollowingCount(res);
            });
        }
        , 1000);
        return () => clearInterval(interval);
        }
        , [userId]);
    return (
        <>
            <span>{followingCount} Follwing</span>
        </>
    );
}
