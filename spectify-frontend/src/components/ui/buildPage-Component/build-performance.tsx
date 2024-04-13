import { parse } from "path";
import React from "react";
import { useState } from "react";
import Image from "next/image";

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
    }
}

function LoadImageLeagueOfLegends(image: string, name: string, fps: string) {
    return (
        <div className="flex flex-row gap-4 w-full shadow-lg rounded-lg p-2">
            <Image
                src={`/images/games/lol.webp`}
                alt={`${name}`}
                width="80"
                height="80"
                sizes="100vw"
                priority={true}
                className="shadow-lg rounded-sm"
            />
            <div className="flex flex-col gap-4 w-full font-bold">
                <p className="text-lg">{name}</p>
                <div className="flex flex-row w-full justify-between align-middle items-center">
                    <p className="text-xl">{fps}</p>
                    <div className="flex flex-col">
                        <p>FPS</p>
                        <p>1080p</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

const Performance = () => {

    let product: Product = {};

    if (typeof window !== 'undefined') {
        const allproduct = localStorage.getItem('selectedProducts') || '';
        product = JSON.parse(allproduct);
    }


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
        }
    }

    const [selectedGame, setSelectedGame] = useState('');

    const handleGameSelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedGame(event.target.value);
    };

    return (
        <div className="mb-5">
            {product.CPU && product.GPU && (

                <div className="ml-4 mr-4">
                    <p>FPS count by settings For {product.CPU.name} and {product.GPU.name} with 1920 x 1080 (FHD (1080p))</p>

                    {/* Game Selection */}
                    {/*
                    <select value={selectedGame} onChange={handleGameSelection} className="mx-auto">
                        <option value="">Select a game</option>
                        <option value="Valorant">Valorant</option>
                        <option value="LeagueOfLegends">League of Legends</option>
                        <option value="Overwatch2">Overwatch 2</option>
                    </select>
                    */}


                    {/* VALORANT */}
                    {/* 
                    {selectedGame === 'Valorant' && (
                    */}

                    <>
                        <div className="flex flex-row gap-4 w-full shadow-lg rounded-lg p-2">
                            <Image
                                src={`/images/games/valo.webp`}
                                alt={`Valorant Game`}
                                width="110"
                                height="75"
                                sizes="100vw"
                                priority={true}
                                className="shadow-lg rounded-sm"
                            />
                            <div className="flex flex-col gap-4 w-full font-bold">
                                <p className="text-xl">Valorant</p>
                                <div className="flex flex-col w-full">
                                    <div className="flex flex-row w-full justify-between align-middle items-center">
                                        <p className="text-lg">Low Setting is FPS: {FPS_Valorant_Low}</p>
                                    </div>
                                    <div className="flex flex-row w-full justify-between align-middle items-center">
                                        <p className="text-lg">Medium Setting is FPS: {FPS_Valorant_Medium}</p>
                                    </div>
                                    <div className="flex flex-row w-full justify-between align-middle items-center">
                                        <p className="text-lg">High Setting is FPS: {FPS_Valorant_High}</p>
                                    </div>
                                    <div className="flex flex-row w-full justify-between align-middle items-center">
                                        <p className="text-lg">Ultra Setting is FPS: {FPS_Valorant_Ultra}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                    {/*
                    )}
                    */}

                    {/* League of Legends */}
                    {/*
                    {selectedGame === 'LeagueOfLegends' && (
                    */}
                    <>
                        <div className="flex flex-row gap-4 w-full shadow-lg rounded-lg p-2">
                            <Image
                                src={`/images/games/lol.webp`}
                                alt={`League of Legends Game`}
                                width="110"
                                height="75"
                                sizes="100vw"
                                priority={true}
                                className="shadow-lg rounded-sm"
                            />
                            <div className="flex flex-col gap-4 w-full font-bold">
                                <p className="text-xl">League of Legends</p>
                                <div className="flex flex-col w-full">
                                    <div className="flex flex-row w-full justify-between align-middle items-center">
                                        <p className="text-lg">Low Setting is FPS: {FPS_LeagueOfLegends_Low}</p>
                                    </div>
                                    <div className="flex flex-row w-full justify-between align-middle items-center">
                                        <p className="text-lg">Medium Setting is FPS: {FPS_LeagueOfLegends_Medium}</p>
                                    </div>
                                    <div className="flex flex-row w-full justify-between align-middle items-center">
                                        <p className="text-lg">High Setting is FPS: {FPS_LeagueOfLegends_High}</p>
                                    </div>
                                    <div className="flex flex-row w-full justify-between align-middle items-center">
                                        <p className="text-lg">Ultra Setting is FPS: {FPS_LeagueOfLegends_Ultra}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                    {/*
                    )}
                    */}


                    {/* Overwatch 2 */}
                    {/*
                    {selectedGame === 'Overwatch2' && (
                    */}
                    <>
                        <div className="flex flex-row gap-4 w-full shadow-lg rounded-lg p-2">
                            <Image
                                src={`/images/games/ow.webp`}
                                alt={`Overwatch 2 Game`}
                                width="110"
                                height="75"
                                sizes="100vw"
                                priority={true}
                                className="shadow-lg rounded-sm"
                            />
                            <div className="flex flex-col gap-4 w-full font-bold">
                                <p className="text-xl">Overwatch 2</p>
                                <div className="flex flex-col w-full">
                                    <div className="flex flex-row w-full justify-between align-middle items-center">
                                        <p className="text-lg">Low Setting is FPS: {FPS_Overwatch2_Low}</p>
                                    </div>
                                    <div className="flex flex-row w-full justify-between align-middle items-center">
                                        <p className="text-lg">Medium Setting is FPS: {FPS_Overwatch2_Medium}</p>
                                    </div>
                                    <div className="flex flex-row w-full justify-between align-middle items-center">
                                        <p className="text-lg">High Setting is FPS: {FPS_Overwatch2_High}</p>
                                    </div>
                                    <div className="flex flex-row w-full justify-between align-middle items-center">
                                        <p className="text-lg">Ultra Setting is FPS: {FPS_Overwatch2_Ultra}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                    {/* 
                    )}
                    */}

                </div>

            )}
        </div>
    );
};

export default Performance;
