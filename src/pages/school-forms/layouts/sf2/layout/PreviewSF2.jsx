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
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty"
import { Download, Eye, FileText } from "lucide-react";

const PreviewSF2 = () => {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline">
                    <Eye />
                    Preview
                </Button>
            </SheetTrigger>

            <SheetContent className="sm:max-w-xl">
                <SheetHeader>
                    <SheetTitle>SF1 - School Register Templates</SheetTitle>
                    <SheetDescription>
                        School Year 2026-2027 • Updated September 2026
                    </SheetDescription>
                </SheetHeader>
                <Empty>
                    <EmptyHeader>
                        <EmptyMedia variant="icon">
                            <FileText />
                        </EmptyMedia>
                        <EmptyTitle>
                            Document Preview
                        </EmptyTitle>
                        <EmptyDescription>
                            The official SF1 School Register template
                            preview will be displayed here.
                        </EmptyDescription>
                    </EmptyHeader>
                </Empty>
                <SheetFooter className="flex gap-2">
                    <SheetClose asChild>
                        <Button variant="outline">
                            Close Preview
                        </Button>
                    </SheetClose>

                    <Button variant="default">
                        <Download />
                        Download Templates
                    </Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}

export default PreviewSF2