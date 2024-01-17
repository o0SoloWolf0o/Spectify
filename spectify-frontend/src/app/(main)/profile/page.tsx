import { userDetail } from "@/hooks/userDetail";

export default async function ProfilePage() {
	const user = await userDetail();

	return (
		<>
			<h1>Profile</h1>
			<p>id: {user?.id}</p>
			<p>username: {user?.username}</p>
			<p>bio: {user?.bio}</p>
		</>
	);
}
