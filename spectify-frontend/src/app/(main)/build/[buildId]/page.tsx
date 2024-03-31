"use client";

import BuildViewComponent from "@/components/main/build/buildView";

export default function BuildPage({
	params,
}: {
	params: {
		buildId: string;
	};
}) {
	const buildId = params.buildId;

	return (
		<>
			<div className="flex items-center justify-center h-screen">
				<div className="w-full h-full">
					<BuildViewComponent buildId={buildId} />
				</div>
			</div>
		</>
	);
}
