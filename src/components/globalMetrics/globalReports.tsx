import { Card, CardDescription, CardTitle } from "../ui/card";
import { ReportIcon } from "./globalMetricIcons";

export function GlobalReports() {
  return (
    <Card className="bg-green-100 aspect-square h-fit pt-4 pl-4">
        <ReportIcon className="bg-green-500 rounded-full text-white w-6 h-6 p-1" />
        <div>
          <CardTitle className="text-2xl font-bold">50%</CardTitle>
          <CardDescription>Report Rate</CardDescription>
        </div>
    </Card>
  );
}
