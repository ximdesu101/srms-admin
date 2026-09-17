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
import {
    Eye,
    Download,
    GitBranch
} from "lucide-react";
import Preview from "./PreviewSF1";

const TemplatesSF1 = () => {
    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between gap-4">
                    <CardTitle className="text-lg">
                        SF1 School Register Template
                    </CardTitle>

                    <Select>
                        <SelectTrigger className="w-32">
                            <SelectValue placeholder="Select Version" />
                        </SelectTrigger>
                        <SelectContent position="popper">
                            <SelectItem value="1">Version 1</SelectItem>
                            <SelectItem value="2">Version 2</SelectItem>
                            <SelectItem value="3">Version 3</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <CardDescription className="text-xs">
                    School year 2026-2027 • Excel Spreadsheet
                </CardDescription>

                <CardDescription className="text-md">
                    Official SF1 template for the current school year.
                </CardDescription>
            </CardHeader>

            <CardContent>
                <div className="flex gap-2">
                    <Preview/>
                    <Button>
                        <Download className="h-4 w-4" />
                        Download Template
                    </Button>
                </div>

                <div className="mt-5 flex justify-between">
                    <span className="flex gap-1 text-xs text-muted-foreground">
                        <GitBranch className="h-3 w-3 my-auto"/> v3
                    </span>
                    <span className="text-xs text-muted-foreground">
                        Last updated: September 5, 2026
                    </span>
                </div>
            </CardContent>
        </Card>
    );
};

export default TemplatesSF1;