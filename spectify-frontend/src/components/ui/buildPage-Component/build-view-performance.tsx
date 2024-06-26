import React from "react";
import { useState } from "react";
import Image from "next/image";
import { Select, SelectItem } from "@nextui-org/react";
interface Product {
	CPU?: {
		id: string;
		typeProduct: string;
		name: string;
		image: string;
		type: string;
		socket: string;
		core: string;
		thread: string;
		year: string;
		price: string;
		tdp: string;
		clock: string;
		turbo: string;
		description: string;
	};
	GPU?: {
		typeProduct: string;
		name: string;
		image: string;
		type: string;
		performance: string;
		architecture: string;
		year: string;
		series: string;
		vram: string;
		price: string;
		tdp: string;
		motherboardBus: string;
		coreClock: string;
		boostClock: string;
		effectiveClock: string;
		length: string;
		coolingFans: string;
		caseSlots: string;
		frameSync: string;
		description: string;
	};
}

type Tprops = {
	paramCpu?: Product["CPU"];
	paramGpu?: Product["GPU"];
};

export default function Performance({ paramCpu, paramGpu }: Tprops) {
	let product: Product = {};

	if (paramCpu && paramGpu) {
		product = {
			CPU: paramCpu,
			GPU: paramGpu,
		};
	} else if (typeof localStorage !== "undefined") {
		const allProductData = localStorage.getItem("selectedProducts");
		if (allProductData) {
			product = JSON.parse(allProductData);
		}
	}

	// Calculate FPS 1920 x 1080 (FHD (1080p))
	let FPS_Valorant_Low: number | null = null;
	let FPS_Valorant_Medium: number | null = null;
	let FPS_Valorant_High: number | null = null;
	let FPS_Valorant_Ultra: number | null = null;

	let FPS_LeagueOfLegends_Low: number | null = null;
	let FPS_LeagueOfLegends_Medium: number | null = null;
	let FPS_LeagueOfLegends_High: number | null = null;
	let FPS_LeagueOfLegends_Ultra: number | null = null;

	let FPS_Overwatch2_Low: number | null = null;
	let FPS_Overwatch2_Medium: number | null = null;
	let FPS_Overwatch2_High: number | null = null;
	let FPS_Overwatch2_Ultra: number | null = null;

	// Calculate FPS 2560 x 1440 (QHD (1440p))

	let FPS_Valorant_Low_1440: number | null = null;
	let FPS_Valorant_Medium_1440: number | null = null;
	let FPS_Valorant_High_1440: number | null = null;
	let FPS_Valorant_Ultra_1440: number | null = null;

	let FPS_LeagueOfLegends_Low_1440: number | null = null;
	let FPS_LeagueOfLegends_Medium_1440: number | null = null;
	let FPS_LeagueOfLegends_High_1440: number | null = null;
	let FPS_LeagueOfLegends_Ultra_1440: number | null = null;

	let FPS_Overwatch2_Low_1440: number | null = null;
	let FPS_Overwatch2_Medium_1440: number | null = null;
	let FPS_Overwatch2_High_1440: number | null = null;
	let FPS_Overwatch2_Ultra_1440: number | null = null;

	// Calculate FPS 3840 x 2160 (4K UHD)

	let FPS_Valorant_Low_4K: number | null = null;
	let FPS_Valorant_Medium_4K: number | null = null;
	let FPS_Valorant_High_4K: number | null = null;
	let FPS_Valorant_Ultra_4K: number | null = null;

	let FPS_LeagueOfLegends_Low_4K: number | null = null;
	let FPS_LeagueOfLegends_Medium_4K: number | null = null;
	let FPS_LeagueOfLegends_High_4K: number | null = null;
	let FPS_LeagueOfLegends_Ultra_4K: number | null = null;

	let FPS_Overwatch2_Low_4K: number | null = null;
	let FPS_Overwatch2_Medium_4K: number | null = null;
	let FPS_Overwatch2_High_4K: number | null = null;
	let FPS_Overwatch2_Ultra_4K: number | null = null;

	if (product.CPU && product.GPU) {
		const core = product.CPU ? parseFloat(product.CPU.core) : null;
		const thread = product.CPU ? parseFloat(product.CPU.thread) : null;
		const clock = product.CPU ? parseFloat(product.CPU.clock) : null;

		const coreClock = product.GPU ? parseFloat(product.GPU.coreClock) : null;

		let cpuScore: number | null = null;
		let gpuScore: number | null = null;

		if (core !== null && thread !== null && clock !== null && coreClock !== null) {
			cpuScore = core * thread * clock;
			gpuScore = coreClock;

			FPS_Valorant_Low = parseInt(((cpuScore + gpuScore) / 5.5).toString());
			FPS_Valorant_Medium = parseInt(((cpuScore + gpuScore) / 7.01).toString());
			FPS_Valorant_High = parseInt(((cpuScore + gpuScore) / 8.6).toString());
			FPS_Valorant_Ultra = parseInt(((cpuScore + gpuScore) / 13.8).toString());

			FPS_LeagueOfLegends_Low = parseInt(((cpuScore + gpuScore) / 2.62).toString());
			FPS_LeagueOfLegends_Medium = parseInt(((cpuScore + gpuScore) / 3.64).toString());
			FPS_LeagueOfLegends_High = parseInt(((cpuScore + gpuScore) / 4.4).toString());
			FPS_LeagueOfLegends_Ultra = parseInt(((cpuScore + gpuScore) / 7.9).toString());

			FPS_Overwatch2_Low = parseInt(((cpuScore + gpuScore) / 6.91).toString());
			FPS_Overwatch2_Medium = parseInt(((cpuScore + gpuScore) / 8.55).toString());
			FPS_Overwatch2_High = parseInt(((cpuScore + gpuScore) / 10.7).toString());
			FPS_Overwatch2_Ultra = parseInt(((cpuScore + gpuScore) / 18.5).toString());

			// 2560 x 1440 (QHD (1440p))
			FPS_Valorant_Low_1440 = parseInt(((cpuScore + gpuScore) / 6.66).toString());
			FPS_Valorant_Medium_1440 = parseInt(((cpuScore + gpuScore) / 8.3).toString());
			FPS_Valorant_High_1440 = parseInt(((cpuScore + gpuScore) / 10.4).toString());
			FPS_Valorant_Ultra_1440 = parseInt(((cpuScore + gpuScore) / 16.6).toString());

			FPS_LeagueOfLegends_Low_1440 = parseInt(((cpuScore + gpuScore) / 3.409).toString());
			FPS_LeagueOfLegends_Medium_1440 = parseInt(((cpuScore + gpuScore) / 4.84).toString());
			FPS_LeagueOfLegends_High_1440 = parseInt(((cpuScore + gpuScore) / 6.09).toString());
			FPS_LeagueOfLegends_Ultra_1440 = parseInt(((cpuScore + gpuScore) / 10.45).toString());

			FPS_Overwatch2_Low_1440 = parseInt(((cpuScore + gpuScore) / 8.3).toString());
			FPS_Overwatch2_Medium_1440 = parseInt(((cpuScore + gpuScore) / 11.39).toString());
			FPS_Overwatch2_High_1440 = parseInt(((cpuScore + gpuScore) / 13.6).toString());
			FPS_Overwatch2_Ultra_1440 = parseInt(((cpuScore + gpuScore) / 24.5).toString());

			// 3840 x 2160 (4K UHD)
			FPS_Valorant_Low_4K = parseInt(((cpuScore + gpuScore) / 10.5).toString());
			FPS_Valorant_Medium_4K = parseInt(((cpuScore + gpuScore) / 13.9).toString());
			FPS_Valorant_High_4K = parseInt(((cpuScore + gpuScore) / 16.7).toString());
			FPS_Valorant_Ultra_4K = parseInt(((cpuScore + gpuScore) / 30).toString());

			FPS_LeagueOfLegends_Low_4K = parseInt(((cpuScore + gpuScore) / 6.65).toString());
			FPS_LeagueOfLegends_Medium_4K = parseInt(((cpuScore + gpuScore) / 9.3).toString());
			FPS_LeagueOfLegends_High_4K = parseInt(((cpuScore + gpuScore) / 11.18).toString());
			FPS_LeagueOfLegends_Ultra_4K = parseInt(((cpuScore + gpuScore) / 20).toString());

			FPS_Overwatch2_Low_4K = parseInt(((cpuScore + gpuScore) / 15.65).toString());
			FPS_Overwatch2_Medium_4K = parseInt(((cpuScore + gpuScore) / 21.9).toString());
			FPS_Overwatch2_High_4K = parseInt(((cpuScore + gpuScore) / 26.3).toString());
			FPS_Overwatch2_Ultra_4K = parseInt(((cpuScore + gpuScore) / 47).toString());
		}
	}

	const [selectedResolution, setSelectedResolution] = useState("FHD");

	const handleSelectResolution = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedResolution(event.target.value);
		console.log("Selected resolution:", event.target.value);
	};

	const resolutions = [
		{ label: "FHD 1920 x 1080", value: "FHD" },
		{ label: "QHD 2560 x 1440", value: "QHD" },
		{ label: "4K 3840 x 2160", value: "UHD" },
	];

	return (
		<>
			<div className={`${paramCpu && paramGpu ? "" : "mb-5"}`}>
				{product.CPU && product.GPU && (
					<div className={`${paramCpu && paramGpu ? "" : "ml-4 mr-4"}`}>
						<div className="text-l">
							<p>
								FPS count by settings for
							</p>
							<p>
								{product.CPU.name} and
							</p>
							<p>
								{product.GPU.name}
							</p>
						</div>
						<div className="mt-2 mb-2">
							<Select
								label="Select Resolution"
								onChange={(value) => handleSelectResolution(value)}
								placeholder="FHD 1920 x 1080"
								className="max-w-64"
							>
								{resolutions.map((resolution) => (
									<SelectItem key={resolution.value} value={resolution.value}>
										{resolution.label}
									</SelectItem>
								))}
							</Select>
						</div>

						{/* FHD */}
						{selectedResolution === "FHD" && (
							<>
								<div className="flex flex-row gap-4 w-full rounded-lg p-2">
									<Image
										src={`/images/games/valo.webp`}
										alt={`Valorant Game`}
										width="90"
										height="50"
										sizes="100vw"
										priority={true}
										className="shadow-lg rounded-sm mt-1"
									/>
									<div className="flex flex-col gap-4 w-full font-bold">
										<p className="text-xl">Valorant</p>
										<div className="flex flex-col w-full">
											<div className="flex flex-row w-full justify-between align-middle items-center">
												<p className="text-sm">Low Setting is FPS: {FPS_Valorant_Low}</p>
											</div>
											<div className="flex flex-row w-full justify-between align-middle items-center">
												<p className="text-sm">Medium Setting is FPS: {FPS_Valorant_Medium}</p>
											</div>
											<div className="flex flex-row w-full justify-between align-middle items-center">
												<p className="text-sm">High Setting is FPS: {FPS_Valorant_High}</p>
											</div>
											<div className="flex flex-row w-full justify-between align-middle items-center">
												<p className="text-sm">Ultra Setting is FPS: {FPS_Valorant_Ultra}</p>
											</div>
										</div>
									</div>
								</div>
							</>
						)}
						{selectedResolution === "FHD" && (
							<>
								<div className="flex flex-row gap-4 w-full rounded-lg p-2">
									<Image
										src={`/images/games/lol.webp`}
										alt={`League of Legends Game`}
										width="90"
										height="50"
										sizes="100vw"
										priority={true}
										className="shadow-lg rounded-sm mt-1"
									/>
									<div className="flex flex-col gap-4 w-full font-bold">
										<p className="text-xl">League of Legends</p>
										<div className="flex flex-col w-full">
											<div className="flex flex-row w-full justify-between align-middle items-center">
												<p className="text-sm">Low Setting is FPS: {FPS_LeagueOfLegends_Low}</p>
											</div>
											<div className="flex flex-row w-full justify-between align-middle items-center">
												<p className="text-sm">Medium Setting is FPS: {FPS_LeagueOfLegends_Medium}</p>
											</div>
											<div className="flex flex-row w-full justify-between align-middle items-center">
												<p className="text-sm">High Setting is FPS: {FPS_LeagueOfLegends_High}</p>
											</div>
											<div className="flex flex-row w-full justify-between align-middle items-center">
												<p className="text-sm">Ultra Setting is FPS: {FPS_LeagueOfLegends_Ultra}</p>
											</div>
										</div>
									</div>
								</div>
							</>
						)}
						{selectedResolution === "FHD" && (
							<>
								<div className="flex flex-row gap-4 w-full rounded-lg p-2">
									<Image
										src={`/images/games/ow.webp`}
										alt={`Overwatch 2 Game`}
										width="90"
										height="50"
										sizes="100vw"
										priority={true}
										className="shadow-lg rounded-sm mt-1"
									/>
									<div className="flex flex-col gap-4 w-full font-bold">
										<p className="text-xl">Overwatch 2</p>
										<div className="flex flex-col w-full">
											<div className="flex flex-row w-full justify-between align-middle items-center">
												<p className="text-sm">Low Setting is FPS: {FPS_Overwatch2_Low}</p>
											</div>
											<div className="flex flex-row w-full justify-between align-middle items-center">
												<p className="text-sm">Medium Setting is FPS: {FPS_Overwatch2_Medium}</p>
											</div>
											<div className="flex flex-row w-full justify-between align-middle items-center">
												<p className="text-sm">High Setting is FPS: {FPS_Overwatch2_High}</p>
											</div>
											<div className="flex flex-row w-full justify-between align-middle items-center">
												<p className="text-sm">Ultra Setting is FPS: {FPS_Overwatch2_Ultra}</p>
											</div>
										</div>
									</div>
								</div>
							</>
						)}

						{/* QHD */}
						{selectedResolution === "QHD" && (
							<>
								<div className="flex flex-row gap-4 w-full rounded-lg p-2">
									<Image
										src={`/images/games/valo.webp`}
										alt={`Valorant Game`}
										width="90"
										height="50"
										sizes="100vw"
										priority={true}
										className="shadow-lg rounded-sm mt-1"
									/>
									<div className="flex flex-col gap-4 w-full font-bold">
										<p className="text-xl">Valorant</p>
										<div className="flex flex-col w-full">
											<div className="flex flex-row w-full justify-between align-middle items-center">
												<p className="text-sm">Low Setting is FPS: {FPS_Valorant_Low_1440}</p>
											</div>
											<div className="flex flex-row w-full justify-between align-middle items-center">
												<p className="text-sm">Medium Setting is FPS: {FPS_Valorant_Medium_1440}</p>
											</div>
											<div className="flex flex-row w-full justify-between align-middle items-center">
												<p className="text-sm">High Setting is FPS: {FPS_Valorant_High_1440}</p>
											</div>
											<div className="flex flex-row w-full justify-between align-middle items-center">
												<p className="text-sm">Ultra Setting is FPS: {FPS_Valorant_Ultra_1440}</p>
											</div>
										</div>
									</div>
								</div>
							</>
						)}

						{selectedResolution === "QHD" && (
							<>
								<div className="flex flex-row gap-4 w-full rounded-lg p-2">
									<Image
										src={`/images/games/lol.webp`}
										alt={`League of Legends Game`}
										width="90"
										height="50"
										sizes="100vw"
										priority={true}
										className="shadow-lg rounded-sm mt-1"
									/>
									<div className="flex flex-col gap-4 w-full font-bold">
										<p className="text-xl">League of Legends</p>
										<div className="flex flex-col w-full">
											<div className="flex flex-row w-full justify-between align-middle items-center">
												<p className="text-sm">Low Setting is FPS: {FPS_LeagueOfLegends_Low_1440}</p>
											</div>
											<div className="flex flex-row w-full justify-between align-middle items-center">
												<p className="text-sm">Medium Setting is FPS: {FPS_LeagueOfLegends_Medium_1440}</p>
											</div>
											<div className="flex flex-row w-full justify-between align-middle items-center">
												<p className="text-sm">High Setting is FPS: {FPS_LeagueOfLegends_High_1440}</p>
											</div>
											<div className="flex flex-row w-full justify-between align-middle items-center">
												<p className="text-sm">Ultra Setting is FPS: {FPS_LeagueOfLegends_Ultra_1440}</p>
											</div>
										</div>
									</div>
								</div>
							</>
						)}

						{selectedResolution === "QHD" && (
							<>
								<div className="flex flex-row gap-4 w-full rounded-lg p-2">
									<Image
										src={`/images/games/ow.webp`}
										alt={`Overwatch 2 Game`}
										width="90"
										height="50"
										sizes="100vw"
										priority={true}
										className="shadow-lg rounded-sm mt-1"
									/>
									<div className="flex flex-col gap-4 w-full font-bold">
										<p className="text-xl">Overwatch 2</p>
										<div className="flex flex-col w-full">
											<div className="flex flex-row w-full justify-between align-middle items-center">
												<p className="text-sm">Low Setting is FPS: {FPS_Overwatch2_Low_1440}</p>
											</div>
											<div className="flex flex-row w-full justify-between align-middle items-center">
												<p className="text-sm">Medium Setting is FPS: {FPS_Overwatch2_Medium_1440}</p>
											</div>
											<div className="flex flex-row w-full justify-between align-middle items-center">
												<p className="text-sm">High Setting is FPS: {FPS_Overwatch2_High_1440}</p>
											</div>
											<div className="flex flex-row w-full justify-between align-middle items-center">
												<p className="text-sm">Ultra Setting is FPS: {FPS_Overwatch2_Ultra_1440}</p>
											</div>
										</div>
									</div>
								</div>
							</>
						)}

						{/* 4K */}
						{selectedResolution === "UHD" && (
							<>
								<div className="flex flex-row gap-4 w-full rounded-lg p-2">
									<Image
										src={`/images/games/valo.webp`}
										alt={`Valorant Game`}
										width="90"
										height="50"
										sizes="100vw"
										priority={true}
										className="shadow-lg rounded-sm mt-1"
									/>
									<div className="flex flex-col gap-4 w-full font-bold">
										<p className="text-xl">Valorant</p>
										<div className="flex flex-col w-full">
											<div className="flex flex-row w-full justify-between align-middle items-center">
												<p className="text-sm">Low Setting is FPS: {FPS_Valorant_Low_4K}</p>
											</div>
											<div className="flex flex-row w-full justify-between align-middle items-center">
												<p className="text-sm">Medium Setting is FPS: {FPS_Valorant_Medium_4K}</p>
											</div>
											<div className="flex flex-row w-full justify-between align-middle items-center">
												<p className="text-sm">High Setting is FPS: {FPS_Valorant_High_4K}</p>
											</div>
											<div className="flex flex-row w-full justify-between align-middle items-center">
												<p className="text-sm">Ultra Setting is FPS: {FPS_Valorant_Ultra_4K}</p>
											</div>
										</div>
									</div>
								</div>
							</>
						)}

						{selectedResolution === "UHD" && (
							<>
								<div className="flex flex-row gap-4 w-full rounded-lg p-2">
									<Image
										src={`/images/games/lol.webp`}
										alt={`League of Legends Game`}
										width="90"
										height="50"
										sizes="100vw"
										priority={true}
										className="shadow-lg rounded-sm mt-1"
									/>
									<div className="flex flex-col gap-4 w-full font-bold">
										<p className="text-xl">League of Legends</p>
										<div className="flex flex-col w-full">
											<div className="flex flex-row w-full justify-between align-middle items-center">
												<p className="text-sm">Low Setting is FPS: {FPS_LeagueOfLegends_Low_4K}</p>
											</div>
											<div className="flex flex-row w-full justify-between align-middle items-center">
												<p className="text-sm">Medium Setting is FPS: {FPS_LeagueOfLegends_Medium_4K}</p>
											</div>
											<div className="flex flex-row w-full justify-between align-middle items-center">
												<p className="text-sm">High Setting is FPS: {FPS_LeagueOfLegends_High_4K}</p>
											</div>
											<div className="flex flex-row w-full justify-between align-middle items-center">
												<p className="text-sm">Ultra Setting is FPS: {FPS_LeagueOfLegends_Ultra_4K}</p>
											</div>
										</div>
									</div>
								</div>
							</>
						)}

						{selectedResolution === "UHD" && (
							<>
								<div className="flex flex-row gap-4 w-full rounded-lg p-2">
									<Image
										src={`/images/games/ow.webp`}
										alt={`Overwatch 2 Game`}
										width="90"
										height="50"
										sizes="100vw"
										priority={true}
										className="shadow-lg rounded-sm mt-1"
									/>
									<div className="flex flex-col gap-4 w-full font-bold">
										<p className="text-xl">Overwatch 2</p>
										<div className="flex flex-col w-full">
											<div className="flex flex-row w-full justify-between align-middle items-center">
												<p className="text-sm">Low Setting is FPS: {FPS_Overwatch2_Low_4K}</p>
											</div>
											<div className="flex flex-row w-full justify-between align-middle items-center">
												<p className="text-sm">Medium Setting is FPS: {FPS_Overwatch2_Medium_4K}</p>
											</div>
											<div className="flex flex-row w-full justify-between align-middle items-center">
												<p className="text-sm">High Setting is FPS: {FPS_Overwatch2_High_4K}</p>
											</div>
											<div className="flex flex-row w-full justify-between align-middle items-center">
												<p className="text-sm">Ultra Setting is FPS: {FPS_Overwatch2_Ultra_4K}</p>
											</div>
										</div>
									</div>
								</div>
							</>
						)}
					</div>
				)}
			</div>
		</>
	);
}
