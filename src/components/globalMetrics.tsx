import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { GlobalClicks } from "./globalMetrics/globalClicks";
import { GlobalReports } from "./globalMetrics/globalReports";
import { GlobalResponses } from "./globalMetrics/globalResponses";
import { GlobalShares } from "./globalMetrics/globalShares";

export function GlobalMetrics() {
	return (
		<Card className="w-full h-full" x-chunk="charts-01-chunk-2">
			<CardHeader>
				<CardTitle>Global Metrics</CardTitle>
				<CardDescription>Interactions with your latest spam</CardDescription>
			</CardHeader>
			<CardContent className="grid gap-4">
				<div className="grid grid-cols-4 gap-4">
				<GlobalClicks />
				<GlobalReports />
				<GlobalResponses />
				<GlobalShares />
				</div>
			</CardContent>
		</Card>
	);
}
