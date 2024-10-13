import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Search from "./userCard/search";
import UserMetrics from "./userMetrics";
import { UserAverage } from "./userAverage";


export default function UserCard() {
	return (
		<Card>
			<CardHeader title="User Details" />
			<CardContent>
				<div className="flex justify-center mb-4">
					<Search/>
				</div>
				<div>
					<Card>
						<CardContent>
						<UserMetrics />
						</CardContent>
					</Card>

					<UserAverage />
				</div>
			</CardContent>
		</Card>
	);
}