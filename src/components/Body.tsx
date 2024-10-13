import EmailGen from './emailGen';
import { GlobalMetrics } from './globalMetrics';
import { GlobalAverage } from './globalAverage';
import { GlobalPassFail } from './globalPassFail';
import UserCard from './userCard';

export function MainBody() {
	return (
		<div className="h-full mx-auto grid-cols-2 grid items-start justify-center gap-8 p-6">
			<UserCard />
			<div className="grid w-full flex-1 gap-6 h-full">
				<EmailGen />
				<GlobalMetrics />
				<div className="mx-auto grid-cols-2 grid gap-6 w-full">
					<GlobalAverage />
					<GlobalPassFail />
				</div>
			</div>
		</div>
	);
}
