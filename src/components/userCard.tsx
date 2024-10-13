import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import Search from './userCard/search';
import { UserAverage } from './userAverage';
import UserMetrics from './userMetrics';

export default function UserCard() {
	const [currentUser, setCurrentUser] = useState<string | null>(null);

	return (
		<Card>
			<CardHeader> User Details </CardHeader>
			<CardContent>
				<div className="flex justify-center mb-4">
					<Search setCurrentUser={setCurrentUser} />
				</div>
				<div>
					<Card className="mb-4">
						<CardHeader>
							<CardTitle> User Summary</CardTitle>
							<CardDescription>John Doe on 01/01/2024</CardDescription>
						</CardHeader>
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
