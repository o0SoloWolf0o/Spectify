"use client";
import { useSession } from "next-auth/react";
import { getManyFollowingById } from "@/action/follow";
import { useEffect, useState } from "react";
import { Avatar, image } from "@nextui-org/react";
import { getUserById } from "@/database/user";
import { getUserImg } from "@/action/updateProfile";
import FollowButton from "@/components/main/profile/followButton";
import Link from "next/link";
import {getBuildsIdbyUserId} from "@/database/build";
import BuildPopupComponent from "@/components/main/build/buildPopup";

export default function FollowingBuildsComponent() {
    const session = useSession();
    const sessionUser = session?.data?.user;
    const [isFetching, setIsFetching] = useState(true);
    const [builds, setBuilds] = useState([]);

    useEffect(() => {
        const fetchFollowingBuilds = async () => {
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
                const followingBuildsMap = new Map();
                await Promise.all(
                    followingWithUserDetails.map(async (follow) => {
                        const builds = await getBuildsIdbyUserId(follow.followingId);
                        if (builds.length > 0) {
                            builds.forEach((build) => {
                                if (!followingBuildsMap.has(build.id)) {
                                    followingBuildsMap.set(build.id, {
                                        followingImg: follow.image,
                                        followingUsername: follow.username,
                                        buildId: build.id,
                                        date: build.date
                                    });
                                }
                            });
                        }
                    })
                );
                
                const followingBuilds = Array.from(followingBuildsMap.values());
                followingBuilds.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
                setBuilds(followingBuilds as never[]);
                setIsFetching(false);
            } catch (error) {
                console.error("Error fetching following:", error);
            }
        };
        if (sessionUser?.id) {
            fetchFollowingBuilds();
        }
    }, [sessionUser?.id]);

    
    if (isFetching) {
        return <div>Loading...</div>;
    }

    return (
        <>
        {(builds as { buildId: string, followingImg: string, followingUsername: string}[]).map((build) => (
            <div key={build.buildId} className="flex justify-center mb-10 space-y-4">
                <div className="flex justify-center flex-col pb-12 border-b border-gray-300">
                    <div className="flex justify-start mb-4">
                        <div><Link href={`/profile/${build.followingUsername}`}><Avatar src={build.followingImg} alt="user img" size="sm" /></Link></div>
                        <div><Link href={`/profile/${build.followingUsername}`}><p className="ml-2">{build.followingUsername}</p></Link></div>
                    </div>
                       <BuildPopupComponent size="large" buildId={build.buildId} />
                    </div>
               </div>
            ))}
        </>
    );
}   
