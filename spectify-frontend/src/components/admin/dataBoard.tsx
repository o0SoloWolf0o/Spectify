"use client";

import { getCpuProductById, getCpuProducts } from "@/database/cpuProduct";
import { getMoboProductById, getMoboProducts } from "@/database/moboProduct";
import { useEffect, useState } from "react";
import SearchBarComponentAdmin from "./searchBar";
import { getRamProductById, getRamProducts } from "@/database/ramProduct";
import { getGpuProductById, getGpuProducts } from "@/database/gpuProduct";
import { getSsdProductById, getSsdProducts } from "@/database/ssdProduct";
import { getPsuProductById, getPsuProducts } from "@/database/psuProduct";
import { getCaseComputerById, getCaseComputers } from "@/database/caseComputerProduct";
import { getCpuCoolerById, getCpuCoolers } from "@/database/cpuCoolerProduct";

type TProps = {
	model: "cpu" | "mobo" | "ram" | "gpu" | "ssd" | "psu" | "caseComputer" | "cpuCooler";
};

export default function DataBoard({ model }: TProps) {
	const [data, setData] = useState<any>();
	const [isLoaded, setIsLoaded] = useState(false);

	function handleSearch(id: string) {
		fetchData(id);
	}

	async function fetchData(id?: string) {
		let newData: any;
		setIsLoaded(false);
		switch (model) {
			case "cpu":
				newData = id ? [await getCpuProductById(id)] : await getCpuProducts();
				break;
			case "mobo":
				newData = id ? [await getMoboProductById(id)] : await getMoboProducts();
				break;
			case "ram":
				newData = id ? [await getRamProductById(id)] : await getRamProducts();
				break;
			case "gpu":
				newData = id ? [await getGpuProductById(id)] : await getGpuProducts();
				break;
			case "ssd":
				newData = id ? [await getSsdProductById(id)] : await getSsdProducts();
				break;
			case "psu":
				newData = id ? [await getPsuProductById(id)] : await getPsuProducts();
				break;
			case "caseComputer":
				newData = id ? [await getCaseComputerById(id)] : await getCaseComputers();
				break;
			case "cpuCooler":
				newData = id ? [await getCpuCoolerById(id)] : await getCpuCoolers();
				break;
			default:
				newData = [];
				break;
		}
		setData(newData);
		setIsLoaded(true);
	}

	useEffect(() => {
		fetchData();
	}, [model]);

	return (
		<>
			<div className="w-full">
				<SearchBarComponentAdmin onSearch={handleSearch} placeholder="Search ID" className="w-1/4" />
			</div>
			<div className="w-full h-full overflow-y-scroll">
				{isLoaded ? (
					<>
						<div className="pt-14">
							{data && data.length > 0 ? (
								<div className="overflow-x-auto">
									<table className="min-w-full divide-y divide-gray-200">
										<thead className="bg-gray-100">
											<tr className="text-left">
												{Object.keys(data[0]).map((key) => (
													<th
														key={key}
														scope="col"
														className="px-6 py-3 text-xs font-semibold border-r border-gray-200 text-gray-800 uppercase tracking-wider"
													>
														{key}
													</th>
												))}
											</tr>
										</thead>
										<tbody className="bg-white divide-y divide-gray-200">
											{data.map((item: any, index: any) => (
												<tr key={index} className="transition-all hover:bg-gray-50">
													{Object.keys(item).map((key) => (
														<td
															key={key}
															className="px-6 py-4 whitespace-nowrap max-w-xs overflow-hidden overflow-ellipsis border-r border-gray-200 text-gray-800"
														>
															<div className="text-sm">{item[key]}</div>
														</td>
													))}
												</tr>
											))}
										</tbody>
									</table>
								</div>
							) : (
								<div className="flex items-center justify-center h-64">
									<p className="text-gray-500 text-lg">No data available</p>
								</div>
							)}
						</div>
					</>
				) : (
					<>
						<div className="pt-14">Loading...</div>
					</>
				)}
			</div>
		</>
	);
}
