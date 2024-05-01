"use client";
import { useSession } from 'next-auth/react';
import BuildReccomendComponent from "@/components/main/build/buildReccomend";
import FollowingBuildsComponent from "@/components/main/following/followingBuilds";
import ImageSlideComponent from "@/components/main/imageSlide";

export default function HomePage() {
     const session = useSession();
     const isSession = session.status === "authenticated";

    return (
        <> 
        <ImageSlideComponent />
        <div className='mt-6'>
            <h1 className="font-bold text-2xl">Trending</h1>
                <div className='mt-6'>
                <BuildReccomendComponent />
                </div>
            </div>
            <div className='mt-6'>
                {isSession ? (
                    <>
                    <h1 className="font-bold text-2xl mb-6">Following</h1>
                            <FollowingBuildsComponent />
                    </>
                ) : (
                    <></>
                )}
            </div>
        </>
    );
}
