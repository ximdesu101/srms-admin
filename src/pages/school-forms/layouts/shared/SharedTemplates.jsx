import { Button } from "@/components/ui/button";
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
import { Download, GitBranch } from "lucide-react";
import SharedPreview from "./SharedPreview";

/**
 * @param {{
 *   formCode: string,
 *   formName: string,
 *   schoolYear?: string,
 *   fileType?: string,
 *   description?: string,
 *   currentVersion?: string,
 *   lastUpdated?: string,
 *   versions?: Array<{ value: string, label: string }>
 * }} props
 */
const SharedTemplates = ({
    formCode,
    formName,
    schoolYear = "2026-2027",
    fileType = "Excel Spreadsheet",
    description,
    currentVersion = "v3",
    lastUpdated = "September 5, 2026",
    versions = [
        { value: "1", label: "Version 1" },
        { value: "2", label: "Version 2" },
        { value: "3", label: "Version 3" },
    ],
}) => {
    const templateDescription =
        description ||
        `Official ${formCode} template for the current school year.`;

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between gap-4">
                    <CardTitle className="text-lg">
                        {formCode} {formName} Template
                    </CardTitle>

                    <Select>
                        <SelectTrigger className="w-32">
                            <SelectValue placeholder="Select Version" />
                        </SelectTrigger>
                        <SelectContent position="popper">
                            {versions.map((v) => (
                                <SelectItem key={v.value} value={v.value}>
                                    {v.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <CardDescription className="text-xs">
                    School year {schoolYear} • {fileType}
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
                        <Download className="h-4 w-4" />
                        Download Template
                    </Button>
                </div>

                <div className="mt-5 flex justify-between">
                    <span className="flex gap-1 text-xs text-muted-foreground">
                        <GitBranch className="h-3 w-3 my-auto" /> {currentVersion}
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