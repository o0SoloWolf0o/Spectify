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

export default function NavComponent() {
	const session = useSession();
	const isSession = session.status === "authenticated";
	const pathname = usePathname();

	const router = useRouter()

	// console.log(pathname)

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
					<div style={{ marginLeft: '40px' }}>
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
						<div className={pathname === '/' ? 'active flex items-center ' : 'flex items-center'} style={pathname === '/' ? { backgroundColor: '#00A9FF', paddingLeft: '10px', paddingRight: '128px', paddingTop: '5px', paddingBottom: '5px', borderRadius: '5px', color: 'white' } : { marginLeft: '10px' }} >
							<Image
								src={pathname === '/' ? '/images/Home_light.png' : '/images/Home_black.png'}
								alt="Home"
								width={20}
								height={20}
								className="mr-2"
							/>
							<span className="mt-1">Home</span>
						</div>
					</Link>
				</aside>

				<aside className="ml-4">

					<Link href="/search">
						<div className={pathname === '/search' ? 'active flex items-center ' : 'flex items-center'} style={pathname === '/search' ? { backgroundColor: '#00A9FF', paddingLeft: '10px', paddingRight: '86px', paddingTop: '5px', paddingBottom: '5px', borderRadius: '5px', color: 'white' } : { marginLeft: '10px' }} >
							<Image
								src={pathname === '/search' ? '/images/Search_light.png' : '/images/Search_black.png'}
								alt="Search"
								width={20}
								height={5}
								className="mr-2"
							/>
							<span className="mt-1">Search User</span>
						</div>
					</Link>
				
					<div className={pathname === '/following' ? 'active flex items-center' : 'flex items-center'} style={pathname === '/following' ? { backgroundColor: '#00A9FF', paddingLeft: '10px', paddingRight: '103px', paddingTop: '5px', paddingBottom: '5px', borderRadius: '5px', color: 'white' } : { marginLeft: '10px' }} >
						<Image
							src={pathname === '/following' ? '/images/Following_light.png' : '/images/Following_black.png'}
							alt="Following"
							width={20}
							height={10}
							className="mr-2"
						/>
						{isSession ? (
							<Link href="/following">
								<div className="flex items-center">
									<span className="mt-1">Following</span>
								</div>
							</Link>
						) : (
							<AuthPopup buttonText="Following" />
						)}
					</div>
					
					<div className={pathname === '/profile' ? 'active flex items-center' : 'flex items-center'} style={pathname === '/profile' ? { backgroundColor: '#00A9FF', paddingLeft: '10px', paddingRight: '123px', paddingTop: '5px', paddingBottom: '5px', borderRadius: '5px', color: 'white' } : { marginLeft: '10px' }} >
						<Image
							src={pathname === '/profile' ? '/images/User_light.png' : '/images/User_black.png'}
							alt="User"
							width={20}
							height={10}
							className="mr-2"
						/>
						{isSession ? (
							<Link href="/profile">
								<div className="flex items-center">
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
						<div className={pathname === '/build' ? 'active flex items-center' : 'flex items-center'} style={pathname === '/build' ? { backgroundColor: '#00A9FF', paddingLeft: '10px', paddingRight: '134px', paddingTop: '5px', paddingBottom: '5px', borderRadius: '5px', color: 'white' } : { marginLeft: '10px' }}>
							<Image
								src={pathname === '/build' ? '/images/Build_light.png' : '/images/Build_black.png'}
								alt="Build"
								width={20}
								height={20}
								className="mr-2"
							/>
							<span className="mt-1">Build</span>
						</div>
					</Link>

					<Link href="/product">
						<div className={pathname === '/product' ? 'active flex items-center' : 'flex item-center'} style={pathname === '/product' ? { backgroundColor: '#00A9FF', paddingLeft: '10px', paddingRight: '114px', paddingTop: '5px', paddingBottom: '5px', borderRadius: '5px', color: 'white' } : { marginLeft: '10px' }}>
							<Image
								src={pathname === '/product' ? '/images/Shop_light.png' : '/images/Shop_black.png'}
								alt="Product"
								width={20}
								height={15}
								className="mr-2"
							/>
							<span className="mt-1">Product</span>
						</div>
					</Link>

					<Link href="/compare">
						<div className={pathname === 'compare' ? 'active flex items-center' : 'flex item-center'} style={pathname === '/compare' ? { backgroundColor: '#00A9FF', paddingLeft: '10px', paddingRight: '107px', paddingTop: '5px', paddingBottom: '5px', borderRadius: '5px', color: 'white' } : { marginLeft: '10px' }}>
							<Image
								src={pathname === '/compare' ? '/images/Switch_light.png' : '/images/Switch_black.png'}
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

					<div style={{ marginLeft: '10px' }}>
						<ThemeToggle />
					</div>
					<br />

					<div className="flex items-center fixed bottom-5 end" style={{ marginLeft: '10px' }}>
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
