import {
	Area,
	AreaChart,
	Bar,
	BarChart,
	CartesianGrid,
	Label,
	LabelList,
	Line,
	LineChart,
	PolarAngleAxis,
	RadialBar,
	RadialBarChart,
	Rectangle,
	ReferenceLine,
	XAxis,
	YAxis,
} from 'recharts';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components//ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components//ui/chart';
import { Separator } from '@/components//ui/separator';

export const description = 'A collection of health charts.';

export default function App() {
	return (
		<div className="flex flex-col min-h-screen">
			<Header />
			<div className="flex-1 overflow-auto w-full h-full">
				<HealthCharts />
			</div>
		</div>
	);
}

// components/Header.js
export function Header() {
	return (
		<header className="bg-white shadow-sm p-4">
			<h1 className="text-2xl font-bold">Health Charts</h1>
		</header>
	);
}

// components/HealthCharts.js

export function HealthCharts() {
	return (
		<div className="mx-auto flex flex-col flex-wrap items-start justify-center gap-6 p-6 sm:flex-row sm:p-8">
			<div className="grid w-full h-full gap-6 sm:grid-cols-2 lg:max-w-[22rem] lg:grid-cols-1 xl:max-w-[25rem]">
				<ProgressCard />
				<ProgressCard />
			</div>
			<div className="grid w-full flex-1 gap-6">
				<ProgressCard />
				<ProgressCard />
				<ProgressCard />
			</div>
			<div className="grid w-full flex-1 gap-6">
				<ProgressCard />
				<ProgressCard />
				<ProgressCard />
			</div>
		</div>
	);
}



// components/ProgressCard.js

export function ProgressCard() {
  return (
    <Card className="w-full h-full" x-chunk="charts-01-chunk-2">
      <CardHeader>
        <CardTitle>Progress</CardTitle>
        <CardDescription>You're average more steps a day this year than last year.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid auto-rows-min gap-2">
          <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
            12,453
            <span className="text-sm font-normal text-muted-foreground">steps/day</span>
          </div>
          <ChartContainer
            config={{
              steps: {
                label: 'Steps',
                color: 'hsl(var(--chart-1))',
              },
            }}
            className="aspect-auto h-[32px] w-full"
          >
            <BarChart
              accessibilityLayer
              layout="vertical"
              margin={{
                left: 0,
                top: 0,
                right: 0,
                bottom: 0,
              }}
              data={[
                {
                  date: '2024',
                  steps: 12435,
                },
              ]}
            >
              <Bar dataKey="steps" fill="var(--color-steps)" radius={4} barSize={32}>
                <LabelList position="insideLeft" dataKey="date" offset={8} fontSize={12} fill="white" />
              </Bar>
              <YAxis dataKey="date" type="category" tickCount={1} hide />
              <XAxis dataKey="steps" type="number" hide />
            </BarChart>
          </ChartContainer>
        </div>
        <div className="grid auto-rows-min gap-2">
          <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
            10,103
            <span className="text-sm font-normal text-muted-foreground">steps/day</span>
          </div>
          <ChartContainer
            config={{
              steps: {
                label: 'Steps',
                color: 'hsl(var(--muted))',
              },
            }}
            className="aspect-auto h-[32px] w-full"
          >
            <BarChart
              accessibilityLayer
              layout="vertical"
              margin={{
                left: 0,
                top: 0,
                right: 0,
                bottom: 0,
              }}
              data={[
                {
                  date: '2023',
                  steps: 10103,
                },
              ]}
            >
              <Bar dataKey="steps" fill="var(--color-steps)" radius={4} barSize={32}>
                <LabelList
                  position="insideLeft"
                  dataKey="date"
                  offset={8}
                  fontSize={12}
                  fill="hsl(var(--muted-foreground))"
                />
              </Bar>
              <YAxis dataKey="date" type="category" tickCount={1} hide />
              <XAxis dataKey="steps" type="number" hide />
            </BarChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}
