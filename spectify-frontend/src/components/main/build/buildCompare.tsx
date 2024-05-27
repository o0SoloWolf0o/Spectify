import { useContext, useEffect, useState } from "react";
import { GoArrowSwitch } from "react-icons/go";
import { CompareCountContext } from "@/app/(main)/layout";
import { getCaseComputerById } from "@/database/caseComputerProduct";
import { getBuildById } from "@/database/build";
import { getCpuCoolerById } from "@/database/cpuCoolerProduct";
import { getCpuProductById } from "@/database/cpuProduct";
import { getGpuProductById } from "@/database/gpuProduct";
import { getMoboProductById } from "@/database/moboProduct";
import { getPsuProductById } from "@/database/psuProduct";
import { getRamProductById } from "@/database/ramProduct";
import { getSsdProductById } from "@/database/ssdProduct";

export default function BuildCompareComponent({ build_id }: { build_id: string | null }) {
    const { compareCounts, setCompareCounts } = useContext(CompareCountContext);
    const [selectedBuildIds, setSelectedBuildIds] = useState<string[]>([]);

    const saveToLocalStorage = (data: any[]) => {
        try {
            localStorage.setItem("compareBuildData", JSON.stringify(data));
            console.log("Data saved to local storage:", data);
        } catch (error) {
            console.error("Error saving data to local storage:", error);
        }
    };

    const fetchBuildData = async (buildId: string) => {
        try {
            const build = await getBuildById(buildId);

            if (!build) {
                console.error("Build not found:", buildId);
                return null;
            }

            const [
                cpuData,
                moboData,
                ramData,
                gpuData,
                ssdData,
                psuData,
                caseData,
                coolerData
            ] = await Promise.all([
                getCpuProductById(build.cpu_id),
                getMoboProductById(build.mobo_id),
                getRamProductById(build.ram_id),
                getGpuProductById(build.gpu_id),
                getSsdProductById(build.ssd_id ?? ''),
                getPsuProductById(build.psu_id),
                getCaseComputerById(build.case_id),
                getCpuCoolerById(build.cpuCooler_id)
            ]);

            return {
                build,
                cpuData,
                moboData,
                ramData,
                gpuData,
                ssdData,
                psuData,
                caseData,
                coolerData
            };
        } catch (error) {
            console.error("Error fetching build data:", error);
            return null;
        }
    };

    const handleCompareClick = async (buildId: string) => {
        if (selectedBuildIds.includes(buildId)) {
            return;
        }

        const compareBuildData = localStorage.getItem("compareBuildData");
        let updatedSelectedBuildIds: string[] = [];
        let updatedCompareData: any[] = [];

        if (compareBuildData) {
            const existingBuildData = JSON.parse(compareBuildData) as any[];
            updatedCompareData = existingBuildData;
            const existingBuildIds = existingBuildData.map(data => data.build?.id).filter(id => id !== undefined); // Ensure ids are defined
            updatedSelectedBuildIds = [...existingBuildIds, buildId];
        } else {
            updatedSelectedBuildIds = [buildId];
        }

        const buildData = await fetchBuildData(buildId);
        if (buildData) {
            updatedCompareData.push(buildData);
        }

        setSelectedBuildIds(updatedSelectedBuildIds);
        saveToLocalStorage(updatedCompareData);
        setCompareCounts(updatedSelectedBuildIds.length);
    };


    if (!build_id) {
        return null; 
    }

    return (
        <GoArrowSwitch className="hover:cursor-pointer" onClick={() => handleCompareClick(build_id)} />
    );
}
