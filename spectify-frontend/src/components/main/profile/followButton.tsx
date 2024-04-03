"use client";

import { Button } from "@nextui-org/react";
import { followUser, unFollowUser, isFollowingUser} from "@/action/follow";
import { useSession } from "next-auth/react";
import React from "react";
import { useEffect, useState, useTransition } from "react";


export default function FollowButton({ userId, onUpdateFollowCount }: { userId: string, onUpdateFollowCount?: (increment:boolean) => void}) {
    const session = useSession();
    const sessionUser = session?.data?.user;
    const [isFollowing, setIsFollowing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isPending, startTransition] = useTransition();
    const [isFetching, setFetdata] = useState(true);


    useEffect(() => {   
        startTransition(() => {
            if (sessionUser) {
                isFollowingUser({followerId: sessionUser.id, followingId: userId}).then((res) => {
                    setIsFollowing(res);
                    setLoading(false);
                    setFetdata(false);
                });
            }
        });
    }, [sessionUser, userId, startTransition]);

   
    const handleFollow = () => {
        if (!sessionUser) return;
        setLoading(true);
        if (isFollowing) {
            unFollowUser({followerId: sessionUser.id, followingId: userId}).then(() => {
                setIsFollowing(false);
                setLoading(false);
                onUpdateFollowCount && onUpdateFollowCount(false); // Add null check before invoking the function
            });
        } else {
            followUser({followerId: sessionUser.id, followingId: userId}).then(() => {
                setIsFollowing(true);
                setLoading(false);
                onUpdateFollowCount && onUpdateFollowCount(true); // Add null check before invoking the function
            });
        }
    }

    return (
       isFetching ? <Button color="default" 
       className="text-black font-bold py-2 px-4 rounded-full"> Loading </Button> : 
       isFollowing ? (
        <Button color="default" className="bg-[#F26969] hover:bg-[#C13737] text-white font-bold py-2 px-4 rounded-full" onClick={handleFollow} isLoading={loading}> Unfollow </Button>
    ) : (
        <Button color="default" className="bg-[#00A9FF] hover:bg-[#0087CC] text-white font-bold py-2 px-4 rounded-full" onClick={handleFollow} isLoading={loading}> Follow </Button>
    )
);

}
