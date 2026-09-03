import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription
} from "@/components/ui/card";
import { Field } from "@/components/ui/field";
import {
    InputGroup,
    InputGroupInput,
    InputGroupAddon,
} from "@/components/ui/input-group";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Search } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const recentDocuments = [
    {
        documentName: "SF 10",
        category: "Student Records",
        studentReference: "StudentID : 2025-001",
        status: "Complete",
        dateAdded: "05/29/26",
    },
    {
        documentName: "SF 4",
        category: "Student Records",
        studentReference: "StudentID : 2025-02",
        status: "Missing",
        dateAdded: "04/08/26",
    },
    {
        documentName: "SF 4",
        category: "Student Records",
        studentReference: "StudentID : 2025-020",
        status: "Pending",
        dateAdded: "05/28/26",
    },
];

const RecentDocuments = () => {
    return (
        <Card className="h-full">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle>RECENT DOCUMENTS</CardTitle>
                    <Field className="w-80">
                        <InputGroup>
                            <InputGroupInput
                                placeholder="Search documents..."
                            />
                            <InputGroupAddon><Search /></InputGroupAddon>
                        </InputGroup>
                    </Field>
                </div>
            </CardHeader>

            <Separator />

            <CardContent className="p-0 -my-(--card-spacing)">
                <div className="w-full">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>
                                    Document Name
                                </TableHead>
                                <TableHead>
                                    Category
                                </TableHead>
                                <TableHead>
                                    Student Reference
                                </TableHead>
                                <TableHead>
                                    Status
                                </TableHead>
                                <TableHead className="text-right">
                                    Date Added
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {recentDocuments.map((doc, index) => (
                                <TableRow key={index}>
                                    <TableCell >
                                        {doc.documentName}
                                    </TableCell>
                                    <TableCell >
                                        {doc.category}
                                    </TableCell>
                                    <TableCell >
                                        {doc.studentReference}
                                    </TableCell>
                                    <TableCell>
                                        <span
                                            className={
                                                doc.status === "Complete"
                                                    ? "text-green-600"
                                                    : doc.status === "Missing"
                                                        ? "text-red-600"
                                                        : "text-yellow-600"
                                            }
                                        >
                                            {doc.status}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {doc.dateAdded}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    );
};

export default RecentDocuments;