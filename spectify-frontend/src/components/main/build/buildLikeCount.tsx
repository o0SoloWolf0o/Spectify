import { getLikesCountBuild } from "@/action/like";
import { useState, useEffect } from "react";

export default function BuildLikeCountComponent({ build_id }: { build_id: string}) {
	const [likeCount, setLikeCount] = useState(0);

	useEffect(() => {
		const fetchLikeCount = async () => {
			const count = await getLikesCountBuild(build_id);
			setLikeCount(count);
		}
		fetchLikeCount();
	},
	[build_id]);

	return <>{likeCount} Likes</>;
}
