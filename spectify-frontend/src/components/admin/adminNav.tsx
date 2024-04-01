"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CiSquareMore } from "react-icons/ci";
import { RiDashboard2Line } from "react-icons/ri";
import { FiCpu } from "react-icons/fi";

export default function AdminNav() {
	const pathname = usePathname();
	const [toggleMenu, setToggleMenu] = useState(true);

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
				<Link href="/admin">
					<Image src="/images/Logo.png" alt="Logo" width="150" height="150" priority={true} className="w-16 h-16 mx-auto"></Image>
				</Link>
				<div />
			</div>
			<aside
				className={`
				w-screen flex flex-col shadow py-2 bg-white
				md:w-64 md:fixed md:justify-between md:h-screen md:flex
				${toggleMenu && "hidden"}
				`}
			>
				<div className="mx-2 my-1">
					<div className="py-3 md:hidden" />

					<Link href="/" className="hidden md:block">
						<Image src="/images/Logo.png" alt="Logo" width="150" height="150" priority={true} className="w-32 h-32 mx-auto"></Image>
					</Link>

					<Link href="/admin">
						<Button
							className={`w-full gap-4 text-xl font-bold justify-start bg-white text-black hover:bg-primary1-3 hover:text-white ${
								pathname === "/admin" ? "bg-primary1-5 text-white" : ""
							}`}
						>
							<RiDashboard2Line />
							Dashboard
						</Button>
					</Link>

					<div className="py-6" />

					<Link href="/admin/cpu">
						<Button
							className={`w-full gap-4 text-xl font-bold justify-start bg-white text-black hover:bg-primary1-3 hover:text-white ${
								pathname === "/admin/cpu" ? "bg-primary1-5 text-white" : ""
							}`}
						>
							<FiCpu />
							CPU
						</Button>
					</Link>

					<Link href="/admin/mainboard">
						<Button
							className={`w-full gap-4 text-xl font-bold justify-start bg-white text-black hover:bg-primary1-3 hover:text-white ${
								pathname === "/admin/mainboard" ? "bg-primary1-5 text-white" : ""
							}`}
						>
							<FiCpu />
							Mainboard
						</Button>
					</Link>

					<Link href="/admin/ram">
						<Button
							className={`w-full gap-4 text-xl font-bold justify-start bg-white text-black hover:bg-primary1-3 hover:text-white ${
								pathname === "/admin/ram" ? "bg-primary1-5 text-white" : ""
							}`}
						>
							<FiCpu />
							Ram
						</Button>
					</Link>

					<Link href="/admin/gpu">
						<Button
							className={`w-full gap-4 text-xl font-bold justify-start bg-white text-black hover:bg-primary1-3 hover:text-white ${
								pathname === "/admin/gpu" ? "bg-primary1-5 text-white" : ""
							}`}
						>
							<FiCpu />
							GPU
						</Button>
					</Link>

					<Link href="/admin/ssd">
						<Button
							className={`w-full gap-4 text-xl font-bold justify-start bg-white text-black hover:bg-primary1-3 hover:text-white ${
								pathname === "/admin/ssd" ? "bg-primary1-5 text-white" : ""
							}`}
						>
							<FiCpu />
							SSD
						</Button>
					</Link>

					<Link href="/admin/psu">
						<Button
							className={`w-full gap-4 text-xl font-bold justify-start bg-white text-black hover:bg-primary1-3 hover:text-white ${
								pathname === "/admin/psu" ? "bg-primary1-5 text-white" : ""
							}`}
						>
							<FiCpu />
							PSU
						</Button>
					</Link>

					<Link href="/admin/case">
						<Button
							className={`w-full gap-4 text-xl font-bold justify-start bg-white text-black hover:bg-primary1-3 hover:text-white ${
								pathname === "/admin/case" ? "bg-primary1-5 text-white" : ""
							}`}
						>
							<FiCpu />
							Case
						</Button>
					</Link>

					<Link href="/admin/cooler">
						<Button
							className={`w-full gap-4 text-xl font-bold justify-start bg-white text-black hover:bg-primary1-3 hover:text-white ${
								pathname === "/admin/cooler" ? "bg-primary1-5 text-white" : ""
							}`}
						>
							<FiCpu />
							Cooler
						</Button>
					</Link>
				</div>
			</aside>
		</>
	);
}
