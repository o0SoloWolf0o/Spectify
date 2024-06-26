"use client";

import Link from "next/link";
import Image from "next/image";
import AuthPopup from "@/components/main/auth/authPopup";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import { LuHome } from "react-icons/lu";
import { GoSearch } from "react-icons/go";
import { PiUsersThreeBold } from "react-icons/pi";
import { FaRegUserCircle } from "react-icons/fa";
import { LuPlusCircle } from "react-icons/lu";
import { BiStore } from "react-icons/bi";
import { GoArrowSwitch } from "react-icons/go";
import { FiMoreHorizontal } from "react-icons/fi";
import { VscSignOut } from "react-icons/vsc";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { CiSquareMore } from "react-icons/ci";
import { CompareCountContext } from "@/app/(main)/layout";

export default function NavComponent() {
	const session = useSession();
	const sessionUser = session?.data?.user;
	const isSession = session.status === "authenticated";
	const pathname = usePathname();
	const [toggleMenu, setToggleMenu] = useState(true);
	const { compareCounts } = useContext(CompareCountContext);

	function handleSignOut() {
		if (pathname === "/profile" || pathname === "/following") {
			signOut({ callbackUrl: "/" });
		} else {
			signOut();
		}
	}

	return (
		<>
			<div
				className="
				pl-2 pr-6 h-1/6 flex flex-row w-screen justify-between items-center shadow
				md:hidden
				"
			>
				<button onClick={() => setToggleMenu(!toggleMenu)}>
					<CiSquareMore className="text-xl font-bold" />
				</button>
				<Link href="/">
					<Image src="/images/Logo.png" alt="Logo" width="150" height="150" priority={true} className="w-16 h-16 mx-auto"></Image>
				</Link>
				<div />
			</div>
			<aside
				className={`
				w-screen flex flex-col shadow py-2
				md:w-64 md:fixed md:justify-between md:h-screen md:flex
				${toggleMenu && "hidden"}
				`}
			>
				<div className="mx-2 my-1">
					<div className="py-3 md:hidden" />

					<Link href="/" className="hidden md:block">
						<Image src="/images/Logo.png" alt="Logo" width="150" height="150" priority={true} className="w-32 h-32 mx-auto"></Image>
					</Link>
					<p className="text-gray-400 text-lg ml-2">Menu</p>
					<Link href="/">
						<Button
							className={`w-full gap-4 text-xl font-bold justify-start bg-white text-black hover:bg-primary1-3 hover:text-white ${
								pathname === "/" ? "bg-primary1-5 text-white" : ""
							}`}
						>
							<LuHome />
							Home
						</Button>
					</Link>
					<div className="mt-2"></div>
					<Link href="/search">
						<Button
							className={`w-full gap-4 text-xl font-bold justify-start bg-white text-black hover:bg-primary1-3 hover:text-white ${
								pathname === "/search" ? "bg-primary1-5 text-white" : ""
							}`}
						>
							<GoSearch />
							Search Users
						</Button>
					</Link>
					<div className="mt-2"></div>

					{isSession ? (
						<Link href="/following">
							<Button
								className={`w-full gap-4 text-xl font-bold justify-start bg-white text-black hover:bg-primary1-3 hover:text-white ${
									pathname === "/following" ? "bg-primary1-5 text-white" : ""
								}`}
							>
								<PiUsersThreeBold />
								Following
							</Button>
						</Link>
					) : (
						<></>
					)}
					<div className="mt-2"></div>

					{isSession ? (
						<Link href={`/profile/${sessionUser?.username}`}>
							<Button
								className={`w-full gap-4 text-xl font-bold justify-start bg-white text-black hover:bg-primary1-3 hover:text-white ${
									pathname === `/profile/${sessionUser?.username}` ? "bg-primary1-5 text-white" : ""
								}`}
							>
								<FaRegUserCircle />
								Profile
							</Button>
						</Link>
					) : (
						<></>
					)}

					<div className="py-6" />
					<p className="text-gray-400 text-lg ml-2">Action</p>

					<Link href="/build">
						<Button
							className={`w-full gap-4 text-xl font-bold justify-start bg-white text-black hover:bg-primary1-3 hover:text-white ${
								pathname === "/build" ? "bg-primary1-5 text-white" : ""
							}`}
						>
							<LuPlusCircle />
							Build
						</Button>
					</Link>

					<div className="mt-2"></div>

					<Link href="/product">
						<Button
							className={`w-full gap-4 text-xl font-bold justify-start bg-white text-black hover:bg-primary1-3 hover:text-white ${
								pathname === "/product" ? "bg-primary1-5 text-white" : ""
							}`}
						>
							<BiStore />
							Product
						</Button>
					</Link>
					<div className="mt-2"></div>

					<Link href="/compare">
						<Button
							className={`w-full gap-4 text-xl font-bold justify-between bg-white text-black hover:bg-primary1-3 hover:text-white ${
								pathname === "/compare" ? "bg-primary1-5 text-white" : ""
							}`}
						>
							<div className="flex flex-row items-center gap-4 ">
								<GoArrowSwitch />
								Compare
							</div>
							{compareCounts > 0 ? (
								<div
									className={`bg-primary1-5 rounded-full h-full aspect-square flex items-center justify-center text-small ${
										pathname === "/compare" ? "outline outline-1" : ""
									}`}
								>
									{compareCounts}
								</div>
							) : (
								<></>
							)}{" "}
						</Button>
					</Link>
				</div>

				<div
					className="
					py-6
					md:hidden
					"
				/>

				<div className="mx-2 my-1">
					{/* <div>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button className="w-full gap-4 text-xl font-bold justify-start bg-white text-black hover:bg-primary1-3 hover:text-white">
									<FiMoreHorizontal />
									More
								</Button>
							</DropdownMenuTrigger>

							<DropdownMenuContent
								className="
								w-screen
								md:w-56
								"
							>
								<DropdownMenuItem>Link1</DropdownMenuItem>
								<DropdownMenuItem>Link2</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div> */}

					{isSession ? (
						<div>
							<Button
								onClick={handleSignOut}
								className="w-full gap-4 text-xl font-bold justify-start bg-white text-black hover:bg-primary1-3 hover:text-white"
							>
								<VscSignOut />
								Sign Out
							</Button>
						</div>
					) : (
						<div>
							<AuthPopup className="w-full gap-4 text-xl font-bold justify-start bg-white text-black hover:bg-primary1-3 hover:text-white">
								<VscSignOut />
								Sign In
							</AuthPopup>
						</div>
					)}
				</div>
			</aside>
		</>
	);
}
