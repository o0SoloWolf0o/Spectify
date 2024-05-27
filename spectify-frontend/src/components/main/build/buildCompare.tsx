import { useContext, useEffect, useState } from "react";
import { GoArrowSwitch } from "react-icons/go";
import { CompareCountContext } from "@/app/(main)/layout";
import { getBuildById } from "@/database/build";

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
            const buildData = await getBuildById(buildId);
            return buildData;
        } catch (error) {
            console.error("Error fetching build data:", error);
            return null;
        }
    };
    
    const handleCompareClick = async (buildId: string) => {
        const compareBuildData = localStorage.getItem("compareBuildData");
        let updatedCompareData: any[] = compareBuildData ? JSON.parse(compareBuildData) : [];

        if (selectedBuildIds.includes(buildId)) {
            // Remove the build from comparison
            updatedCompareData = updatedCompareData.filter(data => data.build?.id !== buildId);
            setSelectedBuildIds(selectedBuildIds.filter(id => id !== buildId));
        } else {
            // Add the build to comparison
            const buildData = await fetchBuildData(buildId);
            if (!buildData) {
                return;
            }
            updatedCompareData.push({ build: buildData });
            setSelectedBuildIds([...selectedBuildIds, buildId]);
        }

        saveToLocalStorage(updatedCompareData);
        updateCompareCounts();
    };

    const updateCompareCounts = () => {
        const compareItem = localStorage.getItem("compareData");
        const compareBuild = localStorage.getItem("compareBuildData");

        const totalItem = Object.keys(JSON.parse(compareItem || "{}")).length;
        const totalBuild = Object.keys(JSON.parse(compareBuild || "{}")).length;

        const totalCompare = totalItem + totalBuild;

        setCompareCounts(totalCompare);
    };

    useEffect(() => {
        const compareBuildData = localStorage.getItem("compareBuildData");
        if (compareBuildData) {
            const existingBuildData = JSON.parse(compareBuildData) as any[];
            const existingBuildIds = existingBuildData.map(data => data.build?.id).filter(id => id !== undefined);
            setSelectedBuildIds(existingBuildIds);
        }
        updateCompareCounts();
    }, []);

    if (!build_id) {
        return null; 
    }

    return (
        <GoArrowSwitch
            className={`hover:cursor-pointer ${selectedBuildIds.includes(build_id) ? 'text-blue-500' : ''}`}
            onClick={() => handleCompareClick(build_id)}
        />
    );
}
