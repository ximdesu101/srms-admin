import {
    Card,
    CardHeader,
    CardTitle,
    CardContent
} from "@/components/ui/card";
import {
    BookCopy,
    ClockAlert,
    CircleCheck,
    CircleX,
} from "lucide-react";

const cardMetrics = [
    {
        id: 1,
        title: "Total Requests",
        value: 4,
        icon: BookCopy,
        bgColor: "bg-blue-100",
        iconColor: "text-blue-600",
    },
    {
        id: 2,
        title: "Completed Requests",
        value: 3,
        icon: CircleCheck,
        bgColor: "bg-green-100",
        iconColor: "text-green-600",
    },
    {
        id: 3,
        title: "Pending Requests",
        value: 1,
        icon: ClockAlert,
        bgColor: "bg-yellow-100",
        iconColor: "text-yellow-600",
    },
    {
        id: 4,
        title: "Rejected Requests",
        value: 0,
        icon: CircleX,
        bgColor: "bg-red-100",
        iconColor: "text-red-600",
    },
];

const CardMetrics = () => {
    return (
        <div className="grid grid-cols-4 auto-rows-min gap-4">
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