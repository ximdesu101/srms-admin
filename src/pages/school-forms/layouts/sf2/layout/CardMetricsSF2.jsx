import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
} from "@/components/ui/card";

import {
    Files,
    GitBranch,
    CalendarDays,
    CircleCheck,
} from "lucide-react";

const METRIC_CONFIG = [
    {
        key: "totalFiles",
        title: "Total Files",
        value: 12,
        icon: Files,
        bgColor: "bg-blue-100",
        iconColor: "text-blue-600",
    },
    {
        key: "version",
        title: "Current Version",
        value: "v3",
        icon: GitBranch,
        bgColor: "bg-green-100",
        iconColor: "text-green-600",
    },
    {
        key: "lastUpdated",
        title: "Last Updated",
        value: "Sep 5, 2026",
        icon: CalendarDays,
        bgColor: "bg-orange-100",
        iconColor: "text-orange-600",
    },
];

const CardMetricsSF2 = () => {
    return (
        <div className="grid grid-cols-2 gap-4">
            {METRIC_CONFIG.map((config, index) => {
                const Icon = config.icon;

                return (
                    <Card
                        key={config.key}
                        className={`flex flex-row items-center gap-4 p-4 shadow-none ${
                            index === 0 ? "col-span-2" : ""
                        }`}
                    >
                        <div
                            className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full ${config.bgColor}`}
                        >
                            <Icon
                                className={`h-7 w-7 ${config.iconColor}`}
                            />
                        </div>

                        <div className="min-w-0 flex-1">
                            <CardHeader className="p-0 pb-1">
                                <CardTitle className="text-sm font-medium text-muted-foreground">
                                    {config.title}
                                </CardTitle>
                            </CardHeader>

                            <CardContent className="p-0">
                                <h1 className="truncate text-2xl font-bold tracking-tight">
                                    {config.value}
                                </h1>
                            </CardContent>
                        </div>
                    </Card>
                );
            })}
        </div>
    );
};

export default CardMetricsSF2;