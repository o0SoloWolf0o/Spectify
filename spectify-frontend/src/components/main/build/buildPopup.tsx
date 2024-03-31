"use client";

import { useEffect, useState, useMemo } from "react";
import { Modal, ModalContent, ModalBody, useDisclosure, Skeleton } from "@nextui-org/react";
import { getBuildById } from "@/database/build";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import BuildLikeCountComponent from "./buildLikeCount";
import BuildLikeComponent from "./buildLike";
import BuildCompareComponent from "./buildCompare";
import BuildShareComponent from "./buildShare";
import BuildViewComponent from "./buildView";

type TBuildPopupComponent = {
	buildId: string;
	size?: "small" | "medium" | "large";
};

export default function BuildPopupComponent({ buildId, size }: TBuildPopupComponent) {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [build, setBuild] = useState<any>();
	const variant = cva("aspect-square rounded-lg space-y-4", {
		variants: {
			size: {
				small: "w-24",
				medium: "w-48",
				large: "w-80",
			},
		},
		defaultVariants: {
			size: "medium",
		},
	});

	useEffect(() => {
		getBuildById(buildId).then((res) => {
			setBuild(res);
		});
	}, []);

	return (
		<>
			{build ? (
				<>
					<div className={cn(variant({ size }))}>
						<img
							src={build?.image || ""}
							onClick={onOpen}
							className="w-full h-full object-cover cursor-pointer shadow rounded-lg bg-white"
						/>
						<div className="flex flex-row justify-between">
							<BuildLikeCountComponent />
							<div className="flex flex-row gap-4">
								<BuildLikeComponent />
								<BuildCompareComponent />
								<BuildShareComponent />
							</div>
						</div>
					</div>
				</>
			) : (
				<>
					<div className={cn(variant({ size }))}>
						<Skeleton isLoaded={build ? true : false} disableAnimation className={cn(variant({ size }))} />
						<div className="flex flex-row justify-between">
							<Skeleton isLoaded={build ? true : false} disableAnimation className="w-16 h-4 rounded-md" />
							<div className="flex flex-row gap-4">
								<Skeleton isLoaded={build ? true : false} disableAnimation className="w-5 h-4 rounded-md" />
								<Skeleton isLoaded={build ? true : false} disableAnimation className="w-5 h-4 rounded-md" />
								<Skeleton isLoaded={build ? true : false} disableAnimation className="w-5 h-4 rounded-md" />
							</div>
						</div>
					</div>
				</>
			)}

			<Modal isOpen={isOpen} onOpenChange={onOpenChange} size="4xl">
				<ModalContent>
					{(onClose) => (
						<>
							<ModalBody className="p-12">
								<BuildViewComponent buildInfo={build} />
							</ModalBody>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
}
