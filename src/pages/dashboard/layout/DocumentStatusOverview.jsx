import { Pie, PieChart } from "recharts";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    ChartLegend,
    ChartLegendContent,
} from "@/components/ui/chart";

const chartData = [
    {
        status: "Complete",
        value: 275,
        fill: "#22c55e",
    },
    {
        status: "Pending",
        value: 200,
        fill: "#f59e0b",
    },
    {
        status: "Missing",
        value: 90,
        fill: "#ef4444",
    },
];

const chartConfig = {
    Complete: {
        label: "Complete",
        color: "#22c55e",
    },
    Pending: {
        label: "Pending",
        color: "#f59e0b",
    },
    Missing: {
        label: "Missing",
        color: "#ef4444",
    },
};

const DocumentStatusOverview = () => {
    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
                <CardTitle>Transaction Status</CardTitle>

                <CardDescription>
                    Current transaction records
                </CardDescription>
            </CardHeader>

            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[500px] pb-0"
                >
                    <PieChart>
                        <ChartTooltip
                            content={
                                <ChartTooltipContent hideLabel />
                            }
                        />

                        <Pie
                            data={chartData}
                            dataKey="value"
                            nameKey="status"
                            label
                        />

                        <ChartLegend
                            content={
                                <ChartLegendContent nameKey="status" />
                            }
                            className="-translate-y-2 flex-wrap gap-2 *:basis-1/3 *:justify-center"
                        />
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
};

export default DocumentStatusOverview;