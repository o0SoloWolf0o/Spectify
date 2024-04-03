"use client";
import { useSession } from "next-auth/react";
import { getManyFollowingById } from "@/action/follow";
import { useEffect, useState } from "react";
import { Avatar } from "@nextui-org/react";
import { getUserById } from "@/database/user";
import { getUserImg } from "@/action/updateProfile";
import FollowButton from "@/components/main/profile/followButton";
import Link from "next/link";
import FollowingBuilds from "@/components/following/followingBuilds";

export default function FollowingComponent({limit}: {limit: number}) {
    const session = useSession();
    const sessionUser = session?.data?.user;
    const [following, setFollowing] = useState([]);
    const [isFetching, setIsFetching] = useState(true);
    const [isLimit, setIsLimit] = useState(limit);

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
            <h1 className="font-bold text-2xl">Following</h1>
            <div className="grid justify-start mt-6 grid-cols-3 md:grid-cols-6 gap-4">
                {(following as { followingId: string, image: string, username: string }[]).slice(0, limit).map((user) => (
                    <div key={user.followingId}>
                        <div className="flex justify-center">
                        <Link href={`/profile/${user?.username}`}><Avatar src={user.image} alt="user img" className="w-44 h-44" /></Link>
                        </div>
                        <p className="flex justify-center">{user.username}</p>
                        <div className="flex justify-center">
                        <FollowButton userId={user.followingId} />
                        </div>
                    </div>
                ))}
                 <div className="flex self-center ml-6">
                    {isLimit === Infinity || following.length <= limit ? null :<Link href={"/following/more"}> <button onClick={() => setIsLimit((limit))} className="font-bold text-xl">More</button></Link>}
                </div>
            </div>
            {isLimit === Infinity ? null : (
            <div className="mt-10 pt-12 border-t border-gray-300">
                {(following as { followingId: string, image: string, username: string }[]).map((user) => (
                    <div key={user.followingId}>
                        <FollowingBuilds followingId={user.followingId} followingImg={user.image} followingUsername={user.username} />
                    </div>
                ))}
                </div>
            )}
        </>
    );
}   
