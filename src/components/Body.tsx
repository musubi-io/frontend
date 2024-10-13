import { Global } from "recharts";
import EmailGen from "./emailGen";
import { ProgressCard } from "./ExampleCard";
import { GlobalMetrics } from "./globalMetrics";

export function MainBody() {
	return (
		<div className="h-full mx-auto grid-cols-2 grid items-start justify-center gap-8 p-6">
			<div className="grid w-full h-full gap-6">
				<ProgressCard />
			</div>
			<div className="grid w-full flex-1 gap-6 h-full">
				<EmailGen />
				<GlobalMetrics />
				<div className="mx-auto grid-cols-2 grid gap-6 w-full">
					<ProgressCard />
					<ProgressCard />
				</div>
			</div>
		</div>
	);
}
