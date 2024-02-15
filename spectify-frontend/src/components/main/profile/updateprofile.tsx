"use client";

import { updateProfile } from "@/action/updateProfile";
import { useForm } from "react-hook-form";
import * as zod from "zod";
import { updateProfileSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useTransition } from "react";
import Link from "next/link";
import {Input} from "@nextui-org/react";
import {Textarea} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useState } from "react";


export default function UpdateprofileComponent() {
	const session = useSession();
	const sessionUser = session?.data?.user;
	const [error, setError] = useState("");
    const [isPending, startTransition] = useTransition();
	const [imageBase64, setImageBase64] = useState("");
	const {
		handleSubmit,
		register,
		setValue,
		formState: { errors },
	} = useForm<zod.infer<typeof updateProfileSchema>>({
		resolver: zodResolver(updateProfileSchema),
		defaultValues: {
			username: sessionUser?.username,
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
		<div className="ml-16 mt-6">
                <input type="file" onChange={handleImageChange} />
            </div>
            <div className="ml-16 mt-6">
                {imageBase64 && (
                    <>	
                        <img src={imageBase64} alt="Selected" style={{ maxWidth: "80%" }} />
                        <br />
                        <div className="mt-2">Base64 Text:</div>
                        <textarea rows={4} value={imageBase64} readOnly />
                    </>
                )}
            </div>
		
		<div className="ml-16 mt-6">
			<Input isDisabled type="email" label="Email" defaultValue= {sessionUser?.email}/>
		</div>
		<div className="ml-16 mt-6">
			<Input {...register("username")} type="text" label="Username" defaultValue={sessionUser?.username} />
			{errors.username && <p className="text-red-500">{errors.username.message}</p>}
			{error &&<p className="text-red-500">{error}</p>}
		</div>

		<div className="ml-16 mt-6">
			<Textarea {...register("bio")} type="text" label="Bio" defaultValue={sessionUser?.bio}/>
			{errors.bio && <p className="text-red-500">{errors.bio.message}</p>}
		</div>

		<div className="flex justify-end mt-6">
			<Link href="/profile" className="ml-16 mt-6"><button className="bg-gray-300 hover:bg-gray-500 text-black font-bold py-2 px-4 rounded-full w-[5rem]"> Cancel </button></Link>
			<div className="ml-3 mt-6"><button type="submit" className="bg-[#00A9FF] hover:bg-[#0087CC] text-white font-bold py-2 px-4 rounded-full w-[5rem]">Save</button></div>
		</div>
	</form>
	
  )
}
