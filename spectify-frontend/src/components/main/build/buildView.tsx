type TBuildComponent = {
	buildId: string;
};

export default function BuildViewComponent({ buildId }: TBuildComponent) {
	return <>{buildId}</>;
}
