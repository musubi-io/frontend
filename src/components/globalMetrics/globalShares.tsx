import { Card, CardDescription, CardTitle } from "../ui/card";
import { ShareIcon } from "./globalMetricIcons";

export function GlobalShares() {
  return (
    <Card className="bg-orange-100 aspect-square h-fit pt-4 pl-4">
        <ShareIcon className="bg-orange-500 rounded-full text-white w-6 h-6 p-1" />
        <div>
          <CardTitle className="text-2xl font-bold">0%</CardTitle>
          <CardDescription>Share Rate</CardDescription>
        </div>
    </Card>
  );
}