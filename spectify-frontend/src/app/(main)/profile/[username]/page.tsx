import { getUserByUsername } from "@/database/user";
import {Avatar, Button} from "@nextui-org/react";
import Link from "next/link";
import TabComponent from "@/components/main/profile/tab";
import { userDetail } from "@/hooks/userDetail";
import { getUserImgById} from "@/database/userDetail";
import FollowButton from "@/components/main/profile/followButton";
import FollowersCount from "@/components/main/profile/followerCount";
import FollowingCount from "@/components/main/profile/followingCount";


export default async function userProfilePage({
    params, 
}:{
    params: {
        username: string;
    };
}) {
    const user = await getUserByUsername(params.username);
    const userImg = await getUserImgById(user?.id ?? "");
    const sessionUser = await userDetail();
    const isOwner = user?.id === sessionUser?.id;

    if (!user) {
        return <p>User not found.</p>;
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
                        <FollowButton userId={user.id} />
                    </div>
                )}
            </div>
                {/* <div className="ml-16">
                        <Image
                        className="w-44 h-44"
                        isZoomed
                        src="https://media.cnn.com/api/v1/images/stellar/prod/210104111236-beginner-gaming-pc.jpg?q=w_2065,h_1162,x_0,y_0,c_fill"
                        alt="Computer set"
                        />
                    </div> */}
            </div>
            <div className="flex justify-between mt-10 text-lg font-bold">
                <div className="flex items-start">
                    <p className="mr-12">0 Build</p>
                    <p className="mr-12"> <FollowersCount userId={user.id} /></p>                
                    <p className="mr-12"> <FollowingCount userId={user.id}/></p>
                </div>
                {/* <div className="flex items-end">
                    <p className="mr-12">Current spec</p>
                </div> */}
        
            </div>
        </div>
    </div>
    <div className="flex justify-center mt-6">
    <TabComponent />
    </div>
    </>
    
  );
}