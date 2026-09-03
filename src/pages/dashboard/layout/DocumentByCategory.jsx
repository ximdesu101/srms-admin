import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

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
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
    {
        category: "Student Records",
        complete: 180,
        pending: 35,
        missing: 15,
    },
    {
        category: "Certificates",
        complete: 140,
        pending: 25,
        missing: 10,
    },
    {
        category: "Report Cards",
        complete: 120,
        pending: 40,
        missing: 20,
    },
    {
        category: "Personnel Documents",
        complete: 95,
        pending: 20,
        missing: 8,
    },
    {
        category: "Others",
        complete: 70,
        pending: 15,
        missing: 12,
    },
];

const chartConfig = {
    complete: {
        label: "Complete",
        color: "#22c55e",
    },
    pending: {
        label: "Pending",
        color: "#f59e0b",
    },
    missing: {
        label: "Missing",
        color: "#ef4444",
    },
};

const DocumentByCategory = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Document Status by Category</CardTitle>

                <CardDescription>
                    Overview of document records and their current status
                </CardDescription>
            </CardHeader>

            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart
                        accessibilityLayer
                        data={chartData}
                    >
                        <CartesianGrid vertical={false} />

                        <XAxis
                            dataKey="category"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => {
                                if (value === "Student Records") return "Student";
                                if (value === "Certificates") return "Certificates";
                                if (value === "Report Cards") return "Report Cards";
                                if (value === "Personnel Documents") return "Personnel";
                                return "Others";
                            }}
                        />

                        <ChartTooltip
                            content={
                                <ChartTooltipContent />
                            }
                        />

                        <ChartLegend
                            content={<ChartLegendContent />}
                        />

                        <Bar
                            dataKey="complete"
                            stackId="status"
                            fill="#22c55e"
                            radius={[0, 0, 0, 0]}
                        />

                        <Bar
                            dataKey="pending"
                            stackId="status"
                            fill="#f59e0b"
                            radius={[0, 0, 0, 0]}
                        />

                        <Bar
                            dataKey="missing"
                            stackId="status"
                            fill="#ef4444"
                            radius={[4, 4, 0, 0]}
                        />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
};

export default DocumentByCategory;