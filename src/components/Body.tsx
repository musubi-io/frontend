import EmailGen from "./emailGen";
import { ProgressCard } from "./ExampleCard";

export function MainBody() {
	return (
		<div className="mx-auto grid-cols-2 grid items-start justify-center gap-8 p-6">
			<div className="grid w-full h-full gap-6">
				<ProgressCard />
			</div>
			<div className="grid w-full flex-1 gap-6">
				<EmailGen />
				<ProgressCard />
			</div>
		</div>
	);
}
