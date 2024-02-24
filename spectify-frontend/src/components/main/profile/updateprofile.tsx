"use client";

import { updateProfile } from "@/action/updateProfile";
import { useForm } from "react-hook-form";
import * as zod from "zod";
import { updateProfileSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { use, useEffect, useTransition } from "react";
import Link from "next/link";
import {Avatar, Input} from "@nextui-org/react";
import {Textarea} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { getUserImg } from "@/action/updateProfile";
import { Input as Inputs } from "@/components/ui/input"


export default function UpdateprofileComponent() {
	const session = useSession();
	const sessionUser = session?.data?.user;
	const [error, setError] = useState("");
    const [isPending, startTransition] = useTransition();
	const [imageBase64, setImageBase64] = useState("");
	const [sessionUserImg, setSessionUserImg] = useState("");
	const [count, setCount] = useState(0);

	const defaultCount = sessionUser?.bio?.length ?? 0;
	
	useEffect(() => {
		if (sessionUser) {
			getUserImg(sessionUser.id).then((res) => {
				if (res) {
					setSessionUserImg(res);
				}
			});
		}
	}, [sessionUser]);

	const {
		handleSubmit,
		register,
		setValue,
		formState: { errors },
	} = useForm<zod.infer<typeof updateProfileSchema>>({
		resolver: zodResolver(updateProfileSchema),
		defaultValues: {
			username: sessionUser?.username ?? "",
			bio: sessionUser?.bio,
		},
	});

	useEffect(() => {
		setValue("image", imageBase64);
	}, [imageBase64, setValue]);
  	

	function updateProfileSubmit(values: zod.infer<typeof updateProfileSchema>) {
		setError("");
		startTransition(() => {
			updateProfile(values).then((res) => {
				if (res.success) {
					window.location.reload();
				} else {
					setError(res.message);
				}
			});
		});
	}

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];

		if (file) {
			const reader = new FileReader();

			reader.onloadend = () => {
				setImageBase64(reader.result as string);
			};
			reader.readAsDataURL(file);
		}
	};


  return (
    
	<form onSubmit={handleSubmit(updateProfileSubmit)} className="flex flex-col">
            <div className="mt-6 flex justify-center">
				<Avatar src={imageBase64 ? imageBase64 : sessionUserImg} className="w-44 h-44"/>
            </div>

			<div className="mt-6 flex justify-center">
					<Inputs type="file" onChange={handleImageChange} />
            </div>
		
		<div className="mt-6 flex justify-center">
			<Input isDisabled type="email" label="Email" defaultValue={sessionUser?.email ?? ""} />
		</div>
		<div className="mt-6 flex justify-center">
			<Input {...register("username")} type="text" label="Username" defaultValue={sessionUser?.username ?? ""} />
		</div>
		<div className="flex justify-end">
			{errors.username && <p className="text-red-500">{errors.username.message}</p>}
			{error &&<p className="text-red-500">{error}</p>}
		</div>

		<div className="mt-6 flex justify-center">
			<Textarea {...register("bio")} type="text" label="Bio" defaultValue={sessionUser?.bio} onChange={e => setCount(e.target.value.length)}/>
		</div>
		<div className="flex justify-end">
			{errors.bio && <p className="text-red-500">{errors.bio.message}</p>}
			<p className="text-gray-500">{count ? count : defaultCount}/100</p>
		</div>


		<div className="flex justify-end mt-6">
			<Link href={`/profile/${sessionUser?.username}`} className="ml-16 mt-6"><button className="bg-gray-300 hover:bg-gray-500 text-black font-bold py-2 px-4 rounded-full w-[5rem]"> Cancel </button></Link>
			<div className="ml-3 mt-6"><button type="submit" className="bg-[#00A9FF] hover:bg-[#0087CC] text-white font-bold py-2 px-4 rounded-full w-[5rem]">Save</button></div>
		</div>
	</form>
	
  )
}
