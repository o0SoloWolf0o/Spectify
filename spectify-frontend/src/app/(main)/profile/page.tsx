// import { userDetail } from "@/hooks/userDetail";
import {Avatar, Tab} from "@nextui-org/react";
import {Image} from "@nextui-org/react";
import Link from "next/link";
import TabComponent from "@/components/main/profile/tab";
import { userDetail } from "@/hooks/userDetail";


export default async function ProfilePage() {
	const user = await userDetail();


	return (
		<>
		<div className="flex justify-center">
			<div className="pb-12 border-b border-gray-300 w-[64rem]">
				<div className="flex justify-between">
				<div className="flex items-start">
					<Avatar src={user?.image} className="w-44 h-44"/>
						<div className="ml-16 mt-6">
						{/* <p>id: {user?.id}</p> */}
						<p className="text-xl">{user?.username}</p>
						<p className="text-base">{user?.bio}</p>
						</div>
						<Link href="/profile/edit" className="ml-16 mt-6"><button className="bg-gray-300 hover:bg-gray-500 text-black font-bold py-2 px-4 rounded-full"> Edit Profile </button></Link>
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
						<p className="mr-12">0 Follower</p>
						<p className="mr-12">0 Following</p>
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