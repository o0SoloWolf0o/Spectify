"use client";

import { Textarea } from "@/components/ui/textarea";
import { getCaseComputerById } from "@/database/caseComputerProduct";
import { getCpuCoolerById } from "@/database/cpuCoolerProduct";
import { getCpuProductById } from "@/database/cpuProduct";
import { getGpuProductById } from "@/database/gpuProduct";
import { getMoboProductById } from "@/database/moboProduct";
import { getPsuProductById } from "@/database/psuProduct";
import { getRamProductById } from "@/database/ramProduct";
import { getSsdProductById } from "@/database/ssdProduct";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, Skeleton } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { FiMoreHorizontal } from "react-icons/fi";

type TProps = {
	buildInfo?: any;
	buildId?: string;
};

export default function BuildViewComponent({ buildInfo, buildId }: TProps) {
	const build = buildInfo;
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

	useEffect(() => {
		const fetchData = async () => {
			try {
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

				setCpu(cpuData);
				setMobo(moboData);
				setRam(ramData);
				setGpu(gpuData);
				setSsd(ssdData);
				setPsu(psuData);
				setCaseComputer(caseData);
				setCooler(coolerData);

				setDataIsLoaded(true);
			} catch (error) {
				console.log(error);
			}
		};
		fetchData();
	}, []);

	return (
		<>
			<div className="flex flex-row gap-4">
				<div className="flex flex-col p-4 gap-4 shadow-md rounded-lg w-1/3">
					<div className="flex flex-row justify-between items-center align-middle">
						<p className="text-xl font-bold">{build?.buildName}</p>
						<Dropdown>
							<DropdownTrigger>
								<Button variant="light" className="aspect-square text-2xl font-bold">
									<FiMoreHorizontal />
								</Button>
							</DropdownTrigger>
							<DropdownMenu aria-label="Static Actions">
								<DropdownItem>Edit info</DropdownItem>
								<DropdownItem>Edit build</DropdownItem>
							</DropdownMenu>
						</Dropdown>
					</div>
					<img src={build.image || ""} className="aspect-square object-cover shadow rounded-lg bg-white" />
					<Textarea
						value={build.buildBio}
						className="aspect-square rounded-lg resize-none text-lg outline outline-2 disabled:cursor-default caret-transparent"
					/>
				</div>
				{dataIsLoaded ? (
					<>
						<div className="flex flex-col p-4 gap-4 shadow-md rounded-lg w-1/3 justify-between">
							<div className="flex flex-col w-full gap-4">
								<Button disabled className="bg-white shadow-lg p-1 justify-start">
									<img src={cpu?.image || ""} className="h-full aspect-square" />
									<p>{cpu?.name}</p>
								</Button>
								<Button disabled className="bg-white shadow-lg p-1 justify-start">
									<img src={mobo?.image || ""} className="h-full aspect-square" />
									<p>{mobo?.name}</p>
								</Button>
								<Button disabled className="bg-white shadow-lg p-1 justify-start">
									<img src={ram?.image || ""} className="h-full aspect-square" />
									<p>{ram?.name}</p>
								</Button>
								<Button disabled className="bg-white shadow-lg p-1 justify-start">
									<img src={gpu?.image || ""} className="h-full aspect-square" />
									<p>{gpu?.name}</p>
								</Button>
								<Button disabled className="bg-white shadow-lg p-1 justify-start">
									<img src={ssd?.image || ""} className="h-full aspect-square" />
									<p>{ssd?.name}</p>
								</Button>
								<Button disabled className="bg-white shadow-lg p-1 justify-start">
									<img src={psu?.image || ""} className="h-full aspect-square" />
									<p>{psu?.name}</p>
								</Button>
								<Button disabled className="bg-white shadow-lg p-1 justify-start">
									<img src={caseComputer?.image || ""} className="h-full aspect-square" />
									<p>{caseComputer?.name}</p>
								</Button>
								<Button disabled className="bg-white shadow-lg p-1 justify-start">
									<img src={cooler?.image || ""} className="h-full aspect-square" />
									<p>{cooler?.name}</p>
								</Button>
							</div>

							<div className="flex flex-col w-full">
								<Button disabled className="bg-white shadow-lg p-1">
									<p>Total price: {totalPrice}.-</p>
								</Button>
							</div>
						</div>
					</>
				) : (
					<>
						<div className="flex flex-col p-4 gap-4 shadow-md rounded-lg w-1/3 justify-between">
							<div className="flex flex-col w-full gap-4">
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
						</div>
					</>
				)}
				<div className="flex flex-col p-4 gap-4 shadow-md rounded-lg w-1/3">
					{/*  */}
					{/* waiting for  */}
					{/*  */}
				</div>
			</div>
		</>
	);
}
