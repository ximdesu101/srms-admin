import {
    Card,
    CardHeader,
    CardTitle,
    CardContent
} from "@/components/ui/card";
import {
    Send,

    ClockAlert,
    CircleCheck,
    CircleX,
    FileStack,
    CalendarX2 
} from "lucide-react";

const cardMetrics = [
    {
        id: 1,
        title: "Total Submissions",
        value: 4,
        icon: Send,
        bgColor: "bg-blue-100",
        iconColor: "text-blue-600",
    },
    {
        id: 2,
        title: "Accepted Submissions",
        value: 3,
        icon: CircleCheck,
        bgColor: "bg-green-100",
        iconColor: "text-green-600",
    },
    {
        id: 3,
        title: "Pending Submissions",
        value: 1,
        icon: ClockAlert,
        bgColor: "bg-yellow-100",
        iconColor: "text-yellow-600",
    },
    {
        id: 4,
        title: "Needs Revision",
        value: 0,
        icon: FileStack,
        bgColor: "bg-orange-100",
        iconColor: "text-orange-600",
    },
    {
        id: 5,
        title: "Rejected",
        value: 0,
        icon: CircleX,
        bgColor: "bg-red-100",
        iconColor: "text-red-600",
    },
    {
        id: 6,
        title: "Overdue",
        value: 0,
        icon: CalendarX2,
        bgColor: "bg-purple-100",
        iconColor: "text-purple-600",
    },
];

const CardMetrics = () => {
    return (
        <div className="grid grid-cols-3 auto-rows-min gap-4">
            {cardMetrics.map((data) => {
                const Icon = data.icon;
                return (
                    <Card key={data.id} className="flex-row gap-0 p-4">
                        <div className={`flex h-14 w-14 items-center justify-center rounded-full ${data.bgColor}`}>
                            {Icon && <Icon className={`h-8 w-8 ${data.iconColor}`} />}
                        </div>
                        <div className="flex-1">
                            <CardHeader className="pb-0">
                                <CardTitle className="text-sm">
                                    {data.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <h1 className="text-3xl font-bold tracking-tight">
                                    {data.value}
                                </h1>
                            </CardContent>
                        </div>
                    </Card>
                );
            })}
        </div>
    )
}

export default CardMetrics