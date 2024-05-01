"use client";
import BuildPopupComponent from "./buildPopup";
import { getMostLikedBuilds } from "@/action/like";
import { useState, useEffect } from "react";


export default function BuildReccomendComponent() {
    const [builds, setBuilds] = useState([]);
    const [isFetching, setIsFetching] = useState(true);

    useEffect(() => {
        const fetchBuilds = async () => {
            const builds = await getMostLikedBuilds();
            setBuilds(builds as never[]);
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
                    {(builds as {build_id: string}[]).slice(0, 10).map((build: {build_id: string}) => (
                        <div key={build.build_id} className="flex justify-start">
                            <BuildPopupComponent buildId={build.build_id} />
                        </div>
                    ))}
                </div>
                </div>
            )}
        </>
    );
}