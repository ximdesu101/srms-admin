import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
    BadgeCheck,
    FingerprintPattern,
    ClipboardCheck,
    DatabaseCheck,
    Plane,
    CalendarDays,
    FileText,
    Megaphone,
    Send
} from "lucide-react";

const ADMINISTRATIVE_FORMS = [
    {
        name: "Biometrics and DTR",
        description: "Personnel biometrics and daily time record documents.",
        icon: FingerprintPattern
    },
    {
        name: "ACR ",
        description: "Report used to document completed school activities.",
        icon: ClipboardCheck
    },
    {
        name: "DPDS ",
        description: "Records and manages school partnership information.",
        icon: DatabaseCheck
    },
    {
        name: "Travel Order",
        description: "Authorization and location details for official travel.",
        icon: Plane
    },
    {
        name: "Leave Form",
        description: "Application form for employee leave requests.",
        icon: CalendarDays
    },
    {
        name: "Special Order",
        description: "Request and authorization for required services.",
        icon: FileText
    },
    {
        name: "NSED",
        description: "Nationwide Simultaneous Earthquake Drill.",
        icon: Megaphone
    },
    {
        name: "Transmittal",
        description: "Covers district and division transmittal for document routing.",
        icon: Send
    },
];

function AdministrativeFormCard({ form }) {
    const Icon = form.icon;

    return (
        <Card className="group transition-all duration-200 hover:border-primary/50 hover:shadow-md">
            <CardHeader className="flex items-start gap-2">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-[#3e963f]">
                    <Icon
                        className="h-6 w-6 transition-colors duration-100 group-hover:text-white"
                        aria-hidden="true"
                    />
                </div>
                <div className="my-auto grid gap-0">
                    <CardTitle>{form.name}</CardTitle>
                    <CardDescription>Administrative Form</CardDescription>
                </div>
            </CardHeader>

            <CardContent>
                <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                    {form.description}
                </p>
            </CardContent>
        </Card>
    );
}

const AdministrativeForms = () => {
    return (
        <div className="grid gap-4">
            <CardHeader>
                <div className="flex gap-2">
                    <CardTitle className="text-3xl font-semibold">
                        Administrative Forms
                    </CardTitle>
                    <Badge variant="outline" className="my-auto border-green-200 bg-green-50 text-green-700">
                        <BadgeCheck />
                        Official
                    </Badge>
                </div>
                <CardDescription>
                    Administrative documents of Tagnao Elementary School
                </CardDescription>
            </CardHeader>
            <div className="grid grid-cols-4 gap-4">
                {ADMINISTRATIVE_FORMS.map((form) => (
                    <AdministrativeFormCard key={form.name} form={form} />
                ))}
            </div>
        </div>
    );
};

export default AdministrativeForms;