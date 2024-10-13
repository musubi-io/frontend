import { ProgressCard } from "./ExampleCard";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Search from "./userCard/search";


export default function UserCard() {
	return (
		<Card>
			<CardHeader title="User Details" />
			<CardContent>
				<div className="flex justify-center mb-4">
					<Search/>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<ProgressCard />
					<ProgressCard />
				</div>
			</CardContent>
		</Card>
	);
}