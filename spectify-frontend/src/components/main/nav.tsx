"use client";

import Link from "next/link";
import Image from "next/image";
import AuthPopup from "@/components/main/auth/authPopup";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { useState } from "react";
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

export default function NavComponent() {
	const session = useSession();
	const isSession = session.status === "authenticated";
	const pathname = usePathname();
	const [toggleMenu, setToggleMenu] = useState(true);

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

					<Link href="/search">
						<Button
							className={`w-full gap-4 text-xl font-bold justify-start bg-white text-black hover:bg-primary1-3 hover:text-white ${
								pathname === "/search" ? "bg-primary1-5 text-white" : ""
							}`}
						>
							<GoSearch />
							Search
						</Button>
					</Link>

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

					{isSession ? (
						<Link href="/profile">
							<Button
								className={`w-full gap-4 text-xl font-bold justify-start bg-white text-black hover:bg-primary1-3 hover:text-white ${
									pathname === "/profile" ? "bg-primary1-5 text-white" : ""
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

					<Link href="/compare">
						<Button
							className={`w-full gap-4 text-xl font-bold justify-start bg-white text-black hover:bg-primary1-3 hover:text-white ${
								pathname === "/compare" ? "bg-primary1-5 text-white" : ""
							}`}
						>
							<GoArrowSwitch />
							Compare
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
					<div>
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
					</div>

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