"use client"

import * as React from "react"
import { Label, Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardFooter,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A donut chart with text"

const chartData = [
  { status: "Pass", people: 375, fill: "#6ee7b7" },
  { status: "Review", people: 100, fill: "#fde047" },
  { status: "Fail", people: 287, fill: "#fca5a5" },
]

const chartConfig = {
  people: {
    label: "Employees",
  },
  Pass: {
    label: "Pass",
    color: "hsl(var(--chart-1))",
  },
  Review: {
    label: "Review",
    color: "hsl(var(--chart-2))",
  },
  Fail: {
    label: "Fail",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function GlobalPassFail() {
  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.people, 0)
  }, [])

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>Status Summary</CardTitle>
        <CardDescription>View overall status rates</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="people"
              nameKey="status"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Employees
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
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
