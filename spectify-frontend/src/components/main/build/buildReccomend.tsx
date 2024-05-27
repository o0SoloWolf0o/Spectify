"use client";
import BuildPopupComponent from "./buildPopup";
import { getMostLikedBuilds } from "@/action/like";
import { useState, useEffect } from "react";
import { getUserById } from "@/database/user";
import { getUserImg } from "@/action/updateProfile";
import Link from "next/link";
import { Avatar } from "@nextui-org/react";


export default function BuildReccomendComponent() {
    const [builds, setBuilds] = useState([]);
    const [isFetching, setIsFetching] = useState(true);

    useEffect(() => {
        const fetchBuilds = async () => {
            const builds = await getMostLikedBuilds();
            const buildWithUserImgandUsername = await Promise.all(
                builds.map(async (build) => {
                    if (build.user_id) {
                        const user = await getUserById(build.user_id);
                        const image = await getUserImg(build.user_id);
                        return {
                            ...build,
                            image,
                            username: user?.username
                        };
                    }
                    return build;
                })
            );
            setBuilds(buildWithUserImgandUsername as never);
            setIsFetching(false);
        }
        fetchBuilds();
           
    }, []);

    return (
        <>
            {isFetching ? (
                <div>Loading...</div>
            ) : (

                <div className="flex justify-center">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
                    {(builds as {build_id: string, username: string, image: string}[]).slice(0, 10).map((build) => (
                        <div key={build.build_id} className="flex justify-start">
                                <div className="flex-col" >
                                <div className="flex justify-start mb-4" >
                                <div><Link href={`/profile/${build.username}`}><Avatar src={build.image} alt="user img" size="sm" /></Link></div>
                                <div><Link href={`/profile/${build.username}`}><p className="ml-2">{build.username}</p></Link></div>
                            </div>
                            <BuildPopupComponent buildId={build.build_id} />
                            </div>
                        </div>
                    ))}
                </div>
                </div>
            )}
        </>
    );
}