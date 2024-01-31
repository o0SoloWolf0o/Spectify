import { userDetail } from "@/hooks/userDetail";
import {Avatar} from "@nextui-org/react";
import {Image} from "@nextui-org/react";
import Link from "next/link";
import {Input} from "@nextui-org/react";
import {Textarea} from "@nextui-org/react";
import TestComponent from "@/components/test";
import UpdateprofileComponent from "@/components/main/profile/updateprofile";



export default async function editProfilePage() {
    const user = await userDetail();

    return (
        <>
            <p className="text-xl text-center">Edit Profile</p>
            <div className="flex justify-center">
                <div className="flex justify-between">
                    <div className="flex items-start">
                        <Avatar src={user?.image} className="w-44 h-44" />
                        <div className="w-96">
                            <UpdateprofileComponent />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}