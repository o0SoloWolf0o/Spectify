"use client";
import { useSession } from "next-auth/react";
import { getManyFollowingById } from "@/action/follow";
import { useEffect, useState } from "react";
import { Avatar } from "@nextui-org/react";
import { getUserById } from "@/database/user";
import { getUserImg } from "@/action/updateProfile";
import FollowButton from "@/components/main/profile/followButton";
import Link from "next/link";

export default function FollowingPage() {
    const session = useSession();
    const sessionUser = session?.data?.user;
    const [following, setFollowing] = useState([]);
    const [isFetching, setIsFetching] = useState(true);

    useEffect(() => {
        const fetchFollowing = async () => {
            try {
                const sessionUserId = [sessionUser?.id ?? ""];
                const followingData = await getManyFollowingById(sessionUserId);
                const followingWithUserDetails = await Promise.all(
                    followingData.map(async (follow) => {
                        const user = await getUserById(follow.followingId);
                        const image = await getUserImg(follow.followingId);
                        return {
                            ...user,
                            image,
                            followingId: follow.followingId
                        };
                    })
                );
                setFollowing(followingWithUserDetails as never[]);
                setIsFetching(false);
            } catch (error) {
                console.error("Error fetching following:", error);
            }
        };
        if (sessionUser?.id) {
            fetchFollowing();
        }
    }, [sessionUser?.id]);

    
    if (isFetching) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <h1>Following</h1>
            <div className="flex justify-start mt-6">
                {(following as { followingId: string, image: string, username: string }[]).map((user) => (
                    <div key={user.followingId} className="ml-6">
                        <Link href={`/profile/${user?.username}`}><Avatar src={user.image} alt="user img" className="w-44 h-44" /></Link>
                        <p className="flex justify-center">{user.username}</p>
                        <div className="flex justify-center">
                        <FollowButton userId={user.followingId} />
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
