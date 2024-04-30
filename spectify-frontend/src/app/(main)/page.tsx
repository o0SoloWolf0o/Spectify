import FollowingBuildsComponent from "@/components/main/following/followingBuilds";

export default function HomePage() {
    return (
        <>
            <h1 className="font-bold text-2xl">Trending</h1>
            <h1 className="font-bold text-2xl">Following</h1>
            <FollowingBuildsComponent />
        </>
    );
}
