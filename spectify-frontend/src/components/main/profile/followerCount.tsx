"use client";
import { getFollowersCountById } from "@/action/follow";
import { useEffect, useState } from "react";

export default function FollowersCount({ userId }: { userId: string }) {
    const [followersCount, setFollowerCount] = useState(0);

    useEffect(() => {
    const interval = setInterval(() => {
        getFollowersCountById(userId).then((res) => {
            setFollowerCount(res);
        });
    }
    , 1000);
    return () => clearInterval(interval);
    }
    , [userId]);

    return (
        <>
            <span>{followersCount} Followers</span>
        </>
    );
}
