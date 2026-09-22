import { useQuery } from "@tanstack/react-query";
import {
    Card, CardHeader, CardTitle, CardContent,
} from "@/components/ui/card";
import {
    Send, ClockAlert, CircleCheck, FileStack, RotateCcw, Loader2,
} from "lucide-react";
import { GetDocumentSubmissionMetrics } from "@/services/documentSubmissionService";

const CardMetrics = () => {
    const { data, isLoading } = useQuery({
        queryKey: ["document-submission-metrics"],
        queryFn: GetDocumentSubmissionMetrics,
    });

    const cards = [
        { title: "Total Submissions", value: data?.total ?? 0, icon: FileStack, bgColor: "bg-blue-100", iconColor: "text-blue-600" },
        { title: "Submitted", value: data?.submitted ?? 0, icon: Send, bgColor: "bg-sky-100", iconColor: "text-sky-600" },
        { title: "Resubmitted", value: data?.resubmitted ?? 0, icon: RotateCcw, bgColor: "bg-purple-100", iconColor: "text-purple-600" },
        { title: "Revision Required", value: data?.revision_required ?? 0, icon: ClockAlert, bgColor: "bg-amber-100", iconColor: "text-amber-600" },
        { title: "Approved", value: data?.approved ?? 0, icon: CircleCheck, bgColor: "bg-green-100", iconColor: "text-green-600" },
    ];

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {cards.map((card) => (
                <Card key={card.title}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                        <div className={`p-2 rounded-md ${card.bgColor}`}>
                            <card.icon className={`h-4 w-4 ${card.iconColor}`} />
                        </div>
                    </CardHeader>
                    <CardContent>
                        {isLoading ? (
                            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                        ) : (
                            <div className="text-2xl font-bold">{card.value}</div>
                        )}
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default CardMetrics;