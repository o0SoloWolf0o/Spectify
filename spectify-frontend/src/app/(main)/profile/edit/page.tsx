import { userDetail } from "@/hooks/userDetail";
import {Avatar} from "@nextui-org/react";
import {Image} from "@nextui-org/react";
import Link from "next/link";
import {Input} from "@nextui-org/react";
import {Textarea} from "@nextui-org/react";


export default async function editProfilePage() {
    const user = await userDetail();

    return (
        <>
            <h1>Edit Profile</h1>
            <div className="flex justify-center">
                <div className="flex justify-between">
                    <div className="flex items-start">
                        <Avatar src={user?.image} className="w-44 h-44" />
                        <div className="w-96">
                            <div className="ml-16 mt-6">
                            <Input
                                isReadOnly
                                type="email"
                                label="Email"
                                defaultValue= {user?.email}
                                />
                                <br />
                                <Input 
                                type="username" 
                                label="username" 
                                defaultValue= {user?.username}
                                />
                                <br />
                            <Textarea
                                label="Bio"
                                defaultValue= {user?.bio}
                                />
                            </div>
                            <div className="flex justify-end">
                                <Link href="/profile"><button className="bg-gray-300 hover:bg-gray-500 text-black font-bold py-2 px-4 rounded-full ml-12 mt-6"> Save </button></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}