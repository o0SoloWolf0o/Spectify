"use client";

import SearchBarComponent from "@/components/main/searchBar";
import { useState, useEffect } from "react";
import { getUserImg } from "@/action/updateProfile";
import { searchUser} from "@/action/searchUser";
import { Avatar } from "@nextui-org/react";
import Link from "next/link";
import FollowButton from "@/components/main/profile/followButton";
import { useSession } from "next-auth/react";


export default function SearchUserPage() {

	const session = useSession();
	const sessionUser = session?.data?.user;
	const [user, setUser] = useState<any[]>();
	const [searchValue, setSearchValue] = useState("");


	useEffect(() => {
		try {
			if (searchValue) {
			searchUser(searchValue).then((res) => {
				if (res) {
					const userImg = res.map((user) => {
						return getUserImg(user.id);
					});
					Promise.all(userImg).then((img) => {
						const userWithImg = res.map((user, index) => {
							return { ...user, image: img[index] };
						});
						setUser(userWithImg);	
					});
				}
			});
		}
	} catch (err) {
		console.error(err);
	}
	}
	, [searchValue])



	function handleSearch(value: string) {
		setSearchValue(value);
		
	}

	return (
		<>
			<SearchBarComponent onSearch={handleSearch} placeholder={"Username"} />
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-4 justify-start mt-6">
					{user?.map((user) => (
						<div key={user.id}>
							<div className="flex justify-center">
							<Link href={`/profile/${user?.username}`}><Avatar src={user.image} alt="user img" className="w-44 h-44"/></Link>
							</div>
							<p className="flex justify-center">{user.username}</p>
							<div className="flex justify-center">
							{sessionUser && sessionUser.id !== user.id && (
								<FollowButton userId={user.id} />
							)}
							</div>
						</div>
					))}
			</div>

		</>
	);
}
