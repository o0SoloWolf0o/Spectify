"use client";
import FollowingComponent from "@/components/following/following";
import { useState } from "react";
import Link from "next/link";
export default function FollowingPage() {
    const [limit] = useState(5);
    return (
       <>
       <div className="">
            <FollowingComponent limit={limit} />
        </div>
       </>  
    );
}