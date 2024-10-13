import { Card, CardDescription, CardTitle } from "../ui/card";
import { ResponseIcon } from "./globalMetricIcons";

export function GlobalResponses() {
  return (
    <Card className="bg-purple-100 aspect-square h-fit pt-4 pl-4">
        <ResponseIcon className="bg-purple-500 rounded-full text-white w-6 h-6 p-1" />
        <div>
          <CardTitle className="text-2xl font-bold">5%</CardTitle>
          <CardDescription>Response Rate</CardDescription>
        </div>
    </Card>
  );
}