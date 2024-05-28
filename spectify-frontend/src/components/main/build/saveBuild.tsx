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
import { MdUploadFile } from "react-icons/md";
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
			const allproduct = localStorage.getItem("selectedProducts");
			const selectedProducts = allproduct ? JSON.parse(allproduct) : {};

			const cpuid = selectedProducts.CPU?.id ?? null;
			const mbid = selectedProducts.MB?.id ?? null;
			const ramid = selectedProducts.RAM?.id ?? null;
			const gpuid = selectedProducts.GPU?.id ?? null;
			const ssdid = selectedProducts.SSD?.id ?? null;
			const psuid = selectedProducts.PSU?.id ?? null;
			const caseid = selectedProducts.Case?.id ?? null;
			const coolerid = selectedProducts.Cooler?.id ?? null;

			if (cpuid && mbid && ramid && gpuid && ssdid && psuid && caseid && coolerid) {
				buildForm.setValue("cpu", cpuid);
				buildForm.setValue("mb", mbid);
				buildForm.setValue("ram", ramid);
				buildForm.setValue("gpu", gpuid);
				buildForm.setValue("ssd", ssdid);
				buildForm.setValue("psu", psuid);
				buildForm.setValue("cases", caseid);
				buildForm.setValue("cooler", coolerid);
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
															{!imageBase64 && (
																<label htmlFor="fileInput" className="w-1/2 aspect-square cursor-pointer">
																	<MdUploadFile className="w-full h-full" />
																	<Input
																		id="fileInput"
																		type="file"
																		ref={fileInputRef}
																		onChange={handleImageChange}
																		accept="image/*"
																		className="hidden"
																	/>
																</label>
															)}
															{imageBase64 && (
																<div className="w-1/2 aspect-square">
																	<Image
																		src={imageBase64}
																		onClick={handleImageClick}
																		className="w-full h-full object-cover cursor-pointer shadow rounded-lg bg-white"
																		alt=""
																		width={100}
																		height={100}
																	/>
																</div>
															)}
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
