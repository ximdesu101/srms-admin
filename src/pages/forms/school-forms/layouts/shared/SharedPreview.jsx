import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import {
    Empty,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty";
import { Download, Eye, FileText } from "lucide-react";

/**
 * @param {{
 *   formCode: string,
 *   formName: string,
 *   schoolYear?: string,
 *   lastUpdated?: string,
 *   previewDescription?: string
 * }} props
 */
const SharedPreview = ({
    formCode,
    formName,
    schoolYear = "2026-2027",
    lastUpdated = "September 2026",
    previewDescription,
}) => {
    const description =
        previewDescription ||
        `The official ${formCode} ${formName} template preview will be displayed here.`;

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline">
                    <Eye />
                    Preview
                </Button>
            </SheetTrigger>

            <SheetContent side="bottom">
                <SheetHeader>
                    <SheetTitle>
                        {formCode} - {formName}
                    </SheetTitle>
                    <SheetDescription>
                        School Year {schoolYear} • Updated {lastUpdated}
                    </SheetDescription>
                </SheetHeader>
                <Empty>
                    <EmptyHeader>
                        <EmptyMedia variant="icon">
                            <FileText />
                        </EmptyMedia>
                        <EmptyTitle>Document Preview</EmptyTitle>
                        <EmptyDescription>{description}</EmptyDescription>
                    </EmptyHeader>
                </Empty>
                <SheetFooter className="flex gap-2">
                    <SheetClose asChild>
                        <Button variant="outline">Close Preview</Button>
                    </SheetClose>

                    <Button variant="default">
                        <Download />
                        Download Templates
                    </Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
};

export default SharedPreview;