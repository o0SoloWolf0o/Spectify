"use client";

import { Modal, ModalContent, ModalBody, useDisclosure } from "@nextui-org/react";
import { Button } from "@/components/ui/button";
import { saveBuild } from "@/action/build";
import { buildSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as zod from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useTransition, useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import AuthPopup from "@/components/main/auth/authPopup";
import AuthErrorComponent from "@/components/main/auth/authError";
import Image from "next/image";
interface IsaveBuildComponent {
	className?: string | "";
}

export default function SaveBuildComponent({ className }: IsaveBuildComponent) {
	const session = useSession();
	const router = useRouter();
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [imageBase64, setImageBase64] = useState("");
	const [componentFill, setComponentFill] = useState(true);
	const [errorMessage, setErrorMessage] = useState("");
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [isPending, startTransition] = useTransition();
	const buildForm = useForm<zod.infer<typeof buildSchema>>({
		resolver: zodResolver(buildSchema),
		defaultValues: {
			image: "",
			buildName: "",
			buildBio: "",
			cpu: "",
			mb: "",
			ram: "",
			gpu: "",
			ssd: "",
			psu: "",
			cases: "",
			cooler: "",
		},
	});

	function onSubmit(build: zod.infer<typeof buildSchema>) {
		setErrorMessage("");
		build.image = imageBase64;
		const validBuild = buildSchema.safeParse(build);
		if (validBuild) {
			startTransition(() => {
				saveBuild(build).then((res) => {
					if (res.success) {
						localStorage.clear();
						router.push("/profile/" + session.data?.user.username);
					} else {
						setErrorMessage(res.message);
					}
				});
			});
		} else {
			setErrorMessage("Build data not valid.");
		}
	}

	function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
		const file = e.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setImageBase64(reader.result as string);
			};
			reader.readAsDataURL(file);
		}
	}

	function handleImageClick() {
		fileInputRef.current?.click();
	}

	useEffect(() => {
		if (isOpen) {
			const cpu = localStorage.getItem("CPU") || "";
			const mb = localStorage.getItem("MB") || "";
			const ram = localStorage.getItem("RAM") || "";
			const gpu = localStorage.getItem("GPU") || "";
			const ssd = localStorage.getItem("SSD") || "";
			const psu = localStorage.getItem("PSU") || "";
			const cases = localStorage.getItem("Case") || "";
			const cooler = localStorage.getItem("Cooler") || "";

			if (cpu && mb && ram && gpu && ssd && psu && cases && cooler) {
				buildForm.setValue("cpu", cpu);
				buildForm.setValue("mb", mb);
				buildForm.setValue("ram", ram);
				buildForm.setValue("gpu", gpu);
				buildForm.setValue("ssd", ssd);
				buildForm.setValue("psu", psu);
				buildForm.setValue("cases", cases);
				buildForm.setValue("cooler", cooler);
			} else {
				setComponentFill(false);
			}
		}
	}, [buildForm, isOpen]);

	return (
		<>
			{session.data ? (
				<>
					<Button onClick={onOpen} className={className}>
						Save
					</Button>
					{componentFill ? (
						<>
							<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
								<ModalContent>
									{(onClose) => (
										<>
											<ModalBody>
												<Form {...buildForm}>
													<form onSubmit={buildForm.handleSubmit(onSubmit)} className="flex flex-col space-y-8">
														<FormField
															control={buildForm.control}
															name="buildName"
															render={({ field }) => (
																<FormItem>
																	<FormLabel>Build name</FormLabel>
																	<FormControl>
																		<Input placeholder="Name your build" {...field} />
																	</FormControl>
																	<FormMessage />
																</FormItem>
															)}
														/>
														<div className="flex flex-row justify-between gap-4">
															<div className="w-1/2 aspect-square ">
																<Image
																	src={imageBase64}
																	onClick={handleImageClick}
																	className="w-full h-full object-cover cursor-pointer shadow rounded-lg bg-white"
																	alt=""
																	width={100}
																	height={100}
																/>

																<Input
																	type="file"
																	ref={fileInputRef}
																	onChange={handleImageChange}
																	accept="image/*"
																	className="hidden"
																/>
															</div>
															<FormField
																control={buildForm.control}
																name="buildBio"
																render={({ field }) => (
																	<FormItem className="w-1/2 aspect-square">
																		<FormControl>
																			<Textarea
																				placeholder="Description"
																				{...field}
																				className="h-full w-full resize-none"
																			/>
																		</FormControl>
																		<FormMessage />
																	</FormItem>
																)}
															/>
														</div>
														<Button type="submit" disabled={isPending} className="bg-primary1-5 hover:bg-primary1-3">
															Save
														</Button>
														<AuthErrorComponent message={errorMessage} />
													</form>
												</Form>
											</ModalBody>
										</>
									)}
								</ModalContent>
							</Modal>
						</>
					) : (
						<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
							<ModalContent>
								{(onClose) => (
									<>
										<ModalBody>
											<div>You must fill all your component first.</div>
										</ModalBody>
									</>
								)}
							</ModalContent>
						</Modal>
					)}
				</>
			) : (
				<AuthPopup className={className}>Save</AuthPopup>
			)}
		</>
	);
}
