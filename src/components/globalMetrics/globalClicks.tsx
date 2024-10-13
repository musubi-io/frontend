import { Card, CardDescription, CardTitle } from "../ui/card";
import { MouseIcon } from "./globalMetricIcons";

export function GlobalClicks() {
  return (
    <Card className="bg-red-100 aspect-square h-fit p-4">
        <MouseIcon className="bg-red-500 rounded-full text-white w-6 h-6 p-1" />
        <div>
          <CardTitle className="text-2xl font-bold">10%</CardTitle>
          <CardDescription>Click Rate</CardDescription>
        </div>
    </Card>
  );
}
