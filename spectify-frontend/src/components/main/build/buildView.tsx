"use client";

import { useSession } from "next-auth/react";
import { Textarea } from "@/components/ui/textarea";
import { getBuildById } from "@/database/build";
import { getCaseComputerById } from "@/database/caseComputerProduct";
import { getCpuCoolerById } from "@/database/cpuCoolerProduct";
import { getCpuProductById } from "@/database/cpuProduct";
import { getGpuProductById } from "@/database/gpuProduct";
import { getMoboProductById } from "@/database/moboProduct";
import { getPsuProductById } from "@/database/psuProduct";
import { getRamProductById } from "@/database/ramProduct";
import { getSsdProductById } from "@/database/ssdProduct";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, Skeleton, ModalHeader } from "@nextui-org/react";
import { useEffect, useState, useRef, useTransition } from "react";
import { FiMoreHorizontal } from "react-icons/fi";
import Image from "next/image";
import { Modal, ModalContent, ModalBody, useDisclosure } from "@nextui-org/react";
import { MdDeleteForever } from "react-icons/md";
import { MdEditSquare } from "react-icons/md";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as zod from "zod";
import { buildBioSchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import AuthErrorComponent from "@/components/main/auth/authError";
import { deleteBuild, updateBuild } from "@/action/build";
import Performance from "@/components/ui/buildPage-Component/build-performance";
import { CupSoda } from "lucide-react";

type TProps = {
	buildInfo?: any;
	buildId?: string;
};

export default function BuildViewComponent({ buildInfo, buildId }: TProps) {
	const session = useSession();
	const userId = session.data?.user.id;
	const [buildUserId, setBuildUserId] = useState<string>();
	const [buildName, setBuildName] = useState<string>();
	const [buildImage, setBuildImage] = useState<string>();
	const [buildBio, setBuildBio] = useState<string>();
	const [cpu, setCpu] = useState<any>();
	const [mobo, setMobo] = useState<any>();
	const [ram, setRam] = useState<any>();
	const [gpu, setGpu] = useState<any>();
	const [ssd, setSsd] = useState<any>();
	const [psu, setPsu] = useState<any>();
	const [caseComputer, setCaseComputer] = useState<any>();
	const [cooler, setCooler] = useState<any>();
	const [totalPrice, setTotalPrice] = useState(0);
	const [dataIsLoaded, setDataIsLoaded] = useState(false);
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [modalPanel, setModalPanel] = useState<"edit" | "delete">();
	const [imageBase64, setImageBase64] = useState("");
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [isPending, startTransition] = useTransition();
	const [errorMessage, setErrorMessage] = useState("");
	const buildForm = useForm<zod.infer<typeof buildBioSchema>>({
		resolver: zodResolver(buildBioSchema),
		defaultValues: {
			buildId: "",
			image: "",
			buildName: "",
			buildBio: "",
		},
	});

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

	function submitBioUpdate(build: zod.infer<typeof buildBioSchema>) {
		setErrorMessage("");
		build.image = imageBase64;
		const validBuild = buildBioSchema.safeParse(build);
		if (validBuild) {
			startTransition(() => {
				updateBuild(build).then((res) => {
					if (res.success) {
						location.reload();
					} else {
						setErrorMessage(res.message);
					}
				});
			});
		} else {
			setErrorMessage("Build data not valid.");
		}
	}

	function submitDelete() {
		startTransition(() => {
			deleteBuild(buildForm.getValues("buildId")).then((res) => {
				if (res.success) {
					location.reload();
				} else {
					setErrorMessage(res.message);
				}
			});
		});
	}

	useEffect(() => {
		const fetchData = async () => {
			try {
				let build: any;

				if (buildId) {
					build = await getBuildById(buildId);
				} else {
					build = buildInfo;
				}

				const [cpuData, moboData, ramData, gpuData, ssdData, psuData, caseData, coolerData] = await Promise.all([
					getCpuProductById(build.cpu_id),
					getMoboProductById(build.mobo_id),
					getRamProductById(build.ram_id),
					getGpuProductById(build.gpu_id),
					getSsdProductById(build.ssd_id),
					getPsuProductById(build.psu_id),
					getCaseComputerById(build.case_id),
					getCpuCoolerById(build.cpuCooler_id),
				]);

				const cpuPrice = parseFloat(cpuData?.price ?? "0");
				const moboPrice = parseFloat(moboData?.price ?? "0");
				const ramPrice = parseFloat(ramData?.price ?? "0");
				const gpuPrice = parseFloat(gpuData?.price ?? "0");
				const ssdPrice = parseFloat(ssdData?.price ?? "0");
				const psuPrice = parseFloat(psuData?.price ?? "0");
				const casePrice = parseFloat(caseData?.price ?? "0");
				const coolerPrice = parseFloat(coolerData?.price ?? "0");
				setTotalPrice(cpuPrice + moboPrice + ramPrice + gpuPrice + ssdPrice + psuPrice + casePrice + coolerPrice);

				setBuildUserId(build.user_id);
				setBuildName(build.buildName);
				setBuildImage(build.image);
				setBuildBio(build.buildBio);
				setCpu(cpuData);
				setMobo(moboData);
				setRam(ramData);
				setGpu(gpuData);
				setSsd(ssdData);
				setPsu(psuData);
				setCaseComputer(caseData);
				setCooler(coolerData);

				buildForm.setValue("buildId", build.id);
				setImageBase64(build.image);
				buildForm.setValue("buildName", build.buildName);
				buildForm.setValue("buildBio", build.buildBio);

				setDataIsLoaded(true);
			} catch (error) {
				console.log(error);
			}
		};
		fetchData();
	}, [buildId, buildInfo]);

	return (
		<>
			<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
				<ModalContent>
					{(onClose) => (
						<>
							{modalPanel == "edit" && (
								<>
									<ModalHeader>Edit bio</ModalHeader>
									<ModalBody className="p-12">
										<Form {...buildForm}>
											<form onSubmit={buildForm.handleSubmit(submitBioUpdate)} className="flex flex-col space-y-8">
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
							{modalPanel == "delete" && (
								<>
									<ModalHeader>Are you sure?</ModalHeader>
									<ModalBody className="p-12">
										<div className="flex flex-col gap-8 justify-center w-full">
											<Button className="bg-red-300 text-red-500 w-auto" onClick={submitDelete}>
												Delete this build.
											</Button>
											<Button className="bg-green-300 text-green-500 w-auto" onClick={onClose}>
												No, I've change my mind.
											</Button>
										</div>
									</ModalBody>
								</>
							)}
						</>
					)}
				</ModalContent>
			</Modal>

			<div className="flex flex-row gap-4">
				<div className="flex flex-col p-4 gap-4 shadow-md rounded-lg w-1/3">
					{dataIsLoaded ? (
						<>
							<div className="w-full flex flex-row justify-between items-center align-middle">
								<p className="text-lg">{buildName}</p>
								{buildUserId == userId ? (
									<Dropdown>
										<DropdownTrigger>
											<Button variant="light" className="aspect-square text-lg font-bold">
												<FiMoreHorizontal />
											</Button>
										</DropdownTrigger>
										<DropdownMenu aria-label="Static Actions">
											<DropdownItem
												onClick={() => {
													onOpen();
													setModalPanel("edit");
												}}
												startContent={<MdEditSquare />}
											>
												Edit build
											</DropdownItem>
											<DropdownItem
												onClick={() => {
													onOpen();
													setModalPanel("delete");
												}}
												startContent={<MdDeleteForever />}
												className="text-red-500"
											>
												Delete build
											</DropdownItem>
										</DropdownMenu>
									</Dropdown>
								) : (
									<></>
								)}
							</div>
							<Image
								src={buildImage || ""}
								alt="Build Image"
								className="h-auto w-auto aspect-square object-cover shadow rounded-lg bg-white"
								width="220"
								height="220"
							/>
							<Textarea
								value={buildBio}
								className="aspect-square rounded-lg resize-none text-base outline outline-2 disabled:cursor-default caret-transparent"
							/>
						</>
					) : (
						<>
							<Button disabled className="bg-white shadow-lg p-0">
								<Skeleton isLoaded={dataIsLoaded} disableAnimation className="h-full w-full rounded-lg" />
							</Button>
							<Skeleton isLoaded={dataIsLoaded} disableAnimation className="aspect-square rounded-lg" />
							<Skeleton isLoaded={dataIsLoaded} disableAnimation className="aspect-square rounded-lg" />
						</>
					)}
				</div>
				<div className="flex flex-col p-4 gap-4 shadow-md rounded-lg w-1/3 justify-between">
					{dataIsLoaded ? (
						<>
							<div className="flex flex-col w-full gap-4">
								<p className="text-xl font-bold">Components</p>
								<Button disabled className="bg-white shadow-lg p-1 justify-start">
									<Image src={cpu?.image || ""} alt="CPU Image" className="h-full w-auto aspect-square" width="40" height="40" />
									<p>{cpu?.name}</p>
								</Button>
								<Button disabled className="bg-white shadow-lg p-1 justify-start">
									<Image
										src={mobo?.image || ""}
										alt="Motherboard Image"
										className="h-full w-auto aspect-square"
										width="40"
										height="40"
									/>
									<p>{mobo?.name}</p>
								</Button>
								<Button disabled className="bg-white shadow-lg p-1 justify-start">
									<Image src={ram?.image || ""} alt="RAM Image" className="h-full w-auto aspect-square" width="40" height="40" />
									<p>{ram?.name}</p>
								</Button>
								<Button disabled className="bg-white shadow-lg p-1 justify-start">
									<Image src={gpu?.image || ""} alt="GPU Image" className="h-full w-auto aspect-square" width="40" height="40" />
									<p>{gpu?.name}</p>
								</Button>
								<Button disabled className="bg-white shadow-lg p-1 justify-start">
									<Image src={ssd?.image || ""} alt="SSD Image" className="h-full w-auto aspect-square" width="40" height="40" />
									<p>{ssd?.name}</p>
								</Button>
								<Button disabled className="bg-white shadow-lg p-1 justify-start">
									<Image src={psu?.image || ""} alt="PSU Image" className="h-full w-auto aspect-square" width="40" height="40" />
									<p>{psu?.name}</p>
								</Button>
								<Button disabled className="bg-white shadow-lg p-1 justify-start">
									<Image
										src={caseComputer?.image || ""}
										alt="Computer Case Image"
										className="h-full aspect-square"
										width="40"
										height="40"
									/>
									<p>{caseComputer?.name}</p>
								</Button>
								<Button disabled className="bg-white shadow-lg p-1 justify-start">
									<Image src={cooler?.image || ""} alt="Cooler Image" className="h-full aspect-square" width="40" height="40" />
									<p>{cooler?.name}</p>
								</Button>
							</div>

							<div className="flex flex-col w-full">
								<Button disabled className="bg-gray-300 shadow-lg p-1">
									<p>Total price: {totalPrice.toLocaleString()} Baht</p>
								</Button>
							</div>
						</>
					) : (
						<>
							<div className="flex flex-col w-full gap-4">
								<p className="text-xl font-bold">Components</p>
								<Button disabled className="bg-white shadow-lg p-0">
									<Skeleton isLoaded={dataIsLoaded} disableAnimation className="h-full w-full rounded-lg" />
								</Button>
								<Button disabled className="bg-white shadow-lg p-0">
									<Skeleton isLoaded={dataIsLoaded} disableAnimation className="h-full w-full rounded-lg" />
								</Button>
								<Button disabled className="bg-white shadow-lg p-0">
									<Skeleton isLoaded={dataIsLoaded} disableAnimation className="h-full w-full rounded-lg" />
								</Button>
								<Button disabled className="bg-white shadow-lg p-0">
									<Skeleton isLoaded={dataIsLoaded} disableAnimation className="h-full w-full rounded-lg" />
								</Button>
								<Button disabled className="bg-white shadow-lg p-0">
									<Skeleton isLoaded={dataIsLoaded} disableAnimation className="h-full w-full rounded-lg" />
								</Button>
								<Button disabled className="bg-white shadow-lg p-0">
									<Skeleton isLoaded={dataIsLoaded} disableAnimation className="h-full w-full rounded-lg" />
								</Button>
								<Button disabled className="bg-white shadow-lg p-0">
									<Skeleton isLoaded={dataIsLoaded} disableAnimation className="h-full w-full rounded-lg" />
								</Button>
								<Button disabled className="bg-white shadow-lg p-0">
									<Skeleton isLoaded={dataIsLoaded} disableAnimation className="h-full w-full rounded-lg" />
								</Button>
							</div>

							<div className="flex flex-col w-full gap-4">
								<Button disabled className="bg-white shadow-lg p-0">
									<Skeleton isLoaded={dataIsLoaded} disableAnimation className="h-full w-full rounded-lg" />
								</Button>
							</div>
						</>
					)}
				</div>
				<div className="flex flex-col p-4 gap-4 shadow-md rounded-lg w-1/3">
					<p className="text-xl font-bold">Performance</p>
					{dataIsLoaded ? (
						<>
							<Performance paramCpu={cpu} paramGpu={gpu} />
						</>
					) : (
						<>
							<Skeleton isLoaded={dataIsLoaded} disableAnimation className="w-full h-full rounded-lg" />
						</>
					)}
				</div>
			</div>
		</>
	);
}
