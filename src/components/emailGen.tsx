import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function EmailGen() {
	return (
		<Card className="w-full mx-auto">
			<CardHeader>
				<CardTitle>Generate Email</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="mb-4">
					<Textarea placeholder="Enter your text here..." className="w-full p-2 border rounded" rows={5} />
				</div>
				<Button type="submit" className="w-full">
					Submit
				</Button>
			</CardContent>
		</Card>
	);
}
