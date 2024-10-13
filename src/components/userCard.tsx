import { useState } from 'react';
import { ProgressCard } from './ExampleCard';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import Search from './userCard/search';
import { UserAverage } from './userAverage';
import UserMetrics from './userMetrics';

export default function UserCard() {
	const [currentUser, setCurrentUser] = useState<string | null>(null);

	return (
		<Card>
			<CardHeader title="User Details" />
			<CardContent>
				<div className="flex justify-center mb-4">
					<Search setCurrentUser={setCurrentUser} />
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
