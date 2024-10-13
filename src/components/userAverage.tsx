"use client"

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A simple area chart"

const chartData = [
  { day: "01/01/2024", average: 90 },
  { day: "02/18/2024", average: 83 },
  { day: "04/06/2024", average: 70 },
  { day: "05/23/2024", average: 73 },
  { day: "09/02/2024", average: 87 },
  { day: "10/13/2024", average: 79 },
]

const chartConfig = {
  average: {
    label: "Average Score",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function UserAverage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Spam Scores </CardTitle>
        <CardDescription>
          User security score averages for recent spams
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="average"
              type="natural"
              fill="#e9d5ff"
              fillOpacity={0.4}
              stroke="#a855f7"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>

      <CardFooter>
        <div className="flex items-center gap-2 leading-none text-muted-foreground">
            01/01/2024 - 10/13/2024
        </div>
      </CardFooter>
    </Card>
  )
}
