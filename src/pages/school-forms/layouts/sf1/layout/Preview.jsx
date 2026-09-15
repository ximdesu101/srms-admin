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
import { Download, Eye } from "lucide-react";
const Preview = () => {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline">
                    <Eye/>
                    Preview
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>SF1 - School Register Templates</SheetTitle>
                    <SheetDescription>
                        School Year 2026-2027 • Updated September 2026
                    </SheetDescription>
                </SheetHeader>
                <SheetFooter className="flex gap-2">
                    <SheetClose asChild>
                        <Button variant="outline">
                            Close Preview
                        </Button>
                    </SheetClose>
                    <Button variant="default">
                        <Download/>
                        Download Templates
                    </Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}

export default Preview