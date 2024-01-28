"use client";

import Link from "next/link";
import ThemeToggle from "@/components/theme/theme-toggle";
import AuthPopup from "@/components/main/auth/authPopup";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import Image from "next/image";
import React from 'react';
import { useRouter } from 'next/navigation'
import path from "path";

export default function NavComponent() {
	const session = useSession();
	const isSession = session.status === "authenticated";
	const pathname = usePathname();

	console.log(pathname)

	function handleSignOut() {
		if (pathname === "/profile" || pathname === "/following") {
			signOut({ callbackUrl: "/" });
		} else {
			signOut();
		}
	}

	

	return (
		<>
			<div className="h-screen w-60 fixed flex flex-col items-start justify-start shadow">
				<Link href="/">
					<div style={{marginLeft:'40px'}}>
						<Image
						src="/images/Logo.png"
						alt="Logo"
						width={150}
						height={150}
						className="mx-auto"
						></Image>
					</div>
				</Link>

				<aside className="ml-4">

					<Link href="/">
                        <div className="flex items-center" style={{ backgroundColor: '#00A9FF',paddingLeft:'10px', paddingRight: '120px',paddingTop:'5px',paddingBottom:'5px', borderRadius:'5px' }}>
                            <Image
                                src="/images/Home_light.png"
                                alt="Home"
                                width={20}
                                height={20}
                                className="mr-2"
                            />
                            <span className="mt-1" style={{color:'white'}}>Home</span>
                        </div>
                    </Link>
					
					<Link href="/">
						<div className="flex items-center" style={{marginLeft: '10px'}} >
							<Image
								src="/images/Home_black.png"
								alt="Home"
								width={20}
								height={20}
								className="mr-2"
							/>
							<span className="mt-1">Home</span>
						</div>
					</Link>

					<Link href="/search">
						<div className="flex item-center mt-2" style={{marginLeft: '10px'}}>
							<Image
								src="/images/Search_black.png"
								alt="Search"
								width={20}
								height={5}
								className="mr-2"
							/>
							<span className="mt-1">Search User</span>
						</div>
					</Link>
					<div className="flex items-center mt-2" style={{marginLeft: '10px'}}>
						<Image
							src="/images/Following_black.png"
							alt="Following"
							width={20}
							height={10}
							className="mr-2"
						/>
						{isSession ? (
							<Link href="/following">
								<div className="flex items-center mt-2" style={{marginLeft: '10px'}}>
									<span className="mt-1">Following</span>
								</div>
							</Link>
						) : (
							<AuthPopup buttonText="Following" />
						)}
					</div>

					<div className="flex items-center mt-2" style={{marginLeft: '10px'}}>
						<Image
							src="/images/User_black.png"
							alt="User"
							width={20}
							height={10}
							className="mr-2"
						/>
						{isSession ? (
							<Link href="/profile">
								<div className="flex items-center mt-2">
									<span className="mt-1">Profile</span>
								</div>
							</Link>
						) : (
							<AuthPopup buttonText="Profile" />
						)
						}
					</div>
					<br />

					<Link href="/build">
						<div className="flex items-center" style={{marginLeft: '10px'}}>
							<Image
								src="/images/Build_black.png"
								alt="Build"
								width={20}
								height={20}
								className="mr-2"
							/>
							<span className="mt-1">Build</span>
						</div>
					</Link>

					<Link href="/product">
						<div className="flex items-center" style={{marginLeft: '10px'}}>
							<Image
								src="/images/Shop_black.png"
								alt="Product"
								width={20}
								height={20}
								className="mr-2"
							/>
							<span className="mt-1">Product</span>
						</div>
					</Link>

					<Link href="/compare">
						<div className="flex items-center" style={{marginLeft: '10px'}}>
							<Image
								src="/images/Switch_black.png"
								alt="Compare"
								width={20}
								height={20}
								className="mr-2"
							/>
							<span className="mt-1">Compare</span>
						</div>
					</Link>

					<br />
					<br />
					
					<div style={{marginLeft: '10px'}}>
						<ThemeToggle />
					</div>
					<br />

					<div className="flex items-center fixed bottom-5 end" style={{marginLeft:'10px'}}>
						<Image src="/images/Sign_in_black.png" alt="Sign in" width={20} height={20} className="mr-2" />
						{isSession ? (
							<button onClick={handleSignOut}>Sign out</button>
						) : (
							<AuthPopup buttonText="Sign in" />
						)}
					</div>

				</aside>
			</div>
		</>
	);
}
