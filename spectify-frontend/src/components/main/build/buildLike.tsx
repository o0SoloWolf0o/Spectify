import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { likeBuild, unlikeBuild, isLikedBuild } from "@/action/like";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useTransition } from "react";

export default function BuildLikeComponent({ build_id, onUpdateLikeCount}: { build_id: string, onUpdateLikeCount?: (increment:boolean) => void}) {
	const session = useSession();
	const sessionUser = session?.data?.user;
	const [liked, setLiked] = useState(false);
	const [loading, setLoading] = useState(false);
	const [isPending, startTransition] = useTransition();
	const [isFetching, setFetdata] = useState(true);

	useEffect(() => {
		if (sessionUser) {
			isLikedBuild({ userId: sessionUser.id, buildId: build_id }).then((res) => {
				setLiked(res);
				setFetdata(false);
			});
		}
	}, [sessionUser, build_id]);

	const handleLike = () => {
		if (sessionUser) {
			setLoading(true);
			startTransition(() => {
				if (liked) {
					unlikeBuild({ userId: sessionUser.id, buildId: build_id }).then(() => {
						onUpdateLikeCount && onUpdateLikeCount(false); // Add null check before invoking the function
						setLiked(false);
						setLoading(false);
					});
				} else {
					likeBuild({ userId: sessionUser.id, buildId: build_id }).then(() => {
						onUpdateLikeCount && onUpdateLikeCount(true); // Add null check before invoking the function
						setLiked(true);
						setLoading(false);
					});
				}
			});
		}
	};
	
	return (
		<>
				<div className="cursor-pointer" onClick={handleLike}>
					{liked ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
				</div>
		</>
	);
}
