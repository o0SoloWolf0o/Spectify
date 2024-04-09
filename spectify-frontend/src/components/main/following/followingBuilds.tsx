"use client";
import { getBuildByUserId } from "@/database/build";
import BuildPopupComponent from "../build/buildPopup";
import { useEffect, useState } from "react";
import { Avatar } from "@nextui-org/react";

export default function FollowingBuilds({followingId, followingImg, followingUsername}: {followingId: string, followingImg: string, followingUsername: string}) {
      const [builds, setBuilds] = useState([]);

      useEffect(() => {
      const fetchBuilds = async () => {
        const builds = await getBuildByUserId(followingId);
        setBuilds(builds as never[]);
      }
      fetchBuilds();
    }
    , [followingId]);

  return (
    <>
      {(builds as {id: string}[]).map((build) => (
        <div key={build.id} className="flex justify-center mb-10 space-y-4">
            <div className="flex justify-center flex-col pb-12 border-b border-gray-300">
                <div className="flex justify-start mb-4">
                <Avatar src={followingImg} alt="user img" size="sm" />
                <p className="ml-2">{followingUsername}</p>
                </div>
                <BuildPopupComponent size="large" buildId={build.id} />
                </div>
        </div>
      ))}
    </>
  )
}
