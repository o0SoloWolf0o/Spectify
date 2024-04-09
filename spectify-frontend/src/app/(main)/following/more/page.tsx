"use client";
import React from 'react'
import { useState } from 'react';
import FollowingComponent from "@/components/main/following/following";

export default function MorePage() {
    const [limit] = useState(Infinity);
  return (
    <>
    <FollowingComponent limit={limit} />
    </>
  )
}
