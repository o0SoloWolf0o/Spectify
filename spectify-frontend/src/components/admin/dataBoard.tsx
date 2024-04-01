"use client";

import { getCpuProduct, getCpuProductById } from "@/database/cpuProduct";
import { getMoboProduct, getMoboProductById } from "@/database/moboProduct";
import { useEffect, useState } from "react";
import SearchBarComponentAdmin from "./searchBar";
import { getRamProduct, getRamProductById } from "@/database/ramProduct";
import { getGpuProduct, getGpuProductById } from "@/database/gpuProduct";
import { getSsdProduct, getSsdProductById } from "@/database/ssdProduct";
import { getPsuProduct, getPsuProductById } from "@/database/psuProduct";
import { getCaseComputer, getCaseComputerById } from "@/database/caseComputerProduct";
import { getCpuCooler, getCpuCoolerById } from "@/database/cpuCoolerProduct";

type TProps = {
	model: "cpu" | "mobo" | "ram" | "gpu" | "ssd" | "psu" | "case" | "cooler";
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
				newData = id ? [await getCpuProductById(id)] : await getCpuProduct();
				break;
			case "mobo":
				newData = id ? [await getMoboProductById(id)] : await getMoboProduct();
				break;
			case "ram":
				newData = id ? [await getRamProductById(id)] : await getRamProduct();
				break;
			case "gpu":
				newData = id ? [await getGpuProductById(id)] : await getGpuProduct();
				break;
			case "ssd":
				newData = id ? [await getSsdProductById(id)] : await getSsdProduct();
				break;
			case "psu":
				newData = id ? [await getPsuProductById(id)] : await getPsuProduct();
				break;
			case "case":
				newData = id ? [await getCaseComputerById(id)] : await getCaseComputer();
				break;
			case "cooler":
				newData = id ? [await getCpuCoolerById(id)] : await getCpuCooler();
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
			<div className="w-full h-full overflow-x-scroll">
				{isLoaded ? (
					<>
						<div className="pt-14">
							{data && data.length > 0 && (
								<table className="min-w-full divide-y divide-gray-200">
									<thead className="bg-gray-50">
										<tr>
											{Object.keys(data[0]).map((key) => (
												<th
													key={key}
													scope="col"
													className="px-6 py-3 text-left text-xs font-medium border-r text-gray-500 uppercase tracking-wider"
												>
													{key}
												</th>
											))}
										</tr>
									</thead>
									<tbody className="bg-white divide-y divide-gray-200">
										{data.map((item: any, index: number) => (
											<tr key={index}>
												{Object.keys(item).map((key) => (
													<td
														key={key}
														className="px-6 py-4 whitespace-nowrap max-w-xs overflow-hidden overflow-ellipsis border-r border-gray-200"
													>
														<div className="text-sm text-gray-900">{item[key]}</div>
													</td>
												))}
											</tr>
										))}
									</tbody>
								</table>
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
