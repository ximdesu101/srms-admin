import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Upload,
    Scaling,
    BadgeCheck
} from "lucide-react";
import SharedPreview from "./SharedPreview";

const SharedTemplates = ({
    formCode,
    formName,
    schoolYear = "2026-2027",
    fileType = "Excel Spreadsheet",
    description,
    templateFileSize,
    lastUpdated = "September 5, 2026",
}) => {
    const templateDescription = description
    return (
        <Card>
            <CardHeader>
                <div className="flex justify-between">
                    <CardTitle className="text-lg">
                        {formCode} {formName} Template
                    </CardTitle>
                    <Badge variant="outline" className="my-auto border-green-200 bg-green-50 text-green-700">
                        <BadgeCheck />
                        Official
                    </Badge>
                </div>
                <CardDescription className="text-xs">
                    {fileType}
                </CardDescription>

                <CardDescription className="text-md">
                    {templateDescription}
                </CardDescription>
            </CardHeader>

            <CardContent>
                <div className="flex gap-2">
                    <SharedPreview
                        formCode={formCode}
                        formName={formName}
                        schoolYear={schoolYear}
                        lastUpdated={lastUpdated}
                    />
                    <Button>
                        <Upload className="h-4 w-4" />
                        Upload Template
                    </Button>
                </div>

                <div className="mt-5 flex justify-between">
                    <span className="flex gap-1 text-xs text-muted-foreground">
                        <Scaling className="h-3 w-3 my-auto" />File Size: {templateFileSize}
                    </span>
                    <span className="text-xs text-muted-foreground">
                        Last updated: {lastUpdated}
                    </span>
                </div>
            </CardContent>
        </Card>
    );
};

export default SharedTemplates;