/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { getUserByUsername } from "@/database/user";
import {Avatar, Button} from "@nextui-org/react";
import Link from "next/link";
import TabComponent from "@/components/main/profile/tab";
import { getUserImg } from "@/action/updateProfile";
import FollowButton from "@/components/main/profile/followButton";
import { getFollowersCountById, getFollowingCountById } from "@/action/follow";
import { useState, useEffect} from "react";
import { useSession } from "next-auth/react";
import { getBuildsCountByUserId } from "@/database/build";



export default function userProfilePage({
    params, 
}:{
    params: {
        username: string;
    };
}) {

    const session = useSession();
    const sessionUser = session?.data?.user;
    const [user, setUser] = useState<any>();
    const isOwner = user?.id === sessionUser?.id;
    const [userImg, setUserImg] = useState<string>();
    const [followersCount, setFollowersCount] = useState(0);
    const [followingCount, setFollowingCount] = useState(0);
    const [isFetching, setFetdata] = useState(true);
    const [build, setBuild] = useState(0);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = await getUserByUsername(params.username);
                setUser(user);
                if (user) {
                    const img = await getUserImg(user.id);
                    setUserImg(img ?? "");
                    const followersCount = await getFollowersCountById(user.id);
                    setFollowersCount(followersCount);
                    const followingCount = await getFollowingCountById(user.id);
                    setFollowingCount(followingCount);
                    const buildCount = await getBuildsCountByUserId(user.id);
                    setBuild(buildCount);
                    setFetdata(false);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchUser();
    }
    , [params.username]);


    if (isFetching) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <div>User not found</div>;
    }

   
  return (
    <>
    <div className="flex justify-center">
        <div className="pb-12 border-b border-gray-300 w-[64rem]">
            <div className="flex justify-between">
            <div className="flex items-start">
                <Avatar src={userImg ?? ""} className="w-44 h-44"/>
                <div className="ml-16 mt-6">
                    <p className="text-xl">{user?.username}</p>
                    <textarea readOnly rows={5} className="text-base overflow-hidden resize-none w-64 focus:outline-none">{user?.bio}</textarea>
                </div>
                {isOwner && (
                    <Link href="/profile/edit" className="ml-16 mt-6">
                        <Button color="default" className="text-black font-bold py-2 px-4 rounded-full"> Edit Profile </Button>
                    </Link>
                )}
                {!isOwner && (
                    <div className="ml-16 mt-6">
                        <FollowButton userId={user.id} onUpdateFollowCount={(increment)=>
                            increment ? setFollowersCount(followersCount + 1) : setFollowersCount(followersCount - 1)
                        }  />
                    </div>
                )}
            </div>
                {/* <div className="ml-16">
                        <Image
                        className="w-44 h-44"
                        isZoomed
                        src="https://media.cnn.com/api/v1/images/stellar/prod/210104111236-beginner-gaming-pc.jpg?q=w_2065,h_1162,x_0,y_0,c_fill"
                        alt="Computer set"
                        width="200" height="200"
                        />
                    </div> */}
            </div>
            <div className="flex justify-between mt-10 text-lg font-bold">
                <div className="flex items-start">
                    <p className="mr-12">{build} Build</p>
                    <p className="mr-12">{followersCount} Followers</p>                
                    <p className="mr-12">{followingCount} Following</p>
                </div>
                {/* <div className="flex items-end">
                    <p className="mr-12">Current spec</p>
                </div> */}
        
            </div>
        </div>
    </div>
    <div className="flex justify-center mt-6">
    <TabComponent userId={user.id} />
    </div>
    </>
    
  );
}