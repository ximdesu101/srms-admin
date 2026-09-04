"use client"

import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter
} from "@/components/ui/card"

import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    ChartLegend,
    ChartLegendContent,
} from "@/components/ui/chart"

const chartData = [
    { month: "January", requests: 2, submissions: 31 },
    { month: "February", requests: 10, submissions: 52 },
    { month: "March", requests: 35, submissions: 29 },
    { month: "April", requests: 81, submissions: 64 },
    { month: "May", requests: 54, submissions: 47 },
    { month: "June", requests: 73, submissions: 1 },
    { month: "July", requests: 39, submissions: 84 },
    { month: "August", requests: 92, submissions: 76 },
    { month: "September", requests: 0, submissions: 45 },
    { month: "October", requests: 78, submissions: 69 },
    { month: "November", requests: 46, submissions: 38 },
    { month: "December", requests: 20, submissions: 71 },
]

const chartConfig = {
    requests: {
        label: "Requests",
        color: "var(--chart-1)",
    },
    submissions: {
        label: "Submissions",
        color: "var(--chart-2)",
    },
}

const SubmissionRequestChart = () => {
    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <CardTitle>
                            Document Requests & Submissions
                        </CardTitle>

                        <CardDescription>
                            January - December 2026
                        </CardDescription>
                    </div>

                    {/* Chart Legend */}
                </div>
            </CardHeader>

            <CardContent>
                <ChartContainer
                    config={chartConfig}
                    className="h-[212px] w-full"
                >
                    <LineChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />

                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />

                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent />}
                        />

                        <Line
                            dataKey="requests"
                            type="monotone"
                            stroke="var(--color-requests)"
                            strokeWidth={2}
                            dot={false}
                        />

                        <Line
                            dataKey="submissions"
                            type="monotone"
                            stroke="var(--color-submissions)"
                            strokeWidth={2}
                            dot={false}
                        />
                        <ChartLegend content={<ChartLegendContent />} />
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}

export default SubmissionRequestChart