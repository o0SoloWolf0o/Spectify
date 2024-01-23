import { userDetail } from "@/hooks/userDetail";
import {Avatar} from "@nextui-org/react";
import {Image} from "@nextui-org/react";


export default async function ProfilePage() {
	const user = await userDetail();

	return (
		<>
			<div className="ml-52 mr-52 pb-12 border-b border-gray-300">
				<div className="flex justify-between">
				<div className="flex items-start">
					<Avatar src={user?.image} className="w-44 h-44" />
						<div className="ml-16 mt-6">
						<p>id: {user?.id}</p>
						<p>username: {user?.username}</p>
						<p>bio: {user?.bio}</p>
						</div>
						<button className="bg-gray-300 hover:bg-gray-500 text-black font-bold py-2 px-4 rounded-full ml-12 mt-6"> Edit Profile </button>
				</div>
					<div className="flex items-end">
							<Image
							className="w-44 h-44"
							isZoomed
							src="https://media.cnn.com/api/v1/images/stellar/prod/210104111236-beginner-gaming-pc.jpg?q=w_2065,h_1162,x_0,y_0,c_fill"
							alt="Computer set"
							/>
						</div>
				</div>
				<div className="flex justify-between mt-10">
					<div className="flex items-start">
						<p className="mr-12">Build </p>
						<p className="mr-12">Follower </p>
						<p className="mr-12">Following </p>
					</div>
					<div className="flex items-end">
						<p className="mr-12">Current spec</p>
					</div>
				</div>
			</div>

		</>
	);
}